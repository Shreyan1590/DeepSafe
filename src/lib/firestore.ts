
import { getFirestore } from 'firebase/firestore';
import { app } from './firebase';
import {
  collection,
  addDoc,
  getDocs,
  query,
  orderBy,
  limit,
  serverTimestamp,
  deleteDoc,
  doc,
  writeBatch,
  Timestamp,
} from 'firebase/firestore';
import type { AnalysisResult } from '@/app/dashboard/page';

const db = getFirestore(app);

// Firestore data converter
const analysisResultConverter = {
  toFirestore: (data: Omit<AnalysisResult, 'id'| 'timestamp'>) => {
    // Don't store the blob preview URL
    const { videoPreviewUrl, ...rest } = data;
    return {
      ...rest,
      timestamp: serverTimestamp(),
    };
  },
  fromFirestore: (snapshot: any, options: any): AnalysisResult => {
    const data = snapshot.data(options);
    const timestamp = data.timestamp as Timestamp;
    
    // The videoPreviewUrl needs to be regenerated on the client from the frameDataUri if needed,
    // but for history display, we may not need a full video object URL anymore.
    // For simplicity, we'll return an empty string, as the primary display shows the frame.
    // If we were to re-create a blob, it would be from the frameDataUri (image) not a video.
    
    return {
      id: snapshot.id,
      isDeepfake: data.isDeepfake,
      deepfakeConfidence: data.deepfakeConfidence,
      aiGeneratedConfidence: data.aiGeneratedConfidence,
      analysis: data.analysis,
      filename: data.filename,
      timestamp: timestamp.toDate().toISOString(),
      videoPreviewUrl: '', // This is now less relevant, as we work with frames.
      frameDataUri: data.frameDataUri,
    };
  },
};

// Helper to convert data URI to Blob -- no longer needed for video, but can be kept for general utility
function dataURItoBlob(dataURI: string) {
    if (!dataURI || !dataURI.includes(',')) return null;
    const byteString = atob(dataURI.split(',')[1]);
    const mimeString = dataURI.split(',')[0].split(':')[1].split(';')[0];
    const ab = new ArrayBuffer(byteString.length);
    const ia = new Uint8Array(ab);
    for (let i = 0; i < byteString.length; i++) {
        ia[i] = byteString.charCodeAt(i);
    }
    return new Blob([ab], { type: mimeString });
}


// Function to get user's analysis history
export const getAnalysisHistory = async (userId: string): Promise<AnalysisResult[]> => {
  const historyCollection = collection(db, `users/${userId}/analyses`).withConverter(analysisResultConverter);
  const q = query(historyCollection, orderBy('timestamp', 'desc'), limit(50));
  const querySnapshot = await getDocs(q);
  return querySnapshot.docs.map(doc => {
      const data = doc.data();
      // Recreate a client-side URL for the video preview if needed
      // Since we only have the frame, we can use that for preview.
      const blob = data.frameDataUri ? dataURItoBlob(data.frameDataUri) : null;
      const previewUrl = blob ? URL.createObjectURL(blob) : '';
      return {...data, videoPreviewUrl: previewUrl };
  });
};

// Function to add a new analysis result to a user's history
export const addAnalysisToHistory = async (
  userId: string,
  result: Omit<AnalysisResult, 'id' | 'timestamp'>
): Promise<string> => {
  const historyCollection = collection(db, `users/${userId}/analyses`).withConverter(analysisResultConverter);
  const docRef = await addDoc(historyCollection, result);
  return docRef.id;
};

// Function to clear a user's analysis history
export const clearAnalysisHistory = async (userId: string) => {
    const historyCollectionRef = collection(db, `users/${userId}/analyses`);
    const q = query(historyCollectionRef);
    const snapshot = await getDocs(q);

    if (snapshot.empty) {
        return;
    }
    
    const batch = writeBatch(db);
    snapshot.docs.forEach(d => {
        batch.delete(d.ref);
    });
    
    await batch.commit();
}

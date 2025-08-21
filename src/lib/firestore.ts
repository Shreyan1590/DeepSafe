
'use client';

import { db } from './firebase';
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

// Firestore data converter
const analysisResultConverter = {
  toFirestore: (data: Omit<AnalysisResult, 'id'| 'timestamp'>) => {
    // Don't store the blob preview URL, just the data URI
    const { videoPreviewUrl, ...rest } = data;
    return {
      ...rest,
      timestamp: serverTimestamp(),
    };
  },
  fromFirestore: (snapshot: any, options: any): AnalysisResult => {
    const data = snapshot.data(options);
    const timestamp = data.timestamp as Timestamp;
    // Create a client-side preview URL from the stored data URI
    const blob = data.videoDataUri ? dataURItoBlob(data.videoDataUri) : null;
    const videoPreviewUrl = blob ? URL.createObjectURL(blob) : '';
    
    return {
      id: snapshot.id,
      isDeepfake: data.isDeepfake,
      deepfakeConfidence: data.deepfakeConfidence,
      aiGeneratedConfidence: data.aiGeneratedConfidence,
      analysis: data.analysis,
      filename: data.filename,
      timestamp: timestamp.toDate().toISOString(),
      videoPreviewUrl: videoPreviewUrl,
      videoDataUri: data.videoDataUri,
    };
  },
};

// Helper to convert data URI to Blob
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
  return querySnapshot.docs.map(doc => doc.data());
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

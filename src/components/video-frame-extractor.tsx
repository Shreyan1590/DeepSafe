
'use client';

import { useEffect, useRef } from 'react';

interface VideoFrameExtractorProps {
  videoFile: File;
  onFrameExtracted: (frameDataUri: string | null) => void;
}

// This is a hidden component that does the work of extracting a frame
export default function VideoFrameExtractor({ videoFile, onFrameExtracted }: VideoFrameExtractorProps) {
  const videoRef = useRef<HTMLVideoElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const video = videoRef.current;
    const canvas = canvasRef.current;
    if (!video || !canvas || !videoFile) return;

    const objectUrl = URL.createObjectURL(videoFile);
    video.src = objectUrl;

    const handleLoadedData = () => {
      // Seek to the first frame (or a specific time)
      video.currentTime = 0; 
    };

    const handleSeeked = () => {
      const ctx = canvas.getContext('2d');
      if (ctx) {
        // Set canvas dimensions to video dimensions
        canvas.width = video.videoWidth;
        canvas.height = video.videoHeight;

        // Draw the video frame to the canvas
        ctx.drawImage(video, 0, 0, video.videoWidth, video.videoHeight);

        // Get the frame as a data URI
        const frameDataUri = canvas.toDataURL('image/jpeg');
        onFrameExtracted(frameDataUri);
      } else {
        onFrameExtracted(null);
      }
      // Clean up the object URL
      URL.revokeObjectURL(objectUrl);
    };
    
    const handleError = () => {
      onFrameExtracted(null);
      URL.revokeObjectURL(objectUrl);
    }

    video.addEventListener('loadeddata', handleLoadedData);
    video.addEventListener('seeked', handleSeeked);
    video.addEventListener('error', handleError);

    return () => {
      video.removeEventListener('loadeddata', handleLoadedData);
      video.removeEventListener('seeked', handleSeeked);
      video.removeEventListener('error', handleError);
      if(objectUrl) {
          URL.revokeObjectURL(objectUrl);
      }
    };
  }, [videoFile, onFrameExtracted]);

  return (
    <>
      <video ref={videoRef} style={{ display: 'none' }} muted crossOrigin="anonymous" />
      <canvas ref={canvasRef} style={{ display: 'none' }} />
    </>
  );
}

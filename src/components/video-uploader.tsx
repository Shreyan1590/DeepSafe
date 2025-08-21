
'use client';

import { useState, useCallback, useRef } from 'react';
import { UploadCloud, Loader2 } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Button } from '@/components/ui/button';

interface VideoUploaderProps {
  onAnalyze: (file: File) => void;
  isLoading: boolean;
}

const MAX_FILE_SIZE = 50 * 1024 * 1024; // 50MB

export default function VideoUploader({ onAnalyze, isLoading }: VideoUploaderProps) {
  const [isDragging, setIsDragging] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const { toast } = useToast();

  const handleFileValidation = (file: File): boolean => {
    if (!file.type.startsWith('video/')) {
        toast({
            variant: 'destructive',
            title: 'Invalid File Type',
            description: 'Please upload a valid video file.',
        });
        return false;
    }
    if (file.size > MAX_FILE_SIZE) {
        toast({
            variant: 'destructive',
            title: 'File Too Large',
            description: `Please upload a video smaller than ${MAX_FILE_SIZE / 1024 / 1024}MB.`,
        });
        return false;
    }
    return true;
  }

  const handleFile = useCallback((file: File | null) => {
    if (file && handleFileValidation(file)) {
      onAnalyze(file);
    }
  }, [onAnalyze, toast]);

  const onDragOver = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    e.stopPropagation();
    if (!isLoading) setIsDragging(true);
  };

  const onDragLeave = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    e.stopPropagation();
    setIsDragging(false);
  };

  const onDrop = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    e.stopPropagation();
    setIsDragging(false);
    if (!isLoading && e.dataTransfer.files && e.dataTransfer.files.length > 0) {
      handleFile(e.dataTransfer.files[0]);
    }
  };

  const onFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files.length > 0) {
      handleFile(e.target.files[0]);
    }
  };

  const triggerFileSelect = () => {
    if (!isLoading) fileInputRef.current?.click();
  }

  return (
    <Card className="bg-card/50 border-border/50">
      <CardHeader>
        <CardTitle className="font-headline text-xl sm:text-2xl">Upload Video</CardTitle>
        <CardDescription className="text-muted-foreground text-sm sm:text-base">Drag & drop a video file or click to select one for deepfake analysis.</CardDescription>
      </CardHeader>
      <CardContent>
        <div
          onDragOver={onDragOver}
          onDragLeave={onDragLeave}
          onDrop={onDrop}
          onClick={triggerFileSelect}
          className={`relative group flex flex-col items-center justify-center w-full p-6 sm:p-10 border-2 border-dashed rounded-lg transition-colors duration-300
            ${isLoading ? 'cursor-not-allowed bg-muted/30' : 'cursor-pointer'}
            ${isDragging ? 'border-primary bg-primary/10' : 'border-border/50 hover:border-primary/50 hover:bg-muted/50'}
          `}
        >
          <input
            ref={fileInputRef}
            type="file"
            accept="video/*"
            onChange={onFileChange}
            className="hidden"
            disabled={isLoading}
          />
          {isLoading ? (
            <div className="flex flex-col items-center gap-4 text-center">
              <Loader2 className="h-10 w-10 sm:h-12 sm:w-12 text-primary animate-spin" />
              <p className="font-semibold text-base sm:text-lg text-primary">Analyzing Video...</p>
              <p className="text-muted-foreground text-sm">This may take a moment. Please don't close this page.</p>
            </div>
          ) : (
            <div className="flex flex-col items-center gap-4 text-center">
              <UploadCloud className="h-10 w-10 sm:h-12 sm:w-12 text-muted-foreground transition-colors group-hover:text-primary" />
              <p className="font-semibold text-base sm:text-lg">Drag & drop your video here</p>
              <p className="text-muted-foreground text-sm">or</p>
              <Button variant="outline" size="lg" disabled={isLoading}>
                Browse Files
              </Button>
               <p className="text-xs text-muted-foreground mt-4">Max file size: 50MB</p>
            </div>
          )}
        </div>
      </CardContent>
    </Card>
  );
}

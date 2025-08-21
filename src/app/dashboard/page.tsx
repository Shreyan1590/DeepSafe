
'use client';

import { useState, useEffect } from 'react';
import type { AnalyzeDeepfakeOutput } from '@/ai/flows/analyze-deepfake';
import { runAnalysisAction } from '@/app/actions';
import { useToast } from '@/hooks/use-toast';
import VideoUploader from '@/components/video-uploader';
import AnalysisResultDisplay from '@/components/analysis-result-display';
import HistorySidebar from '@/components/history-sidebar';
import { Card, CardContent } from '@/components/ui/card';
import { Skeleton } from '@/components/ui/skeleton';
import VideoFrameExtractor from '@/components/video-frame-extractor';

export type AnalysisResult = AnalyzeDeepfakeOutput & {
  id: string;
  filename: string;
  timestamp: string;
  videoPreviewUrl: string;
  frameDataUri?: string;
};

// Hook to use local storage for state persistence
function useLocalStorage<T>(key: string, initialValue: T): [T, (value: T) => void] {
    const [storedValue, setStoredValue] = useState<T>(() => {
        if (typeof window === 'undefined') {
            return initialValue;
        }
        try {
            const item = window.localStorage.getItem(key);
            return item ? JSON.parse(item) : initialValue;
        } catch (error) {
            console.log(error);
            return initialValue;
        }
    });

    const setValue = (value: T) => {
        try {
            const valueToStore = value instanceof Function ? value(storedValue) : value;
            setStoredValue(valueToStore);
            if (typeof window !== 'undefined') {
                window.localStorage.setItem(key, JSON.stringify(valueToStore));
            }
        } catch (error) {
            console.log(error);
        }
    };
    return [storedValue, setValue];
}


export default function DashboardPage() {
  const [history, setHistory] = useLocalStorage<AnalysisResult[]>("analysisHistory", []);
  const [currentAnalysis, setCurrentAnalysis] = useState<AnalysisResult | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [fileToAnalyze, setFileToAnalyze] = useState<File | null>(null);
  const { toast } = useToast();
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);


  useEffect(() => {
    // Set the first item in history as the current analysis when the page loads
    if (history.length > 0 && !currentAnalysis) {
        setCurrentAnalysis(history[0]);
    }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [history]);

  const handleFileSelect = (file: File) => {
    setIsLoading(true);
    setCurrentAnalysis(null);
    setFileToAnalyze(file);
  }

  const handleFrameExtracted = async (frameDataUri: string | null) => {
    if (!fileToAnalyze) {
        setIsLoading(false);
        return;
    };
    
    if (!frameDataUri) {
        toast({
            variant: 'destructive',
            title: "Analysis Failed",
            description: "Could not extract a frame from the video. The file may be corrupt or in an unsupported format.",
        });
        setIsLoading(false);
        setFileToAnalyze(null);
        return;
    }

    try {
        const result = await runAnalysisAction(frameDataUri);
        
        if ('error' in result) {
            throw new Error(result.error);
        }
        
        const timestamp = new Date().toISOString();
        const finalAnalysis: AnalysisResult = {
          ...result,
          id: timestamp, // Use timestamp as a unique ID
          filename: fileToAnalyze.name,
          videoPreviewUrl: URL.createObjectURL(fileToAnalyze),
          frameDataUri: frameDataUri,
          timestamp: timestamp,
        }

        setCurrentAnalysis(finalAnalysis);
        setHistory([finalAnalysis, ...history]);

      } catch (error) {
        const errorMessage = error instanceof Error ? error.message : 'An unknown error occurred.';
        toast({
          variant: 'destructive',
          title: "Analysis Failed",
          description: errorMessage,
        });
      } finally {
        setIsLoading(false);
        setFileToAnalyze(null);
      }
  }


  const handleSelectHistory = (result: AnalysisResult) => {
    setCurrentAnalysis(result);
  };

  const handleClearHistory = async () => {
    setHistory([]);
    setCurrentAnalysis(null);
    toast({
        title: "History Cleared",
        description: "Your analysis history has been removed.",
    })
  };
  
  return (
    <>
    {fileToAnalyze && (
      <VideoFrameExtractor videoFile={fileToAnalyze} onFrameExtracted={handleFrameExtracted} />
    )}
    <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 items-start">
        <div className="lg:col-span-2 space-y-8">
            <VideoUploader onAnalyze={handleFileSelect} isLoading={isLoading} />
            {isLoading && <LoadingSkeleton />}
            {currentAnalysis && <AnalysisResultDisplay result={currentAnalysis} />}
        </div>
        <div className="lg:col-span-1">
            <HistorySidebar
            history={history}
            onSelect={handleSelectHistory}
            onClear={handleClearHistory}
            currentAnalysisId={currentAnalysis?.id}
            isLoading={!mounted}
            />
        </div>
    </div>
    </>
  );
}

function LoadingSkeleton() {
    return (
      <Card className="bg-card/50 border-border/50">
        <CardContent className="p-6">
          <div className="space-y-6 animate-pulse">
            <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-2">
                <Skeleton className="h-8 w-2/3 sm:w-1/3 bg-muted" />
                <Skeleton className="h-8 w-32 sm:w-24 bg-muted" />
            </div>
            <div className="space-y-4">
                <Skeleton className="h-6 w-1/2 sm:w-1/4 bg-muted" />
                <Skeleton className="h-10 w-full bg-muted" />
            </div>
            <div className="space-y-2">
                <Skeleton className="h-4 w-full bg-muted" />
                <Skeleton className="h-4 w-full bg-muted" />
                <Skeleton className="h-4 w-3/4 bg-muted" />
            </div>
          </div>
        </CardContent>
      </Card>
    );
}

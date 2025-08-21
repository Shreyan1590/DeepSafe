
'use client';

import { useState, useEffect, useCallback } from 'react';
import type { AnalyzeDeepfakeOutput } from '@/ai/flows/analyze-deepfake';
import { runAnalysisAction } from '@/app/actions';
import { useToast } from '@/hooks/use-toast';
import VideoUploader from '@/components/video-uploader';
import AnalysisResultDisplay from '@/components/analysis-result-display';
import HistorySidebar from '@/components/history-sidebar';
import { Card, CardContent } from '@/components/ui/card';
import { Skeleton } from '@/components/ui/skeleton';
import { User as FirebaseUser } from 'firebase/auth';
import { addAnalysisToHistory, getAnalysisHistory, clearAnalysisHistory } from '@/lib/firestore';

export type AnalysisResult = AnalyzeDeepfakeOutput & {
  id: string;
  filename: string;
  timestamp: string;
  videoPreviewUrl: string;
  videoDataUri?: string; 
};

interface DashboardPageProps {
    user: FirebaseUser;
}

export default function DashboardPage({ user }: DashboardPageProps) {
  const [history, setHistory] = useState<AnalysisResult[]>([]);
  const [currentAnalysis, setCurrentAnalysis] = useState<AnalysisResult | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [isHistoryLoading, setIsHistoryLoading] = useState(true);
  const { toast } = useToast();

  const fetchHistory = useCallback(async (uid: string) => {
    setIsHistoryLoading(true);
    try {
      const userHistory = await getAnalysisHistory(uid);
      setHistory(userHistory);
    } catch (error) {
      console.error('Failed to load history from Firestore', error);
      toast({
        variant: 'destructive',
        title: "Error",
        description: "Could not load analysis history.",
      });
    } finally {
      setIsHistoryLoading(false);
    }
  }, [toast]);

  useEffect(() => {
    if (user) {
      fetchHistory(user.uid);
    }
  }, [user, fetchHistory]);

  const handleAnalysis = async (file: File) => {
    if (!user) {
      toast({ variant: 'destructive', title: "Authentication Error", description: "You must be logged in to run an analysis." });
      return;
    }
    setIsLoading(true);
    setCurrentAnalysis(null);

    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = async () => {
      const videoDataUri = reader.result as string;

      try {
        const result = await runAnalysisAction(videoDataUri);
        
        if ('error' in result) {
            throw new Error(result.error);
        }

        const newAnalysis: Omit<AnalysisResult, 'id' | 'timestamp'> = {
          ...result,
          filename: file.name,
          videoPreviewUrl: URL.createObjectURL(file),
          videoDataUri: videoDataUri, 
        };

        const newId = await addAnalysisToHistory(user.uid, newAnalysis);
        
        const finalAnalysis: AnalysisResult = {
          ...newAnalysis,
          id: newId,
          timestamp: new Date().toISOString(),
        }

        setCurrentAnalysis(finalAnalysis);
        setHistory(prev => [finalAnalysis, ...prev]);

      } catch (error) {
        const errorMessage = error instanceof Error ? error.message : 'An unknown error occurred.';
        toast({
          variant: 'destructive',
          title: "Analysis Failed",
          description: errorMessage,
        });
      } finally {
        setIsLoading(false);
      }
    };
    reader.onerror = () => {
        toast({
            variant: 'destructive',
            title: "File Read Error",
            description: "Could not read the selected file.",
        });
        setIsLoading(false);
    };
  };

  const handleSelectHistory = (result: AnalysisResult) => {
    setCurrentAnalysis(result);
  };

  const handleClearHistory = async () => {
    if (!user) return;
    try {
        await clearAnalysisHistory(user.uid);
        setHistory([]);
        setCurrentAnalysis(null);
        toast({
            title: "History Cleared",
            description: "Your analysis history has been removed.",
        })
    } catch(error) {
         toast({
            variant: 'destructive',
            title: "Error",
            description: "Could not clear analysis history.",
        })
    }
  };
  
  return (
    <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 items-start">
        <div className="lg:col-span-2 space-y-8">
            <VideoUploader onAnalyze={handleAnalysis} isLoading={isLoading} />
            {isLoading && <LoadingSkeleton />}
            {currentAnalysis && <AnalysisResultDisplay result={currentAnalysis} />}
        </div>
        <div className="lg:col-span-1">
            <HistorySidebar
            history={history}
            onSelect={handleSelectHistory}
            onClear={handleClearHistory}
            currentAnalysisId={currentAnalysis?.id}
            isLoading={isHistoryLoading}
            />
        </div>
    </div>
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

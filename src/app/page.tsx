
'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import type { AnalyzeDeepfakeOutput } from '@/ai/flows/analyze-deepfake';
import { runAnalysisAction } from '@/app/actions';
import { useToast } from '@/hooks/use-toast';
import Header from '@/components/header';
import VideoUploader from '@/components/video-uploader';
import AnalysisResultDisplay from '@/components/analysis-result-display';
import HistorySidebar from '@/components/history-sidebar';
import { Card, CardContent } from '@/components/ui/card';
import { Skeleton } from '@/components/ui/skeleton';
import { auth } from '@/lib/firebase';
import { onAuthStateChanged, User } from 'firebase/auth';

export type AnalysisResult = AnalyzeDeepfakeOutput & {
  id: string;
  filename: string;
  timestamp: string;
  videoPreviewUrl: string;
};

export default function Home() {
  const [user, setUser] = useState<User | null>(null);
  const [history, setHistory] = useState<AnalysisResult[]>([]);
  const [currentAnalysis, setCurrentAnalysis] = useState<AnalysisResult | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const { toast } = useToast();
  const router = useRouter();

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      if (currentUser) {
        setUser(currentUser);
      } else {
        router.push('/auth');
      }
    });
    return () => unsubscribe();
  }, [router]);
  
  useEffect(() => {
    if (!user) return;
    try {
      const storedHistory = localStorage.getItem(`deepsafed-history-${user.uid}`);
      if (storedHistory) {
        setHistory(JSON.parse(storedHistory));
      }
    } catch (error) {
      console.error('Failed to load history from localStorage', error);
    }
  }, [user]);

  const updateHistory = (newHistory: AnalysisResult[]) => {
    if (!user) return;
    setHistory(newHistory);
    try {
      localStorage.setItem(`deepsafed-history-${user.uid}`, JSON.stringify(newHistory));
    } catch (error) {
      console.error('Failed to save history to localStorage', error);
    }
  };

  const handleAnalysis = async (file: File) => {
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

        const newAnalysis: AnalysisResult = {
          ...result,
          id: new Date().toISOString(),
          filename: file.name,
          timestamp: new Date().toISOString(),
          videoPreviewUrl: URL.createObjectURL(file),
        };

        setCurrentAnalysis(newAnalysis);
        updateHistory([newAnalysis, ...history]);
      } catch (error) {
        const errorMessage = error instanceof Error ? error.message : 'An unknown error occurred.';
        toast({
          variant: 'destructive',
          title: 'Analysis Failed',
          description: errorMessage,
        });
      } finally {
        setIsLoading(false);
      }
    };
    reader.onerror = () => {
        toast({
            variant: 'destructive',
            title: 'File Read Error',
            description: 'Could not read the selected file.',
        });
        setIsLoading(false);
    };
  };

  const handleSelectHistory = (result: AnalysisResult) => {
    setCurrentAnalysis(result);
  };

  const handleClearHistory = () => {
    updateHistory([]);
    setCurrentAnalysis(null);
    toast({
        title: 'History Cleared',
        description: 'Your analysis history has been removed.',
    })
  };
  
  if (!user) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <Skeleton className="h-screen w-full" />
      </div>
    );
  }

  return (
    <div className="flex flex-col min-h-screen bg-background dark:bg-background">
      <Header />
      <main className="flex-1 container mx-auto p-4 md:p-8">
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
            />
          </div>
        </div>
      </main>
    </div>
  );
}

function LoadingSkeleton() {
    return (
      <Card>
        <CardContent className="p-6">
          <div className="space-y-6">
            <div className="flex justify-between items-center">
                <Skeleton className="h-8 w-1/3" />
                <Skeleton className="h-8 w-24" />
            </div>
            <div className="space-y-4">
                <Skeleton className="h-6 w-1/4" />
                <Skeleton className="h-10 w-full" />
            </div>
            <div className="space-y-2">
                <Skeleton className="h-4 w-full" />
                <Skeleton className="h-4 w-full" />
                <Skeleton className="h-4 w-3/4" />
            </div>
          </div>
        </CardContent>
      </Card>
    );
}

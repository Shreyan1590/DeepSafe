
'use client';

import type { AnalysisResult } from '@/app/dashboard/page';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import { CheckCircle2, XCircle, AlertTriangle } from 'lucide-react';

interface AnalysisResultDisplayProps {
  result: AnalysisResult;
}

export default function AnalysisResultDisplay({ result }: AnalysisResultDisplayProps) {
  const { isDeepfake, deepfakeConfidence, aiGeneratedConfidence, analysis, filename, videoPreviewUrl, videoDataUri } = result;
  
  const overallConfidence = Math.max(deepfakeConfidence, aiGeneratedConfidence);
  const confidencePercentage = Math.round(overallConfidence * 100);

  const getConfidenceColor = (value: number) => {
    if (value > 0.75) return 'bg-red-500';
    if (value > 0.5) return 'bg-yellow-500';
    return 'bg-green-500';
  };
  
  const getVerdictIcon = () => {
      if (isDeepfake) {
        if (overallConfidence > 0.75) return <XCircle className="h-5 w-5 sm:h-6 sm:w-6 text-red-400" />;
        return <AlertTriangle className="h-5 w-5 sm:h-6 sm:w-6 text-yellow-400" />;
      }
      return <CheckCircle2 className="h-5 w-5 sm:h-6 sm:w-6 text-green-400" />;
  }
  
  // Use the live object URL for preview, but fallback to data URI if needed
  const videoSrc = videoPreviewUrl || videoDataUri;

  return (
    <Card className="overflow-hidden bg-card/50 border-border/50">
      <CardHeader>
        <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center gap-4">
            <div>
                <CardTitle className="font-headline text-xl sm:text-2xl">Analysis Complete</CardTitle>
                <CardDescription className="truncate max-w-[200px] xs:max-w-xs sm:max-w-md text-muted-foreground">{filename}</CardDescription>
            </div>
            <Badge variant={isDeepfake ? 'destructive' : 'default'} className="text-sm sm:text-base px-3 py-1.5 sm:px-4 sm:py-2 bg-opacity-50 border-opacity-50 self-start sm:self-center">
              {getVerdictIcon()}
              <span className="ml-2">{isDeepfake ? 'AI Content Detected' : 'Likely Authentic'}</span>
            </Badge>
        </div>
      </CardHeader>
      <CardContent className="space-y-6">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="space-y-2">
              <div className="flex justify-between items-baseline gap-2">
                  <h3 className="text-base sm:text-lg font-semibold">Manipulation Confidence</h3>
                  <p className={`text-xl sm:text-2xl font-bold ${deepfakeConfidence > 0.75 ? 'text-red-400' : deepfakeConfidence > 0.5 ? 'text-yellow-400' : 'text-green-400'}`}>{Math.round(deepfakeConfidence * 100)}%</p>
              </div>
              <Progress value={Math.round(deepfakeConfidence * 100)} indicatorClassName={getConfidenceColor(deepfakeConfidence)} />
              <p className="text-xs text-muted-foreground">Likelihood of face-swapping or similar edits.</p>
          </div>
           <div className="space-y-2">
              <div className="flex justify-between items-baseline gap-2">
                  <h3 className="text-base sm:text-lg font-semibold">AI Generation Confidence</h3>
                  <p className={`text-xl sm:text-2xl font-bold ${aiGeneratedConfidence > 0.75 ? 'text-red-400' : aiGeneratedConfidence > 0.5 ? 'text-yellow-400' : 'text-green-400'}`}>{Math.round(aiGeneratedConfidence * 100)}%</p>
              </div>
              <Progress value={Math.round(aiGeneratedConfidence * 100)} indicatorClassName={getConfidenceColor(aiGeneratedConfidence)} />
              <p className="text-xs text-muted-foreground">Likelihood of being fully computer-generated.</p>
          </div>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 items-start">
            <div className="space-y-4">
                <h3 className="text-base sm:text-lg font-semibold">Detailed Analysis</h3>
                <p className="text-muted-foreground text-sm leading-relaxed bg-muted/30 p-4 rounded-md border border-border/50">{analysis}</p>
            </div>
            <div className="w-full aspect-video rounded-md overflow-hidden bg-muted">
                {videoSrc && <video src={videoSrc} controls className="w-full h-full object-cover" data-ai-hint="video player"></video>}
            </div>
        </div>
      </CardContent>
    </Card>
  );
}

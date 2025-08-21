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
  const { isDeepfake, confidence, analysis, filename, videoPreviewUrl } = result;
  const confidencePercentage = Math.round(confidence * 100);

  const getConfidenceColor = () => {
    if (confidence > 0.75) return 'bg-destructive';
    if (confidence > 0.5) return 'bg-yellow-500';
    return 'bg-green-500';
  };
  
  const getVerdictIcon = () => {
      if (isDeepfake) {
        if (confidence > 0.75) return <XCircle className="h-6 w-6 text-destructive" />;
        return <AlertTriangle className="h-6 w-6 text-yellow-500" />;
      }
      return <CheckCircle2 className="h-6 w-6 text-green-600" />;
  }

  return (
    <Card className="overflow-hidden">
      <CardHeader>
        <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center gap-4">
            <div>
                <CardTitle className="font-headline text-2xl">Analysis Complete</CardTitle>
                <CardDescription className="truncate max-w-xs md:max-w-md">{filename}</CardDescription>
            </div>
            <Badge variant={isDeepfake ? 'destructive' : 'secondary'} className="text-base px-4 py-2">
              {getVerdictIcon()}
              <span className="ml-2">{isDeepfake ? 'Deepfake Detected' : 'Authentic'}</span>
            </Badge>
        </div>
      </CardHeader>
      <CardContent className="space-y-6">
        <div className="space-y-2">
            <div className="flex justify-between items-baseline">
                <h3 className="text-lg font-semibold">Confidence Score</h3>
                <p className="text-2xl font-bold text-foreground">{confidencePercentage}%</p>
            </div>
            <Progress value={confidencePercentage} indicatorClassName={getConfidenceColor()} />
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 items-start">
            <div className="space-y-2">
                <h3 className="text-lg font-semibold">Detailed Analysis</h3>
                <p className="text-muted-foreground text-sm leading-relaxed">{analysis}</p>
            </div>
            <div className="w-full aspect-video rounded-md overflow-hidden bg-muted">
                <video src={videoPreviewUrl} controls className="w-full h-full object-cover" data-ai-hint="video player"></video>
            </div>
        </div>
      </CardContent>
    </Card>
  );
}

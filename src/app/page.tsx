
'use client';

import { useRouter } from 'next/navigation';
import { Button } from '@/components/ui/button';
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { ShieldCheck, ArrowRight, GaugeCircle, ScanEye, ShieldAlert } from 'lucide-react';
import Background3D from '@/components/3d-background';

export default function LandingPage() {
  const router = useRouter();

  return (
    <div className="relative flex flex-col min-h-screen bg-background dark w-full h-full">
      <Background3D />
      <header className="py-4 px-4 md:px-6 bg-transparent sticky top-0 z-50">
        <div className="container mx-auto flex items-center justify-between">
          <div className="flex items-center gap-3">
            <ShieldCheck className="h-8 w-8 text-primary" />
            <h1 className="text-2xl font-headline font-bold text-foreground">
              DeepSafe
            </h1>
          </div>
          <div className="flex items-center gap-2">
            <Button variant="outline" onClick={() => router.push('/login')}>
              Login
            </Button>
            <Button onClick={() => router.push('/login')}>
              Sign Up <ArrowRight className="ml-2" />
            </Button>
          </div>
        </div>
      </header>

      <main className="flex-1 container mx-auto p-4 md:p-8 flex flex-col items-center justify-center text-center">
        <div className="w-full max-w-4xl space-y-8">
            <div className="space-y-4">
                <h2 className="text-5xl md:text-6xl font-headline font-bold text-foreground leading-tight">
                    Detect Deepfakes with Confidence
                </h2>
                <p className="text-lg md:text-xl text-muted-foreground max-w-2xl mx-auto">
                    DeepSafe is an advanced AI-powered tool that analyzes video content to identify sophisticated deepfake manipulations. Protect yourself from misinformation and verify the authenticity of your media.
                </p>
                <div className="flex justify-center gap-4">
                     <Button size="lg" onClick={() => router.push('/dashboard')}>Get Started for Free <ArrowRight className="ml-2" /></Button>
                </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 text-left">
                <Card className="bg-card/50 border-border/50 backdrop-blur-sm">
                    <CardHeader className="flex flex-row items-center gap-4">
                        <ScanEye className="h-10 w-10 text-primary" />
                        <CardTitle>Advanced Analysis</CardTitle>
                    </CardHeader>
                    <CardContent>
                        <p className="text-muted-foreground">
                            Leverages state-of-the-art AI models to perform in-depth analysis of video frames, audio, and metadata to detect subtle signs of manipulation.
                        </p>
                    </CardContent>
                </Card>
                 <Card className="bg-card/50 border-border/50 backdrop-blur-sm">
                    <CardHeader className="flex flex-row items-center gap-4">
                        <GaugeCircle className="h-10 w-10 text-primary" />
                        <CardTitle>Confidence Score</CardTitle>
                    </CardHeader>
                    <CardContent>
                        <p className="text-muted-foreground">
                            Receive a clear, percentage-based confidence score that indicates the likelihood of a video being a deepfake, making it easy to interpret results.
                        </p>
                    </CardContent>
                </Card>
                 <Card className="bg-card/50 border-border/50 backdrop-blur-sm">
                    <CardHeader className="flex flex-row items-center gap-4">
                        <ShieldAlert className="h-10 w-10 text-primary" />
                        <CardTitle>Use with Caution</CardTitle>
                    </CardHeader>
                    <CardContent>
                        <p className="text-muted-foreground">
                            As a prototype, our detection is highly effective but not infallible. Always consider the results as a strong indicator, not a final verdict.
                        </p>
                    </CardContent>
                </Card>
            </div>
        </div>
      </main>
    </div>
  );
}

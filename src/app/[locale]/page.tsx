
'use client';

import { Suspense } from 'react';
import { useRouter } from 'next/navigation';
import { Button } from '@/components/ui/button';
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { ShieldCheck, ArrowRight, GaugeCircle, ScanEye, ShieldAlert } from 'lucide-react';
import { useTranslations } from 'next-intl';
import Header from '@/components/header';

export default function LandingPage() {
  const router = useRouter();
  const t = useTranslations('LandingPage');

  return (
    <div className="relative flex flex-col min-h-screen bg-background w-full h-full">
      <Header />
      <main className="flex-1 container mx-auto p-4 md:p-8 flex flex-col items-center justify-center text-center">
        <div className="w-full max-w-4xl space-y-8">
            <div className="space-y-4">
                <h2 className="text-4xl sm:text-5xl md:text-6xl font-headline font-bold text-foreground leading-tight">
                    {t('headline')}
                </h2>
                <p className="text-base sm:text-lg md:text-xl text-muted-foreground max-w-2xl mx-auto">
                    {t('description')}
                </p>
                <div className="flex flex-col sm:flex-row justify-center gap-4">
                     <Button size="lg" onClick={() => router.push('/login')}>{t('getStarted')} <ArrowRight className="ml-2" /></Button>
                </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 text-left">
                <Card className="bg-card/50 border-border/50 backdrop-blur-sm">
                    <CardHeader className="flex flex-row items-center gap-4">
                        <ScanEye className="h-8 w-8 sm:h-10 sm:w-10 text-primary" />
                        <CardTitle className="text-xl sm:text-2xl">{t('advancedAnalysis')}</CardTitle>
                    </CardHeader>
                    <CardContent>
                        <p className="text-sm sm:text-base text-muted-foreground">
                            {t('advancedAnalysisDesc')}
                        </p>
                    </CardContent>
                </Card>
                 <Card className="bg-card/50 border-border/50 backdrop-blur-sm">
                    <CardHeader className="flex flex-row items-center gap-4">
                        <GaugeCircle className="h-8 w-8 sm:h-10 sm:w-10 text-primary" />
                        <CardTitle className="text-xl sm:text-2xl">{t('confidenceScore')}</CardTitle>
                    </CardHeader>
                    <CardContent>
                        <p className="text-sm sm:text-base text-muted-foreground">
                            {t('confidenceScoreDesc')}
                        </p>
                    </CardContent>
                </Card>
                 <Card className="bg-card/50 border-border/50 backdrop-blur-sm">
                    <CardHeader className="flex flex-row items-center gap-4">
                        <ShieldAlert className="h-8 w-8 sm:h-10 sm:w-10 text-primary" />
                        <CardTitle className="text-xl sm:text-2xl">{t('useWithCaution')}</CardTitle>
                    </CardHeader>
                    <CardContent>
                        <p className="text-sm sm:text-base text-muted-foreground">
                            {t('useWithCautionDesc')}
                        </p>
                    </CardContent>
                </Card>
            </div>
        </div>
      </main>
    </div>
  );
}

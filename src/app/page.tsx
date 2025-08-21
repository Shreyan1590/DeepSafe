
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
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '@/components/ui/accordion';
import { ShieldCheck, ArrowRight, GaugeCircle, ScanEye, ShieldAlert, UploadCloud, Video, BarChart, Users, FileCheck, HelpCircle, Code } from 'lucide-react';
import Header from '@/components/header';
import { SidebarProvider } from '@/components/ui/sidebar';

export const dynamic = 'force-dynamic';

export default function LandingPage() {
  const router = useRouter();

  return (
    <SidebarProvider>
        <div className="relative flex flex-col min-h-screen bg-background w-full h-full">
        <Header />
        <main className="flex-1 container mx-auto p-4 md:p-8 flex flex-col items-center justify-center text-center">
            <div className="w-full max-w-4xl space-y-16">
                
                {/* Hero Section */}
                <div className="space-y-4 pt-12">
                    <h2 className="text-4xl sm:text-5xl md:text-6xl font-headline font-bold text-foreground leading-tight">
                        Detect Deepfakes with Confidence
                    </h2>
                    <p className="text-base sm:text-lg md:text-xl text-muted-foreground max-w-2xl mx-auto">
                        DeepSafe is an advanced AI-powered tool that analyzes video content to identify sophisticated deepfake manipulations. Protect yourself from misinformation and verify the authenticity of your media.
                    </p>
                    <div className="flex flex-col sm:flex-row justify-center gap-4">
                        <Button size="lg" onClick={() => router.push('/login')}>Get Started for Free <ArrowRight className="ml-2" /></Button>
                    </div>
                </div>

                {/* Initial Features Section */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6 text-left">
                    <Card className="bg-card/50 border-border/50 backdrop-blur-sm">
                        <CardHeader className="flex flex-row items-center gap-4">
                            <ScanEye className="h-8 w-8 sm:h-10 sm:w-10 text-primary" />
                            <CardTitle className="text-xl sm:text-2xl">Advanced Analysis</CardTitle>
                        </CardHeader>
                        <CardContent>
                            <p className="text-sm sm:text-base text-muted-foreground">
                                Leverages state-of-the-art AI models to perform in-depth analysis of video frames, audio, and metadata to detect subtle signs of manipulation.
                            </p>
                        </CardContent>
                    </Card>
                    <Card className="bg-card/50 border-border/50 backdrop-blur-sm">
                        <CardHeader className="flex flex-row items-center gap-4">
                            <GaugeCircle className="h-8 w-8 sm:h-10 sm:w-10 text-primary" />
                            <CardTitle className="text-xl sm:text-2xl">Confidence Score</CardTitle>
                        </CardHeader>
                        <CardContent>
                            <p className="text-sm sm:text-base text-muted-foreground">
                                Receive a clear, percentage-based confidence score that indicates the likelihood of a video being a deepfake, making it easy to interpret results.
                            </p>
                        </CardContent>
                    </Card>
                    <Card className="bg-card/50 border-border/50 backdrop-blur-sm">
                        <CardHeader className="flex flex-row items-center gap-4">
                            <ShieldAlert className="h-8 w-8 sm:h-10 sm:w-10 text-primary" />
                            <CardTitle className="text-xl sm:text-2xl">Use with Caution</CardTitle>
                        </CardHeader>
                        <CardContent>
                            <p className="text-sm sm:text-base text-muted-foreground">
                                As a prototype, our detection is highly effective but not infallible. Always consider the results as a strong indicator, not a final verdict.
                            </p>
                        </CardContent>
                    </Card>
                </div>

                {/* How It Works Section */}
                <div className="space-y-8 text-center">
                    <h3 className="text-3xl sm:text-4xl font-headline font-bold">How It Works</h3>
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-8 text-left">
                        <div className="flex flex-col items-center text-center gap-4">
                            <div className="flex items-center justify-center h-16 w-16 rounded-full bg-primary/10 text-primary border-2 border-primary/20">
                                <UploadCloud className="h-8 w-8" />
                            </div>
                            <h4 className="text-xl font-semibold">1. Upload Video</h4>
                            <p className="text-muted-foreground">Simply drag and drop or select a video file from your device. We support a wide range of formats and sizes up to 10GB.</p>
                        </div>
                        <div className="flex flex-col items-center text-center gap-4">
                            <div className="flex items-center justify-center h-16 w-16 rounded-full bg-primary/10 text-primary border-2 border-primary/20">
                                <Video className="h-8 w-8" />
                            </div>
                            <h4 className="text-xl font-semibold">2. AI Analysis</h4>
                            <p className="text-muted-foreground">Our AI engine gets to work, scrutinizing every frame for signs of digital manipulation, face-swapping, and AI generation artifacts.</p>
                        </div>
                        <div className="flex flex-col items-center text-center gap-4">
                            <div className="flex items-center justify-center h-16 w-16 rounded-full bg-primary/10 text-primary border-2 border-primary/20">
                                <BarChart className="h-8 w-8" />
                            </div>
                            <h4 className="text-xl font-semibold">3. View Report</h4>
                            <p className="text-muted-foreground">Receive a comprehensive report with confidence scores and a detailed analysis of our findings, presented in an easy-to-understand format.</p>
                        </div>
                    </div>
                </div>
                
                {/* Use Cases Section */}
                <div className="space-y-8 text-left">
                     <h3 className="text-3xl sm:text-4xl font-headline font-bold text-center">Who is this for?</h3>
                     <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <Card className="bg-card/50 border-border/50">
                            <CardHeader className="flex flex-row items-start gap-4">
                                <Users className="h-8 w-8 text-primary mt-1" />
                                <div>
                                    <CardTitle className="text-xl">Journalists & Researchers</CardTitle>
                                    <p className="text-muted-foreground pt-2">Verify video sources and combat the spread of misinformation in news reporting and academic research.</p>
                                </div>
                            </CardHeader>
                        </Card>
                        <Card className="bg-card/50 border-border/50">
                            <CardHeader className="flex flex-row items-start gap-4">
                                <FileCheck className="h-8 w-8 text-primary mt-1" />
                                <div>
                                    <CardTitle className="text-xl">Content Moderators</CardTitle>
                                    <p className="text-muted-foreground pt-2">Quickly flag and review potentially harmful or misleading user-generated content on social media platforms.</p>
                                </div>
                            </CardHeader>
                        </Card>
                         <Card className="bg-card/50 border-border/50">
                            <CardHeader className="flex flex-row items-start gap-4">
                                <Code className="h-8 w-8 text-primary mt-1" />
                                <div>
                                    <CardTitle className="text-xl">Digital Forensic Analysts</CardTitle>
                                    <p className="text-muted-foreground pt-2">Utilize as a first-pass tool in investigations to identify tampered evidence or manipulated video recordings.</p>
                                </div>
                            </CardHeader>
                        </Card>
                         <Card className="bg-card/50 border-border/50">
                            <CardHeader className="flex flex-row items-start gap-4">
                                <HelpCircle className="h-8 w-8 text-primary mt-1" />
                                <div>
                                    <CardTitle className="text-xl">The General Public</CardTitle>
                                    <p className="text-muted-foreground pt-2">Empower yourself to critically evaluate the authenticity of videos you encounter online before sharing them.</p>
                                </div>
                            </CardHeader>
                        </Card>
                     </div>
                </div>

                {/* FAQ Section */}
                <div className="w-full max-w-3xl mx-auto space-y-8 text-left">
                    <h3 className="text-3xl sm:text-4xl font-headline font-bold text-center">Frequently Asked Questions</h3>
                    <Accordion type="single" collapsible className="w-full">
                        <AccordionItem value="item-1">
                            <AccordionTrigger className="text-lg">Is DeepSafe 100% accurate?</AccordionTrigger>
                            <AccordionContent className="text-muted-foreground">
                                While our AI model is highly advanced, no detection tool can be 100% infallible. Deepfake technology is constantly evolving. Our tool provides a strong indication based on current detection methods, but results should always be considered part of a broader verification process.
                            </AccordionContent>
                        </AccordionItem>
                        <AccordionItem value="item-2">
                            <AccordionTrigger className="text-lg">What video formats do you support?</AccordionTrigger>
                            <AccordionContent className="text-muted-foreground">
                                We support all major video formats, including MP4, MOV, AVI, and WMV. If you have trouble with a specific file, please ensure it is not corrupted and try again.
                            </AccordionContent>
                        </AccordionItem>
                        <AccordionItem value="item-3">
                            <AccordionTrigger className="text-lg">How is my data handled?</AccordionTrigger>
                            <AccordionContent className="text-muted-foreground">
                                We prioritize your privacy. Uploaded videos are sent securely to our analysis engine. We do not store your videos long-term. They are kept only for the duration of the analysis and then permanently deleted from our servers.
                            </AccordionContent>
                        </AccordionItem>
                         <AccordionItem value="item-4">
                            <AccordionTrigger className="text-lg">What does the "Manipulation Confidence" score mean?</AccordionTrigger>
                            <AccordionContent className="text-muted-foreground">
                                This score represents the likelihood that the video has been altered using techniques like face-swapping, lip-syncing, or object removal. A higher score means our AI found more evidence of such manipulation.
                            </AccordionContent>
                        </AccordionItem>
                         <AccordionItem value="item-5">
                            <AccordionTrigger className="text-lg">What does the "AI Generation Confidence" score mean?</AccordionTrigger>
                            <AccordionContent className="text-muted-foreground">
                                This score represents the likelihood that the entire video was created by an AI model (like Sora or Veo) rather than being a recording of a real-world scene. It looks for artifacts common to fully synthetic video.
                            </AccordionContent>
                        </AccordionItem>
                    </Accordion>
                </div>
                
                {/* Final CTA Section */}
                <div className="space-y-6 bg-primary/10 p-8 rounded-lg">
                    <h3 className="text-3xl sm:text-4xl font-headline font-bold">Ready to Secure Your Media?</h3>
                    <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
                        Sign up today and start analyzing videos for free. Protect yourself and your audience from the threat of digital misinformation.
                    </p>
                    <div className="flex flex-col sm:flex-row justify-center gap-4">
                        <Button size="lg" onClick={() => router.push('/login')}>Get Started for Free <ArrowRight className="ml-2" /></Button>
                    </div>
                </div>
            </div>
        </main>
        </div>
    </SidebarProvider>
  );
}

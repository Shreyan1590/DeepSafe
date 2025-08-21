
'use client';

import { useRouter } from 'next/navigation';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import Header from '@/components/header';
import { ArrowLeft } from 'lucide-react';

export default function AboutPage() {
  const router = useRouter();

  return (
    <div className="flex flex-col min-h-screen bg-background dark:bg-background">
      <Header />
      <main className="flex-1 container mx-auto p-4 md:p-8">
        <Button variant="outline" onClick={() => router.back()} className="mb-8">
            <ArrowLeft className="mr-2 h-4 w-4" />
            Back
        </Button>
        <Card>
          <CardHeader>
            <CardTitle className="font-headline text-3xl">About DeepSafe</CardTitle>
          </CardHeader>
          <CardContent className="space-y-6 text-lg text-muted-foreground leading-relaxed">
            <section>
              <h2 className="text-2xl font-semibold text-foreground mb-2">What is DeepSafe?</h2>
              <p>
                DeepSafe is a prototype application designed to detect deepfakes in video content.
                Using advanced AI models, this tool analyzes video files to identify signs of manipulation,
                helping users distinguish between authentic and synthetically generated media. As the line
                between real and fake blurs, DeepSafe provides a crucial first line of defense against
                digital misinformation.
              </p>
            </section>
            <section>
              <h2 className="text-2xl font-semibold text-foreground mb-2">How to Use It</h2>
              <p>
                Using DeepSafe is simple. Upload a video file through the main interface. The application
                will process the video and provide a comprehensive analysis, including a confidence score
                indicating the likelihood of the video being a deepfake. The results are displayed in an
                easy-to-understand format, allowing you to quickly assess the video's authenticity.
              </p>
            </section>
            <section>
              <h2 className="text-2xl font-semibold text-foreground mb-2">Accuracy and Limitations</h2>
              <p>
                As a prototype, DeepSafe's analysis is intended for informational purposes and should not be
                considered a definitive judgment. The accuracy of deepfake detection can vary based on the
                quality of the video, the sophistication of the manipulation techniques used, and the
                constantly evolving nature of AI-generated content. While we strive for high accuracy,
                the results from DeepSafe do not constitute a guarantee.
              </p>
            </section>
            <section>
                <h2 className="text-2xl font-semibold text-foreground mb-2">The Bigger Picture</h2>
                <p>
                    DeepSafe is more than just a tool; it's part of a larger conversation about the ethical
                    implications of AI and the importance of media literacy in the digital age. We encourage
                    users to think critically about the content they consume and to use DeepSafe as one of
                    many resources in the fight against misinformation.
                </p>
            </section>
          </CardContent>
        </Card>
      </main>
    </div>
  );
}

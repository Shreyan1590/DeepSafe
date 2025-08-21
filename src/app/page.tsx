
'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  GoogleAuthProvider,
  signInWithPopup,
} from 'firebase/auth';
import { auth } from '@/lib/firebase';
import { Button } from '@/components/ui/button';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { ShieldCheck } from 'lucide-react';

export default function LandingPage() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState<string | null>(null);
  const router = useRouter();

  const handleAuthSuccess = () => {
    router.push('/dashboard');
  };

  const handleEmailPasswordSignUp = async () => {
    setError(null);
    try {
      await createUserWithEmailAndPassword(auth, email, password);
      handleAuthSuccess();
    } catch (err: any) {
      setError(err.message);
    }
  };

  const handleEmailPasswordLogin = async () => {
    setError(null);
    try {
      await signInWithEmailAndPassword(auth, email, password);
      handleAuthSuccess();
    } catch (err: any) {
      setError(err.message);
    }
  };

  const handleGoogleSignIn = async () => {
    setError(null);
    const provider = new GoogleAuthProvider();
    try {
      await signInWithPopup(auth, provider);
      handleAuthSuccess();
    } catch (err: any) {
      setError(err.message);
    }
  };

  return (
    <div className="flex flex-col min-h-screen bg-background">
      <header className="py-4 px-4 md:px-6 bg-card border-b sticky top-0 z-50">
        <div className="container mx-auto flex items-center justify-between">
          <div className="flex items-center gap-3">
            <ShieldCheck className="h-7 w-7 md:h-8 md:w-8 text-primary" />
            <h1 className="text-xl md:text-2xl font-headline font-bold text-foreground">
              DeepSafe
            </h1>
          </div>
        </div>
      </header>

      <main className="flex-1 container mx-auto p-4 md:p-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          <div className="space-y-8">
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
                        Using DeepSafe is simple. Sign up or log in, then upload a video file through the main interface. The application
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
          </div>
          
          <div className="flex justify-center">
            <Tabs defaultValue="login" className="w-full max-w-md">
                <TabsList className="grid w-full grid-cols-2">
                    <TabsTrigger value="login">Login</TabsTrigger>
                    <TabsTrigger value="signup">Sign Up</TabsTrigger>
                </TabsList>
                <TabsContent value="login">
                    <Card>
                    <CardHeader>
                        <CardTitle>Login</CardTitle>
                        <CardDescription>
                        Access your account to continue.
                        </CardDescription>
                    </CardHeader>
                    <CardContent className="space-y-4">
                        <div className="space-y-2">
                        <Label htmlFor="login-email">Email</Label>
                        <Input
                            id="login-email"
                            type="email"
                            placeholder="m@example.com"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            required
                        />
                        </div>
                        <div className="space-y-2">
                        <Label htmlFor="login-password">Password</Label>
                        <Input
                            id="login-password"
                            type="password"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            required
                        />
                        </div>
                        {error && <p className="text-destructive text-sm">{error}</p>}
                        <Button onClick={handleEmailPasswordLogin} className="w-full">
                        Login with Email
                        </Button>
                        <div className="relative my-4">
                            <div className="absolute inset-0 flex items-center">
                                <span className="w-full border-t" />
                            </div>
                            <div className="relative flex justify-center text-xs uppercase">
                                <span className="bg-card px-2 text-muted-foreground">
                                Or continue with
                                </span>
                            </div>
                        </div>
                        <Button variant="outline" onClick={handleGoogleSignIn} className="w-full">
                        Sign In with Google
                        </Button>
                    </CardContent>
                    </Card>
                </TabsContent>
                <TabsContent value="signup">
                    <Card>
                    <CardHeader>
                        <CardTitle>Sign Up</CardTitle>
                        <CardDescription>
                        Create an account to get started.
                        </CardDescription>
                    </CardHeader>
                    <CardContent className="space-y-4">
                        <div className="space-y-2">
                        <Label htmlFor="signup-email">Email</Label>
                        <Input
                            id="signup-email"
                            type="email"
                            placeholder="m@example.com"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            required
                        />
                        </div>
                        <div className="space-y-2">
                        <Label htmlFor="signup-password">Password</Label>
                        <Input
                            id="signup-password"
                            type="password"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            required
                        />
                        </div>
                        {error && <p className="text-destructive text-sm">{error}</p>}
                        <Button onClick={handleEmailPasswordSignUp} className="w-full">
                        Sign Up with Email
                        </Button>
                        <div className="relative my-4">
                            <div className="absolute inset-0 flex items-center">
                                <span className="w-full border-t" />
                            </div>
                            <div className="relative flex justify-center text-xs uppercase">
                                <span className="bg-card px-2 text-muted-foreground">
                                Or continue with
                                </span>
                            </div>
                        </div>
                        <Button variant="outline" onClick={handleGoogleSignIn} className="w-full">
                        Sign Up with Google
                        </Button>
                    </CardContent>
                    </Card>
                </TabsContent>
            </Tabs>
          </div>
        </div>
      </main>
    </div>
  );
}

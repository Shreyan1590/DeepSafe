
'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  GoogleAuthProvider,
  signInWithPopup,
  onAuthStateChanged
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
import { useToast } from '@/hooks/use-toast';

export default function LoginPage() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState<string | null>(null);
  const router = useRouter();
  const { toast } = useToast();

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      if (user) {
        router.push('/dashboard');
      }
    });
    return () => unsubscribe();
  }, [router]);

  const handleAuthSuccess = () => {
    router.push('/dashboard');
    toast({
        title: 'Success!',
        description: "You're now logged in.",
    });
  };
  
  const handleAuthError = (err: any) => {
      let message = "An unknown error occurred.";
      if (err.code) {
          switch (err.code) {
              case "auth/wrong-password":
                  message = "Incorrect password. Please try again.";
                  break;
              case "auth/user-not-found":
                  message = "No user found with this email. Please sign up.";
                  break;
              case "auth/email-already-in-use":
                  message = "This email is already registered. Please log in.";
                  break;
              default:
                  message = err.message;
          }
      } else {
        message = err.message;
      }
      setError(message);
      toast({
          variant: "destructive",
          title: "Authentication Failed",
          description: message,
      });
  }

  const handleEmailPasswordSignUp = async () => {
    setError(null);
    if (password.length < 6) {
        setError("Password must be at least 6 characters long.");
        return;
    }
    try {
      await createUserWithEmailAndPassword(auth, email, password);
      handleAuthSuccess();
    } catch (err: any) {
      handleAuthError(err);
    }
  };

  const handleEmailPasswordLogin = async () => {
    setError(null);
    try {
      await signInWithEmailAndPassword(auth, email, password);
      handleAuthSuccess();
    } catch (err: any) {
      handleAuthError(err);
    }
  };

  const handleGoogleSignIn = async () => {
    setError(null);
    const provider = new GoogleAuthProvider();
    try {
      await signInWithPopup(auth, provider);
      handleAuthSuccess();
    } catch (err: any) {
      handleAuthError(err);
    }
  };

  return (
    <div className="flex flex-col min-h-screen bg-background">
        <header className="py-4 px-4 md:px-6 bg-card border-b sticky top-0 z-50">
            <div className="container mx-auto flex items-center justify-between">
                <a href="/" className="flex items-center gap-3">
                    <ShieldCheck className="h-7 w-7 md:h-8 md:w-8 text-primary" />
                    <h1 className="text-xl md:text-2xl font-headline font-bold text-foreground">
                    DeepSafe
                    </h1>
                </a>
            </div>
        </header>

        <main className="flex-1 container mx-auto p-4 md:p-8 flex items-center justify-center">
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
        </main>
    </div>
  );
}

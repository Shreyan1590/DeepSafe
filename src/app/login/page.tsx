
'use client';

import { useState, useEffect, Suspense, useCallback } from 'react';
import { useRouter } from 'next/navigation';
import {
  getAuth,
  onAuthStateChanged,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  GoogleAuthProvider,
  signInWithPopup,
  signInWithRedirect,
  getRedirectResult,
  User,
} from 'firebase/auth';
import { app } from '@/lib/firebase'; // Use the initialized app
import { Button } from '@/components/ui/button';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogFooter,
    DialogHeader,
    DialogTitle,
} from '@/components/ui/dialog';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { ShieldCheck, ArrowLeft, Loader2 } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';
import { useIsMobile } from '@/hooks/use-mobile';
import Link from 'next/link';

const AuthForm = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState<string | null>(null);
    const [isProcessing, setIsProcessing] = useState(false);
    const [showWelcome, setShowWelcome] = useState(false);
    const [welcomeUser, setWelcomeUser] = useState<User | null>(null);
    const router = useRouter();
    const { toast } = useToast();
    const auth = getAuth(app);
    const isMobile = useIsMobile();
    const [activeTab, setActiveTab] = useState('login');

    const handleAuthSuccess = useCallback((user: User) => {
        setWelcomeUser(user);
        setShowWelcome(true);
    }, []);
    
    const handleContinueToDashboard = () => {
        setShowWelcome(false);
        router.push('/dashboard');
    }

    const handleAuthError = useCallback((err: any, context: 'login' | 'signup') => {
        let message = "An unknown error occurred.";
        if (err.code) {
            switch (err.code) {
                case "auth/wrong-password":
                case "auth/invalid-credential":
                     if (context === 'login') {
                        message = "Incorrect email or password. If you don't have an account, please sign up.";
                     } else {
                        message = "Incorrect email or password. Please try again.";
                     }
                    break;
                case "auth/user-not-found":
                    message = "No user found with this email. Please sign up first.";
                    setActiveTab('signup'); // Switch to signup tab
                    break;
                case "auth/email-already-in-use":
                    message = "This email is already registered. Please log in.";
                    setActiveTab('login'); // Switch to login tab
                    break;
                case "auth/popup-closed-by-user":
                    message = "Sign-in popup closed. Please try again.";
                    break;
                case "auth/cancelled-popup-request":
                    return; // Do nothing, user intentionally closed it.
                case "auth/auth-domain-config-required":
                case "auth/unauthorized-domain":
                     message = "This domain is not authorized for authentication.";
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
    }, [toast]);

    useEffect(() => {
        const processRedirectResult = async () => {
            setIsProcessing(true);
            try {
                const result = await getRedirectResult(auth);
                if (result) {
                    handleAuthSuccess(result.user);
                }
            } catch (err: any) {
                handleAuthError(err, 'login');
            } finally {
                setIsProcessing(false);
            }
        };
        processRedirectResult();
    }, [auth, handleAuthSuccess, handleAuthError]);


    const handleEmailPasswordSignUp = async () => {
        setError(null);
        if (password.length < 6) {
            setError("Password must be at least 6 characters long.");
            return;
        }
        try {
            const userCredential = await createUserWithEmailAndPassword(auth, email, password);
            handleAuthSuccess(userCredential.user);
        } catch (err: any) {
            handleAuthError(err, 'signup');
        }
    };

    const handleEmailPasswordLogin = async () => {
        setError(null);
        try {
            const userCredential = await signInWithEmailAndPassword(auth, email, password);
            handleAuthSuccess(userCredential.user);
        } catch (err: any) {
            handleAuthError(err, 'login');
        }
    };

    const handleGoogleSignIn = async () => {
        setError(null);
        const provider = new GoogleAuthProvider();
        try {
            if (isMobile) {
                await signInWithRedirect(auth, provider);
            } else {
                const userCredential = await signInWithPopup(auth, provider);
                handleAuthSuccess(userCredential.user);
            }
        } catch (err: any) {
            handleAuthError(err, 'login');
        }
    };
    
    if (isProcessing) {
        return (
            <div className="flex flex-col items-center justify-center gap-4 p-8">
                <Loader2 className="h-12 w-12 animate-spin text-primary" />
                <p className="text-muted-foreground">Signing in...</p>
            </div>
        )
    }

    return (
        <>
         <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full max-w-md">
            <TabsList className="grid w-full grid-cols-2">
                <TabsTrigger value="login">Login</TabsTrigger>
                <TabsTrigger value="signup">Sign Up</TabsTrigger>
            </TabsList>
            <TabsContent value="login">
                <Card className="bg-card/50 border-border/50 backdrop-blur-sm">
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
                <Card className="bg-card/50 border-border/50 backdrop-blur-sm">
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
        <Dialog open={showWelcome} onOpenChange={setShowWelcome}>
            <DialogContent>
                <DialogHeader>
                    <DialogTitle className="text-center text-2xl">Welcome!</DialogTitle>
                    <DialogDescription className="text-center text-lg">
                        {welcomeUser?.email}
                    </DialogDescription>
                </DialogHeader>
                <DialogFooter>
                    <Button onClick={handleContinueToDashboard} className="w-full">Continue</Button>
                </DialogFooter>
            </DialogContent>
        </Dialog>
       </>
    )
}

export default function LoginPage() {
  const router = useRouter();
  const auth = getAuth(app);
  const [isCheckingAuth, setIsCheckingAuth] = useState(true);
  
  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      // Don't auto-redirect, let the form handle the success state or redirect result
      setIsCheckingAuth(false);
    });
    return () => unsubscribe();
  }, [auth]);

  return (
    <div className="relative flex flex-col min-h-screen bg-background w-full h-full">
        <header className="py-4 px-4 md:px-6 bg-transparent sticky top-0 z-50">
            <div className="container mx-auto flex items-center justify-between">
                <Link href="/" className="flex items-center gap-2 sm:gap-3">
                    <ShieldCheck className="h-7 w-7 sm:h-8 sm:w-8 text-primary" />
                    <h1 className="text-xl sm:text-2xl font-headline font-bold text-foreground">
                    DeepSafe
                    </h1>
                </Link>
            </div>
        </header>

        <main className="flex-1 container mx-auto p-4 md:p-8 flex flex-col items-center justify-center gap-6">
            <Suspense fallback={<div>Loading...</div>}>
                {isCheckingAuth ? 
                    <div className="flex flex-col items-center justify-center gap-4 p-8">
                        <Loader2 className="h-12 w-12 animate-spin text-primary" />
                        <p className="text-muted-foreground">Loading...</p>
                    </div> : <AuthForm />
                }
            </Suspense>
            <Button variant="outline" onClick={() => router.push('/')}>
                <ArrowLeft className="mr-2 h-4 w-4" /> Back to Home
            </Button>
        </main>
    </div>
  );
}

    
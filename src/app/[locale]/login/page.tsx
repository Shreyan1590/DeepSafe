
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
import { motion } from 'framer-motion';
import { useTranslations } from 'next-intl';
import Header from '@/components/header';
import { Link } from '@/navigation';


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
    const t = useTranslations('LoginPage');

    const handleAuthSuccess = useCallback((user: User) => {
        setWelcomeUser(user);
        setShowWelcome(true);
    }, []);
    
    const handleContinueToDashboard = () => {
        setShowWelcome(false);
        router.push('/dashboard');
    }

    const handleAuthError = useCallback((err: any, context: 'login' | 'signup') => {
        let message = t('errorUnknown');
        if (err.code) {
            switch (err.code) {
                case "auth/wrong-password":
                case "auth/invalid-credential":
                     if (context === 'login') {
                        message = t('errorNoUser');
                        setActiveTab('signup'); // Switch to signup tab
                     } else {
                        message = t('errorWrongPassword');
                     }
                    break;
                case "auth/user-not-found":
                    message = t('errorNoUser');
                    setActiveTab('signup'); // Switch to signup tab
                    break;
                case "auth/email-already-in-use":
                    message = t('errorEmailInUse');
                    setActiveTab('login'); // Switch to login tab
                    break;
                case "auth/popup-closed-by-user":
                    message = t('errorPopupClosed');
                    break;
                case "auth/cancelled-popup-request":
                    return; // Do nothing, user intentionally closed it.
                case "auth/auth-domain-config-required":
                case "auth/unauthorized-domain":
                     message = t('errorUnauthorizedDomain');
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
            title: t('authFailed'),
            description: message,
        });
    }, [toast, t]);

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
            setError(t('passwordMinLength'));
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
                <p className="text-muted-foreground">{t('signingIn')}</p>
            </div>
        )
    }

    const variants = {
        hidden: { x: activeTab === 'login' ? '-100%' : '100%', opacity: 0 },
        visible: { x: 0, opacity: 1 },
    };

    return (
        <>
         <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full max-w-md overflow-hidden">
            <TabsList className="grid w-full grid-cols-2">
                <TabsTrigger value="login">{t('login')}</TabsTrigger>
                <TabsTrigger value="signup">{t('signup')}</TabsTrigger>
            </TabsList>
            <motion.div
                 key={activeTab}
                 initial="hidden"
                 animate="visible"
                 exit="hidden"
                 variants={variants}
                 transition={{ type: 'spring', stiffness: 300, damping: 30 }}
            >
                <TabsContent value="login" forceMount>
                    <Card className="bg-card/50 border-border/50 backdrop-blur-sm">
                    <CardHeader>
                        <CardTitle>{t('login')}</CardTitle>
                        <CardDescription>
                        {t('accessAccount')}
                        </CardDescription>
                    </CardHeader>
                    <CardContent className="space-y-4">
                        <div className="space-y-2">
                        <Label htmlFor="login-email">{t('emailLabel')}</Label>
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
                        <Label htmlFor="login-password">{t('passwordLabel')}</Label>
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
                        {t('loginWithEmail')}
                        </Button>
                        <div className="relative my-4">
                            <div className="absolute inset-0 flex items-center">
                                <span className="w-full border-t" />
                            </div>
                            <div className="relative flex justify-center text-xs uppercase">
                                <span className="bg-card px-2 text-muted-foreground">
                                {t('orContinueWith')}
                                </span>
                            </div>
                        </div>
                        <Button variant="outline" onClick={handleGoogleSignIn} className="w-full">
                        {t('signInWithGoogle')}
                        </Button>
                    </CardContent>
                    </Card>
                </TabsContent>
                <TabsContent value="signup" forceMount>
                    <Card className="bg-card/50 border-border/50 backdrop-blur-sm">
                    <CardHeader>
                        <CardTitle>{t('signup')}</CardTitle>
                        <CardDescription>
                        {t('createAccount')}
                        </CardDescription>
                    </CardHeader>
                    <CardContent className="space-y-4">
                        <div className="space-y-2">
                        <Label htmlFor="signup-email">{t('emailLabel')}</Label>
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
                        <Label htmlFor="signup-password">{t('passwordLabel')}</Label>
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
                        {t('signUpWithEmail')}
                        </Button>
                        <div className="relative my-4">
                            <div className="absolute inset-0 flex items-center">
                                <span className="w-full border-t" />
                            </div>
                            <div className="relative flex justify-center text-xs uppercase">
                                <span className="bg-card px-2 text-muted-foreground">
                                {t('orContinueWith')}
                                </span>
                            </div>
                        </div>
                        <Button variant="outline" onClick={handleGoogleSignIn} className="w-full">
                        {t('signUpWithGoogle')}
                        </Button>
                    </CardContent>
                    </Card>
                </TabsContent>
            </motion.div>
        </Tabs>
        <Dialog open={showWelcome} onOpenChange={setShowWelcome}>
            <DialogContent>
                <DialogHeader>
                    <DialogTitle className="text-center text-2xl">{t('welcome')}</DialogTitle>
                    <DialogDescription className="text-center text-lg">
                        {welcomeUser?.email}
                    </DialogDescription>
                </DialogHeader>
                <DialogFooter>
                    <Button onClick={handleContinueToDashboard} className="w-full">{t('continue')}</Button>
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
  const t = useTranslations('LoginPage');
  
  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      // Don't auto-redirect, let the form handle the success state or redirect result
      setIsCheckingAuth(false);
    });
    return () => unsubscribe();
  }, [auth]);

  return (
    <div className="relative flex flex-col min-h-screen bg-background w-full h-full">
        <Header />
        <main className="flex-1 container mx-auto p-4 md:p-8 flex flex-col items-center justify-center gap-6">
            <Suspense fallback={<div>{t('loading')}</div>}>
                {isCheckingAuth ? 
                    <div className="flex flex-col items-center justify-center gap-4 p-8">
                        <Loader2 className="h-12 w-12 animate-spin text-primary" />
                        <p className="text-muted-foreground">{t('loading')}</p>
                    </div> : <AuthForm />
                }
            </Suspense>
            <Button variant="outline" asChild>
                <Link href="/">
                    <ArrowLeft className="mr-2 h-4 w-4" /> {t('backToHome')}
                </Link>
            </Button>
        </main>
    </div>
  );
}

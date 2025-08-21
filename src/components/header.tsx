
'use client';

import { ShieldCheck, ArrowLeft } from 'lucide-react';
import { Button } from './ui/button';
<<<<<<< HEAD
import { getAuth } from 'firebase/auth';
import { app } from '@/lib/firebase';
=======
>>>>>>> 5fc607e (In this, when going to in live server by the url or in any mobile, I can)
import { useRouter, usePathname } from 'next/navigation';
import { SidebarTrigger } from './ui/sidebar';
import Link from 'next/link';

export default function Header({
    children,
}: {
    children?: React.ReactNode;
}) {
  const pathname = usePathname();
<<<<<<< HEAD
  const { toast } = useToast();
  const user = useAuth();
  
  const handleSignOut = async () => {
    const auth = getAuth(app);
    try {
      await auth.signOut();
      router.push('/login');
      toast({
        title: "Signed Out",
        description: "You have been successfully signed out.",
      });
    } catch (error) {
      toast({
        variant: 'destructive',
        title: "Sign Out Failed",
        description: "There was an error signing out. Please try again.",
      });
    }
  };

  const isLoginPage = pathname === '/login';
=======
  const isDashboard = pathname === '/dashboard';
>>>>>>> 5fc607e (In this, when going to in live server by the url or in any mobile, I can)

  return (
    <header className="py-4 px-4 md:px-6 bg-card border-b sticky top-0 z-50">
      <div className="container mx-auto flex items-center justify-between gap-4">
        <div className="flex items-center gap-3">
            {isDashboard && <SidebarTrigger />}
            <Link href="/" className="flex items-center gap-3 cursor-pointer">
                <ShieldCheck className="h-8 w-8 text-primary" />
                <h1 className="text-2xl font-headline font-bold text-foreground hidden sm:block">
                DeepSafe
                </h1>
            </Link>
        </div>
        <div className="flex items-center gap-2">
            {isDashboard && (
                 <Button variant="outline" asChild>
                    <Link href="/">
                        <ArrowLeft className="mr-2 h-4 w-4" /> Back to Home
                    </Link>
                </Button>
            )}
        </div>
      </div>
    </header>
  );
}

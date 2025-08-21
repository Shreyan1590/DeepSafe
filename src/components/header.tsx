
'use client';

import { ShieldCheck, LogOut, ArrowLeft } from 'lucide-react';
import { Button } from './ui/button';
import { auth } from '@/lib/firebase';
import { useRouter, usePathname } from 'next/navigation';
import { useToast } from '@/hooks/use-toast';
import { useAuth } from '@/hooks/use-auth';
import { SidebarTrigger } from './ui/sidebar';
import Link from 'next/link';

export default function Header({
    children,
}: {
    children?: React.ReactNode;
}) {
  const router = useRouter();
  const pathname = usePathname();
  const { toast } = useToast();
  const user = useAuth();
  
  const handleSignOut = async () => {
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

  return (
    <header className="py-4 px-4 md:px-6 bg-card border-b sticky top-0 z-50">
      <div className="container mx-auto flex items-center justify-between gap-4">
        <div className="flex items-center gap-3">
            {!isLoginPage && <SidebarTrigger />}
            <Link href="/" className="flex items-center gap-3 cursor-pointer">
                <ShieldCheck className="h-8 w-8 text-primary" />
                <h1 className="text-2xl font-headline font-bold text-foreground hidden sm:block">
                DeepSafe
                </h1>
            </Link>
        </div>
        <div className="flex items-center gap-2">
            {user ? (
                <Button variant="ghost" size="icon" onClick={handleSignOut} aria-label={"Sign Out"}>
                    <LogOut />
                </Button>
            ) : isLoginPage && (
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

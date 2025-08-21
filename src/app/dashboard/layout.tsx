
'use client';

import Header from '@/components/header';
import type { ReactNode } from 'react';
import Sidebar from '@/components/sidebar';
import { SidebarProvider } from '@/components/ui/sidebar';
import { useState, useEffect } from 'react';
import DashboardPage from './page';
import Profile from '@/components/profile';
import Settings from '@/components/settings';
import { useAuth } from '@/hooks/use-auth';
import { Skeleton } from '@/components/ui/skeleton';
import { useRouter } from 'next/navigation';
import { Loader2 } from 'lucide-react';

export const dynamic = 'force-dynamic';

export default function DashboardLayout({
  children,
}: {
  children: ReactNode;
}) {
  const [activeView, setActiveView] = useState('dashboard');
  const user = useAuth();
  const router = useRouter();
  const [isCheckingAuth, setIsCheckingAuth] = useState(true);

  useEffect(() => {
    // useAuth hook will handle the user state.
    // We just need to know when the initial check is done.
    const initialAuthCheck = setTimeout(() => {
        if (user === null) {
            router.push('/login');
        } else {
            setIsCheckingAuth(false);
        }
    }, 500); // Give useAuth a moment to initialize

    return () => clearTimeout(initialAuthCheck);

  }, [user, router]);


  const renderContent = () => {
    switch (activeView) {
      case 'profile':
        return <Profile user={user!} />; // user is guaranteed to be non-null here
      case 'settings':
        return <Settings />;
      case 'dashboard':
      default:
        return <DashboardPage user={user!} />; // user is guaranteed to be non-null here
    }
  };

  if (isCheckingAuth) {
    return (
        <div className="flex items-center justify-center min-h-screen bg-background dark">
            <div className="flex flex-col items-center justify-center gap-4 p-8">
                <Loader2 className="h-12 w-12 animate-spin text-primary" />
                <p className="text-muted-foreground">Loading Dashboard...</p>
            </div>
        </div>
    );
  }

  return (
    <SidebarProvider>
      <div className="flex min-h-screen w-full flex-col bg-background">
        <Header />
        <div className="flex flex-1">
          <Sidebar activeView={activeView} setActiveView={setActiveView} />
          <main className="flex-1 p-4 sm:p-6 md:p-8">
            {renderContent()}
          </main>
        </div>
      </div>
    </SidebarProvider>
  );
}


'use client';

import Header from '@/components/header';
import type { ReactNode } from 'react';
import Sidebar from '@/components/sidebar';
import { SidebarProvider } from '@/components/ui/sidebar';
import { useState } from 'react';
import DashboardPage from './page';
import Profile from '@/components/profile';
import Settings from '@/components/settings';
import { useAuth } from '@/hooks/use-auth';
import { Skeleton } from '@/components/ui/skeleton';
import { useRouter } from 'next/navigation';
import { useEffect } from 'react';

export default function DashboardLayout({
  children,
}: {
  children: ReactNode;
}) {
  const [activeView, setActiveView] = useState('dashboard');
  const user = useAuth();
  const router = useRouter();

  useEffect(() => {
    if (user === null) {
      router.push('/login');
    }
  }, [user, router]);


  const renderContent = () => {
    if (!user) {
         return (
            <div className="flex items-center justify-center min-h-screen bg-background dark">
                <Skeleton className="h-screen w-full bg-card" />
            </div>
         );
    }
    switch (activeView) {
      case 'profile':
        return <Profile user={user} />;
      case 'settings':
        return <Settings />;
      case 'dashboard':
      default:
        return <DashboardPage user={user} />;
    }
  };

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


'use client';

import Header from '@/components/header';
import type { ReactNode } from 'react';
import Sidebar from '@/components/sidebar';
import { SidebarProvider } from '@/components/ui/sidebar';
import { useState } from 'react';
import DashboardPage from './page';
import Settings from '@/components/settings';

export default function DashboardLayout({
  children,
}: {
  children: ReactNode;
}) {
  const [activeView, setActiveView] = useState('dashboard');

  const renderContent = () => {
    switch (activeView) {
      case 'settings':
        return <Settings />;
      case 'dashboard':
      default:
        return <DashboardPage />;
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

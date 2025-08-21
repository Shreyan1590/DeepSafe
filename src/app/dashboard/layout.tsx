'use client';

import Header from '@/components/header';
import { SidebarProvider } from '@/components/ui/sidebar';
import type { ReactNode } from 'react';

export default function DashboardLayout({
  children,
}: {
  children: ReactNode;
}) {

  return (
    <SidebarProvider>
      <div className="flex min-h-screen w-full flex-col bg-background">
        <div className="flex flex-col flex-1">
          <Header />
          <div className="flex flex-1">
             {children}
          </div>
        </div>
      </div>
    </SidebarProvider>
  );
}

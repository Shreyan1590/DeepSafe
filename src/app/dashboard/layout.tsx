
'use client';

import Header from '@/components/header';
import { Sidebar, SidebarProvider, SidebarTrigger, SidebarContent, SidebarMenu, SidebarMenuItem, SidebarMenuButton } from '@/components/ui/sidebar';
import { LayoutDashboard, Settings, User } from 'lucide-react';
import type { ReactNode } from 'react';

export default function DashboardLayout({
  children,
}: {
  children: ReactNode;
}) {

  return (
    <SidebarProvider>
      <div className="flex min-h-screen w-full flex-col bg-background dark">
        <div className="flex flex-col flex-1">
          <Header>
             <SidebarTrigger className="sm:hidden" />
          </Header>
          <div className="flex flex-1">
             {children}
          </div>
        </div>
      </div>
    </SidebarProvider>
  );
}

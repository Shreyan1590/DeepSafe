
'use client';

import { useState } from 'react';
import Header from '@/components/header';
import { Sidebar, SidebarProvider, SidebarTrigger, SidebarInset } from '@/components/ui/sidebar';
import { Button } from '@/components/ui/button';
import { LayoutDashboard, Settings, User } from 'lucide-react';
import { useIsMobile } from '@/hooks/use-mobile';


const navItems = [
  { name: 'Dashboard', view: 'dashboard', icon: LayoutDashboard },
  { name: 'Profile', view: 'profile', icon: User },
  { name: 'Settings', view: 'settings', icon: Settings },
];


function NavContent({ activeView, setActiveView }: { activeView: string; setActiveView: (view: string) => void }) {
  const isMobile = useIsMobile();
  return (
    <div className="flex flex-col gap-2 p-4">
      {isMobile && <div className="h-12"></div>}
      {navItems.map((item) => (
        <Button
          key={item.name}
          variant={activeView === item.view ? 'secondary' : 'ghost'}
          onClick={() => setActiveView(item.view)}
          className="justify-start gap-2"
        >
          <item.icon className="h-4 w-4" />
          {item.name}
        </Button>
      ))}
    </div>
  );
}


export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const [activeView, setActiveView] = useState('dashboard');

  return (
    <SidebarProvider>
      <div className="flex min-h-screen w-full flex-col bg-background dark">
        <Sidebar>
          <NavContent activeView={activeView} setActiveView={setActiveView} />
        </Sidebar>
        <div className="flex flex-col flex-1">
          <Header>
             <SidebarTrigger className="sm:hidden" />
          </Header>
          <main className="flex-1 p-4 sm:p-6 md:p-8">
              {children}
          </main>
        </div>
      </div>
    </SidebarProvider>
  );
}

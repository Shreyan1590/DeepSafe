
'use client';

import {
  Sheet,
  SheetContent,
  SheetTrigger,
} from '@/components/ui/sheet';
import { Button } from '@/components/ui/button';
import {
  PanelLeft,
  Settings,
  User,
  LayoutDashboard,
} from 'lucide-react';
import { useIsMobile } from '@/hooks/use-mobile';
import { cn } from '@/lib/utils';


interface SidebarProps {
  activeView: string;
  setActiveView: (view: string) => void;
}

const navItems = [
  { name: 'Dashboard', view: 'dashboard', icon: LayoutDashboard },
  { name: 'Profile', view: 'profile', icon: User },
  { name: 'Settings', view: 'settings', icon: Settings },
];

function NavContent({ activeView, setActiveView }: SidebarProps) {
  return (
    <div className="flex flex-col gap-4 p-4">
      {navItems.map((item) => (
        <Button
          key={item.name}
          variant={activeView === item.view ? 'secondary' : 'ghost'}
          onClick={() => setActiveView(item.view)}
          className="justify-start"
        >
          <item.icon className="mr-2 h-4 w-4" />
          {item.name}
        </Button>
      ))}
    </div>
  );
}

export default function Sidebar({ activeView, setActiveView }: SidebarProps) {
  const isMobile = useIsMobile();

  if (isMobile) {
    return (
      <Sheet>
        <SheetTrigger asChild>
          <Button size="icon" variant="outline" className="sm:hidden">
            <PanelLeft className="h-5 w-5" />
            <span className="sr-only">Toggle Menu</span>
          </Button>
        </SheetTrigger>
        <SheetContent side="left" className="sm:max-w-xs">
          <NavContent activeView={activeView} setActiveView={setActiveView} />
        </SheetContent>
      </Sheet>
    );
  }

  return (
    <aside className={cn("hidden sm:block w-64 bg-card border-r")}>
       <NavContent activeView={activeView} setActiveView={setActiveView} />
    </aside>
  );
}

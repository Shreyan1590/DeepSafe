
'use client';

import {
  Sheet,
  SheetContent,
} from '@/components/ui/sheet';
import { Button } from '@/components/ui/button';
import {
  PanelLeft,
  Settings,
  User,
  LayoutDashboard,
} from 'lucide-react';
import { useIsMobile } from '@/hooks/use-mobile';
import {
    Sidebar as ReusableSidebar,
    SidebarContent,
    SidebarMenu,
    SidebarMenuItem,
    SidebarMenuButton,
    useSidebar,
} from '@/components/ui/sidebar'


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
    const { state } = useSidebar();
    return (
        <SidebarMenu>
            {navItems.map((item) => (
                <SidebarMenuItem key={item.name}>
                    <SidebarMenuButton
                        onClick={() => setActiveView(item.view)}
                        isActive={activeView === item.view}
                        tooltip={item.name}
                    >
                        <item.icon />
                        <span className="group-data-[state=expanded]:inline group-data-[state=collapsed]:hidden">{item.name}</span>
                    </SidebarMenuButton>
                </SidebarMenuItem>
            ))}
        </SidebarMenu>
  );
}

export default function Sidebar({ activeView, setActiveView }: SidebarProps) {
  const { isMobile, openMobile, setOpenMobile } = useSidebar();

  if (isMobile) {
    return (
      <Sheet open={openMobile} onOpenChange={setOpenMobile}>
        <SheetContent side="left" className="sm:max-w-xs p-0">
            <SidebarContent>
                <NavContent activeView={activeView} setActiveView={setActiveView} />
            </SidebarContent>
        </SheetContent>
      </Sheet>
    );
  }

  return (
    <ReusableSidebar>
        <SidebarContent>
            <NavContent activeView={activeView} setActiveView={setActiveView} />
        </SidebarContent>
    </ReusableSidebar>
  );
}

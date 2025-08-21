
'use client';

import {
  Sheet,
  SheetContent,
} from '@/components/ui/sheet';
import {
  Settings,
  LayoutDashboard,
} from 'lucide-react';
import {
    Sidebar as ReusableSidebar,
    SidebarContent,
    SidebarMenu,
    SidebarMenuItem,
    SidebarMenuButton,
    useSidebar,
} from '@/components/ui/sidebar';

interface SidebarProps {
  activeView: string;
  setActiveView: (view: string) => void;
}


function NavContent({ activeView, setActiveView }: SidebarProps) {
    const { state } = useSidebar();
    const navItems = [
      { name: "Dashboard", view: 'dashboard', icon: LayoutDashboard },
      { name: "Settings", view: 'settings', icon: Settings },
    ];

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

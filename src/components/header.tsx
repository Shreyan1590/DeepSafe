
'use client';

import { ShieldCheck, ArrowLeft } from 'lucide-react';
import { Button } from './ui/button';
import { usePathname } from 'next/navigation';
import { SidebarTrigger } from './ui/sidebar';
import Link from 'next/link';

export default function Header({
    children,
}: {
    children?: React.ReactNode;
}) {
  const pathname = usePathname();
  const isDashboard = pathname === '/dashboard';

  return (
    <header className="py-4 px-4 md:px-6 bg-card border-b sticky top-0 z-50">
      <div className="container mx-auto flex items-center justify-between gap-4">
        <div className="flex items-center gap-3">
            {isDashboard && <SidebarTrigger />}
            <Link href="/" className="flex items-center gap-3 cursor-pointer">
                <ShieldCheck className="h-8 w-8 text-primary" />
                <h1 className="text-2xl font-headline font-bold text-foreground hidden sm:block">
                DeepSafe
                </h1>
            </Link>
        </div>
        <div className="flex items-center gap-2">
            {isDashboard && (
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

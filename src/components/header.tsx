
'use client';

import { ShieldCheck, LogOut, Languages } from 'lucide-react';
import { Button } from './ui/button';
import { auth } from '@/lib/firebase';
import { useRouter, usePathname } from '@/navigation';
import { useToast } from '@/hooks/use-toast';
import { useAuth } from '@/hooks/use-auth';
import { SidebarTrigger } from './ui/sidebar';
import { useTranslations, useLocale } from 'next-intl';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"

function LanguageSwitcher() {
  const router = useRouter();
  const pathname = usePathname();
  const locale = useLocale();

  const handleLocaleChange = (nextLocale: string) => {
    router.replace(pathname, {locale: nextLocale});
  };

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="ghost" size="icon" aria-label="Switch language">
          <Languages />
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent>
        <DropdownMenuItem onClick={() => handleLocaleChange('en')} disabled={locale === 'en'}>
          English
        </DropdownMenuItem>
        <DropdownMenuItem onClick={() => handleLocaleChange('hi')} disabled={locale === 'hi'}>
          हिंदी (Hindi)
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}

export default function Header({
    children,
}: {
    children?: React.ReactNode;
}) {
  const router = useRouter();
  const { toast } = useToast();
  const user = useAuth();
  const t = useTranslations('Header');
  
  const handleSignOut = async () => {
    try {
      await auth.signOut();
      router.push('/login'); // Redirect to login after sign out
      toast({
        title: t('signOutSuccess'),
        description: t('signOutSuccessDesc'),
      });
    } catch (error) {
      toast({
        variant: 'destructive',
        title: t('signOutFailed'),
        description: t('signOutFailedDesc'),
      });
    }
  };

  return (
    <header className="py-4 px-4 md:px-6 bg-card border-b sticky top-0 z-50">
      <div className="container mx-auto flex items-center justify-between gap-4">
        <div className="flex items-center gap-3">
            <SidebarTrigger />
            <div className="flex items-center gap-3 cursor-pointer" onClick={() => router.push('/')}>
                <ShieldCheck className="h-8 w-8 text-primary" />
                <h1 className="text-2xl font-headline font-bold text-foreground hidden sm:block">
                DeepSafe
                </h1>
            </div>
        </div>
        <div className="flex items-center gap-2">
            <LanguageSwitcher />
            {user && (
                <Button variant="ghost" size="icon" onClick={handleSignOut} aria-label={t('signOut')}>
                    <LogOut />
                </Button>
            )}
        </div>
      </div>
    </header>
  );
}

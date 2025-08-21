
'use client';

import type { Metadata } from 'next';
import './globals.css';
<<<<<<< HEAD
import AppProviders from './providers';

=======
import { Toaster } from "@/components/ui/toaster"
<<<<<<< HEAD
<<<<<<< HEAD
import { useEffect } from 'react';
import { themes } from '@/lib/themes';
>>>>>>> 4d568ef (Create a sidebar for the application and in that, make as some sections)
=======
>>>>>>> c20f9f2 (Console Error)
=======
import { useEffect } from 'react';
>>>>>>> 51dc869 (Make as default theme is in dark. Then if the user wants to change the t)

const metadata: Metadata = {
  title: 'DeepSafe',
  description: 'AI-powered deepfake detection',
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {

  useEffect(() => {
    const storedTheme = localStorage.getItem('theme');
    if (storedTheme) {
      document.documentElement.classList.add(storedTheme);
    } else {
      document.documentElement.classList.add('dark');
    }
  }, []);

  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        <title>{String(metadata.title)}</title>
        <meta name="description" content={String(metadata.description)} />
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link href="https://fonts.googleapis.com/css2?family=Inter:wght@400;500;700&family=Space+Grotesk:wght@400;500;700&display=swap" rel="stylesheet" />
      </head>
<<<<<<< HEAD
      <body className="font-body antialiased">
        <AppProviders>
          {children}
        </AppProviders>
=======
      <body className="font-body antialiased bg-background text-foreground">
        {children}
        <Toaster />
>>>>>>> 4d568ef (Create a sidebar for the application and in that, make as some sections)
      </body>
    </html>
  );
}

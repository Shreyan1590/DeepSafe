
'use client';

import './globals.css';
<<<<<<< HEAD
import AppProviders from './providers';

=======
import { Toaster } from "@/components/ui/toaster"
<<<<<<< HEAD
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
=======
import { Inter, Space_Grotesk } from 'next/font/google';
>>>>>>> d836226 (Make the application as multilingual that can use all the languages insi)

const inter = Inter({ subsets: ['latin'], variable: '--font-inter' });
const spaceGrotesk = Space_Grotesk({ subsets: ['latin'], variable: '--font-space-grotesk' });

export default function RootLayout({
  children,
  params: {locale}
}: Readonly<{
  children: React.ReactNode;
  params: {locale: string};
}>) {
  return (
    <html lang={locale} className="dark" suppressHydrationWarning>
      <head>
        <title>DeepSafe</title>
        <meta name="description" content="AI-powered deepfake detection" />
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link href="https://fonts.googleapis.com/css2?family=Inter:wght@400;500;700&family=Space+Grotesk:wght@400;500;700&display=swap" rel="stylesheet" />
      </head>
<<<<<<< HEAD
<<<<<<< HEAD
      <body className="font-body antialiased">
        <AppProviders>
          {children}
        </AppProviders>
=======
      <body className="font-body antialiased bg-background text-foreground">
=======
      <body className={`${inter.variable} ${spaceGrotesk.variable} font-body antialiased bg-background text-foreground`}>
>>>>>>> d836226 (Make the application as multilingual that can use all the languages insi)
        {children}
        <Toaster />
>>>>>>> 4d568ef (Create a sidebar for the application and in that, make as some sections)
      </body>
    </html>
  );
}

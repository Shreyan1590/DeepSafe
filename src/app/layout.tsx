
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
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="dark" suppressHydrationWarning>
      <head>
        <title>DeepSafe</title>
        <meta name="description" content="AI-powered deepfake detection" />
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

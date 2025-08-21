
'use client';

import './globals.css';
import { Toaster } from "@/components/ui/toaster"
import { Inter, Space_Grotesk } from 'next/font/google';
import { app } from '@/lib/firebase';
import { getAnalytics } from 'firebase/analytics';
import { useEffect } from 'react';

const inter = Inter({ subsets: ['latin'], variable: '--font-inter' });
const spaceGrotesk = Space_Grotesk({ subsets: ['latin'], variable: '--font-space-grotesk' });

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {

  useEffect(() => {
    // Initialize Analytics only on the client side
    if (typeof window !== 'undefined') {
        try {
            getAnalytics(app);
        } catch (e) {
            console.error("Failed to initialize Firebase Analytics", e)
        }
    }
  }, []);

  return (
    <html lang="en" className="dark" suppressHydrationWarning>
      <head>
        <title>DeepSafe</title>
        <meta name="description" content="AI-powered deepfake detection" />
      </head>
      <body className={`${inter.variable} ${spaceGrotesk.variable} font-body antialiased bg-background text-foreground`}>
        {children}
        <Toaster />
      </body>
    </html>
  );
}

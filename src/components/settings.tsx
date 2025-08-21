
'use client';

import { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Label } from '@/components/ui/label';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { themes } from '@/lib/themes';

export default function Settings() {
  const [mounted, setMounted] = useState(false);
  const [currentTheme, setCurrentTheme] = useState('dark');
  
  useEffect(() => {
    const storedTheme = localStorage.getItem('theme') || 'dark';
    setCurrentTheme(storedTheme);
    setMounted(true);
  }, []);

  const handleThemeChange = (themeName: string) => {
    setCurrentTheme(themeName);
    const root = window.document.documentElement;
    const theme = themes.find(t => t.name === themeName);
    if (theme) {
        Object.entries(theme.cssVars).forEach(([key, value]) => {
            root.style.setProperty(key, value);
        });
        localStorage.setItem('theme', themeName);
    }
  };
  
  if (!mounted) {
    return null; // or a loading skeleton
  }

  return (
    <Card className="max-w-2xl mx-auto">
      <CardHeader>
        <CardTitle className="text-2xl">Settings</CardTitle>
        <CardDescription>Customize the look and feel of the application.</CardDescription>
      </CardHeader>
      <CardContent className="space-y-6">
        <div className="space-y-4">
            <Label className="text-lg">Theme</Label>
            <p className="text-sm text-muted-foreground">Select a theme for the application.</p>
            <RadioGroup value={currentTheme} onValueChange={handleThemeChange} className="grid grid-cols-2 sm:grid-cols-3 gap-4">
              {themes.map(theme => (
                <Label key={theme.name} htmlFor={theme.name} className="relative flex flex-col items-center justify-center rounded-md border-2 border-muted bg-popover p-4 hover:bg-accent hover:text-accent-foreground [&:has([data-state=checked])]:border-primary">
                    <RadioGroupItem value={theme.name} id={theme.name} className="sr-only" />
                    <div className="items-center rounded-md border-2 border-muted p-1">
                        <div className="space-y-2 rounded-sm bg-slate-950 p-2">
                           <div className="space-y-2 rounded-md bg-slate-800 p-2 shadow-sm">
                               <div style={{ background: theme.preview.primary }} className="h-2 w-10 rounded-lg" />
                               <div style={{ background: theme.preview.secondary }} className="h-2 w-8 rounded-lg" />
                           </div>
                           <div className="flex items-center space-x-2 rounded-md bg-slate-800 p-2 shadow-sm">
                                <div style={{ background: theme.preview.primary }} className="h-4 w-4 rounded-full" />
                                <div style={{ background: theme.preview.secondary }} className="h-2 w-16 rounded-lg" />
                           </div>
                           <div className="flex items-center space-x-2 rounded-md bg-slate-800 p-2 shadow-sm">
                                <div style={{ background: theme.preview.primary }} className="h-4 w-4 rounded-full" />
                                <div style={{ background: theme.preview.secondary }} className="h-2 w-16 rounded-lg" />
                           </div>
                        </div>
                    </div>
                    <span className="block w-full p-2 text-center font-normal">{theme.displayName}</span>
                </Label>
              ))}
            </RadioGroup>
        </div>
      </CardContent>
    </Card>
  );
}


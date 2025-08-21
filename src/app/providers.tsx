'use client';

import { Toaster } from "@/components/ui/toaster";

export default function AppProviders({
    children,
}: {
    children: React.ReactNode;
}) {
    return (
        <>
            {children}
            <Toaster />
        </>
    )
}

import { ShieldCheck } from 'lucide-react';

export default function Header() {
  return (
    <header className="py-4 px-4 md:px-6 bg-card border-b sticky top-0 z-50">
      <div className="container mx-auto flex items-center gap-3">
        <ShieldCheck className="h-7 w-7 md:h-8 md:w-8 text-primary" />
        <h1 className="text-xl md:text-2xl font-headline font-bold text-foreground">
          DeepSafe
        </h1>
      </div>
    </header>
  );
}

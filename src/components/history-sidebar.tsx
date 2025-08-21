'use client';

import type { AnalysisResult } from '@/app/dashboard/page';
import { Card, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { ScrollArea } from '@/components/ui/scroll-area';
import { History, CheckCircle2, XCircle, Trash2, Inbox } from 'lucide-react';
import { formatDistanceToNow } from 'date-fns';
import { cn } from '@/lib/utils';

interface HistorySidebarProps {
  history: AnalysisResult[];
  onSelect: (result: AnalysisResult) => void;
  onClear: () => void;
  currentAnalysisId?: string | null;
}

export default function HistorySidebar({ history, onSelect, onClear, currentAnalysisId }: HistorySidebarProps) {
  return (
    <Card className="sticky top-28 bg-card/50 border-border/50">
      <CardHeader className="flex flex-row items-center justify-between">
        <div className="flex items-center gap-3">
          <History className="h-6 w-6" />
          <CardTitle className="font-headline text-2xl">History</CardTitle>
        </div>
        {history.length > 0 && (
          <Button variant="ghost" size="icon" onClick={onClear} aria-label="Clear history">
            <Trash2 className="h-4 w-4" />
          </Button>
        )}
      </CardHeader>
      <ScrollArea className="h-[calc(60vh-7rem)] p-6 pt-0">
          {history.length > 0 ? (
            <ul className="space-y-2">
              {history.map((item) => (
                <li key={item.id}>
                  <button
                    onClick={() => onSelect(item)}
                    className={cn(
                        "w-full text-left p-3 rounded-md transition-colors flex items-start gap-4 focus:outline-none focus:ring-2 focus:ring-ring",
                        currentAnalysisId === item.id ? "bg-muted/80" : "hover:bg-muted/50"
                    )}
                  >
                    <div className="p-2 bg-transparent rounded-md">
                        {item.isDeepfake ? <XCircle className="h-5 w-5 text-red-400" /> : <CheckCircle2 className="h-5 w-5 text-green-400" />}
                    </div>
                    <div className="flex-1">
                      <p className="font-semibold truncate text-sm">{item.filename}</p>
                      <p className="text-xs text-muted-foreground">
                        {formatDistanceToNow(new Date(item.timestamp), { addSuffix: true })}
                      </p>
                    </div>
                  </button>
                </li>
              ))}
            </ul>
          ) : (
            <div className="flex flex-col items-center justify-center text-center p-8 text-muted-foreground space-y-4 h-full">
              <Inbox className="h-16 w-16" />
              <p className="font-semibold text-lg">No History</p>
              <p className="text-sm">Your past analyses will appear here.</p>
            </div>
          )}
        </ScrollArea>
    </Card>
  );
}

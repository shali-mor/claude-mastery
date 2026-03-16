'use client';

import { useState } from 'react';
import { ChevronDown } from 'lucide-react';
import { LessonContent } from '@/components/modules/LessonContent';
import type { ContentBlock } from '@/types/module';

interface Props {
  title: string;
  description: string;
  estimatedMinutes: number;
  blocks: ContentBlock[];
}

export function CollapsibleSampleLesson({ title, description, estimatedMinutes, blocks }: Props) {
  const [open, setOpen] = useState(false);

  return (
    <div className="rounded-xl border border-orange-500/30 bg-card overflow-hidden">
      <button
        onClick={() => setOpen(!open)}
        className="w-full text-left bg-orange-500/10 border-b border-orange-500/20 px-6 py-4 flex items-start gap-3 hover:bg-orange-500/15 transition-colors"
      >
        <div className="flex-1">
          <div className="text-xs text-orange-500 font-medium mb-1">Module 7 — Sub-Agents &amp; Parallelization</div>
          <div className="text-xl font-semibold">{title}</div>
          <p className="text-sm text-muted-foreground mt-1">{description}</p>
          <div className="text-xs text-muted-foreground mt-2">~{estimatedMinutes} min read</div>
        </div>
        <ChevronDown className={`h-5 w-5 text-orange-500 mt-1 shrink-0 transition-transform ${open ? 'rotate-180' : ''}`} />
      </button>
      {open && (
        <div className="p-6">
          <LessonContent blocks={blocks} />
        </div>
      )}
    </div>
  );
}

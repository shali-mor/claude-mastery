'use client';

import { useState } from 'react';
import { ChevronDown, ChevronUp } from 'lucide-react';
import { Badge } from '@/components/ui/badge';
import { CodeBlock } from '@/components/ui/CodeBlock';
import type { Command } from '@/types/command';

interface CommandCardProps {
  command: Command;
  categoryColor: string;
  showCategory?: boolean;
}

const categoryLabels: Record<string, string> = {
  'slash-command': 'Slash Command',
  'gsd-plugin': 'GSD Plugin',
  'hook': 'Hook',
  'skill': 'Skill',
  'cli-flag': 'CLI Flag',
  'keyboard-shortcut': 'Shortcut',
};

export function CommandCard({ command, categoryColor, showCategory = false }: CommandCardProps) {
  const [expanded, setExpanded] = useState(false);

  return (
    <div className="border border-border rounded-lg overflow-hidden transition-all hover:border-border/80">
      {/* Header row */}
      <button
        onClick={() => setExpanded(!expanded)}
        className="w-full flex items-start gap-3 p-4 text-left hover:bg-muted/30 transition-colors"
        aria-expanded={expanded}
      >
        <div className="flex-1 min-w-0">
          <div className="flex flex-wrap items-center gap-2 mb-1">
            <code className="text-sm font-mono font-semibold text-foreground">{command.name}</code>
            {showCategory && (
              <span className={`text-xs px-2 py-0.5 rounded-full border font-medium ${categoryColor}`}>
                {categoryLabels[command.category] ?? command.category}
              </span>
            )}
          </div>
          <p className="text-sm text-muted-foreground">{command.summary}</p>
        </div>
        <div className="flex-shrink-0 mt-0.5">
          {expanded
            ? <ChevronUp className="h-4 w-4 text-muted-foreground" />
            : <ChevronDown className="h-4 w-4 text-muted-foreground" />
          }
        </div>
      </button>

      {/* Expanded content */}
      {expanded && (
        <div className="px-4 pb-4 space-y-4 border-t border-border bg-muted/10">
          <p className="text-sm text-foreground pt-4 leading-relaxed">{command.description}</p>

          {command.syntax && (
            <div>
              <p className="text-xs font-semibold text-muted-foreground uppercase tracking-wider mb-2">Syntax</p>
              <CodeBlock code={command.syntax} language="bash" />
            </div>
          )}

          {command.examples.length > 0 && (
            <div>
              <p className="text-xs font-semibold text-muted-foreground uppercase tracking-wider mb-2">Examples</p>
              <div className="space-y-2">
                {command.examples.map((ex, i) => (
                  <CodeBlock key={i} code={ex} language="bash" />
                ))}
              </div>
            </div>
          )}

          {command.tags.length > 0 && (
            <div className="flex flex-wrap gap-1.5">
              {command.tags.map(tag => (
                <Badge key={tag} variant="secondary" className="text-xs">
                  {tag}
                </Badge>
              ))}
            </div>
          )}
        </div>
      )}
    </div>
  );
}

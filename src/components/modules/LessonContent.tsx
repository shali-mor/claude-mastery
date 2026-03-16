'use client';

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  Info, AlertTriangle, CheckCircle, XCircle, Lightbulb,
  Eye, EyeOff, Square, CheckSquare, Minus, Plus, ChevronRight,
} from 'lucide-react';
import dynamic from 'next/dynamic';
import { CodeBlock } from '@/components/ui/CodeBlock';
import { cn } from '@/lib/utils';
import type { ContentBlock, CalloutVariant, ChecklistItem } from '@/types/module';

const ContextVsSkillsVisual = dynamic(
  () => import('@/components/lessons/ContextVsSkillsVisual'),
  { ssr: false },
);

const StockBotWorkflow = dynamic(
  () => import('@/components/lessons/StockBotWorkflow'),
  { ssr: false },
);

const N8nIntro = dynamic(
  () => import('@/components/lessons/N8nIntro'),
  { ssr: false },
);

// ─── Inline text: renders `backtick code` and **bold** inline ───────────────
function InlineText({ text }: { text: string }) {
  const parts = text.split(/(`[^`]+`|\*\*[^*]+\*\*)/g);
  return (
    <>
      {parts.map((part, i) => {
        if (part.startsWith('`') && part.endsWith('`')) {
          return (
            <code key={i} className="px-1.5 py-0.5 rounded bg-muted font-mono text-xs text-primary border border-border">
              {part.slice(1, -1)}
            </code>
          );
        }
        if (part.startsWith('**') && part.endsWith('**')) {
          return <strong key={i} className="font-semibold text-foreground">{part.slice(2, -2)}</strong>;
        }
        return <span key={i}>{part}</span>;
      })}
    </>
  );
}

// ─── Text block: each paragraph with inline code support ────────────────────
function TextBlock({ content }: { content: string }) {
  return (
    <div className="space-y-3">
      {content.split('\n\n').map((para, i) => (
        <p key={i} className="text-sm leading-7 text-foreground">
          <InlineText text={para} />
        </p>
      ))}
    </div>
  );
}

// ─── Heading block ───────────────────────────────────────────────────────────
function HeadingBlock({ content, level = 2 }: { content: string; level?: 2 | 3 }) {
  if (level === 3) {
    return (
      <h3 className="text-base font-semibold text-foreground mt-2 flex items-center gap-2">
        <span className="w-1 h-4 rounded-full bg-primary/60 inline-block" />
        {content}
      </h3>
    );
  }
  return (
    <h2 className="text-lg font-semibold text-foreground border-b border-border pb-2 mt-2">
      {content}
    </h2>
  );
}

// ─── Callout block ───────────────────────────────────────────────────────────
const calloutConfig: Record<CalloutVariant, { icon: React.ReactNode; classes: string; label: string }> = {
  info: {
    icon: <Info className="h-4 w-4 text-blue-500 flex-shrink-0 mt-0.5" />,
    classes: 'bg-blue-500/8 border-blue-500/30 text-foreground',
    label: 'Note',
  },
  warning: {
    icon: <AlertTriangle className="h-4 w-4 text-yellow-500 flex-shrink-0 mt-0.5" />,
    classes: 'bg-yellow-500/8 border-yellow-500/30 text-foreground',
    label: 'Warning',
  },
  success: {
    icon: <CheckCircle className="h-4 w-4 text-green-500 flex-shrink-0 mt-0.5" />,
    classes: 'bg-green-500/8 border-green-500/30 text-foreground',
    label: 'Good to know',
  },
  error: {
    icon: <XCircle className="h-4 w-4 text-red-500 flex-shrink-0 mt-0.5" />,
    classes: 'bg-red-500/8 border-red-500/30 text-foreground',
    label: 'Caution',
  },
  tip: {
    icon: <Lightbulb className="h-4 w-4 text-primary flex-shrink-0 mt-0.5" />,
    classes: 'bg-primary/8 border-primary/30 text-foreground',
    label: 'Pro tip',
  },
};

function CalloutBlock({ content, variant = 'info' }: { content: string; variant?: CalloutVariant }) {
  const cfg = calloutConfig[variant];
  return (
    <div className={cn('rounded-lg border p-4 text-sm', cfg.classes)}>
      <div className="flex gap-3">
        {cfg.icon}
        <div>
          <span className="font-semibold text-xs uppercase tracking-wider opacity-70 block mb-1">{cfg.label}</span>
          <span className="leading-6"><InlineText text={content} /></span>
        </div>
      </div>
    </div>
  );
}

// ─── Steps block ─────────────────────────────────────────────────────────────
function StepsBlock({ steps }: { steps: string[] }) {
  return (
    <ol className="space-y-3">
      {steps.map((step, i) => (
        <li key={i} className="flex gap-4 text-sm">
          <span className="flex-shrink-0 w-7 h-7 rounded-full bg-primary text-primary-foreground flex items-center justify-center text-xs font-bold">
            {i + 1}
          </span>
          <div className="flex-1 pt-0.5 leading-6">
            <InlineText text={step} />
          </div>
        </li>
      ))}
    </ol>
  );
}

// ─── Tabs block ──────────────────────────────────────────────────────────────
function TabsBlock({ tabs }: { tabs: NonNullable<ContentBlock['tabs']> }) {
  const [active, setActive] = useState(0);
  return (
    <div className="rounded-lg border border-border overflow-hidden">
      <div className="flex overflow-x-auto bg-muted/40 border-b border-border">
        {tabs.map((tab, i) => (
          <button
            key={i}
            onClick={() => setActive(i)}
            className={cn(
              'px-4 py-2.5 text-xs font-medium whitespace-nowrap transition-colors',
              active === i
                ? 'bg-card border-b-2 border-primary text-primary'
                : 'text-muted-foreground hover:text-foreground hover:bg-muted/60'
            )}
          >
            {tab.label}
          </button>
        ))}
      </div>
      <AnimatePresence mode="wait">
        <motion.div
          key={active}
          initial={{ opacity: 0, y: 4 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.15 }}
        >
          <CodeBlock
            code={tabs[active].content}
            language={tabs[active].language ?? 'bash'}
            className="rounded-none border-0"
          />
        </motion.div>
      </AnimatePresence>
    </div>
  );
}

// ─── Exercise block ───────────────────────────────────────────────────────────
function ExerciseBlock({ exercise, content }: { exercise: NonNullable<ContentBlock['exercise']>; content: string }) {
  const [showHint, setShowHint] = useState<number | null>(null);
  const [showSolution, setShowSolution] = useState(false);
  const [done, setDone] = useState(false);
  const hints = exercise.hints ?? [];

  return (
    <div className="rounded-xl border-2 border-dashed border-primary/30 bg-primary/4 overflow-hidden">
      {/* Header */}
      <div className="flex items-center gap-3 px-5 py-3 bg-primary/8 border-b border-primary/20">
        <div className="w-6 h-6 rounded-full bg-primary flex items-center justify-center">
          <span className="text-primary-foreground text-xs font-bold">✎</span>
        </div>
        <span className="text-sm font-semibold text-primary">Try it yourself</span>
        <button
          onClick={() => setDone(d => !d)}
          className="ml-auto flex items-center gap-1.5 text-xs text-muted-foreground hover:text-foreground transition-colors"
        >
          {done
            ? <><CheckSquare className="h-4 w-4 text-green-500" /><span className="text-green-600">Done!</span></>
            : <><Square className="h-4 w-4" /><span>Mark complete</span></>
          }
        </button>
      </div>

      {/* Prompt */}
      <div className="px-5 py-4">
        <p className="text-sm leading-6 font-medium text-foreground mb-1">{content}</p>
        <p className="text-sm leading-6 text-muted-foreground">
          <InlineText text={exercise.prompt} />
        </p>
      </div>

      {/* Hints */}
      {hints.length > 0 && (
        <div className="px-5 pb-2 space-y-2">
          {hints.map((hint, i) => (
            <div key={i}>
              <button
                onClick={() => setShowHint(showHint === i ? null : i)}
                className="flex items-center gap-2 text-xs text-primary hover:underline"
              >
                {showHint === i ? <Minus className="h-3 w-3" /> : <Plus className="h-3 w-3" />}
                Hint {i + 1}
              </button>
              <AnimatePresence>
                {showHint === i && (
                  <motion.div
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: 'auto', opacity: 1 }}
                    exit={{ height: 0, opacity: 0 }}
                    transition={{ duration: 0.2 }}
                    className="overflow-hidden"
                  >
                    <p className="text-xs text-muted-foreground mt-1 pl-5 leading-5">
                      <InlineText text={hint} />
                    </p>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          ))}
        </div>
      )}

      {/* Solution toggle */}
      <div className="px-5 pb-4 pt-2">
        <button
          onClick={() => setShowSolution(s => !s)}
          className="flex items-center gap-2 text-xs font-medium text-muted-foreground hover:text-foreground transition-colors border border-border rounded-md px-3 py-1.5 bg-card"
        >
          {showSolution ? <EyeOff className="h-3.5 w-3.5" /> : <Eye className="h-3.5 w-3.5" />}
          {showSolution ? 'Hide solution' : 'Show solution'}
        </button>
        <AnimatePresence>
          {showSolution && (
            <motion.div
              initial={{ height: 0, opacity: 0 }}
              animate={{ height: 'auto', opacity: 1 }}
              exit={{ height: 0, opacity: 0 }}
              transition={{ duration: 0.2 }}
              className="overflow-hidden mt-3"
            >
              <CodeBlock
                code={exercise.solution}
                language={exercise.solutionLanguage ?? 'bash'}
              />
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
}

// ─── Checklist block ──────────────────────────────────────────────────────────
function ChecklistBlock({ items, content }: { items: ChecklistItem[]; content: string }) {
  const [checked, setChecked] = useState<Set<number>>(new Set());
  const toggle = (i: number) => setChecked(prev => {
    const next = new Set(prev);
    if (next.has(i)) { next.delete(i); } else { next.add(i); }
    return next;
  });
  const allDone = checked.size === items.length;

  return (
    <div className="rounded-lg border border-border overflow-hidden">
      <div className="flex items-center justify-between px-4 py-3 bg-muted/40 border-b border-border">
        <span className="text-sm font-semibold">{content}</span>
        <span className="text-xs text-muted-foreground">
          {checked.size}/{items.length} {allDone && '✓ All done!'}
        </span>
      </div>
      <ul className="divide-y divide-border">
        {items.map((item, i) => (
          <li key={i}>
            <button
              onClick={() => toggle(i)}
              className="w-full flex items-start gap-3 px-4 py-3 text-left hover:bg-muted/20 transition-colors group"
            >
              <div className={cn(
                'flex-shrink-0 w-5 h-5 rounded border-2 flex items-center justify-center mt-0.5 transition-colors',
                checked.has(i)
                  ? 'bg-green-500 border-green-500'
                  : 'border-muted-foreground group-hover:border-primary'
              )}>
                {checked.has(i) && <CheckCircle className="h-3.5 w-3.5 text-white" />}
              </div>
              <div>
                <p className={cn(
                  'text-sm font-medium transition-colors',
                  checked.has(i) ? 'line-through text-muted-foreground' : 'text-foreground'
                )}>
                  <InlineText text={item.text} />
                </p>
                {item.description && (
                  <p className="text-xs text-muted-foreground mt-0.5 leading-5">
                    <InlineText text={item.description} />
                  </p>
                )}
              </div>
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
}

// ─── Comparison block (Do vs Don't) ──────────────────────────────────────────
function ComparisonBlock({ doSide, dontSide }: {
  doSide: NonNullable<ContentBlock['do']>;
  dontSide: NonNullable<ContentBlock['dont']>;
}) {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
      <div className="rounded-lg border-2 border-green-500/30 overflow-hidden">
        <div className="flex items-center gap-2 px-4 py-2 bg-green-500/10 border-b border-green-500/20">
          <CheckCircle className="h-4 w-4 text-green-500" />
          <span className="text-xs font-semibold text-green-600 dark:text-green-400">{doSide.label}</span>
        </div>
        <CodeBlock code={doSide.code} language={doSide.language ?? 'bash'} className="rounded-none border-0" />
      </div>
      <div className="rounded-lg border-2 border-red-500/30 overflow-hidden">
        <div className="flex items-center gap-2 px-4 py-2 bg-red-500/10 border-b border-red-500/20">
          <XCircle className="h-4 w-4 text-red-500" />
          <span className="text-xs font-semibold text-red-600 dark:text-red-400">{dontSide.label}</span>
        </div>
        <CodeBlock code={dontSide.code} language={dontSide.language ?? 'bash'} className="rounded-none border-0" />
      </div>
    </div>
  );
}

// ─── Table block ──────────────────────────────────────────────────────────────
function TableBlock({ headers, rows }: { headers?: string[]; rows?: string[][] }) {
  return (
    <div className="overflow-x-auto rounded-lg border border-border">
      <table className="w-full text-sm">
        {headers && (
          <thead className="bg-muted/50">
            <tr>
              {headers.map((h, j) => (
                <th key={j} className="px-4 py-2.5 text-left font-semibold text-xs uppercase tracking-wider text-muted-foreground">
                  {h}
                </th>
              ))}
            </tr>
          </thead>
        )}
        <tbody className="divide-y divide-border">
          {(rows ?? []).map((row, j) => (
            <tr key={j} className="hover:bg-muted/20 transition-colors">
              {row.map((cell, k) => (
                <td key={k} className="px-4 py-3 text-xs">
                  <InlineText text={cell} />
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

// ─── Section tabs block (full content tabs) ───────────────────────────────────
function SectionTabsBlock({ sectionTabs }: { sectionTabs: NonNullable<import('@/types/module').ContentBlock['sectionTabs']> }) {
  const [active, setActive] = useState(0);
  return (
    <div className="rounded-xl border border-border overflow-hidden">
      {/* Tab bar */}
      <div className="flex overflow-x-auto bg-muted/40 border-b border-border">
        {sectionTabs.map((tab, i) => (
          <button
            key={i}
            onClick={() => setActive(i)}
            className={cn(
              'px-5 py-3 text-sm font-medium whitespace-nowrap transition-colors',
              active === i
                ? 'bg-card border-b-2 border-primary text-primary'
                : 'text-muted-foreground hover:text-foreground hover:bg-muted/60'
            )}
          >
            {tab.label}
          </button>
        ))}
      </div>
      {/* Tab content */}
      <AnimatePresence mode="wait">
        <motion.div
          key={active}
          initial={{ opacity: 0, y: 4 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.15 }}
          className="p-5 space-y-6"
        >
          <LessonContent blocks={sectionTabs[active].blocks} />
        </motion.div>
      </AnimatePresence>
    </div>
  );
}

// ─── Collapsible block (expand/collapse nested content) ──────────────────────
function CollapsibleBlock({ label, blocks, defaultOpen = false }: {
  label: string;
  blocks: ContentBlock[];
  defaultOpen?: boolean;
}) {
  const [open, setOpen] = useState(defaultOpen);
  return (
    <div className="rounded-lg border border-border overflow-hidden">
      <button
        onClick={() => setOpen(o => !o)}
        className="w-full flex items-center gap-2 px-4 py-3 text-sm font-medium text-foreground hover:bg-muted/40 transition-colors"
      >
        <motion.div
          animate={{ rotate: open ? 90 : 0 }}
          transition={{ duration: 0.15 }}
        >
          <ChevronRight className="h-4 w-4 text-muted-foreground" />
        </motion.div>
        {label}
      </button>
      <AnimatePresence initial={false}>
        {open && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.2 }}
            className="overflow-hidden"
          >
            <div className="px-4 pb-4 pt-1 space-y-6 border-t border-border">
              <LessonContent blocks={blocks} />
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

// ─── Main renderer ────────────────────────────────────────────────────────────
interface LessonContentProps {
  blocks: ContentBlock[];
}

export function LessonContent({ blocks }: LessonContentProps) {
  return (
    <div className="space-y-6">
      {blocks.map((block, i) => {
        switch (block.type) {
          case 'text':
            return <TextBlock key={i} content={block.content ?? ''} />;

          case 'heading':
            return <HeadingBlock key={i} content={block.content ?? ''} level={block.level} />;

          case 'code':
            return (
              <CodeBlock key={i} code={block.content ?? ''} language={block.language ?? 'bash'} />
            );

          case 'callout':
          case 'tip':
          case 'warning': {
            const variant: CalloutVariant =
              block.type === 'tip' ? 'tip' :
              block.type === 'warning' ? 'warning' :
              (block.calloutVariant ?? 'info');
            return <CalloutBlock key={i} content={block.content ?? ''} variant={variant} />;
          }

          case 'steps':
            return <StepsBlock key={i} steps={block.steps ?? []} />;

          case 'table':
            return <TableBlock key={i} headers={block.headers} rows={block.rows} />;

          case 'tabs':
            return block.tabs ? <TabsBlock key={i} tabs={block.tabs} /> : null;

          case 'exercise':
            return block.exercise ? (
              <ExerciseBlock key={i} exercise={block.exercise} content={block.content ?? ''} />
            ) : null;

          case 'checklist':
            return block.items ? (
              <ChecklistBlock key={i} items={block.items} content={block.content ?? ''} />
            ) : null;

          case 'comparison':
            return block.do && block.dont ? (
              <ComparisonBlock key={i} doSide={block.do} dontSide={block.dont} />
            ) : null;

          case 'section-tabs':
            return block.sectionTabs ? (
              <SectionTabsBlock key={i} sectionTabs={block.sectionTabs} />
            ) : null;

          case 'collapsible':
            return block.collapsibleBlocks ? (
              <CollapsibleBlock
                key={i}
                label={block.collapsibleLabel ?? 'Show more'}
                blocks={block.collapsibleBlocks}
                defaultOpen={block.collapsibleDefaultOpen}
              />
            ) : null;

          case 'visual':
            if (block.visualId === 'context-vs-skills') {
              return <ContextVsSkillsVisual key={i} />;
            }
            if (block.visualId === 'stock-bot-workflow') {
              return <StockBotWorkflow key={i} />;
            }
            if (block.visualId === 'n8n-intro') {
              return <N8nIntro key={i} />;
            }
            return null;

          default:
            return null;
        }
      })}
    </div>
  );
}

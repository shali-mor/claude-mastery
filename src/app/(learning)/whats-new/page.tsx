'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';
import { Sparkles, BookOpen, ExternalLink } from 'lucide-react';
import Link from 'next/link';
import {
  whatsNew,
  CATEGORY_LABELS,
  CATEGORY_COLORS,
  type UpdateCategory,
} from '@/data/whats-new';
import { EXERCISE_PATHS } from '@/data/exercisePaths';
import { modules } from '@/data/modules';
import { cn } from '@/lib/utils';

const ALL = 'all' as const;
type Filter = UpdateCategory | typeof ALL;

const FILTERS: { value: Filter; label: string }[] = [
  { value: ALL, label: 'All' },
  { value: 'command', label: 'Commands' },
  { value: 'skill', label: 'Skills' },
  { value: 'plugin', label: 'Plugins' },
  { value: 'hook', label: 'Hooks' },
  { value: 'behavior', label: 'Behavior' },
  { value: 'api', label: 'API' },
];

function getLessonTitle(lessonRef: string) {
  for (const mod of modules) {
    const lesson = mod.lessons.find(l => l.id === lessonRef);
    if (lesson) return { moduleTitle: mod.title, lessonTitle: lesson.title };
  }
  return null;
}

function getLessonUrl(lessonRef: string) {
  for (const mod of modules) {
    const lesson = mod.lessons.find(l => l.id === lessonRef);
    if (lesson) return `/modules/${mod.id}/${lesson.id}`;
  }
  return null;
}

// Group entries by year-month
function groupByDate(entries: typeof whatsNew) {
  const groups: Record<string, typeof whatsNew> = {};
  for (const entry of entries) {
    const key = entry.date.slice(0, 7); // 'YYYY-MM'
    if (!groups[key]) groups[key] = [];
    groups[key].push(entry);
  }
  return Object.entries(groups).sort(([a], [b]) => b.localeCompare(a));
}

function formatDate(dateStr: string) {
  const [year, month] = dateStr.split('-');
  const months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun',
                  'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
  return `${months[parseInt(month) - 1]} ${year}`;
}

export default function WhatsNewPage() {
  const [filter, setFilter] = useState<Filter>(ALL);
  const [showUncovered, setShowUncovered] = useState(false);

  const filtered = whatsNew.filter(e => {
    if (filter !== ALL && e.category !== filter) return false;
    if (showUncovered && e.tutorialCovered) return false;
    return true;
  });

  const grouped = groupByDate(filtered);
  const uncoveredCount = whatsNew.filter(e => !e.tutorialCovered).length;

  return (
    <div className="min-h-screen pb-20">
      {/* Hero */}
      <motion.div
        initial={{ opacity: 0, y: -8 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4 }}
        className="border-b bg-card px-6 py-8"
      >
        <div className="max-w-3xl mx-auto">
          <div className="flex items-center gap-3 mb-3">
            <div className="p-2 rounded-lg bg-primary/10">
              <Sparkles className="h-6 w-6 text-primary" />
            </div>
            <div>
              <h1 className="text-2xl font-bold tracking-tight">
                What&apos;s New in Claude Code
              </h1>
              <p className="text-xs text-muted-foreground mt-0.5">
                Latest commands, skills, plugins, and behaviors — updated weekly
              </p>
            </div>
          </div>

          {uncoveredCount > 0 && (
            <div className="mt-4 flex items-center gap-2 text-xs bg-primary/5 border border-primary/20 rounded-lg px-3 py-2">
              <span className="w-2 h-2 rounded-full bg-primary animate-pulse" />
              <span className="text-primary font-medium">{uncoveredCount} new feature{uncoveredCount > 1 ? 's' : ''} not yet covered in lessons</span>
              <button
                onClick={() => setShowUncovered(v => !v)}
                className="ml-auto underline text-primary/70 hover:text-primary"
              >
                {showUncovered ? 'Show all' : 'Filter to these'}
              </button>
            </div>
          )}
        </div>
      </motion.div>

      <div className="max-w-3xl mx-auto px-4 py-6">
        {/* Filters */}
        <div className="flex flex-wrap gap-2 mb-6">
          {FILTERS.map(({ value, label }) => (
            <button
              key={value}
              onClick={() => setFilter(value)}
              className={cn(
                'px-3 py-1 rounded-full text-xs font-medium border transition-colors',
                filter === value
                  ? 'bg-primary text-primary-foreground border-primary'
                  : 'border-border text-muted-foreground hover:text-foreground hover:border-foreground/30'
              )}
            >
              {label}
            </button>
          ))}
        </div>

        {/* Timeline */}
        {grouped.length === 0 && (
          <p className="text-sm text-muted-foreground text-center py-12">No entries match the current filter.</p>
        )}

        <div className="space-y-8">
          {grouped.map(([dateKey, entries], groupIdx) => (
            <motion.div
              key={dateKey}
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: groupIdx * 0.05 }}
            >
              {/* Month label */}
              <div className="flex items-center gap-3 mb-3">
                <span className="text-sm font-semibold text-foreground">
                  {formatDate(dateKey)}
                </span>
                <div className="flex-1 h-px bg-border" />
              </div>

              {/* Entries */}
              <div className="space-y-3">
                {entries.map(entry => {
                  const lessonInfo = entry.lessonRef ? getLessonTitle(entry.lessonRef) : null;
                  const lessonUrl = entry.lessonRef ? getLessonUrl(entry.lessonRef) : null;

                  return (
                    <div
                      key={entry.id}
                      className={cn(
                        'rounded-xl border p-4 bg-card transition-colors',
                        !entry.tutorialCovered && 'border-primary/30'
                      )}
                    >
                      <div className="flex items-start gap-3">
                        {/* Dot */}
                        <div className={cn(
                          'mt-1 w-2 h-2 rounded-full shrink-0',
                          entry.tutorialCovered ? 'bg-muted-foreground/40' : 'bg-primary'
                        )} />

                        <div className="flex-1 min-w-0">
                          {/* Header row */}
                          <div className="flex flex-wrap items-center gap-2 mb-1">
                            <span className={cn(
                              'inline-block px-1.5 py-0.5 rounded text-[10px] font-medium',
                              CATEGORY_COLORS[entry.category]
                            )}>
                              {CATEGORY_LABELS[entry.category]}
                            </span>
                            {entry.isBreaking && (
                              <span className="inline-block px-1.5 py-0.5 rounded text-[10px] font-medium bg-red-500/15 text-red-600 dark:text-red-400">
                                Breaking
                              </span>
                            )}
                            <h3 className="text-sm font-semibold">{entry.title}</h3>
                          </div>

                          {/* Summary */}
                          <p className="text-xs text-muted-foreground leading-relaxed">{entry.summary}</p>

                          {/* Detail */}
                          {entry.detail && (
                            <p className="text-xs text-muted-foreground/70 mt-1 leading-relaxed">{entry.detail}</p>
                          )}

                          {/* Footer */}
                          <div className="flex items-center gap-3 mt-2">
                            {entry.tutorialCovered && lessonUrl ? (
                              <Link
                                href={lessonUrl}
                                className="flex items-center gap-1 text-[10px] text-primary hover:underline"
                              >
                                <BookOpen className="h-3 w-3" />
                                {lessonInfo?.lessonTitle ?? entry.lessonRef}
                              </Link>
                            ) : (
                              <span className="flex items-center gap-1 text-[10px] text-primary font-medium">
                                <span className="w-1.5 h-1.5 rounded-full bg-primary" />
                                Not yet in tutorial
                              </span>
                            )}
                            {entry.version && (
                              <span className="text-[10px] text-muted-foreground/50">v{entry.version}</span>
                            )}
                          </div>
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>
            </motion.div>
          ))}
        </div>

        {/* Footer */}
        <div className="mt-10 pt-6 border-t text-center space-y-2">
          <p className="text-xs text-muted-foreground">
            Updated weekly via GitHub Actions · Run <code className="bg-muted px-1 rounded font-mono">/check-updates</code> in Claude Code to sync manually
          </p>
          <a
            href="https://code.claude.com/docs/en/changelog"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-1 text-xs text-primary hover:underline"
          >
            Official Claude Code changelog <ExternalLink className="h-3 w-3" />
          </a>
        </div>
      </div>
    </div>
  );
}

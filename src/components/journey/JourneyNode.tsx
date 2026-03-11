'use client';

import Link from 'next/link';
import {
  Terminal, Zap, DollarSign, Code2, GitBranch, ClipboardList,
  Plug, Layers, Workflow, GraduationCap, TrendingUp, BookOpen,
  Brain, Globe, CheckCircle2,
} from 'lucide-react';
import { cn } from '@/lib/utils';
import { moduleColorToTokens, type ModuleStatus } from './journeyUtils';

const ICON_MAP: Record<string, React.ComponentType<{ className?: string }>> = {
  Terminal, Zap, DollarSign, Code2, GitBranch, ClipboardList,
  Plug, Layers, Workflow, GraduationCap, TrendingUp, BookOpen,
  Brain, Globe,
};

interface JourneyNodeProps {
  moduleId: string;
  firstLessonId: string;
  title: string;
  icon: string;
  color: string;
  status: ModuleStatus;
  progressPct: number;
  hasQuizBadge: boolean;
  index: number;
}

const CIRCUMFERENCE = 2 * Math.PI * 34;

export function JourneyNode({
  moduleId,
  firstLessonId,
  title,
  icon,
  color,
  status,
  progressPct,
  hasQuizBadge,
  index,
}: JourneyNodeProps) {
  const tokens = moduleColorToTokens(color);
  const Icon = ICON_MAP[icon] ?? Terminal;

  const dash = (progressPct / 100) * CIRCUMFERENCE;
  const gap = CIRCUMFERENCE - dash;

  const ringHex = status === 'complete'
    ? '#22c55e'
    : status === 'current' || status === 'in-progress'
      ? '#f97316'
      : '#94a3b8'; // slate-400 — visible on both light and dark backgrounds

  const effectiveDash = status === 'complete' ? CIRCUMFERENCE : dash;
  const effectiveGap = status === 'complete' ? 0 : gap;

  const isComplete = status === 'complete';
  const isCurrent = status === 'current';
  const isStarted = status === 'in-progress' || isCurrent || isComplete;

  return (
    <Link
      href={`/modules/${moduleId}/${firstLessonId}`}
      className="group flex flex-col items-center gap-2 focus:outline-none"
      aria-label={`Module ${index + 1}: ${title}`}
    >
      {/* Circle + ring */}
      <div className="relative flex items-center justify-center w-[76px] h-[76px]">
        {/* Pulse ring for current */}
        {isCurrent && (
          <span className="absolute inset-0 rounded-full ring-2 ring-orange-400/50 animate-pulse" />
        )}

        {/* SVG progress ring */}
        <svg viewBox="0 0 76 76" className="absolute inset-0 w-full h-full -rotate-90" aria-hidden="true">
          {/* Track */}
          <circle cx="38" cy="38" r="34" fill="none" stroke={ringHex} strokeOpacity="0.18" strokeWidth="3" />
          {/* Arc */}
          {(isStarted) && (
            <circle
              cx="38" cy="38" r="34"
              fill="none"
              stroke={ringHex}
              strokeWidth="3"
              strokeLinecap="round"
              strokeDasharray={`${effectiveDash} ${effectiveGap}`}
            />
          )}
        </svg>

        {/* Inner circle */}
        <div className={cn(
          'relative z-10 flex items-center justify-center w-14 h-14 rounded-full transition-all duration-200 group-hover:scale-110 group-hover:shadow-lg',
          isComplete
            ? 'bg-green-500/20 shadow-green-500/10'
            : isStarted
              ? tokens.bg
              : 'bg-slate-200 dark:bg-white/5',
        )}>
          {isComplete ? (
            <CheckCircle2 className="h-6 w-6 text-green-400" />
          ) : (
            <div style={isStarted ? { color: tokens.hex } : undefined}>
              <Icon className={cn('h-5 w-5 transition-colors', isStarted ? '' : 'text-slate-400 dark:text-white/25')} />
            </div>
          )}
        </div>

        {/* Step badge */}
        <span className={cn(
          'absolute -bottom-1 -right-0 z-20 flex items-center justify-center w-5 h-5 rounded-full text-[9px] font-bold shadow border border-black/5 dark:border-white/10',
          isComplete ? 'bg-green-500 text-white' :
          isCurrent  ? 'bg-orange-500 text-white' :
          isStarted  ? 'bg-slate-300 text-slate-700 dark:bg-white/15 dark:text-white/80' :
                       'bg-slate-200 text-slate-500 dark:bg-white/8 dark:text-white/30',
        )}>
          {index + 1}
        </span>

        {/* Quiz badge */}
        {hasQuizBadge && (
          <span className="absolute -top-1 -right-1 z-20 flex items-center justify-center w-5 h-5 rounded-full bg-yellow-400 text-yellow-900 text-[9px] font-bold shadow">
            ★
          </span>
        )}
      </div>

      {/* Title label */}
      <span className={cn(
        'text-center text-[11px] font-medium leading-tight max-w-[110px] transition-colors',
        isComplete ? 'text-green-600 dark:text-green-400' :
        isCurrent  ? 'text-orange-500 dark:text-orange-400' :
        isStarted  ? 'text-slate-700 dark:text-white/80' :
                     'text-slate-400 dark:text-white/35',
        'group-hover:text-slate-900 dark:group-hover:text-white/90',
      )}>
        {title}
      </span>
    </Link>
  );
}

'use client';

import Link from 'next/link';
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from '@/components/ui/tooltip';
import { Badge } from '@/components/ui/badge';
import { JourneyNode } from './JourneyNode';
import { type ModuleStatus } from './journeyUtils';

interface JourneyNodeTooltipProps {
  moduleId: string;
  firstLessonId: string;
  title: string;
  description: string;
  icon: string;
  color: string;
  status: ModuleStatus;
  progressPct: number;
  completedCount: number;
  totalLessons: number;
  hasQuizBadge: boolean;
  index: number;
}

const STATUS_LABEL: Record<ModuleStatus, string> = {
  'not-started': 'Not started',
  'in-progress': 'In progress',
  'complete': 'Complete',
  'current': 'In progress',
};

const STATUS_VARIANT: Record<ModuleStatus, 'default' | 'secondary' | 'outline'> = {
  'not-started': 'outline',
  'in-progress': 'default',
  'complete': 'default',
  'current': 'default',
};

export function JourneyNodeTooltip({
  moduleId,
  firstLessonId,
  title,
  description,
  icon,
  color,
  status,
  progressPct,
  completedCount,
  totalLessons,
  hasQuizBadge,
  index,
}: JourneyNodeTooltipProps) {
  return (
    <TooltipProvider delayDuration={300}>
      <Tooltip>
        <TooltipTrigger asChild>
          <div>
            <JourneyNode
              moduleId={moduleId}
              firstLessonId={firstLessonId}
              title={title}
              icon={icon}
              color={color}
              status={status}
              progressPct={progressPct}
              hasQuizBadge={hasQuizBadge}
              index={index}
            />
          </div>
        </TooltipTrigger>
        <TooltipContent
          side="right"
          sideOffset={12}
          className="max-w-xs w-64 p-0 overflow-hidden"
        >
          <div className="p-3 space-y-2">
            <div className="flex items-start justify-between gap-2">
              <p className="text-sm font-semibold leading-tight">{title}</p>
              <Badge
                variant={STATUS_VARIANT[status]}
                className={
                  status === 'complete'
                    ? 'bg-green-500/20 text-green-700 dark:text-green-400 border-0 shrink-0'
                    : status === 'in-progress' || status === 'current'
                      ? 'bg-orange-500/20 text-orange-700 dark:text-orange-400 border-0 shrink-0'
                      : 'shrink-0'
                }
              >
                {STATUS_LABEL[status]}
              </Badge>
            </div>
            <p className="text-xs text-muted-foreground line-clamp-2">{description}</p>
            <p className="text-xs text-muted-foreground">
              {completedCount} / {totalLessons} lessons
            </p>
            <Link
              href={`/modules/${moduleId}/${firstLessonId}`}
              className="block w-full text-center text-xs font-medium px-3 py-1.5 rounded-md bg-primary text-primary-foreground hover:bg-primary/90 transition-colors"
            >
              {status === 'not-started' ? 'Start module' : status === 'complete' ? 'Review' : 'Continue'}
            </Link>
          </div>
        </TooltipContent>
      </Tooltip>
    </TooltipProvider>
  );
}

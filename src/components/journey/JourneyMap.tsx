'use client';

import { useMemo } from 'react';
import { Map } from 'lucide-react';
import { Progress } from '@/components/ui/progress';
import { useProgress } from '@/store';
import { modules } from '@/data/modules';
import { getModuleStatus, type ModuleStatus } from './journeyUtils';
import { JourneyCanvas } from './JourneyCanvas';
import { getBasicProgress, getAdvancedProgress } from '@/utils/tierHelpers';

export interface ModuleNode {
  moduleId: string;
  firstLessonId: string;
  title: string;
  description: string;
  icon: string;
  color: string;
  status: ModuleStatus;
  progressPct: number;
  basicProgressPct: number;
  advancedProgressPct: number;
  completedCount: number;
  totalLessons: number;
  hasQuizBadge: boolean;
  hasAdvancedQuizBadge: boolean;
  lessons: { id: string; title: string; completed: boolean; tier: 'basic' | 'advanced' }[];
}

export function JourneyMap() {
  const { completedLessons, quizResults, lastVisitedLessonId } = useProgress();

  const { moduleNodes, totalLessons, totalCompleted, totalQuizzesPassed, overallPct } =
    useMemo(() => {
      let totalLessons = 0;
      let totalCompleted = 0;
      let totalQuizzesPassed = 0;

      const moduleNodes: ModuleNode[] = modules.map((mod) => {
        const lessonIds = mod.lessons.map((l) => l.id);
        const completedCount = lessonIds.filter((id) => completedLessons.includes(id)).length;
        const progressPct =
          lessonIds.length > 0 ? Math.round((completedCount / lessonIds.length) * 100) : 0;
        const qr = quizResults[mod.quizId];
        const quizPassed = qr !== undefined && qr.total > 0 && qr.score / qr.total >= 0.7;
        const advQr = mod.advancedQuizId ? quizResults[mod.advancedQuizId] : undefined;
        const advQuizPassed = advQr !== undefined && advQr.total > 0 && advQr.score / advQr.total >= 0.7;
        const status = getModuleStatus(
          lessonIds,
          completedLessons,
          mod.quizId,
          quizResults,
          lastVisitedLessonId,
          mod,
        );

        totalLessons += lessonIds.length;
        totalCompleted += completedCount;
        if (quizPassed) totalQuizzesPassed++;
        if (advQuizPassed) totalQuizzesPassed++;

        return {
          moduleId: mod.id,
          firstLessonId: mod.lessons[0]?.id ?? '',
          title: mod.title,
          description: mod.description,
          icon: mod.icon,
          color: mod.color,
          status,
          progressPct,
          basicProgressPct: getBasicProgress(mod, completedLessons),
          advancedProgressPct: getAdvancedProgress(mod, completedLessons),
          completedCount,
          totalLessons: lessonIds.length,
          hasQuizBadge: quizPassed,
          hasAdvancedQuizBadge: advQuizPassed,
          lessons: mod.lessons.map((l) => ({
            id: l.id,
            title: l.title,
            completed: completedLessons.includes(l.id),
            tier: l.tier,
          })),
        };
      });

      const overallPct =
        totalLessons > 0 ? Math.round((totalCompleted / totalLessons) * 100) : 0;

      return { moduleNodes, totalLessons, totalCompleted, totalQuizzesPassed, overallPct };
    }, [completedLessons, quizResults, lastVisitedLessonId]);

  return (
    <div className="min-h-screen pb-20">
      {/* Header */}
      <div className="border-b bg-card px-6 py-8">
        <div className="max-w-4xl mx-auto">
          <div className="flex items-center gap-3 mb-4">
            <div className="p-2 rounded-lg bg-primary/10">
              <Map className="h-6 w-6 text-primary" />
            </div>
            <div>
              <h1 className="text-2xl font-bold tracking-tight">Your Learning Journey</h1>
              <p className="text-sm text-muted-foreground mt-0.5">
                Track your progress through all Claude Mastery modules
              </p>
            </div>
          </div>

          {/* Progress bar */}
          <div className="space-y-1.5 mb-4">
            <div className="flex items-center justify-between text-sm">
              <span className="text-muted-foreground">Overall progress</span>
              <span className="font-semibold">{overallPct}%</span>
            </div>
            <Progress value={overallPct} className="h-2.5" />
          </div>

          {/* Stats row */}
          <div className="flex items-center gap-6 text-sm text-muted-foreground">
            <span>
              <strong className="text-foreground">{totalCompleted}</strong> / {totalLessons} lessons
            </span>
            <span>
              <strong className="text-foreground">{totalQuizzesPassed}</strong> / {modules.length * 2} quizzes passed
            </span>
          </div>
        </div>
      </div>

      {/* Canvas */}
      <div className="max-w-4xl mx-auto px-4 py-10">
        <JourneyCanvas moduleNodes={moduleNodes} />
      </div>
    </div>
  );
}

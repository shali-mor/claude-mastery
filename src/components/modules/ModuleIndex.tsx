'use client';

import { useState, useMemo } from 'react';
import Link from 'next/link';
import { motion } from 'framer-motion';
import { BookOpen, Award, ChevronRight, Clock, List, Map as MapIcon } from 'lucide-react';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';
import { useProgress } from '@/store';
import { modules } from '@/data/modules';
import { JourneyCanvas } from '@/components/journey/JourneyCanvas';
import { getModuleStatus } from '@/components/journey/journeyUtils';
import type { ModuleNode } from '@/components/journey/JourneyMap';
import { getBasicLessons, getAdvancedLessons, getBasicProgress, getAdvancedProgress, allBasicComplete } from '@/utils/tierHelpers';

type View = 'list' | 'map';

export function ModuleIndex() {
  const [view, setView] = useState<View>('list');
  const { completedLessons, quizResults, lastVisitedLessonId } = useProgress();

  const { moduleNodes, totalLessons, totalCompleted, overallPct } = useMemo(() => {
    const moduleNodes: ModuleNode[] = modules.map((mod) => {
      const lessonIds = mod.lessons.map((l) => l.id);
      const completedCount = lessonIds.filter((id) => completedLessons.includes(id)).length;
      const progressPct = lessonIds.length > 0 ? Math.round((completedCount / lessonIds.length) * 100) : 0;
      const qr = quizResults[mod.quizId];
      const quizPassed = qr !== undefined && qr.total > 0 && qr.score / qr.total >= 0.7;
      const advQr = mod.advancedQuizId ? quizResults[mod.advancedQuizId] : undefined;
      const advQuizPassed = advQr !== undefined && advQr.total > 0 && advQr.score / advQr.total >= 0.7;
      const status = getModuleStatus(lessonIds, completedLessons, mod.quizId, quizResults, lastVisitedLessonId, mod);

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

    const totalLessons = moduleNodes.reduce((sum, n) => sum + n.totalLessons, 0);
    const totalCompleted = moduleNodes.reduce((sum, n) => sum + n.completedCount, 0);
    const overallPct = totalLessons > 0 ? Math.round((totalCompleted / totalLessons) * 100) : 0;
    return { moduleNodes, totalLessons, totalCompleted, overallPct };
  }, [completedLessons, quizResults, lastVisitedLessonId]);

  return (
    <div className="max-w-4xl mx-auto px-6 py-8">
      {/* Header */}
      <div className="flex items-start justify-between gap-4 mb-4">
        <div>
          <h1 className="text-2xl font-bold mb-1">Learning Modules</h1>
          <p className="text-sm text-muted-foreground">
            {totalCompleted}/{totalLessons} lessons &middot; {overallPct}% complete
          </p>
        </div>

        {/* View toggle */}
        <div className="flex items-center gap-1 bg-muted rounded-lg p-1 shrink-0">
          <button
            onClick={() => setView('list')}
            className={cn(
              'flex items-center gap-1.5 px-3 py-1.5 rounded-md text-sm font-medium transition-colors',
              view === 'list'
                ? 'bg-background shadow-sm text-foreground'
                : 'text-muted-foreground hover:text-foreground'
            )}
          >
            <List className="h-3.5 w-3.5" />
            List
          </button>
          <button
            onClick={() => setView('map')}
            className={cn(
              'flex items-center gap-1.5 px-3 py-1.5 rounded-md text-sm font-medium transition-colors',
              view === 'map'
                ? 'bg-background shadow-sm text-foreground'
                : 'text-muted-foreground hover:text-foreground'
            )}
          >
            <MapIcon className="h-3.5 w-3.5" />
            Map
          </button>
        </div>
      </div>

      <Progress value={overallPct} className="h-2 mb-8" />

      {/* List view */}
      {view === 'list' && (
        <div className="space-y-4">
          {modules.map((module, i) => {
            const node = moduleNodes[i];
            const firstLesson = module.lessons[0];
            const totalMinutes = module.lessons.reduce((acc, l) => acc + l.estimatedMinutes, 0);
            const hasBasicQuizResult = !!quizResults[module.quizId];
            const hasAdvancedQuizResult = module.advancedQuizId ? !!quizResults[module.advancedQuizId] : false;
            const basicCount = getBasicLessons(module).length;
            const advancedCount = getAdvancedLessons(module).length;
            const isBasicDone = allBasicComplete(module, completedLessons);

            return (
              <motion.div
                key={module.id}
                initial={{ opacity: 0, y: 16 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: i * 0.06 }}
              >
                <Card className="group hover:border-primary/40 transition-all">
                  <CardContent className="p-6">
                    <div className="flex gap-5">
                      <div className="flex-shrink-0 w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center">
                        <span className="text-lg font-bold text-primary">{i + 1}</span>
                      </div>
                      <div className="flex-1 min-w-0">
                        <div className="flex flex-wrap items-center gap-2 mb-1">
                          <h2 className="font-semibold text-base">{module.title}</h2>
                          {node.progressPct === 100 && (
                            <Badge variant="secondary" className="text-xs text-green-600 bg-green-500/10">
                              Complete
                            </Badge>
                          )}
                          {hasBasicQuizResult && (
                            <Badge variant="secondary" className="text-xs text-yellow-600 bg-yellow-500/10">
                              <Award className="h-3 w-3 mr-1" />Basic quiz passed
                            </Badge>
                          )}
                          {hasAdvancedQuizResult && (
                            <Badge variant="secondary" className="text-xs text-violet-600 bg-violet-500/10">
                              <Award className="h-3 w-3 mr-1" />Advanced quiz passed
                            </Badge>
                          )}
                        </div>
                        <p className="text-sm text-muted-foreground mb-3 leading-relaxed">
                          {module.description}
                        </p>
                        <div className="flex items-center gap-4 mb-3 text-xs text-muted-foreground">
                          <span className="flex items-center gap-1">
                            <BookOpen className="h-3.5 w-3.5" />
                            {basicCount} basic + {advancedCount} advanced
                          </span>
                          <span className="flex items-center gap-1">
                            <Clock className="h-3.5 w-3.5" />
                            ~{totalMinutes} min
                          </span>
                          <span>{node.completedCount}/{node.totalLessons} done</span>
                        </div>

                        {/* Dual progress bars */}
                        <div className="space-y-1.5 mb-4">
                          <div className="flex items-center gap-3">
                            <span className="text-[10px] font-medium text-blue-600 w-10">Basic</span>
                            <Progress value={node.basicProgressPct} className="h-1.5 flex-1 max-w-48" />
                            <span className="text-xs font-medium w-8 text-right">{node.basicProgressPct}%</span>
                          </div>
                          <div className="flex items-center gap-3">
                            <span className="text-[10px] font-medium text-violet-600 w-10">Adv</span>
                            <Progress value={node.advancedProgressPct} className="h-1.5 flex-1 max-w-48" />
                            <span className="text-xs font-medium w-8 text-right">{node.advancedProgressPct}%</span>
                          </div>
                        </div>

                        <div className="flex flex-wrap gap-2">
                          <Button asChild size="sm">
                            <Link href={`/modules/${module.id}/${firstLesson?.id}`}>
                              {node.progressPct > 0 ? 'Continue' : 'Start Module'}
                              <ChevronRight className="ml-1 h-3.5 w-3.5" />
                            </Link>
                          </Button>
                          {/* Basic quiz button */}
                          {isBasicDone && !hasBasicQuizResult && (
                            <Button asChild size="sm" variant="outline">
                              <Link href={`/quizzes/${module.id}`}>Take Basic Quiz</Link>
                            </Button>
                          )}
                          {hasBasicQuizResult && (
                            <Button asChild size="sm" variant="outline">
                              <Link href={`/quizzes/${module.id}`}>Retake Basic Quiz</Link>
                            </Button>
                          )}
                          {/* Advanced quiz button */}
                          {node.advancedProgressPct === 100 && !hasAdvancedQuizResult && (
                            <Button asChild size="sm" variant="outline" className="border-violet-300 text-violet-600 hover:bg-violet-50">
                              <Link href={`/quizzes/${module.id}?tier=advanced`}>Take Advanced Quiz</Link>
                            </Button>
                          )}
                          {hasAdvancedQuizResult && (
                            <Button asChild size="sm" variant="outline" className="border-violet-300 text-violet-600 hover:bg-violet-50">
                              <Link href={`/quizzes/${module.id}?tier=advanced`}>Retake Advanced Quiz</Link>
                            </Button>
                          )}
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </motion.div>
            );
          })}
        </div>
      )}

      {/* Map view */}
      {view === 'map' && <JourneyCanvas moduleNodes={moduleNodes} />}
    </div>
  );
}

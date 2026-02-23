'use client';

import Link from 'next/link';
import { motion } from 'framer-motion';
import { BookOpen, Award, ChevronRight, Clock } from 'lucide-react';
import { Card, CardContent, CardHeader } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import { Button } from '@/components/ui/button';
import { useProgress } from '@/store';
import { modules } from '@/data/modules';

export function ModuleIndex() {
  const { completedLessons, quizResults } = useProgress();

  return (
    <div className="max-w-4xl mx-auto px-6 py-8">
      <div className="mb-8">
        <h1 className="text-2xl font-bold mb-2">Learning Modules</h1>
        <p className="text-muted-foreground">
          5 modules covering everything from Claude Code basics to advanced API optimization.
        </p>
      </div>

      <div className="space-y-4">
        {modules.map((module, i) => {
          const lessonIds = module.lessons.map(l => l.id);
          const completed = completedLessons.filter(id => lessonIds.includes(id)).length;
          const progress = lessonIds.length > 0 ? Math.round((completed / lessonIds.length) * 100) : 0;
          const hasQuizResult = !!quizResults[module.quizId];
          const totalMinutes = module.lessons.reduce((acc, l) => acc + l.estimatedMinutes, 0);
          const firstLesson = module.lessons[0];

          return (
            <motion.div
              key={module.id}
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.08 }}
            >
              <Card className="group hover:border-primary/40 transition-all">
                <CardContent className="p-6">
                  <div className="flex gap-5">
                    {/* Number badge */}
                    <div className="flex-shrink-0 w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center">
                      <span className="text-lg font-bold text-primary">{i + 1}</span>
                    </div>

                    <div className="flex-1 min-w-0">
                      <div className="flex flex-wrap items-center gap-2 mb-1">
                        <h2 className="font-semibold text-base">{module.title}</h2>
                        {progress === 100 && (
                          <Badge variant="secondary" className="text-xs text-green-600 bg-green-500/10">
                            Complete
                          </Badge>
                        )}
                        {hasQuizResult && (
                          <Badge variant="secondary" className="text-xs text-yellow-600 bg-yellow-500/10">
                            <Award className="h-3 w-3 mr-1" />
                            Quiz passed
                          </Badge>
                        )}
                      </div>

                      <p className="text-sm text-muted-foreground mb-3 leading-relaxed">
                        {module.description}
                      </p>

                      <div className="flex items-center gap-4 mb-3 text-xs text-muted-foreground">
                        <span className="flex items-center gap-1">
                          <BookOpen className="h-3.5 w-3.5" />
                          {module.lessons.length} lessons
                        </span>
                        <span className="flex items-center gap-1">
                          <Clock className="h-3.5 w-3.5" />
                          ~{totalMinutes} min
                        </span>
                        <span>{completed}/{lessonIds.length} done</span>
                      </div>

                      <div className="flex items-center gap-3 mb-4">
                        <Progress value={progress} className="h-1.5 flex-1 max-w-48" />
                        <span className="text-xs font-medium">{progress}%</span>
                      </div>

                      <div className="flex flex-wrap gap-2">
                        <Button asChild size="sm">
                          <Link href={`/modules/${module.id}/${firstLesson?.id}`}>
                            {progress > 0 ? 'Continue' : 'Start Module'}
                            <ChevronRight className="ml-1 h-3.5 w-3.5" />
                          </Link>
                        </Button>
                        {progress === 100 && !hasQuizResult && (
                          <Button asChild size="sm" variant="outline">
                            <Link href={`/quizzes/${module.id}`}>Take Quiz</Link>
                          </Button>
                        )}
                        {hasQuizResult && (
                          <Button asChild size="sm" variant="outline">
                            <Link href={`/quizzes/${module.id}`}>Retake Quiz</Link>
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
    </div>
  );
}

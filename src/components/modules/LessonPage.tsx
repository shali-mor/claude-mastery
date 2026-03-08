'use client';

import Link from 'next/link';
import { useEffect, useRef, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronLeft, ChevronRight, Clock, CheckCircle, Award, Sparkles } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import { LessonContent } from './LessonContent';
import { QuizRunner } from '@/components/quiz/QuizRunner';
import { GuideAvatar, type AvatarMood } from '@/components/avatar/GuideAvatar';
import { getQuizByModuleId } from '@/data/quizzes';
import { useProgress } from '@/store';
import type { Module, Lesson } from '@/types/module';

interface LessonPageProps {
  module: Module;
  lesson: Lesson;
}

export function LessonPage({ module, lesson }: LessonPageProps) {
  const { completedLessons, completeLesson, setLastVisited, quizResults } = useProgress();
  const [showCelebration, setShowCelebration] = useState(false);
  const [justCompleted, setJustCompleted] = useState(false);
  const prevCompleteRef = useRef(false);

  // Reset justCompleted when navigating to a different lesson
  useEffect(() => {
    setJustCompleted(false);
  }, [lesson.id]);

  const lessonIndex = module.lessons.findIndex(l => l.id === lesson.id);
  const prevLesson = lessonIndex > 0 ? module.lessons[lessonIndex - 1] : null;
  const nextLesson = lessonIndex < module.lessons.length - 1 ? module.lessons[lessonIndex + 1] : null;
  const isLastLesson = !nextLesson;
  const isCompleted = completedLessons.includes(lesson.id);
  const allLessonsComplete = module.lessons.every(l => completedLessons.includes(l.id));
  const hasQuizResult = !!quizResults[module.quizId];
  const moduleQuiz = getQuizByModuleId(module.id);

  const completedCount = module.lessons.filter(l => completedLessons.includes(l.id)).length;
  const moduleProgress = Math.round((completedCount / module.lessons.length) * 100);

  useEffect(() => {
    setLastVisited(lesson.id);
  }, [lesson.id, setLastVisited]);

  // Fire celebration when module flips to complete for the first time
  useEffect(() => {
    if (allLessonsComplete && !prevCompleteRef.current) {
      setShowCelebration(true);
      const t = setTimeout(() => setShowCelebration(false), 3500);
      return () => clearTimeout(t);
    }
    prevCompleteRef.current = allLessonsComplete;
  }, [allLessonsComplete]);

  const markComplete = () => {
    completeLesson(lesson.id);
    setJustCompleted(true);
  };

  // Avatar contextual message
  const avatarMessage = (() => {
    if (showCelebration || (justCompleted && allLessonsComplete)) {
      return `All ${module.lessons.length} lessons done! 🏆 Ready to take the quiz?`;
    }
    if (justCompleted) {
      return nextLesson
        ? `Lesson complete! 🎉 Next up: "${nextLesson.title}"`
        : `Lesson complete! 🎉 Great work!`;
    }
    if (isCompleted) {
      return `You've already completed "${lesson.title}". Review at your own pace. 📚`;
    }
    return `"${lesson.title}" — ~${lesson.estimatedMinutes} min. Let's go! 🚀`;
  })();

  const avatarMood: AvatarMood =
    showCelebration || justCompleted ? 'celebrating' : isCompleted ? 'encouraging' : 'happy';

  return (
    <div className="max-w-3xl mx-auto px-6 py-8">
      {/* Celebration overlay */}
      <AnimatePresence>
        {showCelebration && (
          <motion.div
            initial={{ opacity: 0, scale: 0.9, y: -20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: -10 }}
            transition={{ type: 'spring', stiffness: 300, damping: 25 }}
            className="fixed top-6 left-1/2 -translate-x-1/2 z-50 flex items-center gap-3 px-6 py-4 rounded-2xl bg-card border border-primary/30 shadow-lg shadow-primary/10"
          >
            <Sparkles className="h-5 w-5 text-primary" />
            <div>
              <p className="font-semibold text-sm">Module complete!</p>
              <p className="text-xs text-muted-foreground">Ready to take the quiz?</p>
            </div>
            <Button asChild size="sm" className="ml-2">
              <Link href={`/quizzes/${module.id}`}>Take Quiz</Link>
            </Button>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Breadcrumb */}
      <div className="flex items-center gap-2 text-sm text-muted-foreground mb-6">
        <Link href="/modules" className="hover:text-foreground transition-colors">
          Modules
        </Link>
        <ChevronRight className="h-3.5 w-3.5" />
        <span className="truncate">{module.title}</span>
        <ChevronRight className="h-3.5 w-3.5" />
        <span className="text-foreground truncate">{lesson.title}</span>
      </div>

      {/* Module progress */}
      <div className="mb-6 flex items-center gap-3">
        <Progress value={moduleProgress} className="h-1.5 flex-1 max-w-40" />
        <span className="text-xs text-muted-foreground whitespace-nowrap">
          {completedCount}/{module.lessons.length} lessons in module
        </span>
      </div>

      {/* Lesson header */}
      <motion.div
        key={lesson.id}
        initial={{ opacity: 0, y: 12 }}
        animate={{ opacity: 1, y: 0 }}
        className="mb-8"
      >
        <div className="flex flex-wrap items-center gap-2 mb-3">
          <Badge variant="secondary" className="text-xs">
            {module.title}
          </Badge>
          <Badge variant="secondary" className="text-xs">
            <Clock className="h-3 w-3 mr-1" />
            ~{lesson.estimatedMinutes} min
          </Badge>
          {isCompleted && (
            <Badge variant="secondary" className="text-xs text-green-600 bg-green-500/10">
              <CheckCircle className="h-3 w-3 mr-1" />
              Completed
            </Badge>
          )}
        </div>

        <h1 className="text-2xl font-bold mb-2">{lesson.title}</h1>
        <p className="text-muted-foreground">{lesson.description}</p>
      </motion.div>

      {/* Lesson TOC (side lessons) */}
      <div
        className="flex gap-1 mb-8 overflow-x-auto pb-1"
        role="navigation"
        aria-label="Lessons in this module"
      >
        {module.lessons.map((l, i) => {
          const done = completedLessons.includes(l.id);
          const isCurrent = l.id === lesson.id;
          return (
            <Link
              key={l.id}
              href={`/modules/${module.id}/${l.id}`}
              aria-current={isCurrent ? 'page' : undefined}
              className={`flex-shrink-0 flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs transition-colors ${
                isCurrent
                  ? 'bg-primary text-primary-foreground'
                  : done
                  ? 'bg-green-500/10 text-green-600 hover:bg-green-500/20'
                  : 'bg-muted text-muted-foreground hover:bg-muted/70'
              }`}
            >
              {done && !isCurrent && <CheckCircle className="h-3 w-3" />}
              <span>{i + 1}. {l.title}</span>
            </Link>
          );
        })}
      </div>

      {/* Content */}
      <motion.div
        key={lesson.id + '-content'}
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.1 }}
      >
        <LessonContent blocks={lesson.blocks} />
      </motion.div>

      {/* Footer actions */}
      <div className="mt-10 pt-6 border-t border-border">
        {/* Complete button */}
        {!isCompleted && (
          <div className="mb-6">
            <Button onClick={markComplete} className="w-full sm:w-auto" size="lg">
              <CheckCircle className="h-4 w-4 mr-2" />
              Mark as Complete
            </Button>
          </div>
        )}

        {/* Inline quiz on the last lesson */}
        {isLastLesson && moduleQuiz && (
          <motion.div
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.15 }}
          >
            <QuizRunner quiz={moduleQuiz} module={module} inline />
          </motion.div>
        )}

        {/* Prev / Next navigation */}
        <nav className="flex justify-between gap-4" aria-label="Lesson navigation">
          {prevLesson ? (
            <Button asChild variant="outline" size="sm">
              <Link href={`/modules/${module.id}/${prevLesson.id}`}>
                <ChevronLeft className="h-4 w-4 mr-1" />
                {prevLesson.title}
              </Link>
            </Button>
          ) : (
            <div />
          )}
          {nextLesson ? (
            <Button asChild size="sm">
              <Link href={`/modules/${module.id}/${nextLesson.id}`}>
                {nextLesson.title}
                <ChevronRight className="h-4 w-4 ml-1" />
              </Link>
            </Button>
          ) : (
            <div />
          )}
        </nav>
      </div>

      <GuideAvatar message={avatarMessage} mood={avatarMood} />
    </div>
  );
}

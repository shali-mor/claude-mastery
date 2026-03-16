'use client';

import Link from 'next/link';
import { useEffect, useRef, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronLeft, ChevronRight, Clock, CheckCircle, Sparkles, FolderGit2 } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import { LessonContent } from './LessonContent';
import { QuizRunner } from '@/components/quiz/QuizRunner';
import { GuideAvatar, type AvatarMood } from '@/components/avatar/GuideAvatar';
import { getQuizByModuleId } from '@/data/quizzes';
import { useProgress } from '@/store';
import type { Module, Lesson } from '@/types/module';
import { getExerciseUrl } from '@/data/exercisePaths';
import {
  isLastBasicLesson,
  isLastAdvancedLesson,
  allBasicComplete,
} from '@/utils/tierHelpers';

interface LessonPageProps {
  module: Module;
  lesson: Lesson;
}

export function LessonPage({ module, lesson }: LessonPageProps) {
  const { completedLessons, completeLesson, setLastVisited } = useProgress();
  const [showCelebration, setShowCelebration] = useState<'basic' | 'module' | null>(null);
  const [justCompleted, setJustCompleted] = useState(false);
  const prevAllCompleteRef = useRef(false);
  const prevBasicCompleteRef = useRef(false);

  // Reset justCompleted when navigating to a different lesson
  // eslint-disable-next-line react-hooks/set-state-in-effect
  useEffect(() => { setJustCompleted(false); }, [lesson.id]);

  const lessonIndex = module.lessons.findIndex(l => l.id === lesson.id);
  const prevLesson = lessonIndex > 0 ? module.lessons[lessonIndex - 1] : null;
  const nextLesson = lessonIndex < module.lessons.length - 1 ? module.lessons[lessonIndex + 1] : null;
  const isCompleted = completedLessons.includes(lesson.id);
  const allLessonsComplete = module.lessons.every(l => completedLessons.includes(l.id));
  const basicComplete = allBasicComplete(module, completedLessons);

  // Tier-aware quizzes
  const showBasicQuiz = isLastBasicLesson(module, lesson.id);
  const showAdvancedQuiz = isLastAdvancedLesson(module, lesson.id);
  const basicQuiz = getQuizByModuleId(module.id, 'basic');
  const advancedQuiz = getQuizByModuleId(module.id, 'advanced');

  const completedCount = module.lessons.filter(l => completedLessons.includes(l.id)).length;
  const moduleProgress = Math.round((completedCount / module.lessons.length) * 100);

  useEffect(() => {
    setLastVisited(lesson.id);
  }, [lesson.id, setLastVisited]);

  // Fire celebration when basic tier or full module flips to complete
  /* eslint-disable react-hooks/set-state-in-effect */
  useEffect(() => {
    if (allLessonsComplete && !prevAllCompleteRef.current) {
      setShowCelebration('module');
      const t = setTimeout(() => setShowCelebration(null), 3500);
      prevAllCompleteRef.current = allLessonsComplete;
      return () => clearTimeout(t);
    }
    if (basicComplete && !prevBasicCompleteRef.current && !allLessonsComplete) {
      setShowCelebration('basic');
      const t = setTimeout(() => setShowCelebration(null), 3500);
      prevBasicCompleteRef.current = basicComplete;
      return () => clearTimeout(t);
    }
    prevAllCompleteRef.current = allLessonsComplete;
    prevBasicCompleteRef.current = basicComplete;
  }, [allLessonsComplete, basicComplete]);
  /* eslint-enable react-hooks/set-state-in-effect */

  const markComplete = () => {
    completeLesson(lesson.id);
    setJustCompleted(true);
  };

  // Avatar contextual message
  const avatarMessage = (() => {
    if (showCelebration === 'module' || (justCompleted && allLessonsComplete)) {
      return `All ${module.lessons.length} lessons done! Ready to take the advanced quiz?`;
    }
    if (showCelebration === 'basic' || (justCompleted && basicComplete && !allLessonsComplete)) {
      return `Basic tier complete! Take the basic quiz, then dive into advanced lessons.`;
    }
    if (justCompleted) {
      return nextLesson
        ? `Lesson complete! Next up: "${nextLesson.title}"`
        : `Lesson complete! Great work!`;
    }
    if (isCompleted) {
      return `You've already completed "${lesson.title}". Review at your own pace.`;
    }
    return `"${lesson.title}" — ~${lesson.estimatedMinutes} min. Let's go!`;
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
              <p className="font-semibold text-sm">
                {showCelebration === 'basic' ? 'Basic tier complete!' : 'Module complete!'}
              </p>
              <p className="text-xs text-muted-foreground">
                {showCelebration === 'basic' ? 'Ready for the basic quiz?' : 'Ready for the advanced quiz?'}
              </p>
            </div>
            <Button asChild size="sm" className="ml-2">
              <Link href={showCelebration === 'basic' ? `/quizzes/${module.id}` : `/quizzes/${module.id}?tier=advanced`}>
                Take Quiz
              </Link>
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
          <Badge variant="secondary" className={`text-xs ${lesson.tier === 'advanced' ? 'bg-violet-500/10 text-violet-600' : 'bg-blue-500/10 text-blue-600'}`}>
            {lesson.tier === 'advanced' ? 'Advanced' : 'Basic'}
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

      {/* Lesson TOC — two clearly separated tier sections */}
      <nav className="mb-8 space-y-3" aria-label="Lessons in this module">
        {/* Basic section */}
        <div>
          <div className="flex items-center gap-2 mb-1.5">
            <span className="text-[10px] font-bold uppercase tracking-wider text-blue-600 dark:text-blue-400">Basic</span>
            <span className="flex-1 h-px bg-blue-200 dark:bg-blue-800/50" />
          </div>
          <div className="flex gap-1 overflow-x-auto pb-1">
            {module.lessons.map((l, i) => {
              if (l.tier !== 'basic') return null;
              const done = completedLessons.includes(l.id);
              const isCurrent = l.id === lesson.id;
              return (
                <Link
                  key={l.id}
                  href={`/modules/${module.id}/${l.id}`}
                  aria-current={isCurrent ? 'page' : undefined}
                  className={`flex-shrink-0 flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs transition-colors ${
                    isCurrent
                      ? 'bg-blue-600 text-white'
                      : done
                      ? 'bg-green-500/10 text-green-600 hover:bg-green-500/20'
                      : 'bg-blue-50 dark:bg-blue-900/20 text-muted-foreground hover:bg-blue-100 dark:hover:bg-blue-900/30'
                  }`}
                >
                  {done && !isCurrent && <CheckCircle className="h-3 w-3" />}
                  <span>{i + 1}. {l.title}</span>
                </Link>
              );
            })}
          </div>
        </div>

        {/* Advanced section */}
        <div>
          <div className="flex items-center gap-2 mb-1.5">
            <span className="text-[10px] font-bold uppercase tracking-wider text-violet-600 dark:text-violet-400">Advanced</span>
            <span className="flex-1 h-px bg-violet-200 dark:bg-violet-800/50" />
          </div>
          <div className="flex gap-1 overflow-x-auto pb-1">
            {module.lessons.map((l, i) => {
              if (l.tier !== 'advanced') return null;
              const done = completedLessons.includes(l.id);
              const isCurrent = l.id === lesson.id;
              return (
                <Link
                  key={l.id}
                  href={`/modules/${module.id}/${l.id}`}
                  aria-current={isCurrent ? 'page' : undefined}
                  className={`flex-shrink-0 flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs transition-colors ${
                    isCurrent
                      ? 'bg-violet-600 text-white'
                      : done
                      ? 'bg-green-500/10 text-green-600 hover:bg-green-500/20'
                      : 'bg-violet-50 dark:bg-violet-900/20 text-muted-foreground hover:bg-violet-100 dark:hover:bg-violet-900/30'
                  }`}
                >
                  {done && !isCurrent && <CheckCircle className="h-3 w-3" />}
                  <span>{i + 1}. {l.title}</span>
                </Link>
              );
            })}
          </div>
        </div>
      </nav>

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
        {/* Inline basic quiz after last basic lesson */}
        {showBasicQuiz && basicQuiz && (
          <motion.div
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.15 }}
          >
            <QuizRunner quiz={basicQuiz} module={module} inline />
          </motion.div>
        )}

        {/* Inline advanced quiz after last advanced lesson */}
        {showAdvancedQuiz && advancedQuiz && (
          <motion.div
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.15 }}
          >
            <QuizRunner quiz={advancedQuiz} module={module} inline />
          </motion.div>
        )}

        {/* Complete button + Prev / Next navigation in one row */}
        <nav className="flex items-center justify-between gap-4 mb-6" aria-label="Lesson navigation">
          <div className="flex items-center gap-3">
            {prevLesson && (
              <Button asChild variant="outline" size="sm">
                <Link href={`/modules/${module.id}/${prevLesson.id}`}>
                  <ChevronLeft className="h-4 w-4 mr-1" />
                  {prevLesson.title}
                </Link>
              </Button>
            )}
            {!isCompleted && (
              <Button onClick={markComplete} size="lg">
                <CheckCircle className="h-4 w-4 mr-2" />
                Mark as Complete
              </Button>
            )}
          </div>
          <div>
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
          </div>
        </nav>

        {/* Exercises repo link */}
        <a
          href={getExerciseUrl(lesson.id)}
          target="_blank"
          rel="noopener noreferrer"
          className="flex items-center gap-3 w-full rounded-xl px-5 py-4 bg-primary/15 hover:bg-primary/25 border-2 border-primary/50 hover:border-primary transition-all group"
        >
          <FolderGit2 className="h-5 w-5 text-primary shrink-0" />
          <div>
            <div className="text-sm font-semibold text-primary">Practice this lesson</div>
            <div className="text-xs text-muted-foreground">Hands-on exercises repo</div>
          </div>
        </a>
      </div>

      <GuideAvatar message={avatarMessage} mood={avatarMood} />
    </div>
  );
}

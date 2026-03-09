'use client';

import { useEffect, useRef } from 'react';
import { useAuth } from '@clerk/nextjs';
import { useProgress } from '@/store';

/**
 * Syncs progress to/from Neon when a user is signed in.
 * - On mount: loads remote progress and merges with local state.
 * - On change: debounces saves to the /api/progress endpoint.
 */
export function useProgressSync() {
  const { isSignedIn, isLoaded } = useAuth();
  const { completedLessons, quizResults, lastVisitedLessonId, completeLesson, saveQuizResult, setLastVisited } =
    useProgress();
  const didLoad = useRef(false);
  const saveTimer = useRef<ReturnType<typeof setTimeout> | null>(null);

  // Load remote progress once when user signs in
  useEffect(() => {
    if (!isLoaded || !isSignedIn || didLoad.current) return;
    didLoad.current = true;

    fetch('/api/progress')
      .then(r => r.json())
      .then(data => {
        if (!data) return;
        // Merge remote lessons into local
        (data.completedLessons as string[] ?? []).forEach((id: string) => completeLesson(id));
        // Merge remote quiz results
        const remote = (data.quizResults ?? {}) as Record<string, import('@/types/quiz').QuizResult>;
        Object.values(remote).forEach(r => saveQuizResult(r));
        if (data.lastVisitedLessonId) setLastVisited(data.lastVisitedLessonId);
      })
      .catch(() => {/* silently ignore */});
  }, [isLoaded, isSignedIn, completeLesson, saveQuizResult, setLastVisited]);

  // Debounce-save whenever progress changes
  useEffect(() => {
    if (!isSignedIn) return;

    if (saveTimer.current) clearTimeout(saveTimer.current);
    saveTimer.current = setTimeout(() => {
      fetch('/api/progress', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ completedLessons, quizResults, lastVisitedLessonId }),
      }).catch(() => {/* silently ignore */});
    }, 1500);

    return () => {
      if (saveTimer.current) clearTimeout(saveTimer.current);
    };
  }, [isSignedIn, completedLessons, quizResults, lastVisitedLessonId]);
}

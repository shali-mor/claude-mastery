import type { QuizResult } from '@/types/quiz';

export interface ProgressState {
  completedLessons: string[];
  quizResults: Record<string, QuizResult>;
  lastVisitedLessonId: string | null;
}

export interface ProgressActions {
  completeLesson: (lessonId: string) => void;
  saveQuizResult: (result: QuizResult) => void;
  setLastVisited: (lessonId: string) => void;
  getModuleProgress: (moduleId: string, lessonIds: string[]) => number;
  isLessonCompleted: (lessonId: string) => boolean;
}

export const initialProgressState: ProgressState = {
  completedLessons: [],
  quizResults: {},
  lastVisitedLessonId: null,
};

export const createProgressSlice = (set: (fn: (s: ProgressState) => ProgressState) => void, get: () => ProgressState) => ({
  ...initialProgressState,

  completeLesson: (lessonId: string) =>
    set(s => ({
      ...s,
      completedLessons: s.completedLessons.includes(lessonId)
        ? s.completedLessons
        : [...s.completedLessons, lessonId],
    })),

  saveQuizResult: (result: QuizResult) =>
    set(s => ({
      ...s,
      quizResults: { ...s.quizResults, [result.quizId]: result },
    })),

  setLastVisited: (lessonId: string) =>
    set(s => ({ ...s, lastVisitedLessonId: lessonId })),

  getModuleProgress: (moduleId: string, lessonIds: string[]): number => {
    if (lessonIds.length === 0) return 0;
    const completed = get().completedLessons.filter(id => lessonIds.includes(id));
    return Math.round((completed.length / lessonIds.length) * 100);
  },

  isLessonCompleted: (lessonId: string): boolean =>
    get().completedLessons.includes(lessonId),
});

'use client';

import { create } from 'zustand';
import { persist, createJSONStorage } from 'zustand/middleware';
import { useShallow } from 'zustand/react/shallow';
import { createProgressSlice, type ProgressState, type ProgressActions } from './progressSlice';
import { createSettingsSlice, type SettingsState, type SettingsActions } from './settingsSlice';
import { createPlaygroundSlice, type PlaygroundState } from './playgroundSlice';
import { createSearchSlice, type SearchState } from './searchSlice';
import type { PlaygroundMessage, PlaygroundSession } from '@/types/playground';
import type { QuizResult } from '@/types/quiz';
import type { CommandCategory } from '@/types/command';
import type { Theme } from './settingsSlice';

type StoreState = ProgressState & ProgressActions &
  SettingsState & SettingsActions &
  PlaygroundState & {
    createSession: (model: string, systemPrompt?: string) => string;
    setActiveSession: (id: string) => void;
    addMessage: (sessionId: string, msg: PlaygroundMessage) => void;
    updateLastAssistantMessage: (sessionId: string, content: string) => void;
    setStreaming: (val: boolean) => void;
    updateSessionMeta: (sessionId: string, input: number, output: number) => void;
    clearSession: (sessionId: string) => void;
    updateSystemPrompt: (sessionId: string, prompt: string) => void;
    updateModel: (sessionId: string, model: string) => void;
  } &
  SearchState & {
    setQuery: (q: string) => void;
    toggleCategory: (c: CommandCategory) => void;
    clearFilters: () => void;
  };

export const useStore = create<StoreState>()(
  persist(
    (set, get) => ({
      // Progress slice
      ...createProgressSlice(
        (fn) => set(state => ({ ...state, ...fn(state as ProgressState) })),
        () => get() as ProgressState
      ),

      // Settings slice
      ...createSettingsSlice(
        (fn) => set(state => ({ ...state, ...fn(state as SettingsState) }))
      ),

      // Playground slice (ephemeral — not persisted via partialize below)
      ...createPlaygroundSlice(
        (fn) => set(state => ({ ...state, ...fn(state as PlaygroundState) })),
        () => get() as PlaygroundState
      ),

      // Search slice (ephemeral)
      ...createSearchSlice(
        (fn) => set(state => ({ ...state, ...fn(state as SearchState) }))
      ),
    }),
    {
      name: 'claude-mastery-store',
      storage: createJSONStorage(() => localStorage),
      // skipHydration: server renders initial state; client rehydrates in ThemeInitializer
      skipHydration: true,
      // Only persist progress + settings; playground and search are ephemeral
      partialize: (state) => ({
        completedLessons: state.completedLessons,
        quizResults: state.quizResults,
        lastVisitedLessonId: state.lastVisitedLessonId,
        theme: state.theme,
        hasApiKey: state.hasApiKey,
        preferredModel: state.preferredModel,
      }),
    }
  )
);

// Selector hooks — useShallow prevents re-renders when returned object reference changes
export const useProgress = () => useStore(useShallow(s => ({
  completedLessons: s.completedLessons,
  quizResults: s.quizResults,
  lastVisitedLessonId: s.lastVisitedLessonId,
  completeLesson: s.completeLesson,
  saveQuizResult: s.saveQuizResult,
  setLastVisited: s.setLastVisited,
  getModuleProgress: s.getModuleProgress,
  isLessonCompleted: s.isLessonCompleted,
})));

export const useSettings = () => useStore(useShallow(s => ({
  theme: s.theme,
  hasApiKey: s.hasApiKey,
  preferredModel: s.preferredModel,
  setTheme: s.setTheme,
  setHasApiKey: s.setHasApiKey,
  setPreferredModel: s.setPreferredModel,
})));

export const usePlayground = () => useStore(useShallow(s => ({
  sessions: s.sessions,
  activeSessionId: s.activeSessionId,
  isStreaming: s.isStreaming,
  createSession: s.createSession,
  setActiveSession: s.setActiveSession,
  addMessage: s.addMessage,
  updateLastAssistantMessage: s.updateLastAssistantMessage,
  setStreaming: s.setStreaming,
  updateSessionMeta: s.updateSessionMeta,
  clearSession: s.clearSession,
  updateSystemPrompt: s.updateSystemPrompt,
  updateModel: s.updateModel,
})));

export const useSearch = () => useStore(useShallow(s => ({
  query: s.query,
  selectedCategories: s.selectedCategories,
  setQuery: s.setQuery,
  toggleCategory: s.toggleCategory,
  clearFilters: s.clearFilters,
})));

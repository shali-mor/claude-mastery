'use client';

import { useEffect } from 'react';
import { useStore } from '@/store';

/**
 * 1. Rehydrates the Zustand store from localStorage (skipHydration: true means
 *    the server always renders with initial state — no getServerSnapshot mismatch).
 * 2. Applies the persisted theme class to <html> to prevent flash-of-wrong-theme.
 */
export function ThemeInitializer() {
  const theme = useStore(s => s.theme);

  // Rehydrate once on mount — safe because localStorage is only available client-side
  useEffect(() => {
    useStore.persist.rehydrate();
  }, []);

  useEffect(() => {
    const root = document.documentElement;
    if (theme === 'system') {
      const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
      root.classList.toggle('dark', prefersDark);
    } else {
      root.classList.toggle('dark', theme === 'dark');
    }
  }, [theme]);

  return null;
}

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

  // Hide Clerk development mode widget (injected by Clerk CDN JS)
  useEffect(() => {
    const hideClerkWidget = () => {
      // Walk all fixed-position elements looking for Clerk's dev popup
      const allEls = document.querySelectorAll('body *');
      for (const el of allEls) {
        const html = el as HTMLElement;
        if (
          html.textContent?.includes('Configure your application') &&
          html.textContent?.includes('first user')
        ) {
          // Walk to the outermost portal wrapper (direct body child)
          let root: HTMLElement = html;
          while (root.parentElement && root.parentElement !== document.body) {
            root = root.parentElement;
          }
          root.remove();
          return true;
        }
      }
      return false;
    };
    // Poll since Clerk widget loads asynchronously from CDN
    let attempts = 0;
    const interval = setInterval(() => {
      if (hideClerkWidget() || ++attempts > 20) clearInterval(interval);
    }, 500);
    return () => clearInterval(interval);
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

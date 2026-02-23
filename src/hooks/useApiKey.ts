'use client';

import { useCallback } from 'react';
import { getApiKey, setApiKey, clearApiKey } from '@/lib/storage';
import { useSettings } from '@/store';

export function useApiKey() {
  const { hasApiKey, setHasApiKey } = useSettings();

  const saveKey = useCallback((key: string) => {
    setApiKey(key);
    setHasApiKey(true);
  }, [setHasApiKey]);

  const removeKey = useCallback(() => {
    clearApiKey();
    setHasApiKey(false);
  }, [setHasApiKey]);

  const getKey = useCallback((): string | null => {
    return getApiKey();
  }, []);

  return { hasApiKey, saveKey, removeKey, getKey };
}

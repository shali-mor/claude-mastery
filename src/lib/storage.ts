const PREFIX = 'claude-mastery:';

export function getItem<T>(key: string, fallback: T): T {
  if (typeof window === 'undefined') return fallback;
  try {
    const raw = localStorage.getItem(PREFIX + key);
    if (raw === null) return fallback;
    return JSON.parse(raw) as T;
  } catch {
    return fallback;
  }
}

export function setItem<T>(key: string, value: T): void {
  if (typeof window === 'undefined') return;
  try {
    const serialized = JSON.stringify(value);
    // Guard against storing too much (max 2MB per key)
    if (serialized.length > 2 * 1024 * 1024) {
      console.warn(`[storage] Key "${key}" exceeds 2MB, skipping.`);
      return;
    }
    localStorage.setItem(PREFIX + key, serialized);
  } catch (e) {
    console.warn('[storage] setItem failed:', e);
  }
}

export function removeItem(key: string): void {
  if (typeof window === 'undefined') return;
  localStorage.removeItem(PREFIX + key);
}

// API key — stored separately, never in Zustand
export function getApiKey(): string | null {
  if (typeof window === 'undefined') return null;
  return localStorage.getItem(PREFIX + 'api-key');
}

export function setApiKey(key: string): void {
  if (typeof window === 'undefined') return;
  localStorage.setItem(PREFIX + 'api-key', key);
}

export function clearApiKey(): void {
  if (typeof window === 'undefined') return;
  localStorage.removeItem(PREFIX + 'api-key');
}

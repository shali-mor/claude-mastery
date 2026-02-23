export type Theme = 'light' | 'dark' | 'system';

export interface SettingsState {
  theme: Theme;
  hasApiKey: boolean;
  preferredModel: string;
}

export interface SettingsActions {
  setTheme: (theme: Theme) => void;
  setHasApiKey: (has: boolean) => void;
  setPreferredModel: (model: string) => void;
}

export const initialSettingsState: SettingsState = {
  theme: 'dark',
  hasApiKey: false,
  preferredModel: 'claude-sonnet-4-6',
};

export const createSettingsSlice = (set: (fn: (s: SettingsState) => SettingsState) => void) => ({
  ...initialSettingsState,

  setTheme: (theme: Theme) => set(s => ({ ...s, theme })),
  setHasApiKey: (has: boolean) => set(s => ({ ...s, hasApiKey: has })),
  setPreferredModel: (model: string) => set(s => ({ ...s, preferredModel: model })),
});

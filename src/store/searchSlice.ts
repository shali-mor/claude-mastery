import type { CommandCategory } from '@/types/command';

export interface SearchState {
  query: string;
  selectedCategories: CommandCategory[];
}

export const initialSearchState: SearchState = {
  query: '',
  selectedCategories: [],
};

export const createSearchSlice = (set: (fn: (s: SearchState) => SearchState) => void) => ({
  ...initialSearchState,

  setQuery: (query: string) => set(s => ({ ...s, query })),

  toggleCategory: (category: CommandCategory) =>
    set(s => ({
      ...s,
      selectedCategories: s.selectedCategories.includes(category)
        ? s.selectedCategories.filter(c => c !== category)
        : [...s.selectedCategories, category],
    })),

  clearFilters: () => set(s => ({ ...s, query: '', selectedCategories: [] })),
});

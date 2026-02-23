'use client';

import { useMemo } from 'react';
import { useSearch } from '@/store';
import { commands } from '@/data/commands';
import { searchCommands } from '@/lib/search';

export function useCommandSearch() {
  const { query, selectedCategories, setQuery, toggleCategory, clearFilters } = useSearch();

  const results = useMemo(
    () => searchCommands(commands, query, selectedCategories),
    [query, selectedCategories]
  );

  return { results, query, selectedCategories, setQuery, toggleCategory, clearFilters };
}

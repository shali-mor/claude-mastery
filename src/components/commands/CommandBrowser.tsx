'use client';

import { useState } from 'react';
import { Search, X, Layers } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { useCommandSearch } from '@/hooks/useCommandSearch';
import { CommandCard } from './CommandCard';
import { FlashcardMode } from './FlashcardMode';
import type { CommandCategory } from '@/types/command';
import { commands } from '@/data/commands';

const categories: { value: CommandCategory; label: string; color: string }[] = [
  { value: 'slash-command', label: 'Slash Commands', color: 'bg-blue-500/10 text-blue-600 dark:text-blue-400 border-blue-500/20' },
  { value: 'gsd-plugin', label: 'GSD Plugin', color: 'bg-green-500/10 text-green-600 dark:text-green-400 border-green-500/20' },
  { value: 'hook', label: 'Hooks', color: 'bg-purple-500/10 text-purple-600 dark:text-purple-400 border-purple-500/20' },
  { value: 'skill', label: 'Skills', color: 'bg-orange-500/10 text-orange-600 dark:text-orange-400 border-orange-500/20' },
  { value: 'cli-flag', label: 'CLI Flags', color: 'bg-cyan-500/10 text-cyan-600 dark:text-cyan-400 border-cyan-500/20' },
  { value: 'keyboard-shortcut', label: 'Shortcuts', color: 'bg-pink-500/10 text-pink-600 dark:text-pink-400 border-pink-500/20' },
];

function getCategoryColor(cat: CommandCategory): string {
  return categories.find(c => c.value === cat)?.color ?? 'bg-muted text-muted-foreground';
}

const listVariants = {
  hidden: {},
  show: { transition: { staggerChildren: 0.04 } },
};
const itemVariants = {
  hidden: { opacity: 0, y: 10 },
  show: { opacity: 1, y: 0, transition: { duration: 0.2 } },
};

export function CommandBrowser() {
  const [flashcardMode, setFlashcardMode] = useState(false);
  const { results, query, selectedCategories, setQuery, toggleCategory, clearFilters } = useCommandSearch();

  const totalByCategory = categories.map(c => ({
    ...c,
    count: commands.filter(cmd => cmd.category === c.value).length,
  }));

  const hasFilters = query.trim() !== '' || selectedCategories.length > 0;

  if (flashcardMode) {
    return (
      <div className="max-w-5xl mx-auto px-6 py-8">
        <div className="mb-6">
          <h1 className="text-2xl font-bold mb-1">Flashcard Mode</h1>
          <p className="text-muted-foreground text-sm">
            {results.length} card{results.length !== 1 ? 's' : ''} · Click a card to reveal the answer
          </p>
        </div>
        <FlashcardMode
          commands={results.length > 0 ? results : commands}
          onExit={() => setFlashcardMode(false)}
        />
      </div>
    );
  }

  return (
    <div className="max-w-5xl mx-auto px-6 py-8">
      {/* Header */}
      <motion.div
        initial={{ opacity: 0, y: 12 }}
        animate={{ opacity: 1, y: 0 }}
        className="mb-6 flex items-start justify-between gap-4"
      >
        <div>
          <h1 className="text-2xl font-bold mb-1">Command Browser</h1>
          <p className="text-muted-foreground text-sm">
            {commands.length} entries — slash commands, hooks, skills, GSD commands, CLI flags, and shortcuts.
          </p>
        </div>
        <Button
          onClick={() => setFlashcardMode(true)}
          variant="outline"
          size="sm"
          className="flex-shrink-0 gap-2 border-primary/30 text-primary hover:bg-primary/8"
        >
          <Layers className="h-4 w-4" />
          Flashcard Mode
        </Button>
      </motion.div>

      {/* Search */}
      <div className="relative mb-4">
        <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" aria-hidden="true" />
        <Input
          placeholder="Search commands, descriptions, tags..."
          value={query}
          onChange={e => setQuery(e.target.value)}
          className="pl-9 pr-9"
          aria-label="Search commands"
        />
        {query && (
          <button
            onClick={() => setQuery('')}
            className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground transition-colors"
            aria-label="Clear search"
          >
            <X className="h-4 w-4" />
          </button>
        )}
      </div>

      {/* Category filters */}
      <div
        className="flex flex-wrap gap-2 mb-6"
        role="group"
        aria-label="Filter by category"
      >
        {totalByCategory.map(({ value, label, color, count }) => {
          const isSelected = selectedCategories.includes(value);
          return (
            <button
              key={value}
              onClick={() => toggleCategory(value)}
              aria-pressed={isSelected}
              className={`flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-medium border transition-all ${
                isSelected
                  ? color + ' border-current ring-1 ring-current ring-offset-1 ring-offset-background'
                  : 'bg-muted text-muted-foreground border-transparent hover:bg-muted/70'
              }`}
            >
              {label}
              <span className="opacity-60">({count})</span>
            </button>
          );
        })}
        {hasFilters && (
          <Button variant="ghost" size="sm" onClick={clearFilters} className="h-7 text-xs">
            <X className="h-3.5 w-3.5 mr-1" />
            Clear filters
          </Button>
        )}
      </div>

      {/* Results count */}
      <p className="text-xs text-muted-foreground mb-4" aria-live="polite">
        Showing {results.length} of {commands.length} entries
        {query && ` matching "${query}"`}
      </p>

      {/* Results */}
      <AnimatePresence mode="wait">
        {results.length === 0 ? (
          <motion.div
            key="empty"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="text-center py-16 text-muted-foreground"
          >
            <Search className="h-8 w-8 mx-auto mb-3 opacity-40" />
            <p className="font-medium">No commands found</p>
            <p className="text-sm">Try different search terms or clear the filters.</p>
          </motion.div>
        ) : (
          <motion.div
            key="results"
            variants={listVariants}
            initial="hidden"
            animate="show"
            className="space-y-3"
          >
            {results.map(cmd => (
              <motion.div key={cmd.id} variants={itemVariants}>
                <CommandCard command={cmd} categoryColor={getCategoryColor(cmd.category)} />
              </motion.div>
            ))}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

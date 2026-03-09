'use client';

import { useState } from 'react';
import { Search, X, Layers, Terminal, Zap, Webhook, Sparkles, Flag, Keyboard } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { useCommandSearch } from '@/hooks/useCommandSearch';
import { CommandCard } from './CommandCard';
import { FlashcardMode } from './FlashcardMode';
import type { CommandCategory } from '@/types/command';
import { commands } from '@/data/commands';

const categories: {
  value: CommandCategory;
  label: string;
  icon: React.ElementType;
  badgeColor: string;   // for CommandCard badge (bg + text + border)
  activeColor: string;  // sidebar active state
  dotColor: string;     // sidebar dot
}[] = [
  {
    value: 'slash-command',
    label: 'Slash Commands',
    icon: Terminal,
    badgeColor: 'bg-blue-500/10 text-blue-600 dark:text-blue-400 border-blue-500/20',
    activeColor: 'bg-blue-500/10 text-blue-600 dark:text-blue-400',
    dotColor: 'bg-blue-500',
  },
  {
    value: 'gsd-plugin',
    label: 'GSD Plugin',
    icon: Zap,
    badgeColor: 'bg-green-500/10 text-green-600 dark:text-green-400 border-green-500/20',
    activeColor: 'bg-green-500/10 text-green-600 dark:text-green-400',
    dotColor: 'bg-green-500',
  },
  {
    value: 'hook',
    label: 'Hooks',
    icon: Webhook,
    badgeColor: 'bg-purple-500/10 text-purple-600 dark:text-purple-400 border-purple-500/20',
    activeColor: 'bg-purple-500/10 text-purple-600 dark:text-purple-400',
    dotColor: 'bg-purple-500',
  },
  {
    value: 'skill',
    label: 'Skills',
    icon: Sparkles,
    badgeColor: 'bg-orange-500/10 text-orange-600 dark:text-orange-400 border-orange-500/20',
    activeColor: 'bg-orange-500/10 text-orange-600 dark:text-orange-400',
    dotColor: 'bg-orange-500',
  },
  {
    value: 'cli-flag',
    label: 'CLI Flags',
    icon: Flag,
    badgeColor: 'bg-cyan-500/10 text-cyan-600 dark:text-cyan-400 border-cyan-500/20',
    activeColor: 'bg-cyan-500/10 text-cyan-600 dark:text-cyan-400',
    dotColor: 'bg-cyan-500',
  },
  {
    value: 'keyboard-shortcut',
    label: 'Shortcuts',
    icon: Keyboard,
    badgeColor: 'bg-pink-500/10 text-pink-600 dark:text-pink-400 border-pink-500/20',
    activeColor: 'bg-pink-500/10 text-pink-600 dark:text-pink-400',
    dotColor: 'bg-pink-500',
  },
];

function getCategoryConfig(cat: CommandCategory) {
  return categories.find(c => c.value === cat) ?? categories[0];
}

export function CommandBrowser() {
  const [flashcardMode, setFlashcardMode] = useState(false);
  const [activeCategory, setActiveCategory] = useState<CommandCategory>('slash-command');
  const { results, query, setQuery, clearFilters } = useCommandSearch();

  const isSearching = query.trim() !== '';

  const categoryCounts = Object.fromEntries(
    categories.map(c => [c.value, commands.filter(cmd => cmd.category === c.value).length])
  );

  const displayedCommands = isSearching
    ? results
    : commands.filter(cmd => cmd.category === activeCategory);

  const activeCat = getCategoryConfig(activeCategory);

  function handleCategoryClick(cat: CommandCategory) {
    setActiveCategory(cat);
    clearFilters();
  }

  // ── Flashcard mode ───────────────────────────────────────────────────────
  if (flashcardMode) {
    return (
      <div className="max-w-4xl mx-auto px-6 py-8">
        <div className="mb-6">
          <h1 className="text-2xl font-bold mb-1">Flashcard Mode</h1>
          <p className="text-muted-foreground text-sm">
            {results.length > 0 ? results.length : commands.length} cards · Click to reveal
          </p>
        </div>
        <FlashcardMode
          commands={results.length > 0 ? results : commands}
          onExit={() => setFlashcardMode(false)}
        />
      </div>
    );
  }

  // ── Main layout ──────────────────────────────────────────────────────────
  return (
    <div className="flex min-h-0">

      {/* ── Left sidebar (desktop) ─────────────────────────────────────────── */}
      <aside className="hidden lg:flex flex-col w-52 flex-shrink-0 border-r border-border sticky top-0 self-start">
        <div className="py-5 px-3">
          <p className="text-xs font-semibold text-muted-foreground uppercase tracking-wider px-2 mb-3">
            Categories
          </p>
          <nav className="space-y-0.5">
            {categories.map(cat => {
              const Icon = cat.icon;
              const isActive = activeCategory === cat.value && !isSearching;
              const count = categoryCounts[cat.value];
              return (
                <button
                  key={cat.value}
                  onClick={() => handleCategoryClick(cat.value)}
                  className={`w-full flex items-center justify-between px-2 py-2 rounded-md text-sm transition-colors ${
                    isActive
                      ? cat.activeColor + ' font-medium'
                      : 'text-muted-foreground hover:text-foreground hover:bg-muted/50'
                  }`}
                >
                  <span className="flex items-center gap-2.5">
                    <Icon className="h-3.5 w-3.5 flex-shrink-0" />
                    {cat.label}
                  </span>
                  <span className={`text-xs tabular-nums ${isActive ? 'opacity-70' : 'opacity-40'}`}>
                    {count}
                  </span>
                </button>
              );
            })}
          </nav>

          <div className="mt-6 px-2">
            <Button
              onClick={() => setFlashcardMode(true)}
              variant="outline"
              size="sm"
              className="w-full gap-2 text-xs"
            >
              <Layers className="h-3.5 w-3.5" />
              Flashcard Mode
            </Button>
          </div>
        </div>
      </aside>

      {/* ── Content area ───────────────────────────────────────────────────── */}
      <div className="flex-1 min-w-0 px-4 lg:px-8 py-6">
        <div className="max-w-3xl mx-auto">

          {/* Search + flashcard (mobile shows button here too) */}
          <div className="flex items-center gap-3 mb-5">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" aria-hidden />
              <Input
                placeholder="Search commands, descriptions, tags…"
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
            <Button
              onClick={() => setFlashcardMode(true)}
              variant="outline"
              size="sm"
              className="flex-shrink-0 gap-2 lg:hidden"
            >
              <Layers className="h-4 w-4" />
              Flashcards
            </Button>
          </div>

          {/* Mobile category tabs */}
          <div
            className="flex lg:hidden gap-2 overflow-x-auto pb-2 mb-5"
            style={{ scrollbarWidth: 'none' }}
            role="tablist"
            aria-label="Command categories"
          >
            {categories.map(cat => {
              const isActive = activeCategory === cat.value && !isSearching;
              return (
                <button
                  key={cat.value}
                  role="tab"
                  aria-selected={isActive}
                  onClick={() => handleCategoryClick(cat.value)}
                  className={`flex-shrink-0 flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-medium border transition-all ${
                    isActive
                      ? cat.badgeColor + ' border-current'
                      : 'bg-muted text-muted-foreground border-transparent hover:bg-muted/70'
                  }`}
                >
                  {cat.label}
                  <span className="opacity-60">({categoryCounts[cat.value]})</span>
                </button>
              );
            })}
          </div>

          {/* Section header */}
          <div className="flex items-center justify-between mb-4">
            {isSearching ? (
              <div className="flex items-center gap-2">
                <p className="text-sm font-medium">
                  {results.length} result{results.length !== 1 ? 's' : ''}
                </p>
                <p className="text-sm text-muted-foreground">for &ldquo;{query}&rdquo;</p>
                <Button variant="ghost" size="sm" onClick={clearFilters} className="h-6 text-xs px-2">
                  <X className="h-3 w-3 mr-1" /> Clear
                </Button>
              </div>
            ) : (
              <div className="flex items-center gap-2">
                <div className={`w-2 h-2 rounded-full ${activeCat.dotColor}`} />
                <h2 className="text-sm font-semibold">{activeCat.label}</h2>
                <Badge variant="secondary" className="text-xs px-1.5 py-0">{categoryCounts[activeCategory]}</Badge>
              </div>
            )}
          </div>

          {/* Command list */}
          <AnimatePresence mode="wait">
            {displayedCommands.length === 0 ? (
              <motion.div
                key="empty"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                className="text-center py-20 text-muted-foreground"
              >
                <Search className="h-8 w-8 mx-auto mb-3 opacity-30" />
                <p className="font-medium">No commands found</p>
                <p className="text-sm mt-1">Try different keywords or clear the search.</p>
              </motion.div>
            ) : (
              <motion.div
                key={isSearching ? 'search' : activeCategory}
                initial={{ opacity: 0, y: 6 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.15 }}
                className="space-y-2"
              >
                {displayedCommands.map(cmd => (
                  <CommandCard
                    key={cmd.id}
                    command={cmd}
                    categoryColor={getCategoryConfig(cmd.category).badgeColor}
                    showCategory={isSearching}
                  />
                ))}
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>
    </div>
  );
}

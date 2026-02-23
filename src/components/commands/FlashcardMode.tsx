'use client';

import { useState, useMemo, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Shuffle, ChevronRight, RotateCcw, CheckCircle, XCircle, Trophy } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import type { Command } from '@/types/command';

interface FlashcardModeProps {
  commands: Command[];
  onExit: () => void;
}

function shuffle<T>(arr: T[]): T[] {
  const a = [...arr];
  for (let i = a.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [a[i], a[j]] = [a[j], a[i]];
  }
  return a;
}

const categoryColor: Record<string, string> = {
  'slash-command': 'bg-blue-500/10 text-blue-600 dark:text-blue-400',
  'gsd-plugin':    'bg-green-500/10 text-green-600 dark:text-green-400',
  'hook':          'bg-purple-500/10 text-purple-600 dark:text-purple-400',
  'skill':         'bg-orange-500/10 text-orange-600 dark:text-orange-400',
  'cli-flag':      'bg-cyan-500/10 text-cyan-600 dark:text-cyan-400',
  'keyboard-shortcut': 'bg-pink-500/10 text-pink-600 dark:text-pink-400',
};

export function FlashcardMode({ commands, onExit }: FlashcardModeProps) {
  const [deck, setDeck] = useState<Command[]>(() => shuffle(commands));
  const [index, setIndex] = useState(0);
  const [flipped, setFlipped] = useState(false);
  const [known, setKnown] = useState<Set<string>>(new Set());
  const [review, setReview] = useState<Set<string>>(new Set());
  const [done, setDone] = useState(false);

  const card = deck[index];
  const total = deck.length;
  const progress = Math.round(((known.size + review.size) / total) * 100);

  const advance = useCallback((result: 'known' | 'review') => {
    if (result === 'known') setKnown(prev => new Set([...prev, card.id]));
    else setReview(prev => new Set([...prev, card.id]));

    setFlipped(false);
    setTimeout(() => {
      if (index + 1 >= total) {
        setDone(true);
      } else {
        setIndex(i => i + 1);
      }
    }, 150);
  }, [card, index, total]);

  const restart = (onlyReview = false) => {
    const source = onlyReview
      ? commands.filter(c => review.has(c.id))
      : commands;
    setDeck(shuffle(source));
    setIndex(0);
    setFlipped(false);
    setKnown(new Set());
    setReview(new Set());
    setDone(false);
  };

  // ── Completion screen ──────────────────────────────────────────────────
  if (done) {
    const knownPct = Math.round((known.size / total) * 100);
    return (
      <motion.div
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        className="flex flex-col items-center justify-center py-16 text-center"
      >
        <div className="w-20 h-20 rounded-full bg-primary/10 flex items-center justify-center mb-6">
          <Trophy className="h-10 w-10 text-primary" />
        </div>
        <h2 className="text-2xl font-bold mb-2">Deck complete!</h2>
        <p className="text-muted-foreground mb-6">
          <strong className="text-green-600">{known.size}</strong> known ·{' '}
          <strong className="text-orange-500">{review.size}</strong> to review
        </p>
        <Progress value={knownPct} className="h-3 max-w-xs mx-auto mb-8" />

        <div className="flex flex-col sm:flex-row gap-3">
          {review.size > 0 && (
            <Button onClick={() => restart(true)} className="gap-2">
              <RotateCcw className="h-4 w-4" />
              Review {review.size} card{review.size !== 1 ? 's' : ''}
            </Button>
          )}
          <Button onClick={() => restart(false)} variant="outline" className="gap-2">
            <Shuffle className="h-4 w-4" />
            Reshuffle all
          </Button>
          <Button onClick={onExit} variant="ghost">Exit flashcards</Button>
        </div>
      </motion.div>
    );
  }

  // ── Card ───────────────────────────────────────────────────────────────
  return (
    <div className="max-w-xl mx-auto">
      {/* Header */}
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center gap-3 text-sm text-muted-foreground">
          <span className="font-medium text-foreground">{index + 1}</span>
          <span>/ {total}</span>
          <span className="text-green-600 flex items-center gap-1">
            <CheckCircle className="h-3.5 w-3.5" />{known.size}
          </span>
          <span className="text-orange-500 flex items-center gap-1">
            <XCircle className="h-3.5 w-3.5" />{review.size}
          </span>
        </div>
        <div className="flex items-center gap-2">
          <Button variant="ghost" size="sm" onClick={() => restart(false)} className="h-7 text-xs gap-1">
            <Shuffle className="h-3.5 w-3.5" /> Shuffle
          </Button>
          <Button variant="ghost" size="sm" onClick={onExit} className="h-7 text-xs">
            Exit
          </Button>
        </div>
      </div>

      <Progress value={progress} className="h-1 mb-6" />

      {/* Card */}
      <AnimatePresence mode="wait">
        <motion.div
          key={card.id + (flipped ? '-back' : '-front')}
          initial={{ opacity: 0, rotateY: flipped ? -90 : 90, scale: 0.95 }}
          animate={{ opacity: 1, rotateY: 0, scale: 1 }}
          exit={{ opacity: 0, scale: 0.95 }}
          transition={{ duration: 0.25 }}
          className="cursor-pointer select-none"
          onClick={() => !flipped && setFlipped(true)}
        >
          <div className={`rounded-2xl border-2 min-h-[240px] flex flex-col p-6 transition-colors ${
            flipped ? 'border-primary/40 bg-primary/4' : 'border-border bg-card hover:border-primary/30'
          }`}>
            {/* Category badge */}
            <div className="flex items-center justify-between mb-4">
              <Badge className={`text-xs border-0 ${categoryColor[card.category] ?? 'bg-muted text-muted-foreground'}`}>
                {card.category}
              </Badge>
              {!flipped && (
                <span className="text-xs text-muted-foreground flex items-center gap-1">
                  tap to flip <ChevronRight className="h-3 w-3" />
                </span>
              )}
            </div>

            {/* Front: command name */}
            {!flipped ? (
              <div className="flex-1 flex flex-col items-center justify-center text-center">
                <code className="text-2xl font-mono font-bold text-foreground mb-3">{card.name}</code>
                <p className="text-sm text-muted-foreground">What does this do?</p>
              </div>
            ) : (
              /* Back: summary + description + syntax */
              <div className="flex-1 space-y-3">
                <code className="text-lg font-mono font-bold text-primary">{card.name}</code>
                <p className="text-sm font-medium text-foreground">{card.summary}</p>
                <p className="text-sm text-muted-foreground leading-relaxed">{card.description}</p>
                {card.syntax && (
                  <code className="block text-xs bg-muted px-3 py-2 rounded-lg font-mono text-muted-foreground">
                    {card.syntax}
                  </code>
                )}
              </div>
            )}
          </div>
        </motion.div>
      </AnimatePresence>

      {/* Action buttons — only visible after flip */}
      <AnimatePresence>
        {flipped && (
          <motion.div
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0 }}
            className="flex gap-3 mt-4"
          >
            <Button
              onClick={() => advance('review')}
              variant="outline"
              className="flex-1 border-orange-500/40 text-orange-600 hover:bg-orange-500/10 hover:border-orange-500 gap-2"
            >
              <XCircle className="h-4 w-4" />
              Still learning
            </Button>
            <Button
              onClick={() => advance('known')}
              className="flex-1 bg-green-600 hover:bg-green-700 gap-2"
            >
              <CheckCircle className="h-4 w-4" />
              Got it!
            </Button>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Hint to flip if not yet */}
      {!flipped && (
        <p className="text-center text-xs text-muted-foreground mt-4">
          Click the card to reveal the answer
        </p>
      )}
    </div>
  );
}

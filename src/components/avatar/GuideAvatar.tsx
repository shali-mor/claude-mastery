'use client';

import { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X } from 'lucide-react';

export type AvatarMood = 'happy' | 'celebrating' | 'thinking' | 'encouraging';

function AriaSVG({ mood, size = 36 }: { mood: AvatarMood; size?: number }) {
  const isHappy = mood === 'happy' || mood === 'celebrating' || mood === 'encouraging';
  const isThinking = mood === 'thinking';

  return (
    <span className="text-primary">
      <svg width={size} height={size} viewBox="0 0 40 44" fill="none" aria-hidden="true">
        {/* Antenna */}
        <line x1="20" y1="13" x2="20" y2="5" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" />
        <circle cx="20" cy="3.5" r="2.8" fill="currentColor" />

        {/* Head */}
        <rect x="4" y="13" width="32" height="26" rx="9" fill="currentColor" />

        {/* Face panel tint */}
        <rect x="8" y="17" width="24" height="18" rx="6" fill="white" fillOpacity="0.1" />

        {/* Eye whites */}
        <circle cx="14.5" cy="24" r="4.2" fill="white" fillOpacity="0.95" />
        <circle cx="25.5" cy="24" r="4.2" fill="white" fillOpacity="0.95" />

        {/* Pupils — shift up when thinking */}
        <circle cx={isThinking ? '15.5' : '15'} cy={isThinking ? '23' : '24.5'} r="2.1" fill="#111" />
        <circle cx={isThinking ? '26.5' : '26'} cy={isThinking ? '23' : '24.5'} r="2.1" fill="#111" />

        {/* Eye shine */}
        <circle cx={isThinking ? '16.2' : '15.8'} cy={isThinking ? '22' : '23.2'} r="0.85" fill="white" />
        <circle cx={isThinking ? '27.2' : '26.8'} cy={isThinking ? '22' : '23.2'} r="0.85" fill="white" />

        {/* Mouth */}
        {isHappy ? (
          <path d="M13 33 Q20.5 38.5 28 33" stroke="white" strokeWidth="2" strokeLinecap="round" fill="none" />
        ) : (
          <path d="M14 34 Q20.5 34 27 34" stroke="white" strokeWidth="2" strokeLinecap="round" fill="none" />
        )}
      </svg>
    </span>
  );
}

interface GuideAvatarProps {
  message: string;
  mood?: AvatarMood;
}

export function GuideAvatar({ message, mood = 'happy' }: GuideAvatarProps) {
  const [open, setOpen] = useState(true);

  // Re-open bubble whenever the message changes (new context)
  useEffect(() => {
    setOpen(true);
  }, [message]);

  return (
    <div className="fixed bottom-6 right-6 z-40 flex flex-col items-end gap-3 pointer-events-none">
      {/* Speech bubble */}
      <AnimatePresence mode="wait">
        {open && (
          <motion.div
            key={message}
            initial={{ opacity: 0, y: 12, scale: 0.92 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 8, scale: 0.95 }}
            transition={{ type: 'spring', stiffness: 320, damping: 28 }}
            className="pointer-events-auto relative max-w-[230px] bg-card border border-border rounded-2xl shadow-xl shadow-black/10 px-4 py-3"
          >
            {/* Dismiss */}
            <button
              onClick={() => setOpen(false)}
              aria-label="Dismiss hint"
              className="absolute top-2 right-2 w-5 h-5 rounded-full text-muted-foreground hover:text-foreground hover:bg-muted flex items-center justify-center transition-colors"
            >
              <X className="h-3 w-3" />
            </button>

            <p className="text-[11px] font-semibold text-primary mb-1 tracking-wide uppercase pr-5">
              Aria · Guide
            </p>
            <p className="text-sm leading-relaxed text-foreground pr-3">{message}</p>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Avatar button */}
      <motion.button
        onClick={() => setOpen(o => !o)}
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.92 }}
        animate={!open ? { scale: [1, 1.04, 1] } : {}}
        transition={!open ? { repeat: Infinity, duration: 2.5, ease: 'easeInOut' } : { duration: 0.15 }}
        aria-label={open ? 'Hide guide' : 'Show guide hint'}
        className="pointer-events-auto w-13 h-13 w-[52px] h-[52px] rounded-full bg-primary/10 border-2 border-primary/25 hover:border-primary/55 hover:bg-primary/18 flex items-center justify-center shadow-lg shadow-primary/10 transition-colors"
      >
        {mood === 'celebrating' ? (
          <motion.span
            animate={{ rotate: [0, -12, 12, -8, 0] }}
            transition={{ duration: 0.7, delay: 0.15 }}
          >
            <AriaSVG mood={mood} />
          </motion.span>
        ) : (
          <AriaSVG mood={mood} />
        )}
      </motion.button>
    </div>
  );
}

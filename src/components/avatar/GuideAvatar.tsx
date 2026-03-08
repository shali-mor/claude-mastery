'use client';

import { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X } from 'lucide-react';

export type AvatarMood = 'happy' | 'celebrating' | 'thinking' | 'encouraging';

// ─── Cartoon portrait SVG ────────────────────────────────────────────────────
// Inspired by the course instructor: dark wavy hair, olive skin, dark eyes,
// defined brows, slight stubble, black v-neck tee.
function PersonSVG({ mood, size = 40 }: { mood: AvatarMood; size?: number }) {
  const isCelebrating = mood === 'celebrating';
  const isThinking    = mood === 'thinking';
  const isHappy       = mood === 'happy' || mood === 'encouraging' || isCelebrating;

  // Mouth path — bigger arc when celebrating
  const mouth = isCelebrating
    ? 'M17 44 Q26 51 35 44'
    : isHappy
    ? 'M18 44 Q26 49 34 44'
    : 'M19 44 Q26 44 33 44';

  // Eyebrow paths
  const lBrow = isThinking
    ? 'M10 18.5 Q15 17.5 20 19.5'
    : isCelebrating
    ? 'M10 15.5 Q15 13.5 20 15'
    : 'M10 18 Q15 16 20 17.5';

  const rBrow = isThinking
    ? 'M32 19.5 Q37 17.5 42 18.5'
    : isCelebrating
    ? 'M32 15 Q37 13.5 42 15.5'
    : 'M32 17.5 Q37 16 42 18';

  // Pupil y-pos — look up slightly when thinking
  const py = isThinking ? 24 : 25.5;

  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 52 58"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      aria-hidden="true"
    >
      {/* ── Black v-neck shirt ── */}
      <path
        d="M2 58 L2 45 Q6 37 16 36 L21 35 L26 44 L31 35 L36 36 Q46 37 50 45 L50 58 Z"
        fill="#181818"
        stroke="#2a2a2a"
        strokeWidth="0.6"
      />
      {/* V-neck centre seam */}
      <path d="M21 35 L26 44 L31 35" stroke="#2e2e2e" strokeWidth="0.7" fill="none" />

      {/* ── Neck ── */}
      <path
        d="M20 43 Q26 47 32 43 L32 36 Q26 40 20 36 Z"
        fill="#C8865E"
      />

      {/* ── Face oval ── */}
      <ellipse cx="26" cy="25" rx="19.5" ry="22" fill="#D4956A" />

      {/* ── Dark wavy hair — top mass ── */}
      <path
        d="M6 23 Q5 8 13 3 Q19 -1 26 0.5 Q33 -1 39 3 Q47 8 46 23
           Q42 12 37 9 Q31 5.5 26 6 Q21 5.5 15 9 Q10 12 6 23 Z"
        fill="#1C0E07"
      />
      {/* Left side hair dropping down */}
      <path
        d="M6 23 Q4 32 6 39 Q10 27 14 23"
        fill="#1C0E07"
      />
      {/* Right side hair */}
      <path
        d="M46 23 Q48 32 46 39 Q42 27 38 23"
        fill="#1C0E07"
      />
      {/* Hair texture / wave lines on top */}
      <path d="M17 7 Q26 4.5 35 7"   stroke="#2E1810" strokeWidth="1.2" fill="none" strokeLinecap="round" />
      <path d="M20 5.5 Q26 3.5 32 5.5" stroke="#2E1810" strokeWidth="0.9" fill="none" strokeLinecap="round" />

      {/* ── Ears ── */}
      <ellipse cx="6.8" cy="27" rx="3.2" ry="4.5" fill="#C8865E" />
      <ellipse cx="6.8" cy="27" rx="1.5" ry="2.5" fill="#B57548" />
      <ellipse cx="45.2" cy="27" rx="3.2" ry="4.5" fill="#C8865E" />
      <ellipse cx="45.2" cy="27" rx="1.5" ry="2.5" fill="#B57548" />

      {/* ── Eyebrows — thick, dark, defined ── */}
      <path d={lBrow} stroke="#1A0C06" strokeWidth="2.4" strokeLinecap="round" fill="none" />
      <path d={rBrow} stroke="#1A0C06" strokeWidth="2.4" strokeLinecap="round" fill="none" />

      {/* ── Left eye ── */}
      <ellipse cx="16.5" cy="24" rx="5.2" ry="4" fill="#EEE8DC" />
      {/* iris */}
      <circle cx="17"  cy={py}   r="3.1" fill="#2C1A0E" />
      {/* pupil */}
      <circle cx="17"  cy={py}   r="1.7" fill="#0C0400" />
      {/* shine */}
      <circle cx="15.8" cy={py - 1.2} r="1.1" fill="white" />
      {/* upper eyelid */}
      <path d="M11.3 24 Q16.5 20 21.7 24" stroke="#1A0C06" strokeWidth="1.1" fill="none" />
      {/* lower lash hint */}
      <path d="M12 24.5 Q16.5 26.5 21 24.5" stroke="#1A0C06" strokeWidth="0.45" fill="none" />

      {/* ── Right eye ── */}
      <ellipse cx="35.5" cy="24" rx="5.2" ry="4" fill="#EEE8DC" />
      <circle cx="36"  cy={py}   r="3.1" fill="#2C1A0E" />
      <circle cx="36"  cy={py}   r="1.7" fill="#0C0400" />
      <circle cx="34.8" cy={py - 1.2} r="1.1" fill="white" />
      <path d="M30.3 24 Q35.5 20 40.7 24" stroke="#1A0C06" strokeWidth="1.1" fill="none" />
      <path d="M31 24.5 Q35.5 26.5 40 24.5" stroke="#1A0C06" strokeWidth="0.45" fill="none" />

      {/* ── Nose — prominent, characteristic ── */}
      {/* bridge */}
      <path d="M24 27 Q22 34 23.5 37" stroke="#B07048" strokeWidth="1.2" strokeLinecap="round" fill="none" />
      <path d="M28 27 Q30 34 28.5 37" stroke="#B07048" strokeWidth="1.2" strokeLinecap="round" fill="none" />
      {/* tip */}
      <path d="M23.5 37 Q26 39.5 28.5 37" stroke="#B07048" strokeWidth="1.3" strokeLinecap="round" fill="none" />
      {/* nostrils */}
      <path d="M23.5 37 Q21 38.5 22 39.5" stroke="#B07048" strokeWidth="1.1" strokeLinecap="round" fill="none" />
      <path d="M28.5 37 Q31 38.5 30 39.5" stroke="#B07048" strokeWidth="1.1" strokeLinecap="round" fill="none" />

      {/* ── Mouth ── */}
      <path d={mouth} stroke="#8C3222" strokeWidth="1.9" strokeLinecap="round" fill="none" />
      {/* lower lip */}
      {isHappy && (
        <path d="M20 48 Q26 50.5 32 48" stroke="#A84E3A" strokeWidth="0.9" strokeLinecap="round" fill="none" />
      )}

      {/* ── Stubble shadow — subtle dark overlay on lower face ── */}
      <path
        d="M13 40 Q16 48 26 49 Q36 48 39 40 Q34 44 26 44 Q18 44 13 40 Z"
        fill="#1C0E07"
        fillOpacity="0.14"
      />

      {/* ── Cheek warmth ── */}
      <ellipse cx="10"  cy="32" rx="5" ry="3" fill="#E07050" fillOpacity="0.13" />
      <ellipse cx="42"  cy="32" rx="5" ry="3" fill="#E07050" fillOpacity="0.13" />

      {/* ── Subtle face shadow on forehead under hair ── */}
      <path
        d="M9 22 Q15 18 26 17 Q37 18 43 22 Q37 16 26 15 Q15 16 9 22 Z"
        fill="#B07040"
        fillOpacity="0.2"
      />
    </svg>
  );
}

// ─── Main floating avatar component ─────────────────────────────────────────
interface GuideAvatarProps {
  message: string;
  mood?: AvatarMood;
}

export function GuideAvatar({ message, mood = 'happy' }: GuideAvatarProps) {
  const [open, setOpen] = useState(true);

  // Re-open whenever the message changes (new lesson / quiz state)
  useEffect(() => {
    setOpen(true);
  }, [message]);

  return (
    <div className="fixed bottom-6 right-6 z-40 flex flex-col items-end gap-3 pointer-events-none">
      {/* ── Speech bubble ── */}
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
            <button
              onClick={() => setOpen(false)}
              aria-label="Dismiss hint"
              className="absolute top-2 right-2 w-5 h-5 rounded-full text-muted-foreground hover:text-foreground hover:bg-muted flex items-center justify-center transition-colors"
            >
              <X className="h-3 w-3" />
            </button>
            <p className="text-[11px] font-semibold text-primary mb-1 tracking-wide uppercase pr-5">
              Your Guide
            </p>
            <p className="text-sm leading-relaxed text-foreground pr-3">{message}</p>
          </motion.div>
        )}
      </AnimatePresence>

      {/* ── Avatar button ── */}
      <motion.button
        onClick={() => setOpen(o => !o)}
        whileHover={{ scale: 1.08 }}
        whileTap={{ scale: 0.92 }}
        animate={!open ? { scale: [1, 1.04, 1] } : {}}
        transition={
          !open
            ? { repeat: Infinity, duration: 2.6, ease: 'easeInOut' }
            : { duration: 0.15 }
        }
        aria-label={open ? 'Hide guide' : 'Show guide hint'}
        className="pointer-events-auto w-[56px] h-[56px] rounded-full overflow-hidden border-2 border-border hover:border-primary/50 shadow-lg transition-colors bg-card"
      >
        <PersonSVG mood={mood} size={56} />
      </motion.button>
    </div>
  );
}

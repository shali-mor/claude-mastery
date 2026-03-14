'use client';

import { useEffect, useState, useMemo, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Play, Pause } from 'lucide-react';
import type { ContentBlock } from '@/types/module';

// ── Types ────────────────────────────────────────────────────────────────────

type Expr = 'neutral' | 'happy' | 'excited' | 'amazed';

interface Scene {
  slideType: 'heading' | 'text' | 'code' | 'step' | 'callout';
  content: string;
  expression: Expr;
  durationMs: number;
  isChapter: boolean;
  stepNumber?: number;
  stepTotal?: number;
}

// ── Helpers ──────────────────────────────────────────────────────────────────

function stripMd(text: string): string {
  return text
    .replace(/\*\*([^*]+)\*\*/g, '$1')
    .replace(/`([^`]+)`/g, '$1')
    .replace(/\[([^\]]+)\]\([^)]+\)/g, '$1');
}

function blocksToScenes(blocks: ContentBlock[]): Scene[] {
  const result: Scene[] = [];
  for (const block of blocks) {
    switch (block.type) {
      case 'heading': {
        const text = block.content ?? '';
        result.push({
          slideType: 'heading', content: text,
          expression: 'excited', durationMs: 3000, isChapter: true,
        });
        break;
      }
      case 'text': {
        const text = block.content ?? '';
        result.push({
          slideType: 'text', content: text,
          expression: 'neutral',
          durationMs: Math.max(4000, Math.min(10000, text.length * 25)),
          isChapter: false,
        });
        break;
      }
      case 'code': {
        const code = block.content ?? '';
        result.push({
          slideType: 'code', content: code,
          expression: 'happy', durationMs: 5000, isChapter: false,
        });
        break;
      }
      case 'steps': {
        const steps = block.steps ?? [];
        steps.forEach((step, i) => {
          result.push({
            slideType: 'step', content: step,
            expression: 'excited', durationMs: 4000, isChapter: false,
            stepNumber: i + 1, stepTotal: steps.length,
          });
        });
        break;
      }
      case 'callout':
      case 'tip':
      case 'warning': {
        const text = block.content ?? '';
        result.push({
          slideType: 'callout', content: text,
          expression: 'happy', durationMs: 5000, isChapter: false,
        });
        break;
      }
    }
  }
  return result;
}

function getSpeech(scene: Scene): string {
  switch (scene.slideType) {
    case 'heading': return "New section — let's go!";
    case 'step':    return `Step ${scene.stepNumber} of ${scene.stepTotal} coming up…`;
    case 'code':    return "Here's the command!";
    case 'callout': return "Heads up — important tip!";
    default:        return "Here's what you need to know…";
  }
}

function formatTime(ms: number): string {
  const sec = Math.floor(ms / 1000);
  return `${Math.floor(sec / 60)}:${(sec % 60).toString().padStart(2, '0')}`;
}

// ── DevChar SVG ──────────────────────────────────────────────────────────────

function DevChar({ expr }: { expr: Expr }) {
  const mouths: Record<Expr, string> = {
    neutral: 'M 23 32 L 37 32',
    happy:   'M 21 31 Q 30 38 39 31',
    excited: 'M 20 30 Q 30 40 40 30',
    amazed:  'M 26 31 Q 30 37 34 31',
  };
  const eyeScale: Record<Expr, number> = { neutral: 1, happy: 0.65, excited: 1.35, amazed: 1.65 };
  const raised = expr === 'excited' || expr === 'amazed';
  const es = eyeScale[expr];

  return (
    <svg
      viewBox="0 0 60 120"
      className="w-[100px] h-[200px] flex-shrink-0"
      style={{ filter: 'drop-shadow(0 6px 18px rgba(0,0,0,0.5))' }}
    >
      <path d="M 12 28 Q 12 6 30 5 Q 48 6 48 28 Q 44 16 30 14 Q 16 16 12 28 Z" fill="#1e293b" />
      <motion.circle cx="30" cy="28" r="18" fill="#fcd5b0"
        animate={{ scale: expr === 'amazed' ? 1.04 : 1 }} transition={{ duration: 0.25 }} />
      <motion.circle cx="23" cy="24" r={2.5 * es} fill="#1e293b"
        animate={{ r: 2.5 * es }} transition={{ duration: 0.25 }} />
      <motion.circle cx="37" cy="24" r={2.5 * es} fill="#1e293b"
        animate={{ r: 2.5 * es }} transition={{ duration: 0.25 }} />
      <circle cx="24.5" cy="22.8" r="0.9" fill="white" opacity="0.85" />
      <circle cx="38.5" cy="22.8" r="0.9" fill="white" opacity="0.85" />
      <motion.path d="M 19 18 Q 23 15 27 18" stroke="#1e293b" strokeWidth="1.8" strokeLinecap="round" fill="none"
        animate={{ d: raised ? 'M 18 16 Q 23 12 28 16' : 'M 19 18 Q 23 15 27 18' }} transition={{ duration: 0.25 }} />
      <motion.path d="M 33 18 Q 37 15 41 18" stroke="#1e293b" strokeWidth="1.8" strokeLinecap="round" fill="none"
        animate={{ d: raised ? 'M 32 16 Q 37 12 42 16' : 'M 33 18 Q 37 15 41 18' }} transition={{ duration: 0.25 }} />
      <AnimatePresence mode="wait">
        <motion.path key={expr} d={mouths[expr]} stroke="#c0392b" strokeWidth="2.2" strokeLinecap="round" fill="none"
          initial={{ opacity: 0, scaleX: 0.4 }} animate={{ opacity: 1, scaleX: 1 }} exit={{ opacity: 0 }}
          style={{ transformOrigin: '30px 32px' }} transition={{ duration: 0.2 }} />
      </AnimatePresence>
      {(expr === 'happy' || expr === 'excited') && (
        <>
          <ellipse cx="19" cy="31" rx="4" ry="2.5" fill="#f9a8a8" opacity="0.4" />
          <ellipse cx="41" cy="31" rx="4" ry="2.5" fill="#f9a8a8" opacity="0.4" />
        </>
      )}
      <rect x="26" y="45" width="8" height="8" fill="#fcd5b0" />
      <motion.rect x="14" y="52" width="32" height="36" rx="8" fill="#f97316"
        animate={{ scaleY: expr === 'excited' ? [1, 1.04, 1] : 1 }}
        transition={{ duration: 0.4, repeat: expr === 'excited' ? 2 : 0 }}
        style={{ transformOrigin: '30px 70px' }} />
      <text x="22" y="73" fontSize="8" fill="white" fontFamily="monospace" fontWeight="bold" opacity="0.85">{'</>'}</text>
      <motion.path stroke="#f97316" strokeWidth="9" strokeLinecap="round" fill="none"
        animate={{ d: raised ? 'M 14 60 Q 4 52 2 40' : 'M 14 60 Q 5 68 4 80' }}
        transition={{ duration: 0.35, type: 'spring', stiffness: 220, damping: 18 }} />
      <motion.path stroke="#f97316" strokeWidth="9" strokeLinecap="round" fill="none"
        animate={{ d: raised ? 'M 46 60 Q 56 52 58 40' : 'M 46 60 Q 55 68 56 80' }}
        transition={{ duration: 0.35, type: 'spring', stiffness: 220, damping: 18 }} />
      <motion.circle r="4.5" fill="#fcd5b0"
        animate={{ cx: raised ? 2 : 4, cy: raised ? 39 : 81 }} transition={{ duration: 0.35 }} />
      <motion.circle r="4.5" fill="#fcd5b0"
        animate={{ cx: raised ? 58 : 56, cy: raised ? 39 : 81 }} transition={{ duration: 0.35 }} />
      <rect x="17" y="87" width="11" height="24" rx="5" fill="#334155" />
      <rect x="32" y="87" width="11" height="24" rx="5" fill="#334155" />
      <ellipse cx="22" cy="112" rx="9" ry="5.5" fill="#1e293b" />
      <ellipse cx="38" cy="112" rx="9" ry="5.5" fill="#1e293b" />
    </svg>
  );
}

// ── Slide Renderer ───────────────────────────────────────────────────────────

function SlideView({ scene }: { scene: Scene }) {
  if (scene.slideType === 'heading') {
    return (
      <div className="text-center py-6">
        <div className="text-[10px] font-bold uppercase tracking-widest text-[#f97316] mb-3">Chapter</div>
        <h2 className="text-xl font-bold text-[#e6edf3] leading-snug">{scene.content}</h2>
      </div>
    );
  }

  if (scene.slideType === 'code') {
    return (
      <div className="rounded-lg border border-[#30363d] overflow-hidden">
        <div className="flex items-center gap-2 px-3 py-2 bg-[#161b22] border-b border-[#30363d]">
          <div className="flex gap-1.5">
            <div className="w-2.5 h-2.5 rounded-full bg-[#ff5f57]" />
            <div className="w-2.5 h-2.5 rounded-full bg-[#febc2e]" />
            <div className="w-2.5 h-2.5 rounded-full bg-[#28c840]" />
          </div>
          <span className="text-[10px] text-[#8b949e] font-mono ml-2">terminal</span>
        </div>
        <pre className="p-4 text-[12px] font-mono text-[#e6edf3] overflow-auto max-h-48 leading-5">
          <code>{scene.content}</code>
        </pre>
      </div>
    );
  }

  if (scene.slideType === 'step') {
    return (
      <div className="flex gap-4 items-start">
        <div className="flex-shrink-0 w-10 h-10 rounded-full bg-[#f97316] flex items-center justify-center text-white font-bold text-base shadow-lg shadow-[#f97316]/30">
          {scene.stepNumber}
        </div>
        <div className="flex-1 min-w-0">
          {scene.stepTotal && (
            <div className="text-[10px] text-[#8b949e] mb-1.5 uppercase tracking-wider font-medium">
              Step {scene.stepNumber} of {scene.stepTotal}
            </div>
          )}
          <p className="text-[#e6edf3] text-sm leading-6">{stripMd(scene.content)}</p>
        </div>
      </div>
    );
  }

  if (scene.slideType === 'callout') {
    return (
      <div className="rounded-xl border border-[#f97316]/30 bg-[#f97316]/10 p-4">
        <div className="flex gap-3 items-start">
          <span className="text-[#f97316] text-base mt-0.5 flex-shrink-0">💡</span>
          <p className="text-[#e6edf3] text-sm leading-6">{stripMd(scene.content)}</p>
        </div>
      </div>
    );
  }

  // text
  return (
    <div className="space-y-3">
      {scene.content.split('\n\n').map((para, i) => (
        <p key={i} className="text-[#e6edf3] text-sm leading-6">{stripMd(para)}</p>
      ))}
    </div>
  );
}

// ── Main Component ────────────────────────────────────────────────────────────

export default function LessonVideoPlayer({ blocks }: { blocks: ContentBlock[] }) {
  const scenes = useMemo(() => blocksToScenes(blocks), [blocks]);
  const totalMs = useMemo(() => scenes.reduce((s, sc) => s + sc.durationMs, 0), [scenes]);

  const [sceneIdx, setSceneIdx] = useState(0);
  const [playing, setPlaying] = useState(false);
  const [speed, setSpeed] = useState(1);

  const idx = Math.min(sceneIdx, Math.max(0, scenes.length - 1));
  const scene = scenes[idx];
  const elapsedMs = scenes.slice(0, idx).reduce((s, sc) => s + sc.durationMs, 0);

  const chapterIndices = useMemo(
    () => scenes.map((s, i) => (s.isChapter ? i : -1)).filter(i => i >= 0),
    [scenes],
  );

  // Advance scene
  useEffect(() => {
    if (!playing || !scene) return;
    if (idx >= scenes.length - 1) {
      const t = setTimeout(() => setPlaying(false), 0);
      return () => clearTimeout(t);
    }
    const t = setTimeout(
      () => setSceneIdx(i => Math.min(i + 1, scenes.length - 1)),
      scene.durationMs / speed,
    );
    return () => clearTimeout(t);
  }, [playing, idx, speed, scene, scenes.length]);

  const togglePlay = useCallback(() => {
    if (!playing && idx >= scenes.length - 1) setSceneIdx(0);
    setPlaying(p => !p);
  }, [playing, idx, scenes.length]);

  const cycleSpeed = useCallback(() => {
    const opts = [0.75, 1, 1.25, 1.5];
    setSpeed(s => {
      const i = opts.indexOf(s);
      return opts[(i === -1 ? 0 : i + 1) % opts.length];
    });
  }, []);

  const handleSeek = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
    setSceneIdx(Number(e.target.value));
  }, []);

  if (!scenes.length || !scene) return null;

  const scrubPct = scenes.length > 1 ? (idx / (scenes.length - 1)) * 100 : 0;

  return (
    <div>
      {/* Label */}
      <div className="flex items-center gap-2 mb-3">
        <Play className="h-3.5 w-3.5 fill-primary text-primary" />
        <span className="text-xs font-semibold text-muted-foreground uppercase tracking-wider">
          Video Walkthrough
        </span>
      </div>

      {/* 16:9 player */}
      <div
        className="aspect-video w-full relative rounded-2xl overflow-hidden select-none"
        style={{ background: 'linear-gradient(160deg, #0d1117 0%, #090e1a 100%)' }}
      >
        {/* Scene counter badge */}
        <div className="absolute top-3 right-3 z-10 text-[10px] font-mono text-[#8b949e] bg-[#161b22]/80 border border-[#30363d] rounded-md px-2 py-1">
          {idx + 1} / {scenes.length}
        </div>

        {/* Main area (full height minus controls bar) */}
        <div className="absolute inset-0 bottom-12 flex">
          {/* Character panel — 35% */}
          <div className="w-[35%] flex flex-col items-center justify-center gap-5 px-5 border-r border-[#21262d]">
            {/* Speech bubble */}
            <AnimatePresence mode="wait">
              <motion.div
                key={idx}
                initial={{ opacity: 0, y: 10, scale: 0.9 }}
                animate={{ opacity: 1, y: 0, scale: 1 }}
                exit={{ opacity: 0, y: -8, scale: 0.9 }}
                transition={{ duration: 0.25 }}
                className="relative bg-white text-[#0f172a] rounded-2xl px-3 py-2.5 text-[11px] font-semibold leading-5 text-center shadow-xl w-full"
              >
                {getSpeech(scene)}
                <div className="absolute -bottom-[9px] left-1/2 -translate-x-1/2 w-0 h-0 border-l-[9px] border-r-[9px] border-t-[10px] border-l-transparent border-r-transparent border-t-white" />
              </motion.div>
            </AnimatePresence>

            {/* Character */}
            <DevChar expr={scene.expression} />

            {/* Progress dots */}
            <div className="flex gap-1.5">
              {scenes.map((_, i) => (
                <motion.div
                  key={i}
                  className="rounded-full cursor-pointer"
                  onClick={() => setSceneIdx(i)}
                  animate={{
                    width: i === idx ? 14 : 6,
                    height: 6,
                    backgroundColor: i < idx ? '#3fb950' : i === idx ? '#f97316' : '#30363d',
                  }}
                  transition={{ duration: 0.3 }}
                />
              ))}
            </div>
          </div>

          {/* Slide panel — 65% */}
          <div className="w-[65%] flex items-center justify-center p-8 overflow-hidden bg-[#010409]">
            <AnimatePresence mode="wait">
              <motion.div
                key={idx}
                initial={{ opacity: 0, x: 28 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -28 }}
                transition={{ duration: 0.28 }}
                className="w-full"
              >
                <SlideView scene={scene} />
              </motion.div>
            </AnimatePresence>
          </div>
        </div>

        {/* Controls bar */}
        <div className="absolute bottom-0 left-0 right-0 h-12 flex items-center gap-3 px-4 bg-[#161b22]/95 backdrop-blur-sm border-t border-[#30363d]">
          {/* Play / Pause */}
          <button
            onClick={togglePlay}
            className="text-[#e6edf3] hover:text-white transition-colors flex-shrink-0"
            aria-label={playing ? 'Pause' : 'Play'}
          >
            {playing
              ? <Pause className="h-4 w-4 fill-current" />
              : <Play className="h-4 w-4 fill-current" />
            }
          </button>

          {/* Scrubber + chapter dots */}
          <div className="relative flex-1 flex items-center h-4">
            <input
              type="range"
              min={0}
              max={scenes.length - 1}
              value={idx}
              onChange={handleSeek}
              className="w-full h-1 rounded-full appearance-none cursor-pointer [&::-webkit-slider-thumb]:appearance-none [&::-webkit-slider-thumb]:w-3 [&::-webkit-slider-thumb]:h-3 [&::-webkit-slider-thumb]:rounded-full [&::-webkit-slider-thumb]:bg-[#f97316] [&::-webkit-slider-thumb]:cursor-pointer [&::-moz-range-thumb]:w-3 [&::-moz-range-thumb]:h-3 [&::-moz-range-thumb]:rounded-full [&::-moz-range-thumb]:bg-[#f97316] [&::-moz-range-thumb]:border-0"
              style={{
                background: `linear-gradient(to right, #f97316 0%, #f97316 ${scrubPct}%, #30363d ${scrubPct}%, #30363d 100%)`,
              }}
            />
            {/* Chapter dots */}
            {scenes.length > 1 && chapterIndices.map(ci => (
              <div
                key={ci}
                className="absolute w-2 h-2 rounded-full bg-white/80 border border-[#0d1117] top-1/2 -translate-y-1/2 pointer-events-none"
                style={{ left: `${(ci / (scenes.length - 1)) * 100}%` }}
              />
            ))}
          </div>

          {/* Timestamp */}
          <span className="text-[10px] text-[#8b949e] font-mono whitespace-nowrap flex-shrink-0">
            {formatTime(elapsedMs)} / {formatTime(totalMs)}
          </span>

          {/* Speed */}
          <button
            onClick={cycleSpeed}
            className="text-[10px] text-[#8b949e] hover:text-[#e6edf3] border border-[#30363d] hover:border-[#6e7681] rounded px-1.5 py-0.5 min-w-[2.75rem] text-center transition-colors flex-shrink-0 font-mono"
          >
            {speed}×
          </button>
        </div>
      </div>
    </div>
  );
}

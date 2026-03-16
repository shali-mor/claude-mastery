'use client';

import { useState, useEffect, useRef, useCallback } from 'react';
import { motion, animate, useMotionValue } from 'framer-motion';
import { useContainerWidth } from '@/hooks/useContainerWidth';
import {
  getNodePosition,
  buildConnectorPath,
} from './journeyUtils';
import { JourneyNodeTooltip } from './JourneyNodeTooltip';
import type { ModuleNode } from './JourneyMap';

// ── Background vocabulary ──────────────────────────────────────────────────
const BG_TERMS = [
  { text: 'CLAUDE.md',        x: '6%',  y: '4%',  rot: -14, size: 11 },
  { text: '/hooks',           x: '62%', y: '3%',  rot:  10, size: 13 },
  { text: 'PreToolUse',       x: '18%', y: '11%', rot:  -8, size: 10 },
  { text: '$ARGUMENTS',       x: '74%', y: '13%', rot:  12, size: 11 },
  { text: '~/.claude/',       x: '4%',  y: '22%', rot: -18, size: 12 },
  { text: '/plan',            x: '85%', y: '20%', rot:   5, size: 14 },
  { text: 'allowed-tools:',   x: '22%', y: '31%', rot:  -6, size: 10 },
  { text: 'context: fork',    x: '67%', y: '33%', rot:  14, size: 11 },
  { text: 'PostToolUse',      x: '8%',  y: '42%', rot:  -3, size: 12 },
  { text: '/compact',         x: '80%', y: '44%', rot: -11, size: 13 },
  { text: 'claude --model',   x: '28%', y: '53%', rot:   8, size: 10 },
  { text: 'MCP server',       x: '58%', y: '57%', rot: -16, size: 12 },
  { text: 'npm run dev',      x: '12%', y: '63%', rot:  -7, size: 11 },
  { text: 'UserPromptSubmit', x: '72%', y: '66%', rot:   9, size: 10 },
  { text: '/commit',          x: '35%', y: '74%', rot: -12, size: 13 },
  { text: 'webhook trigger',  x: '64%', y: '78%', rot:  -4, size: 11 },
  { text: 'settings.json',    x: '5%',  y: '82%', rot:  15, size: 12 },
  { text: 'n8n workflow',     x: '80%', y: '86%', rot:  -9, size: 11 },
  { text: 'git diff --staged',x: '20%', y: '91%', rot:   6, size: 10 },
  { text: '/btw',             x: '55%', y: '95%', rot: -13, size: 14 },
];

// ── Phase groups (one per row in the 3-column layout) ────────────────────────
const PHASES = [
  { label: 'FOUNDATIONS',    desc: 'Core tools & workflow',        startIdx: 0,  endIdx: 2,  color: '#3b82f6' },
  { label: 'EFFICIENCY',     desc: 'Cost control & API mastery',   startIdx: 3,  endIdx: 5,  color: '#f97316' },
  { label: 'ORCHESTRATION',  desc: 'Agents, planning & MCP',       startIdx: 6,  endIdx: 8,  color: '#a855f7' },
  { label: 'PROJECTS',       desc: 'Real-world capstone builds',   startIdx: 9,  endIdx: 11, color: '#22c55e' },
];

// ── Walker constants ─────────────────────────────────────────────────────────
const WALK_SECS = 1.8; // seconds to traverse one module segment
const PAUSE_MS  = 700; // pause at each completed module
const C = '#fb923c';   // figure colour

// ── WalkerFigure ─────────────────────────────────────────────────────────────
// Uses a MotionValue (0→1) driven by framer-motion's animate().
// DOM transforms are updated via direct setAttribute — zero React re-renders per frame.
// When moduleNodes changes (lesson completed), stopIdx increases and the figure
// walks forward from its current position to the new target.
function WalkerFigure({ svgPath, moduleNodes }: { svgPath: string; moduleNodes: ModuleNode[] }) {
  const N = moduleNodes.length;
  // Advance when all LESSONS in a module are done (quiz not required)
  const firstUncompleted = moduleNodes.findIndex(n => n.completedCount < n.totalLessons);
  const stopIdx = firstUncompleted === -1 ? N - 1 : firstUncompleted;

  const pathRef   = useRef<SVGPathElement | null>(null);
  const figureRef = useRef<SVGGElement | null>(null);
  const glowRef   = useRef<SVGGElement | null>(null);
  const progress  = useMotionValue(0); // 0–1 along the path
  const [isWalking, setIsWalking] = useState(false);

  // Compute x/y/rotation from t and apply directly to DOM (no React re-render)
  const applyTransform = useCallback((t: number) => {
    const pEl = pathRef.current;
    const fEl = figureRef.current;
    const gEl = glowRef.current;
    if (!pEl || !fEl || !gEl) return;
    const total = pEl.getTotalLength();
    const len   = t * total;
    const pt    = pEl.getPointAtLength(len);
    const a     = pEl.getPointAtLength(Math.max(0, len - 1));
    const b     = pEl.getPointAtLength(Math.min(total, len + 1));
    const deg   = Math.atan2(b.y - a.y, b.x - a.x) * (180 / Math.PI);
    fEl.setAttribute('transform', `translate(${pt.x},${pt.y}) rotate(${deg})`);
    gEl.setAttribute('transform', `translate(${pt.x},${pt.y})`);
  }, []);

  // Wire MotionValue → DOM
  useEffect(() => progress.on('change', applyTransform), [progress, applyTransform]);

  // Sync position when the SVG path string changes (resize / first render)
  useEffect(() => { applyTransform(progress.get()); }, [svgPath, applyTransform, progress]);

  // Walk forward whenever stopIdx increases (module completed)
  useEffect(() => {
    const segSize = N > 1 ? 1 / (N - 1) : 1;
    const targetT = stopIdx * segSize;
    const currentT = progress.get();

    if (stopIdx === 0 || targetT <= currentT + 1e-6) {
      queueMicrotask(() => setIsWalking(false));
      return;
    }

    let cancelled = false;
    let stopAnim: (() => void) | null = null;

    // First module index strictly after current position
    const startIdx = Math.min(stopIdx, Math.ceil(currentT / segSize + 1e-6));

    async function walk() {
      for (let i = startIdx; i <= stopIdx; i++) {
        if (cancelled) return;

        const nextT = i * segSize;
        const dist  = nextT - progress.get();
        const dur   = Math.max(0.3, (dist / segSize) * WALK_SECS);

        setIsWalking(true);
        const ctrl = animate(progress, nextT, { duration: dur, ease: 'linear' });
        stopAnim = () => ctrl.stop();
        await ctrl;
        stopAnim = null;

        if (cancelled) return;

        if (i < stopIdx) {
          // Brief pause at completed module before continuing
          setIsWalking(false);
          await new Promise<void>(r => setTimeout(r, PAUSE_MS));
          if (cancelled) return;
        }
      }
      if (!cancelled) setIsWalking(false);
    }

    walk();
    return () => { cancelled = true; stopAnim?.(); };
  }, [stopIdx, N, progress]);

  return (
    <>
      {/* Hidden path — used only for getPointAtLength queries */}
      <path ref={pathRef} d={svgPath} fill="none" stroke="none" visibility="hidden" />

      {/* Glow aura (moves with figure via direct DOM) */}
      <g ref={glowRef}>
        <circle r="18" fill={C} fillOpacity="0.04" />
        <circle r="9"  fill={C} fillOpacity="0.07" />
      </g>

      {/* Figure (moves with figure via direct DOM) */}
      <g ref={figureRef}>

        {/* ── Walking pose ── */}
        <g opacity={isWalking ? 1 : 0}>
          <ellipse cx="0" cy="10.5" rx="6" ry="1.8" fill="black" fillOpacity="0.15" />
          <circle cy="-10" r="4" fill={C} fillOpacity="0.95" />
          <circle cx="1.5" cy="-11" r="0.7" fill="white" fillOpacity="0.9" />
          <path d="M -1.5 -9 Q 0 -7.5 1.5 -9" fill="none" stroke="white" strokeOpacity="0.8" strokeWidth="0.6" strokeLinecap="round" />
          <line x1="0" y1="-6.5" x2="0" y2="2" stroke={C} strokeWidth="1.8" strokeLinecap="round" strokeOpacity="0.9" />
          <rect x="1" y="-6" width="3.5" height="4.5" rx="1" fill={C} fillOpacity="0.35" stroke={C} strokeWidth="0.5" strokeOpacity="0.55" />
          {/* Arms */}
          <g>
            <animateTransform attributeName="transform" type="rotate"
              values="35 0 -4; -35 0 -4; 35 0 -4" dur="0.48s" repeatCount="indefinite" />
            <line x1="0" y1="-4" x2="-6" y2="-1" stroke={C} strokeWidth="1.3" strokeLinecap="round" strokeOpacity="0.85" />
          </g>
          <g>
            <animateTransform attributeName="transform" type="rotate"
              values="-35 0 -4; 35 0 -4; -35 0 -4" dur="0.48s" repeatCount="indefinite" />
            <line x1="0" y1="-4" x2="6" y2="-1" stroke={C} strokeWidth="1.3" strokeLinecap="round" strokeOpacity="0.85" />
          </g>
          {/* Legs */}
          <g>
            <animateTransform attributeName="transform" type="rotate"
              values="-38 0 2; 38 0 2; -38 0 2" dur="0.48s" repeatCount="indefinite" />
            <line x1="0" y1="2" x2="-4" y2="9.5" stroke={C} strokeWidth="1.3" strokeLinecap="round" strokeOpacity="0.9" />
          </g>
          <g>
            <animateTransform attributeName="transform" type="rotate"
              values="38 0 2; -38 0 2; 38 0 2" dur="0.48s" repeatCount="indefinite" />
            <line x1="0" y1="2" x2="4" y2="9.5" stroke={C} strokeWidth="1.3" strokeLinecap="round" strokeOpacity="0.9" />
          </g>
        </g>

        {/* ── Standing pose (stopped at uncompleted module) ── */}
        <g opacity={isWalking ? 0 : 1}>
          {/* "You are here" pulse */}
          <circle r="22" fill="none" stroke={C} strokeWidth="1" strokeOpacity="0.3">
            <animate attributeName="r"             values="22;36;22" dur="2s" repeatCount="indefinite" />
            <animate attributeName="strokeOpacity" values="0.3;0;0.3" dur="2s" repeatCount="indefinite" />
          </circle>
          <ellipse cx="0" cy="10.5" rx="6" ry="1.8" fill="#000" fillOpacity="0.18" />
          <circle cy="-10" r="4" fill={C} fillOpacity="0.95" />
          <circle cx="1.5" cy="-11" r="0.7" fill="#0d1117" />
          {/* Neutral/waiting expression */}
          <line x1="-1.5" y1="-8.5" x2="1.5" y2="-8.5" stroke="white" strokeOpacity="0.8" strokeWidth="0.7" strokeLinecap="round" />
          <line x1="0" y1="-6.5" x2="0" y2="2" stroke={C} strokeWidth="1.8" strokeLinecap="round" strokeOpacity="0.9" />
          <rect x="1" y="-6" width="3.5" height="4.5" rx="1" fill={C} fillOpacity="0.35" stroke={C} strokeWidth="0.5" strokeOpacity="0.55" />
          {/* Static arms */}
          <line x1="0" y1="-4" x2="-5" y2="1"  stroke={C} strokeWidth="1.3" strokeLinecap="round" strokeOpacity="0.85" />
          <line x1="0" y1="-4" x2=" 5" y2="1"  stroke={C} strokeWidth="1.3" strokeLinecap="round" strokeOpacity="0.85" />
          {/* Static legs */}
          <line x1="0" y1="2" x2="-3" y2="9.5" stroke={C} strokeWidth="1.3" strokeLinecap="round" strokeOpacity="0.9" />
          <line x1="0" y1="2" x2=" 3" y2="9.5" stroke={C} strokeWidth="1.3" strokeLinecap="round" strokeOpacity="0.9" />
        </g>

      </g>
    </>
  );
}

// ── Main canvas ──────────────────────────────────────────────────────────────
interface JourneyCanvasProps {
  moduleNodes: ModuleNode[];
}

export function JourneyCanvas({ moduleNodes }: JourneyCanvasProps) {
  const [containerRef, containerWidth] = useContainerWidth();

  const positions = moduleNodes.map((_, i) => getNodePosition(i, containerWidth));
  const svgPath   = buildConnectorPath(positions);

  const lastPos = positions[positions.length - 1];
  const canvasHeight = lastPos ? lastPos.y + 140 : 300;
  const isDesktop = containerWidth >= 640;

  return (
    <div
      ref={containerRef}
      className="relative w-full rounded-2xl overflow-hidden"
      style={{ height: canvasHeight }}
    >
      {/* ── Background ── */}
      <div className="absolute inset-0 bg-gradient-to-br from-slate-100 via-slate-50 to-blue-50 dark:from-[#0d1117] dark:via-[#0f1623] dark:to-[#0a1020]" />
      <div className="absolute inset-0 opacity-[0.05]"
        style={{
          backgroundImage: 'linear-gradient(rgba(99,102,241,1) 1px, transparent 1px), linear-gradient(90deg, rgba(99,102,241,1) 1px, transparent 1px)',
          backgroundSize: '40px 40px',
        }} />
      <div className="absolute inset-0 pointer-events-none select-none overflow-hidden">
        {BG_TERMS.map(({ text, x, y, rot, size }) => (
          <span key={text} className="absolute font-mono text-slate-900/[0.05] dark:text-emerald-400/[0.07]"
            style={{ left: x, top: y, fontSize: size, transform: `rotate(${rot}deg)`, whiteSpace: 'nowrap' }}>
            {text}
          </span>
        ))}
      </div>
      <div className="absolute top-0 left-1/4 w-72 h-72 rounded-full bg-orange-500/5 blur-3xl pointer-events-none" />
      <div className="absolute bottom-1/4 right-1/4 w-64 h-64 rounded-full bg-violet-500/5 blur-3xl pointer-events-none" />

      {/* ── SVG layer ── */}
      <svg className="absolute inset-0 w-full pointer-events-none"
        style={{ height: canvasHeight }} aria-hidden="true">

        {/* Phase zones */}
        {isDesktop && positions.length > 0 && PHASES.map((phase, pi) => {
          const fp = positions[phase.startIdx];
          const lp = positions[phase.endIdx];
          if (!fp || !lp) return null;
          const zoneTop = fp.y - 58;
          const zoneBot = lp.y + 58;
          const divY    = pi === 0
            ? fp.y - 48
            : (positions[PHASES[pi - 1].endIdx].y + fp.y) / 2;
          return (
            <g key={phase.label}>
              <rect x={6} y={zoneTop} width={containerWidth - 12} height={zoneBot - zoneTop}
                rx={10} fill={phase.color} fillOpacity="0.028" />
              <rect x={6} y={zoneTop} width={containerWidth - 12} height={zoneBot - zoneTop}
                rx={10} fill="none" stroke={phase.color} strokeWidth="0.5" strokeOpacity="0.1" />
              {pi > 0 && (
                <line x1={32} y1={divY} x2={containerWidth - 32} y2={divY}
                  stroke={phase.color} strokeWidth="0.6" strokeOpacity="0.18" strokeDasharray="4 7" />
              )}
            </g>
          );
        })}

        {/* Connector path */}
        {svgPath && (
          <>
            <path d={svgPath} fill="none" strokeWidth="1.5"
              className="stroke-slate-900/10 dark:stroke-white/[0.06]" />
            <motion.path d={svgPath} fill="none" stroke="#f97316" strokeWidth="1.5"
              strokeLinecap="round" strokeOpacity="0.35"
              initial={{ pathLength: 0 }} animate={{ pathLength: 1 }}
              transition={{ duration: 2.2, ease: 'easeInOut', delay: 0.3 }} />
          </>
        )}

        {/* Walking figure — advances as modules are completed */}
        {svgPath && containerWidth > 0 && (
          <WalkerFigure svgPath={svgPath} moduleNodes={moduleNodes} />
        )}

      </svg>

      {/* Module nodes */}
      {moduleNodes.map((node, i) => {
        const pos = positions[i];
        return (
          <div key={node.moduleId} className="absolute"
            style={{ left: pos.x - 55, top: pos.y - 38, width: 110 }}>
            <JourneyNodeTooltip
              moduleId={node.moduleId} firstLessonId={node.firstLessonId}
              title={node.title} description={node.description}
              icon={node.icon} color={node.color} status={node.status}
              progressPct={node.progressPct}
              basicProgressPct={node.basicProgressPct}
              advancedProgressPct={node.advancedProgressPct}
              completedCount={node.completedCount}
              totalLessons={node.totalLessons} hasQuizBadge={node.hasQuizBadge}
              hasAdvancedQuizBadge={node.hasAdvancedQuizBadge}
              index={i}
            />
          </div>
        );
      })}
    </div>
  );
}

'use client';

import { motion } from 'framer-motion';

type NodeType = 'trigger' | 'merge' | 'http' | 'code' | 'filter' | 'output' | 'error-output';

interface WorkflowNode {
  label: string;
  sublabel: string;
  type: NodeType;
}

const NODE_COLORS: Record<NodeType, { bg: string; border: string; text: string; badge: string; badgeText: string }> = {
  trigger:       { bg: 'bg-purple-500/10 dark:bg-purple-500/15', border: 'border-purple-400/50',                     text: 'text-purple-700 dark:text-purple-300',   badge: 'bg-purple-500',  badgeText: 'TRIGGER'  },
  merge:         { bg: 'bg-slate-100 dark:bg-slate-800/60',       border: 'border-slate-300 dark:border-slate-600',  text: 'text-slate-700 dark:text-slate-200',     badge: 'bg-slate-500',   badgeText: 'MERGE'    },
  http:          { bg: 'bg-orange-500/10 dark:bg-orange-500/15', border: 'border-orange-400/50',                     text: 'text-orange-700 dark:text-orange-300',   badge: 'bg-orange-500',  badgeText: 'HTTP'     },
  code:          { bg: 'bg-blue-500/10 dark:bg-blue-500/15',     border: 'border-blue-400/50',                       text: 'text-blue-700 dark:text-blue-300',       badge: 'bg-blue-500',    badgeText: 'CODE'     },
  filter:        { bg: 'bg-amber-500/10 dark:bg-amber-500/15',   border: 'border-amber-400/50',                      text: 'text-amber-700 dark:text-amber-300',     badge: 'bg-amber-500',   badgeText: 'FILTER'   },
  output:        { bg: 'bg-green-500/10 dark:bg-green-500/15',   border: 'border-green-400/50',                      text: 'text-green-700 dark:text-green-300',     badge: 'bg-green-500',   badgeText: 'TELEGRAM' },
  'error-output':{ bg: 'bg-red-500/10 dark:bg-red-500/15',       border: 'border-red-400/50',                        text: 'text-red-700 dark:text-red-300',         badge: 'bg-red-500',     badgeText: 'ERROR'    },
};

// Fixed node width — all nodes the same size
const NODE_CLS = 'w-[248px] flex items-center gap-3 px-4 py-3 rounded-xl border-2';

function FlowNode({ node, delay = 0 }: { node: WorkflowNode; delay?: number }) {
  const c = NODE_COLORS[node.type];
  return (
    <motion.div
      initial={{ opacity: 0, y: 6 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay, duration: 0.25 }}
      className={`${NODE_CLS} ${c.bg} ${c.border}`}
    >
      <span className={`shrink-0 text-[9px] font-bold tracking-widest px-1.5 py-0.5 rounded ${c.badge} text-white`}>
        {c.badgeText}
      </span>
      <div className="min-w-0">
        <p className={`text-sm font-semibold leading-tight ${c.text}`}>{node.label}</p>
        <p className="text-xs text-muted-foreground leading-tight mt-0.5">{node.sublabel}</p>
      </div>
    </motion.div>
  );
}

function VertArrow({ label, variant = 'normal', delay = 0 }: { label?: string; variant?: 'normal' | 'error'; delay?: number }) {
  const lineColor = variant === 'error' ? 'bg-red-400/60' : 'bg-border';
  const arrowColor = variant === 'error' ? 'text-red-400/80' : 'text-border';
  return (
    <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay }} className="flex flex-col items-center gap-0">
      <div className={`w-px h-4 ${lineColor}`} />
      {label && (
        <span className={`text-[10px] font-medium px-1.5 py-0.5 rounded my-0.5 ${
          variant === 'error' ? 'text-red-500 bg-red-500/10' : 'text-muted-foreground bg-muted'
        }`}>{label}</span>
      )}
      <svg width="10" height="6" viewBox="0 0 10 6" className={arrowColor}>
        <path d="M0 0 L5 6 L10 0" fill="currentColor" />
      </svg>
    </motion.div>
  );
}

export default function StockBotWorkflow() {
  return (
    <div className="rounded-2xl border border-border bg-card p-6 overflow-x-auto">
      {/* Header */}
      <div className="flex items-center gap-2 mb-5 min-w-max">
        <div className="w-2 h-2 rounded-full bg-green-500 animate-pulse" />
        <span className="text-sm font-semibold">n8n Workflow — Daily Stock Picks Bot</span>
        <span className="ml-auto pl-8 text-xs text-muted-foreground">13 nodes</span>
      </div>

      {/* Diagram: centred column with error branch side-by-side at Claude API level */}
      <div className="flex justify-center min-w-max">
        <div className="flex flex-col items-center gap-0">

          {/* ── Dual triggers ───────────────────────────────────────────── */}
          <div className="flex gap-4 items-end">
            <FlowNode delay={0.00} node={{ label: 'Schedule Trigger', sublabel: 'Mon–Fri at 8:00 AM',  type: 'trigger' }} />
            <FlowNode delay={0.02} node={{ label: 'Telegram Trigger', sublabel: 'On /picks command',   type: 'trigger' }} />
          </div>

          {/* Two lines converging to merge — visual Y-join */}
          <motion.div
            initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.04 }}
            className="flex gap-4 items-start"
          >
            <div className="w-[124px] flex flex-col items-end">
              <div className="w-px h-4 bg-border self-center" />
              <div className="w-[70px] h-px bg-border self-end mr-[27px]" />
            </div>
            <div className="w-px h-8 bg-border" />
            <div className="w-[124px] flex flex-col items-start">
              <div className="w-px h-4 bg-border self-center" />
              <div className="w-[70px] h-px bg-border self-start ml-[27px]" />
            </div>
          </motion.div>

          {/* ── Merge ───────────────────────────────────────────────────── */}
          <FlowNode delay={0.06} node={{ label: 'Merge', sublabel: 'Wait for either trigger', type: 'merge' }} />
          <VertArrow delay={0.08} />

          {/* ── Set Watchlist ────────────────────────────────────────────── */}
          <FlowNode delay={0.10} node={{ label: 'Set Watchlist', sublabel: 'Hardcode 20 tickers', type: 'code' }} />
          <VertArrow delay={0.12} label="20 tickers" />

          {/* ── Yahoo Finance ─────────────────────────────────────────────── */}
          <FlowNode delay={0.14} node={{ label: 'HTTP Request', sublabel: 'Yahoo Finance — for each ticker', type: 'http' }} />
          <VertArrow delay={0.16} label="raw OHLCV data" />

          {/* ── Compute Signals ───────────────────────────────────────────── */}
          <FlowNode delay={0.18} node={{ label: 'Code: Compute Signals', sublabel: 'RSI · MACD · SMA · Volume ratio', type: 'code' }} />
          <VertArrow delay={0.20} label="20 signals" />

          {/* ── Filter ────────────────────────────────────────────────────── */}
          <FlowNode delay={0.22} node={{ label: 'Filter', sublabel: 'Drop RSI >70 or 30d gain >20%', type: 'filter' }} />
          <VertArrow delay={0.24} label="8–15 candidates" />

          {/* ── Build Prompt ──────────────────────────────────────────────── */}
          <FlowNode delay={0.26} node={{ label: 'Code: Build Prompt', sublabel: 'Format data table + strategy criteria', type: 'code' }} />
          <VertArrow delay={0.28} label="prompt string" />

          {/* ── SPLIT: Claude API (main) + Error branch (right) ─────────── */}
          <div className="flex items-start gap-0">

            {/* Main flow column */}
            <div className="flex flex-col items-center">
              <FlowNode delay={0.30} node={{ label: 'HTTP Request: Claude API', sublabel: 'POST /v1/messages · Haiku', type: 'http' }} />
              <VertArrow delay={0.36} label="raw JSON response" />
              <FlowNode delay={0.38} node={{ label: 'Code: Parse Response', sublabel: 'Strip fences · JSON.parse', type: 'code' }} />
              <VertArrow delay={0.40} label="picks array" />
              <FlowNode delay={0.42} node={{ label: 'Code: Format Message', sublabel: 'Build Telegram HTML with medals', type: 'code' }} />
              <VertArrow delay={0.44} label="HTML string" />
              <FlowNode delay={0.46} node={{ label: 'Telegram: Send Picks', sublabel: 'To your chat or group', type: 'output' }} />
            </div>

            {/* Error branch — right of Claude API node */}
            <motion.div
              initial={{ opacity: 0, x: 8 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.32 }}
              className="flex items-start mt-[18px] ml-0"
            >
              {/* Horizontal connector */}
              <div className="flex flex-col items-center">
                <div className="flex items-center gap-0 mt-[2px]">
                  <div className="w-5 h-px bg-red-400/60" />
                  <svg width="6" height="10" viewBox="0 0 6 10" className="text-red-400/80 shrink-0">
                    <path d="M0 0 L6 5 L0 10" fill="currentColor" />
                  </svg>
                </div>
              </div>

              {/* Error nodes column */}
              <div className="flex flex-col items-center ml-1">
                <span className="text-[9px] font-semibold text-red-500 bg-red-500/10 px-1.5 py-0.5 rounded mb-1">
                  on error
                </span>
                <FlowNode delay={0.34} node={{ label: 'Code: Error Message', sublabel: '"Bot failed" alert text', type: 'code' }} />
                <VertArrow delay={0.34} variant="error" />
                <FlowNode delay={0.34} node={{ label: 'Telegram: Send Error', sublabel: 'Alert you instantly', type: 'error-output' }} />
              </div>
            </motion.div>
          </div>

        </div>
      </div>

      {/* Legend */}
      <div className="flex flex-wrap gap-3 mt-6 pt-4 border-t border-border min-w-max">
        {(Object.entries(NODE_COLORS) as [NodeType, (typeof NODE_COLORS)[NodeType]][])
          .map(([type, c]) => (
            <div key={type} className="flex items-center gap-1.5">
              <span className={`text-[9px] font-bold tracking-wider px-1.5 py-0.5 rounded ${c.badge} text-white`}>
                {c.badgeText}
              </span>
              <span className="text-xs text-muted-foreground capitalize">{type.replace('-output', '')} node</span>
            </div>
          ))}
      </div>
    </div>
  );
}

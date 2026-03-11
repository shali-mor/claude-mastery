'use client';

import { motion } from 'framer-motion';

type NodeType = 'trigger' | 'merge' | 'http' | 'code' | 'filter' | 'output' | 'error-output';

interface WorkflowNode {
  id: string;
  label: string;
  sublabel: string;
  type: NodeType;
}

interface WorkflowEdge {
  from: string;
  to: string;
  label?: string;
  variant?: 'normal' | 'error';
}

const NODE_COLORS: Record<NodeType, { bg: string; border: string; text: string; badge: string; badgeText: string }> = {
  trigger:      { bg: 'bg-purple-500/10 dark:bg-purple-500/15', border: 'border-purple-400/50', text: 'text-purple-700 dark:text-purple-300', badge: 'bg-purple-500', badgeText: 'TRIGGER' },
  merge:        { bg: 'bg-slate-100 dark:bg-slate-800/60',       border: 'border-slate-300 dark:border-slate-600',   text: 'text-slate-700 dark:text-slate-200', badge: 'bg-slate-500', badgeText: 'MERGE' },
  http:         { bg: 'bg-orange-500/10 dark:bg-orange-500/15', border: 'border-orange-400/50', text: 'text-orange-700 dark:text-orange-300', badge: 'bg-orange-500', badgeText: 'HTTP' },
  code:         { bg: 'bg-blue-500/10 dark:bg-blue-500/15',     border: 'border-blue-400/50',   text: 'text-blue-700 dark:text-blue-300',   badge: 'bg-blue-500',   badgeText: 'CODE' },
  filter:       { bg: 'bg-amber-500/10 dark:bg-amber-500/15',   border: 'border-amber-400/50',  text: 'text-amber-700 dark:text-amber-300', badge: 'bg-amber-500',  badgeText: 'FILTER' },
  output:       { bg: 'bg-green-500/10 dark:bg-green-500/15',   border: 'border-green-400/50',  text: 'text-green-700 dark:text-green-300', badge: 'bg-green-500',  badgeText: 'TELEGRAM' },
  'error-output': { bg: 'bg-red-500/10 dark:bg-red-500/15',     border: 'border-red-400/50',    text: 'text-red-700 dark:text-red-300',     badge: 'bg-red-500',    badgeText: 'ERROR' },
};

interface FlowNodeProps {
  node: WorkflowNode;
  index: number;
}

function FlowNode({ node, index }: FlowNodeProps) {
  const colors = NODE_COLORS[node.type];
  return (
    <motion.div
      initial={{ opacity: 0, y: 8 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: index * 0.05, duration: 0.3 }}
      className={`relative flex items-center gap-3 px-4 py-3 rounded-xl border-2 ${colors.bg} ${colors.border} min-w-[220px]`}
    >
      <span className={`shrink-0 text-[9px] font-bold tracking-widest px-1.5 py-0.5 rounded ${colors.badge} text-white`}>
        {colors.badgeText}
      </span>
      <div className="min-w-0">
        <p className={`text-sm font-semibold leading-tight ${colors.text}`}>{node.label}</p>
        <p className="text-xs text-muted-foreground leading-tight mt-0.5">{node.sublabel}</p>
      </div>
    </motion.div>
  );
}

function Arrow({ label, variant = 'normal', delay = 0 }: { label?: string; variant?: 'normal' | 'error'; delay?: number }) {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ delay, duration: 0.2 }}
      className="flex flex-col items-center"
    >
      <div className={`w-px h-5 ${variant === 'error' ? 'bg-red-400/60' : 'bg-border'}`} />
      {label && (
        <span className={`text-[10px] font-medium px-1.5 py-0.5 rounded ${
          variant === 'error'
            ? 'text-red-500 bg-red-500/10'
            : 'text-muted-foreground bg-muted'
        }`}>{label}</span>
      )}
      <svg width="10" height="6" viewBox="0 0 10 6" className={variant === 'error' ? 'text-red-400' : 'text-border'}>
        <path d="M0 0 L5 6 L10 0" fill="currentColor" stroke="none" />
      </svg>
    </motion.div>
  );
}

export default function StockBotWorkflow() {
  return (
    <div className="rounded-2xl border border-border bg-card p-6 overflow-x-auto">
      <div className="flex items-center gap-2 mb-5">
        <div className="w-2 h-2 rounded-full bg-green-500 animate-pulse" />
        <span className="text-sm font-semibold">n8n Workflow — Daily Stock Picks Bot</span>
        <span className="ml-auto text-xs text-muted-foreground">13 nodes</span>
      </div>

      {/* Main column + error branch layout */}
      <div className="flex gap-8 justify-center">

        {/* ── Main flow column ── */}
        <div className="flex flex-col items-center gap-0 min-w-[260px]">

          {/* Dual triggers */}
          <div className="flex gap-3 items-end">
            <div className="flex flex-col items-center gap-0">
              <FlowNode
                index={0}
                node={{ id: 'schedule', label: 'Schedule Trigger', sublabel: 'Mon–Fri at 8:00 AM', type: 'trigger' }}
              />
              <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.05 }}
                className="w-px h-6 bg-border" />
            </div>
            <div className="flex flex-col items-center gap-0">
              <FlowNode
                index={0}
                node={{ id: 'telegram-trigger', label: 'Telegram Trigger', sublabel: 'On /picks command', type: 'trigger' }}
              />
              <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.05 }}
                className="w-px h-6 bg-border" />
            </div>
          </div>

          {/* Merge */}
          <FlowNode
            index={1}
            node={{ id: 'merge', label: 'Merge', sublabel: 'Wait for either trigger', type: 'merge' }}
          />
          <Arrow delay={0.1} />

          {/* Set Watchlist */}
          <FlowNode
            index={2}
            node={{ id: 'watchlist', label: 'Set Watchlist', sublabel: 'Hardcode 20 tickers', type: 'code' }}
          />
          <Arrow delay={0.15} label="20 tickers" />

          {/* Yahoo Finance */}
          <FlowNode
            index={3}
            node={{ id: 'yahoo', label: 'HTTP Request', sublabel: 'Yahoo Finance — for each ticker', type: 'http' }}
          />
          <Arrow delay={0.2} label="raw OHLCV data" />

          {/* Compute Signals */}
          <FlowNode
            index={4}
            node={{ id: 'signals', label: 'Code: Compute Signals', sublabel: 'RSI · MACD · SMA · Volume ratio', type: 'code' }}
          />
          <Arrow delay={0.25} label="20 signals" />

          {/* Filter */}
          <FlowNode
            index={5}
            node={{ id: 'filter', label: 'Filter', sublabel: 'Drop RSI >70 or 30d gain >20%', type: 'filter' }}
          />
          <Arrow delay={0.3} label="8–15 candidates" />

          {/* Build Prompt */}
          <FlowNode
            index={6}
            node={{ id: 'prompt', label: 'Code: Build Prompt', sublabel: 'Format data table + strategy criteria', type: 'code' }}
          />
          <Arrow delay={0.35} label="prompt string" />

          {/* Claude API — split arrow indicator */}
          <div className="relative w-full flex flex-col items-center">
            <FlowNode
              index={7}
              node={{ id: 'claude', label: 'HTTP Request: Claude API', sublabel: 'POST /v1/messages · Haiku', type: 'http' }}
            />
            {/* Error branch callout */}
            <motion.div
              initial={{ opacity: 0, x: 10 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.4 }}
              className="absolute -right-[152px] top-4 flex items-center gap-1"
            >
              <div className="w-16 h-px bg-red-400/60" />
              <svg width="6" height="10" viewBox="0 0 6 10" className="text-red-400 shrink-0">
                <path d="M0 0 L6 5 L0 10" fill="currentColor" />
              </svg>
              <div className="flex flex-col items-center gap-0.5">
                <span className="text-[9px] font-medium text-red-500 bg-red-500/10 px-1.5 py-0.5 rounded">on error</span>
                <FlowNode
                  index={8}
                  node={{ id: 'error-msg', label: 'Code: Error Message', sublabel: '"Bot failed" alert text', type: 'code' }}
                />
                <div className="w-px h-4 bg-red-400/60" />
                <FlowNode
                  index={9}
                  node={{ id: 'telegram-error', label: 'Telegram: Send Error', sublabel: 'Alert you instantly', type: 'error-output' }}
                />
              </div>
            </motion.div>
          </div>
          <Arrow delay={0.4} label="raw JSON response" />

          {/* Parse Response */}
          <FlowNode
            index={8}
            node={{ id: 'parse', label: 'Code: Parse Response', sublabel: 'Strip markdown fences · JSON.parse', type: 'code' }}
          />
          <Arrow delay={0.45} label="picks array" />

          {/* Format Telegram */}
          <FlowNode
            index={9}
            node={{ id: 'format', label: 'Code: Format Message', sublabel: 'Build Telegram HTML with medals', type: 'code' }}
          />
          <Arrow delay={0.5} label="HTML string" />

          {/* Telegram Send */}
          <FlowNode
            index={10}
            node={{ id: 'telegram-send', label: 'Telegram: Send Picks', sublabel: 'To your chat or group', type: 'output' }}
          />
        </div>
      </div>

      {/* Legend */}
      <div className="flex flex-wrap gap-3 mt-6 pt-4 border-t border-border">
        {(Object.entries(NODE_COLORS) as [NodeType, typeof NODE_COLORS[NodeType]][])
          .filter(([t]) => t !== 'error-output')
          .map(([type, colors]) => (
          <div key={type} className="flex items-center gap-1.5">
            <span className={`text-[9px] font-bold tracking-wider px-1.5 py-0.5 rounded ${colors.badge} text-white`}>
              {colors.badgeText}
            </span>
            <span className="text-xs text-muted-foreground capitalize">{type} node</span>
          </div>
        ))}
      </div>
    </div>
  );
}

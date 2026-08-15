'use client';

import { useMemo, useState } from 'react';
import {
  LineChart, Line, XAxis, YAxis, Tooltip, ResponsiveContainer, CartesianGrid, Legend,
} from 'recharts';
import { Slider } from '@/components/ui/slider';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { claudeModels } from '@/data/models';
import { formatTokens } from '@/lib/utils';

/**
 * Illustrates why long sessions get expensive: context is cumulative, so the
 * input bill grows with every turn even when each new message is small.
 *
 * Deliberately a simplified model — see the caveat rendered below the chart.
 */

/** System prompt + tool definitions + CLAUDE.md, sent on every request. */
const SESSION_OVERHEAD_TOKENS = 15_000;
/** Assumed tokens Claude writes back per turn. */
const OUTPUT_PER_TURN = 700;
/** Turns between /clear in the "focused sessions" strategy. */
const CLEAR_EVERY = 10;

const CACHE_WRITE_MULTIPLIER = 1.25;
const CACHE_READ_MULTIPLIER = 0.1;

interface Point {
  turn: number;
  noCache: number;
  cached: number;
  focused: number;
}

function usd(n: number) {
  if (n >= 10) return `$${n.toFixed(2)}`;
  if (n >= 1) return `$${n.toFixed(3)}`;
  return `$${n.toFixed(4)}`;
}

export function SessionCostSimulator() {
  const [turns, setTurns] = useState(60);
  const [tokensPerTurn, setTokensPerTurn] = useState(2500);
  const [modelId, setModelId] = useState('claude-sonnet-5');

  const model = claudeModels.find(m => m.id === modelId)!;

  const { series, final } = useMemo(() => {
    const inRate = model.pricing.inputPerMillion / 1_000_000;
    const outRate = model.pricing.outputPerMillion / 1_000_000;

    let noCache = 0;
    let cached = 0;
    let focused = 0;
    let focusedCarried = 0; // conversation tokens since the last /clear

    const points: Point[] = [];

    for (let turn = 1; turn <= turns; turn++) {
      const carried = (turn - 1) * tokensPerTurn;
      const outputCost = OUTPUT_PER_TURN * outRate;

      // 1. Everything at full input price (no prompt caching at all).
      noCache += (SESSION_OVERHEAD_TOKENS + carried + tokensPerTurn) * inRate + outputCost;

      // 2. Prompt caching on, one long session: the stable prefix is a cache
      //    read, only this turn's new tokens are written.
      cached +=
        (SESSION_OVERHEAD_TOKENS + carried) * inRate * CACHE_READ_MULTIPLIER +
        tokensPerTurn * inRate * CACHE_WRITE_MULTIPLIER +
        outputCost;

      // 3. Prompt caching on, /clear every CLEAR_EVERY turns.
      if (turn > 1 && (turn - 1) % CLEAR_EVERY === 0) focusedCarried = 0;
      focused +=
        (SESSION_OVERHEAD_TOKENS + focusedCarried) * inRate * CACHE_READ_MULTIPLIER +
        tokensPerTurn * inRate * CACHE_WRITE_MULTIPLIER +
        outputCost;
      focusedCarried += tokensPerTurn;

      points.push({
        turn,
        noCache: Number(noCache.toFixed(4)),
        cached: Number(cached.toFixed(4)),
        focused: Number(focused.toFixed(4)),
      });
    }

    return { series: points, final: { noCache, cached, focused } };
  }, [turns, tokensPerTurn, model]);

  const contextAtEnd = SESSION_OVERHEAD_TOKENS + turns * tokensPerTurn;
  const overWindow = contextAtEnd > model.contextWindow;
  const saved = final.cached - final.focused;
  const savedPct = final.cached > 0 ? (saved / final.cached) * 100 : 0;

  return (
    <Card className="mb-10 overflow-hidden">
      <CardContent className="pt-6 space-y-6">
        <div>
          <p className="text-sm font-medium mb-1">See the compounding for yourself</p>
          <p className="text-xs text-muted-foreground leading-relaxed">
            Same amount of work, three ways of running it. Drag the sliders — the gap between the
            lines is the money that context discipline saves you.
          </p>
        </div>

        {/* ── Controls ── */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-x-8 gap-y-5">
          <div>
            <div className="flex justify-between text-xs mb-2.5">
              <span className="text-muted-foreground">Turns in the session</span>
              <span className="font-mono font-medium">{turns}</span>
            </div>
            <Slider
              value={[turns]}
              onValueChange={([v]) => setTurns(v)}
              min={10}
              max={200}
              step={5}
              aria-label="Turns in the session"
            />
          </div>

          <div>
            <div className="flex justify-between text-xs mb-2.5">
              <span className="text-muted-foreground">Context added per turn</span>
              <span className="font-mono font-medium">{formatTokens(tokensPerTurn)}</span>
            </div>
            <Slider
              value={[tokensPerTurn]}
              onValueChange={([v]) => setTokensPerTurn(v)}
              min={500}
              max={8000}
              step={250}
              aria-label="Context added per turn"
            />
          </div>
        </div>

        <div className="flex flex-wrap gap-1.5">
          {claudeModels.map(m => (
            <button
              key={m.id}
              onClick={() => setModelId(m.id)}
              aria-pressed={modelId === m.id}
              className={`text-[11px] px-2.5 py-1 rounded-md border transition-colors ${
                modelId === m.id
                  ? 'border-primary bg-primary/10 text-primary font-medium'
                  : 'border-border text-muted-foreground hover:bg-muted/50'
              }`}
            >
              {m.displayName.replace('Claude ', '')}
            </button>
          ))}
        </div>

        {/* ── Chart ── */}
        <div className="-ml-2">
          <ResponsiveContainer width="100%" height={240}>
            <LineChart data={series} margin={{ top: 8, right: 8, bottom: 4, left: 4 }}>
              <CartesianGrid strokeDasharray="3 3" className="stroke-border" vertical={false} />
              <XAxis
                dataKey="turn"
                tick={{ fontSize: 10, fill: 'currentColor' }}
                className="text-muted-foreground"
                label={{ value: 'turn', position: 'insideBottomRight', offset: -2, fontSize: 10 }}
              />
              <YAxis
                tick={{ fontSize: 10, fill: 'currentColor' }}
                className="text-muted-foreground"
                tickFormatter={v => `$${Number(v).toFixed(v >= 1 ? 1 : 2)}`}
                width={48}
              />
              <Tooltip
                formatter={(val, name) => [usd(Number(val ?? 0)), name as string]}
                labelFormatter={l => `After turn ${l}`}
                contentStyle={{
                  background: 'var(--card)',
                  border: '1px solid var(--border)',
                  borderRadius: 8,
                  fontSize: 12,
                }}
              />
              <Legend wrapperStyle={{ fontSize: 11, paddingTop: 8 }} iconType="plainline" />
              <Line
                type="monotone" dataKey="noCache" name="No caching"
                stroke="#ef4444" strokeWidth={2} dot={false} strokeDasharray="4 3"
              />
              <Line
                type="monotone" dataKey="cached" name="One long session"
                stroke="#f97316" strokeWidth={2} dot={false}
              />
              <Line
                type="monotone" dataKey="focused" name={`/clear every ${CLEAR_EVERY} turns`}
                stroke="#10b981" strokeWidth={2} dot={false}
              />
            </LineChart>
          </ResponsiveContainer>
        </div>

        {/* ── Totals ── */}
        <div className="grid grid-cols-3 gap-3">
          {[
            { label: 'No caching', value: final.noCache, cls: 'text-red-500' },
            { label: 'One long session', value: final.cached, cls: 'text-orange-500' },
            { label: 'Focused sessions', value: final.focused, cls: 'text-green-600' },
          ].map(t => (
            <div key={t.label} className="rounded-lg border border-border px-3 py-2.5">
              <p className="text-[10px] uppercase tracking-wide text-muted-foreground mb-1">{t.label}</p>
              <p className={`font-mono text-sm font-semibold ${t.cls}`}>{usd(t.value)}</p>
            </div>
          ))}
        </div>

        <div className="flex flex-wrap items-center gap-2 text-xs text-muted-foreground">
          <Badge variant="secondary" className="text-[10px] text-green-600 bg-green-500/10">
            {savedPct.toFixed(0)}% cheaper
          </Badge>
          <span>
            Clearing every {CLEAR_EVERY} turns saves {usd(saved)} over the same {turns} turns of work.
          </span>
        </div>

        <div className="text-xs text-muted-foreground leading-relaxed border-t border-border pt-4 space-y-1.5">
          <p>
            Context at the final turn is roughly {formatTokens(contextAtEnd)} tokens against a{' '}
            {formatTokens(model.contextWindow)} window
            {overWindow && (
              <span className="text-amber-500">
                {' '}— past the limit, so a real session would have auto-compacted before this point
                (an extra summarization pass you also pay for)
              </span>
            )}
            .
          </p>
          <p>
            Estimate only. Assumes {formatTokens(SESSION_OVERHEAD_TOKENS)} tokens of fixed overhead
            (system prompt, tool definitions, CLAUDE.md), {OUTPUT_PER_TURN} output tokens per turn,
            and a perfectly stable cache prefix. Real sessions vary — the shape of the curves is the
            point, not the exact figures.
          </p>
        </div>
      </CardContent>
    </Card>
  );
}

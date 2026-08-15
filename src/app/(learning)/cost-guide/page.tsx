'use client';

import Link from 'next/link';
import { motion } from 'framer-motion';
import {
  Wallet, TrendingUp, TrendingDown, PieChart, Terminal, BarChart3, Layers,
  CheckCircle2, Calculator, AlertTriangle, Zap, Timer, Scissors, MessageSquare,
  Users, Rewind, LineChart, ShieldAlert, Target, Repeat, Building2, Radio,
  Wrench, Split, Gauge, Bot, Search, Filter, FolderTree, Crosshair, Eraser,
  Minimize2, FileText, Package, ExternalLink, Flame, SlidersHorizontal,
} from 'lucide-react';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { SessionCostSimulator } from '@/components/calculator/SessionCostSimulator';
import { claudeModels } from '@/data/models';
import {
  quickWins, routingTactics, mcpTactics, contextTactics, outputTactics,
  ossTools, gatewayNote, tokenKinds, visibilityTools, antiPatterns,
  habitGroups, teamPractices, type Tactic,
} from '@/data/costGuide';

const icons = {
  Wallet, TrendingUp, TrendingDown, PieChart, Terminal, BarChart3, Layers,
  CheckCircle2, Calculator, AlertTriangle, Zap, Timer, Scissors, MessageSquare,
  Users, Rewind, LineChart, ShieldAlert, Target, Repeat, Building2, Radio,
  Wrench, Split, Gauge, Bot, Search, Filter, FolderTree, Crosshair, Eraser,
  Minimize2, FileText, Package, ExternalLink, Flame, SlidersHorizontal,
} as const;

function Icon({ name, className }: { name: string; className?: string }) {
  const Cmp = icons[name as keyof typeof icons] ?? Wallet;
  return <Cmp className={className} />;
}

const cardEase = [0.16, 1, 0.3, 1] as const;

const sections = [
  { id: 'quick-wins', label: 'Quick wins' },
  { id: 'routing', label: 'Automatic routing' },
  { id: 'mcp', label: 'MCP & tools' },
  { id: 'context', label: 'Context' },
  { id: 'output', label: 'Output' },
  { id: 'oss', label: 'Open-source tools' },
  { id: 'avoid', label: 'What to avoid' },
  { id: 'habits', label: 'Habits' },
  { id: 'reference', label: 'Reference' },
];

function Reveal({ children, delay = 0 }: { children: React.ReactNode; delay?: number }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-40px' }}
      transition={{ delay, ease: cardEase }}
    >
      {children}
    </motion.div>
  );
}

function SectionHeading({ id, title, sub }: { id: string; title: string; sub: string }) {
  return (
    <div className="scroll-mt-6 mb-4" id={id}>
      <h2 className="text-base font-semibold mb-1">{title}</h2>
      <p className="text-xs text-muted-foreground leading-relaxed">{sub}</p>
    </div>
  );
}

/** A single actionable tactic: what to do, why it costs, how to fix it. */
function TacticCard({ t, delay }: { t: Tactic; delay: number }) {
  return (
    <Reveal delay={delay}>
      <Card className={`h-full transition-colors ${t.flag ? 'border-primary/30 bg-primary/[0.03]' : 'hover:border-primary/30'}`}>
        <CardContent className="pt-4 pb-4 space-y-3">
          <div className="flex items-start gap-2.5">
            <div className="w-8 h-8 rounded-lg bg-primary/10 flex items-center justify-center flex-shrink-0">
              <Icon name={t.icon} className="h-4 w-4 text-primary" />
            </div>
            <div className="flex-1 min-w-0">
              <p className="text-sm font-medium leading-snug">{t.action}</p>
              <div className="flex items-center gap-1.5 mt-1 text-[11px] text-green-600">
                <TrendingDown className="h-3 w-3 flex-shrink-0" />
                <span>{t.saving}</span>
              </div>
            </div>
          </div>

          {t.cmd && (
            <code className="block text-[11px] font-mono bg-muted px-2.5 py-1.5 rounded text-muted-foreground overflow-x-auto whitespace-pre">
              {t.cmd}
            </code>
          )}

          <div className="space-y-2">
            <p className="text-xs text-muted-foreground leading-relaxed">
              <span className="font-medium text-red-500/90">Why it costs: </span>
              {t.problem}
            </p>
            <p className="text-xs text-muted-foreground leading-relaxed">
              <span className="font-medium text-foreground/80">Do this: </span>
              {t.fix}
            </p>
          </div>

          {t.example && (
            <div className="rounded-md border border-border overflow-hidden text-[11px] font-mono">
              <div className="px-2.5 py-1.5 border-b border-border bg-red-500/5 text-muted-foreground whitespace-pre-wrap break-words">
                <span className="text-red-500 select-none">− </span>{t.example.before}
              </div>
              <div className="px-2.5 py-1.5 bg-green-500/5 text-muted-foreground whitespace-pre-wrap break-words">
                <span className="text-green-600 select-none">+ </span>{t.example.after}
              </div>
            </div>
          )}
        </CardContent>
      </Card>
    </Reveal>
  );
}

export default function CostGuidePage() {
  return (
    <div className="max-w-3xl mx-auto px-6 py-10">
      <motion.div initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.4 }}>

        {/* ── Hero ── */}
        <div className="flex items-center gap-4 mb-6">
          <div className="w-14 h-14 rounded-2xl bg-primary flex items-center justify-center flex-shrink-0">
            <Wallet className="h-7 w-7 text-primary-foreground" />
          </div>
          <div>
            <h1 className="text-2xl font-bold">Cutting Your Claude Code Costs</h1>
            <p className="text-muted-foreground text-sm">
              Specific changes that reduce spend, ordered by how much they save.
            </p>
          </div>
        </div>

        <nav aria-label="Guide sections" className="flex flex-wrap gap-1.5 mb-8">
          {sections.map(s => (
            <a
              key={s.id}
              href={`#${s.id}`}
              className="text-[11px] px-2.5 py-1 rounded-md border border-border text-muted-foreground hover:border-primary/40 hover:text-foreground transition-colors"
            >
              {s.label}
            </a>
          ))}
        </nav>

        {/* ── The one idea ── */}
        <Card className="mb-10 border-primary/20 bg-primary/4">
          <CardContent className="pt-6 pb-5">
            <div className="flex items-start gap-2.5">
              <TrendingUp className="h-4 w-4 text-primary mt-0.5 flex-shrink-0" />
              <div className="text-sm leading-7">
                <strong>Almost everything expensive is something standing in your context.</strong>{' '}
                Claude Code re-sends your whole context on every turn, so an idle MCP server, a
                pasted file, or an hour-old finished task is not a one-time cost — it is a tax on
                every message for the rest of the session. The tactics below all do one of two
                things: <strong>take something out of the standing context</strong>, or{' '}
                <strong>make the tokens you do send cheaper</strong>.
              </div>
            </div>
          </CardContent>
        </Card>

        {/* ══ Quick wins ══ */}
        <SectionHeading
          id="quick-wins"
          title="Start here: six changes worth making today"
          sub="Ranked by saving. The first two are one-off setup and account for most of the win."
        />

        <Card className="mb-10">
          <CardContent className="pt-4 pb-4 px-0">
            <div className="divide-y divide-border/60">
              {quickWins.map(w => (
                <div key={w.rank} className="flex items-start gap-3 px-4 py-3">
                  <span className="w-5 h-5 rounded-md bg-primary/10 text-primary text-[11px] font-semibold flex items-center justify-center flex-shrink-0 mt-0.5">
                    {w.rank}
                  </span>
                  <div className="flex-1 min-w-0">
                    <p className="text-sm leading-snug">{w.action}</p>
                    <code className="inline-block mt-1.5 text-[11px] font-mono bg-muted px-1.5 py-0.5 rounded text-muted-foreground">
                      {w.cmd}
                    </code>
                  </div>
                  <div className="text-right flex-shrink-0 space-y-1">
                    <p className="text-[11px] text-green-600 font-medium">{w.saving}</p>
                    <Badge variant="secondary" className="text-[10px]">{w.effort}</Badge>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* ══ Routing ══ */}
        <SectionHeading
          id="routing"
          title="Stop routing models by hand"
          sub="The cheapest model decision is the one you do not have to remember to make."
        />
        <div className="grid grid-cols-1 gap-3 mb-10">
          {routingTactics.map((t, i) => <TacticCard key={t.action} t={t} delay={0.02 * i} />)}
        </div>

        {/* ══ MCP ══ */}
        <SectionHeading
          id="mcp"
          title="MCP servers: the most expensive thing nobody measures"
          sub="Tool schemas are standing context, billed on every request whether the server is used or not. This is usually the biggest single win available."
        />
        <div className="grid grid-cols-1 gap-3 mb-10">
          {mcpTactics.map((t, i) => <TacticCard key={t.action} t={t} delay={0.02 * i} />)}
        </div>

        {/* ══ Context ══ */}
        <SectionHeading
          id="context"
          title="Keep the context small and stable"
          sub="Small matters because it is re-sent every turn. Stable matters because only an unchanged prefix earns the 90% cache discount."
        />
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 mb-10">
          {contextTactics.map((t, i) => <TacticCard key={t.action} t={t} delay={0.02 * i} />)}
        </div>

        {/* ══ Output ══ */}
        <SectionHeading
          id="output"
          title="Control what comes back"
          sub="Output costs about five times input, and tool output lands in your context permanently."
        />
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 mb-10">
          {outputTactics.map((t, i) => <TacticCard key={t.action} t={t} delay={0.02 * i} />)}
        </div>

        {/* ══ Open source ══ */}
        <SectionHeading
          id="oss"
          title="Open-source tools worth installing"
          sub="All four are open source and run locally against your own logs — nothing leaves your machine."
        />

        <div className="space-y-3 mb-4">
          {ossTools.map((t, i) => (
            <Reveal key={t.name} delay={0.02 * i}>
              <Card className="hover:border-primary/30 transition-colors">
                <CardContent className="pt-4 pb-4">
                  <div className="flex items-start gap-3">
                    <div className="w-8 h-8 rounded-lg bg-primary/10 flex items-center justify-center flex-shrink-0 mt-0.5">
                      <Package className="h-4 w-4 text-primary" />
                    </div>
                    <div className="flex-1 min-w-0">
                      <div className="flex flex-wrap items-center gap-2 mb-1.5">
                        <a
                          href={t.url}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="text-sm font-medium hover:text-primary transition-colors inline-flex items-center gap-1"
                        >
                          {t.name}
                          <ExternalLink className="h-3 w-3" />
                        </a>
                        <Badge variant="secondary" className="text-[10px]">{t.license}</Badge>
                        {t.local && (
                          <Badge variant="secondary" className="text-[10px] text-green-600 bg-green-500/10">
                            Runs locally
                          </Badge>
                        )}
                      </div>
                      <p className="text-xs text-muted-foreground leading-relaxed">{t.what}</p>
                      <code className="inline-block mt-2 text-[11px] font-mono bg-muted px-2 py-0.5 rounded text-muted-foreground">
                        {t.use}
                      </code>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </Reveal>
          ))}
        </div>

        <Card className="mb-10 border-amber-500/25">
          <CardContent className="pt-4 pb-4">
            <div className="flex items-start gap-2.5">
              <AlertTriangle className="h-4 w-4 text-amber-500 mt-0.5 flex-shrink-0" />
              <div>
                <p className="text-sm font-medium mb-1">
                  Gateways and proxies — {gatewayNote.tools.join(', ')}
                </p>
                <p className="text-xs text-muted-foreground leading-relaxed">{gatewayNote.body}</p>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* ══ Anti-patterns ══ */}
        <SectionHeading
          id="avoid"
          title="Quietly expensive habits"
          sub="None of these feel wasteful in the moment. That is exactly why they add up."
        />

        <Card className="mb-10 border-red-500/20">
          <CardContent className="pt-5 pb-5 space-y-3.5">
            {antiPatterns.map(a => (
              <div key={a.habit} className="flex items-start gap-3">
                <AlertTriangle className="h-3.5 w-3.5 text-red-500 flex-shrink-0 mt-1" />
                <div className="flex-1">
                  <p className="text-sm font-medium leading-snug">{a.habit}</p>
                  <p className="text-xs text-muted-foreground leading-relaxed mt-0.5">{a.why}</p>
                  <p className="text-xs text-green-600 leading-relaxed mt-1">
                    <span className="font-medium">Instead:</span> {a.instead}
                  </p>
                </div>
              </div>
            ))}
          </CardContent>
        </Card>

        {/* ══ Habits ══ */}
        <SectionHeading
          id="habits"
          title="Make it routine"
          sub="Turn the tactics above into things you do without deciding to."
        />

        <div className="space-y-3 mb-10">
          {habitGroups.map((g, i) => (
            <Reveal key={g.cadence} delay={0.03 * i}>
              <Card>
                <CardContent className="pt-5 pb-5">
                  <div className="flex items-center gap-2 mb-3">
                    <Icon name={g.icon} className="h-4 w-4 text-primary" />
                    <p className="text-sm font-medium">{g.cadence}</p>
                  </div>
                  <ul className="space-y-2">
                    {g.items.map(item => (
                      <li key={item} className="flex items-start gap-2.5 text-xs leading-relaxed">
                        <CheckCircle2 className="h-3.5 w-3.5 text-green-500 mt-0.5 flex-shrink-0" />
                        <span className="text-muted-foreground">{item}</span>
                      </li>
                    ))}
                  </ul>
                </CardContent>
              </Card>
            </Reveal>
          ))}
        </div>

        {/* ══ Teams ══ */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 mb-12">
          {teamPractices.map((t, i) => (
            <Reveal key={t.title} delay={0.02 * i}>
              <Card className="h-full">
                <CardContent className="pt-4 flex flex-col gap-2.5">
                  <div className="flex items-center gap-2">
                    <div className="w-8 h-8 rounded-lg bg-primary/10 flex items-center justify-center flex-shrink-0">
                      <Icon name={t.icon} className="h-4 w-4 text-primary" />
                    </div>
                    <p className="text-sm font-medium leading-tight flex-1">{t.title}</p>
                  </div>
                  <p className="text-xs text-muted-foreground leading-relaxed">{t.desc}</p>
                </CardContent>
              </Card>
            </Reveal>
          ))}
        </div>

        {/* ══ Reference ══ */}
        <div className="border-t border-border pt-8">
          <SectionHeading
            id="reference"
            title="Reference"
            sub="The underlying numbers, if you want to check the reasoning behind any of the tactics above."
          />

          {/* Where to look */}
          <p className="text-xs font-medium mb-2.5">Where to see your spend</p>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 mb-8">
            {visibilityTools.map((v, i) => (
              <Reveal key={v.title} delay={0.02 * i}>
                <Card className="h-full hover:border-primary/30 transition-colors">
                  <CardContent className="pt-4 flex flex-col gap-2">
                    <div className="flex items-center gap-2">
                      <Icon name={v.icon} className="h-4 w-4 text-primary flex-shrink-0" />
                      <p className="text-sm font-medium leading-tight flex-1">{v.title}</p>
                      <Badge variant="secondary" className="text-[10px] flex-shrink-0">{v.tag}</Badge>
                    </div>
                    {v.cmd && (
                      <code className="text-[11px] font-mono bg-muted px-2 py-0.5 rounded self-start text-muted-foreground">
                        {v.cmd}
                      </code>
                    )}
                    <p className="text-xs text-muted-foreground leading-relaxed">{v.desc}</p>
                  </CardContent>
                </Card>
              </Reveal>
            ))}
          </div>

          {/* Token types */}
          <p className="text-xs font-medium mb-2.5">What you are billed for</p>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 mb-8">
            {tokenKinds.map(t => (
              <Card key={t.label} className="h-full">
                <CardContent className="pt-4 flex flex-col gap-2">
                  <div className="flex items-baseline gap-2">
                    <p className="text-sm font-medium flex-1">{t.label}</p>
                    <span
                      className={`font-mono text-sm font-semibold ${
                        t.tone === 'warn' ? 'text-red-500'
                          : t.tone === 'good' ? 'text-green-600'
                          : 'text-muted-foreground'
                      }`}
                    >
                      {t.multiplier}
                    </span>
                  </div>
                  <p className="text-xs text-muted-foreground leading-relaxed">{t.what}</p>
                  <p className="text-xs leading-relaxed border-l-2 border-border pl-2.5">{t.note}</p>
                </CardContent>
              </Card>
            ))}
          </div>

          {/* Pricing */}
          <p className="text-xs font-medium mb-2.5">Standard API pricing</p>
          <Card className="mb-8 overflow-hidden">
            <CardContent className="pt-4 pb-4 px-0">
              <div className="overflow-x-auto">
                <table className="w-full text-xs">
                  <thead>
                    <tr className="text-muted-foreground border-b border-border">
                      <th className="text-left font-medium px-4 pb-2">Model</th>
                      <th className="text-right font-medium px-3 pb-2 whitespace-nowrap">Input /M</th>
                      <th className="text-right font-medium px-3 pb-2 whitespace-nowrap">Output /M</th>
                      <th className="text-right font-medium px-3 pb-2 whitespace-nowrap">Cache read /M</th>
                      <th className="text-right font-medium px-4 pb-2 whitespace-nowrap">Context</th>
                    </tr>
                  </thead>
                  <tbody>
                    {claudeModels.map(m => (
                      <tr key={m.id} className="border-b border-border/50 last:border-0">
                        <td className="px-4 py-2 font-medium">{m.displayName.replace('Claude ', '')}</td>
                        <td className="px-3 py-2 text-right font-mono">${m.pricing.inputPerMillion.toFixed(2)}</td>
                        <td className="px-3 py-2 text-right font-mono">${m.pricing.outputPerMillion.toFixed(2)}</td>
                        <td className="px-3 py-2 text-right font-mono text-green-600">
                          ${m.pricing.cacheReadPerMillion?.toFixed(2)}
                        </td>
                        <td className="px-4 py-2 text-right font-mono text-muted-foreground">
                          {m.contextWindow >= 1_000_000
                            ? `${m.contextWindow / 1_000_000}M`
                            : `${m.contextWindow / 1000}K`}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
              <p className="text-[11px] text-muted-foreground px-4 pt-3 leading-relaxed">
                USD per million tokens. Subscription plans bundle this into rate limits rather than
                billing per token — the ratios still tell you which choice is expensive. The Batch
                API halves every figure for work that can wait.
              </p>
            </CardContent>
          </Card>

          <p className="text-xs font-medium mb-2.5">Why long sessions compound</p>
          <SessionCostSimulator />
        </div>

        {/* ── Cross-link ── */}
        <Link href="/calculator" className="block group">
          <Card className="border-primary/20 hover:border-primary/40 transition-colors">
            <CardContent className="py-4 flex items-center gap-3">
              <div className="w-9 h-9 rounded-lg bg-primary/10 flex items-center justify-center flex-shrink-0">
                <Calculator className="h-4 w-4 text-primary" />
              </div>
              <div className="flex-1">
                <p className="text-sm font-medium">Put numbers on your own workload</p>
                <p className="text-xs text-muted-foreground">
                  Model caching, batching, and model choice against real pricing in the Cost Calculator.
                </p>
              </div>
              <span className="text-xs text-primary group-hover:translate-x-0.5 transition-transform">
                Open &rarr;
              </span>
            </CardContent>
          </Card>
        </Link>

      </motion.div>
    </div>
  );
}

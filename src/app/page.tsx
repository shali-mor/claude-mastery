import Link from 'next/link';
import { SignUpButton } from '@clerk/nextjs';
import { modules } from '@/data/modules';
import { LessonContent } from '@/components/modules/LessonContent';

export const metadata = {
  title: 'Preview — Claude Mastery',
  description: 'See what Claude Mastery has to offer — 15 modules, 65 lessons covering Claude Code, API, automation, and more.',
};

const COLOR_HEX: Record<string, string> = {
  blue: '#3b82f6', purple: '#a855f7', green: '#22c55e', orange: '#f97316',
  red: '#ef4444', cyan: '#06b6d4', yellow: '#eab308', violet: '#8b5cf6',
  rose: '#f43f5e', indigo: '#6366f1', teal: '#14b8a6', pink: '#ec4899',
};

const PHASES = [
  { label: 'Foundations', modules: [0, 1, 2], color: '#3b82f6', desc: 'CLI basics, skills, hooks, and the GSD workflow' },
  { label: 'Efficiency', modules: [3, 4, 5], color: '#a855f7', desc: 'Cost optimization, live API, and prompt engineering' },
  { label: 'Orchestration', modules: [6, 7, 8], color: '#f97316', desc: 'Sub-agents, plan mode, and MCP servers' },
  { label: 'Projects', modules: [9, 10, 11, 12, 13, 14], color: '#22c55e', desc: 'n8n, automation, capstone, testing, and real-world bots' },
];

const previewLesson = (() => {
  const mod = modules.find(m => m.id === 'module-7');
  return mod?.lessons.find(l => l.id === 'lesson-7-1') ?? null;
})();

export default function PreviewPage() {
  const totalLessons = modules.reduce((s, m) => s + m.lessons.length, 0);
  const totalMinutes = modules.reduce((s, m) => s + m.lessons.reduce((ls, l) => ls + l.estimatedMinutes, 0), 0);

  return (
    <div className="min-h-screen bg-background text-foreground">

      {/* Nav */}
      <nav className="border-b border-border/50 px-6 py-4 flex items-center justify-between">
        <Link href="/" className="font-semibold text-lg tracking-tight">
          Claude <span className="text-orange-500">Mastery</span>
        </Link>
        <SignUpButton mode="modal">
          <button className="px-4 py-2 rounded-lg bg-orange-500 hover:bg-orange-600 text-white text-sm font-medium transition-colors">
            Get started free
          </button>
        </SignUpButton>
      </nav>

      {/* Hero */}
      <section className="max-w-4xl mx-auto px-6 py-16 text-center">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-orange-500/10 text-orange-500 text-xs font-medium mb-6">
          Free preview — no sign-up required
        </div>
        <h1 className="text-4xl sm:text-5xl font-bold tracking-tight mb-4">
          Master Claude Code &amp; API<br />
          <span className="text-orange-500">from first command to production</span>
        </h1>
        <p className="text-muted-foreground text-lg max-w-2xl mx-auto mb-8">
          {modules.length} modules · {totalLessons} lessons · ~{Math.round(totalMinutes / 60)}h of content.
          Interactive exercises, a progress map, and real code you can run today.
        </p>
        <SignUpButton mode="modal">
          <button className="px-8 py-3 rounded-xl bg-orange-500 hover:bg-orange-600 text-white font-semibold text-base transition-colors shadow-lg shadow-orange-500/20">
            Start learning free →
          </button>
        </SignUpButton>
      </section>

      {/* Learning path phases */}
      <section className="max-w-5xl mx-auto px-6 pb-16">
        <h2 className="text-xl font-semibold mb-2">Your learning path</h2>
        <p className="text-muted-foreground text-sm mb-6">
          Four phases take you from zero to building production-grade Claude workflows.
        </p>
        <div className="relative">
          {/* Connector line */}
          <div className="absolute left-6 top-8 bottom-8 w-px bg-border hidden sm:block" />

          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {PHASES.map((phase, pi) => (
              <div key={phase.label} className="relative rounded-xl border border-border bg-card p-5">
                <div
                  className="w-8 h-8 rounded-full flex items-center justify-center text-white text-xs font-bold mb-3"
                  style={{ backgroundColor: phase.color }}
                >
                  {pi + 1}
                </div>
                <div className="font-semibold text-sm mb-1">{phase.label}</div>
                <div className="text-xs text-muted-foreground mb-3">{phase.desc}</div>
                <div className="flex flex-wrap gap-1">
                  {phase.modules.map(mi => modules[mi] && (
                    <span
                      key={mi}
                      className="px-2 py-0.5 rounded-full text-[10px] font-medium text-white/90"
                      style={{ backgroundColor: COLOR_HEX[modules[mi].color] ?? '#6366f1' }}
                    >
                      {modules[mi].title.split('—')[0].split(':')[0].trim()}
                    </span>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Journey map teaser */}
        <div className="mt-6 rounded-xl border border-border bg-card/50 overflow-hidden">
          <div className="px-6 pt-5 pb-4">
            <div className="text-sm font-medium mb-1">Interactive progress map</div>
            <p className="text-xs text-muted-foreground">
              A walking figure moves along the path as you complete lessons. Sign in to see your live progress.
            </p>
          </div>
          <div className="px-6 pb-5 space-y-3">
            {PHASES.map((phase) => (
              <div key={phase.label} className="flex items-start gap-3">
                {/* Phase pill */}
                <div
                  className="shrink-0 px-2.5 py-1 rounded-md text-[10px] font-semibold uppercase tracking-wide text-white w-24 text-center"
                  style={{ backgroundColor: phase.color + '22', color: phase.color, border: `1px solid ${phase.color}44` }}
                >
                  {phase.label}
                </div>
                {/* Module nodes */}
                <div className="flex items-center flex-wrap gap-y-2 flex-1 min-w-0">
                  {phase.modules.map((mi, i) => {
                    const mod = modules[mi];
                    if (!mod) return null;
                    const hex = COLOR_HEX[mod.color] ?? '#6366f1';
                    const shortTitle = mod.title.replace(/^Module \d+[:\s—]*/i, '').split(':')[0].split('—')[0].trim();
                    return (
                      <div key={mod.id} className="flex items-center">
                        {i > 0 && <div className="w-4 h-px mx-1 opacity-25" style={{ backgroundColor: phase.color }} />}
                        <div className="flex items-center gap-1.5 px-2.5 py-1 rounded-full text-[11px] font-medium"
                          style={{ backgroundColor: hex + '15', color: hex, border: `1px solid ${hex}35` }}>
                          <span>{shortTitle}</span>
                          <span className="opacity-50 text-[10px]">{mod.lessons.length}</span>
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>
            ))}
          </div>
          <div className="px-6 py-3 border-t border-border/50 flex items-center justify-between">
            <span className="text-xs text-muted-foreground">Number = lessons in module</span>
            <Link href="/journey" className="text-xs text-orange-500 hover:underline">
              Sign in to track your progress →
            </Link>
          </div>
        </div>
      </section>

      {/* All modules grid */}
      <section className="max-w-5xl mx-auto px-6 pb-16">
        <h2 className="text-xl font-semibold mb-2">All {modules.length} modules</h2>
        <p className="text-muted-foreground text-sm mb-6">Every module includes lessons, exercises, and a quiz.</p>
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-3">
          {modules.map(mod => {
            const hex = COLOR_HEX[mod.color] ?? '#6366f1';
            const totalMins = mod.lessons.reduce((s, l) => s + l.estimatedMinutes, 0);
            return (
              <div key={mod.id} className="rounded-xl border border-border bg-card p-4 hover:border-orange-500/40 transition-colors">
                <div className="flex items-start gap-3 mb-2">
                  <div
                    className="w-8 h-8 rounded-lg flex items-center justify-center shrink-0 text-sm"
                    style={{ backgroundColor: hex + '22', color: hex }}
                  >
                    {mod.icon === 'Terminal' ? '⌨' : mod.icon === 'Zap' ? '⚡' : mod.icon === 'Brain' ? '🧠' : mod.icon === 'DollarSign' ? '$' : mod.icon === 'Radio' ? '📡' : mod.icon === 'Bot' ? '🤖' : mod.icon === 'Map' ? '🗺' : mod.icon === 'Puzzle' ? '🧩' : mod.icon === 'Workflow' ? '⚙' : mod.icon === 'GitBranch' ? '⑃' : mod.icon === 'Rocket' ? '🚀' : mod.icon === 'Trophy' ? '🏆' : mod.icon === 'TestTube' ? '🧪' : mod.icon === 'TrendingUp' ? '📈' : '◆'}
                  </div>
                  <div>
                    <div className="font-medium text-sm leading-tight">{mod.title}</div>
                    <div className="text-xs text-muted-foreground mt-0.5">{mod.lessons.length} lessons · ~{totalMins}m</div>
                  </div>
                </div>
                <p className="text-xs text-muted-foreground line-clamp-2">{mod.description}</p>
              </div>
            );
          })}
        </div>
      </section>

      {/* Sample lesson */}
      {previewLesson && (
        <section className="max-w-3xl mx-auto px-6 pb-16">
          <div className="flex items-center gap-3 mb-6">
            <div className="h-px flex-1 bg-border" />
            <span className="text-xs text-muted-foreground font-medium uppercase tracking-wider">Sample lesson</span>
            <div className="h-px flex-1 bg-border" />
          </div>
          <div className="rounded-xl border border-orange-500/30 bg-card overflow-hidden">
            <div className="bg-orange-500/10 border-b border-orange-500/20 px-6 py-4">
              <div className="text-xs text-orange-500 font-medium mb-1">Module 7 — Sub-Agents &amp; Parallelization</div>
              <h2 className="text-xl font-semibold">{previewLesson.title}</h2>
              <p className="text-sm text-muted-foreground mt-1">{previewLesson.description}</p>
              <div className="text-xs text-muted-foreground mt-2">~{previewLesson.estimatedMinutes} min read</div>
            </div>
            <div className="p-6">
              <LessonContent blocks={previewLesson.blocks.filter(b => b.type !== 'lesson-player')} />
            </div>
          </div>
        </section>
      )}

      {/* Bottom CTA */}
      <section className="border-t border-border bg-card/30">
        <div className="max-w-3xl mx-auto px-6 py-16 text-center">
          <h2 className="text-2xl font-bold mb-3">Ready to go deeper?</h2>
          <p className="text-muted-foreground mb-8">
            Sign up free to unlock all {totalLessons} lessons, track your progress,<br />
            access exercises, and get your completion certificates.
          </p>
          <SignUpButton mode="modal">
            <button className="px-8 py-3 rounded-xl bg-orange-500 hover:bg-orange-600 text-white font-semibold text-base transition-colors shadow-lg shadow-orange-500/20">
              Start learning free →
            </button>
          </SignUpButton>
          <p className="text-xs text-muted-foreground mt-4">No credit card required</p>
        </div>
      </section>
    </div>
  );
}

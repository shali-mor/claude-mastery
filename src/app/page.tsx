import { redirect } from 'next/navigation';
import Link from 'next/link';
import { SignUpButton, SignInButton } from '@clerk/nextjs';
import { auth } from '@clerk/nextjs/server';
import { modules } from '@/data/modules';
import { Cheatsheet } from '@/components/cheatsheet/Cheatsheet';
import { CollapsibleSampleLesson } from '@/components/home/CollapsibleSampleLesson';

export const metadata = {
  title: 'Claude Mastery — Master Claude Code',
  description: 'Free cheatsheet and interactive course covering Claude Code, the API, automation, and more.',
};

const COLOR_HEX: Record<string, string> = {
  blue: '#3b82f6', purple: '#a855f7', green: '#22c55e', orange: '#f97316',
  red: '#ef4444', cyan: '#06b6d4', yellow: '#eab308', violet: '#8b5cf6',
  rose: '#f43f5e', indigo: '#6366f1', teal: '#14b8a6', pink: '#ec4899',
};

const PHASES = [
  { label: 'Foundations', modules: [0, 1, 8], color: '#3b82f6', desc: 'CLI basics, skills, hooks, and the GSD workflow' },
  { label: 'Efficiency', modules: [2, 3, 4], color: '#a855f7', desc: 'Cost optimization, live API, and prompt engineering' },
  { label: 'Orchestration', modules: [5, 6, 7], color: '#f97316', desc: 'Sub-agents, plan mode, and MCP servers' },
  { label: 'Projects', modules: [9, 10, 11, 12, 13], color: '#22c55e', desc: 'n8n, automation, capstone, testing, and real-world bots' },
];

const previewLesson = (() => {
  const mod = modules.find(m => m.id === 'module-7');
  return mod?.lessons.find(l => l.id === 'lesson-7-1') ?? null;
})();

export default async function HomePage() {
  const { userId } = await auth();
  if (userId) redirect('/modules');

  const totalLessons = modules.reduce((s, m) => s + m.lessons.length, 0);
  const totalMinutes = modules.reduce((s, m) => s + m.lessons.reduce((ls, l) => ls + l.estimatedMinutes, 0), 0);

  return (
    <div className="min-h-screen bg-background text-foreground">

      {/* Nav */}
      <nav className="border-b border-border/50 px-6 py-4 flex items-center justify-between">
        <Link href="/" className="font-semibold text-lg tracking-tight">
          Claude <span className="text-orange-500">Mastery</span>
        </Link>
        <div className="flex items-center gap-2">
          <SignInButton mode="modal">
            <button className="px-4 py-2 rounded-lg border border-border hover:bg-muted text-sm font-medium transition-colors">
              Sign in
            </button>
          </SignInButton>
          <SignUpButton mode="modal">
            <button className="px-4 py-2 rounded-lg bg-orange-500 hover:bg-orange-600 text-white text-sm font-medium transition-colors">
              Sign up free
            </button>
          </SignUpButton>
        </div>
      </nav>

      {/* Hero */}
      <section className="max-w-4xl mx-auto px-6 py-16 text-center">
        <h1 className="text-4xl sm:text-5xl font-bold tracking-tight mb-4">
          Master <span className="text-orange-500">Claude Code</span>
        </h1>
        <p className="text-muted-foreground text-lg max-w-2xl mx-auto mb-8">
          {modules.length} modules · {totalLessons} lessons · ~{Math.round(totalMinutes / 60)}h of content.
          Free cheatsheet below — sign up to unlock the full course.
        </p>
        <SignUpButton mode="modal">
          <button className="px-8 py-3 rounded-xl bg-orange-500 hover:bg-orange-600 text-white font-semibold text-base transition-colors shadow-lg shadow-orange-500/20">
            Sign up free →
          </button>
        </SignUpButton>
      </section>

      {/* Cheatsheet */}
      <section id="cheatsheet" className="border-y border-border bg-card/30 py-12">
        <div className="max-w-5xl mx-auto px-4">
          <Cheatsheet />
        </div>
      </section>

      {/* Learning path */}
      <section className="max-w-5xl mx-auto px-6 py-16">
        <h2 className="text-xl font-semibold mb-2">Learning path</h2>
        <p className="text-muted-foreground text-sm mb-6">
          Four phases, from basics to production workflows.
        </p>
        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {PHASES.map((phase, pi) => (
            <div key={phase.label} className="rounded-xl border border-border bg-card p-5">
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
      </section>

      {/* Modules */}
      <section className="max-w-5xl mx-auto px-6 pb-16">
        <h2 className="text-xl font-semibold mb-2">Modules</h2>
        <p className="text-muted-foreground text-sm mb-6">{modules.length} modules with lessons, exercises, and quizzes.</p>
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
        <section className="max-w-5xl mx-auto px-6 pb-16">
          <div className="flex items-center gap-3 mb-6">
            <div className="h-px flex-1 bg-border" />
            <span className="text-xs text-muted-foreground font-medium uppercase tracking-wider">Sample lesson</span>
            <div className="h-px flex-1 bg-border" />
          </div>
          <CollapsibleSampleLesson
            title={previewLesson.title}
            description={previewLesson.description}
            estimatedMinutes={previewLesson.estimatedMinutes}
            blocks={previewLesson.blocks.filter(b => b.type !== 'lesson-player')}
          />
        </section>
      )}

      {/* Bottom CTA */}
      <section className="border-t border-border bg-card/30">
        <div className="max-w-3xl mx-auto px-6 py-16 text-center">
          <h2 className="text-2xl font-bold mb-3">Unlock the full course</h2>
          <p className="text-muted-foreground mb-8">
            {totalLessons} lessons, progress tracking, exercises, and quizzes.
          </p>
          <SignUpButton mode="modal">
            <button className="px-8 py-3 rounded-xl bg-orange-500 hover:bg-orange-600 text-white font-semibold text-base transition-colors shadow-lg shadow-orange-500/20">
              Sign up free →
            </button>
          </SignUpButton>
          <p className="text-xs text-muted-foreground mt-4">No credit card required</p>
        </div>
      </section>
    </div>
  );
}

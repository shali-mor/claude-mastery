'use client';

import { motion } from 'framer-motion';
import {
  Code2, BookOpen, Terminal, DollarSign, Layers, Github,
  Sparkles, Zap, FlaskConical, MessageSquare, Database, ShieldCheck, FolderGit2,
} from 'lucide-react';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { modules } from '@/data/modules';

const totalLessons = modules.reduce((acc, m) => acc + m.lessons.length, 0);

const features = [
  {
    icon: BookOpen,
    label: `${modules.length} Learning Modules`,
    desc: `${totalLessons} structured lessons — from CLI basics and hooks to MCP servers, n8n automation, and real-world AI pipelines.`,
    color: 'text-blue-500',
    bg: 'bg-blue-500/10',
  },
  {
    icon: Terminal,
    label: 'Command Browser',
    desc: '76+ slash commands, CLI flags, hooks, skills, and keyboard shortcuts — all searchable with a built-in flashcard drill mode.',
    color: 'text-purple-500',
    bg: 'bg-purple-500/10',
  },
  {
    icon: DollarSign,
    label: 'Cost Calculator',
    desc: 'Real 2026 pricing across all Claude models with Batch API and prompt-caching scenarios so you can optimise before you ship.',
    color: 'text-green-500',
    bg: 'bg-green-500/10',
  },
  {
    icon: FlaskConical,
    label: 'Live Playground',
    desc: 'Stream Claude responses directly in the browser using your own API key — model selection, token tracking, and system prompts included.',
    color: 'text-orange-500',
    bg: 'bg-orange-500/10',
  },
  {
    icon: Sparkles,
    label: 'Interactive Quizzes',
    desc: 'Knowledge checks at the end of every module with instant feedback, score tracking, and progress saved locally across sessions.',
    color: 'text-yellow-500',
    bg: 'bg-yellow-500/10',
  },
  {
    icon: MessageSquare,
    label: 'Aria — Your Guide',
    desc: 'A floating AI guide that surfaces contextual hints as you move through lessons and quizzes, keeping you on track.',
    color: 'text-pink-500',
    bg: 'bg-pink-500/10',
  },
  {
    icon: FolderGit2,
    label: 'Hands-on Exercises',
    desc: 'A companion GitHub repo with starter blueprints, TODO placeholders, solutions, and check.sh validators for every lesson.',
    color: 'text-teal-500',
    bg: 'bg-teal-500/10',
  },
];

const stack = [
  'Next.js 16', 'TypeScript', 'Tailwind CSS', 'shadcn/ui',
  'Zustand', 'Framer Motion', 'Shiki', 'Recharts', 'Anthropic SDK',
];

// ─── Instructor avatar ────────────────────────────────────────────────────────
function InstructorAvatar() {
  return (
    // eslint-disable-next-line @next/next/no-img-element
    <img src="/shali.png" alt="Shali Mor" width={64} height={64} style={{ objectFit: 'cover', width: '100%', height: '100%' }} />
  );
}

export default function AboutPage() {
  return (
    <div className="max-w-3xl mx-auto px-6 py-10">
      <motion.div initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.4 }}>

        {/* ── Hero ── */}
        <div className="flex items-center gap-4 mb-8">
          <div className="w-14 h-14 rounded-2xl bg-primary flex items-center justify-center flex-shrink-0">
            <Code2 className="h-7 w-7 text-primary-foreground" />
          </div>
          <div>
            <h1 className="text-2xl font-bold">Claude Mastery</h1>
            <p className="text-muted-foreground text-sm">Interactive learning for Claude Code &amp; the Anthropic API</p>
          </div>
        </div>

        {/* ── Mission ── */}
        <Card className="mb-8 border-primary/20 bg-primary/4">
          <CardContent className="pt-6 pb-5">
            <div className="flex items-start gap-2 mb-3">
              <Zap className="h-4 w-4 text-primary mt-0.5 flex-shrink-0" />
              <p className="text-sm leading-7">
                <strong>Claude Mastery</strong> is a hands-on learning platform that takes you from absolute
                beginner to confident expert with <strong>Claude Code</strong> and the <strong>Anthropic API</strong>.
                Every feature is built around active learning — interactive lessons, knowledge quizzes, a live
                command reference, a real cost calculator, and a streaming playground — all in one place.
              </p>
            </div>
          </CardContent>
        </Card>

        {/* ── Features grid ── */}
        <h2 className="text-base font-semibold mb-4">What&apos;s inside</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 mb-10">
          {features.map((f, i) => (
            <motion.div
              key={f.label}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.05 * i }}
            >
              <Card className="hover:border-primary/30 transition-colors h-full">
                <CardContent className="pt-4 flex gap-3">
                  <div className={`w-9 h-9 rounded-lg ${f.bg} flex items-center justify-center flex-shrink-0`}>
                    <f.icon className={`h-4 w-4 ${f.color}`} />
                  </div>
                  <div>
                    <p className="text-sm font-medium">{f.label}</p>
                    <p className="text-xs text-muted-foreground mt-0.5 leading-relaxed">{f.desc}</p>
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </div>

        {/* ── Instructor ── */}
        <h2 className="text-base font-semibold mb-4">About the instructor</h2>
        <Card className="mb-10">
          <CardContent className="pt-5 pb-5">
            <div className="flex items-center gap-4">
              <div className="w-16 h-16 rounded-full overflow-hidden border-2 border-border flex-shrink-0 bg-card">
                <InstructorAvatar />
              </div>
              <div>
                <p className="font-semibold text-sm">Shali Mor</p>
                <p className="text-xs text-muted-foreground mt-1 leading-relaxed max-w-md">
                  Builder and maintainer of Claude Mastery. Passionate about developer tooling,
                  AI-assisted engineering workflows, and making complex APIs approachable through
                  practical, example-driven learning.
                </p>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* ── Data & Auth ── */}
        <h2 className="text-base font-semibold mb-4">Data &amp; Authentication</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 mb-10">
          <Card>
            <CardContent className="pt-4 flex gap-3">
              <div className="w-9 h-9 rounded-lg bg-cyan-500/10 flex items-center justify-center flex-shrink-0">
                <Database className="h-4 w-4 text-cyan-500" />
              </div>
              <div>
                <p className="text-sm font-medium">Neon (PostgreSQL)</p>
                <p className="text-xs text-muted-foreground mt-0.5 leading-relaxed">
                  Progress and user data are persisted in a serverless Neon PostgreSQL database,
                  accessed via Drizzle ORM for type-safe, schema-driven queries.
                </p>
              </div>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="pt-4 flex gap-3">
              <div className="w-9 h-9 rounded-lg bg-violet-500/10 flex items-center justify-center flex-shrink-0">
                <ShieldCheck className="h-4 w-4 text-violet-500" />
              </div>
              <div>
                <p className="text-sm font-medium">Clerk Authentication</p>
                <p className="text-xs text-muted-foreground mt-0.5 leading-relaxed">
                  User sign-up, sign-in, and session management are handled by Clerk — supporting
                  email/password and social OAuth providers out of the box.
                </p>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* ── Stack ── */}
        <h2 className="text-base font-semibold mb-3">Built with</h2>
        <div className="flex flex-wrap gap-2 mb-10">
          {stack.map(s => (
            <Badge key={s} variant="secondary" className="text-xs">{s}</Badge>
          ))}
        </div>

        {/* ── Footer ── */}
        <div className="flex flex-wrap items-center justify-between gap-3 pt-6 border-t border-border text-xs text-muted-foreground">
          <span>© 2026 Shali Mor</span>
          <div className="flex items-center gap-4">
            <a
              href="https://github.com/shali-mor/claude-mastery"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-1.5 hover:text-foreground transition-colors"
            >
              <Github className="h-3.5 w-3.5" />
              shali-mor/claude-mastery
            </a>
            <a
              href="https://github.com/shali-mor/claude-mastery-exercises"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-1.5 hover:text-foreground transition-colors"
            >
              <FolderGit2 className="h-3.5 w-3.5" />
              Exercises repo
            </a>
          </div>
        </div>

      </motion.div>
    </div>
  );
}

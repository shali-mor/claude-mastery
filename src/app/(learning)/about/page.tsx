'use client';

import { motion } from 'framer-motion';
import {
  Code2, BookOpen, Terminal, DollarSign, Layers, Github,
  Sparkles, Zap, FlaskConical, MessageSquare, Database, ShieldCheck,
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
];

const stack = [
  'Next.js 16', 'TypeScript', 'Tailwind CSS', 'shadcn/ui',
  'Zustand', 'Framer Motion', 'Shiki', 'Recharts', 'Anthropic SDK',
];

// ─── Instructor avatar (inline, no external dep) ─────────────────────────────
function InstructorAvatar() {
  return (
    <svg width="64" height="64" viewBox="0 0 52 58" fill="none" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
      <path d="M2 58 L2 45 Q6 37 16 36 L21 35 L26 44 L31 35 L36 36 Q46 37 50 45 L50 58 Z" fill="#181818" stroke="#2a2a2a" strokeWidth="0.6" />
      <path d="M21 35 L26 44 L31 35" stroke="#2e2e2e" strokeWidth="0.7" fill="none" />
      <path d="M20 43 Q26 47 32 43 L32 36 Q26 40 20 36 Z" fill="#C8865E" />
      <ellipse cx="26" cy="25" rx="19.5" ry="22" fill="#D4956A" />
      <path d="M6 23 Q5 8 13 3 Q19 -1 26 0.5 Q33 -1 39 3 Q47 8 46 23 Q42 12 37 9 Q31 5.5 26 6 Q21 5.5 15 9 Q10 12 6 23 Z" fill="#1C0E07" />
      <path d="M6 23 Q4 32 6 39 Q10 27 14 23" fill="#1C0E07" />
      <path d="M46 23 Q48 32 46 39 Q42 27 38 23" fill="#1C0E07" />
      <path d="M17 7 Q26 4.5 35 7" stroke="#2E1810" strokeWidth="1.2" fill="none" strokeLinecap="round" />
      <path d="M20 5.5 Q26 3.5 32 5.5" stroke="#2E1810" strokeWidth="0.9" fill="none" strokeLinecap="round" />
      <ellipse cx="6.8" cy="27" rx="3.2" ry="4.5" fill="#C8865E" />
      <ellipse cx="6.8" cy="27" rx="1.5" ry="2.5" fill="#B57548" />
      <ellipse cx="45.2" cy="27" rx="3.2" ry="4.5" fill="#C8865E" />
      <ellipse cx="45.2" cy="27" rx="1.5" ry="2.5" fill="#B57548" />
      <path d="M10 18 Q15 16 20 17.5" stroke="#1A0C06" strokeWidth="2.4" strokeLinecap="round" fill="none" />
      <path d="M32 17.5 Q37 16 42 18" stroke="#1A0C06" strokeWidth="2.4" strokeLinecap="round" fill="none" />
      <ellipse cx="16.5" cy="24" rx="5.2" ry="4" fill="#EEE8DC" />
      <circle cx="17" cy="25.5" r="3.1" fill="#2C1A0E" />
      <circle cx="17" cy="25.5" r="1.7" fill="#0C0400" />
      <circle cx="15.8" cy="24.3" r="1.1" fill="white" />
      <path d="M11.3 24 Q16.5 20 21.7 24" stroke="#1A0C06" strokeWidth="1.1" fill="none" />
      <ellipse cx="35.5" cy="24" rx="5.2" ry="4" fill="#EEE8DC" />
      <circle cx="36" cy="25.5" r="3.1" fill="#2C1A0E" />
      <circle cx="36" cy="25.5" r="1.7" fill="#0C0400" />
      <circle cx="34.8" cy="24.3" r="1.1" fill="white" />
      <path d="M30.3 24 Q35.5 20 40.7 24" stroke="#1A0C06" strokeWidth="1.1" fill="none" />
      <path d="M24 27 Q22 34 23.5 37" stroke="#B07048" strokeWidth="1.2" strokeLinecap="round" fill="none" />
      <path d="M28 27 Q30 34 28.5 37" stroke="#B07048" strokeWidth="1.2" strokeLinecap="round" fill="none" />
      <path d="M23.5 37 Q26 39.5 28.5 37" stroke="#B07048" strokeWidth="1.3" strokeLinecap="round" fill="none" />
      <path d="M18 44 Q26 49 34 44" stroke="#8C3222" strokeWidth="1.9" strokeLinecap="round" fill="none" />
      <path d="M20 48 Q26 50.5 32 48" stroke="#A84E3A" strokeWidth="0.9" strokeLinecap="round" fill="none" />
      <path d="M13 40 Q16 48 26 49 Q36 48 39 40 Q34 44 26 44 Q18 44 13 40 Z" fill="#1C0E07" fillOpacity="0.14" />
      <ellipse cx="10" cy="32" rx="5" ry="3" fill="#E07050" fillOpacity="0.13" />
      <ellipse cx="42" cy="32" rx="5" ry="3" fill="#E07050" fillOpacity="0.13" />
    </svg>
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
        <h2 className="text-base font-semibold mb-4">What's inside</h2>
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
        <div className="flex items-center justify-between pt-6 border-t border-border text-xs text-muted-foreground">
          <span>© 2026 Shali Mor</span>
          <a
            href="https://github.com/shali-mor/claude-mastery"
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-1.5 hover:text-foreground transition-colors"
          >
            <Github className="h-3.5 w-3.5" />
            shali-mor/claude-mastery
          </a>
        </div>

      </motion.div>
    </div>
  );
}

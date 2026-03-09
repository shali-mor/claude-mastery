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
    <svg width="64" height="64" viewBox="0 0 56 62" fill="none" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
      {/* Shirt – black V-neck */}
      <path d="M2 62 L2 50 Q6 40 18 38 L23 36 L28 47 L33 36 L38 38 Q50 40 54 50 L54 62 Z" fill="#111111" />
      {/* V-neck seam */}
      <path d="M23 36 L28 45 L33 36" stroke="#1e1e1e" strokeWidth="0.8" fill="none" />
      {/* Neck */}
      <path d="M22 34 L22 40 Q28 43 34 40 L34 34 Q28 37 22 34 Z" fill="#C09870" />
      {/* Face – olive skin, oval */}
      <ellipse cx="28" cy="22" rx="20" ry="21" fill="#C8A278" />
      {/* Hair – dark brown/black swept back, volume on top */}
      <path d="M8 19 Q7 5 16 1 Q21 -1 28 0 Q35 -1 40 1 Q49 5 48 19 Q44 8 37 5.5 Q32 4 28 4.5 Q24 4 19 5.5 Q12 8 8 19 Z" fill="#1A1008" />
      {/* Hair sides */}
      <path d="M8 19 Q5 29 7 37 Q11 25 15 21" fill="#1A1008" />
      <path d="M48 19 Q51 29 49 37 Q45 25 41 21" fill="#1A1008" />
      {/* Gray streaks in hair */}
      <path d="M15 9 Q20 6 26 6" stroke="#6A5A4A" strokeWidth="1.3" fill="none" opacity="0.7" strokeLinecap="round" />
      <path d="M30 6 Q36 6 41 9" stroke="#6A5A4A" strokeWidth="1.3" fill="none" opacity="0.7" strokeLinecap="round" />
      <path d="M12 14 Q16 10 21 9" stroke="#5A4A3A" strokeWidth="0.9" fill="none" opacity="0.5" strokeLinecap="round" />
      {/* Ears */}
      <ellipse cx="8.5" cy="24" rx="3" ry="4.5" fill="#BF9265" />
      <ellipse cx="8.5" cy="24" rx="1.4" ry="2.3" fill="#A87848" />
      <ellipse cx="47.5" cy="24" rx="3" ry="4.5" fill="#BF9265" />
      <ellipse cx="47.5" cy="24" rx="1.4" ry="2.3" fill="#A87848" />
      {/* Eyebrows – dark, thick, slightly arched */}
      <path d="M11 16 Q16 13.5 22 15" stroke="#1A0C05" strokeWidth="2.8" strokeLinecap="round" fill="none" />
      <path d="M34 15 Q40 13.5 45 16" stroke="#1A0C05" strokeWidth="2.8" strokeLinecap="round" fill="none" />
      {/* Eye whites */}
      <ellipse cx="17.5" cy="22" rx="5" ry="3.6" fill="#EDE8DE" />
      <ellipse cx="38.5" cy="22" rx="5" ry="3.6" fill="#EDE8DE" />
      {/* Irises – warm brown */}
      <circle cx="18" cy="22.5" r="2.9" fill="#5A3510" />
      <circle cx="38" cy="22.5" r="2.9" fill="#5A3510" />
      {/* Pupils */}
      <circle cx="18" cy="22.5" r="1.6" fill="#0C0400" />
      <circle cx="38" cy="22.5" r="1.6" fill="#0C0400" />
      {/* Eye highlights */}
      <circle cx="16.8" cy="21.2" r="0.9" fill="white" />
      <circle cx="36.8" cy="21.2" r="0.9" fill="white" />
      {/* Upper eyelid lines */}
      <path d="M12.5 21.5 Q17.5 18 22.5 21.5" stroke="#1A0805" strokeWidth="1.2" fill="none" />
      <path d="M33.5 21.5 Q38.5 18 43.5 21.5" stroke="#1A0805" strokeWidth="1.2" fill="none" />
      {/* Nose – medium prominent */}
      <path d="M27 26 Q25.5 31 25.5 34" stroke="#9A7050" strokeWidth="1.2" fill="none" strokeLinecap="round" />
      <path d="M29 26 Q30.5 31 30.5 34" stroke="#9A7050" strokeWidth="1.2" fill="none" strokeLinecap="round" />
      <path d="M22.5 35 Q25 37 28 37 Q31 37 33.5 35" stroke="#9A7050" strokeWidth="1.2" fill="none" strokeLinecap="round" />
      <path d="M25.5 34 Q22.5 36 23.5 38 Q25.5 38.5 28 38" stroke="#9A7050" strokeWidth="1" fill="none" />
      <path d="M30.5 34 Q33.5 36 32.5 38 Q30.5 38.5 28 38" stroke="#9A7050" strokeWidth="1" fill="none" />
      {/* Nasolabial folds – subtle maturity */}
      <path d="M21 33 Q19.5 37 20.5 41" stroke="#9A7050" strokeWidth="0.8" fill="none" opacity="0.45" strokeLinecap="round" />
      <path d="M35 33 Q36.5 37 35.5 41" stroke="#9A7050" strokeWidth="0.8" fill="none" opacity="0.45" strokeLinecap="round" />
      {/* Lips – closed, gentle smile */}
      <path d="M21 43 Q24.5 41 28 41.5 Q31.5 41 35 43" stroke="#7A4828" strokeWidth="1.7" strokeLinecap="round" fill="none" />
      <path d="M22.5 45 Q28 47.5 33.5 45" stroke="#7A4828" strokeWidth="1.3" strokeLinecap="round" fill="none" />
      {/* Jaw shadow */}
      <path d="M9 30 Q8 42 16 48 Q21 52 28 52 Q35 52 40 48 Q48 42 47 30" fill="#9A7050" fillOpacity="0.07" />
      {/* Subtle forehead line */}
      <path d="M17 13 Q28 12 39 13" stroke="#9A7050" strokeWidth="0.6" fill="none" opacity="0.2" />
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

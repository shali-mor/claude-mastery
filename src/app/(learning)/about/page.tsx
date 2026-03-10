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
    <svg width="64" height="64" viewBox="0 0 60 68" fill="none" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
      {/* ── Shirt: black V-neck ── */}
      <path d="M0 68 L0 53 Q4 43 16 41 L22 39 L30 52 L38 39 L44 41 Q56 43 60 53 L60 68 Z" fill="#111" />
      <path d="M22 39 L30 51 L38 39" stroke="#1d1d1d" strokeWidth="0.9" fill="none" />
      {/* ── Neck ── */}
      <path d="M22 36 L22 43 Q30 47 38 43 L38 36 Q30 41 22 36 Z" fill="#C09870" />
      {/* ── Face: olive skin, long oval ── */}
      <ellipse cx="30" cy="28" rx="17" ry="21" fill="#C8A47C" />
      {/* ── Hair: full, dark, swept back from forehead ── */}
      {/* Main hair mass — high crown, volume on top */}
      <path d="M13 25 Q12 6 19 1 Q23 -1 30 0 Q37 -1 41 1 Q48 6 47 25 Q43 11 37 8 Q33 5.5 30 6 Q27 5.5 23 8 Q17 11 13 25 Z" fill="#1C1008" />
      {/* Left side hair flowing down */}
      <path d="M13 25 Q10 34 12 40 Q16 28 20 25" fill="#1C1008" />
      {/* Right side hair flowing down */}
      <path d="M47 25 Q50 34 48 40 Q44 28 40 25" fill="#1C1008" />
      {/* Hair wave lines on top — swept-back texture */}
      <path d="M14 21 Q19 13 27 10.5" stroke="#2E1A0A" strokeWidth="2.2" fill="none" strokeLinecap="round" opacity="0.75" />
      <path d="M15 17 Q20 11 28 9" stroke="#2E1A0A" strokeWidth="1.6" fill="none" strokeLinecap="round" opacity="0.55" />
      <path d="M18 13 Q23 9 30 8" stroke="#2E1A0A" strokeWidth="1.3" fill="none" strokeLinecap="round" opacity="0.4" />
      <path d="M33 8.5 Q39 10 44 15" stroke="#2E1A0A" strokeWidth="2" fill="none" strokeLinecap="round" opacity="0.7" />
      <path d="M32 10 Q38 11.5 43 17" stroke="#2E1A0A" strokeWidth="1.4" fill="none" strokeLinecap="round" opacity="0.5" />
      {/* Subtle dark-gray variation (a few silver hairs, not salt-and-pepper) */}
      <path d="M16 18 Q20 13 26 11" stroke="#7A6A58" strokeWidth="1.2" fill="none" strokeLinecap="round" opacity="0.55" />
      <path d="M35 10 Q40 12 44 17" stroke="#7A6A58" strokeWidth="1.2" fill="none" strokeLinecap="round" opacity="0.55" />
      {/* ── Ears ── */}
      <ellipse cx="13" cy="29" rx="3.2" ry="4.5" fill="#BE9060" />
      <ellipse cx="13" cy="29" rx="1.4" ry="2.4" fill="#A87848" />
      <ellipse cx="47" cy="29" rx="3.2" ry="4.5" fill="#BE9060" />
      <ellipse cx="47" cy="29" rx="1.4" ry="2.4" fill="#A87848" />
      {/* ── Eyebrows: dark brown, strong, slightly arched ── */}
      <path d="M14 19.5 Q19 17 25 18.5" stroke="#150A03" strokeWidth="2.7" strokeLinecap="round" fill="none" />
      <path d="M35 18.5 Q41 17 46 19.5" stroke="#150A03" strokeWidth="2.7" strokeLinecap="round" fill="none" />
      {/* ── Eyes: warm hazel-brown, gentle squint ── */}
      {/* Left eye */}
      <ellipse cx="19.5" cy="25" rx="5.2" ry="3.6" fill="#ECE7DA" />
      <circle cx="20" cy="25.3" r="2.8" fill="#5A3010" />
      <circle cx="20" cy="25.3" r="1.5" fill="#0A0200" />
      <circle cx="18.8" cy="24.1" r="0.85" fill="white" />
      <path d="M14.3 24.5 Q19.5 20.5 24.7 24.5" stroke="#180805" strokeWidth="1.4" fill="none" strokeLinecap="round" />
      <path d="M15 26.5 Q19.5 29 24 26.5" stroke="#9A7050" strokeWidth="0.7" fill="none" opacity="0.35" />
      {/* Right eye */}
      <ellipse cx="40.5" cy="25" rx="5.2" ry="3.6" fill="#ECE7DA" />
      <circle cx="41" cy="25.3" r="2.8" fill="#5A3010" />
      <circle cx="41" cy="25.3" r="1.5" fill="#0A0200" />
      <circle cx="39.8" cy="24.1" r="0.85" fill="white" />
      <path d="M35.3 24.5 Q40.5 20.5 45.7 24.5" stroke="#180805" strokeWidth="1.4" fill="none" strokeLinecap="round" />
      <path d="M36 26.5 Q40.5 29 45 26.5" stroke="#9A7050" strokeWidth="0.7" fill="none" opacity="0.35" />
      {/* ── Nose: THE key feature — long, prominent, wide rounded tip ── */}
      {/* Bridge sides starting just below brow */}
      <path d="M27 29 Q25 35 24.5 39" stroke="#9A7050" strokeWidth="1.5" fill="none" strokeLinecap="round" />
      <path d="M33 29 Q35 35 35.5 39" stroke="#9A7050" strokeWidth="1.5" fill="none" strokeLinecap="round" />
      {/* Nose tip — wide, rounded */}
      <path d="M21.5 40 Q25.5 44 30 44 Q34.5 44 38.5 40" stroke="#8A6040" strokeWidth="1.6" fill="none" strokeLinecap="round" />
      {/* Left nostril */}
      <path d="M24.5 39 Q21 41.5 21.5 44 Q24 45.5 27.5 44" stroke="#7A5030" strokeWidth="1.3" fill="none" strokeLinecap="round" />
      {/* Right nostril */}
      <path d="M35.5 39 Q39 41.5 38.5 44 Q36 45.5 32.5 44" stroke="#7A5030" strokeWidth="1.3" fill="none" strokeLinecap="round" />
      {/* Bridge top — connects to brow */}
      <path d="M27 29 Q28.5 27 30 27 Q31.5 27 33 29" stroke="#A07858" strokeWidth="0.9" fill="none" opacity="0.5" />
      {/* ── Nasolabial folds ── */}
      <path d="M21.5 42.5 Q19.5 46.5 20.5 50" stroke="#9A7050" strokeWidth="1" fill="none" opacity="0.38" strokeLinecap="round" />
      <path d="M38.5 42.5 Q40.5 46.5 39.5 50" stroke="#9A7050" strokeWidth="1" fill="none" opacity="0.38" strokeLinecap="round" />
      {/* ── Mouth: warm closed smile ── */}
      {/* Upper lip — slight M curve */}
      <path d="M21.5 49.5 Q26 47.5 30 48 Q34 47.5 38.5 49.5" stroke="#7B4828" strokeWidth="1.8" strokeLinecap="round" fill="none" />
      {/* Lower lip */}
      <path d="M23 52 Q30 55 37 52" stroke="#7B4828" strokeWidth="1.4" strokeLinecap="round" fill="none" />
      {/* ── Jaw/chin shading ── */}
      <path d="M14 35 Q13 46 20 52 Q24 56 30 56 Q36 56 40 52 Q47 46 46 35" fill="#9A7050" fillOpacity="0.055" />
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

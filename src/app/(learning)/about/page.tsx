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
    <svg width="64" height="64" viewBox="0 0 60 66" fill="none" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
      {/* ── Shirt: black V-neck, broad shoulders ── */}
      <path d="M0 66 L0 51 Q4 41 17 39 L24 37 L30 50 L36 37 L43 39 Q56 41 60 51 L60 66 Z" fill="#111" />
      <path d="M24 37 L30 48 L36 37" stroke="#222" strokeWidth="1" fill="none" />
      {/* ── Neck ── */}
      <path d="M22 35 L22 42 Q30 46 38 42 L38 35 Q30 39 22 35 Z" fill="#C2986C" />
      {/* ── Face: olive-tan, oval ── */}
      <ellipse cx="30" cy="25" rx="21" ry="22" fill="#C8A47A" />
      {/* ── Hair: main dark mass, swept-back style ── */}
      {/* Outer hair silhouette — higher on top for volume */}
      <path d="M9 22 Q8 4 17 0 Q22 -2 30 -1 Q38 -2 43 0 Q52 4 51 22 Q47 9 40 6 Q35 4 30 4.5 Q25 4 20 6 Q13 9 9 22 Z" fill="#1C1208" />
      {/* Side hair left */}
      <path d="M9 22 Q5 33 7 41 Q12 27 17 23" fill="#1C1208" />
      {/* Side hair right */}
      <path d="M51 22 Q55 33 53 41 Q48 27 43 23" fill="#1C1208" />
      {/* Hair texture / swept-back flow lines (dark brown) */}
      <path d="M11 18 Q17 11 26 9" stroke="#302010" strokeWidth="2" fill="none" strokeLinecap="round" opacity="0.7" />
      <path d="M13 14 Q19 9 27 7.5" stroke="#302010" strokeWidth="1.5" fill="none" strokeLinecap="round" opacity="0.5" />
      {/* Salt-and-pepper gray streaks — prominent throughout */}
      <path d="M10 20 Q14 13 20 10" stroke="#A09080" strokeWidth="1.8" fill="none" strokeLinecap="round" opacity="0.85" />
      <path d="M12 16 Q16 11 22 9" stroke="#B0A090" strokeWidth="1.4" fill="none" strokeLinecap="round" opacity="0.7" />
      <path d="M18 8 Q24 6 30 6" stroke="#908070" strokeWidth="2" fill="none" strokeLinecap="round" opacity="0.65" />
      <path d="M34 6 Q40 7 46 11" stroke="#A09080" strokeWidth="1.8" fill="none" strokeLinecap="round" opacity="0.85" />
      <path d="M37 7 Q43 9 48 14" stroke="#B0A090" strokeWidth="1.4" fill="none" strokeLinecap="round" opacity="0.7" />
      {/* ── Ears ── */}
      <ellipse cx="9.5" cy="27" rx="3.2" ry="4.5" fill="#BF9265" />
      <ellipse cx="9.5" cy="27" rx="1.5" ry="2.4" fill="#A87848" />
      <ellipse cx="50.5" cy="27" rx="3.2" ry="4.5" fill="#BF9265" />
      <ellipse cx="50.5" cy="27" rx="1.5" ry="2.4" fill="#A87848" />
      {/* ── Eyebrows: dark, defined, slightly arched ── */}
      <path d="M12 19 Q17 16 23 17.5" stroke="#140A03" strokeWidth="2.8" strokeLinecap="round" fill="none" />
      <path d="M37 17.5 Q43 16 48 19" stroke="#140A03" strokeWidth="2.8" strokeLinecap="round" fill="none" />
      {/* ── Eyes: warm brown ── */}
      <ellipse cx="18.5" cy="24.5" rx="5.2" ry="4" fill="#EDE8DE" />
      <circle cx="19" cy="25" r="3" fill="#5C3012" />
      <circle cx="19" cy="25" r="1.7" fill="#0A0300" />
      <circle cx="17.7" cy="23.7" r="1" fill="white" />
      <path d="M13.3 24 Q18.5 20 23.7 24" stroke="#180805" strokeWidth="1.3" fill="none" strokeLinecap="round" />
      <ellipse cx="41.5" cy="24.5" rx="5.2" ry="4" fill="#EDE8DE" />
      <circle cx="42" cy="25" r="3" fill="#5C3012" />
      <circle cx="42" cy="25" r="1.7" fill="#0A0300" />
      <circle cx="40.7" cy="23.7" r="1" fill="white" />
      <path d="M36.3 24 Q41.5 20 46.7 24" stroke="#180805" strokeWidth="1.3" fill="none" strokeLinecap="round" />
      {/* ── Nose: prominent, wide tip, visible nostrils ── */}
      {/* Bridge */}
      <path d="M28 28 Q26 33 25.5 37" stroke="#9A7050" strokeWidth="1.4" fill="none" strokeLinecap="round" />
      <path d="M32 28 Q34 33 34.5 37" stroke="#9A7050" strokeWidth="1.4" fill="none" strokeLinecap="round" />
      {/* Tip / bottom of nose */}
      <path d="M22 38.5 Q26 42 30 42 Q34 42 38 38.5" stroke="#9A7050" strokeWidth="1.5" fill="none" strokeLinecap="round" />
      {/* Nostrils */}
      <path d="M25.5 37 Q22 39 22.5 42 Q25 43.5 28.5 42" stroke="#825A35" strokeWidth="1.2" fill="none" strokeLinecap="round" />
      <path d="M34.5 37 Q38 39 37.5 42 Q35 43.5 31.5 42" stroke="#825A35" strokeWidth="1.2" fill="none" strokeLinecap="round" />
      {/* ── Nasolabial folds ── */}
      <path d="M22 40 Q20 44 21 48" stroke="#9A7050" strokeWidth="1" fill="none" opacity="0.4" strokeLinecap="round" />
      <path d="M38 40 Q40 44 39 48" stroke="#9A7050" strokeWidth="1" fill="none" opacity="0.4" strokeLinecap="round" />
      {/* ── Mouth: gentle closed smile ── */}
      <path d="M21.5 48.5 Q26 46.5 30 47 Q34 46.5 38.5 48.5" stroke="#7A4828" strokeWidth="1.8" strokeLinecap="round" fill="none" />
      <path d="M23 51 Q30 54 37 51" stroke="#7A4828" strokeWidth="1.3" strokeLinecap="round" fill="none" />
      {/* ── Jaw depth ── */}
      <path d="M10 33 Q9 45 18 52 Q23 56 30 56 Q37 56 42 52 Q51 45 50 33" fill="#9A7050" fillOpacity="0.06" />
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

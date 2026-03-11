'use client';

import { motion } from 'framer-motion';
import {
  Code2, Github, Zap, Database, ShieldCheck, FolderGit2,
  GitBranch, Webhook, BotMessageSquare, RefreshCw, ShieldAlert, FileCode2,
} from 'lucide-react';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';

const stack = [
  'Next.js 16', 'TypeScript', 'Tailwind CSS', 'shadcn/ui',
  'Zustand', 'Framer Motion', 'Shiki', 'Recharts', 'Anthropic SDK',
];

const arch = [
  {
    icon: FileCode2,
    color: 'text-blue-500',
    bg: 'bg-blue-500/10',
    title: 'Content as typed TypeScript',
    desc: 'All lesson content lives in src/data/modules.ts as a typed block DSL — headings, code blocks, callouts, tables, quizzes. LessonContent.tsx is the universal renderer. No CMS, no Markdown files — just type-safe data.',
    snippet: '{ type: "code", language: "bash", code: "claude /init" }',
  },
  {
    icon: FolderGit2,
    color: 'text-teal-500',
    bg: 'bg-teal-500/10',
    title: 'Exercise repo mapping',
    desc: 'exercisePaths.ts maintains a 1-to-1 map of every lesson ID → exercise folder path in the companion exercises repo. Lesson detail pages read this map to link directly to the matching starter folder on GitHub.',
    snippet: "'lesson-7-6': 'module-05-sub-agents/lesson-05-worktree-isolation'",
  },
  {
    icon: ShieldAlert,
    color: 'text-red-500',
    bg: 'bg-red-500/10',
    title: 'Pre-push exercise sync guard',
    desc: 'A Husky pre-push hook runs three checks before every git push: TypeScript compilation, Vitest unit tests, and an exercise sync check. The sync check parses all lesson IDs from modules.ts and blocks the push if any are missing from exercisePaths.ts.',
    snippet: 'npx tsc --noEmit && npm test && node -e "...sync check..."',
  },
  {
    icon: Webhook,
    color: 'text-orange-500',
    bg: 'bg-orange-500/10',
    title: 'PostToolUse auto-sync directive',
    desc: "A Claude Code PostToolUse hook (lesson-change-check.sh) fires every time modules.ts, exercisePaths.ts, or quizzes.ts is written. It injects a directive into Claude's context with the diff and step-by-step instructions to update the exercises repo via the GitHub API — without waiting for the user to ask.",
    snippet: "matcher: Write → lesson-change-check.sh → 🔄 LESSON CONTENT AUTO-SYNC",
  },
  {
    icon: BotMessageSquare,
    color: 'text-yellow-500',
    bg: 'bg-yellow-500/10',
    title: 'Model cost guard hook',
    desc: "A UserPromptSubmit hook (model-guard.sh) inspects every incoming prompt. If the current model is Sonnet or Opus and the prompt is short with simple-task keywords (rename, fix typo, format…), it injects a cost tip suggesting Haiku — which handles those tasks at ~20× lower cost.",
    snippet: '⚠️ Cost tip: this looks like a simple task. Consider Haiku.',
  },
  {
    icon: RefreshCw,
    color: 'text-purple-500',
    bg: 'bg-purple-500/10',
    title: 'Automated What\'s New pipeline',
    desc: 'A GitHub Actions workflow runs every Monday morning. It fetches the Claude Code CHANGELOG.md from GitHub, sends it to the Claude Haiku API with the current whats-new.ts as context, and asks it to identify new features not yet listed. If any are found, it opens a pull request with the proposed entries for review.',
    snippet: 'cron: "0 9 * * 1" → fetch CHANGELOG → Haiku API → create-pull-request',
  },
  {
    icon: Database,
    color: 'text-cyan-500',
    bg: 'bg-cyan-500/10',
    title: 'Neon PostgreSQL + Drizzle ORM',
    desc: 'Progress and user data are persisted in a serverless Neon PostgreSQL database. Drizzle ORM provides fully type-safe, schema-driven queries with zero runtime overhead and migration support.',
    snippet: 'db.select().from(progress).where(eq(progress.userId, id))',
  },
  {
    icon: ShieldCheck,
    color: 'text-violet-500',
    bg: 'bg-violet-500/10',
    title: 'Clerk Authentication',
    desc: 'User sign-up, sign-in, and session management are handled by Clerk, with email/password and OAuth providers. Middleware protects all learning routes; the user ID flows through to the Neon database for per-user progress tracking.',
    snippet: 'authMiddleware({ publicRoutes: ["/", "/about"] })',
  },
];

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
        <Card className="mb-10 border-primary/20 bg-primary/4">
          <CardContent className="pt-6 pb-5">
            <div className="flex items-start gap-2">
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

        {/* ── Architecture ── */}
        <h2 className="text-base font-semibold mb-1">Architecture</h2>
        <p className="text-xs text-muted-foreground mb-4">How the platform is built and kept in sync.</p>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 mb-10">
          {arch.map((a, i) => (
            <motion.div
              key={a.title}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.04 * i }}
            >
              <Card className="hover:border-primary/30 transition-colors h-full">
                <CardContent className="pt-4 flex flex-col gap-3">
                  <div className="flex items-center gap-2">
                    <div className={`w-8 h-8 rounded-lg ${a.bg} flex items-center justify-center flex-shrink-0`}>
                      <a.icon className={`h-4 w-4 ${a.color}`} />
                    </div>
                    <p className="text-sm font-medium leading-tight">{a.title}</p>
                  </div>
                  <p className="text-xs text-muted-foreground leading-relaxed">{a.desc}</p>
                  <code className="text-[10px] font-mono bg-muted px-2 py-1.5 rounded text-muted-foreground/80 break-all leading-relaxed">
                    {a.snippet}
                  </code>
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

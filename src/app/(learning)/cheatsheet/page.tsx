'use client';

import { motion } from 'framer-motion';
import { Printer, BookMarked } from 'lucide-react';

const fade = (i: number) => ({
  initial: { opacity: 0, y: 12 },
  animate: { opacity: 1, y: 0 },
  transition: { delay: i * 0.05, duration: 0.35 },
});

function SectionNum({ n }: { n: number }) {
  return (
    <span className="inline-flex items-center justify-center w-6 h-6 rounded-full bg-primary text-primary-foreground text-xs font-bold shrink-0">
      {n}
    </span>
  );
}

function SectionCard({ n, title, children }: { n: number; title: string; children: React.ReactNode }) {
  return (
    <motion.div {...fade(n)} className="rounded-xl border bg-card p-4 flex flex-col gap-3 print:break-inside-avoid">
      <div className="flex items-center gap-2">
        <SectionNum n={n} />
        <h2 className="font-bold text-sm">{title}</h2>
      </div>
      <div className="text-xs text-muted-foreground space-y-1.5">{children}</div>
    </motion.div>
  );
}

function Code({ children }: { children: string }) {
  return (
    <pre className="bg-muted rounded-md font-mono text-[10.5px] p-2.5 overflow-x-auto whitespace-pre leading-relaxed text-foreground">
      {children}
    </pre>
  );
}

function Cmd({ children }: { children: React.ReactNode }) {
  return <code className="bg-muted px-1 py-0.5 rounded font-mono text-[10px] text-foreground">{children}</code>;
}

function Row({ label, desc }: { label: string; desc: string }) {
  return (
    <div className="flex gap-2 border-b border-border/50 pb-1 last:border-0 last:pb-0">
      <Cmd>{label}</Cmd>
      <span className="text-muted-foreground">{desc}</span>
    </div>
  );
}

function Bullet({ children }: { children: React.ReactNode }) {
  return <p className="flex gap-1.5"><span className="text-primary shrink-0">›</span><span>{children}</span></p>;
}

function Tag({ children, color = 'bg-primary/15 text-primary' }: { children: string; color?: string }) {
  return <span className={`inline-block px-1.5 py-0.5 rounded text-[10px] font-medium ${color}`}>{children}</span>;
}

export default function CheatsheetPage() {
  return (
    <div className="min-h-screen pb-16 print:pb-0">

      {/* ── Hero ── */}
      <motion.div
        initial={{ opacity: 0, y: -8 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4 }}
        className="border-b bg-card px-6 py-8 print:py-4"
      >
        <div className="max-w-5xl mx-auto flex items-start justify-between gap-4 flex-wrap">
          <div className="flex items-center gap-3">
            <div className="p-2 rounded-lg bg-primary/10">
              <BookMarked className="h-6 w-6 text-primary" />
            </div>
            <div>
              <h1 className="text-2xl font-bold tracking-tight">
                Claude Code Mastery <span className="text-primary">Cheatsheet</span>
              </h1>
              <p className="text-xs text-muted-foreground mt-0.5">
                2026 Edition · Getting Started · Memory · Skills · Hooks · Context · Cost · Keyboard
              </p>
            </div>
          </div>
          <button
            onClick={() => window.print()}
            className="print:hidden flex items-center gap-2 px-3 py-2 rounded-lg border bg-card hover:bg-muted text-sm font-medium transition-colors"
          >
            <Printer className="h-4 w-4" />
            Print / Save PDF
          </button>
        </div>
      </motion.div>

      {/* ── Grid ── */}
      <div className="max-w-5xl mx-auto px-4 py-6 print:px-2 print:py-2">
        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-4 print:grid-cols-3 print:gap-3">

          {/* 1 — Getting Started */}
          <SectionCard n={1} title="Getting Started">
            <Code>{`npm install -g @anthropic-ai/claude-code`}</Code>
            <Code>{`cd your-project\nclaude`}</Code>
            <Bullet><Cmd>/init</Cmd> — scans codebase, creates CLAUDE.md</Bullet>
            <Bullet><Cmd>/doctor</Cmd> — verify installation health</Bullet>
            <Bullet><Cmd>/login</Cmd> — authenticate with Anthropic</Bullet>
          </SectionCard>

          {/* 2 — Memory Layers */}
          <SectionCard n={2} title="Memory Layers">
            <div className="space-y-1.5">
              {[
                { path: '~/.claude/CLAUDE.md', label: 'Global', desc: 'all projects, personal prefs' },
                { path: '.claude/CLAUDE.md', label: 'Project', desc: 'team shared, commit to Git' },
                { path: '~/.claude/projects/<hash>/memory/', label: 'Auto', desc: 'per-project, persists across sessions' },
                { path: 'live conversation', label: 'Session', desc: 'gone on /clear' },
              ].map(({ path, label, desc }) => (
                <div key={label} className="flex items-start gap-2 border-b border-border/40 pb-1.5 last:border-0">
                  <Tag color="bg-primary/15 text-primary">{label}</Tag>
                  <div><Cmd>{path}</Cmd><span className="text-muted-foreground ml-1">{desc}</span></div>
                </div>
              ))}
            </div>
            <Bullet>Keep each file <strong>under 200 lines</strong></Bullet>
            <Bullet>Run <Cmd>/memory</Cmd> to edit all memory files</Bullet>
          </SectionCard>

          {/* 3 — Commands vs Skills */}
          <SectionCard n={3} title="Commands vs Skills">
            <div className="space-y-2">
              {[
                { tag: 'Command', color: 'bg-blue-500/15 text-blue-600 dark:text-blue-400', desc: 'Hardcoded in Claude Code binary', ex: '/btw, /clear, /plan' },
                { tag: 'Bundled', color: 'bg-purple-500/15 text-purple-600 dark:text-purple-400', desc: 'Anthropic .md shipped with Claude Code', ex: '/simplify, /batch, /loop' },
                { tag: 'Custom', color: 'bg-green-500/15 text-green-600 dark:text-green-400', desc: 'Your .md in .claude/commands/', ex: '/my-skill' },
                { tag: 'Hook', color: 'bg-orange-500/15 text-orange-600 dark:text-orange-400', desc: 'Shell script on events', ex: 'PostToolUse, Stop' },
              ].map(({ tag, color, desc, ex }) => (
                <div key={tag} className="border-b border-border/40 pb-1.5 last:border-0">
                  <div className="flex items-center gap-1.5 mb-0.5">
                    <Tag color={color}>{tag}</Tag>
                    <span className="text-[10px] text-muted-foreground">{ex}</span>
                  </div>
                  <p className="pl-0.5">{desc}</p>
                </div>
              ))}
            </div>
            <div className="bg-muted/60 rounded p-2 text-[10px]">
              <strong>Quick test:</strong> Works on fresh machine with no <Cmd>.claude/</Cmd>? → command or bundled skill
            </div>
          </SectionCard>

          {/* 4 — Key Slash Commands */}
          <SectionCard n={4} title="Key Slash Commands">
            <div className="space-y-0.5">
              {[
                ['/init', 'Generate CLAUDE.md from codebase'],
                ['/compact', 'Compress context (~90% token reduction)'],
                ['/context', 'Visualize context window usage'],
                ['/btw', 'Side question — ephemeral, not saved'],
                ['/plan', 'Enter plan mode before executing'],
                ['/fork', 'Branch conversation from this point'],
                ['/diff', 'Interactive git diff viewer'],
                ['/rewind', 'Roll back to previous checkpoint'],
                ['/cost', 'Token usage + USD cost so far'],
                ['/model', 'Switch Claude model mid-session'],
                ['/skills', 'List all available skills'],
                ['/hooks', 'Manage hooks interactively'],
              ].map(([cmd, desc]) => (
                <Row key={cmd} label={cmd} desc={desc} />
              ))}
            </div>
          </SectionCard>

          {/* 5 — Project File Structure */}
          <SectionCard n={5} title="Project File Structure">
            <div className="bg-muted rounded-md p-2.5 font-mono text-[10px] leading-5 text-foreground select-none">
              <span className="text-primary font-semibold">your-project/</span>
              <div className="ml-1 mt-0.5 pl-2 border-l border-border space-y-0.5">
                <div>CLAUDE.md</div>
                <div>
                  <span className="text-primary">.claude/</span>
                  <div className="ml-1 mt-0.5 pl-2 border-l border-border space-y-0.5">
                    <div>settings.json</div>
                    <div>settings.local.json</div>
                    <div>
                      <span className="text-primary">commands/</span>
                      <div className="ml-1 mt-0.5 pl-2 border-l border-border">skill.md</div>
                    </div>
                    <div>
                      <span className="text-primary">hooks/</span>
                      <div className="ml-1 mt-0.5 pl-2 border-l border-border">guard.sh</div>
                    </div>
                  </div>
                </div>
                <div>.gitignore</div>
              </div>
            </div>
            <div className="space-y-0.5">
              <p><Cmd>CLAUDE.md</Cmd> — auto-loaded every session</p>
              <p><Cmd>commands/skill.md</Cmd> — becomes <Cmd>/skill</Cmd></p>
              <p><Cmd>settings.json</Cmd> — hooks &amp; permissions</p>
            </div>
            <div className="space-y-0.5">
              <Bullet>Commit <Cmd>.claude/commands/</Cmd> to Git — whole team gets skills</Bullet>
              <Bullet>Add <Cmd>settings.local.json</Cmd> to .gitignore</Bullet>
            </div>
          </SectionCard>

          {/* 6 — Writing Skills */}
          <SectionCard n={6} title="Writing Skills">
            <Code>{`---
description: Generate commit message
---

# /commit-msg

Analyse staged diff and write a
conventional commit message.

Run \`git diff --staged\` first.
Use $ARGUMENTS for user input.`}</Code>
            <div className="space-y-0.5">
              <Bullet>Filename = command: <Cmd>review.md</Cmd> → <Cmd>/review</Cmd></Bullet>
              <Bullet>Use <Cmd>$ARGUMENTS</Cmd> for user-supplied context</Bullet>
              <Bullet><Cmd>~/.claude/commands/</Cmd> = global (all projects)</Bullet>
              <Bullet>One job per file. Specific beats vague.</Bullet>
            </div>
          </SectionCard>

          {/* 7 — Setting Up Hooks */}
          <SectionCard n={7} title="Setting Up Hooks">
            <Code>{`{
  "hooks": {
    "PreToolUse": [{
      "matcher": "Bash",
      "hooks": [{
        "type": "command",
        "command": "scripts/guard.sh"
      }]
    }]
  }
}`}</Code>
            <div className="flex flex-wrap gap-1">
              {['PreToolUse ⛔', 'PostToolUse', 'PreWrite ⛔', 'PostWrite', 'UserPromptSubmit ⛔', 'Stop', 'Notification'].map(e => (
                <Tag key={e} color={e.includes('⛔') ? 'bg-red-500/10 text-red-600 dark:text-red-400' : 'bg-muted text-muted-foreground'}>{e}</Tag>
              ))}
            </div>
            <Bullet>Exit <Cmd>0</Cmd> = allow · Exit <Cmd>2</Cmd> = block</Bullet>
          </SectionCard>

          {/* 8 — Context Management */}
          <SectionCard n={8} title="Context Management">
            <div className="space-y-1">
              {[
                { cmd: '/context', desc: 'Color grid showing window fullness' },
                { cmd: '/compact [focus]', desc: 'Summarize + keep going, ~90% cheaper' },
                { cmd: '/clear', desc: 'Wipe everything — fresh start' },
                { cmd: '/fork', desc: 'Branch conversation from current point' },
                { cmd: '/rewind', desc: 'Roll back wrong direction' },
              ].map(({ cmd, desc }) => (
                <div key={cmd} className="flex gap-2 border-b border-border/40 pb-1 last:border-0">
                  <Cmd>{cmd}</Cmd>
                  <span>{desc}</span>
                </div>
              ))}
            </div>
            <div className="grid grid-cols-2 gap-1.5 mt-1">
              <div className="bg-green-500/10 text-green-700 dark:text-green-400 rounded p-1.5 text-[10px] text-center font-medium">
                Same task → /compact
              </div>
              <div className="bg-blue-500/10 text-blue-700 dark:text-blue-400 rounded p-1.5 text-[10px] text-center font-medium">
                New task → /clear
              </div>
            </div>
          </SectionCard>

          {/* 9 — Permissions & Safety */}
          <SectionCard n={9} title="Permissions & Safety">
            <Code>{`{
  "permissions": {
    "allow": [
      "Read:*",
      "Bash:git:*",
      "Write:src/**"
    ],
    "deny": [
      "Bash:sudo:*",
      "Read:.env*"
    ]
  }
}`}</Code>
            <div className="space-y-0.5">
              <Bullet><strong>default</strong> — asks for risky actions</Bullet>
              <Bullet><strong>acceptEdits</strong> — auto-approve file edits</Bullet>
              <Bullet><strong>bypassPermissions</strong> — CI only, never local</Bullet>
            </div>
          </SectionCard>

          {/* 10 — Cost Optimization */}
          <SectionCard n={10} title="Cost Optimization">
            <div className="space-y-1 mb-1.5">
              {[
                { model: 'Haiku', color: 'bg-green-500/15 text-green-700 dark:text-green-400', use: 'Renames, formatting, simple edits (~20× cheaper than Opus)' },
                { model: 'Sonnet', color: 'bg-blue-500/15 text-blue-700 dark:text-blue-400', use: 'Feature work, refactoring (best price/perf)' },
                { model: 'Opus', color: 'bg-purple-500/15 text-purple-700 dark:text-purple-400', use: 'Architecture, debugging, planning' },
              ].map(({ model, color, use }) => (
                <div key={model} className="flex gap-2 items-start border-b border-border/40 pb-1 last:border-0">
                  <Tag color={color}>{model}</Tag>
                  <span>{use}</span>
                </div>
              ))}
            </div>
            <Bullet><Cmd>/compact</Cmd> often — cuts input tokens ~90%</Bullet>
            <Bullet><Cmd>/batch</Cmd> for bulk multi-file operations</Bullet>
            <Bullet>Prompt caching for repeated system context</Bullet>
            <Bullet>Use <Cmd>/pick-model</Cmd> skill to auto-recommend</Bullet>
          </SectionCard>

          {/* 11 — Daily Workflow */}
          <SectionCard n={11} title="Daily Workflow">
            <div className="space-y-1">
              {[
                { step: '1', cmd: 'cd project && claude', desc: 'Start fresh session' },
                { step: '2', cmd: '/context', desc: 'Check window state' },
                { step: '3', cmd: '/plan', desc: 'Describe intent, review before executing' },
                { step: '4', cmd: '— work —', desc: 'Focused on one task at a time' },
                { step: '5', cmd: '/compact', desc: 'When context grows large' },
                { step: '6', cmd: '/clear', desc: 'When switching to a different task' },
                { step: '7', cmd: 'git commit', desc: 'Commit frequently, small batches' },
              ].map(({ step, cmd, desc }) => (
                <div key={step} className="flex items-center gap-2">
                  <span className="w-4 h-4 rounded-full bg-primary/20 text-primary text-[9px] font-bold flex items-center justify-center shrink-0">{step}</span>
                  <Cmd>{cmd}</Cmd>
                  <span className="text-muted-foreground truncate">{desc}</span>
                </div>
              ))}
            </div>
          </SectionCard>

          {/* 12 — Keyboard Shortcuts */}
          <SectionCard n={12} title="Keyboard Shortcuts">
            <div className="grid grid-cols-2 gap-x-3">
              {[
                ['Enter', 'Submit message'],
                ['Shift+Enter', 'New line'],
                ['Ctrl+C', 'Interrupt Claude'],
                ['Ctrl+D', 'Exit session'],
                ['Tab', 'Autocomplete'],
                ['Esc', 'Cancel input'],
                ['↑ / ↓', 'Message history'],
                ['/vim', 'Toggle vim mode'],
              ].map(([key, desc]) => (
                <div key={key} className="flex items-center gap-1.5 border-b border-border/40 py-1 last:border-0 col-span-1">
                  <kbd className="bg-muted border border-border rounded px-1 py-0.5 font-mono text-[10px] shrink-0">{key}</kbd>
                  <span className="text-[10px] text-muted-foreground">{desc}</span>
                </div>
              ))}
            </div>
            <div className="mt-2 bg-muted/60 rounded p-2 text-[10px] space-y-0.5">
              <p className="font-medium text-foreground">CLI flags</p>
              <Row label="-p / --print" desc="Non-interactive, pipe mode" />
              <Row label="--model" desc="Set model at startup" />
              <Row label="--continue" desc="Resume last session" />
            </div>
          </SectionCard>

          {/* 13 — What to Put in CLAUDE.md */}
          <SectionCard n={13} title="What to Put in CLAUDE.md">
            <Code>{`# Project
Stack: Next.js 14, TypeScript, Tailwind
Test: npm test | Lint: npm run lint

# Code Style
- Named exports only (no default)
- Functional components, no classes
- zod for all external data validation

# DO NOT
- Never use \`any\` type
- Don't commit .env files
- Don't add console.log in prod code

# Key Paths
- API routes: src/app/api/
- Components: src/components/`}</Code>
            <div className="space-y-0.5">
              <Bullet>Include <strong>how to run</strong> tests, lint, build</Bullet>
              <Bullet>List <strong>forbidden patterns</strong> — saves corrections</Bullet>
              <Bullet>Keep under <strong>200 lines</strong> — every token counts</Bullet>
              <Bullet>Run <Cmd>/init</Cmd> to generate a starter from your codebase</Bullet>
            </div>
          </SectionCard>

          {/* 14 — Non-Interactive / CI Mode */}
          <SectionCard n={14} title="Non-Interactive / CI Mode">
            <Code>{`# One-shot task (no UI)
claude -p "fix the TypeScript errors"

# Pipe input
cat error.log | claude -p "diagnose"
git diff | claude -p "write commit msg"

# CI — skip permission prompts
claude --dangerously-skip-permissions \\
  -p "run tests and fix failures"

# JSON output for scripting
claude -p "list todos" --output-format json

# Resume last session
claude --continue`}</Code>
            <div className="space-y-0.5">
              <Bullet><Cmd>-p</Cmd> exits after one response — no interactive session</Bullet>
              <Bullet>Set <Cmd>ANTHROPIC_API_KEY</Cmd> env var for headless auth</Bullet>
              <Bullet>Use <Cmd>--model</Cmd> to pin model in CI scripts</Bullet>
            </div>
          </SectionCard>

          {/* 15 — Effective Prompting */}
          <SectionCard n={15} title="Effective Prompting">
            <div className="space-y-1.5">
              {[
                { tag: 'Be specific', color: 'bg-green-500/15 text-green-700 dark:text-green-400', tip: 'Name the exact file and function, not "the auth code"' },
                { tag: 'Say what not to change', color: 'bg-red-500/15 text-red-600 dark:text-red-400', tip: '"Fix the bug but don\'t refactor anything else"' },
                { tag: 'Give the why', color: 'bg-blue-500/15 text-blue-700 dark:text-blue-400', tip: 'Context lets Claude make better tradeoffs' },
                { tag: 'Scope the step', color: 'bg-purple-500/15 text-purple-700 dark:text-purple-400', tip: '"Stop after step 1, wait for my review"' },
                { tag: 'Plan first', color: 'bg-orange-500/15 text-orange-700 dark:text-orange-400', tip: 'Use /plan before any multi-file change' },
                { tag: 'Correct fast', color: 'bg-yellow-500/15 text-yellow-700 dark:text-yellow-400', tip: 'Use /rewind early — don\'t let wrong paths grow' },
              ].map(({ tag, color, tip }) => (
                <div key={tag} className="flex gap-2 items-start border-b border-border/40 pb-1.5 last:border-0">
                  <Tag color={color}>{tag}</Tag>
                  <span>{tip}</span>
                </div>
              ))}
            </div>
            <div className="bg-muted/60 rounded p-2 text-[10px] mt-1">
              <strong>Rule of thumb:</strong> if you would send 3 Slack messages to a colleague, write 3 sentences to Claude.
            </div>
          </SectionCard>

        </div>

        {/* Footer */}
        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.7 }}
          className="text-center text-xs text-muted-foreground mt-8 print:mt-4"
        >
          Claude Code Mastery · 2026 Edition · claude-mastery.com
        </motion.p>
      </div>

      {/* Print styles */}
      <style>{`
        @media print {
          nav, aside, header, [data-sidebar], .print\\:hidden { display: none !important; }
          body { background: white !important; }
          * { color-adjust: exact !important; -webkit-print-color-adjust: exact !important; print-color-adjust: exact !important; }
          .grid { display: grid !important; grid-template-columns: repeat(3, 1fr) !important; }
        }
      `}</style>
    </div>
  );
}

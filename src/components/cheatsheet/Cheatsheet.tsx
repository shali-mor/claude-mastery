'use client';

import { useState } from 'react';
import { ChevronDown } from 'lucide-react';

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
  return <p className="flex gap-1.5"><span className="text-primary shrink-0">&#x203A;</span><span>{children}</span></p>;
}

function Tag({ children, color = 'bg-primary/15 text-primary' }: { children: string; color?: string }) {
  return <span className={`inline-block px-1.5 py-0.5 rounded text-[10px] font-medium ${color}`}>{children}</span>;
}

function SectionCard({ n, title, open, onToggle, children }: { n: number; title: string; open: boolean; onToggle: () => void; children: React.ReactNode }) {
  return (
    <div className="rounded-xl border bg-card overflow-hidden">
      <button
        onClick={onToggle}
        className="w-full flex items-center gap-2 p-4 text-left hover:bg-muted/30 transition-colors"
      >
        <span className="inline-flex items-center justify-center w-6 h-6 rounded-full bg-primary text-primary-foreground text-xs font-bold shrink-0">
          {n}
        </span>
        <h3 className="font-bold text-sm flex-1">{title}</h3>
        <ChevronDown className={`h-4 w-4 text-muted-foreground transition-transform ${open ? 'rotate-180' : ''}`} />
      </button>
      {open && (
        <div className="px-4 pb-4 text-xs text-muted-foreground space-y-1.5">{children}</div>
      )}
    </div>
  );
}

export function Cheatsheet() {
  const [openSections, setOpenSections] = useState<Set<number>>(new Set());

  const toggle = (n: number) => {
    setOpenSections(prev => {
      const next = new Set(prev);
      if (next.has(n)) next.delete(n); else next.add(n);
      return next;
    });
  };

  const allOpen = openSections.size === 15;
  const toggleAll = () => {
    if (allOpen) {
      setOpenSections(new Set());
    } else {
      setOpenSections(new Set(Array.from({ length: 15 }, (_, i) => i + 1)));
    }
  };

  return (
    <div>
      <div className="flex items-center gap-3 mb-4">
        <div className="h-px flex-1 bg-border" />
        <h2 className="text-lg font-bold tracking-tight shrink-0">
          Claude Code <span className="text-primary">Cheatsheet</span>
        </h2>
        <div className="h-px flex-1 bg-border" />
      </div>
      <div className="flex justify-center mb-4">
        <button
          onClick={toggleAll}
          className="text-xs text-muted-foreground hover:text-foreground transition-colors"
        >
          {allOpen ? 'Collapse all' : 'Expand all'}
        </button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-4">

        {/* 1 — Getting Started */}
        <SectionCard n={1} title="Getting Started" open={openSections.has(1)} onToggle={() => toggle(1)}>
          <Code>{`npm install -g @anthropic-ai/claude-code`}</Code>
          <Code>{`cd your-project\nclaude`}</Code>
          <Bullet><Cmd>/init</Cmd> — scans codebase, creates CLAUDE.md</Bullet>
          <Bullet><Cmd>/doctor</Cmd> — verify installation health</Bullet>
          <Bullet><Cmd>/login</Cmd> — authenticate with Anthropic</Bullet>
        </SectionCard>

        {/* 2 — Memory Layers */}
        <SectionCard n={2} title="Memory Layers" open={openSections.has(2)} onToggle={() => toggle(2)}>
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
        <SectionCard n={3} title="Commands vs Skills" open={openSections.has(3)} onToggle={() => toggle(3)}>
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
        </SectionCard>

        {/* 4 — Key Slash Commands */}
        <SectionCard n={4} title="Key Slash Commands" open={openSections.has(4)} onToggle={() => toggle(4)}>
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
        <SectionCard n={5} title="Project File Structure" open={openSections.has(5)} onToggle={() => toggle(5)}>
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
                </div>
              </div>
            </div>
          </div>
          <div className="space-y-0.5">
            <p><Cmd>CLAUDE.md</Cmd> — auto-loaded every session</p>
            <p><Cmd>commands/skill.md</Cmd> — becomes <Cmd>/skill</Cmd></p>
            <p><Cmd>settings.json</Cmd> — hooks &amp; permissions</p>
          </div>
        </SectionCard>

        {/* 6 — Writing Skills */}
        <SectionCard n={6} title="Writing Skills" open={openSections.has(6)} onToggle={() => toggle(6)}>
          <Code>{`---
description: Generate commit message
argument-hint: [optional: scope]
allowed-tools: [Bash, Read]
context: fork
---

# /commit-msg

Analyse staged diff and write a
conventional commit message.
Use $ARGUMENTS for scope hint.`}</Code>
          <div className="space-y-0.5">
            <Bullet>Filename = command: <Cmd>review.md</Cmd> → <Cmd>/review</Cmd></Bullet>
            <Bullet><Cmd>$ARGUMENTS</Cmd> · <Cmd>$1</Cmd> <Cmd>$2</Cmd> for positional args</Bullet>
          </div>
        </SectionCard>

        {/* 7 — Setting Up Hooks */}
        <SectionCard n={7} title="Setting Up Hooks" open={openSections.has(7)} onToggle={() => toggle(7)}>
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
            {['PreToolUse', 'PostToolUse', 'PreWrite', 'PostWrite', 'UserPromptSubmit', 'Stop', 'Notification'].map(e => (
              <Tag key={e} color="bg-muted text-muted-foreground">{e}</Tag>
            ))}
          </div>
          <Bullet>Exit <Cmd>0</Cmd> = allow · Exit <Cmd>2</Cmd> = block</Bullet>
        </SectionCard>

        {/* 8 — Context Management */}
        <SectionCard n={8} title="Context Management" open={openSections.has(8)} onToggle={() => toggle(8)}>
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
        <SectionCard n={9} title="Permissions & Safety" open={openSections.has(9)} onToggle={() => toggle(9)}>
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
        <SectionCard n={10} title="Cost Optimization" open={openSections.has(10)} onToggle={() => toggle(10)}>
          <div className="space-y-1 mb-1.5">
            {[
              { model: 'Haiku', color: 'bg-green-500/15 text-green-700 dark:text-green-400', use: 'Renames, formatting, simple edits (~20x cheaper)' },
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
          <Bullet>Use <Cmd>/pick-model</Cmd> skill to auto-recommend</Bullet>
        </SectionCard>

        {/* 11 — Daily Workflow */}
        <SectionCard n={11} title="Daily Workflow" open={openSections.has(11)} onToggle={() => toggle(11)}>
          <div className="space-y-1">
            {[
              { step: '1', cmd: 'cd project && claude', desc: 'Start fresh session' },
              { step: '2', cmd: '/context', desc: 'Check window state' },
              { step: '3', cmd: '/plan', desc: 'Review before executing' },
              { step: '4', cmd: '— work —', desc: 'One task at a time' },
              { step: '5', cmd: '/compact', desc: 'When context grows large' },
              { step: '6', cmd: '/clear', desc: 'Switching to a different task' },
              { step: '7', cmd: 'git commit', desc: 'Commit small batches' },
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
        <SectionCard n={12} title="Keyboard Shortcuts" open={openSections.has(12)} onToggle={() => toggle(12)}>
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
        <SectionCard n={13} title="What to Put in CLAUDE.md" open={openSections.has(13)} onToggle={() => toggle(13)}>
          <Code>{`# Project
Stack: Next.js 14, TypeScript, Tailwind
Test: npm test | Lint: npm run lint

# Code Style
- Named exports only (no default)
- Functional components, no classes
- zod for all external data validation

# DO NOT
- Never use \`any\` type
- Don't commit .env files`}</Code>
          <div className="space-y-0.5">
            <Bullet>Include <strong>how to run</strong> tests, lint, build</Bullet>
            <Bullet>List <strong>forbidden patterns</strong></Bullet>
            <Bullet>Keep under <strong>200 lines</strong></Bullet>
          </div>
        </SectionCard>

        {/* 14 — Non-Interactive / CI Mode */}
        <SectionCard n={14} title="Non-Interactive / CI Mode" open={openSections.has(14)} onToggle={() => toggle(14)}>
          <Code>{`# One-shot task (no UI)
claude -p "fix the TypeScript errors"

# Pipe input
cat error.log | claude -p "diagnose"
git diff | claude -p "write commit msg"

# JSON output for scripting
claude -p "list todos" --output-format json`}</Code>
          <div className="space-y-0.5">
            <Bullet><Cmd>-p</Cmd> exits after one response</Bullet>
            <Bullet>Set <Cmd>ANTHROPIC_API_KEY</Cmd> env var for headless auth</Bullet>
          </div>
        </SectionCard>

        {/* 15 — Effective Prompting */}
        <SectionCard n={15} title="Effective Prompting" open={openSections.has(15)} onToggle={() => toggle(15)}>
          <div className="space-y-1.5">
            {[
              { tag: 'Be specific', color: 'bg-green-500/15 text-green-700 dark:text-green-400', tip: 'Name the exact file, not "the auth code"' },
              { tag: 'Say what not to change', color: 'bg-red-500/15 text-red-600 dark:text-red-400', tip: '"Fix the bug but don\'t refactor"' },
              { tag: 'Give the why', color: 'bg-blue-500/15 text-blue-700 dark:text-blue-400', tip: 'Context lets Claude make better tradeoffs' },
              { tag: 'Plan first', color: 'bg-orange-500/15 text-orange-700 dark:text-orange-400', tip: 'Use /plan before any multi-file change' },
              { tag: 'Correct fast', color: 'bg-yellow-500/15 text-yellow-700 dark:text-yellow-400', tip: 'Use /rewind early' },
            ].map(({ tag, color, tip }) => (
              <div key={tag} className="flex gap-2 items-start border-b border-border/40 pb-1.5 last:border-0">
                <Tag color={color}>{tag}</Tag>
                <span>{tip}</span>
              </div>
            ))}
          </div>
        </SectionCard>

      </div>

      <p className="text-center text-xs text-muted-foreground mt-6">
        Claude Code Mastery · 2026 Edition
      </p>
    </div>
  );
}

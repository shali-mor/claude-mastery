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

  const allOpen = openSections.size === 17;
  const toggleAll = () => {
    if (allOpen) {
      setOpenSections(new Set());
    } else {
      setOpenSections(new Set(Array.from({ length: 17 }, (_, i) => i + 1)));
    }
  };

  return (
    <div>
      <div className="flex items-center gap-3 mb-6">
        <div className="h-px flex-1 bg-border" />
        <h2 className="text-lg font-bold tracking-tight shrink-0">
          Claude Code <span className="text-primary">Cheatsheet</span>
        </h2>
        <button
          onClick={toggleAll}
          className="px-3 py-1 rounded-md border border-border bg-muted/50 hover:bg-muted text-xs font-medium text-foreground transition-colors shrink-0"
        >
          {allOpen ? 'Collapse all' : 'Expand all'}
        </button>
        <div className="h-px flex-1 bg-border" />
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-4">

        {/* 1 — Getting Started */}
        <SectionCard n={1} title="Getting Started" open={openSections.has(1)} onToggle={() => toggle(1)}>
          <Code>{`npm install -g @anthropic-ai/claude-code`}</Code>
          <Code>{`cd your-project\nclaude`}</Code>
          <Bullet><Cmd>/init</Cmd> — scans codebase, creates CLAUDE.md</Bullet>
          <Bullet><Cmd>/doctor</Cmd> — verify installation health</Bullet>
          <Bullet><Cmd>/login</Cmd> — authenticate with Anthropic</Bullet>
          <div className="mt-1.5 bg-muted/60 rounded p-2 text-[10px] space-y-0.5">
            <p className="font-medium text-foreground">Available on</p>
            <div className="flex flex-wrap gap-1">
              {['CLI', 'Desktop App', 'Web (claude.ai/code)', 'VS Code', 'JetBrains'].map(p => (
                <Tag key={p} color="bg-muted text-muted-foreground">{p}</Tag>
              ))}
            </div>
          </div>
        </SectionCard>

        {/* 2 — Memory Layers */}
        <SectionCard n={2} title="Memory Layers" open={openSections.has(2)} onToggle={() => toggle(2)}>
          <div className="space-y-1.5">
            {[
              { path: '~/.claude/CLAUDE.md', label: 'Global', desc: 'all projects, personal prefs' },
              { path: 'CLAUDE.md', label: 'Project', desc: 'team shared, commit to Git' },
              { path: 'CLAUDE.local.md', label: 'Local', desc: 'personal project prefs, gitignored' },
              { path: '.claude/rules/', label: 'Rules', desc: 'path-scoped rules with frontmatter' },
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
          <Bullet>Use <Cmd>@path/to/file</Cmd> to import content into CLAUDE.md</Bullet>
          <Bullet>Run <Cmd>/memory</Cmd> to edit all memory files</Bullet>
        </SectionCard>

        {/* 3 — Commands vs Skills */}
        <SectionCard n={3} title="Commands, Skills & Agents" open={openSections.has(3)} onToggle={() => toggle(3)}>
          <div className="space-y-2">
            {[
              { tag: 'Command', color: 'bg-blue-500/15 text-blue-600 dark:text-blue-400', desc: 'Hardcoded in Claude Code binary', ex: '/btw, /clear, /fast' },
              { tag: 'Bundled', color: 'bg-purple-500/15 text-purple-600 dark:text-purple-400', desc: 'Anthropic skills shipped with Claude Code', ex: '/simplify, /batch, /loop' },
              { tag: 'Custom', color: 'bg-green-500/15 text-green-600 dark:text-green-400', desc: 'Your .md in .claude/commands/', ex: '/my-skill' },
              { tag: 'Hook', color: 'bg-orange-500/15 text-orange-600 dark:text-orange-400', desc: 'Shell/HTTP/prompt on events', ex: 'PreToolUse, Stop' },
              { tag: 'Agent', color: 'bg-pink-500/15 text-pink-600 dark:text-pink-400', desc: 'Subagents in .claude/agents/', ex: 'Explore, Plan' },
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
              ['/fast', 'Toggle fast mode (2.5x faster Opus)'],
              ['/effort', 'Set reasoning: low/medium/high'],
              ['/loop', 'Run prompt on recurring interval'],
              ['/schedule', 'Cloud scheduled tasks (durable)'],
              ['/tasks', 'Manage background tasks'],
              ['/config', 'Consolidated settings UI'],
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
              <div>CLAUDE.local.md</div>
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
                    <span className="text-primary">rules/</span>
                    <div className="ml-1 mt-0.5 pl-2 border-l border-border">api-design.md</div>
                  </div>
                  <div>
                    <span className="text-primary">agents/</span>
                    <div className="ml-1 mt-0.5 pl-2 border-l border-border">reviewer.md</div>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className="space-y-0.5">
            <p><Cmd>CLAUDE.md</Cmd> — auto-loaded every session</p>
            <p><Cmd>CLAUDE.local.md</Cmd> — personal, gitignored</p>
            <p><Cmd>commands/skill.md</Cmd> — becomes <Cmd>/skill</Cmd></p>
            <p><Cmd>rules/</Cmd> — path-scoped instructions</p>
            <p><Cmd>agents/</Cmd> — custom subagent definitions</p>
          </div>
        </SectionCard>

        {/* 6 — Writing Skills */}
        <SectionCard n={6} title="Writing Skills" open={openSections.has(6)} onToggle={() => toggle(6)}>
          <Code>{`---
description: Generate commit message
argument-hint: [optional: scope]
allowed-tools: [Bash, Read]
model: sonnet
effort: high
context: fork
---

# /commit-msg

Analyse staged diff and write a
conventional commit message.
Use $ARGUMENTS for scope hint.`}</Code>
          <div className="space-y-0.5">
            <Bullet>Filename = command: <Cmd>review.md</Cmd> → <Cmd>/review</Cmd></Bullet>
            <Bullet><Cmd>$ARGUMENTS</Cmd> · <Cmd>$1</Cmd> <Cmd>$2</Cmd> for positional args</Bullet>
            <Bullet><Cmd>{'${CLAUDE_SKILL_DIR}'}</Cmd> for bundled scripts/templates</Bullet>
            <Bullet><Cmd>disable-model-invocation: true</Cmd> for manual-only skills</Bullet>
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
          <div className="space-y-1 mb-1">
            <p className="font-medium text-foreground text-[10px]">Hook types</p>
            <div className="flex flex-wrap gap-1">
              {['command', 'http', 'prompt', 'agent'].map(t => (
                <Tag key={t} color="bg-blue-500/15 text-blue-600 dark:text-blue-400">{t}</Tag>
              ))}
            </div>
          </div>
          <div className="space-y-1">
            <p className="font-medium text-foreground text-[10px]">Events</p>
            <div className="flex flex-wrap gap-1">
              {['PreToolUse', 'PostToolUse', 'PreWrite', 'PostWrite', 'UserPromptSubmit', 'Stop', 'SubagentStart', 'SubagentStop', 'PreCompact', 'PostCompact', 'Notification', 'InstructionsLoaded'].map(e => (
                <Tag key={e} color="bg-muted text-muted-foreground">{e}</Tag>
              ))}
            </div>
          </div>
          <Bullet>Exit <Cmd>0</Cmd> = allow · Exit <Cmd>2</Cmd> = block</Bullet>
          <Bullet><Cmd>PreToolUse</Cmd> can return <Cmd>{`{"toolInput": {...}}`}</Cmd> to mutate the call, or <Cmd>defer</Cmd> for external UI approval</Bullet>
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
          <Bullet>Auto-compaction kicks in when context fills</Bullet>
          <Bullet>Claude models support <strong>200K token</strong> context window</Bullet>
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
            <Bullet><strong>plan</strong> — Claude analyzes, no modifications</Bullet>
            <Bullet><strong>acceptEdits</strong> — auto-approve file edits</Bullet>
            <Bullet><strong>auto</strong> — auto-approve with safety classifier</Bullet>
            <Bullet><strong>dontAsk</strong> — deny unless pre-approved</Bullet>
            <Bullet><strong>bypassPermissions</strong> — CI only, never local</Bullet>
          </div>
        </SectionCard>

        {/* 10 — Cost Optimization */}
        <SectionCard n={10} title="Cost Optimization" open={openSections.has(10)} onToggle={() => toggle(10)}>
          <div className="space-y-1 mb-1.5">
            {[
              { model: 'Haiku 4.5', id: 'claude-haiku-4-5-20251001', color: 'bg-green-500/15 text-green-700 dark:text-green-400', use: 'Renames, formatting, simple edits (~20x cheaper)' },
              { model: 'Sonnet 4.6', id: 'claude-sonnet-4-6', color: 'bg-blue-500/15 text-blue-700 dark:text-blue-400', use: 'Feature work, refactoring (best price/perf)' },
              { model: 'Opus 4.6', id: 'claude-opus-4-6', color: 'bg-purple-500/15 text-purple-700 dark:text-purple-400', use: 'Architecture, debugging, planning' },
              { model: 'OpusPlan', id: null, color: 'bg-pink-500/15 text-pink-700 dark:text-pink-400', use: 'Opus plans, Sonnet executes (~5x cheaper than Opus-only)' },
            ].map(({ model, id, color, use }) => (
              <div key={model} className="flex gap-2 items-start border-b border-border/40 pb-1 last:border-0">
                <div className="shrink-0">
                  <Tag color={color}>{model}</Tag>
                  {id && <div className="font-mono text-[9px] text-muted-foreground mt-0.5 pl-0.5">{id}</div>}
                </div>
                <span>{use}</span>
              </div>
            ))}
          </div>
          <Bullet><Cmd>/fast</Cmd> — toggle 2.5x faster Opus output</Bullet>
          <Bullet><Cmd>/effort low|med|high</Cmd> — reduce reasoning cost</Bullet>
          <Bullet><Cmd>/compact</Cmd> often — cuts input tokens ~90%</Bullet>
          <Bullet>Prompt caching is automatic (optimizes repeat context)</Bullet>
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
          <div className="mt-2 bg-muted/60 rounded p-2 text-[10px] space-y-0.5">
            <p className="font-medium text-foreground">Power features</p>
            <Bullet><Cmd>/loop 5m check deploy</Cmd> — recurring checks</Bullet>
            <Bullet><Cmd>/schedule</Cmd> — durable cloud tasks (runs unattended)</Bullet>
            <Bullet><Cmd>/tasks</Cmd> — manage background tasks</Bullet>
            <Bullet><Cmd>/remote-control</Cmd> — continue in claude.ai</Bullet>
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
              ['Ctrl+O', 'Toggle focus view'],
              ['Tab', 'Autocomplete'],
              ['Esc', 'Cancel input'],
              ['↑ / ↓', 'Message history'],
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
            <Row label="--effort" desc="Set reasoning effort level" />
            <Row label="--continue" desc="Resume last session" />
            <Row label="--resume" desc="Resume specific session" />
            <Row label="--remote" desc="Start a web session" />
            <Row label="--add-dir" desc="Add extra directory access" />
            <Row label="--worktree" desc="Work in isolated git worktree" />
          </div>
          <Bullet>Customize bindings: <Cmd>~/.claude/keybindings.json</Cmd></Bullet>
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
            <Bullet>Use <Cmd>.claude/rules/</Cmd> for path-scoped instructions:</Bullet>
          </div>
          <Code>{`# .claude/rules/api-design.md
---
paths: ["src/api/**/*.ts"]
---
Endpoints must validate input with zod.
Include OpenAPI docs for each route.`}</Code>
        </SectionCard>

        {/* 14 — Non-Interactive / CI Mode */}
        <SectionCard n={14} title="Non-Interactive / CI Mode" open={openSections.has(14)} onToggle={() => toggle(14)}>
          <Code>{`# One-shot task (no UI)
claude -p "fix the TypeScript errors"

# Pipe input
cat error.log | claude -p "diagnose"
git diff | claude -p "write commit msg"

# JSON output for scripting
claude -p "list todos" --output-format json

# Resume a session non-interactively
claude --resume <session-id> -p "continue"

# Start a remote web session
claude --remote`}</Code>
          <div className="space-y-0.5">
            <Bullet><Cmd>-p</Cmd> exits after one response</Bullet>
            <Bullet><Cmd>--resume</Cmd> continue a specific session</Bullet>
            <Bullet><Cmd>--remote</Cmd> run as a web session</Bullet>
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
              { tag: 'Tune effort', color: 'bg-purple-500/15 text-purple-700 dark:text-purple-400', tip: '/effort low for simple, high for complex' },
              { tag: 'Use @references', color: 'bg-pink-500/15 text-pink-700 dark:text-pink-400', tip: '@file#10-20 for specific line ranges' },
            ].map(({ tag, color, tip }) => (
              <div key={tag} className="flex gap-2 items-start border-b border-border/40 pb-1.5 last:border-0">
                <Tag color={color}>{tag}</Tag>
                <span>{tip}</span>
              </div>
            ))}
          </div>
        </SectionCard>

        {/* 16 — Sub-Agents & Worktrees */}
        <SectionCard n={16} title="Sub-Agents & Worktrees" open={openSections.has(16)} onToggle={() => toggle(16)}>
          <Code>{`// Spawn a parallel agent in isolated worktree
Agent({
  subagent_type: "Explore",
  isolation: "worktree",
  run_in_background: true,
  prompt: "Refactor auth module"
})`}</Code>
          <div className="space-y-0.5">
            {[
              { tag: 'isolation: worktree', color: 'bg-blue-500/15 text-blue-600 dark:text-blue-400', desc: 'Each agent gets its own git copy — no conflicts' },
              { tag: 'run_in_background', color: 'bg-green-500/15 text-green-700 dark:text-green-400', desc: 'Fire-and-forget; notified on completion' },
              { tag: 'subagent_type', color: 'bg-purple-500/15 text-purple-700 dark:text-purple-400', desc: 'Explore · Plan · general-purpose · gsd-executor' },
            ].map(({ tag, color, desc }) => (
              <div key={tag} className="flex gap-2 items-start border-b border-border/40 pb-1 last:border-0">
                <Tag color={color}>{tag}</Tag>
                <span>{desc}</span>
              </div>
            ))}
          </div>
          <Bullet>Worktree is auto-cleaned if agent makes no changes</Bullet>
          <Bullet>Use <Cmd>SendMessage</Cmd> to resume a running agent by ID</Bullet>
        </SectionCard>

        {/* 17 — Remote Triggers & Cron */}
        <SectionCard n={17} title="Remote Triggers & Cron" open={openSections.has(17)} onToggle={() => toggle(17)}>
          <Code>{`# Schedule a daily task (cron syntax)
/schedule "0 9 * * 1-5" "run /gsd:progress"

# Self-paced loop — model picks its own interval
/loop /check-pr-status

# Fixed-interval loop
/loop 30m /sync-docs`}</Code>
          <div className="space-y-0.5">
            {[
              ['/schedule', 'Create/list/manage cron triggers'],
              ['/loop [interval] [cmd]', 'Repeat a task; omit interval to self-pace'],
              ['RemoteTrigger', 'API tool: create triggers programmatically'],
            ].map(([cmd, desc]) => (
              <Row key={cmd} label={cmd} desc={desc} />
            ))}
          </div>
          <Bullet>Each trigger runs in a <strong>fresh session</strong> with full MCP + shell access</Bullet>
          <Bullet>Cache-aware: sleep &lt; 270 s keeps context warm; &gt; 300 s pays cache-miss cost</Bullet>
        </SectionCard>

      </div>

      <p className="text-center text-xs text-muted-foreground mt-6">
        Claude Code Mastery · 2026 Edition
      </p>
    </div>
  );
}

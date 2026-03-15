import type { Module } from '@/types/module';

// Placeholder — will be replaced with full content
export const modules: Module[] = [
  {
    id: 'module-1',
    title: 'Claude Code Basics',
    description: 'Learn all 29 slash commands, keyboard shortcuts, CLI flags, and permission modes.',
    icon: 'Terminal',
    color: 'blue',
    quizId: 'quiz-module-1',
    lessons: [
      {
        id: 'lesson-1-1',
        title: 'Getting Started with Claude Code',
        description: 'Install Claude Code and learn the basics of interactive AI-assisted development.',
        estimatedMinutes: 7,
        blocks: [
          {
            type: 'callout',
            calloutVariant: 'tip',
            content: '**Want everything on one page?** The [Cheatsheet](/cheatsheet) covers all key commands, memory layers, skills, hooks, context management, and keyboard shortcuts — great to keep open while you work through the course.',
          },
          {
            type: 'lesson-player',
          },
          {
            type: 'text',
            content: 'Claude Code is an agentic coding tool that operates directly in your terminal, understands your codebase, and helps you ship code faster through natural language commands.',
          },
          {
            type: 'callout',
            calloutVariant: 'info',
            content: 'Claude Code requires Node.js 18+ and an Anthropic API key. It connects directly to the Anthropic API from your machine.',
          },
          {
            type: 'steps',
            content: 'Installing Claude Code',
            steps: [
              'Install globally via npm: npm install -g @anthropic-ai/claude-code',
              'Navigate to your project directory: cd ~/my-project',
              'Run claude to start an interactive session',
              'Type /help to see all available commands',
            ],
          },
          {
            type: 'code',
            language: 'bash',
            content: `# Install Claude Code globally
npm install -g @anthropic-ai/claude-code

# Start an interactive session in your project
cd ~/my-project && claude

# Run a one-off prompt (non-interactive)
claude -p "Summarize this codebase"`,
          },
          {
            type: 'tip',
            content: 'Run /init in a new project to generate a CLAUDE.md file. Claude reads this on startup to understand your project conventions, tech stack, and workflow preferences.',
          },
        ],
      },
      {
        id: 'lesson-1-2',
        title: 'Slash Commands Deep Dive',
        description: 'Master all 29 slash commands with practical examples.',
        estimatedMinutes: 8,
        blocks: [
          {
            type: 'lesson-player',
          },
          {
            type: 'text',
            content: 'Claude Code ships with 29 built-in slash commands. They cover everything from context management and model switching to GitHub integration and MCP servers. Here they are grouped by what they do.',
          },
          {
            type: 'heading',
            level: 2,
            content: 'Session & context',
          },
          {
            type: 'table',
            content: '',
            headers: ['Command', 'What it does'],
            rows: [
              ['/clear', 'Wipe the entire conversation history and start fresh'],
              ['/compact [focus]', 'Replace history with an AI summary — preserves context at ~10% of the token cost. Pass optional focus instructions, e.g. `/compact focus on auth changes`'],
              ['/cost', 'Show input/output token counts and estimated USD cost for this session'],
              ['/status', 'Show the active model, permission mode, loaded CLAUDE.md files, and connected MCP servers'],
              ['/reset', 'Reset session state and conversation history (deeper than /clear)'],
              ['/todo', 'View the in-session task list Claude uses to track multi-step work'],
            ],
          },
          {
            type: 'callout',
            calloutVariant: 'tip',
            content: '**The /compact loop:** Run `/cost` when a session feels heavy. If input tokens are high, run `/compact` — it generates a summary that keeps your context but costs far less on subsequent turns.',
          },
          {
            type: 'heading',
            level: 2,
            content: 'Project setup',
          },
          {
            type: 'table',
            content: '',
            headers: ['Command', 'What it does'],
            rows: [
              ['/init', 'Analyse the project and generate a CLAUDE.md with your stack, conventions, and key files. Claude reads this on every session start.'],
              ['/memory', 'Open the CLAUDE.md file for editing. Changes take effect on the next turn.'],
            ],
          },
          {
            type: 'heading',
            level: 2,
            content: 'Model & configuration',
          },
          {
            type: 'table',
            content: '',
            headers: ['Command', 'What it does'],
            rows: [
              ['/model [id]', 'Switch Claude model mid-session. Run without an argument to see a picker. Switch to Haiku for cheap tasks, Opus for hard problems.'],
              ['/config', 'Open the settings UI for model, permissions, hooks, and other preferences. Saves to `~/.claude/settings.json` or `.claude/settings.json`.'],
              ['/permissions', 'View and adjust what actions Claude can take without asking. Restrict or expand file writes, bash commands, and network access.'],
              ['/theme [light|dark|system]', 'Switch the terminal colour theme. Preference is saved.'],
              ['/vim', 'Toggle Vim keybindings in the input prompt (normal/insert mode).'],
              ['/terminal-setup', 'Configure shell integration (keyboard shortcuts, shell hooks) for your terminal and shell (bash/zsh/fish).'],
            ],
          },
          {
            type: 'heading',
            level: 2,
            content: 'Code review & GitHub',
          },
          {
            type: 'table',
            content: '',
            headers: ['Command', 'What it does'],
            rows: [
              ['/review', 'Ask Claude to review uncommitted changes (`git diff`). Flags issues, suggests improvements, and catches security problems before you commit.'],
              ['/pr-comments', 'Fetch open PR review comments from GitHub for the current branch. Claude can then help you address each one. Requires `gh` CLI.'],
              ['/install-github-app', 'Install the Claude Code GitHub App on your repo to enable automated PR reviews and CI workflows.'],
            ],
          },
          {
            type: 'heading',
            level: 2,
            content: 'MCP & integrations',
          },
          {
            type: 'table',
            content: '',
            headers: ['Command', 'What it does'],
            rows: [
              ['/mcp [list|add|remove]', 'Manage Model Context Protocol server connections — databases, APIs, file systems, and custom tools.'],
              ['/run-mcp-tool <server> <tool>', 'Directly invoke a tool from a connected MCP server. Useful for testing integrations.'],
              ['/web-search', 'Toggle or configure Claude\'s ability to search the web for current information and documentation.'],
            ],
          },
          {
            type: 'heading',
            level: 2,
            content: 'Auth & account',
          },
          {
            type: 'table',
            content: '',
            headers: ['Command', 'What it does'],
            rows: [
              ['/login', 'Authenticate with Anthropic. Sets up the API key for first-time setup or after a key rotation.'],
              ['/logout', 'Remove stored API credentials. Use on shared machines or before rotating keys.'],
            ],
          },
          {
            type: 'heading',
            level: 2,
            content: 'Help & diagnostics',
          },
          {
            type: 'table',
            content: '',
            headers: ['Command', 'What it does'],
            rows: [
              ['/help', 'List all available commands with brief descriptions.'],
              ['/doctor', 'Run diagnostics: API key validity, network, Node version, config integrity. First stop for troubleshooting.'],
              ['/release-notes', 'Show the changelog for the current Claude Code version. Check this after an update.'],
              ['/feedback', 'Submit feature requests or general feedback to Anthropic.'],
              ['/bug', 'Report a bug with captured session context sent directly to Anthropic.'],
            ],
          },
          {
            type: 'heading',
            level: 2,
            content: 'Exit',
          },
          {
            type: 'table',
            content: '',
            headers: ['Command', 'What it does'],
            rows: [
              ['/exit', 'Exit the Claude Code session cleanly. Same as Ctrl+D.'],
              ['/quit', 'Alias for /exit.'],
            ],
          },
          {
            type: 'callout',
            calloutVariant: 'info',
            content: 'The commands above are **built-in** — they ship with Claude Code. You can also create your own slash commands (called **skills**) by adding Markdown files to `.claude/commands/`. Skills are covered in depth in Module 2.',
          },
        ],
      },
      {
        id: 'lesson-1-3',
        title: 'CLI Flags & Keyboard Shortcuts',
        description: 'Run Claude non-interactively and navigate faster with keyboard shortcuts.',
        estimatedMinutes: 5,
        blocks: [
          {
            type: 'lesson-player',
          },
          {
            type: 'text',
            content: 'CLI flags enable powerful scripting and automation scenarios, while keyboard shortcuts speed up your interactive sessions significantly.',
          },
          {
            type: 'code',
            language: 'bash',
            content: `# Run a single prompt and exit (great for scripts)
claude -p "List all TODO comments in this file" < src/app.ts

# Specify a model directly
claude --model claude-opus-4-6

# Continue the most recent session
claude --continue  # or: claude -c

# Skip all permission prompts (for automated CI use)
claude --dangerously-skip-permissions -p "Run the tests"

# Output as JSON (useful in pipelines)
claude --output-format json -p "What does this function do?" < utils.ts`,
          },
          {
            type: 'table',
            content: 'Keyboard shortcuts',
            headers: ['Shortcut', 'Action'],
            rows: [
              ['Enter', 'Submit message'],
              ['Shift+Enter', 'Insert newline (multi-line input)'],
              ['Up / Down Arrow', 'Navigate message history'],
              ['Ctrl+C', 'Interrupt / cancel current operation'],
              ['Ctrl+D', 'Exit the session'],
              ['Tab', 'Autocomplete file paths and commands'],
              ['Esc', 'Cancel current prompt'],
            ],
          },
        ],
      },
      {
        id: 'lesson-1-4',
        title: 'Permission Modes & Safety',
        description: 'Understand the three permission modes and when to use each.',
        estimatedMinutes: 5,
        blocks: [
          {
            type: 'lesson-player',
          },
          {
            type: 'text',
            content: 'Claude Code has three permission modes that control how much autonomy it has. Choosing the right mode balances speed with safety.',
          },
          {
            type: 'table',
            content: 'Permission modes',
            headers: ['Mode', 'Flag', 'Behavior'],
            rows: [
              ['default', '(none)', 'Prompts for permission on potentially dangerous operations'],
              ['acceptEdits', '--permission-mode acceptEdits', 'Auto-approves file edits; still prompts for shell commands'],
              ['bypassPermissions', '--dangerously-skip-permissions', 'Skips ALL prompts — use only in trusted automated environments'],
            ],
          },
          {
            type: 'callout',
            calloutVariant: 'warning',
            content: 'Never use --dangerously-skip-permissions in interactive sessions or on production systems. It allows Claude to execute any command without confirmation.',
          },
          {
            type: 'tip',
            content: 'For local development, acceptEdits mode strikes the best balance — fast for coding tasks, but still asks before running shell commands or making network requests.',
          },
        ],
      },
      // ── Lesson 1-5: IDE Integration ─────────────────────────────────────
      {
        id: 'lesson-1-5',
        title: 'IDE Integration — VS Code & JetBrains',
        description: 'Run Claude Code directly inside your editor — sidebar chat, inline diff review, and context pinning without leaving VS Code or JetBrains.',
        estimatedMinutes: 7,
        blocks: [
          { type: 'lesson-player' },
          {
            type: 'text',
            content: 'Claude Code isn\'t terminal-only. Both VS Code and JetBrains IDEs have first-party extensions that embed Claude Code in a sidebar panel — giving you inline diffs, file context, and chat without alt-tabbing to a terminal.',
          },
          {
            type: 'heading', level: 2,
            content: 'VS Code extension',
          },
          {
            type: 'steps',
            content: 'Install and activate',
            steps: [
              'Open VS Code → Extensions → search **Claude Code** (publisher: Anthropic)',
              'Install and reload — a Claude icon appears in the Activity Bar',
              'Click it to open the Claude Code panel. Your existing `~/.claude/` config is used automatically — no extra setup',
              'Type a prompt in the panel or select code and right-click → **Ask Claude**',
            ],
          },
          {
            type: 'table',
            headers: ['Feature', 'How to use it', 'When it helps'],
            rows: [
              ['Inline diff review', 'Claude proposes a change → diff appears inline, accept/reject per hunk', 'Reviewing AI edits without context-switching'],
              ['Context pins', 'Right-click a file → Pin to Claude context', 'Keeping key files in scope across multiple turns'],
              ['Active file context', 'Claude always sees your currently open file', 'Quick questions about the code you\'re looking at'],
              ['Terminal passthrough', 'Claude can still open a terminal and run commands', 'Hooks and shell commands work the same way'],
            ],
          },
          {
            type: 'heading', level: 2,
            content: 'JetBrains plugin',
          },
          {
            type: 'steps',
            content: 'Install in any JetBrains IDE (IntelliJ, WebStorm, PyCharm, etc.)',
            steps: [
              'Settings → Plugins → Marketplace → search **Claude Code**',
              'Install and restart the IDE',
              'The Claude panel opens on the right side. Same `~/.claude/` config — skills, hooks, CLAUDE.md all active',
              'Keyboard shortcut: **⌘⇧A** (Mac) / **Ctrl+Shift+A** (Win) → type "Claude" to open the action',
            ],
          },
          {
            type: 'callout',
            calloutVariant: 'tip',
            content: '**Use the IDE extension for review-heavy work** — reading diffs inline is faster than reading them in a terminal. **Use the terminal for long-running agentic tasks** — the terminal gives you better visibility into what Claude is doing across many files.',
          },
          {
            type: 'comparison',
            content: '',
            do: {
              label: '✅ Best for IDE extension',
              language: 'text',
              code: `- "Explain this function"
- "Refactor this class — show me a diff"
- "Add JSDoc to these methods"
- "What does this SQL query do?"
→ Short, file-scoped, review-oriented tasks`,
            },
            dont: {
              label: '✅ Best for terminal',
              language: 'text',
              code: `- "Review the whole PR and fix all issues"
- "Run the test suite and fix failures"
- "Scaffold the new auth module"
- Multi-agent / worktree workflows
→ Long-running, multi-file, agentic tasks`,
            },
          },
          {
            type: 'callout',
            calloutVariant: 'info',
            content: '**Settings sync:** The IDE extension uses the same `~/.claude/settings.json` and project `.claude/` directory as the terminal. Skills you write in `.claude/commands/` are available in both. You don\'t manage two separate configs.',
          },
        ],
      },

      // ── Lesson 1-6: settings.json Deep Dive ─────────────────────────────
      {
        id: 'lesson-1-6',
        title: 'settings.json Deep Dive',
        description: 'Master every Claude Code configuration option — global vs project vs local, model selection, permissions, and the env vars that override everything.',
        estimatedMinutes: 7,
        blocks: [
          { type: 'lesson-player' },
          {
            type: 'text',
            content: 'Claude Code has three config files that layer on top of each other. Understanding which file controls what — and which environment variables override all of them — lets you configure exactly the right behaviour for each context.',
          },
          {
            type: 'table',
            headers: ['File', 'Scope', 'Committed to git?', 'Best for'],
            rows: [
              ['`~/.claude/settings.json`', 'Every project on your machine', 'No — personal', 'Your preferred model, API key, personal toggles'],
              ['`.claude/settings.json`', 'This project, everyone on the team', 'Yes', 'Shared model, permissions, tool allow/deny lists'],
              ['`.claude/settings.local.json`', 'This project, your machine only', 'No — gitignored', 'Local overrides you don\'t want to share'],
            ],
          },
          {
            type: 'heading', level: 2,
            content: 'Key settings reference',
          },
          {
            type: 'code',
            language: 'json',
            content: `// ~/.claude/settings.json — full annotated example
{
  // Model to use by default (overridden per-session with /model)
  "model": "claude-sonnet-4-6",

  // Map model picker names to custom provider IDs (Bedrock, Vertex, Azure)
  "modelOverrides": {
    "claude-opus-4-6": "arn:aws:bedrock:us-east-1::foundation-model/anthropic.claude-opus-4-6"
  },

  // How long (days) to keep session logs. 0 = never delete
  "cleanupPeriodDays": 30,

  // Permissions — what Claude can do without asking
  "permissions": {
    "allow": [
      "Bash(npm run *)",
      "Bash(git diff*)",
      "Read(**)"
    ],
    "deny": [
      "Bash(rm -rf *)",
      "Bash(git push --force*)"
    ]
  },

  // Shell to use for Bash tool
  "bash": { "shell": "/bin/zsh" },

  // Disable auto-updater
  "autoUpdaterStatus": "disabled",

  // Inject extra environment variables into every session
  "env": {
    "NODE_ENV": "development"
  }
}`,
          },
          {
            type: 'heading', level: 2,
            content: 'Environment variable overrides',
          },
          {
            type: 'table',
            headers: ['Env var', 'What it overrides', 'Example'],
            rows: [
              ['`ANTHROPIC_API_KEY`', 'API key for all requests', '`export ANTHROPIC_API_KEY=sk-ant-...`'],
              ['`ANTHROPIC_MODEL`', 'Default model', '`ANTHROPIC_MODEL=claude-haiku-4-5-20251001`'],
              ['`ANTHROPIC_BASE_URL`', 'API endpoint (Bedrock, Vertex, proxies)', '`ANTHROPIC_BASE_URL=https://my-proxy/v1`'],
              ['`CLAUDE_CODE_DISABLE_CRON`', 'Kill all scheduled loop/cron jobs', '`CLAUDE_CODE_DISABLE_CRON=1`'],
              ['`CLAUDE_CODE_MAX_OUTPUT_TOKENS`', 'Cap output tokens per response', '`CLAUDE_CODE_MAX_OUTPUT_TOKENS=4096`'],
            ],
          },
          {
            type: 'callout',
            calloutVariant: 'tip',
            content: '**Team pattern:** Commit `.claude/settings.json` with the shared model and team-agreed permission allow/deny list. Each developer adds personal overrides in `.claude/settings.local.json` (gitignored). No one overwrites each other\'s preferences.',
          },
          {
            type: 'callout',
            calloutVariant: 'warning',
            content: 'Never put your `ANTHROPIC_API_KEY` in a committed settings file. Use the environment variable or a secrets manager. The `settings.local.json` file is gitignored but it\'s still a file on disk — prefer env vars for credentials.',
          },
          {
            type: 'exercise',
            content: 'Set up your three-layer config',
            exercise: {
              prompt: 'Create or update your `~/.claude/settings.json` with your preferred model and a personal `deny` rule for at least one destructive command. Then create `.claude/settings.local.json` in your current project with one local override.',
              hints: [
                'Start with `model` and a `permissions.deny` entry for `Bash(rm -rf *)`',
                'settings.local.json should already be in .gitignore — check with `git check-ignore -v .claude/settings.local.json`',
              ],
              solution: `// ~/.claude/settings.json
{
  "model": "claude-sonnet-4-6",
  "cleanupPeriodDays": 30,
  "permissions": {
    "deny": ["Bash(rm -rf *)", "Bash(git push --force*)"]
  }
}

// .claude/settings.local.json (gitignored)
{
  "model": "claude-opus-4-6",
  "env": { "DEBUG": "true" }
}`,
              solutionLanguage: 'json',
            },
          },
        ],
      },
    ],
  },
  {
    id: 'module-2',
    title: 'Skills, Hooks & Commands',
    description: 'Master the three Claude Code extension points — write skills that automate your team\'s workflows, hooks that enforce standards automatically, and patterns that make your .claude/ directory a force multiplier.',
    icon: 'Zap',
    color: 'purple',
    quizId: 'quiz-module-2',
    lessons: [
      // ── Lesson 2-1: The Right Tool ───────────────────────────────────────
      {
        id: 'lesson-2-1',
        title: 'Skills vs Hooks vs Commands — The Right Tool',
        description: 'Understand the three extension points and exactly when to reach for each one.',
        estimatedMinutes: 7,
        blocks: [
          {
            type: 'lesson-player',
          },
          {
            type: 'text',
            content: 'Claude Code gives you three ways to extend and automate your workflow: **built-in slash commands**, **custom skills**, and **hooks**. They look similar but serve different purposes. Picking the wrong one costs you time — picking the right one multiplies your output.',
          },
          {
            type: 'table',
            headers: ['Extension', 'What it is', 'When to use it'],
            rows: [
              ['Slash command', 'Built-in Claude Code command (`/help`, `/compact`, `/clear`)', 'Standard Claude Code actions — cannot be added, only used'],
              ['Bundled skill', 'A skill pre-installed by Anthropic (`/simplify`, `/batch`, `/loop`)', 'Ships with Claude Code — use them as-is, no setup needed'],
              ['Skill (custom command)', 'A Markdown file in `.claude/commands/` invoked with `/name`', 'Reusable prompts or workflows specific to **your project or team**'],
              ['Hook', 'A shell script that fires automatically on Claude Code events', 'Automations that run **without user input** — lint on save, block dangerous commands, log all actions'],
            ],
          },
          {
            type: 'heading',
            level: 2,
            content: 'Commands vs Skills — what\'s the real difference?',
          },
          {
            type: 'text',
            content: 'Commands and skills both use `/name` syntax, which makes them easy to confuse. The difference is **where the logic lives**.',
          },
          {
            type: 'comparison',
            content: '',
            do: {
              label: 'Slash command (built-in)',
              language: 'text',
              code: `/compact
/btw what does Array.at() do?
/plan
/fork

→ Hardcoded into the Claude Code binary.
→ No .md file involved.
→ Works on any machine, always.`,
            },
            dont: {
              label: 'Skill (.md file)',
              language: 'text',
              code: `/simplify        ← bundled skill (Anthropic)
/my-review       ← your custom skill

→ Driven by a Markdown prompt file.
→ Lives in .claude/commands/ or ~/.claude/commands/
→ Only available where the file exists.`,
            },
          },
          {
            type: 'callout',
            calloutVariant: 'tip',
            content: '**Quick test:** If it works on a fresh machine with no `.claude/` folder, it\'s a command. If it needs a `.md` file somewhere, it\'s a skill.\n\n**Bundled skills** like `/simplify`, `/batch`, `/loop`, and `/claude-api` are the middle ground — they\'re Anthropic-authored `.md` files that ship inside the Claude Code installation, so they\'re always available without any setup on your part.',
          },
          {
            type: 'heading',
            level: 2,
            content: 'When to write a skill',
          },
          {
            type: 'checklist',
            content: 'Write a skill when all of these are true:',
            items: [
              {
                text: 'You\'ve typed the same prompt more than twice',
                description: 'If you find yourself writing the same instructions every session, that\'s a skill waiting to be written.',
              },
              {
                text: 'The task needs project-specific context',
                description: 'Skills can describe your stack, file structure, and conventions — making Claude act like a specialist, not a generalist.',
              },
              {
                text: 'Other team members would benefit',
                description: 'Skills in `.claude/commands/` are committed to Git. Everyone on the team gets the same `/commands` automatically.',
              },
              {
                text: 'The workflow involves multiple steps',
                description: 'Skills excel at multi-step workflows: "read X, analyse Y, then write Z following our conventions".',
              },
            ],
          },
          {
            type: 'table',
            headers: ['Situation', 'Right tool', 'Why'],
            rows: [
              ['Run once, never again', 'Direct prompt', 'No skill file needed — just describe the task'],
              ['Trigger automatically without input', 'Hook', 'Hooks fire on events; skills need `/invoke`'],
              ['Enforce a rule on every file save', 'PreToolUse hook', 'Hook intercepts the action before it happens'],
              ['Standard Claude Code action', 'Built-in `/command`', '`/compact`, `/clear`, `/help` are already built in'],
            ],
          },
          {
            type: 'callout',
            calloutVariant: 'tip',
            content: '**Rule of three:** Wait until you\'ve typed the same prompt three times before writing a skill. On the third time, write the skill instead of the prompt.',
          },
          {
            type: 'callout',
            calloutVariant: 'warning',
            content: 'Don\'t write a skill for a one-off task. Skills are for **repeatable workflows**. Over-engineering your `.claude/` directory is just as wasteful as not using it at all.',
          },
          {
            type: 'heading',
            level: 2,
            content: 'Skills → Plugins: distributing at scale',
          },
          {
            type: 'text',
            content: 'A **skill** is a single `.md` file you use on your own project. A **plugin** is a bundled package of multiple skills, scripts, and assets — designed to be shared with the wider community via a marketplace.',
          },
          {
            type: 'table',
            headers: ['', 'Skill', 'Plugin'],
            rows: [
              ['Unit', 'Single `.md` file', 'Bundle: skills + scripts + assets'],
              ['Distribution', 'Committed to your repo', 'Marketplace or GitHub URL'],
              ['Command namespace', '`/my-command`', '`/plugin-name:command`'],
              ['Install', 'Copy the `.md` file', '`/plugin` → Discover → Install'],
              ['Best for', 'Your team\'s workflows', 'Sharing with the community'],
            ],
          },
          {
            type: 'code',
            language: 'bash',
            content: `# Browse and install plugins interactively
/plugin

# Install directly from a GitHub repo
/plugin install https://github.com/org/my-plugin

# Use an installed plugin skill
/my-plugin:skill-name`,
          },
          {
            type: 'callout',
            calloutVariant: 'tip',
            content: 'Browse the official marketplace with `/plugin` → Discover tab. Submit your own plugin at `claude.ai/settings/plugins/submit`. The plugin system uses the open **AgentSkills standard** (agentskills.io) — skills you write today work across multiple AI tools.',
          },
          {
            type: 'heading',
            level: 2,
            content: 'The Claude ecosystem — which surface for which job',
          },
          {
            type: 'text',
            content: 'Claude Code is one of three surfaces Anthropic ships. They share the same underlying model but serve very different audiences and use cases. Knowing where each one fits stops you reaching for the wrong tool.',
          },
          {
            type: 'table',
            headers: ['', 'Claude.ai', 'Claude Code', 'Cowork'],
            rows: [
              ['Interface', 'Web / mobile chat', 'Terminal (CLI)', 'Desktop app (GUI)'],
              ['Who it\'s for', 'Everyone', 'Developers', 'Non-technical office workers'],
              ['Agentic', 'No — turn-by-turn chat', 'Yes — executes tasks autonomously', 'Yes — executes tasks autonomously'],
              ['File access', 'Manual upload/download', 'Full codebase read/write', 'Folder you explicitly grant'],
              ['Skill system', 'N/A', '`.claude/commands/` + plugins', 'Plugin bundles (skills + connectors + agents)'],
              ['Typical use', 'Q&A, drafting, analysis', 'Coding, refactoring, automation', 'Spreadsheets, docs, file ops, SaaS workflows'],
              ['Status', 'Generally available', 'Generally available', 'Research preview'],
            ],
          },
          {
            type: 'callout',
            calloutVariant: 'info',
            content: '**Cowork** is the desktop app you see when you download Claude for macOS or Windows. It\'s built on the same agentic engine as Claude Code but targets analysts, ops teams, and anyone who needs to automate multi-step office tasks without touching a terminal. As a developer, Claude Code is your tool — but your teammates on non-technical teams may reach for Cowork instead.',
          },
        ],
      },

      // ── Lesson 2-2: Writing Skills That Work ────────────────────────────
      {
        id: 'lesson-2-2',
        title: 'Writing Skills That Work',
        description: 'Learn the skill file format, $ARGUMENTS, and the writing patterns that make Claude follow your instructions reliably every time.',
        estimatedMinutes: 10,
        blocks: [
          {
            type: 'lesson-player',
          },
          {
            type: 'heading',
            level: 2,
            content: 'Context vs Skills — the key distinction',
          },
          {
            type: 'visual',
            visualId: 'context-vs-skills',
            content: '',
          },
          {
            type: 'text',
            content: 'A skill is a plain Markdown file in `.claude/commands/` (project-level) or `~/.claude/commands/` (global). The filename becomes the slash command — `write-test.md` becomes `/write-test`. That\'s it. No configuration, no registration.',
          },
          {
            type: 'heading',
            level: 2,
            content: 'Skill file anatomy',
          },
          {
            type: 'tabs',
            content: '',
            tabs: [
              {
                label: 'Minimal',
                language: 'markdown',
                content: `# /write-test

Write a comprehensive test file for the current file.

Use the project's existing test framework and follow the
conventions in other test files. Cover happy paths and
edge cases. Do not modify the source file.`,
              },
              {
                label: 'With YAML front matter',
                language: 'markdown',
                content: `---
description: Generate a conventional commit message from staged changes
---

# /commit-msg

Analyse the staged git diff and write a conventional commit message.

Format: \`type(scope): short description\`

**Types:** feat | fix | docs | style | refactor | test | chore | perf

**Rules:**
- Scope is optional but recommended
- Description in present tense, lowercase, no period
- Body explains the WHY, not the what
- Add \`BREAKING CHANGE:\` footer if the API changes

Run \`git diff --staged\` first to understand what changed.`,
              },
              {
                label: 'With $ARGUMENTS',
                language: 'markdown',
                content: `---
description: Explain a function or file in plain English
---

# /explain

Explain $ARGUMENTS in plain English suitable for a junior developer.

Cover:
1. What the code does (high level)
2. How it works (step by step)
3. Why it exists (purpose in the codebase)
4. Common pitfalls or gotchas

Keep explanations concise. Use bullet points.`,
              },
              {
                label: 'Advanced fields',
                language: 'markdown',
                content: `---
description: Run full test suite and fix any failures
argument-hint: [src/ path — omit for whole project]
allowed-tools: [Bash, Read, Write, Glob, Grep]
context: fork
model: claude-sonnet-4-6
---

# /fix-tests

Run \`npm test\` and fix every failing test in $ARGUMENTS.

Steps:
1. Run \`npm test\` and capture failures
2. Read each failing test file and the source it tests
3. Fix the source (not the test) to make it pass
4. Re-run \`npm test\` to confirm green
5. Report a summary of what was changed`,
              },
            ],
          },
          {
            type: 'heading',
            level: 2,
            content: 'Frontmatter field reference',
          },
          {
            type: 'table',
            headers: ['Field', 'Purpose', 'Example'],
            rows: [
              ['`description`', 'Claude reads this to auto-activate the skill when relevant', '`Review code for security issues`'],
              ['`argument-hint`', 'Hint shown in autocomplete when typing the command', '`[file-path or git-ref]`'],
              ['`allowed-tools`', 'Restrict which tools Claude can use during this skill', '`[Bash, Read, Grep]`'],
              ['`context: fork`', 'Run the skill in an isolated subagent (no shared state)', '`context: fork`'],
              ['`model`', 'Pin a specific Claude model for this skill', '`claude-opus-4-6`'],
              ['`user-invocable: false`', 'Hide from the `/` menu — Claude can still auto-invoke it', '`user-invocable: false`'],
              ['`disable-model-invocation: true`', 'Prevent Claude from auto-invoking; manual `/command` only', '`disable-model-invocation: true`'],
            ],
          },
          {
            type: 'callout',
            calloutVariant: 'tip',
            content: '**Auto-activation:** When you add a `description:` field, Claude reads all skill descriptions at session start and will automatically invoke the right skill when your message matches — no `/command` needed. The more specific your description, the more accurately Claude triggers it.',
          },
          {
            type: 'heading',
            level: 2,
            content: 'The $ARGUMENTS placeholder',
          },
          {
            type: 'text',
            content: 'Writing `$ARGUMENTS` in your skill tells Claude to substitute whatever the user typed after the command name. `/explain useAuth hook` passes `"useAuth hook"` as `$ARGUMENTS`. This makes skills flexible — they work on whatever context you point them at.',
          },
          {
            type: 'heading',
            level: 2,
            content: 'Specific beats vague — every time',
          },
          {
            type: 'comparison',
            content: '',
            do: {
              label: '✅ Do — specific and structured',
              language: 'markdown',
              code: `---
description: Review a PR for security issues
---

# /security-review

Review the current git diff for security vulnerabilities.

Check for:
- SQL injection (unsanitised inputs in queries)
- XSS (unescaped output in HTML templates)
- Exposed secrets (API keys, tokens in code)
- Insecure direct object references
- Missing authentication on API routes

For each issue found:
1. Identify the file and line
2. Describe the vulnerability
3. Provide a specific fix

If no issues found, say "No security issues found."`,
            },
            dont: {
              label: '❌ Don\'t — vague and unpredictable',
              language: 'markdown',
              code: `# /security-review

Check for security issues in the code.
Tell me if there are any problems.`,
            },
          },
          {
            type: 'heading',
            level: 2,
            content: 'Six rules for reliable skills',
          },
          {
            type: 'checklist',
            content: '',
            items: [
              {
                text: 'Start with one clear objective sentence',
                description: 'The first sentence defines the task. Everything after is context and constraints.',
              },
              {
                text: 'List explicit constraints ("do not modify X")',
                description: 'Claude follows constraints reliably. Be explicit: "Do not touch the test files", "Only modify the file matching $ARGUMENTS".',
              },
              {
                text: 'Specify the output format',
                description: 'Tell Claude exactly how to format the answer: bullet points, a numbered list, a code block, a specific file structure.',
              },
              {
                text: 'Use numbered steps for multi-step workflows',
                description: 'Numbered steps make Claude\'s behaviour more predictable — it follows them in order.',
              },
              {
                text: 'Add a "Done" condition',
                description: 'Tell Claude what "finished" looks like. E.g. "When done, print a summary of all changes made."',
              },
              {
                text: 'One job per file',
                description: 'A skill that does one thing well is more reliable and easier to maintain than a Swiss army knife skill.',
              },
            ],
          },
          {
            type: 'table',
            headers: ['Location', 'Path', 'Scope', 'Use case'],
            rows: [
              ['Project skill', '`.claude/commands/name.md`', 'Current project only — committed to Git', 'Project-specific conventions, team workflows'],
              ['Global skill', '`~/.claude/commands/name.md`', 'All projects on your machine', 'Personal workflows, universal helpers'],
            ],
          },
          {
            type: 'exercise',
            content: 'Write your first skill',
            exercise: {
              prompt: 'Create a skill file called `add-jsdoc.md` in `.claude/commands/`. It should instruct Claude to add JSDoc comments to a function specified by `$ARGUMENTS`. Include: parameter descriptions, return type, and a one-line summary. Do not modify the function logic.',
              hints: [
                'The filename (without `.md`) becomes the command: `add-jsdoc.md` → `/add-jsdoc`',
                'Use `$ARGUMENTS` where you want the user\'s input to be substituted',
                'Start with a clear first sentence that states the single objective',
              ],
              solution: `---
description: Add JSDoc comments to a function
---

# /add-jsdoc

Add JSDoc comments to the function named $ARGUMENTS.

Include:
- A one-line summary of what the function does
- @param tags for every parameter with type and description
- @returns tag with type and description
- @throws tag if the function can throw

Rules:
- Do NOT modify the function body or signature
- Use the TypeScript types from the source if available
- Keep descriptions concise (one sentence each)
- Place the JSDoc block immediately above the function`,
              solutionLanguage: 'markdown',
            },
          },
        ],
      },

      // ── Lesson 2-3: Hooks in Practice ───────────────────────────────────
      {
        id: 'lesson-2-3',
        title: 'Hooks in Practice',
        description: 'Write hooks that enforce rules, automate quality checks, and guard your project — all without being asked.',
        estimatedMinutes: 10,
        blocks: [
          {
            type: 'lesson-player',
          },
          {
            type: 'text',
            content: 'Hooks are shell scripts Claude Code runs automatically at specific points in its workflow. Unlike skills (which you invoke), hooks fire on their own. They\'re ideal for enforcing team standards and automating quality gates that would otherwise be forgotten.',
          },
          {
            type: 'table',
            content: 'All hook events',
            headers: ['Event', 'Fires When', 'Can Block?'],
            rows: [
              ['PreToolUse', 'Before any tool call', 'Yes'],
              ['PostToolUse', 'After any tool call completes', 'No'],
              ['PreBashExec', 'Before a bash command runs', 'Yes'],
              ['PostBashExec', 'After a bash command completes', 'No'],
              ['PreRead', 'Before a file is read', 'Yes'],
              ['PostRead', 'After a file is read', 'No'],
              ['PreWrite', 'Before a file is written', 'Yes'],
              ['PostWrite', 'After a file is written', 'No'],
              ['UserPromptSubmit', 'When the user submits a prompt', 'Yes'],
              ['AssistantResponse', 'When Claude generates a response', 'No'],
              ['Stop', 'When Claude finishes the task', 'No'],
              ['Notification', 'Claude-triggered notifications', 'No'],
              ['SubagentStop', 'When a sub-agent finishes', 'No'],
              ['PreCompact', 'Before conversation compaction', 'Yes'],
              ['PostCompact', 'After compaction completes', 'No'],
            ],
          },
          {
            type: 'heading',
            level: 2,
            content: 'Exit codes control what Claude does next',
          },
          {
            type: 'table',
            headers: ['Exit code', 'Effect', 'Use case'],
            rows: [
              ['`0`', 'Continue normally', 'Hook ran cleanly, nothing to report'],
              ['`2`', '**Block** the operation — Claude will not proceed', 'Prevent dangerous actions (rm -rf, prod deployments, .env writes)'],
              ['Non-zero (not 2)', 'Show output to Claude as context — Claude reads and fixes', 'Lint errors, type errors, test failures'],
            ],
          },
          {
            type: 'callout',
            calloutVariant: 'tip',
            content: '**Exit code 2 is your hard stop.** Use it only for truly dangerous actions. For softer enforcement — lint errors, type failures — use a non-zero exit other than 2 so Claude sees the output and self-corrects.',
          },
          {
            type: 'heading',
            level: 2,
            content: 'Hook environment variables',
          },
          {
            type: 'table',
            headers: ['Variable', 'Available in', 'Contains'],
            rows: [
              ['`$CLAUDE_TOOL_NAME`', 'PreToolUse, PostToolUse', 'Name of the tool being called (e.g. `Bash`, `Write`)'],
              ['`$CLAUDE_TOOL_INPUT`', 'PreToolUse', 'Full JSON input to the tool — the command, file path, etc.'],
              ['`$CLAUDE_TOOL_RESULT`', 'PostToolUse', 'The tool\'s output / result'],
              ['`$CLAUDE_TOOL_RESULT_FILE_PATH`', 'PostToolUse (Write)', 'Path of the file just written'],
              ['`$CLAUDE_PROJECT_ROOT`', 'All hooks', 'Absolute path to the project root'],
            ],
          },
          {
            type: 'heading',
            level: 2,
            content: 'Five production-ready hooks',
          },
          {
            type: 'tabs',
            content: '',
            tabs: [
              {
                label: 'Block .env writes',
                language: 'bash',
                content: `#!/bin/bash
# .claude/hooks/protect-env.sh
# PreWrite — prevents Claude from ever writing to .env files.
# Start with this one — highest value, zero configuration.

FILE=$(echo "$CLAUDE_TOOL_INPUT" | jq -r '.path // empty')

if [[ "$FILE" == *".env"* ]]; then
  echo '{"action":"block","reason":".env files are protected. Edit environment variables manually — never let an AI touch secrets."}'
  exit 0
fi

echo '{"action":"continue"}'`,
              },
              {
                label: 'Block prod commands',
                language: 'bash',
                content: `#!/bin/bash
# .claude/hooks/guard-production.sh
# PreBashExec — blocks commands targeting production environments.
# Claude reads the reason and tries a safe alternative instead.

INPUT=$(cat)

if echo "$INPUT" | grep -qE "(production|prod-db|api\\.prod)"; then
  echo '{"action":"block","reason":"Production operations require manual approval. Run this in a separate terminal after peer review."}'
  exit 0
fi

echo '{"action":"continue"}'`,
              },
              {
                label: 'Auto-lint on save',
                language: 'bash',
                content: `#!/bin/bash
# .claude/hooks/lint-on-write.sh
# PostWrite — runs ESLint on every JS/TS file Claude writes.
# Non-zero exit (not 2) so Claude reads errors and self-corrects.

FILE=$(echo "$CLAUDE_TOOL_RESULT_FILE_PATH" | tr -d '"')

if [[ "$FILE" =~ \\.(js|jsx|ts|tsx)$ ]]; then
  npx eslint "$FILE" --fix --quiet 2>&1
fi`,
              },
              {
                label: 'Session cost tracker',
                language: 'bash',
                content: `#!/bin/bash
# ~/.claude/hooks/track-cost.sh
# Stop — logs token usage and estimated cost after every session.

TIMESTAMP=$(date '+%Y-%m-%d %H:%M')
INPUT_TOKENS=$(echo "$CLAUDE_USAGE" | jq -r '.input_tokens // 0')
OUTPUT_TOKENS=$(echo "$CLAUDE_USAGE" | jq -r '.output_tokens // 0')

# Sonnet 4.6 pricing: $3/M input, $15/M output
COST=$(echo "scale=4; ($INPUT_TOKENS * 3 + $OUTPUT_TOKENS * 15) / 1000000" | bc)

echo "$TIMESTAMP | in=$INPUT_TOKENS out=$OUTPUT_TOKENS cost=\\$$COST" >> ~/.claude/cost.log
echo "Session cost: \\$$COST"`,
              },
              {
                label: 'Desktop notification',
                language: 'bash',
                content: `#!/bin/bash
# ~/.claude/hooks/notify-done.sh
# Stop — desktop alert when Claude finishes a long task.

# macOS
if command -v osascript &> /dev/null; then
  osascript -e 'display notification "Claude finished your task" with title "Claude Code" sound name "Glass"'
fi

# Linux (requires libnotify)
if command -v notify-send &> /dev/null; then
  notify-send "Claude Code" "Finished your task" --icon=terminal
fi`,
              },
            ],
          },
          {
            type: 'heading',
            level: 2,
            content: 'Wiring hooks in settings.json',
          },
          {
            type: 'code',
            language: 'json',
            content: `// .claude/settings.json
{
  "hooks": {
    "PreWrite": [
      { "type": "command", "command": "bash .claude/hooks/protect-env.sh" }
    ],
    "PreBashExec": [
      { "type": "command", "command": "bash .claude/hooks/guard-production.sh" }
    ],
    "PostWrite": [
      { "type": "command", "command": "bash .claude/hooks/lint-on-write.sh" }
    ],
    "Stop": [
      { "type": "command", "command": "bash ~/.claude/hooks/track-cost.sh" },
      { "type": "command", "command": "bash ~/.claude/hooks/notify-done.sh" }
    ]
  }
}`,
          },
          {
            type: 'exercise',
            content: 'Write an audit log hook',
            exercise: {
              prompt: 'Add a `PreBashExec` hook to `.claude/settings.json` that appends every Bash command Claude runs to `.claude/bash-history.log` with an ISO timestamp. The hook must NOT block — just log and continue.',
              hints: [
                'Use exit code `0` to let Claude continue after logging',
                'The command is in `$CLAUDE_TOOL_INPUT` as JSON — use `jq -r \'.command // empty\'` to extract it',
                '`date -u +"%Y-%m-%dT%H:%M:%SZ"` gives an ISO timestamp',
              ],
              solution: `// .claude/settings.json
{
  "hooks": {
    "PreBashExec": [
      {
        "type": "command",
        "command": "echo \\"$(date -u +'%Y-%m-%dT%H:%M:%SZ') $(echo $CLAUDE_TOOL_INPUT | jq -r '.command // empty')\\" >> .claude/bash-history.log; exit 0"
      }
    ]
  }
}`,
              solutionLanguage: 'json',
            },
          },
          {
            type: 'comparison',
            content: '',
            do: {
              label: '✅ Use a hook for…',
              language: 'markdown',
              code: `# Automatic, event-driven automation

- Run ESLint every time Claude writes a .ts file
- Block force-push to main branch
- Send notification when a long task finishes
- Log all file changes for audit purposes
- Run type-check after every file modification

Key: these happen WITHOUT user input.`,
            },
            dont: {
              label: '✅ Use a skill for…',
              language: 'markdown',
              code: `# User-invoked, prompt-driven workflows

- /write-test — write tests for the current file
- /security-review — audit the current diff
- /add-changelog — append to CHANGELOG.md
- /explain $ARGUMENTS — explain a function

Key: these run WHEN INVOKED via /command-name.`,
            },
          },
        ],
      },

      // ── Lesson 2-4: Team Patterns & CLAUDE.md ───────────────────────────
      {
        id: 'lesson-2-4',
        title: 'Team Patterns & CLAUDE.md',
        description: 'Structure your .claude/ directory for team use, write a CLAUDE.md that makes Claude act like a specialist, and avoid the pitfalls that make AI workflows brittle.',
        estimatedMinutes: 8,
        blocks: [
          {
            type: 'lesson-player',
          },
          {
            type: 'text',
            content: 'Your `.claude/` directory is as important as your `package.json`. A well-structured `.claude/` makes onboarding instant, enforces team standards automatically, and captures institutional knowledge that would otherwise live only in someone\'s head.',
          },
          {
            type: 'code',
            language: 'bash',
            content: `.claude/
├── CLAUDE.md              # Project context — auto-loaded every session
├── settings.json          # Hooks configuration
├── commands/              # Project skills (committed to Git)
│   ├── write-test.md      # /write-test
│   ├── security-review.md # /security-review
│   ├── add-changelog.md   # /add-changelog
│   └── explain.md         # /explain $ARGUMENTS
└── bash-history.log       # Optional: audit log (add to .gitignore)`,
          },
          {
            type: 'heading',
            level: 2,
            content: 'Writing a great CLAUDE.md',
          },
          {
            type: 'text',
            content: '`CLAUDE.md` is loaded automatically at the start of every Claude Code session. It\'s your project\'s instruction manual for Claude — the onboarding doc that makes it act like a specialist who already knows your codebase.',
          },
          {
            type: 'tabs',
            content: '',
            tabs: [
              {
                label: 'Full template',
                language: 'markdown',
                content: `# Project Context

## Stack
- **Framework:** Next.js 14 (App Router)
- **Language:** TypeScript (strict mode)
- **Styling:** Tailwind CSS v4 — no inline styles
- **State:** Zustand with \`useShallow\` selectors
- **Database:** PostgreSQL via Prisma ORM

## Conventions
- Components in \`src/components/\` — one component per file
- API routes in \`src/app/api/\` — always validate with Zod
- Tests co-located: \`Button.tsx\` + \`Button.test.tsx\`
- Commits: conventional commits (\`feat/fix/chore/docs\`)

## What NOT to do
- Never use \`any\` type — use \`unknown\` and narrow
- Never commit .env files
- Never call Anthropic API from client components
- Never use \`useEffect\` for derived state — use \`useMemo\`

## Key Files
- \`src/lib/auth.ts\` — authentication utilities
- \`src/lib/db.ts\` — Prisma client singleton
- \`src/types/\` — all shared TypeScript types`,
              },
              {
                label: 'Minimal template',
                language: 'markdown',
                content: `# Project: MyApp

Node.js/Express REST API. TypeScript strict.

## Rules
- All route handlers must be async
- Use \`zod\` for request validation
- Return errors as \`{ error: string, code: number }\`
- No console.log in production code — use the \`logger\` util

## File map
- \`src/routes/\` — Express routers
- \`src/services/\` — business logic
- \`src/middleware/\` — Express middleware`,
              },
            ],
          },
          {
            type: 'heading',
            level: 2,
            content: 'Five golden rules',
          },
          {
            type: 'checklist',
            content: '',
            items: [
              {
                text: 'Commit `.claude/commands/` to Git',
                description: 'Skills are team knowledge. Every developer gets the same `/commands` automatically when they clone the repo.',
              },
              {
                text: 'Keep CLAUDE.md under 200 lines',
                description: 'Claude reads it every session. Long files dilute the important parts. Be ruthless — if it\'s not critical context, leave it out.',
              },
              {
                text: 'Name skills after the action, not the tool',
                description: '`/write-test` is better than `/jest`. `/add-changelog` is better than `/markdown`. Action-first names are self-documenting.',
              },
              {
                text: 'Start hooks in log-only mode before enabling blocking',
                description: 'Set exit 0 first to verify the hook fires correctly. Only switch to exit 2 (blocking) once you\'ve confirmed it works.',
              },
              {
                text: 'Review skills quarterly',
                description: 'Skills go stale. Set a calendar reminder every quarter. Delete skills you no longer use — dead code applies to skills too.',
              },
            ],
          },
          {
            type: 'table',
            headers: ['Anti-pattern', 'Problem', 'Fix'],
            rows: [
              ['Mega-skill that does 10 things', 'Unpredictable, hard to debug, unreliable', 'One skill = one job. Split into focused skills.'],
              ['Vague skill prompt ("help me with X")', 'Claude interprets it differently every time', 'Be specific: list exactly what to check, what to produce, what to avoid.'],
              ['Hooks that always exit 2', 'Claude gets blocked constantly, frustrating UX', 'Only hard-block truly dangerous actions. Use non-zero for soft failures.'],
              ['CLAUDE.md over 200 lines', 'Important context gets buried', 'Max 200 lines. Headers. Critical rules first.'],
              ['Skills with no constraints', 'Claude modifies unexpected files', 'Always specify what Claude should NOT touch.'],
            ],
          },
          {
            type: 'exercise',
            content: 'Bootstrap .claude/ for a new project',
            exercise: {
              prompt: 'Set up a `.claude/` directory for a TypeScript Node.js project. Create: (1) a `CLAUDE.md` with stack and top 5 conventions, (2) a `/write-test` skill, (3) a PostToolUse hook that runs `tsc --noEmit` after every file write.',
              hints: [
                'For CLAUDE.md, the most useful sections are: Stack, Conventions, "What NOT to do"',
                'Your `/write-test` skill should reference your test framework and naming convention',
                'The `tsc --noEmit` hook should use `|| true` so type errors show as context (not a hard block)',
              ],
              solution: `# 1. CLAUDE.md
## Stack
TypeScript (strict), Node.js 20, Express 4, Jest

## Conventions
- Async/await everywhere — no callbacks
- Zod for all external input validation
- Test files: \`src/__tests__/name.test.ts\`
- Errors: always throw \`AppError\` from \`src/lib/errors.ts\`

## Do NOT
- Use \`any\` type
- Call external APIs from test files (mock them)
- Mutate function parameters

---

# 2. .claude/commands/write-test.md
---
description: Write Jest tests for a file or function
---

# /write-test

Write Jest unit tests for $ARGUMENTS.

- Use \`describe\` + \`it\` blocks
- Mock external dependencies with \`jest.mock\`
- Cover happy path, error cases, and edge cases
- Co-locate: same directory as source
- Do NOT modify the source file

---

# 3. .claude/settings.json
{
  "hooks": {
    "PostToolUse": [
      {
        "matcher": "Write",
        "hooks": [
          {
            "type": "command",
            "command": "cd $CLAUDE_PROJECT_ROOT && npx tsc --noEmit 2>&1 | head -20 || true"
          }
        ]
      }
    ]
  }
}`,
              solutionLanguage: 'markdown',
            },
          },
          {
            type: 'callout',
            calloutVariant: 'success',
            content: 'A well-configured `.claude/` directory turns a general-purpose AI into a specialist that knows your codebase, enforces your standards, and works exactly how your team works.',
          },
        ],
      },

      // ── Lesson 2-5: Ready-to-Copy Skills Library ────────────────────────
      {
        id: 'lesson-2-5',
        title: 'Ready-to-Copy Skills Library',
        description: 'Six production-quality skills you can drop into any project today — security review, PR review, commit messages, debugging, tests, and refactoring.',
        estimatedMinutes: 7,
        blocks: [
          {
            type: 'lesson-player',
          },
          {
            type: 'text',
            content: 'The fastest way to learn skill authoring is to read well-crafted skills and adapt them. Every skill below is production-ready — copy the file content to `.claude/commands/<filename>.md` and it becomes a `/command` immediately.',
          },
          {
            type: 'callout',
            calloutVariant: 'info',
            content: '**Install any skill:** `mkdir -p .claude/commands`, paste the content into a `.md` file, commit it. The whole team gets the command automatically.',
          },
          {
            type: 'heading',
            level: 2,
            content: 'Security review — the must-have skill',
          },
          {
            type: 'code',
            language: 'markdown',
            content: `---
description: Audit the current diff or file for security vulnerabilities
---

# /security-review

You are a senior application security engineer. Audit the code for security vulnerabilities.

## Step 1 — Gather context
Run \`git diff HEAD\` to see recent changes. If $ARGUMENTS is provided, read that specific file instead.

## Step 2 — Check each category

### Injection
- SQL injection: raw string concatenation in queries
- Command injection: unsanitised input passed to shell commands
- NoSQL injection: unvalidated data in MongoDB/Redis queries

### Authentication & authorisation
- Missing auth middleware on API routes
- Insecure direct object references (user can access other users' data)
- JWT: algorithm confusion, missing expiry, secrets in code
- Broken access control (role checks missing or bypassable)

### Data exposure
- API keys, tokens, passwords hardcoded or in committed files
- Sensitive data in logs (emails, passwords, tokens)
- PII returned in API responses that don't need it

### Input handling
- Missing input validation or sanitisation
- XSS: unescaped output in HTML/templates
- Path traversal: user-controlled file paths

### Dependencies
- Flag packages with known CVEs
- Flag any \`eval()\`, \`exec()\`, or dynamic \`require()\` calls

## Step 3 — Report

For every issue found:
\`\`\`
**[SEVERITY]** Short title
File: path/to/file.ts  Line: N
Problem: one sentence
Fix: concrete code change or mitigation
\`\`\`

Severity: CRITICAL | HIGH | MEDIUM | LOW | INFO

If no issues found: ✅ No security issues found.
Do NOT modify any files.`,
          },
          {
            type: 'heading',
            level: 2,
            content: 'Five more essential skills',
          },
          {
            type: 'tabs',
            content: '',
            tabs: [
              {
                label: 'commit.md',
                language: 'markdown',
                content: `---
description: Generate a conventional commit message from staged changes
---

# /commit

Generate a conventional commit message for the staged changes.

## Step 1
Run \`git diff --staged\`. If nothing staged, run \`git diff HEAD\`.

## Step 2 — Write the commit
Format: \`type(scope): short description\`

Types: feat | fix | docs | style | refactor | test | chore | perf | ci

Rules:
- Imperative mood, lowercase, ≤72 chars, no trailing period
- Body: explain the WHY — wrap at 72 chars
- Footer: \`BREAKING CHANGE: description\` if public API changes
- Footer: \`Closes #123\` if it fixes a GitHub issue

## Step 3
Present in a code block, then ask: "Run this commit? (yes or edit)"
If confirmed: \`git commit -m "<message>"\``,
              },
              {
                label: 'pr-review.md',
                language: 'markdown',
                content: `---
description: Thorough code review of the current PR diff
---

# /pr-review

You are a senior engineer doing a thorough pull request review.

## Step 1
Run \`git diff main...HEAD\` to see all changes.

## Step 2 — Review across these dimensions

**Correctness:** Does the logic work? Edge cases handled? Errors handled?

**Security:** No hardcoded secrets. Input validated. Auth enforced on new routes.

**Performance:** N+1 queries? Missing indexes? Unnecessary re-renders?

**Readability:** Clear names? Complexity justified? Tests for new behaviour?

**Breaking changes:** Public API, schema, or contract changes needing migration?

## Step 3 — Output

One-paragraph summary of what the PR does, then findings by file:

\`\`\`
📄 path/to/file.ts
  [BLOCKING]   Must-fix issue
  [SUGGESTION] Improvement idea
  [NITPICK]    Minor style note
\`\`\`

End with: **Overall:** Approve | Request changes | Needs discussion`,
              },
              {
                label: 'debug.md',
                language: 'markdown',
                content: `---
description: Systematically debug a bug using the scientific method
---

# /debug

Debug the issue described in $ARGUMENTS using the scientific method.

## Step 1 — Understand the symptom
Restate in one sentence: what happens vs what should happen.

## Step 2 — Gather evidence
- Check recent git log: \`git log --oneline -10\`
- Read the error and stack trace carefully
- Search for the error string: \`grep -r "error text" src/\`
- Read the files in the stack trace

## Step 3 — Form hypotheses
List 2–4 possible root causes ranked by likelihood.

## Step 4 — Test hypotheses
Test the most likely first. Add a targeted log or read a value.
Do NOT change production logic yet.

## Step 5 — Fix
Once root cause confirmed:
- Make the minimal change that fixes it
- Explain why the fix works
- Note related areas with the same bug
- Suggest a regression test`,
              },
              {
                label: 'write-tests.md',
                language: 'markdown',
                content: `---
description: Write comprehensive tests for a file or function
---

# /write-tests

Write comprehensive tests for $ARGUMENTS.

## Step 1 — Read the code
Identify all exported functions/classes/components, their inputs/outputs, and dependencies to mock.

## Step 2 — Check existing conventions
Find 1–2 existing test files to understand framework (Jest, Vitest, Playwright), naming, and mocking patterns.

## Step 3 — Write tests covering

**Happy paths** — normal inputs produce expected outputs

**Edge cases:**
- Empty, null, undefined, zero, empty array
- Max/min values

**Error paths:**
- Invalid inputs throw the right error
- Network/DB failures handled gracefully

## Step 4
Place the test file following project conventions.
Print: N tests written covering X functions.`,
              },
              {
                label: 'refactor.md',
                language: 'markdown',
                content: `---
description: Refactor for clarity without changing behaviour
---

# /refactor

Refactor $ARGUMENTS for improved readability. Do NOT change observable behaviour.

## Step 1 — Identify code smells
- Functions >40 lines
- Nesting >3 levels deep
- Repeated logic (copy-paste code)
- Unclear names (single letters, abbreviations)
- Magic numbers and strings
- God functions doing too many things

## Step 2 — Plan, then confirm before proceeding

## Step 3 — Refactor in order
1. Rename for clarity
2. Extract magic values into named constants
3. Extract repeated logic into helpers
4. Break large functions into single-purpose functions
5. Flatten nesting with early returns
6. Remove dead code

Rules:
- One type of refactor at a time
- Every function name reads like a sentence
- Run tests after changes to verify behaviour is preserved
- No new features — refactor only`,
              },
            ],
          },
          {
            type: 'code',
            language: 'bash',
            content: `# Install the full library in one go
mkdir -p .claude/commands

# Create each skill file (paste content from above):
# .claude/commands/security-review.md
# .claude/commands/commit.md
# .claude/commands/pr-review.md
# .claude/commands/debug.md
# .claude/commands/write-tests.md
# .claude/commands/refactor.md

git add .claude/commands/
git commit -m "chore: add Claude Code skill library"`,
          },
          {
            type: 'callout',
            calloutVariant: 'success',
            content: '**Start with `/security-review` and `/commit`** — they give the highest immediate value with zero project-specific configuration needed.',
          },
        ],
      },

      // ── Lesson 2-6: Memory & Context ────────────────────────────────────
      {
        id: 'lesson-2-6',
        title: 'Memory & Context — How Claude Remembers',
        description: 'Master the four memory layers and the context window so Claude always has exactly the right information — without burning tokens on noise.',
        estimatedMinutes: 8,
        blocks: [
          {
            type: 'lesson-player',
          },
          {
            type: 'text',
            content: 'Claude Code has no persistent memory by default — every session starts blank. But it gives you four distinct layers to inject exactly the right context. Understanding which layer to use (and when) is the difference between Claude that feels like a specialist and Claude that feels like a stranger.',
          },
          {
            type: 'heading',
            level: 2,
            content: 'The four memory layers',
          },
          {
            type: 'table',
            headers: ['Layer', 'Where it lives', 'Scope', 'Best for'],
            rows: [
              ['Global CLAUDE.md', '`~/.claude/CLAUDE.md`', 'Every project on your machine', 'Personal preferences: code style, preferred tools, how you like responses formatted'],
              ['Project CLAUDE.md', '`.claude/CLAUDE.md` (committed)', 'Everyone on the team, every session', 'Stack, conventions, do-nots, key file map'],
              ['Auto-memory', '`~/.claude/projects/<hash>/memory/`', 'Persists across sessions for that project', 'Facts Claude discovers mid-session that you want it to remember next time'],
              ['In-session context', 'The live conversation window', 'Current session only — gone when you /clear', 'Everything Claude is actively working with right now'],
            ],
          },
          {
            type: 'heading',
            level: 2,
            content: 'Layer 1 — Global CLAUDE.md',
          },
          {
            type: 'text',
            content: 'Lives at `~/.claude/CLAUDE.md`. Loaded automatically in every project on your machine. Use it for personal preferences that have nothing to do with any specific codebase.',
          },
          {
            type: 'code',
            language: 'markdown',
            content: `# My Global Preferences

## Response style
- Be concise. Skip preamble — go straight to the answer.
- Use bullet points over paragraphs for lists.
- Show diffs for code changes, not full rewrites.

## Tools I always have installed
- pnpm (not npm), bun for scripts
- GitHub CLI (gh) for any GitHub operations
- fd, ripgrep (rg) instead of find/grep

## My conventions
- Prefer named exports over default exports
- Always use const over let where possible
- TypeScript: strict mode always on`,
          },
          {
            type: 'heading',
            level: 2,
            content: 'Layer 2 — Project CLAUDE.md',
          },
          {
            type: 'text',
            content: 'Lives at `.claude/CLAUDE.md` inside your project, committed to Git. This is the team-shared instruction manual covered in lesson 2-4. Run `/init` to generate a first draft, then edit it. Run `/memory` to open it for edits at any time.',
          },
          {
            type: 'callout',
            calloutVariant: 'tip',
            content: '**Both files load together.** Global preferences + project conventions are merged in every session. Keep them separate — global is about *you*, project is about *the codebase*.',
          },
          {
            type: 'heading',
            level: 2,
            content: 'Layer 3 — Auto-memory',
          },
          {
            type: 'text',
            content: 'Claude Code can save facts between sessions automatically. When Claude discovers something worth remembering — an API quirk, a decision you made, a pattern in your codebase — it can write it to a memory file that gets loaded next session.',
          },
          {
            type: 'steps',
            content: 'How to use auto-memory',
            steps: [
              'Tell Claude to remember something: "Remember that we use snake_case for database columns but camelCase in TypeScript"',
              'Claude writes it to `~/.claude/projects/<hash>/memory/MEMORY.md`',
              'Next session, that fact is automatically injected into context',
              'Run `/memory` to view and edit all memory files at once',
            ],
          },
          {
            type: 'comparison',
            content: '',
            do: {
              label: '✅ Good things to save in memory',
              language: 'text',
              code: `- Architectural decisions: "We chose Zustand over Redux because..."
- Codebase quirks: "The auth module has a known issue with..."
- Team preferences discovered mid-session
- File locations you keep having to rediscover
- API keys or env var names (never values)`,
            },
            dont: {
              label: '❌ Bad things to save in memory',
              language: 'text',
              code: `- Temporary task context ("we're fixing the login bug")
- Things already in CLAUDE.md (duplication = noise)
- Sensitive data, secrets, passwords
- Anything that will be stale in a week`,
            },
          },
          {
            type: 'heading',
            level: 2,
            content: 'Layer 4 — The context window',
          },
          {
            type: 'text',
            content: 'The context window is the live conversation: every message, every tool result, every file Claude has read. It is powerful but finite — Claude Code runs on models with 200K token windows, but costs grow with every turn.',
          },
          {
            type: 'table',
            headers: ['What\'s in the context window', 'Rough token cost'],
            rows: [
              ['System prompt (CLAUDE.md files)', '~1–3K tokens per session'],
              ['Each message you send', '~50–500 tokens'],
              ['Each file Claude reads', '~200–5K tokens per file'],
              ['Tool call results (bash output, etc.)', '~100–2K tokens each'],
              ['Claude\'s responses', '~200–2K tokens each'],
            ],
          },
          {
            type: 'heading',
            level: 2,
            content: 'Managing the context window',
          },
          {
            type: 'steps',
            content: 'Four tools for staying in control',
            steps: [
              '`/context` — visualize how full the window is as a color grid (green → yellow → red)',
              '`/cost` — see exact token counts and USD cost for the current session',
              '`/compact [focus instructions]` — summarize the conversation, keeping key context at ~10% of the token cost. Add focus instructions like "focus on the auth changes" to preserve what matters.',
              '`/clear` — start completely fresh when switching to an unrelated task',
            ],
          },
          {
            type: 'callout',
            calloutVariant: 'warning',
            content: '**Context ≠ Memory.** When you `/clear` or start a new session, the context window is wiped — but CLAUDE.md files and auto-memory persist. This is why you put stable facts in CLAUDE.md, not just in the conversation.',
          },
          {
            type: 'heading',
            level: 2,
            content: 'Best practices: memory vs context',
          },
          {
            type: 'table',
            headers: ['Information type', 'Where to put it', 'Why'],
            rows: [
              ['Tech stack, conventions, do-nots', 'Project CLAUDE.md', 'Needs to be available every session, for every teammate'],
              ['Personal code style preferences', 'Global CLAUDE.md', 'Applies to all your projects, not just this one'],
              ['Mid-session discoveries', 'Ask Claude to auto-remember it', 'Survives session end without manual maintenance'],
              ['Current task files and context', 'Let it live in context window', 'Temporary — no need to persist'],
              ['Long-running conversation', '/compact then continue', 'Reduces cost while preserving direction'],
              ['Completely new task', '/clear then start fresh', 'Dirty context from the old task degrades quality'],
            ],
          },
          {
            type: 'callout',
            calloutVariant: 'tip',
            content: '**The 3-layer rule:** Put it in CLAUDE.md if it\'s always true. Ask Claude to remember it if it\'s true for this project going forward. Let it stay in context if it\'s only relevant today.',
          },
          {
            type: 'exercise',
            content: 'Set up your memory stack',
            exercise: {
              prompt: 'Create a global CLAUDE.md at `~/.claude/CLAUDE.md` with your personal preferences. Then open your current project\'s CLAUDE.md with `/memory` and add one architectural decision you\'ve made recently that Claude should always know about.',
              hints: [
                'Global CLAUDE.md: focus on how YOU like to work, not project specifics',
                'Use /init if you don\'t have a project CLAUDE.md yet',
                'Keep both files under 200 lines — brevity beats completeness',
              ],
              solution: `# ~/.claude/CLAUDE.md (global — your preferences)
## My style
- Skip preamble. Answer first, explain second.
- Use short, direct sentences.
- Prefer pnpm over npm.
- TypeScript strict mode always.

---

# .claude/CLAUDE.md addition (project — architectural decision)
## Architecture decisions
- We use server-side rendering for all data fetching (no client-side fetch).
  Rationale: SEO + simpler auth token handling.
  Decision date: 2024-Q1. Do not add useEffect data fetching.`,
              solutionLanguage: 'markdown',
            },
          },
        ],
      },

      // ── Lesson 2-7: Testing & Refining Your Skills (Skills 2.0 Evals) ───
      {
        id: 'lesson-2-7',
        title: 'Testing & Refining Your Skills — Skills 2.0 Evals [Coming Soon]',
        description: 'A preview of the Skills 2.0 evaluation suite — Evals, A/B Testing, Trigger Optimization, and Benchmarking. Currently rolling out; not yet available to all users.',
        estimatedMinutes: 7,
        blocks: [
          {
            type: 'lesson-player',
          },
          {
            type: 'callout',
            calloutVariant: 'warning',
            content: '**Coming soon — not yet available to all users.** The Skills 2.0 evaluation suite is announced and rolling out gradually. If you don\'t see an Evals tab in your skill creator yet, this feature hasn\'t reached your account. The lesson below covers what it does so you\'re ready when it arrives.',
          },
          {
            type: 'text',
            content: 'Writing a skill is the easy part. Knowing whether it actually works — every time, across different inputs, without firing when it shouldn\'t — is harder. **Skills 2.0** introduces a built-in evaluation suite into the skill creator. It brings software testing discipline to skill authoring: no code required.',
          },
          {
            type: 'heading',
            level: 2,
            content: 'The four evaluation tools',
          },
          {
            type: 'table',
            headers: ['Tool', 'What it does', 'Best for'],
            rows: [
              ['Evals', 'Run test prompts and describe expected output — pass/fail result', 'Verifying core behavior before shipping'],
              ['A/B Testing', 'Compare two versions of a skill side-by-side with metrics', 'Deciding which wording, structure, or trigger works better'],
              ['Trigger Optimization', 'Find false fires and missed fires in your skill\'s activation logic', 'Fixing skills that trigger on wrong inputs or miss the right ones'],
              ['Benchmarking', 'Set a performance baseline and track it over time', 'Ensuring skills don\'t regress as the model evolves'],
            ],
          },
          {
            type: 'heading',
            level: 2,
            content: 'Evals — unit tests for your skill',
          },
          {
            type: 'text',
            content: 'An eval is a test case: you supply a **prompt** (what the user types) and a **description of the expected output** (what the skill should do). The system runs the skill and tells you whether the output matches. You can add as many test cases as you want.',
          },
          {
            type: 'steps',
            content: 'How to write a useful eval',
            steps: [
              'Open the Evals tab in the skill creator',
              'Add a test prompt — use a realistic user message that should trigger your skill',
              'Write a plain-English description of what a correct response looks like (e.g., "Returns a bullet list of action items extracted from the meeting notes")',
              'Run the eval — the system scores pass/fail and shows you the actual output',
              'Add edge case prompts: empty input, ambiguous phrasing, the prompt that almost triggers but shouldn\'t',
            ],
          },
          {
            type: 'comparison',
            content: '',
            do: {
              label: '✅ Good eval description',
              language: 'text',
              code: `Expected: Response contains a numbered list of
action items. Each item has an owner name and
a due date. No more than 10 items. Polite but
direct tone.`,
            },
            dont: {
              label: '❌ Weak eval description',
              language: 'text',
              code: `Expected: Summarizes the meeting.

→ Too vague. The evaluator can't tell if
  the output is actually correct.`,
            },
          },
          {
            type: 'heading',
            level: 2,
            content: 'A/B Testing — pick the better version with data',
          },
          {
            type: 'text',
            content: 'When you\'re unsure whether to restructure a skill, tighten its trigger, or change its output format — don\'t guess. A/B test it. The system runs both versions against your eval suite and reports:',
          },
          {
            type: 'checklist',
            content: 'Metrics tracked in A/B tests',
            items: [
              {
                text: 'Eval criterion satisfaction rate',
                description: 'The percentage of your test cases each version passes.',
              },
              {
                text: 'Token usage',
                description: 'How many tokens each version consumes on average — relevant if you\'re watching costs.',
              },
              {
                text: 'Run time',
                description: 'How long each version takes to respond. Faster isn\'t always better, but it\'s good to know.',
              },
            ],
          },
          {
            type: 'callout',
            calloutVariant: 'tip',
            content: '**Practical use:** A/B testing is most valuable when you want to shorten a skill\'s instructions. Write the lean version, run the A/B test against your evals, and only ship the shorter version if the pass rate holds. You get smaller context cost *and* confidence it still works.',
          },
          {
            type: 'heading',
            level: 2,
            content: 'Trigger Optimization — stop false fires and missed fires',
          },
          {
            type: 'text',
            content: 'Trigger optimization is the highest-ROI tool for skills used in agents or plugins. It analyses your skill\'s trigger description against a set of real prompts and tells you where it goes wrong.',
          },
          {
            type: 'table',
            headers: ['Problem', 'What it looks like', 'Trigger optimization fix'],
            rows: [
              ['False fire', 'Your LinkedIn skills fires when the user asks about YouTube', 'Tighten the trigger: add explicit exclusions or narrower keywords'],
              ['Missed fire', 'A clear match doesn\'t activate your skill', 'Broaden the trigger: use synonyms or rephrase the activation condition'],
              ['Ambiguous trigger', 'The skill fires ~60% of the time on the same input', 'Make the trigger deterministic: specificity beats brevity'],
            ],
          },
          {
            type: 'callout',
            calloutVariant: 'info',
            content: 'Anthropic tested trigger optimization on 6 public document-creation skills. 5 out of 6 improved their trigger accuracy after one round of optimization. It\'s fast to run and the suggestions are actionable.',
          },
          {
            type: 'heading',
            level: 2,
            content: 'Benchmarking — protect against regression',
          },
          {
            type: 'text',
            content: 'Models update. Claude Sonnet today is not Claude Sonnet in 6 months. Benchmarking lets you lock in a baseline — "this skill passes 9/10 evals today" — and re-run that baseline after any model update. If the pass rate drops, you know you need to adjust the skill before your users notice.',
          },
          {
            type: 'steps',
            content: 'Setting up a benchmark',
            steps: [
              'Make sure your eval suite covers the skill\'s core use cases (aim for at least 5–10 test cases)',
              'Run all evals and note the current pass rate — this is your baseline',
              'Save it as a named benchmark in the Benchmarking tab',
              'Re-run after model updates or significant skill edits',
              'Investigate any eval that newly fails — it signals drift between your instructions and the current model',
            ],
          },
          {
            type: 'heading',
            level: 2,
            content: 'The evaluation workflow',
          },
          {
            type: 'steps',
            content: 'Recommended order when shipping a new skill',
            steps: [
              '**Write the skill** — instructions, trigger, output format',
              '**Write 5+ evals** — happy path, edge cases, one "near miss" that should NOT trigger',
              '**Run evals** — fix failures before moving on',
              '**Run Trigger Optimization** — check for false fires across unrelated prompts',
              '**Benchmark** — save the current pass rate as your v1 baseline',
              '**Ship** — you now have evidence it works, not just a feeling',
            ],
          },
          {
            type: 'callout',
            calloutVariant: 'warning',
            content: '**Don\'t skip the "near miss" eval.** A skill that fires correctly on good inputs but also fires on irrelevant ones is worse than no skill — it hijacks conversations and confuses users. Always include at least one test case that should NOT activate your skill.',
          },
          {
            type: 'exercise',
            content: 'Evaluate an existing skill',
            exercise: {
              prompt: 'Pick one skill you already have (or the `/write-test` skill from lesson 2-2). Open it in the skill creator on Claude.ai. Write three evals: one happy path, one edge case, one near-miss that should NOT trigger. Run them. Fix any failure.',
              hints: [
                'For the near-miss eval, use a prompt that shares vocabulary with your skill but has a different intent',
                'If your skill has no trigger description yet, add one before running trigger optimization',
                'A failing eval is information — read the actual output before deciding whether to fix the skill or fix the eval description',
              ],
              solution: `# Example: evaluating a /summarize-pr skill

## Eval 1 — happy path
Prompt: "Summarize this pull request: [adds pagination to user list, 3 files changed]"
Expected: Returns a 2-4 sentence plain-English summary covering what changed and why.

## Eval 2 — edge case
Prompt: "Summarize this PR: [no description, only file names listed]"
Expected: Still returns a summary; acknowledges limited context and bases
the summary on file names and diff headings.

## Eval 3 — near miss (should NOT trigger)
Prompt: "Can you summarize what a pull request even is?"
Expected: Skill does NOT fire. This is a conceptual question,
not a request to summarize a specific PR.`,
              solutionLanguage: 'markdown',
            },
          },
        ],
      },
    ],
  },
  {
    id: 'module-4',
    title: 'Cost Optimization',
    description: 'Dramatically reduce API costs with prompt caching, Batch API, and smart model routing.',
    icon: 'DollarSign',
    color: 'orange',
    quizId: 'quiz-module-4',
    lessons: [
      {
        id: 'lesson-4-1',
        title: 'Understanding Claude Pricing',
        description: 'Learn how tokens are counted and priced across the Claude model family.',
        estimatedMinutes: 5,
        blocks: [
          {
            type: 'lesson-player',
          },
          {
            type: 'text',
            content: 'Claude pricing is per-token, with separate rates for input and output. Output tokens cost 5x more than input tokens on most models — so reducing response length is often the highest-leverage optimization.',
          },
          {
            type: 'table',
            content: '2026 Claude pricing (per million tokens)',
            headers: ['Model', 'Input', 'Output', 'Cache Read'],
            rows: [
              ['Claude Opus 4.6', '$15.00', '$75.00', '$1.50'],
              ['Claude Sonnet 4.6', '$3.00', '$15.00', '$0.30'],
              ['Claude Haiku 4.5', '$0.80', '$4.00', '$0.08'],
            ],
          },
          {
            type: 'callout',
            calloutVariant: 'tip',
            content: 'Haiku 4.5 costs ~19x less than Opus 4.6 for input tokens. For tasks like classification, summarization, or structured data extraction, Haiku delivers excellent results at a fraction of the cost.',
          },
        ],
      },
      {
        id: 'lesson-4-2',
        title: 'Prompt Caching',
        description: 'Cache large, repeated contexts to achieve up to 90% savings on input tokens.',
        estimatedMinutes: 8,
        blocks: [
          {
            type: 'callout',
            calloutVariant: 'info',
            content: '**Where does this lesson apply?** Prompt caching is an Anthropic API feature for apps you build yourself — a Next.js backend, a Python script, a Node.js service. It is not a Claude Code CLI setting. If you only use Claude Code interactively, skip to lesson 4-4.',
          },
          {
            type: 'lesson-player',
          },
          {
            type: 'text',
            content: 'Prompt caching lets you mark portions of your prompt as cacheable. On subsequent requests, cached tokens are read at ~10% of the normal input price. This is the highest-ROI optimization for apps with large, repeated contexts — like a chatbot that sends the same 10,000-token system prompt on every request.',
          },
          {
            type: 'table',
            content: 'Cache pricing vs standard',
            headers: ['Type', 'Cost vs Standard', 'Example (Sonnet 4.6)'],
            rows: [
              ['Standard input', '100% (baseline)', '$3.00/M tokens'],
              ['Cache write', '125% (+25% premium)', '$3.75/M tokens'],
              ['Cache read', '10% (-90% discount)', '$0.30/M tokens'],
            ],
          },
          {
            type: 'heading',
            level: 2,
            content: 'Setup',
          },
          {
            type: 'steps',
            content: 'Add caching to your Node.js / TypeScript project',
            steps: [
              'Install the SDK in your project: npm install @anthropic-ai/sdk',
              'Set your API key: export ANTHROPIC_API_KEY=sk-ant-...',
              'Create a file — e.g. src/ai.ts — and paste the code below',
              'Replace yourLargeDocumentOrInstructions with the text you want cached (system prompt, docs, etc.)',
            ],
          },
          {
            type: 'code',
            language: 'typescript',
            content: `// src/ai.ts — paste into any Node.js / TypeScript project
import Anthropic from '@anthropic-ai/sdk';

const client = new Anthropic(); // reads ANTHROPIC_API_KEY from env

export async function askWithCaching(
  largeContext: string,
  userQuestion: string
) {
  const response = await client.messages.create({
    model: 'claude-sonnet-4-6',
    max_tokens: 1024,
    system: [
      {
        type: 'text',
        text: largeContext,
        // Mark this block as cacheable.
        // First call: written to cache (1.25x cost).
        // Every subsequent call: read from cache (0.10x cost).
        cache_control: { type: 'ephemeral' },
      },
    ],
    messages: [{ role: 'user', content: userQuestion }],
  });

  return response.content[0].type === 'text' ? response.content[0].text : '';
}`,
          },
          {
            type: 'callout',
            calloutVariant: 'tip',
            content: '**What to cache:** The cache_control block should wrap content that is large AND repeated across requests — a long system prompt, a reference document, tool definitions. Do NOT cache the user\'s message (it changes every time).',
          },
          {
            type: 'callout',
            calloutVariant: 'info',
            content: 'Cache break-even: 1 write (1.25×) + 1 read (0.10×) = 1.35× total for 2 uses. Without caching that\'s 2.00×. You save money from the very first cache hit, and savings compound with every additional request.',
          },
        ],
      },
      {
        id: 'lesson-4-3',
        title: 'Batch API',
        description: 'Cut costs 50% on non-time-sensitive workloads with the Message Batches API.',
        estimatedMinutes: 7,
        blocks: [
          {
            type: 'callout',
            calloutVariant: 'info',
            content: '**Where does this lesson apply?** The Batch API is for scripts and backend services you write — a nightly classification job, a bulk data pipeline, an eval suite. It is not available inside Claude Code CLI sessions.',
          },
          {
            type: 'lesson-player',
          },
          {
            type: 'text',
            content: 'The Anthropic Batch API processes requests asynchronously — typically within 24 hours — at 50% of standard pricing. Perfect for bulk workloads that don\'t need real-time responses.',
          },
          {
            type: 'table',
            content: 'Batch API use cases',
            headers: ['Good fit', 'Not a good fit'],
            rows: [
              ['Running LLM evals overnight', 'Real-time chat interfaces'],
              ['Classifying 10K+ documents', 'User-facing API calls'],
              ['Bulk data enrichment/extraction', 'Streaming responses needed'],
              ['Generating reports off-peak', 'SLA < 1 hour'],
            ],
          },
          {
            type: 'heading',
            level: 2,
            content: 'Setup',
          },
          {
            type: 'steps',
            content: 'Run your first batch job',
            steps: [
              'Install the SDK: npm install @anthropic-ai/sdk',
              'Set your API key: export ANTHROPIC_API_KEY=sk-ant-...',
              'Create a script — e.g. scripts/batch-classify.ts — and paste the code below',
              'Replace items with your array of inputs and run: npx ts-node scripts/batch-classify.ts',
            ],
          },
          {
            type: 'code',
            language: 'typescript',
            content: `// scripts/batch-classify.ts — run with: npx ts-node scripts/batch-classify.ts
import Anthropic from '@anthropic-ai/sdk';

const client = new Anthropic(); // reads ANTHROPIC_API_KEY from env

// Your input data — e.g. customer support tickets, documents, etc.
const items = [
  { id: 'item-1', text: 'My order never arrived' },
  { id: 'item-2', text: 'Great product, love it!' },
  { id: 'item-3', text: 'How do I reset my password?' },
];

// Step 1: Submit the batch (50% cheaper than individual requests)
const batch = await client.messages.batches.create({
  requests: items.map(item => ({
    custom_id: item.id,
    params: {
      model: 'claude-haiku-4-5-20251001', // cheapest model for simple tasks
      max_tokens: 64,
      messages: [
        {
          role: 'user',
          content: \`Classify this message as COMPLAINT, PRAISE, or QUESTION.
Reply with just the label.

Message: \${item.text}\`,
        },
      ],
    },
  })),
});

console.log('Batch submitted:', batch.id);
console.log('Status:', batch.processing_status);

// Step 2: Poll until complete (usually minutes to hours)
let result = batch;
while (result.processing_status === 'in_progress') {
  await new Promise(r => setTimeout(r, 5000)); // wait 5 seconds
  result = await client.messages.batches.retrieve(batch.id);
  console.log('Still processing...', result.request_counts);
}

// Step 3: Read results
for await (const item of await client.messages.batches.results(batch.id)) {
  if (item.result.type === 'succeeded') {
    const label = item.result.message.content[0];
    console.log(item.custom_id, '->', label.type === 'text' ? label.text : '?');
  }
}`,
          },
          {
            type: 'callout',
            calloutVariant: 'tip',
            content: '**Webhooks instead of polling:** For production use, pass `webhook: { url: "https://yourapp.com/batch-done" }` to the batch create call. Anthropic will POST the results when done — no polling loop needed.',
          },
        ],
      },
      {
        id: 'lesson-4-4',
        title: 'Context Management Strategies',
        description: 'Control token costs through smart context windowing and model selection.',
        estimatedMinutes: 7,
        blocks: [
          {
            type: 'lesson-player',
          },
          {
            type: 'text',
            content: 'In Claude Code, context grows with each turn. Unmanaged, a long session can balloon to 100K+ tokens per request. /compact and strategic context management prevent runaway costs.',
          },
          {
            type: 'steps',
            content: 'Context management best practices',
            steps: [
              'Run /cost periodically to track session token usage',
              'Use /compact when the session grows long — it creates a summary, preserving key context at ~10% of the token cost',
              'Start fresh sessions for unrelated tasks rather than continuing a long context',
              'Use --model to switch to Haiku for simple tasks within a session',
              'Set explicit max_tokens appropriate to your task',
            ],
          },
          {
            type: 'tip',
            content: 'Combine Batch API + prompt caching for maximum savings: cache the static parts (system prompt, tool defs) and batch the dynamic parts (user queries). This can achieve >90% cost reduction vs naive usage.',
          },
        ],
      },

      // ── Lesson 4-5: Auto Model Selection ────────────────────────────────
      {
        id: 'lesson-4-5',
        title: 'Auto Model Selection — Skill & Hook',
        description: 'A skill that recommends the right model for your task, and a hook that warns you when you\'re burning Opus tokens on a simple job.',
        estimatedMinutes: 7,
        blocks: [
          {
            type: 'lesson-player',
          },
          {
            type: 'text',
            content: 'Claude Code has no built-in auto-switch — you pick the model with `/model`. But you can add two automation layers: a **skill** that analyses your task and recommends the cheapest model that can handle it, and a **hook** that warns you in real-time if you\'re on the wrong model for what you\'re asking.',
          },
          {
            type: 'table',
            content: 'Model selection cheat sheet',
            headers: ['Task type', 'Recommended model', 'Why'],
            rows: [
              ['Simple edits, renames, formatting', 'Haiku', '~20× cheaper than Opus, more than fast enough'],
              ['Boilerplate, CRUD, test generation', 'Haiku or Sonnet', 'Routine code — no need for reasoning depth'],
              ['Feature implementation, refactoring', 'Sonnet', 'Best price/performance for most real work'],
              ['Complex architecture, debugging, planning', 'Sonnet or Opus', 'Multi-step reasoning pays off here'],
              ['Multi-agent orchestration, research', 'Opus', 'Highest reasoning — worth the cost for hard problems'],
            ],
          },
          {
            type: 'heading',
            level: 2,
            content: '/pick-model — the recommendation skill',
          },
          {
            type: 'steps',
            content: 'Install the skill (one-time setup)',
            steps: [
              'In your project root, create the commands directory: mkdir -p .claude/commands',
              'Create the file: .claude/commands/pick-model.md',
              'Paste the content below into that file and save',
              'Restart Claude Code — run /pick-model before starting any task',
            ],
          },
          {
            type: 'code',
            language: 'markdown',
            content: `---
description: Analyse a task and recommend the most cost-effective Claude model
---

# /pick-model

Analyse the task described in $ARGUMENTS and recommend the most
cost-effective Claude model that can handle it reliably.

## Scoring criteria

Assign one point for each of the following that applies:
1. Requires multi-step reasoning or planning
2. Involves debugging a non-obvious bug
3. Touches more than 5 files or >300 lines of code
4. Needs to understand broader system architecture
5. Is a research or synthesis task (not just writing code)

## Decision

| Score | Model | Switch command |
|-------|-------|---------------|
| 0–1   | Haiku  | \`claude --model claude-haiku-4-5-20251001\` |
| 2–3   | Sonnet | \`claude --model claude-sonnet-4-6\` |
| 4–5   | Opus   | \`claude --model claude-opus-4-6\` |

## Output format

\`\`\`
Task: <one-line summary>
Score: N/5
Recommendation: <Model name>
Reason: <one sentence explaining the key factor>
Switch: <exact command to run>
Estimated saving vs Opus: ~Nx cheaper
\`\`\`

If $ARGUMENTS is empty, ask: "Describe the task you're about to start."`,
          },
          {
            type: 'heading',
            level: 2,
            content: 'UserPromptSubmit hook — real-time model guard',
          },
          {
            type: 'steps',
            content: 'Install the hook (one-time setup)',
            steps: [
              'Create the hooks directory: mkdir -p .claude/hooks',
              'Create the file: .claude/hooks/model-guard.sh and paste the script below',
              'Make it executable: chmod +x .claude/hooks/model-guard.sh',
              'Create or open .claude/settings.json and add the hook config shown after the script',
            ],
          },
          {
            type: 'text',
            content: 'This hook fires on every prompt. It reads the prompt text, detects simple tasks, and injects a cost warning into Claude\'s context if you\'re on Opus or Sonnet for something Haiku could handle.',
          },
          {
            type: 'code',
            language: 'bash',
            content: `#!/bin/bash
# .claude/hooks/model-guard.sh
# UserPromptSubmit hook — warns when Opus is used for simple tasks.
# Claude sees the warning and can suggest switching before proceeding.

PROMPT=$(cat)
CURRENT_MODEL=\${CLAUDE_MODEL:-"unknown"}

# Only warn if on an expensive model
if [[ "$CURRENT_MODEL" != *"opus"* && "$CURRENT_MODEL" != *"sonnet"* ]]; then
  echo '{"action":"continue"}'
  exit 0
fi

PROMPT_TEXT=$(echo "$PROMPT" | jq -r '.prompt // empty' 2>/dev/null || echo "$PROMPT")
WORD_COUNT=$(echo "$PROMPT_TEXT" | wc -w | tr -d ' ')

# Simple-task signals: short prompt with common simple-task keywords
if [ "$WORD_COUNT" -lt 20 ]; then
  SIMPLE_KEYWORDS="rename|fix typo|add comment|format|prettier|lint|reword|change color|update text|bump version"
  if echo "$PROMPT_TEXT" | grep -qiE "($SIMPLE_KEYWORDS)"; then
    echo '{"action":"continue","message":"⚠️  Cost tip: this looks like a simple task. Consider switching to Haiku (claude --model claude-haiku-4-5-20251001) — it costs ~20× less and handles this easily."}'
    exit 0
  fi
fi

echo '{"action":"continue"}'`,
          },
          {
            type: 'code',
            language: 'json',
            content: `// .claude/settings.json — wire the hook
{
  "hooks": {
    "UserPromptSubmit": [
      {
        "type": "command",
        "command": "bash .claude/hooks/model-guard.sh"
      }
    ]
  }
}`,
          },
          {
            type: 'callout',
            calloutVariant: 'info',
            content: 'The hook uses `"action":"continue"` with a `"message"` field — this lets the operation proceed but injects the cost tip into Claude\'s context so it can surface the suggestion to you naturally.',
          },
          {
            type: 'callout',
            calloutVariant: 'success',
            content: '**Quick win:** Add `/pick-model` to your project today. Run it at the start of each task. Over a week of development, consistently using Haiku for simple tasks and Sonnet for mid-complexity work can cut your Claude Code bill by 60–80%.',
          },
        ],
      },
    ],
  },
  {
    id: 'module-5',
    title: 'Live API Mastery',
    description: 'Build production-ready applications with the Anthropic Messages API.',
    icon: 'Code2',
    color: 'red',
    quizId: 'quiz-module-5',
    lessons: [
      {
        id: 'lesson-5-1',
        title: 'Messages API Fundamentals',
        description: 'Understand the core structure of Anthropic API requests and responses.',
        estimatedMinutes: 7,
        blocks: [
          {
            type: 'lesson-player',
          },
          {
            type: 'text',
            content: 'The Anthropic Messages API is the foundation for all Claude integrations. Understanding its structure — messages array, system prompt, model selection, and token limits — is essential for building reliable applications.',
          },
          {
            type: 'code',
            language: 'typescript',
            content: `import Anthropic from '@anthropic-ai/sdk';

const client = new Anthropic({
  apiKey: process.env.ANTHROPIC_API_KEY,
});

const message = await client.messages.create({
  model: 'claude-sonnet-4-6',
  max_tokens: 1024,
  // system is a TOP-LEVEL field, not a message role
  system: 'You are a helpful assistant specialized in TypeScript.',
  messages: [
    { role: 'user', content: 'Explain async/await in 2 sentences.' }
  ]
});

console.log(message.content[0].text);
// → "Async/await is syntactic sugar over Promises..."
console.log(message.usage);
// → { input_tokens: 42, output_tokens: 38 }`,
          },
          {
            type: 'callout',
            calloutVariant: 'info',
            content: 'The system prompt is a separate top-level field, not a message with role "system" (unlike OpenAI). This structure also allows per-block cache_control for granular caching.',
          },
        ],
      },
      {
        id: 'lesson-5-2',
        title: 'Streaming Responses',
        description: 'Implement streaming for responsive, real-time user interfaces.',
        estimatedMinutes: 8,
        blocks: [
          {
            type: 'lesson-player',
          },
          {
            type: 'text',
            content: 'Streaming delivers tokens as they\'re generated, dramatically improving perceived responsiveness. The SDK provides a high-level stream() method that handles the SSE protocol for you.',
          },
          {
            type: 'code',
            language: 'typescript',
            content: `import Anthropic from '@anthropic-ai/sdk';

const client = new Anthropic();

// High-level streaming (recommended)
const stream = client.messages.stream({
  model: 'claude-sonnet-4-6',
  max_tokens: 1024,
  messages: [{ role: 'user', content: 'Write a haiku about TypeScript.' }],
});

// Receive tokens in real-time
stream.on('text', (text) => {
  process.stdout.write(text);
});

// Get final message with usage stats
const message = await stream.finalMessage();
console.log('\\nUsage:', message.usage);`,
          },
          {
            type: 'table',
            content: 'Streaming event types (raw SSE)',
            headers: ['Event', 'Contains'],
            rows: [
              ['message_start', 'Model, initial usage estimate'],
              ['content_block_start', 'Start of a new content block'],
              ['content_block_delta', 'Incremental text (delta.text)'],
              ['content_block_stop', 'End of a content block'],
              ['message_delta', 'Final usage stats (output_tokens)'],
              ['message_stop', 'Stream complete signal'],
            ],
          },
        ],
      },
      {
        id: 'lesson-5-3',
        title: 'Advanced Techniques',
        description: 'Tool use, vision, multi-turn conversations, and generation parameters.',
        estimatedMinutes: 10,
        blocks: [
          {
            type: 'lesson-player',
          },
          {
            type: 'text',
            content: 'Beyond basic text generation, Claude supports tool use (function calling), vision (image analysis), and fine-grained control over generation behavior through temperature, top_p, and top_k parameters.',
          },
          {
            type: 'code',
            language: 'typescript',
            content: `// Tool use (function calling)
const response = await client.messages.create({
  model: 'claude-sonnet-4-6',
  max_tokens: 1024,
  tools: [
    {
      name: 'get_weather',
      description: 'Get the current weather for a location',
      input_schema: {
        type: 'object',
        properties: {
          location: { type: 'string', description: 'City name' }
        },
        required: ['location']
      }
    }
  ],
  messages: [{ role: 'user', content: 'What\'s the weather in Tokyo?' }]
});

// If Claude wants to call a tool:
if (response.stop_reason === 'tool_use') {
  const toolCall = response.content.find(b => b.type === 'tool_use');
  // Execute the tool, then send results back in the next turn
}`,
          },
          {
            type: 'tip',
            content: 'Use temperature: 0 for factual/code tasks (consistent output), and temperature: 1 for creative writing. The default is 1; most production applications benefit from lower values.',
          },
        ],
      },
      {
        id: 'lesson-5-4',
        title: 'Production Best Practices',
        description: 'Rate limits, error handling, retry logic, and API key security.',
        estimatedMinutes: 7,
        blocks: [
          {
            type: 'lesson-player',
          },
          {
            type: 'text',
            content: 'Production Claude integrations need robust error handling, proper retry logic, and strict API key security. Here are the patterns that matter most.',
          },
          {
            type: 'table',
            content: 'HTTP status codes to handle',
            headers: ['Status', 'Meaning', 'Action'],
            rows: [
              ['400', 'Bad Request', 'Fix the request parameters — don\'t retry'],
              ['401', 'Unauthorized', 'Check API key — don\'t retry'],
              ['403', 'Forbidden', 'Check permissions — don\'t retry'],
              ['429', 'Rate Limited', 'Exponential backoff — retry'],
              ['500/529', 'Server Error', 'Exponential backoff — retry'],
            ],
          },
          {
            type: 'code',
            language: 'typescript',
            content: `import Anthropic from '@anthropic-ai/sdk';

// SDK handles retries automatically
const client = new Anthropic({
  apiKey: process.env.ANTHROPIC_API_KEY, // ← server-side only
  maxRetries: 3, // Automatic exponential backoff on 429/5xx
  timeout: 30000, // 30s timeout
});

// Never expose API keys in:
// ❌ Client-side JavaScript (window, browser)
// ❌ Environment variables in Docker logs
// ❌ Git repositories
// ✅ Server-side environment variables only
// ✅ Secret managers (AWS Secrets Manager, Vault)`,
          },
          {
            type: 'callout',
            calloutVariant: 'warning',
            content: 'Never call the Anthropic API from the browser directly with an exposed API key. Always proxy through your backend server. The dangerouslyAllowBrowser: true flag is for automated testing only.',
          },
        ],
      },

      // ── Lesson 5-5: Extended Thinking & Budget Tokens ───────────────────
      {
        id: 'lesson-5-5',
        title: 'Extended Thinking & Budget Tokens',
        description: 'Unlock Claude\'s step-by-step reasoning for hard problems — and control exactly how much thinking compute you pay for.',
        estimatedMinutes: 8,
        blocks: [
          { type: 'lesson-player' },
          {
            type: 'text',
            content: 'Extended thinking gives Claude a scratchpad to reason through hard problems before answering. It\'s not magic — it\'s compute. You set a `budget_tokens` ceiling on how much internal reasoning Claude does, and you pay for those tokens at input rates. For simple tasks it\'s wasteful. For complex reasoning it\'s transformative.',
          },
          {
            type: 'heading', level: 2,
            content: 'How to enable it',
          },
          {
            type: 'code',
            language: 'typescript',
            content: `import Anthropic from '@anthropic-ai/sdk';
const client = new Anthropic();

const response = await client.messages.create({
  model: 'claude-opus-4-6',
  max_tokens: 16000,
  thinking: {
    type: 'enabled',
    budget_tokens: 10000,  // max tokens Claude can use for internal reasoning
  },
  messages: [{
    role: 'user',
    content: 'Design the optimal database schema for a multi-tenant SaaS with row-level security, audit logs, and soft deletes. Justify every decision.',
  }],
});

// Response contains both thinking blocks and text blocks
for (const block of response.content) {
  if (block.type === 'thinking') {
    console.log('Claude\'s reasoning:', block.thinking);
  }
  if (block.type === 'text') {
    console.log('Final answer:', block.text);
  }
}`,
          },
          {
            type: 'callout',
            calloutVariant: 'warning',
            content: '`budget_tokens` must be at least **1,024** and less than `max_tokens`. If you set `budget_tokens: 10000`, set `max_tokens` to at least `11000` to leave room for the actual answer.',
          },
          {
            type: 'heading', level: 2,
            content: 'When to use extended thinking',
          },
          {
            type: 'table',
            headers: ['Use it for', 'Skip it for', 'Why'],
            rows: [
              ['Complex architecture decisions', 'Summarising text', 'Reasoning adds no value for retrieval tasks'],
              ['Multi-step debugging with many variables', 'Simple Q&A', 'Overkill — costs 5–10× more per response'],
              ['Math, algorithms, constraint solving', 'Code formatting / style fixes', 'Claude doesn\'t need to reason about syntax'],
              ['Weighing trade-offs across many options', 'One-shot classification', 'Classification doesn\'t benefit from deliberation'],
            ],
          },
          {
            type: 'heading', level: 2,
            content: 'Budget sizing guide',
          },
          {
            type: 'table',
            headers: ['Task complexity', 'Suggested budget_tokens', 'Rough extra cost'],
            rows: [
              ['Light reasoning (a few steps)', '1,024 – 2,000', '+$0.01–0.02 per call'],
              ['Medium (design choices, trade-offs)', '4,000 – 8,000', '+$0.04–0.08 per call'],
              ['Heavy (proofs, full architecture, complex debugging)', '10,000 – 20,000', '+$0.10–0.20 per call'],
              ['Maximum (Opus, hardest problems)', '32,000+', '+$0.30+ per call'],
            ],
          },
          {
            type: 'heading', level: 2,
            content: 'Streaming with extended thinking',
          },
          {
            type: 'code',
            language: 'typescript',
            content: `// Stream extended thinking — show thinking in real time
const stream = await client.messages.stream({
  model: 'claude-opus-4-6',
  max_tokens: 12000,
  thinking: { type: 'enabled', budget_tokens: 8000 },
  messages: [{ role: 'user', content: 'Solve this...' }],
});

for await (const event of stream) {
  if (event.type === 'content_block_delta') {
    if (event.delta.type === 'thinking_delta') {
      process.stdout.write(event.delta.thinking); // live reasoning
    }
    if (event.delta.type === 'text_delta') {
      process.stdout.write(event.delta.text);     // live answer
    }
  }
}`,
          },
          {
            type: 'callout',
            calloutVariant: 'tip',
            content: '**Production pattern:** Show a "thinking..." spinner while the thinking blocks stream, then display the final text block as the answer. Users don\'t need to see the raw reasoning — but logging it for debugging is valuable.',
          },
        ],
      },
    ],
  },
  {
    id: 'module-6',
    title: 'Prompt Engineering Foundations',
    description: 'Systematic techniques for getting better output from Claude — anatomy of a great prompt, chain-of-thought, few-shot examples, and a repeatable debugging workflow.',
    icon: 'Lightbulb',
    color: 'yellow',
    quizId: 'quiz-module-6',
    lessons: [
      // ── Lesson 6-1: Anatomy of a Great Prompt ───────────────────────────
      {
        id: 'lesson-6-1',
        title: 'The Anatomy of a Great Prompt',
        description: 'The five components every high-quality Claude prompt needs — and the common omissions that cause vague, inconsistent output.',
        estimatedMinutes: 8,
        blocks: [
          { type: 'lesson-player' },
          {
            type: 'text',
            content: 'Most prompts fail for the same reason: they describe *what* to do but omit *context*, *constraints*, and *output format*. Claude is powerful but not telepathic. The more precisely you define the task, the more predictably it delivers.',
          },
          {
            type: 'heading', level: 2,
            content: 'The five components',
          },
          {
            type: 'table',
            headers: ['Component', 'What to specify', 'If you skip it…'],
            rows: [
              ['**Role**', 'Who Claude is in this context', 'Claude defaults to a generic helpful assistant — often less precise than a specialist'],
              ['**Context**', 'Background: codebase, constraints, decisions made', 'Claude makes assumptions that may contradict your situation'],
              ['**Task**', 'The exact action to perform', 'Ambiguity leads to hedged, incomplete answers'],
              ['**Format**', 'Output structure: JSON, markdown, bullet list, code block', 'Claude chooses format for itself — often wrong for downstream use'],
              ['**Constraints**', 'What NOT to do, scope limits, style rules', 'Claude over-engineers, changes files it shouldn\'t, or violates team conventions'],
            ],
          },
          {
            type: 'comparison',
            content: '',
            do: {
              label: '✅ Five-component prompt',
              language: 'text',
              code: `Role: You are a TypeScript engineer specialising
in React performance.

Context: This is a Next.js 14 app using the App
Router. Components must be server components unless
interactivity is required.

Task: Refactor the UserList component to eliminate
unnecessary re-renders.

Format: Return only the updated file. Add a comment
above each change explaining why.

Constraints: Do not convert to client component.
Do not change the data-fetching logic.`,
            },
            dont: {
              label: '❌ Vague prompt',
              language: 'text',
              code: `Make the UserList component faster.

→ No context: what stack? what constraints?
→ No format: full file? diff? explanation?
→ No constraints: can it change anything?
→ Result: random improvements, wrong assumptions`,
            },
          },
          {
            type: 'heading', level: 2,
            content: 'System prompt vs user message',
          },
          {
            type: 'text',
            content: 'In the API, **Role** and **Context** belong in the system prompt — they stay stable across turns. **Task**, **Format**, and **Constraints** go in the user message — they change per request. In Claude Code skills, the skill file body acts as the system prompt.',
          },
          {
            type: 'code',
            language: 'typescript',
            content: `// Role + Context → system prompt (stable across turns)
const systemPrompt = \`You are a TypeScript engineer specialising in React performance.
This is a Next.js 14 App Router project. Components must be server
components unless interactivity is required.\`;

// Task + Format + Constraints → user message (changes per request)
const userMessage = \`Refactor the UserList component to eliminate re-renders.
Return only the updated file with a comment above each change.
Do not convert to a client component.\`;`,
          },
          {
            type: 'callout',
            calloutVariant: 'tip',
            content: '**The one-sentence test:** Read your task description aloud. If someone handed it to a junior developer with no other context, would they know exactly what to produce? If not, add more context and constraints.',
          },
          {
            type: 'exercise',
            content: 'Rewrite a vague prompt',
            exercise: {
              prompt: 'Take a prompt you\'ve used recently that produced mediocre output. Rewrite it using all five components. Compare the outputs.',
              hints: [
                'If you can\'t think of one, use: "Write a function that validates user input"',
                'Be specific about the language, the expected input types, the error format, and what should NOT be validated',
              ],
              solution: `// Before (vague)
"Write a function that validates user input"

// After (five components)
Role: TypeScript engineer working on a Node.js REST API.

Context: We use Zod for schema validation. Errors are returned
as { field: string; message: string }[] arrays — not thrown.

Task: Write a validateCreateUser function that validates:
- email (valid format, max 255 chars)
- password (min 8 chars, at least one number)
- username (alphanumeric + underscore, 3–30 chars)

Format: TypeScript function with explicit types. Export it.

Constraints: Use Zod. Do not throw — return an empty array
if valid, an array of field errors if invalid.`,
              solutionLanguage: 'text',
            },
          },
        ],
      },

      // ── Lesson 6-2: Chain-of-Thought & Reasoning Patterns ───────────────
      {
        id: 'lesson-6-2',
        title: 'Chain-of-Thought & Reasoning Patterns',
        description: 'Make Claude think before it answers — the techniques that dramatically improve output quality on complex tasks.',
        estimatedMinutes: 8,
        blocks: [
          { type: 'lesson-player' },
          {
            type: 'text',
            content: 'Claude produces better answers when it reasons step by step before committing to a response. You don\'t need extended thinking (API-only) to get this — you can elicit chain-of-thought reasoning through prompting alone.',
          },
          {
            type: 'heading', level: 2,
            content: 'The core technique: "Think first, then answer"',
          },
          {
            type: 'comparison',
            content: '',
            do: {
              label: '✅ Elicit reasoning',
              language: 'text',
              code: `Before giving the solution, think through:
1. What are the constraints?
2. What are the failure modes?
3. What assumptions am I making?

Then give the solution.`,
            },
            dont: {
              label: '❌ Immediate answer',
              language: 'text',
              code: `Give me the solution.

→ Claude answers fast but may miss edge cases,
  constraints, or non-obvious failure modes.`,
            },
          },
          {
            type: 'heading', level: 2,
            content: 'Four chain-of-thought patterns',
          },
          {
            type: 'table',
            headers: ['Pattern', 'When to use', 'Prompt trigger'],
            rows: [
              ['**Step-by-step**', 'Sequential problems: algorithms, migrations, deployment plans', '"Walk through this step by step before writing any code."'],
              ['**Pros/cons**', 'Architecture decisions, trade-off analysis', '"List the pros and cons of each option before recommending one."'],
              ['**Rubber duck**', 'Debugging, understanding existing code', '"Explain what this code does line by line, then tell me where the bug is."'],
              ['**Assumption audit**', 'Ambiguous requirements, underspecified tasks', '"List every assumption you\'re making about this task before starting."'],
            ],
          },
          {
            type: 'heading', level: 2,
            content: 'Scratchpad pattern',
          },
          {
            type: 'text',
            content: 'For complex tasks, ask Claude to use a scratchpad section before its answer. This separates reasoning from output — the scratchpad can be messy, the answer should be clean.',
          },
          {
            type: 'code',
            language: 'text',
            content: `Use this structure:

<scratchpad>
Think freely here. List edge cases, constraints,
options you considered and rejected. This won't
be part of the deliverable.
</scratchpad>

<answer>
The final, clean output goes here.
</answer>`,
          },
          {
            type: 'heading', level: 2,
            content: 'When chain-of-thought hurts',
          },
          {
            type: 'callout',
            calloutVariant: 'warning',
            content: 'Don\'t force reasoning on simple tasks. "Think step by step before telling me what 2+2 is" wastes tokens and adds latency. Chain-of-thought helps with **hard reasoning tasks** — it has no benefit (and real cost) on retrieval, formatting, or classification tasks.',
          },
          {
            type: 'table',
            headers: ['Worth it', 'Not worth it'],
            rows: [
              ['Debugging a subtle race condition', 'Reformatting a JSON blob'],
              ['Designing a database schema', 'Summarising a short document'],
              ['Choosing between architectural patterns', 'Renaming variables'],
              ['Analysing security vulnerabilities', 'Generating boilerplate'],
            ],
          },
        ],
      },

      // ── Lesson 6-3: Few-Shot Examples & Output Shaping ──────────────────
      {
        id: 'lesson-6-3',
        title: 'Few-Shot Examples & Output Shaping',
        description: 'Show Claude exactly what good output looks like — examples are worth a thousand words of instruction.',
        estimatedMinutes: 7,
        blocks: [
          { type: 'lesson-player' },
          {
            type: 'text',
            content: 'The single most effective technique for getting consistent, correctly-formatted output from Claude is showing it examples. One well-chosen example beats three paragraphs of instructions describing the format.',
          },
          {
            type: 'heading', level: 2,
            content: 'Few-shot in practice',
          },
          {
            type: 'code',
            language: 'text',
            content: `Extract action items from meeting notes as JSON.

Example input:
"Discussed the login bug. Sarah to fix by Friday.
Tom will review the PR. Backlog: update onboarding docs."

Example output:
[
  { "owner": "Sarah", "task": "Fix login bug", "due": "Friday" },
  { "owner": "Tom",   "task": "Review Sarah's PR", "due": null },
  { "owner": null,    "task": "Update onboarding docs", "due": null }
]

Now process this:
"{{MEETING_NOTES}}"`,
          },
          {
            type: 'callout',
            calloutVariant: 'tip',
            content: '**One good example beats zero.** Two or three examples that cover edge cases are better than one. More than five is usually redundant — and expensive.',
          },
          {
            type: 'heading', level: 2,
            content: 'Output shaping techniques',
          },
          {
            type: 'table',
            headers: ['Technique', 'How', 'Best for'],
            rows: [
              ['**Example output**', 'Show a complete ideal response in the prompt', 'Consistent structure, tone, or format'],
              ['**Partial completion**', 'Start the answer for Claude: `{"result":`', 'Forcing JSON or a specific opening — Claude fills it in'],
              ['**Negative examples**', '"Do NOT format it like this: ..."', 'Avoiding a specific bad pattern Claude defaults to'],
              ['**Output template**', 'Provide a fill-in-the-blanks template', 'Highly structured reports, docs, commit messages'],
            ],
          },
          {
            type: 'code',
            language: 'text',
            content: `// Partial completion trick — forces JSON output
Analyse this error and return diagnosis.

Respond with only this JSON (no markdown wrapper):
{"severity": "<critical|high|medium|low>", "root_cause": "<one sentence>", "fix": "<concrete action>", "affected_files": []}

Error: {{ERROR_TEXT}}

{"severity":`,
          },
          {
            type: 'heading', level: 2,
            content: 'Calibrating tone and style',
          },
          {
            type: 'text',
            content: 'If you want Claude to match a specific writing style — documentation tone, commit message style, code review voice — the fastest way is to paste 2–3 real examples from your codebase and say "Match this style exactly."',
          },
          {
            type: 'comparison',
            content: '',
            do: {
              label: '✅ Style calibration with examples',
              language: 'text',
              code: `Write a commit message for these changes.
Match our team's style exactly. Examples:

"fix(auth): prevent token refresh loop on 401"
"feat(api): add rate limiting to /messages endpoint"
"chore(deps): upgrade tailwind to v4"

Changes: [diff here]`,
            },
            dont: {
              label: '❌ Style instruction without examples',
              language: 'text',
              code: `Write a commit message. Use conventional
commits format and keep it concise.

→ "concise" and "conventional" mean different
  things to different people. Claude guesses.`,
            },
          },
        ],
      },

      // ── Lesson 6-4: Prompt Debugging & Iteration ────────────────────────
      {
        id: 'lesson-6-4',
        title: 'Prompt Debugging & Iteration',
        description: 'A systematic process for diagnosing why a prompt fails and improving it — without random trial and error.',
        estimatedMinutes: 7,
        blocks: [
          { type: 'lesson-player' },
          {
            type: 'text',
            content: 'Bad output is a symptom. The root cause is almost always one of five things: missing context, ambiguous task, missing format spec, missing constraints, or a model capability limit. Knowing which one saves you from random trial and error.',
          },
          {
            type: 'heading', level: 2,
            content: 'The five root causes of bad output',
          },
          {
            type: 'table',
            headers: ['Symptom', 'Root cause', 'Fix'],
            rows: [
              ['Answer is generic, not project-specific', 'Missing context', 'Add tech stack, constraints, decisions already made'],
              ['Answer doesn\'t address what you actually wanted', 'Ambiguous task', 'Restate the task as a single, unambiguous sentence'],
              ['Format is inconsistent across runs', 'Missing format spec', 'Add an explicit format instruction or example output'],
              ['Claude changes things it shouldn\'t', 'Missing constraints', 'Add explicit "do not" rules'],
              ['Answer is wrong despite clear instructions', 'Model capability limit', 'Try extended thinking, break into smaller tasks, or use a larger model'],
            ],
          },
          {
            type: 'heading', level: 2,
            content: 'The diagnosis loop',
          },
          {
            type: 'steps',
            content: 'When a prompt produces bad output',
            steps: [
              '**Ask Claude why:** "You produced X. I expected Y. What was ambiguous or missing in my prompt?" — Claude is surprisingly good at self-diagnosing prompt issues.',
              '**Isolate the failure:** Run the prompt on a minimal, controlled input so you know exactly what\'s wrong.',
              '**Identify the root cause** from the table above — pick the most likely one.',
              '**Make one change at a time.** Changing multiple things at once makes it impossible to know what fixed it.',
              '**Test on three inputs** before concluding the fix works — one example proving it is never enough.',
            ],
          },
          {
            type: 'heading', level: 2,
            content: 'Prompt versioning for skills',
          },
          {
            type: 'text',
            content: 'Skills are prompts you run repeatedly. Treat them like code — version them in git, write test cases for them, and document what you changed and why.',
          },
          {
            type: 'code',
            language: 'markdown',
            content: `# /security-review

<!-- v3: Added explicit OWASP Top 10 checklist after v2 missed SQL injection -->
<!-- v2: Added "do not flag low-severity style issues" after too much noise -->
<!-- v1: Initial version -->

You are a security engineer. Review the following code for vulnerabilities.

Focus on OWASP Top 10. For each finding:
- Severity: CRITICAL / HIGH / MEDIUM / LOW
- Location: file:line
- Description: one sentence
- Fix: concrete code change

Do NOT flag style issues, missing tests, or performance concerns.
Only flag security vulnerabilities.`,
          },
          {
            type: 'callout',
            calloutVariant: 'tip',
            content: '**The golden rule of prompt iteration:** Change one variable per run. Prompt engineering is an experiment — and good experiments have one independent variable at a time.',
          },
        ],
      },
    ],
  },
  {
    id: 'module-7',
    title: 'Sub-Agents & Parallelism',
    description: 'Spawn multiple Claude agents to work in parallel, delegate complex research, and build multi-agent pipelines for massive speed gains.',
    icon: 'GitBranch',
    color: 'cyan',
    quizId: 'quiz-module-7',
    lessons: [
      {
        id: 'lesson-7-1',
        title: 'What Are Sub-Agents?',
        description: 'Understand the sub-agent mental model and when to reach for it.',
        estimatedMinutes: 7,
        blocks: [
          {
            type: 'lesson-player',
          },
          {
            type: 'text',
            content: 'A **sub-agent** is a separate Claude instance you spawn from inside a conversation. It starts with a completely clean slate, runs autonomously, does one specific job, and returns a single final answer. Think of it like hiring a contractor: you hand them a clear brief, they go away and do the work, and you get a deliverable back.',
          },
          {
            type: 'callout',
            calloutVariant: 'info',
            content: 'Sub-agents are launched with the **Task tool** — a built-in Claude Code tool that spins up a new Claude instance. When you ask Claude Code to "delegate this work" or "use a sub-agent," it calls the Task tool internally. You never write the tool call yourself — you write the **delegation prompt**, which is the set of instructions the sub-agent will receive.',
          },
          {
            type: 'heading',
            content: 'A Concrete Before / After',
          },
          {
            type: 'text',
            content: 'Suppose you want to audit a Next.js app for three separate issues: authentication weaknesses, missing input validation, and missing rate limiting. Here is the difference between the two approaches:',
          },
          {
            type: 'comparison',
            content: '',
            do: {
              label: 'With sub-agents — parallel, fast',
              code: `You tell Claude Code once:
"Audit this app. Spawn 3 parallel agents:
 - Agent 1: check src/app/api/auth/ for JWT issues
 - Agent 2: check all API routes for missing validation
 - Agent 3: check middleware.ts for rate-limit gaps
Merge all findings when they finish."

Total wall-clock time ≈ time for the slowest agent
Each agent has a small, focused context window`,
            },
            dont: {
              label: 'Without sub-agents — sequential, slow',
              code: `You ask Claude Code three separate times:
1. "Check auth issues..."   → waits → result
2. "Check validation..."    → waits → result
3. "Check rate limiting..." → waits → result

Total time = sum of all three waits
One growing context window holds all unrelated detail`,
            },
          },
          {
            type: 'heading',
            content: 'Why Use Sub-Agents?',
          },
          {
            type: 'table',
            headers: ['Problem', 'Sub-Agent Solution'],
            rows: [
              ['Context window fills up reading a large codebase', 'Delegate exploration to a sub-agent; get a concise summary back instead of all raw content'],
              ['Three independent tasks done one-by-one wastes time', 'Run all three in parallel — total time equals the slowest, not the sum'],
              ['One conversation accumulates unrelated noise', 'Each agent receives only the context it needs — nothing else clutters its window'],
              ['You want specialized focus', 'One agent researches, one designs, one implements, one reviews — each prompt tuned for its single role'],
            ],
          },
          {
            type: 'heading',
            content: 'The Sub-Agent Lifecycle',
          },
          {
            type: 'steps',
            content: 'Four steps every sub-agent goes through',
            steps: [
              'Parent decides to delegate — Claude Code (in your main chat) identifies a well-scoped subtask: "explore all API files and list the public endpoints."',
              'Sub-agent is spawned with a delegation prompt — the parent passes a detailed prompt. The sub-agent starts completely fresh: no memory of your chat history, no knowledge of other agents running in parallel, no awareness of anything except what is written in that prompt.',
              'Sub-agent works autonomously — it uses its available tools (Read, Grep, Bash, Write, etc.) to complete the task. The parent either waits for the result (blocking) or continues with other work (background / non-blocking).',
              'Sub-agent returns one result — when done, it sends a single final message to the parent. The parent receives it, inspects it, and integrates it into the main conversation.',
            ],
          },
          {
            type: 'callout',
            calloutVariant: 'warning',
            content: '**The most important thing to understand**: every sub-agent starts with zero memory. It does not know your project name, your tech stack, what you discussed five minutes ago, or what other sub-agents found. Everything the agent needs must be written explicitly in the delegation prompt. Missing context = wrong or incomplete results.',
          },
        ],
      },
      {
        id: 'lesson-7-2',
        title: 'Invoking Sub-Agents: What You Actually Type',
        description: 'See exactly what to type in the Claude Code terminal — from a one-liner to controlling model, background mode, and isolation.',
        estimatedMinutes: 5,
        blocks: [
          {
            type: 'lesson-player',
          },
          {
            type: 'text',
            content: 'Claude Code is a terminal chat. You type messages; Claude responds. To spawn a sub-agent, you simply **describe what you want delegated** — Claude reads it and calls the Task tool internally. You never write JSON or call any API.',
          },
          {
            type: 'heading',
            content: 'Open Claude Code in Your Project',
          },
          {
            type: 'callout',
            calloutVariant: 'info',
            content: '**Run this first**: navigate to your project directory in a terminal and start Claude Code. Every example in this module happens inside this session.',
          },
          {
            type: 'code',
            language: 'bash',
            content: `cd my-nextjs-app
claude`,
          },
          {
            type: 'heading',
            content: 'Controlling Parameters in Plain English',
          },
          {
            type: 'text',
            content: 'Every Task tool parameter has a natural-language equivalent. You do not set parameters with code — you mention them in your message:',
          },
          {
            type: 'table',
            headers: ['What you say', 'Parameter it sets', 'Effect'],
            rows: [
              ['"Use an **Explore** agent"', '`subagent_type: Explore`', 'Fast read-only codebase search'],
              ['"Use a **Bash** agent"', '`subagent_type: Bash`', 'Runs terminal commands (git, npm, etc.)'],
              ['"Use a **general-purpose** agent"', '`subagent_type: general-purpose`', 'Multi-step tasks, writing code'],
              ['"Use a **Plan** agent"', '`subagent_type: Plan`', 'Architecture and implementation planning'],
              ['"Use **Haiku**" / "use a cheap fast model"', '`model: haiku`', '~20× cheaper, great for simple reads'],
              ['"Use **Opus**" / "use the best model"', '`model: opus`', 'Most capable — for complex reasoning'],
              ['"Run **in the background**"', '`run_in_background: true`', 'Non-blocking — you keep chatting while it runs'],
              ['"Use a **worktree**" / "use **isolation**"', '`isolation: worktree`', 'Agent gets its own git branch — safe to write files'],
            ],
          },
          {
            type: 'heading',
            content: 'Terminal Examples',
          },
          {
            type: 'text',
            content: 'Each tab below shows what you type at the `>` prompt and what you see in the terminal. Click through to see all four invocation styles:',
          },
          {
            type: 'tabs',
            content: '',
            tabs: [
              {
                label: 'Simple one-liner',
                language: 'bash',
                content: `# What you type — no agent type needed, Claude picks automatically:
> find all useEffect hooks in src/components — return file paths and line numbers

# What you see while it runs:
⠋ Find useEffect usages [Explore]
  ⎿ Reading src/components/Header.tsx
  ⎿ Reading src/components/Sidebar.tsx
  ⎿ Reading src/components/Modal.tsx
  ⎿ (20 more files...)

# Result:
Found useEffect in 4 files:
- src/components/Header.tsx — lines 14, 28
- src/components/Sidebar.tsx — line 9
- src/components/Modal.tsx — lines 22, 45, 67
- src/components/DataTable.tsx — line 31`,
              },
              {
                label: 'Explicit: Haiku + Explore',
                language: 'bash',
                content: `# Explicitly request a cheap Haiku-powered Explore agent.
# Use this for simple grep-style searches where cost matters.

# What you type:
> Use a Haiku Explore agent to list every .ts file in src/lib
  that exports a function named "validate". Return file paths and line numbers only.

# What you see:
⠋ Find validate exports [Explore · haiku]
  ⎿ Scanning src/lib/auth.ts
  ⎿ Scanning src/lib/forms.ts
  ⎿ Scanning src/lib/payments.ts
  ⎿ (12 more files...)

# Result:
- src/lib/auth.ts — line 12
- src/lib/forms.ts — lines 7, 89`,
              },
              {
                label: 'Background agent',
                language: 'bash',
                content: `# "in the background" = non-blocking.
# The agent starts immediately and you can keep chatting.
# Claude notifies you when it finishes.

# What you type:
> Spawn a background Explore agent to count lines of code in every
  file under src/components. Return a table: File | Lines.

# What you see immediately (you are NOT blocked):
● Agent started in background: Count component LOC [Explore]
  You can keep working — I'll notify you when it finishes.

# ...you keep chatting... then later:
● Background agent finished: Count component LOC
  ⎿ src/components/Header.tsx     — 142 lines
  ⎿ src/components/Sidebar.tsx    — 89 lines
  ⎿ src/components/Modal.tsx      — 234 lines
  ⎿ src/components/DataTable.tsx  — 317 lines`,
              },
              {
                label: 'Isolated: worktree',
                language: 'bash',
                content: `# "worktree" or "isolated" = agent gets its own git branch.
# Use this whenever the agent will write or delete files.
# Changes stay isolated until you explicitly merge them.

# What you type:
> Use an isolated general-purpose agent (worktree) to refactor
  src/lib/auth.ts — extract the JWT decode logic into a separate
  helper called decodeToken(). Do not touch any other file.

# What you see:
⠋ Refactor auth helpers [general-purpose · worktree]
  ⎿ Creating isolated git branch: worktree/refactor-auth-helpers
  ⎿ Reading src/lib/auth.ts
  ⎿ Writing src/lib/auth.ts

# Result:
Done. Extracted decodeToken() into src/lib/auth.ts (lines 1–18).

Changes are isolated in branch: worktree/refactor-auth-helpers
Review the diff and merge manually when ready, or ask me to merge it.`,
              },
            ],
          },
          {
            type: 'callout',
            calloutVariant: 'warning',
            content: 'Always use worktree isolation when an agent will **write or delete files**. Without it, the agent modifies your working directory directly and there is no easy undo.',
          },
          {
            type: 'heading',
            content: 'Available Sub-Agent Types',
          },
          {
            type: 'table',
            headers: ['Type', 'Best For', 'Example phrase'],
            rows: [
              ['`Explore`', 'Read-only codebase search, answering questions about code', '"Use an Explore agent to find all..."'],
              ['`Bash`', 'Running terminal commands (git, npm, tests)', '"Use a Bash agent to run the test suite and report failures"'],
              ['`general-purpose`', 'Multi-step tasks, writing/editing code, research', '"Use a general-purpose agent to implement..."'],
              ['`Plan`', 'Architecture decisions, implementation strategy', '"Use a Plan agent to design a schema for..."'],
              ['GSD agents (e.g. `gsd-executor`)', 'Full GSD workflow phases', '"Use the gsd-executor to run phase 3"'],
            ],
          },
        ],
      },
      {
        id: 'lesson-7-3',
        title: 'Writing Effective Delegation Prompts',
        description: 'Learn the four-section prompt structure that gets reliable results from any sub-agent.',
        estimatedMinutes: 8,
        blocks: [
          {
            type: 'lesson-player',
          },
          {
            type: 'text',
            content: 'A one-liner is enough for a simple search. But the moment a task has specific requirements, edge cases, or a precise output format, you need a **structured delegation prompt**. This lesson covers the four sections every good delegation prompt has — and why each one matters.',
          },
          {
            type: 'heading',
            content: 'The Four Sections',
          },
          {
            type: 'steps',
            content: 'Every delegation prompt should answer these four questions',
            steps: [
              '**Context** — What does the agent need to know before it starts? Tech stack, relevant file paths, any prior decisions. Remember: the agent starts fresh with zero memory.',
              '**Goal** — What does "done" look like? Be specific and measurable: "Find all X", "Write a function that does Y", "Verify that Z is true". Avoid vague instructions like "analyze the codebase".',
              '**Output Format** — How should the result be structured? JSON array, markdown table, numbered list, bullet list. Without this, agents return prose that is hard to read or pass to the next step.',
              '**Constraints** — What should the agent NOT do? "Read-only", "only look in src/auth/", "do not add new dependencies". Agents without constraints can over-reach.',
            ],
          },
          {
            type: 'heading',
            content: 'Full Example',
          },
          {
            type: 'callout',
            calloutVariant: 'info',
            content: '**Where this goes**: Paste it directly into the Claude Code chat (after the `>` prompt). The markdown headers are just for readability — Claude reads the whole thing as your message.',
          },
          {
            type: 'code',
            language: 'markdown',
            content: `Use an Explore sub-agent to audit the authentication module.

## Context
This is a Next.js 14 app. Auth logic lives in:
- src/app/api/auth/   (API routes for login, logout, refresh)
- src/lib/auth.ts     (JWT helper functions)

## Goal
Find all places where JWTs are verified. For each location check:
1. Is the expiry (exp claim) validated?
2. Is the signature algorithm pinned (NOT set to 'none')?
3. Are errors caught and handled — not silently swallowed?

## Output Format
Return a markdown list. For each location:
- File path and line number
- Verdict: PASS / FAIL / NEEDS_REVIEW
- One-line explanation

## Constraints
- Read files only — do NOT modify anything
- If a file does not exist, note it and continue`,
          },
          {
            type: 'code',
            language: 'bash',
            content: `# What you see in the terminal while it runs:
⠋ Audit auth module [Explore]
  ⎿ Reading src/app/api/auth/login/route.ts
  ⎿ Reading src/app/api/auth/refresh/route.ts
  ⎿ Reading src/lib/auth.ts

# Result Claude returns:
- src/lib/auth.ts:34 — FAIL — exp claim is never checked after decoding
- src/lib/auth.ts:41 — FAIL — algorithm allows 'none' in the list
- src/app/api/auth/login/route.ts:18 — PASS — errors caught in try/catch
- src/app/api/auth/refresh/route.ts:12 — NEEDS_REVIEW — catch logs but doesn't return 401`,
          },
          {
            type: 'callout',
            calloutVariant: 'tip',
            content: 'You can combine agent type + model with a structured prompt. Start your message with "Use a Haiku Explore agent..." and follow it with the four sections. The parameter phrase and the structured prompt work together.',
          },
          {
            type: 'exercise',
            content: 'Write a one-liner and a structured prompt for the same task',
            exercise: {
              prompt: 'You want to find all React components in src/components that use the useEffect hook, returning file paths and line numbers.\n\n1. Write the shortest one-liner you could type at the Claude Code prompt.\n2. Write the full structured delegation prompt (with all four sections) for the same task.',
              hints: [
                'The one-liner should be one sentence — just describe what to find and where',
                'The structured prompt should open with the agent type: "Use an Explore agent..."',
                'Output Format: file path + line numbers as a markdown list',
                'Constraints: read-only, only src/components',
              ],
              solution: `# 1. One-liner — type this at the > prompt:
find all useEffect hooks in src/components — return file:line for each

# 2. Structured prompt — paste into chat for precise control:
Use an Explore agent to find every useEffect usage in src/components.

## Context
This is a React + TypeScript project.
Components live in src/components/ with .tsx extensions.

## Goal
Find every file that imports or calls the useEffect hook.

## Output Format
Markdown list. For each file:
- File path (relative to project root)
- Line numbers where useEffect appears

## Constraints
- Read files only — do not modify anything
- Only look inside src/components/`,
              solutionLanguage: 'markdown',
            },
          },
        ],
      },
      {
        id: 'lesson-7-4',
        title: 'Parallelization Patterns',
        description: 'Run multiple agents concurrently and merge their results for dramatically faster workflows.',
        estimatedMinutes: 10,
        blocks: [
          {
            type: 'lesson-player',
          },
          {
            type: 'text',
            content: 'The real power of sub-agents is **parallelism**. Instead of researching four topics one-by-one, you launch four agents simultaneously and get all results in roughly the time of one. This lesson covers four core patterns for parallel agent work — including real prompts you can paste directly into Claude Code.',
          },
          {
            type: 'heading',
            content: 'Pattern 1: Parallel Research Fan-Out',
          },
          {
            type: 'text',
            content: 'Break one large question into N independent sub-questions. Launch N agents at the same time. Merge all findings when they are done.',
          },
          {
            type: 'callout',
            calloutVariant: 'info',
            content: '**Where this prompt goes**: Type it in your Claude Code chat. Claude will spawn all three sub-agents in a single response, running them in parallel automatically.',
          },
          {
            type: 'code',
            language: 'markdown',
            content: `Launch 3 Explore sub-agents IN PARALLEL to audit this Next.js API:

Agent 1 — Authentication
  Search src/app/api/auth/ for JWT handling.
  Report: file paths, line numbers, and any issues with expiry or algorithm validation.

Agent 2 — Input Validation
  Search all files in src/app/api/ that define route handlers (POST, PUT, PATCH).
  Report: which routes use zod or another validation library, which do not.

Agent 3 — Rate Limiting
  Read src/middleware.ts and all API route files.
  Report: whether a rate limiter is applied, and to which routes.

After all three agents return, synthesize their findings into one security report
with a severity rating (High / Medium / Low) for each issue found.`,
          },
          {
            type: 'callout',
            calloutVariant: 'info',
            content: '**Rule of thumb for parallelism**: agents are independent when the output of Agent A is NOT needed as input to Agent B. If B needs A\'s result, they must run in sequence. Everything else can — and should — run in parallel.',
          },
          {
            type: 'heading',
            content: 'Pattern 2: Map–Reduce',
          },
          {
            type: 'text',
            content: 'Assign one agent per item in a list (the "map" phase), then combine all results with one final synthesis step (the "reduce" phase). Classic use: processing many files, modules, or tickets at once.',
          },
          {
            type: 'callout',
            calloutVariant: 'info',
            content: '**Where this prompt goes**: Type it in your Claude Code chat. Claude will spawn four background agents (one per module), wait for all to finish, then produce the summary table.',
          },
          {
            type: 'code',
            language: 'markdown',
            content: `I have 4 feature modules: auth, payments, notifications, and analytics.

For each module, spawn a background Explore agent to:
- Count the number of exported functions
- List any functions longer than 50 lines
- Check whether each exported function has a JSDoc comment

Assign one agent per module directory:
- Agent 1: src/modules/auth/
- Agent 2: src/modules/payments/
- Agent 3: src/modules/notifications/
- Agent 4: src/modules/analytics/

Once all four finish, create a summary table:
| Module | Exported Functions | Functions > 50 lines | Missing JSDoc |`,
          },
          {
            type: 'steps',
            content: 'How Map–Reduce executes internally',
            steps: [
              'Map phase — Claude spawns one agent per item with run_in_background: true. All agents start immediately and run concurrently.',
              'Collect phase — Claude waits for all background agents to complete. Results arrive as each agent finishes.',
              'Reduce phase — Claude (or a dedicated synthesis agent) merges all results into one coherent output — a table, report, or decision.',
            ],
          },
          {
            type: 'heading',
            content: 'Pattern 3: Specialist Pipeline',
          },
          {
            type: 'text',
            content: 'Chain specialized agents where each stage feeds the next. This pattern is sequential, not parallel — but each agent has one clear responsibility. Complex tasks become reliable when you separate research, planning, and execution into dedicated agents.',
          },
          {
            type: 'callout',
            calloutVariant: 'info',
            content: '**Where this prompt goes**: Type it in your Claude Code chat to kick off a three-stage pipeline. Claude runs the stages in order, passing each result to the next.',
          },
          {
            type: 'code',
            language: 'markdown',
            content: `Implement a password strength validator using a three-stage pipeline:

Stage 1 — Research (Explore agent)
  Search src/lib/ for any existing validation utilities.
  Return: list of files found, functions already available, and which could be reused.

Stage 2 — Plan (Plan agent)
  Using Stage 1's findings, design the password validator:
  - Rules to enforce (length, complexity, common-password check)
  - Which file to create or modify
  - How to integrate it with the existing form validation
  Return: a numbered implementation plan.

Stage 3 — Execute (general-purpose agent)
  Using Stage 2's plan, implement the password validator.
  Write the code to the files specified in the plan.
  Return: the list of files written and a brief description of each.

Run each stage and pass its full output to the next before starting it.`,
          },
          {
            type: 'comparison',
            content: '',
            do: {
              label: '✅ Specialist pipeline — each agent focused',
              code: `Stage 1: Research agent finds existing utilities
  → result passed to Stage 2

Stage 2: Plan agent designs solution using findings
  → result passed to Stage 3

Stage 3: Execute agent implements the approved plan

Each agent has one job. Each prompt is short and clear.
Debugging is easy: if something breaks, you know
exactly which stage failed and why.`,
            },
            dont: {
              label: '❌ Monolithic prompt — one agent does everything',
              code: `One general-purpose agent receives:
"Search the codebase, figure out what exists,
 design a password validator, implement it,
 and make sure it integrates correctly."

Problems:
- Huge context window, confused output
- If it fails, you cannot tell where it went wrong
- Cannot re-run just the broken stage`,
            },
          },
          {
            type: 'heading',
            content: 'Pattern 4: Competitive Execution',
          },
          {
            type: 'text',
            content: 'Launch multiple agents to solve the same problem with different approaches. Review all results and pick the best one. Useful for architecture decisions or whenever correctness matters more than cost.',
          },
          {
            type: 'callout',
            calloutVariant: 'info',
            content: '**Where this prompt goes**: Type it in your Claude Code chat. Claude will run both agents in parallel, then compare and recommend.',
          },
          {
            type: 'code',
            language: 'markdown',
            content: `I need a caching layer for the product listing API route.
Run two competing agents IN PARALLEL — each with a different approach:

Agent A — In-memory cache
  Implement using a Map in src/lib/cache.ts.
  Return: the implemented code and a one-paragraph trade-off analysis.

Agent B — Redis cache
  Implement using ioredis in src/lib/cache.ts.
  Return: the implemented code and a one-paragraph trade-off analysis.

After both finish, compare the two approaches and recommend which to use given:
- This is a single-server deployment (not distributed)
- Cache entries should survive a 30-minute idle period`,
          },
          {
            type: 'callout',
            calloutVariant: 'tip',
            content: 'Cost tip: use `model: "haiku"` for map-phase agents doing simple file reads or grep searches (fast and roughly 20× cheaper than Opus). Reserve `model: "opus"` for the synthesis or reduce step where reasoning quality matters most.',
          },
        ],
      },
      {
        id: 'lesson-7-5',
        title: 'Agent Communication & Best Practices',
        description: 'Design robust multi-agent systems: context passing, error handling, and avoiding common pitfalls.',
        estimatedMinutes: 8,
        blocks: [
          {
            type: 'lesson-player',
          },
          {
            type: 'text',
            content: 'Launching agents is easy. Making them work reliably together is the real skill. This lesson covers how context flows between agents, how to handle failures gracefully, and the most common mistakes that break multi-agent pipelines.',
          },
          {
            type: 'heading',
            content: 'Context Passing Strategies',
          },
          {
            type: 'text',
            content: 'Every sub-agent starts fresh with zero memory. The parent must explicitly pass any information the sub-agent needs. Here are the four main strategies:',
          },
          {
            type: 'table',
            headers: ['Strategy', 'When to Use', 'Example'],
            rows: [
              ['**Inline in the prompt**', 'Small data — a list of paths, a config value, a prior result under ~500 tokens', 'Paste 10 file paths directly into the delegation prompt string'],
              ['**File reference**', 'Medium data — a research report, findings from a previous agent', 'Agent 1 writes results to `.planning/research.md`; delegation prompt for Agent 2 says "read .planning/research.md first"'],
              ['**Structured output (JSON)**', 'When Agent B needs to parse Agent A\'s results programmatically', 'Tell Agent A to return JSON; the parent parses it and injects specific fields into Agent B\'s prompt'],
              ['**Shared state file**', 'Long pipelines with 4+ stages', 'Maintain a `.planning/state.md` that each agent reads on start and appends its output when done'],
            ],
          },
          {
            type: 'heading',
            content: 'Using a File as a Context Bridge',
          },
          {
            type: 'text',
            content: 'The "file reference" strategy is the most common pattern for multi-stage pipelines. Here is a complete two-agent example: the first agent audits and writes findings to a file; the second agent reads that file and implements the fixes.',
          },
          {
            type: 'callout',
            calloutVariant: 'info',
            content: '**Where these prompts go**: Each block below is a separate message you type in Claude Code chat — first the one labeled "Message 1", then after it finishes, "Message 2". The file `.planning/auth-findings.md` will be created in your project root by Agent 1.',
          },
          {
            type: 'code',
            language: 'markdown',
            content: `--- Message 1 (type this first) ---

Use an Explore agent to audit src/app/api/auth/ for JWT issues.

Write your findings to .planning/auth-findings.md in this exact format:

# JWT Audit Findings

## Issues Found
- [file path:line] FAIL — reason
- [file path:line] NEEDS_REVIEW — reason

## Summary
[2–3 sentence summary of overall security posture]

Do not modify any source files.`,
          },
          {
            type: 'code',
            language: 'markdown',
            content: `--- Message 2 (type this after Message 1 finishes) ---

Use a general-purpose agent to fix the JWT issues from the audit.

## Context
Read .planning/auth-findings.md — it contains all issues found in the previous step.
This is a Next.js 14 app. JWT logic lives in src/app/api/auth/ and src/lib/auth.ts.

## Goal
For each FAIL item in the findings file, implement the fix in the relevant source file.
For each NEEDS_REVIEW item, add a TODO comment explaining the concern.

## Output
After finishing, append a "## Fixes Applied" section to .planning/auth-findings.md
listing each change made, the file path, and a one-line description.`,
          },
          {
            type: 'heading',
            content: 'Error Handling in Agent Pipelines',
          },
          {
            type: 'steps',
            content: 'How to handle agent failures gracefully',
            steps: [
              'Inspect the result before continuing — a sub-agent can return a partial or error result. Look for failure signals like "I could not find…", "Error:", or an empty string. Never blindly feed one agent\'s output into the next without checking it.',
              'Retry with more context, not the same prompt — if an agent fails, diagnose why. Add the missing context or sharpen the goal. Re-running the exact same prompt on the same data almost always produces the same failure.',
              'Use isolation for risky work — set `isolation: "worktree"` when an agent will write files or make commits. Its changes stay on an isolated git branch until you explicitly merge them, giving you a safe undo.',
              'Limit scope with explicit constraints — include "read-only", "do NOT modify files outside src/auth/", or "stop after listing 10 results" in your prompt. Agents without scope constraints can over-reach in unexpected ways.',
            ],
          },
          {
            type: 'heading',
            content: 'Common Pitfalls',
          },
          {
            type: 'checklist',
            content: 'Before you launch an agent, check for these mistakes',
            items: [
              {
                text: 'Vague prompt',
                description: '"Analyze the codebase" — for what purpose? By what criteria? What should the output look like? Vague prompts produce meandering, hard-to-use answers. Every delegation prompt needs a Goal and an Output Format.',
              },
              {
                text: 'Forgetting agents start fresh',
                description: 'Sub-agents have zero memory of your conversation. If the agent needs to know the tech stack, a file path, a config value, or a prior decision — write it in the prompt explicitly. It cannot "just know" these things.',
              },
              {
                text: 'Parallelizing dependent tasks',
                description: 'If Agent B needs Agent A\'s output as input, they are NOT independent. They must run sequentially. Only tasks that can run with zero knowledge of each other should run in parallel.',
              },
              {
                text: 'Using Opus for everything',
                description: 'Haiku handles most map-phase work (reading files, running grep, listing results) perfectly well and is roughly 20× cheaper than Opus. Use Haiku for straightforward tasks, Opus for complex synthesis and reasoning.',
              },
              {
                text: 'No output format specified',
                description: 'Without a format spec, agents return free-form prose. Prose is hard to parse and hard to pass cleanly to the next agent. Always specify: JSON, markdown table, numbered list, or bullet list.',
              },
            ],
          },
          {
            type: 'heading',
            content: 'The Sub-Agent Prompt Template',
          },
          {
            type: 'text',
            content: 'Use this template every time you write a delegation prompt. It forces you to answer the four questions every sub-agent needs answered before it can do good work.',
          },
          {
            type: 'callout',
            calloutVariant: 'info',
            content: '**Where this template goes**: Copy it, fill in each section, and paste it into your Claude Code chat. You can also save it as `.claude/prompts/<task-name>.md` in your project root and paste the contents when you need it.',
          },
          {
            type: 'code',
            language: 'markdown',
            content: `# Task: [Short name — e.g. "Audit rate limiting"]

## Context
[What the agent needs to know upfront:
 - Tech stack and framework
 - Relevant file paths or directories to look in
 - Any prior decisions or constraints from earlier in the project]

## Goal
[Specific, measurable outcome — what "done" looks like.
 Be concrete: "Find all X", "Write a function that does Y", "Verify that Z is present"]

## Constraints
- [What NOT to do: read-only, do not modify files outside src/auth/, stop after 5 files]
- [Scope limits: only look in src/payments/, only files changed in the last 7 days]

## Output Format
[Exact structure the agent should return — pick one:
 - Markdown list with file:line and verdict
 - JSON array: [{ "file": "...", "line": 0, "issue": "...", "severity": "High" }]
 - Table with columns: Module | Status | Notes]

## If Blocked
[What to do when something is missing or ambiguous:
 - "If a file is missing, note it and continue"
 - "If you are unsure, return NEEDS_REVIEW rather than FAIL"
 - "Do not guess — fail loudly if key information is absent"]`,
          },
          {
            type: 'heading',
            content: 'Filled-In Example',
          },
          {
            type: 'text',
            content: 'Here is the same template fully filled in for a real task. This is exactly what you would paste into your Claude Code chat:',
          },
          {
            type: 'callout',
            calloutVariant: 'info',
            content: '**Where this goes**: Paste it directly into your Claude Code chat. Claude will read it and spawn the appropriate sub-agent.',
          },
          {
            type: 'code',
            language: 'markdown',
            content: `# Task: Audit rate limiting

## Context
This is a Next.js 14 app using the App Router.
API routes live in src/app/api/.
The @upstash/ratelimit package may be installed — check package.json to confirm.
Middleware (if any) is in src/middleware.ts.

## Goal
Determine whether rate limiting is applied to each public API route.
A route is "protected" if it is covered by the middleware rate limiter
OR has its own per-route rate limiting logic.

## Constraints
- Read files only — do not modify anything
- Only look in src/app/api/ and src/middleware.ts

## Output Format
Return a markdown table:

| Route | Method | Rate Limited? | Notes |
|-------|--------|---------------|-------|

## If Blocked
If src/middleware.ts does not exist, note it and continue with per-route analysis.
If @upstash/ratelimit is not in package.json, note it as a finding in the table.`,
          },
          {
            type: 'callout',
            calloutVariant: 'success',
            content: '**The Golden Rule of Sub-Agents**: a multi-agent pipeline is only as reliable as its weakest delegation prompt. Spend 80% of your design time on the prompts — context, goal, output format, and constraints. The infrastructure choices (which agent type, background vs. foreground) take 20% of the thought. Clear communication is the hard part.',
          },
        ],
      },
      {
        id: 'lesson-7-6',
        title: 'Worktree Isolation: Safe File-Writing Agents',
        description: 'Learn how git worktree isolation protects your working directory — and the full workflow for reviewing, merging, or discarding agent changes.',
        estimatedMinutes: 8,
        blocks: [
          {
            type: 'lesson-player',
          },
          {
            type: 'text',
            content: 'Any agent that writes or deletes files is modifying your working directory directly. If it goes wrong — refactors the wrong function, deletes the wrong file, half-implements a feature — there is no clean undo. **Worktree isolation** solves this by giving the agent its own isolated git branch and working directory. Your main branch stays completely untouched until you decide to merge.',
          },
          {
            type: 'heading',
            content: 'What Actually Happens Under the Hood',
          },
          {
            type: 'text',
            content: 'When you ask for worktree isolation, Claude Code calls `git worktree add` internally to create a temporary working directory linked to a new branch. The agent runs entirely inside that directory. Your main working directory is never touched.',
          },
          {
            type: 'code',
            language: 'bash',
            content: `# What Claude Code does internally when you request isolation:
git worktree add .claude/worktrees/agent-abc123 -b worktree/agent-abc123

# The agent now has its own isolated working directory:
# .claude/worktrees/agent-abc123/   ← agent reads/writes here
# Your project root stays clean     ← never modified by the agent

# After the agent finishes, the branch exists until you act on it:
git worktree list
# /Users/you/my-project                                   13c1afc [main]
# /Users/you/my-project/.claude/worktrees/agent-abc123   361649c [worktree/agent-abc123]`,
          },
          {
            type: 'heading',
            content: 'How to Request Worktree Isolation',
          },
          {
            type: 'text',
            content: 'Just say "worktree" or "isolated" in your message — Claude Code handles the git setup:',
          },
          {
            type: 'comparison',
            content: '',
            do: {
              label: 'Writing files → use worktree',
              code: `> Use an isolated general-purpose agent to add
  rate limiting to every route in src/app/api/.
  Do not modify files outside that directory.

⠋ Add rate limiting [general-purpose · worktree]
  ⎿ Creating isolated git branch: worktree/add-rate-limiting
  ⎿ Reading src/app/api/users/route.ts
  ⎿ Writing src/app/api/users/route.ts
  ...

Changes isolated in: worktree/add-rate-limiting
Review diff and merge when ready.`,
            },
            dont: {
              label: 'No isolation → risky for file writes',
              code: `> Add rate limiting to every route in src/app/api/.

# Agent writes directly to YOUR working directory.
# If it goes wrong, git restore . may not help —
# newly created files are not tracked and won't
# be restored by a simple reset.`,
            },
          },
          {
            type: 'heading',
            content: 'The Full Workflow After the Agent Finishes',
          },
          {
            type: 'steps',
            content: 'From "agent done" to merged (or discarded)',
            steps: [
              '**Review the diff** — ask Claude "show me a diff of the worktree changes", or run `git diff main...worktree/<branch>` yourself. The agent\'s final message will also include a summary of what it changed.',
              '**Navigate into the worktree** (optional) — run `git worktree list` to get the exact path, then `cd` there to browse files or run tests against the isolated branch before committing to a merge.',
              '**Merge when satisfied** — ask Claude "merge the worktree into main", or run `git merge worktree/<branch>` from your main branch. Claude will handle the merge commit message.',
              '**Clean up** — after merging (or if you want to discard), remove the worktree: `git worktree remove .claude/worktrees/agent-abc123`. The linked branch is deleted automatically.',
            ],
          },
          {
            type: 'heading',
            content: 'Git Commands Reference',
          },
          {
            type: 'table',
            headers: ['Command', 'What it does'],
            rows: [
              ['`git worktree list`', 'Show all active worktrees — paths and their branches'],
              ['`cd .claude/worktrees/<name>`', 'Navigate into the isolated working directory to inspect or test'],
              ['`git diff main...worktree/<branch>`', 'Review every file the agent changed vs your main branch'],
              ['`git merge worktree/<branch>`', 'Merge the agent\'s changes into main (from the main branch)'],
              ['`git worktree remove <path>`', 'Remove the worktree directory and delete its branch'],
              ['`git branch -d worktree/<branch>`', 'Delete just the branch if you already removed the directory'],
            ],
          },
          {
            type: 'callout',
            calloutVariant: 'info',
            content: '**Claude handles this for you.** You can say "show me a diff of the worktree changes", "merge the worktree into main", or "discard the worktree" — Claude Code will run the git commands. You only need the manual commands when working in a separate terminal window.',
          },
          {
            type: 'heading',
            content: 'Pattern: Parallel Agents on Separate Worktrees',
          },
          {
            type: 'text',
            content: 'The real power comes from combining parallelism with isolation. Each agent gets its own worktree — they all run simultaneously with zero risk of overwriting each other\'s changes.',
          },
          {
            type: 'code',
            language: 'markdown',
            content: `# One message — three isolated parallel agents, each on its own branch:

Spawn 3 isolated agents in parallel:

Agent 1 (worktree, general-purpose):
  Add zod validation to all routes in src/app/api/users/.
  Do not touch any other directory.

Agent 2 (worktree, general-purpose):
  Add zod validation to all routes in src/app/api/payments/.
  Do not touch any other directory.

Agent 3 (worktree, general-purpose):
  Add zod validation to all routes in src/app/api/auth/.
  Do not touch any other directory.

When all three finish, show me a summary of changes per agent.
I will review each diff before merging.`,
          },
          {
            type: 'text',
            content: 'Claude creates three branches (`worktree/users-validation`, `worktree/payments-validation`, `worktree/auth-validation`), runs all three agents at once, and reports when each finishes. You review three independent diffs and merge each one on its own terms. A conflict in the auth agent does not affect the others.',
          },
          {
            type: 'heading',
            content: 'When to Use Worktree Isolation',
          },
          {
            type: 'table',
            headers: ['Scenario', 'Use worktree?'],
            rows: [
              ['Agent will **write or modify files**', '✅ Always'],
              ['Agent will **create new files**', '✅ Always'],
              ['Agent will **make git commits**', '✅ Always'],
              ['**Parallel agents** touching different files', '✅ Strongly recommended — prevents accidental conflicts'],
              ['Agent is **read-only** (Explore, grep, search)', '❌ Not needed — no files are changed'],
              ['Agent runs **bash commands** but no file writes', '❌ Optional — no file safety benefit'],
            ],
          },
          {
            type: 'callout',
            calloutVariant: 'success',
            content: '**Default rule**: if in doubt, use a worktree. The overhead is one `git worktree add` call. The safety is total. The only cost is one extra step to review and merge — which you should be doing before any agent-written code reaches your main branch anyway.',
          },
        ],
      },

      // ── Lesson 7-7: Multi-Model Pipelines ───────────────────────────────
      {
        id: 'lesson-7-7',
        title: 'Multi-Model Pipelines — Scout, Synthesize, Verify',
        description: 'Route each task to the right model — Haiku for cheap parallel scouts, Sonnet for workers, Opus for synthesis — and cut pipeline costs by 10×.',
        estimatedMinutes: 8,
        blocks: [
          { type: 'lesson-player' },
          {
            type: 'text',
            content: 'Not every task in a pipeline needs your most expensive model. The scout → synthesize pattern routes cheap, parallelisable tasks to Haiku, complex work to Sonnet, and final synthesis to Opus. The cost difference is roughly 20× between Haiku and Opus — so the routing decision matters.',
          },
          {
            type: 'heading', level: 2,
            content: 'The three-tier model map',
          },
          {
            type: 'table',
            headers: ['Tier', 'Model', 'Best for', 'Relative cost'],
            rows: [
              ['Scout', 'claude-haiku-4-5-20251001', 'Reading files, grep, listing, classification, extraction', '1×'],
              ['Worker', 'claude-sonnet-4-6', 'Writing code, refactoring, analysis, moderate reasoning', '5×'],
              ['Synthesizer', 'claude-opus-4-6', 'Final synthesis, hard reasoning, architecture decisions', '25×'],
            ],
          },
          {
            type: 'heading', level: 2,
            content: 'Pattern 1: Fan-out scout → single synthesizer',
          },
          {
            type: 'code',
            language: 'typescript',
            content: `// 10 Haiku scouts read files in parallel → 1 Opus synthesizer
const fileList = await getFilePaths('./src');

// Haiku scouts — cheap parallel reads
const summaries = await Promise.all(
  fileList.map(file =>
    client.messages.create({
      model: 'claude-haiku-4-5-20251001',  // cheap
      max_tokens: 500,
      messages: [{
        role: 'user',
        content: \`Summarise what this file does in 2 sentences: \${readFile(file)}\`,
      }],
    })
  )
);

// Opus synthesizer — one expensive call on compact input
const architecture = await client.messages.create({
  model: 'claude-opus-4-6',            // worth it here
  max_tokens: 4000,
  messages: [{
    role: 'user',
    content: \`Given these file summaries, describe the overall architecture
and identify the top 3 areas needing refactoring:\\n\${summaries.join('\\n')}\`,
  }],
});`,
          },
          {
            type: 'heading', level: 2,
            content: 'Pattern 2: Model routing by task type',
          },
          {
            type: 'code',
            language: 'typescript',
            content: `function selectModel(task: string): string {
  // Simple classification → Haiku
  if (/classify|extract|list|summarise/i.test(task)) {
    return 'claude-haiku-4-5-20251001';
  }
  // Code generation / refactoring → Sonnet
  if (/write|refactor|implement|fix/i.test(task)) {
    return 'claude-sonnet-4-6';
  }
  // Architecture, hard reasoning → Opus
  return 'claude-opus-4-6';
}

// Use it
const model = selectModel(userRequest);
const result = await client.messages.create({ model, ... });`,
          },
          {
            type: 'heading', level: 2,
            content: 'Pattern 3: Progressive escalation',
          },
          {
            type: 'text',
            content: 'Try Sonnet first. If it produces low-confidence output (you can detect this by checking if Claude hedges or asks clarifying questions), escalate to Opus. Most tasks never need escalation.',
          },
          {
            type: 'code',
            language: 'typescript',
            content: `async function withEscalation(prompt: string) {
  const sonnetResult = await client.messages.create({
    model: 'claude-sonnet-4-6',
    max_tokens: 2000,
    messages: [{ role: 'user', content: prompt }],
  });

  const answer = sonnetResult.content[0].text;

  // Escalate if Sonnet is uncertain
  if (answer.includes("I'm not sure") || answer.includes("you might want to verify")) {
    return client.messages.create({
      model: 'claude-opus-4-6',
      max_tokens: 2000,
      messages: [{ role: 'user', content: prompt }],
    });
  }

  return sonnetResult;
}`,
          },
          {
            type: 'callout',
            calloutVariant: 'tip',
            content: '**Rule of thumb:** Use Haiku for map phases (reading, extracting, classifying), Sonnet for transform phases (writing, refactoring), and Opus only for reduce phases that require the highest quality synthesis. In most pipelines, 80% of tokens are spent on map — running those on Haiku cuts total pipeline cost dramatically.',
          },
        ],
      },
    ],
  },
  {
    id: 'module-8',
    title: 'Plan Mode & Controlled Execution',
    description: 'Learn how Plan Mode separates exploration from execution, enabling safer, more deliberate AI-assisted development.',
    icon: 'ClipboardList',
    color: 'orange',
    quizId: 'quiz-module-8',
    lessons: [
      {
        id: 'lesson-8-1',
        title: 'What Is Plan Mode?',
        description: 'Understand the read-only constraint that separates planning from execution.',
        estimatedMinutes: 7,
        blocks: [
          {
            type: 'lesson-player',
          },
          {
            type: 'text',
            content: 'Plan Mode is a read-only constraint that prevents Claude from editing files or running destructive commands. In Plan Mode, Claude can explore your codebase using Glob, Grep, Read, and Explore agents — but cannot write, delete, or execute shell commands that modify state.',
          },
          {
            type: 'callout',
            calloutVariant: 'info',
            content: 'The one exception to the read-only rule: Claude can write to a single plan file (`.claude/plans/`). This is the artifact that gets handed to the user for review.',
          },
          {
            type: 'comparison',
            content: 'Plan Mode vs Direct Execution',
            do: {
              label: 'Plan Mode',
              code: `1. Explore codebase (read-only)\n2. Draft approach\n3. Write plan file\n4. Call ExitPlanMode\n5. User reviews and approves\n6. Claude executes`,
            },
            dont: {
              label: 'Direct Execution',
              code: `1. User types request\n2. Claude immediately\n   edits files\n3. Runs commands\n4. Changes land in repo\n   (no review checkpoint)`,
            },
          },
          {
            type: 'table',
            content: 'Allowed vs blocked actions in Plan Mode',
            headers: ['Action', 'Allowed in Plan Mode?'],
            rows: [
              ['Read files (Read, Glob, Grep)', 'Yes'],
              ['Launch Explore sub-agents', 'Yes'],
              ['Write to plan file', 'Yes (plan file only)'],
              ['Edit source files', 'No'],
              ['Run shell commands (Bash)', 'No (read-only commands only)'],
              ['Delete files', 'No'],
            ],
          },
          {
            type: 'tip',
            content: 'Think of Plan Mode as separating "figuring out what to do" from "doing it". It inserts a mandatory user review checkpoint before any changes land in your codebase.',
          },
        ],
      },
      {
        id: 'lesson-8-2',
        title: 'Entering & Exiting Plan Mode',
        description: 'Learn activation shortcuts, plan file structure, and the critical distinction between ExitPlanMode and auto-execution.',
        estimatedMinutes: 7,
        blocks: [
          {
            type: 'lesson-player',
          },
          {
            type: 'text',
            content: 'Plan Mode can be activated in two ways: via keyboard shortcut or natural language. Once active, Claude writes its plan to a structured file in `.claude/plans/` — then calls `ExitPlanMode` to signal readiness for your review.',
          },
          {
            type: 'steps',
            content: 'Activating Plan Mode',
            steps: [
              'Press Shift+Tab to toggle Plan Mode on/off from the Claude Code terminal',
              'Or use natural language: "plan this", "don\'t make any changes yet", "design the approach first"',
              'Claude enters read-only exploration — you\'ll see a [PLAN MODE] indicator',
              'When ready, Claude writes the plan file and calls ExitPlanMode',
              'Review the plan in .claude/plans/ — approve or request changes',
            ],
          },
          {
            type: 'code',
            language: 'bash',
            content: `# Keyboard shortcut
Shift+Tab   # toggles Plan Mode on/off

# Natural language triggers
"Plan the refactor before making any changes"
"Don't touch any files yet — just figure out the approach"
"Design the migration strategy, I'll review before you proceed"`,
          },
          {
            type: 'callout',
            calloutVariant: 'warning',
            content: '**ExitPlanMode does NOT auto-execute.** It is purely a signal that says "I\'m done planning, please review." Execution only begins when you explicitly approve and ask Claude to proceed.',
          },
          {
            type: 'table',
            content: 'AskUserQuestion vs ExitPlanMode',
            headers: ['Tool', 'When to use', 'What happens next'],
            rows: [
              ['AskUserQuestion', 'Claude needs clarification before planning can complete', 'User answers → Claude continues planning'],
              ['ExitPlanMode', 'Plan is complete and ready for user approval', 'User reviews plan → approves or requests changes'],
            ],
          },
          {
            type: 'tip',
            content: 'Use `AskUserQuestion` during planning when you hit ambiguity. Use `ExitPlanMode` only when the plan is fully written and ready to execute.',
          },
        ],
      },
      {
        id: 'lesson-8-3',
        title: 'The Plan → Review → Execute Workflow',
        description: 'A 5-phase walkthrough of how Plan Mode fits into a complete development workflow.',
        estimatedMinutes: 10,
        blocks: [
          {
            type: 'lesson-player',
          },
          {
            type: 'text',
            content: 'A complete Plan Mode session has five phases. Understanding each phase helps you get more value from planning — and know when to iterate vs approve.',
          },
          {
            type: 'heading',
            level: 3,
            content: 'Phase 1: Explore (Read-Only)',
          },
          {
            type: 'steps',
            content: 'Exploration phase',
            steps: [
              'Run Glob to find relevant files by pattern',
              'Run Grep to find function definitions, usages, and imports',
              'Read critical files to understand existing patterns',
              'Launch an Explore sub-agent if the scope is large',
            ],
          },
          {
            type: 'heading',
            level: 3,
            content: 'Phase 2: Design',
          },
          {
            type: 'steps',
            content: 'Design phase',
            steps: [
              'Draft the approach in working memory',
              'Identify which files will change and why',
              'Consider edge cases and failure modes',
              'Launch a Plan sub-agent for complex architectural decisions',
            ],
          },
          {
            type: 'heading',
            level: 3,
            content: 'Phase 3: Review & Clarify',
          },
          {
            type: 'steps',
            content: 'Review phase',
            steps: [
              'Re-read any files where the approach is still uncertain',
              'Call AskUserQuestion if critical ambiguity remains',
              'Validate that the planned steps cover all requirements',
            ],
          },
          {
            type: 'heading',
            level: 3,
            content: 'Phase 4: Write the Plan File',
          },
          {
            type: 'code',
            language: 'markdown',
            content: `# Plan: Refactor Auth Module

## Context
The current auth module mixes JWT logic with session management.
Affected files: src/auth/jwt.ts, src/auth/session.ts, src/middleware/auth.ts

## Steps
1. Extract JWT utilities to src/auth/jwt-utils.ts
2. Create src/auth/session-store.ts with clean interface
3. Update middleware to import from new locations
4. Run existing test suite to confirm no regressions

## Files Changed
- src/auth/jwt.ts (split)
- src/auth/session.ts (split)
- src/middleware/auth.ts (updated imports)
- src/auth/jwt-utils.ts (new)
- src/auth/session-store.ts (new)

## Verification
- npm test passes
- /auth/login and /auth/refresh endpoints return 200`,
          },
          {
            type: 'heading',
            level: 3,
            content: 'Phase 5: ExitPlanMode & Approval',
          },
          {
            type: 'steps',
            content: 'Approval phase',
            steps: [
              'Claude calls ExitPlanMode — signals plan is ready',
              'You read the plan file in .claude/plans/',
              'Approve with "looks good, proceed" or request changes',
              'Claude executes only after explicit approval',
            ],
          },
          {
            type: 'callout',
            calloutVariant: 'tip',
            content: 'Expect iteration. A first-pass plan often surfaces questions you hadn\'t considered. The review step is not a rubber stamp — it\'s where you add constraints, correct assumptions, and narrow scope.',
          },
          {
            type: 'exercise',
            content: 'Write a plan for adding a dark mode toggle to a React app',
            exercise: {
              prompt: 'Using the plan file template above, write a plan for adding a dark mode toggle to a React app that uses Tailwind CSS. Include context, steps, files changed, and verification criteria.',
              hints: [
                'Consider where theme state should live (CSS variable, context, localStorage)',
                'Think about which components need to change vs which are handled by Tailwind dark: classes',
                'Verification should include visual check AND accessibility check',
              ],
              solution: `# Plan: Add Dark Mode Toggle

## Context
React app using Tailwind CSS. Theme preference should persist across page reloads.
Target: add a toggle button in the header; respect prefers-color-scheme on first visit.

## Steps
1. Add darkMode: 'class' to tailwind.config.js
2. Create src/hooks/useTheme.ts — reads/writes localStorage 'theme' key
3. Wrap app in ThemeProvider that applies 'dark' class to <html>
4. Add DarkModeToggle component to src/components/DarkModeToggle.tsx
5. Place toggle in Header component
6. Audit key components and add dark: variants to bg/text classes

## Files Changed
- tailwind.config.js
- src/hooks/useTheme.ts (new)
- src/providers/ThemeProvider.tsx (new)
- src/components/DarkModeToggle.tsx (new)
- src/components/Header.tsx

## Verification
- Toggle switches theme visually
- Preference persists after page reload
- First visit respects OS prefers-color-scheme`,
              solutionLanguage: 'markdown',
            },
          },
          {
            type: 'checklist',
            content: 'What makes a good plan?',
            items: [
              { text: 'Clear context section explaining the current state', description: 'Claude should show it read and understood the codebase, not just the request.' },
              { text: 'Numbered, atomic steps', description: 'Each step should be a single verifiable action.' },
              { text: 'Explicit list of files to be modified', description: 'No surprises during execution.' },
              { text: 'Verification criteria', description: 'How will you know it worked? Tests, API responses, visual checks.' },
              { text: 'Scope boundaries', description: 'What is explicitly NOT being changed in this plan.' },
            ],
          },
        ],
      },
      {
        id: 'lesson-8-4',
        title: 'When to Plan vs Execute Directly',
        description: 'A practical decision framework: complexity × reversibility × blast radius.',
        estimatedMinutes: 7,
        blocks: [
          {
            type: 'lesson-player',
          },
          {
            type: 'text',
            content: 'Not every task needs a plan. Planning has overhead — it adds a review cycle before work starts. The key is matching the formality of your process to the risk of the change.',
          },
          {
            type: 'comparison',
            content: 'Plan vs Execute examples',
            do: {
              label: 'Plan First',
              code: `- Database schema migration\n- Refactoring a core module\n- Changing authentication flow\n- Modifying CI/CD pipeline\n- Any production deployment\n- Multi-file architectural change`,
            },
            dont: {
              label: 'Execute Directly',
              code: `- Adding a 2-line comment\n- Fixing a typo in README\n- Adding a console.log\n- Renaming a local variable\n- Adding a unit test for\n  an existing function`,
            },
          },
          {
            type: 'table',
            content: 'Decision matrix: when to use Plan Mode',
            headers: ['Reversibility', 'Low Blast Radius', 'High Blast Radius'],
            rows: [
              ['Easily reversible (git revert)', 'Execute directly', 'Consider planning'],
              ['Hard to reverse (DB migration, deploys)', 'Plan first', 'Always plan first'],
            ],
          },
          {
            type: 'callout',
            calloutVariant: 'warning',
            content: '**Always use Plan Mode for production changes.** Even simple-looking changes can have non-obvious blast radius in production environments. The cost of a review cycle is far less than an unplanned outage.',
          },
          {
            type: 'checklist',
            content: 'Pre-execution checklist',
            items: [
              { text: 'Do I understand all files that will change?', description: 'If not, plan first.' },
              { text: 'Can I git revert this in under 5 minutes if it breaks?', description: 'If no, plan first.' },
              { text: 'Does this touch shared infrastructure or production systems?', description: 'If yes, plan first.' },
              { text: 'Am I confident in the approach without exploring the codebase?', description: 'If no, plan first.' },
            ],
          },
          {
            type: 'tip',
            content: 'The most common mistake is **never planning big changes**. Over-planning small tasks wastes time, but skipping planning on complex or irreversible work causes real damage. When in doubt, plan.',
          },
        ],
      },
    ],
  },
  {
    id: 'module-9',
    title: 'MCP — Model Context Protocol',
    description: 'Extend Claude with any external tool or data source using the open MCP standard.',
    icon: 'Plug',
    color: 'violet',
    quizId: 'quiz-module-9',
    lessons: [
      {
        id: 'lesson-9-1',
        title: 'What Is MCP and Why It Matters',
        description: 'Understand how MCP transforms Claude from a fixed-tool assistant into an extensible platform.',
        estimatedMinutes: 7,
        blocks: [
          {
            type: 'lesson-player',
          },
          {
            type: 'text',
            content: 'MCP (Model Context Protocol) is an open standard created by Anthropic that lets Claude connect to external tools and data sources. Without MCP, Claude\'s tools are fixed — Read, Write, Bash, and a handful of built-ins. With MCP, Claude can query your database, call internal APIs, search GitHub, read Slack messages, or access any system an MCP server exposes.',
          },
          {
            type: 'callout',
            calloutVariant: 'info',
            content: 'MCP is officially supported by Anthropic and is the canonical extension mechanism for Claude Code. It uses a lightweight JSON-RPC protocol over either stdio (local) or HTTP/SSE (remote) transport.',
          },
          {
            type: 'table',
            content: 'Built-in tools vs MCP tools',
            headers: ['Category', 'Built-in Tools', 'MCP Tools (examples)'],
            rows: [
              ['File system', 'Read, Write, Glob, Grep', 'server-filesystem (extended ops)'],
              ['Code execution', 'Bash', 'Custom sandboxed runners'],
              ['Databases', 'None built-in', 'server-postgres, server-sqlite'],
              ['APIs & services', 'None built-in', 'server-github, mcp-server-slack'],
              ['Internal systems', 'None built-in', 'Your custom MCP server'],
            ],
          },
          {
            type: 'comparison',
            content: 'Without MCP vs with MCP',
            do: {
              label: 'With MCP',
              code: `Claude can:\n- Query production DB\n- Fetch open GitHub PRs\n- Read Slack channels\n- Call your internal API\n- Access any system you\n  build a server for`,
            },
            dont: {
              label: 'Without MCP',
              code: `Claude is limited to:\n- Reading/writing local files\n- Running shell commands\n- Built-in search tools\n- No external system access\n  without manual copy-paste`,
            },
          },
          {
            type: 'tip',
            content: 'MCP has two transport types: **stdio** (the server runs as a local subprocess on your machine — fastest, most private) and **HTTP/SSE** (the server runs remotely — useful for shared team servers).',
          },
        ],
      },
      {
        id: 'lesson-9-2',
        title: 'Connecting MCP Servers to Claude Code',
        description: 'Configure MCP servers globally or per-project, verify connections, and explore popular ready-made servers.',
        estimatedMinutes: 8,
        blocks: [
          {
            type: 'lesson-player',
          },
          {
            type: 'text',
            content: 'MCP servers are configured in Claude Code\'s settings files. You can configure them globally (available in all projects) or per-project (only in a specific codebase). The configuration is a simple JSON object that tells Claude how to launch each server.',
          },
          {
            type: 'code',
            language: 'json',
            content: `// ~/.claude/settings.json  (global — all projects)
// OR .claude/settings.json  (project-level — this project only)
{
  "mcpServers": {
    "filesystem": {
      "command": "npx",
      "args": ["-y", "@modelcontextprotocol/server-filesystem", "/Users/me/projects"]
    },
    "github": {
      "command": "npx",
      "args": ["-y", "@modelcontextprotocol/server-github"],
      "env": {
        "GITHUB_PERSONAL_ACCESS_TOKEN": "\${GITHUB_TOKEN}"
      }
    }
  }
}`,
          },
          {
            type: 'steps',
            content: 'Adding an MCP server',
            steps: [
              'Open ~/.claude/settings.json (global) or .claude/settings.json (project)',
              'Add an entry under "mcpServers" with a name, command, args, and optional env',
              'Save the file — Claude Code picks up changes on next session start',
              'Run /mcp in Claude Code to verify the server connected and see its tools',
              'Test by asking Claude to use one of the server\'s tools',
            ],
          },
          {
            type: 'callout',
            calloutVariant: 'tip',
            content: 'Run `/mcp` in Claude Code to see all connected servers and the tools each one exposes. This is your primary debugging tool when a server isn\'t working.',
          },
          {
            type: 'table',
            content: 'Popular ready-made MCP servers',
            headers: ['Package', 'What it exposes'],
            rows: [
              ['@modelcontextprotocol/server-filesystem', 'Extended file system operations with configurable root'],
              ['@modelcontextprotocol/server-github', 'GitHub repos, PRs, issues, commits, code search'],
              ['@modelcontextprotocol/server-postgres', 'Query a PostgreSQL database, inspect schema'],
              ['mcp-server-slack', 'Read channels, post messages, search Slack'],
              ['@modelcontextprotocol/server-brave-search', 'Web search via Brave Search API'],
            ],
          },
          {
            type: 'callout',
            calloutVariant: 'warning',
            content: '**Never put secrets in the `args` array** — they appear in process listings. Always use the `env` object with references to environment variables (e.g., `"${GITHUB_TOKEN}"`).',
          },
        ],
      },
      {
        id: 'lesson-9-3',
        title: 'Building a Custom MCP Server',
        description: 'When ready-made servers don\'t fit, build your own — a full walkthrough with the TypeScript SDK.',
        estimatedMinutes: 10,
        blocks: [
          {
            type: 'lesson-player',
          },
          {
            type: 'text',
            content: 'Build a custom MCP server when you need to expose an internal API, proprietary data source, or custom tool logic. The `@modelcontextprotocol/sdk` package provides everything you need. A minimal server is under 50 lines of TypeScript.',
          },
          {
            type: 'code',
            language: 'typescript',
            content: `import { Server } from '@modelcontextprotocol/sdk/server/index.js';
import { StdioServerTransport } from '@modelcontextprotocol/sdk/server/stdio.js';
import {
  CallToolRequestSchema,
  ListToolsRequestSchema,
} from '@modelcontextprotocol/sdk/types.js';

const server = new Server(
  { name: 'my-internal-api', version: '1.0.0' },
  { capabilities: { tools: {} } }
);

// Declare available tools
server.setRequestHandler(ListToolsRequestSchema, async () => ({
  tools: [
    {
      name: 'get_user',
      description: 'Fetch a user by ID from the internal API',
      inputSchema: {
        type: 'object',
        properties: {
          userId: { type: 'string', description: 'User UUID' },
        },
        required: ['userId'],
      },
    },
  ],
}));

// Handle tool calls
server.setRequestHandler(CallToolRequestSchema, async (request) => {
  if (request.params.name === 'get_user') {
    const { userId } = request.params.arguments as { userId: string };
    const res = await fetch(\`https://api.internal.company.com/users/\${userId}\`, {
      headers: { Authorization: \`Bearer \${process.env.INTERNAL_API_KEY}\` },
    });
    const user = await res.json();
    return { content: [{ type: 'text', text: JSON.stringify(user, null, 2) }] };
  }
  throw new Error(\`Unknown tool: \${request.params.name}\`);
});

const transport = new StdioServerTransport();
await server.connect(transport);`,
          },
          {
            type: 'steps',
            content: 'Scaffold, implement, and connect a custom server',
            steps: [
              'mkdir my-mcp-server && cd my-mcp-server && npm init -y',
              'npm install @modelcontextprotocol/sdk',
              'Create src/index.ts with the server code above',
              'Add "type": "module" and build script to package.json',
              'Build with tsc, then add to .claude/settings.json pointing to the built file',
              'Run /mcp in Claude Code to verify your tools appear',
              'Test: ask Claude to call get_user with a real user ID',
            ],
          },
          {
            type: 'callout',
            calloutVariant: 'info',
            content: 'A Python SDK is also available: `pip install mcp`. The protocol is identical — choose the language that matches your team\'s stack.',
          },
          {
            type: 'exercise',
            content: 'Add a second tool to the example server',
            exercise: {
              prompt: 'Add a `list_users` tool to the server above that fetches all users from `GET /users?limit=20` and returns them as a JSON array.',
              hints: [
                'Add a second entry to the tools array in ListToolsRequestSchema handler',
                'Add an else-if branch in the CallToolRequestSchema handler',
                'The endpoint is GET /users?limit=20 — no userId required',
              ],
              solution: `// In ListToolsRequestSchema handler, add to tools array:
{
  name: 'list_users',
  description: 'List up to 20 users from the internal API',
  inputSchema: { type: 'object', properties: {} },
},

// In CallToolRequestSchema handler, add:
if (request.params.name === 'list_users') {
  const res = await fetch('https://api.internal.company.com/users?limit=20', {
    headers: { Authorization: \`Bearer \${process.env.INTERNAL_API_KEY}\` },
  });
  const users = await res.json();
  return { content: [{ type: 'text', text: JSON.stringify(users, null, 2) }] };
}`,
              solutionLanguage: 'typescript',
            },
          },
          {
            type: 'tip',
            content: 'Test your MCP server locally by running it with `node dist/index.js` and sending JSON-RPC messages via stdin. Or use the MCP Inspector tool: `npx @modelcontextprotocol/inspector`.',
          },
        ],
      },
      {
        id: 'lesson-9-4',
        title: 'MCP in Claude Code vs Claude Desktop',
        description: 'Same protocol, different config paths and use-case sweet spots.',
        estimatedMinutes: 5,
        blocks: [
          {
            type: 'lesson-player',
          },
          {
            type: 'text',
            content: 'The same MCP servers work in both Claude Code (the CLI) and Claude Desktop (the GUI app). The protocol is identical — only the configuration file location and intended use case differ.',
          },
          {
            type: 'table',
            content: 'Claude Code vs Claude Desktop MCP configuration',
            headers: ['Property', 'Claude Code', 'Claude Desktop'],
            rows: [
              ['Global config path', '~/.claude/settings.json', '~/Library/Application Support/Claude/claude_desktop_config.json'],
              ['Project config path', '.claude/settings.json (in repo)', 'N/A (no project-level config)'],
              ['Config key', 'mcpServers', 'mcpServers'],
              ['Primary use case', 'Agentic coding, CI, automation', 'Conversational AI with tool access'],
              ['Tool appearance', 'Available during coding sessions', 'Available in chat conversations'],
            ],
          },
          {
            type: 'code',
            language: 'json',
            content: `// Claude Desktop config
// ~/Library/Application Support/Claude/claude_desktop_config.json
{
  "mcpServers": {
    "postgres": {
      "command": "npx",
      "args": ["-y", "@modelcontextprotocol/server-postgres", "postgresql://localhost/mydb"]
    }
  }
}`,
          },
          {
            type: 'callout',
            calloutVariant: 'info',
            content: 'MCP servers are separate processes — the same server binary can be connected to both Claude Code and Claude Desktop simultaneously. You don\'t need to run two copies.',
          },
          {
            type: 'tip',
            content: 'Use **Claude Desktop** for exploratory conversations ("what\'s in this database?"). Use **Claude Code** for agentic tasks that need to write code, run tests, and commit changes based on what the MCP server returns.',
          },
        ],
      },
    ],
  },
  {
    id: 'module-3',
    title: 'GSD Plugin Deep Dive',
    description: 'Master the GSD methodology for milestone-based, AI-orchestrated software development.',
    icon: 'Layers',
    color: 'green',
    quizId: 'quiz-module-3',
    lessons: [
      {
        id: 'lesson-3-1',
        title: 'GSD Methodology & Philosophy',
        description: 'Understand what GSD is, why it exists, and the milestone → phase → task hierarchy behind it.',
        estimatedMinutes: 7,
        blocks: [
          {
            type: 'callout',
            calloutVariant: 'info',
            content: '**GSD is a community-built open-source plugin — not a built-in Claude Code feature.** It was created by the community and has grown to 27k+ stars and 2,300+ forks. You install it separately from its repository: [github.com/gsd-build/get-shit-done](https://github.com/gsd-build/get-shit-done)',
          },
          {
            type: 'lesson-player',
          },
          {
            type: 'heading',
            content: 'The Problem GSD Solves',
          },
          {
            type: 'text',
            content: 'Without structure, AI-assisted development breaks down on large projects. Claude forgets context mid-task, you lose track of what was done, parallel work conflicts, and there is no way to verify the result matches the original plan. GSD is the answer to all of these.',
          },
          {
            type: 'comparison',
            content: '',
            do: {
              label: 'With GSD',
              code: `Every project starts with PROJECT.md —
a single source of truth.

Each phase gets a PLAN.md contract
before any code is written.

Tasks run in parallel via sub-agents.
Progress survives context resets.
/gsd:verify-work checks every
acceptance criterion before you ship.`,
            },
            dont: {
              label: 'Without GSD',
              code: `You describe the task in chat.
Claude starts coding immediately.

Context fills up halfway through.
You restart, losing all momentum.

No one knows what was built vs
what was supposed to be built.
You ship and find gaps later.`,
            },
          },
          {
            type: 'heading',
            content: 'The Three-Level Hierarchy',
          },
          {
            type: 'table',
            headers: ['Level', 'Description', 'Real Example'],
            rows: [
              ['**Milestone**', 'A major product goal — a version or launch', '"v1 MVP: URL shortener with analytics"'],
              ['**Phase**', 'A logical chunk of work within the milestone', '"Phase 2: Auth — sign-up, login, JWT tokens"'],
              ['**Task**', 'A specific, file-level work item', '"Create src/lib/auth.ts with signToken() and verifyToken()"'],
            ],
          },
          {
            type: 'text',
            content: 'Here is a real example. You are building a SaaS analytics dashboard. Your first milestone is "v1 MVP". GSD breaks it into phases:',
          },
          {
            type: 'code',
            language: 'markdown',
            content: `# Milestone: v1 MVP — Analytics Dashboard

Phase 1: Database schema & migrations
  - Create users, events, and dashboards tables
  - Write seed data for local dev

Phase 2: Authentication
  - Email/password sign-up and login
  - JWT tokens with refresh logic
  - Protected route middleware

Phase 3: Event ingestion API
  - POST /api/events endpoint
  - Rate limiting per API key
  - Async queue for high-volume writes

Phase 4: Dashboard UI
  - Chart components (line, bar, funnel)
  - Real-time updates via SSE
  - Export to CSV`,
          },
          {
            type: 'callout',
            calloutVariant: 'tip',
            content: '**Why phases beat one big prompt**: independent tasks within a phase run as parallel sub-agents. A 10-task phase completes in roughly the time of 2–3 sequential tasks. And if something goes wrong, you know exactly which phase failed.',
          },
        ],
      },
      {
        id: 'lesson-3-2',
        title: 'Starting & Planning with GSD',
        description: 'Initialize projects, create milestones, and generate detailed phase plans — with real examples.',
        estimatedMinutes: 8,
        blocks: [
          {
            type: 'lesson-player',
          },
          {
            type: 'text',
            content: 'GSD\'s planning commands guide you from a rough idea to a detailed, executable PLAN.md. Each command builds on the previous one. Here is the full startup sequence with a real example.',
          },
          {
            type: 'heading',
            content: 'The Startup Sequence',
          },
          {
            type: 'code',
            language: 'bash',
            content: `# Run these in order when starting any new GSD project:
/gsd:new-project     # GSD interviews you → creates PROJECT.md
/gsd:new-milestone   # Define Milestone 1 → adds it to PROJECT.md
/gsd:plan-phase      # Create PLAN.md for Phase 1`,
          },
          {
            type: 'heading',
            content: 'What /gsd:new-project Does',
          },
          {
            type: 'text',
            content: 'GSD asks you a series of questions: project name, tech stack, key goals, team constraints, and success criteria. Then it writes all of that into PROJECT.md. This file becomes the single source of truth for every phase that follows.',
          },
          {
            type: 'code',
            language: 'bash',
            content: `# What the interview looks like in your terminal:

> /gsd:new-project

GSD: What is the name of this project?
You: Analytics Dashboard SaaS

GSD: What is the core problem it solves?
You: Developers need to track custom events without a $500/mo Mixpanel bill

GSD: What is the tech stack?
You: Next.js 14, Postgres, Drizzle ORM, Clerk auth, Vercel

GSD: What does a successful v1 look like?
You: Users can sign up, install a JS snippet, and see a live event feed

✓ Writing PROJECT.md...
Done. PROJECT.md created with your project context.`,
          },
          {
            type: 'heading',
            content: 'What PLAN.md Looks Like',
          },
          {
            type: 'text',
            content: 'After /gsd:plan-phase, GSD generates a PLAN.md file. This is the contract for the phase — it specifies every task, the exact files to touch, and the acceptance criteria /gsd:verify-work will check:',
          },
          {
            type: 'code',
            language: 'markdown',
            content: `# Phase 1: Database Schema & Migrations

## Goal
Set up the Postgres schema for users, API keys, and events.

## Tasks

### Wave 1 (parallel)
- [ ] Create src/db/schema.ts — define users, api_keys, events tables using Drizzle
- [ ] Create src/db/migrate.ts — migration runner script
- [ ] Create drizzle.config.ts — Drizzle Kit config pointing to DATABASE_URL

### Wave 2 (after Wave 1)
- [ ] Write src/db/seed.ts — seed 2 test users and 50 sample events
- [ ] Update package.json — add "db:migrate" and "db:seed" scripts

## Acceptance Criteria
- [ ] npm run db:migrate completes without errors
- [ ] npm run db:seed inserts test data
- [ ] All tables visible in database inspector`,
          },
          {
            type: 'callout',
            calloutVariant: 'info',
            content: 'PLAN.md is the contract. `/gsd:execute-phase` reads it to know what to build. `/gsd:verify-work` reads it to know what to check. You can edit PLAN.md before executing if the generated plan needs adjustments.',
          },
          {
            type: 'callout',
            calloutVariant: 'tip',
            content: 'Not sure about the approach before planning? Run `/gsd:discuss-phase` first for an interactive Q&A that shapes the plan, or `/gsd:research-phase` to have GSD investigate the codebase before writing the plan.',
          },
        ],
      },
      {
        id: 'lesson-3-3',
        title: 'Executing & Verifying Work',
        description: 'Run phases with parallel agents, validate results against the plan, and ship with confidence.',
        estimatedMinutes: 8,
        blocks: [
          {
            type: 'lesson-player',
          },
          {
            type: 'text',
            content: 'Once PLAN.md exists, two commands take you from plan to shipped: `/gsd:execute-phase` builds everything, `/gsd:verify-work` checks that everything was built correctly. Here is what each looks like in practice.',
          },
          {
            type: 'heading',
            content: 'Running /gsd:execute-phase',
          },
          {
            type: 'text',
            content: 'GSD reads the waves in PLAN.md and spawns one sub-agent per task. Wave 1 tasks all run in parallel; Wave 2 starts only after Wave 1 completes. This is what it looks like in your terminal:',
          },
          {
            type: 'code',
            language: 'bash',
            content: `> /gsd:execute-phase

Reading PLAN.md... Phase 1: Database Schema & Migrations
Launching Wave 1 (3 tasks in parallel):

  ⠋ [Agent 1] Create src/db/schema.ts
  ⠋ [Agent 2] Create src/db/migrate.ts
  ⠋ [Agent 3] Create drizzle.config.ts

  ✓ [Agent 3] drizzle.config.ts — done (8s)
  ✓ [Agent 2] migrate.ts — done (11s)
  ✓ [Agent 1] schema.ts — done (14s)

Wave 1 complete. Launching Wave 2 (2 tasks in parallel):

  ⠋ [Agent 4] Create src/db/seed.ts
  ⠋ [Agent 5] Update package.json scripts

  ✓ [Agent 5] package.json — done (6s)
  ✓ [Agent 4] seed.ts — done (12s)

Phase 1 execution complete. All 5 tasks finished.
Run /gsd:verify-work to validate acceptance criteria.`,
          },
          {
            type: 'heading',
            content: 'Running /gsd:verify-work',
          },
          {
            type: 'text',
            content: '/gsd:verify-work reads the acceptance criteria from PLAN.md and checks each one. It runs tests, reads files, and asks you to confirm things it cannot verify automatically:',
          },
          {
            type: 'code',
            language: 'bash',
            content: `> /gsd:verify-work

Verifying Phase 1: Database Schema & Migrations

✓ src/db/schema.ts exists — users, api_keys, events tables defined
✓ src/db/migrate.ts exists — migration runner found
✓ drizzle.config.ts exists — DATABASE_URL referenced correctly
✓ package.json — "db:migrate" and "db:seed" scripts present

Running: npm run db:migrate
  ✓ Migration completed — 3 tables created

Running: npm run db:seed
  ✓ Seed complete — 2 users, 50 events inserted

All 3 acceptance criteria passed.
Phase 1 is verified. Mark as complete? (y/n)`,
          },
          {
            type: 'heading',
            content: 'Tracking Progress Across Phases',
          },
          {
            type: 'text',
            content: 'As you complete phases, `/gsd:progress` shows exactly where you are in the milestone:',
          },
          {
            type: 'code',
            language: 'bash',
            content: `> /gsd:progress

Milestone: v1 MVP — Analytics Dashboard
Progress: ████████░░░░░░░░  2 / 4 phases complete (50%)

✓ Phase 1: Database schema & migrations   [verified]
✓ Phase 2: Authentication                 [verified]
→ Phase 3: Event ingestion API            [in progress — PLAN.md exists]
  Phase 4: Dashboard UI                   [not started]

Next action: /gsd:execute-phase  (Phase 3 plan is ready)`,
          },
          {
            type: 'table',
            headers: ['Command', 'When to run it'],
            rows: [
              ['/gsd:execute-phase', 'After PLAN.md is reviewed and approved'],
              ['/gsd:verify-work', 'After every execution — before marking phase complete'],
              ['/gsd:progress', 'Any time — shows milestone status and routes you to the next step'],
              ['/gsd:audit-milestone', 'Before archiving — confirms the full milestone matches original intent'],
              ['/gsd:complete-milestone', 'After the audit passes — archives everything and prepares next milestone'],
            ],
          },
          {
            type: 'callout',
            calloutVariant: 'tip',
            content: 'Never skip /gsd:verify-work. Execution can succeed (no errors) while still missing an acceptance criterion. Verification is what catches the gap between "it ran" and "it works".',
          },
        ],
      },
      {
        id: 'lesson-3-4',
        title: 'Advanced GSD Workflows',
        description: 'Real scenarios: debugging across resets, mapping new codebases, urgent hotfixes, and context handoffs.',
        estimatedMinutes: 7,
        blocks: [
          {
            type: 'lesson-player',
          },
          {
            type: 'text',
            content: 'Beyond the core plan → execute → verify loop, GSD has commands for the situations that derail most AI-assisted development. Here are four real scenarios and the command that handles each.',
          },
          {
            type: 'heading',
            content: 'Scenario 1: A Bug That Keeps Losing Context',
          },
          {
            type: 'text',
            content: 'You are debugging a race condition in your event queue. You spend 20 minutes exploring, get close — then the context window resets and you lose everything. With `/gsd:debug`:',
          },
          {
            type: 'code',
            language: 'bash',
            content: `> /gsd:debug

GSD: Describe the bug.
You: Events are being double-processed when two workers consume
     from the queue simultaneously. Happens ~5% of the time.

GSD creates .planning/debug/session-001.md and begins tracking:
  - Hypothesis 1: missing row-level lock in dequeue query
  - Test: add SELECT ... FOR UPDATE SKIP LOCKED
  - Result: ✓ reduced to 0.1% — not fully fixed

[context resets after 2 hours of work]

> /gsd:resume-work
  Restoring debug session: race condition in event queue
  Last hypothesis: SELECT FOR UPDATE reduced rate but did not eliminate
  Next test: check if workers share a DB connection pool
  Picking up exactly where we left off.`,
          },
          {
            type: 'heading',
            content: 'Scenario 2: Joining an Unfamiliar Codebase',
          },
          {
            type: 'text',
            content: 'You just inherited a 50,000-line monolith. Before GSD can plan anything, it needs to understand the architecture. `/gsd:map-codebase` spawns multiple agents in parallel to analyze different parts simultaneously:',
          },
          {
            type: 'code',
            language: 'bash',
            content: `> /gsd:map-codebase

Launching 4 parallel mapper agents:
  ⠋ [Tech mapper]    Analyzing stack, dependencies, build system
  ⠋ [Arch mapper]    Mapping module structure and entry points
  ⠋ [Quality mapper] Checking test coverage, lint config, CI setup
  ⠋ [Concerns mapper] Identifying tech debt and risky areas

All done. Writing to .planning/codebase/:
  ✓ tech.md      — Next.js 14, Drizzle, Clerk, 47 dependencies
  ✓ arch.md      — 12 modules, entry: src/app/, shared: src/lib/
  ✓ quality.md   — 34% test coverage, no E2E tests, lint passing
  ✓ concerns.md  — auth.ts is 800 lines, 3 circular imports found

GSD will use these documents to inform all future phase plans.`,
          },
          {
            type: 'heading',
            content: 'Scenario 3: Urgent Hotfix Mid-Milestone',
          },
          {
            type: 'text',
            content: 'You are on Phase 3 of 4 when a production security issue is reported. You cannot wait until Phase 4. `/gsd:insert-phase` slots the fix between phases without renumbering your roadmap:',
          },
          {
            type: 'code',
            language: 'bash',
            content: `> /gsd:insert-phase

GSD: Insert after which phase? (current: Phase 3 in progress)
You: After Phase 3 — before Phase 4

GSD: Describe the urgent phase.
You: Fix SQL injection vulnerability in the search endpoint

✓ Phase 3.1 created: Security hotfix — search endpoint
  Your roadmap is now: Phase 3 → Phase 3.1 → Phase 4

Run /gsd:plan-phase when Phase 3 is done to plan Phase 3.1.`,
          },
          {
            type: 'heading',
            content: 'Scenario 4: Handing Off Mid-Session',
          },
          {
            type: 'text',
            content: 'You need to stop working mid-phase — switching to another project, going to a meeting, or handing off to a teammate. `/gsd:pause-work` captures the exact state so nothing is lost:',
          },
          {
            type: 'code',
            language: 'bash',
            content: `> /gsd:pause-work

Creating .planning/PAUSE.md...

✓ Phase 3 status: 3 of 5 tasks complete
✓ In progress: rate limiting middleware (50% done)
✓ Blocker: need to decide between token bucket vs sliding window
✓ Next: finish rate limiter, then run /gsd:verify-work

PAUSE.md written. Share this file or run /gsd:resume-work
in a new session to pick up exactly here.`,
          },
          {
            type: 'table',
            headers: ['Command', 'The scenario it solves'],
            rows: [
              ['/gsd:debug', 'Bug investigation that needs to survive context resets'],
              ['/gsd:map-codebase', 'First time working on a large or inherited codebase'],
              ['/gsd:insert-phase', 'Urgent work (hotfix, security issue) that needs to happen before the next planned phase'],
              ['/gsd:quick', 'A small, clearly-defined task that doesn\'t need full planning overhead'],
              ['/gsd:pause-work', 'Stopping mid-phase — preserves state for yourself or a teammate'],
              ['/gsd:resume-work', 'Returning to paused work — restores full context instantly'],
            ],
          },
          {
            type: 'callout',
            calloutVariant: 'success',
            content: 'GSD is most valuable on projects that span multiple sessions, involve multiple phases, or require coordination across many files. For a 15-minute single-file fix, `/gsd:quick` or plain Claude Code is the right tool.',
          },
        ],
      },
    ],
  },
  {
    id: 'module-10',
    title: 'n8n + Claude Automation',
    description: 'Build production automation workflows that combine n8n\'s orchestration with Claude\'s intelligence.',
    icon: 'Workflow',
    color: 'green',
    quizId: 'quiz-module-10',
    lessons: [
      {
        id: 'lesson-10-1',
        title: 'n8n Fundamentals for Claude Users',
        description: 'Understand n8n\'s core model and why it pairs naturally with Claude.',
        estimatedMinutes: 7,
        blocks: [
          {
            type: 'lesson-player',
          },
          {
            type: 'visual',
            visualId: 'n8n-intro',
          },
          {
            type: 'text',
            content: 'n8n is an open-source visual workflow automation platform. Unlike SaaS tools like Zapier or Make.com, n8n is self-hostable — you run it on your own infrastructure, pay nothing per workflow execution, and keep all data within your network.',
          },
          {
            type: 'callout',
            calloutVariant: 'info',
            content: 'n8n is free and open-source under the Sustainable Use License. Self-hosted deployments have no per-task fees. n8n Cloud is available if you prefer managed hosting.',
          },
          {
            type: 'table',
            content: 'n8n vs Zapier vs Make.com',
            headers: ['Feature', 'n8n', 'Zapier', 'Make.com'],
            rows: [
              ['Pricing model', 'Free (self-hosted)', 'Per-task', 'Per-operation'],
              ['Self-hostable', 'Yes', 'No', 'No'],
              ['Code nodes', 'Yes (JS/Python)', 'Limited', 'Limited'],
              ['Complex branching', 'Yes', 'Limited', 'Yes'],
              ['Data privacy', 'Full control', 'SaaS', 'SaaS'],
            ],
          },
          {
            type: 'steps',
            content: 'Install n8n locally',
            steps: [
              'npx n8n  (uses npx for zero-install local run)',
              'Open http://localhost:5678 in your browser',
              'Create an account (local only)',
              'Click "New Workflow" to create your first automation',
            ],
          },
          {
            type: 'tip',
            content: '**Why n8n + Claude?** n8n handles the plumbing: scheduling, triggers, retries, and 400+ integrations. Claude handles the intelligence: reasoning, generation, and classification. Together they cover the full automation stack.',
          },
        ],
      },
      {
        id: 'lesson-10-2',
        title: 'Calling Claude API from n8n',
        description: 'Configure an HTTP Request node to call Claude, store credentials safely, and parse responses.',
        estimatedMinutes: 8,
        blocks: [
          {
            type: 'lesson-player',
          },
          {
            type: 'text',
            content: 'There are two ways to call Claude from n8n: the native Anthropic node (if installed) or a generic HTTP Request node. The HTTP Request node gives you full control and works in any n8n version.',
          },
          {
            type: 'code',
            language: 'json',
            content: `{
  "method": "POST",
  "url": "https://api.anthropic.com/v1/messages",
  "headers": {
    "x-api-key": "={{ $credentials.anthropicApi.apiKey }}",
    "anthropic-version": "2023-06-01",
    "content-type": "application/json"
  },
  "body": {
    "model": "claude-sonnet-4-6",
    "max_tokens": 1024,
    "messages": [
      {
        "role": "user",
        "content": "={{ $json.userMessage }}"
      }
    ]
  }
}`,
          },
          {
            type: 'steps',
            content: 'Set up the HTTP Request node',
            steps: [
              'Add an HTTP Request node to your workflow',
              'Set method to POST and URL to https://api.anthropic.com/v1/messages',
              'Create an n8n Credential of type "Header Auth" with name "x-api-key" and your key',
              'Set Content-Type to application/json',
              'Configure the request body with model, max_tokens, and messages',
              'Add a Set node after to extract: {{ $json.content[0].text }}',
            ],
          },
          {
            type: 'callout',
            calloutVariant: 'warning',
            content: '**Never hardcode your Anthropic API key in node parameters.** Always use n8n\'s Credential store. Hardcoded keys appear in workflow exports and logs.',
          },
          {
            type: 'code',
            language: 'javascript',
            content: `// n8n expression to extract Claude's response text
{{ $json.content[0].text }}

// If you need to strip whitespace
{{ $json.content[0].text.trim() }}

// Access the stop reason
{{ $json.stop_reason }}  // "end_turn" | "max_tokens" | "stop_sequence"`,
          },
          {
            type: 'tip',
            content: 'Always set `max_tokens` explicitly. If omitted, Claude may use the model\'s full context window — a runaway prompt can generate a very expensive response.',
          },
        ],
      },
      {
        id: 'lesson-10-3',
        title: 'Real-World n8n + Claude Workflows',
        description: 'Three production workflow patterns: PR summaries, standup reports, and support ticket drafting.',
        estimatedMinutes: 10,
        blocks: [
          {
            type: 'lesson-player',
          },
          {
            type: 'text',
            content: 'The power of n8n + Claude becomes clear when you wire together real systems. Here are three production-ready workflow patterns with the design decisions behind them.',
          },
          {
            type: 'heading',
            level: 3,
            content: 'Workflow 1: GitHub PR → Claude Summary → Slack',
          },
          {
            type: 'steps',
            content: 'PR summary workflow',
            steps: [
              'Trigger: GitHub webhook fires on pull_request.opened event',
              'HTTP node: fetch the PR diff from GitHub API',
              'HTTP node: POST diff to Claude with prompt "Summarize this PR in 3 bullet points"',
              'Slack node: post Claude\'s summary to #engineering channel',
            ],
          },
          {
            type: 'heading',
            level: 3,
            content: 'Workflow 2: Scheduled Standup Summary',
          },
          {
            type: 'steps',
            content: 'Standup summary workflow',
            steps: [
              'Trigger: Cron node fires every weekday at 9:00 AM',
              'HTTP node: fetch yesterday\'s merged PRs and closed issues from GitHub',
              'HTTP node: POST to Claude "Generate a daily standup summary from these items"',
              'Email node: send Claude\'s summary to the team distribution list',
            ],
          },
          {
            type: 'heading',
            level: 3,
            content: 'Workflow 3: Support Ticket → Human-in-the-Loop Reply',
          },
          {
            type: 'steps',
            content: 'Support ticket workflow',
            steps: [
              'Trigger: Webhook receives new support ticket payload',
              'HTTP node: POST ticket content to Claude "Draft a helpful reply to this support ticket"',
              'Wait node: pause and send draft + approval link to support manager via email',
              'On approval: send the draft reply; on rejection: flag for manual handling',
            ],
          },
          {
            type: 'callout',
            calloutVariant: 'tip',
            content: '**Use human-in-the-loop for any workflow that sends messages on your behalf.** The Wait node in n8n is purpose-built for this — it pauses the workflow until a human approves via webhook or form.',
          },
          {
            type: 'comparison',
            content: 'Batch vs real-time triggers',
            do: {
              label: 'Real-Time (Webhook)',
              code: `Use when:\n- Response time matters\n- Triggered by user action\n- Each event needs\n  individual handling\n\nExample: PR opened,\nform submitted`,
            },
            dont: {
              label: 'Batch (Cron)',
              code: `Use when:\n- Timing is flexible\n- Aggregating many events\n- Cost efficiency matters\n  (fewer Claude calls)\n\nExample: daily digest,\nweekly report`,
            },
          },
        ],
      },
      {
        id: 'lesson-10-4',
        title: 'Prompt Engineering Inside n8n',
        description: 'Dynamic prompts with expressions, system/user split, long-input handling, and error branches.',
        estimatedMinutes: 7,
        blocks: [
          {
            type: 'lesson-player',
          },
          {
            type: 'text',
            content: 'Static prompts in n8n workflows waste Claude\'s capabilities. The real power comes from dynamically constructing prompts from upstream data using n8n expressions.',
          },
          {
            type: 'code',
            language: 'json',
            content: `{
  "model": "claude-sonnet-4-6",
  "max_tokens": 512,
  "system": "You are a senior code reviewer. Be concise and actionable.",
  "messages": [
    {
      "role": "user",
      "content": "Review this pull request:\\n\\nTitle: {{ $json.pull_request.title }}\\nAuthor: {{ $json.pull_request.user.login }}\\nFiles changed: {{ $json.pull_request.changed_files }}\\n\\nDiff:\\n{{ $json.diff.substring(0, 8000) }}"
    }
  ]
}`,
          },
          {
            type: 'callout',
            calloutVariant: 'tip',
            content: 'Split your prompt into `system` (stable instructions that describe Claude\'s role) and `messages[0].content` (dynamic context from the workflow). This also sets up for prompt caching later.',
          },
          {
            type: 'table',
            content: 'Error types and recommended n8n handling',
            headers: ['Error', 'Cause', 'Handling'],
            rows: [
              ['529 Overloaded', 'Anthropic API under load', 'Retry with exponential backoff (built into HTTP node)'],
              ['400 Bad Request', 'Malformed request body', 'Error branch → Slack alert with request payload'],
              ['max_tokens hit', 'Input/output too long', 'Truncate input, increase max_tokens, or add summarization pre-step'],
              ['Empty content', 'Claude returned empty string', 'Check stop_reason; add fallback value in Set node'],
            ],
          },
          {
            type: 'checklist',
            content: 'n8n + Claude workflow checklist',
            items: [
              { text: 'API key stored in n8n Credential store', description: 'Never hardcoded in node parameters.' },
              { text: 'max_tokens explicitly set', description: 'Prevents runaway token usage.' },
              { text: 'Long inputs truncated or pre-summarized', description: 'Avoids hitting context limits mid-workflow.' },
              { text: 'Error branch wired to Slack/email alert', description: 'You\'ll know immediately when the workflow fails.' },
              { text: 'Human-in-the-loop added for external-facing actions', description: 'Review before sending emails, posting comments, etc.' },
            ],
          },
          {
            type: 'tip',
            content: 'Use n8n\'s built-in "Retry on Fail" option on the HTTP Request node with 3 retries and exponential backoff. This handles Anthropic\'s occasional 529 overload responses without any custom code.',
          },
        ],
      },
    ],
  },
  {
    id: 'module-11',
    title: 'The Broader Automation Ecosystem',
    description: 'Shell scripts, Zapier, Make.com, webhooks, and a framework for choosing the right tool.',
    icon: 'Zap',
    color: 'yellow',
    quizId: 'quiz-module-11',
    lessons: [
      {
        id: 'lesson-11-1',
        title: 'Claude CLI in Shell Scripts & Cron Jobs',
        description: 'Use claude -p to embed Claude intelligence in any shell script or scheduled job.',
        estimatedMinutes: 7,
        blocks: [
          {
            type: 'lesson-player',
          },
          {
            type: 'text',
            content: 'The `claude -p` flag puts Claude in non-interactive mode: pass a prompt, get a response, exit. This makes Claude usable anywhere you can run a shell command — cron jobs, CI pipelines, git hooks, and more.',
          },
          {
            type: 'code',
            language: 'bash',
            content: `#!/bin/bash
# daily-summary.sh — runs at 8 AM via cron

# Fetch yesterday's git log
LOG=$(git log --since="yesterday" --oneline)

# Generate summary with Claude
SUMMARY=$(claude -p "Summarize these commits for a non-technical stakeholder: $LOG" \\
  --model claude-haiku-4-5-20251001 \\
  --output-format text)

# Post to Slack
curl -X POST "$SLACK_WEBHOOK_URL" \\
  -H 'Content-type: application/json' \\
  --data "{\"text\": \"Daily summary:\\n$SUMMARY\"}"`,
          },
          {
            type: 'steps',
            content: 'Create a scheduled summarizer',
            steps: [
              'Write a shell script that gathers context (git log, API data, etc.)',
              'Pipe or pass that context to `claude -p "your prompt"`',
              'Capture the output in a variable and act on it (email, Slack, file)',
              'Make the script executable: chmod +x daily-summary.sh',
              'Add a cron entry: crontab -e → 0 8 * * 1-5 /path/to/daily-summary.sh',
            ],
          },
          {
            type: 'callout',
            calloutVariant: 'info',
            content: 'Use `--model` to pin a specific model in scripts. This prevents cost surprises when a new model becomes the default. Use `claude-haiku-4-5-20251001` for high-volume, low-complexity tasks.',
          },
          {
            type: 'tip',
            content: 'Use `--output-format json` when you need structured data from a script. Claude will return a JSON object you can parse with `jq`: `claude -p "extract name and email" --output-format json < contact.txt | jq .name`',
          },
        ],
      },
      {
        id: 'lesson-11-2',
        title: 'Zapier & Make.com + Claude',
        description: 'Integrate Claude into no-code automation stacks using webhooks or native Anthropic connectors.',
        estimatedMinutes: 8,
        blocks: [
          {
            type: 'lesson-player',
          },
          {
            type: 'text',
            content: 'If your team already uses Zapier or Make.com, you can add Claude to existing workflows without introducing n8n. Both platforms support calling Claude via HTTP requests, and Zapier has a native Anthropic app.',
          },
          {
            type: 'steps',
            content: 'Add Claude to a Zapier workflow',
            steps: [
              'In Zapier, add an action step and search for "Webhooks by Zapier" (or the Anthropic app)',
              'Select "POST" and set the URL to https://api.anthropic.com/v1/messages',
              'Add headers: x-api-key (stored in Zapier), anthropic-version, content-type',
              'Set the request body with model, max_tokens, and messages array',
              'Add a subsequent step that uses the parsed response text',
            ],
          },
          {
            type: 'table',
            content: 'Zapier vs Make vs n8n comparison',
            headers: ['Criteria', 'Zapier', 'Make.com', 'n8n'],
            rows: [
              ['Setup speed', 'Fastest', 'Fast', 'Moderate'],
              ['Cost model', 'Per task', 'Per operation', 'Free (self-hosted)'],
              ['Data privacy', 'Data through Zapier', 'Data through Make', 'Your infrastructure'],
              ['Complex logic', 'Limited', 'Good', 'Excellent'],
              ['Code execution', 'Code by Zapier', 'Limited', 'Full JS/Python'],
              ['Best for', 'Quick no-code', 'Visual complex flows', 'High-volume / private'],
            ],
          },
          {
            type: 'callout',
            calloutVariant: 'warning',
            content: '**SaaS tools charge per task execution.** At low volumes this is fine, but a workflow that calls Claude 10,000 times per month can get expensive fast. Model the cost before committing to SaaS tools at scale.',
          },
          {
            type: 'tip',
            content: 'A great starter use case: Google Form submitted → Zapier → Claude classifies the response → add to Notion database. This requires zero infrastructure and ships in under an hour.',
          },
        ],
      },
      {
        id: 'lesson-11-3',
        title: 'Webhooks & Event-Driven Claude Workflows',
        description: 'Build reactive systems: external events trigger Claude instantly, without polling.',
        estimatedMinutes: 8,
        blocks: [
          {
            type: 'lesson-player',
          },
          {
            type: 'text',
            content: 'Event-driven architectures respond immediately when something happens — a PR opens, a payment fails, a monitoring alert fires. Webhooks are the mechanism: the external system POSTs to your endpoint, you call Claude, you act on the result.',
          },
          {
            type: 'code',
            language: 'typescript',
            content: `import Anthropic from '@anthropic-ai/sdk';
import express from 'express';
import crypto from 'crypto';

const app = express();
const anthropic = new Anthropic();

app.post('/webhook/github', express.json(), async (req, res) => {
  // Validate webhook signature
  const sig = req.headers['x-hub-signature-256'] as string;
  const expected = 'sha256=' + crypto
    .createHmac('sha256', process.env.GITHUB_WEBHOOK_SECRET!)
    .update(JSON.stringify(req.body))
    .digest('hex');
  if (sig !== expected) return res.status(401).send('Invalid signature');

  // Only handle PR events
  if (req.body.action !== 'opened') return res.status(200).send('ignored');

  const pr = req.body.pull_request;

  const msg = await anthropic.messages.create({
    model: 'claude-haiku-4-5-20251001',
    max_tokens: 256,
    messages: [{ role: 'user', content: \`Summarize this PR in one sentence: \${pr.title}\\n\${pr.body}\` }],
  });

  // Post summary to Slack
  await fetch(process.env.SLACK_WEBHOOK_URL!, {
    method: 'POST',
    headers: { 'content-type': 'application/json' },
    body: JSON.stringify({ text: \`New PR: \${(msg.content[0] as any).text}\` }),
  });

  res.status(200).send('ok');
});

app.listen(3000);`,
          },
          {
            type: 'steps',
            content: 'Wire up a GitHub webhook',
            steps: [
              'Deploy your webhook handler (Railway, Fly.io, or ngrok for local dev)',
              'In GitHub repo Settings → Webhooks → Add webhook',
              'Set URL to your handler endpoint, content type to application/json',
              'Set a secret and store it in your handler as GITHUB_WEBHOOK_SECRET',
              'Select "Pull requests" event and save',
              'Open a test PR to verify end-to-end',
            ],
          },
          {
            type: 'callout',
            calloutVariant: 'tip',
            content: '**Always validate webhook signatures.** Without validation, anyone who discovers your endpoint can trigger Claude calls (and rack up your API bill). Every major platform (GitHub, Stripe, Twilio) provides an HMAC signature you can verify.',
          },
          {
            type: 'comparison',
            content: 'Polling vs event-driven',
            do: {
              label: 'Event-Driven (Webhooks)',
              code: `+ Instant response\n+ No wasted API calls\n+ Scales to high volume\n+ Lower compute cost\n\nBest for: PR events,\npayments, alerts`,
            },
            dont: {
              label: 'Polling',
              code: `- Delayed response\n- Wastes API calls\n  when nothing changed\n- Doesn't scale well\n\nUse only when webhooks\nare unavailable`,
            },
          },
          {
            type: 'tip',
            content: 'Make your webhook handler idempotent — if GitHub retries a delivery, processing it twice shouldn\'t cause double-posts. Store a set of processed event IDs in Redis or a database.',
          },
        ],
      },
      {
        id: 'lesson-11-4',
        title: 'Choosing the Right Tool for the Job',
        description: 'A decision framework across Claude CLI, n8n, Make.com, Zapier, and custom services.',
        estimatedMinutes: 5,
        blocks: [
          {
            type: 'lesson-player',
          },
          {
            type: 'text',
            content: 'You now have a full toolkit: Claude CLI, n8n, Make.com, Zapier, and custom webhook handlers. The right choice depends on your team\'s technical level, hosting requirements, data sensitivity, cost model, and maintenance budget.',
          },
          {
            type: 'table',
            content: 'Full decision matrix',
            headers: ['Tool', 'Best for', 'Avoid when'],
            rows: [
              ['Claude CLI (-p)', 'Cron jobs, CI scripts, one-off automation', 'Needs UI, retries, or multi-step orchestration'],
              ['n8n (self-hosted)', 'Complex workflows, data privacy, high volume', 'Team has no infra capacity or prefers no-code'],
              ['Make.com', 'Visual complex flows, moderate volume', 'Data must stay on-premise, high volume'],
              ['Zapier', 'Quick no-code, simple trigger → action', 'Complex logic, high volume, cost-sensitive'],
              ['Custom service', 'Maximum control, unique requirements', 'Speed matters; avoid reinventing n8n'],
            ],
          },
          {
            type: 'comparison',
            content: 'Over-automation vs right-sized automation',
            do: {
              label: 'Right-Sized',
              code: `1. Do it manually 5 times\n2. Document the steps\n3. Automate only what\n   proved repeatable\n4. Start with simplest\n   tool that works`,
            },
            dont: {
              label: 'Over-Automation',
              code: `- Automate before\n  validating manually\n- Use Claude for data\n  a regex would handle\n- Build a "platform"\n  for one workflow`,
            },
          },
          {
            type: 'callout',
            calloutVariant: 'tip',
            content: '**Always start manual, automate what proves repeatable.** Automating an untested workflow bakes in every assumption and mistake. Run the workflow manually 5 times first — automation should encode a proven process.',
          },
          {
            type: 'checklist',
            content: 'Automation readiness checklist',
            items: [
              { text: 'I\'ve run this workflow manually at least 5 times', description: 'Proves it works before you automate it.' },
              { text: 'The steps are fully documented', description: 'Automation codifies your documentation.' },
              { text: 'Failure modes are understood', description: 'Know what can go wrong before automating.' },
              { text: 'A human review step is included for external-facing actions', description: 'Don\'t let Claude send emails without approval at first.' },
              { text: 'Cost per run is estimated', description: 'Especially important for SaaS tools and Claude API calls.' },
            ],
          },
          {
            type: 'callout',
            calloutVariant: 'success',
            content: 'You\'ve completed the core automation modules! You now understand Plan Mode, MCP, n8n integration, and the full automation ecosystem. The final module puts it all together in a production-grade capstone project.',
          },
        ],
      },

      // ── Lesson 11-5: GitHub Actions + Claude ────────────────────────────
      {
        id: 'lesson-11-5',
        title: 'GitHub Actions + Claude',
        description: 'Run Claude non-interactively in CI — auto-summarise PRs, generate release notes, flag issues on push, and gate merges on Claude\'s review.',
        estimatedMinutes: 8,
        blocks: [
          { type: 'lesson-player' },
          {
            type: 'text',
            content: '`claude -p` (print mode) runs a single prompt non-interactively and exits — perfect for CI. Combine it with GitHub Actions triggers and you get Claude as a full participant in your pipeline: reviewing PRs, summarising diffs, generating release notes, and blocking merges on quality issues.',
          },
          {
            type: 'heading', level: 2,
            content: 'The essential setup',
          },
          {
            type: 'code',
            language: 'yaml',
            content: `# .github/workflows/claude-pr-review.yml
name: Claude PR Review

on:
  pull_request:
    types: [opened, synchronize]

jobs:
  review:
    runs-on: ubuntu-latest
    permissions:
      pull-requests: write   # needed to post comments

    steps:
      - uses: actions/checkout@v4
        with:
          fetch-depth: 0     # full history for accurate diffs

      - name: Get PR diff
        id: diff
        run: |
          git diff origin/\${{ github.base_ref }}...HEAD > pr.diff
          echo "diff_size=\$(wc -l < pr.diff)" >> \$GITHUB_OUTPUT

      - name: Claude review
        id: claude
        env:
          ANTHROPIC_API_KEY: \${{ secrets.ANTHROPIC_API_KEY }}
        run: |
          REVIEW=\$(claude -p "Review this pull request diff for bugs,
          security issues, and missing error handling. Be concise.
          Format as markdown with sections: Bugs, Security, Suggestions.
          Only list real issues — skip nitpicks.

          \$(cat pr.diff)" --model claude-sonnet-4-6)

          echo "review<<EOF" >> \$GITHUB_OUTPUT
          echo "\$REVIEW" >> \$GITHUB_OUTPUT
          echo "EOF" >> \$GITHUB_OUTPUT

      - name: Post review comment
        uses: actions/github-script@v7
        with:
          script: |
            github.rest.issues.createComment({
              issue_number: context.issue.number,
              owner: context.repo.owner,
              repo: context.repo.repo,
              body: \`## Claude Code Review\\n\n\${{ steps.claude.outputs.review }}\`
            })`,
          },
          {
            type: 'heading', level: 2,
            content: 'Practical workflow patterns',
          },
          {
            type: 'table',
            headers: ['Workflow', 'Trigger', 'Claude task'],
            rows: [
              ['PR review', '`pull_request: opened`', 'Review diff for bugs and security issues'],
              ['Release notes', '`push: tags: v*`', 'Summarise commits since last tag into changelog'],
              ['Commit message lint', '`push`', 'Flag commits that don\'t follow conventional commit format'],
              ['Test failure triage', '`workflow_run: failed`', 'Analyse test output and suggest the likely root cause'],
              ['Dependency audit', '`schedule: weekly`', 'Review npm audit output and prioritise fixes'],
            ],
          },
          {
            type: 'heading', level: 2,
            content: 'Cost control in CI',
          },
          {
            type: 'steps',
            content: 'Avoid runaway CI costs',
            steps: [
              'Use `--model claude-haiku-4-5-20251001` for simple tasks (lint checks, classification) — 20× cheaper than Opus',
              'Truncate large diffs: `head -c 50000 pr.diff` before passing to Claude — most issues are visible in the first 1,500 lines',
              'Add `if: github.actor != \'dependabot[bot]\'` to skip Claude review on automated dependency PRs',
              'Set `CLAUDE_CODE_MAX_OUTPUT_TOKENS=1024` for summary tasks where you only need a short response',
              'Cache the system prompt across workflow runs using GitHub Actions cache + prompt caching',
            ],
          },
          {
            type: 'code',
            language: 'yaml',
            content: `# Release notes workflow
name: Generate Release Notes

on:
  push:
    tags: ['v*']

jobs:
  release-notes:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v4
        with: { fetch-depth: 0 }

      - name: Generate notes
        env:
          ANTHROPIC_API_KEY: \${{ secrets.ANTHROPIC_API_KEY }}
        run: |
          PREV_TAG=\$(git describe --tags --abbrev=0 HEAD^ 2>/dev/null || echo "")
          COMMITS=\$(git log \${PREV_TAG}..HEAD --oneline)

          claude -p "Convert these git commits into user-facing release notes.
          Group by: New Features, Bug Fixes, Breaking Changes.
          Skip chore/ci/docs commits. Keep each item to one sentence.

          Commits:
          \$COMMITS" > RELEASE_NOTES.md

          cat RELEASE_NOTES.md`,
          },
          {
            type: 'callout',
            calloutVariant: 'warning',
            content: 'Store `ANTHROPIC_API_KEY` as a GitHub Actions secret (`Settings → Secrets → Actions`), never hardcoded in the workflow file. For org-wide workflows, use an org-level secret so you don\'t duplicate it across repos.',
          },
        ],
      },
    ],
  },
  {
    id: 'module-12',
    title: 'Capstone: Build an AI Code Review Pipeline',
    description: 'Apply every course concept in one project: a production PR reviewer using MCP, sub-agents, prompt caching, hooks, and n8n.',
    icon: 'GraduationCap',
    color: 'rose',
    quizId: 'quiz-module-12',
    lessons: [
      {
        id: 'lesson-12-1',
        title: 'Designing the Pipeline with Plan Mode',
        description: 'Start in Plan Mode to map the full architecture before writing a single line of code.',
        estimatedMinutes: 10,
        blocks: [
          {
            type: 'lesson-player',
          },
          {
            type: 'text',
            content: 'We\'re building a production AI code reviewer: when a GitHub PR opens, an n8n workflow fetches the diff via the GitHub MCP server, Claude runs three parallel analysis agents (security, style, logic), and the results are posted back to GitHub as a structured review with a Slack notification. This single project demonstrates every major technique from the course.',
          },
          {
            type: 'table',
            content: 'Pipeline stages and course concepts',
            headers: ['Stage', 'Course Concept Used'],
            rows: [
              ['Design before coding', 'Plan Mode (Module 8)'],
              ['Project context file', 'CLAUDE.md (Module 2)'],
              ['Fetch PR diff', 'MCP — GitHub server (Module 9)'],
              ['Dev-time observability', 'Hooks — PreToolUse logger (Module 6)'],
              ['Parallel analysis', 'Sub-agents — 3 specialists (Module 7)'],
              ['Reduce repeated token costs', 'Prompt caching (Module 5)'],
              ['Manual trigger from terminal', 'Custom skill /review-pr (Module 4)'],
              ['Orchestration & delivery', 'n8n + webhooks (Modules 10–11)'],
            ],
          },
          {
            type: 'steps',
            content: 'Plan Mode design session',
            steps: [
              'Create the project directory and run /init to generate a starter CLAUDE.md',
              'Activate Plan Mode (Shift+Tab)',
              'Ask Claude: "Map the architecture for a GitHub PR reviewer using the tools I\'ve described"',
              'Claude explores the GitHub MCP server tools with /mcp and reads the SDK docs',
              'Claude calls AskUserQuestion for any ambiguities (auth strategy, output format)',
              'Claude writes the plan file and calls ExitPlanMode',
              'Review and approve the plan — then proceed to implementation',
            ],
          },
          {
            type: 'code',
            language: 'markdown',
            content: `# PR Reviewer — CLAUDE.md

## Project
AI-powered GitHub PR reviewer. Runs on every PR open event.

## Stack
- n8n (self-hosted) for workflow orchestration
- GitHub MCP server for diff fetching and review posting
- Anthropic API with prompt caching for parallel analysis
- Slack for team notifications

## File Layout
\`\`\`
pr-reviewer/
  .claude/
    settings.json     # MCP + hooks config
    hooks/
      pre-tool-logger.sh
      post-tool-validator.sh
  prompts/
    system.md         # Shared cached system prompt
    security.md       # Security agent instructions
    style.md          # Style agent instructions
    logic.md          # Logic agent instructions
  n8n/
    workflow.json     # Full n8n workflow export
  scripts/
    review-pr.sh      # /review-pr skill script
\`\`\`

## Conventions
- All prompts stored in /prompts — never inline in code
- Max 2048 tokens per agent response
- Always include line numbers in review comments`,
          },
          {
            type: 'callout',
            calloutVariant: 'info',
            content: 'Design before you build — Plan Mode enforces this by making it impossible to accidentally write code during the architecture phase. Every minute spent in planning saves ten minutes of debugging.',
          },
          {
            type: 'tip',
            content: 'Use a read-only Explore sub-agent to audit the GitHub MCP server\'s available tools before writing your plan. Ask it: "List all tools from the GitHub MCP server and describe what each one returns."',
          },
        ],
      },
      {
        id: 'lesson-12-2',
        title: 'Setting Up MCP, Hooks & Project Scaffolding',
        description: 'Configure the GitHub MCP server, add observability hooks, and scaffold the n8n workflow skeleton.',
        estimatedMinutes: 10,
        blocks: [
          {
            type: 'lesson-player',
          },
          {
            type: 'text',
            content: 'With the plan approved, we scaffold the project: configure the GitHub MCP server, add two development hooks for observability, and build the n8n workflow skeleton that will orchestrate everything.',
          },
          {
            type: 'code',
            language: 'json',
            content: `// .claude/settings.json
{
  "mcpServers": {
    "github": {
      "command": "npx",
      "args": ["-y", "@modelcontextprotocol/server-github"],
      "env": {
        "GITHUB_PERSONAL_ACCESS_TOKEN": "\${GITHUB_TOKEN}"
      }
    }
  },
  "hooks": {
    "PreToolUse": [
      {
        "matcher": ".*",
        "hooks": [
          {
            "type": "command",
            "command": "echo \"[TOOL] $(date +%T) $CLAUDE_TOOL_NAME: $CLAUDE_TOOL_INPUT\" >> .claude/dev.log"
          }
        ]
      }
    ],
    "PostToolUse": [
      {
        "matcher": "Write|Edit",
        "hooks": [
          {
            "type": "command",
            "command": "if [[ \\"$CLAUDE_TOOL_INPUT\\" != *\\"/src/\\"* ]]; then echo \\"BLOCKED: writes outside /src/\\" && exit 2; fi"
          }
        ]
      }
    ]
  }
}`,
          },
          {
            type: 'code',
            language: 'json',
            content: `// hooks config section only
{
  "hooks": {
    "PreToolUse": [{
      "matcher": ".*",
      "hooks": [{
        "type": "command",
        "command": "echo \\"[$(date +%T)] $CLAUDE_TOOL_NAME\\" >> .claude/dev.log"
      }]
    }],
    "PostToolUse": [{
      "matcher": "Write|Edit",
      "hooks": [{
        "type": "command",
        "command": "bash .claude/hooks/post-tool-validator.sh"
      }]
    }]
  }
}`,
          },
          {
            type: 'steps',
            content: 'Verify MCP connection and test a hook',
            steps: [
              'Run /mcp in Claude Code — confirm github server is listed',
              'Verify get_pull_request and create_review tools appear in the tool list',
              'Ask Claude: "Use get_pull_request to fetch PR #1 from my repo"',
              'Check .claude/dev.log — the PreToolUse hook should have logged the call',
              'Test the write guard: ask Claude to create a file outside /src/ — it should be blocked',
            ],
          },
          {
            type: 'callout',
            calloutVariant: 'tip',
            content: 'Hooks give you observability during development. The dev.log file is your X-ray: every tool call Claude makes is recorded with a timestamp. Review it after a session to understand exactly what Claude did.',
          },
          {
            type: 'exercise',
            content: 'Add a third hook that blocks writes outside /src/',
            exercise: {
              prompt: 'The PostToolUse hook above logs writes. Extend it to also block (exit code 2) any write or edit that targets a path not under /src/. The hook receives the tool input as $CLAUDE_TOOL_INPUT.',
              hints: [
                'Check if $CLAUDE_TOOL_INPUT contains "/src/" using bash string matching',
                'Exit with code 2 to block the tool — Claude will receive an error and stop',
                'Use echo to explain why it was blocked before exiting',
              ],
              solution: `#!/bin/bash
# .claude/hooks/post-tool-validator.sh
INPUT="$CLAUDE_TOOL_INPUT"

if [[ "$INPUT" != *"/src/"* ]]; then
  echo "BLOCKED: File writes are restricted to /src/ in this project."
  echo "Attempted path: $INPUT"
  exit 2
fi`,
              solutionLanguage: 'bash',
            },
          },
        ],
      },
      {
        id: 'lesson-12-3',
        title: 'The Parallel Analysis Engine',
        description: 'Orchestrate three specialist sub-agents in parallel with a shared cached system prompt.',
        estimatedMinutes: 12,
        blocks: [
          {
            type: 'lesson-player',
          },
          {
            type: 'text',
            content: 'The analysis engine is the heart of the pipeline. An orchestrator agent spawns three specialist sub-agents in parallel — each receives only the relevant diff slice. A shared system prompt is cached so it\'s only tokenized once across all three calls.',
          },
          {
            type: 'code',
            language: 'typescript',
            content: `import Anthropic from '@anthropic-ai/sdk';

const anthropic = new Anthropic();

// Shared system prompt — cached to avoid re-tokenizing on every call
const SYSTEM_PROMPT = \`You are an expert code reviewer for a TypeScript/React codebase.
Review ONLY the aspect assigned to you. Be specific: include file names and line numbers.
Format output as JSON: { "verdict": "pass"|"warn"|"fail", "comments": [{ "file": "", "line": 0, "message": "" }] }\`;

async function runParallelAnalysis(diff: string) {
  const agents = [
    { role: 'security',  focus: 'Find exposed secrets, injection risks, and auth/authz issues.' },
    { role: 'style',     focus: 'Check naming conventions, DRY violations, and comment quality.' },
    { role: 'logic',     focus: 'Find bugs, edge cases, off-by-one errors, and missing null checks.' },
  ];

  // Launch all 3 agents in parallel
  const results = await Promise.all(
    agents.map(agent =>
      anthropic.messages.create({
        model: 'claude-sonnet-4-6',
        max_tokens: 2048,
        system: [
          {
            type: 'text',
            text: SYSTEM_PROMPT,
            cache_control: { type: 'ephemeral' }, // Cache the shared prompt
          },
        ],
        messages: [{
          role: 'user',
          content: \`You are the \${agent.role} reviewer. \${agent.focus}\\n\\nDiff:\\n\${diff}\`,
        }],
      })
    )
  );

  return results.map((r, i) => ({
    agent: agents[i].role,
    result: JSON.parse((r.content[0] as any).text),
  }));
}`,
          },
          {
            type: 'steps',
            content: 'Test the parallel analysis with a sample diff',
            steps: [
              'Create a sample diff file at test/sample.diff with a few intentional issues',
              'Run the analysis: npx ts-node src/analyze.ts < test/sample.diff',
              'Verify all 3 agents return valid JSON with verdict and comments fields',
              'Check Anthropic usage dashboard — confirm cache_creation_input_tokens on first call',
              'Re-run and confirm cache_read_input_tokens (not re-billed) on subsequent calls',
            ],
          },
          {
            type: 'table',
            content: 'Agent focus areas and estimated tokens',
            headers: ['Agent', 'Focus Area', 'Typical Output Tokens'],
            rows: [
              ['Security', 'Secrets, injection, auth', '200–400'],
              ['Style', 'Naming, DRY, comments', '300–600'],
              ['Logic', 'Bugs, edge cases, null checks', '400–800'],
              ['Synthesizer', 'Merge 3 reports → final review', '500–1000'],
            ],
          },
          {
            type: 'callout',
            calloutVariant: 'info',
            content: 'Running 3 agents in parallel takes the same wall-clock time as 1 agent — but you get 3× the analysis depth. Prompt caching ensures the shared system prompt is only charged once, keeping costs close to a single-agent run.',
          },
          {
            type: 'exercise',
            content: 'Add a fourth "Performance" agent to the parallel fan-out',
            exercise: {
              prompt: 'Add a fourth agent to the agents array that reviews the diff for performance issues: unnecessary re-renders, unindexed queries, O(n²) algorithms, and missing memoization.',
              hints: [
                'Add a new entry to the agents array with role: "performance"',
                'The focus should mention specific performance anti-patterns relevant to the stack',
                'No other code changes needed — Promise.all handles N agents automatically',
              ],
              solution: `// Add to agents array:
{
  role: 'performance',
  focus: 'Find unnecessary re-renders, missing memoization (useMemo/useCallback), unindexed DB queries, O(n²) loops, and synchronous operations that should be async.'
}

// Promise.all automatically includes the fourth agent — no other changes needed.`,
              solutionLanguage: 'typescript',
            },
          },
        ],
      },
      {
        id: 'lesson-12-4',
        title: 'Wiring the Pipeline & Shipping',
        description: 'Complete the n8n workflow, add the /review-pr skill, run end-to-end tests, and analyze costs.',
        estimatedMinutes: 10,
        blocks: [
          {
            type: 'lesson-player',
          },
          {
            type: 'text',
            content: 'With the analysis engine working, we wire it into n8n, add error handling, create the `/review-pr` custom skill for manual triggers, run a full end-to-end test, and analyze the cost model.',
          },
          {
            type: 'code',
            language: 'bash',
            content: `#!/bin/bash
# scripts/review-pr.sh — triggered by /review-pr skill
# Usage: /review-pr https://github.com/owner/repo/pull/123

PR_URL="$1"
if [ -z "$PR_URL" ]; then
  echo "Usage: /review-pr <pr-url>"
  exit 1
fi

# Extract owner, repo, PR number from URL
OWNER=$(echo $PR_URL | cut -d'/' -f4)
REPO=$(echo $PR_URL | cut -d'/' -f5)
PR_NUM=$(echo $PR_URL | cut -d'/' -f7)

# Call the analysis pipeline non-interactively
claude -p "
Fetch PR #\${PR_NUM} diff from \${OWNER}/\${REPO} using the GitHub MCP tool.
Run the parallel analysis (security, style, logic, performance).
Post a structured review comment on the PR.
Return a summary of findings.
" --model claude-sonnet-4-6`,
          },
          {
            type: 'steps',
            content: 'End-to-end test checklist',
            steps: [
              'Open a real (or test) PR against your repo',
              'Verify the GitHub webhook fires and reaches n8n',
              'Check n8n execution log — all nodes should show green',
              'Confirm the review comment appears on the GitHub PR',
              'Verify the Slack notification appears in #engineering',
              'Test the error branch: temporarily break the API key and confirm Slack alert fires',
              'Test /review-pr manually: /review-pr https://github.com/you/repo/pull/1',
            ],
          },
          {
            type: 'table',
            content: 'Cost breakdown per PR review',
            headers: ['Scenario', 'Input Tokens', 'Output Tokens', 'Est. Cost'],
            rows: [
              ['No caching (4 agents × full system prompt)', '~8,000', '~2,000', '~$0.042'],
              ['With prompt caching (system prompt cached)', '~2,500 + 5,500 cache read', '~2,000', '~$0.018'],
              ['50 PRs/day, no cache', '~400K/day', '~100K/day', '~$2.10/day'],
              ['50 PRs/day, with cache', '~125K + cache', '~100K/day', '~$0.90/day'],
            ],
          },
          {
            type: 'checklist',
            content: 'Production readiness checklist',
            items: [
              { text: 'Webhook signature validation implemented', description: 'Prevents unauthorized triggers and API cost abuse.' },
              { text: 'Rate limiting on the webhook endpoint', description: 'Prevents a PR spam attack from draining your API credits.' },
              { text: 'Idempotency key on review creation', description: 'Prevents duplicate reviews if the webhook is retried.' },
              { text: 'Error branch alerts team on failure', description: 'Slack message with the failed PR link so it can be manually reviewed.' },
              { text: 'Prompt caching enabled on shared system prompt', description: 'Reduces cost by ~55% at the cache hit rate above.' },
              { text: 'Model pinned in all API calls', description: 'Prevents unexpected cost changes when default models update.' },
              { text: 'Review comment includes disclaimer', description: 'e.g., "AI-generated review — please verify before merging".' },
            ],
          },
          {
            type: 'callout',
            calloutVariant: 'success',
            content: '**Congratulations — you\'ve built a production AI pipeline!** This project used Plan Mode, CLAUDE.md, MCP, Hooks, Sub-agents, Prompt Caching, a Custom Skill, n8n orchestration, and webhooks. Every major technique from this course, wired together into something you can ship today.',
          },
        ],
      },
    ],
  },
  {
    id: 'module-13',
    title: 'Daily Stock Picks Bot (Telegram + n8n + Claude)',
    description: 'Build a real-money-ready swing trading assistant: Telegram triggers a daily n8n workflow that fetches stock data, computes signals, and asks Claude which stocks to buy for a 1–2 month hold.',
    icon: 'TrendingUp',
    color: 'cyan',
    quizId: 'quiz-module-13',
    lessons: [
      {
        id: 'lesson-13-1',
        title: 'Architecture & Strategy Design',
        description: 'Map the full pipeline and define the swing trading signals Claude will evaluate.',
        estimatedMinutes: 8,
        blocks: [
          {
            type: 'lesson-player',
          },
          {
            type: 'text',
            content: 'We\'re building a daily stock screening bot that delivers Claude\'s top swing-trade picks to your Telegram every weekday morning — and responds instantly whenever you send it a command. The strategy targets stocks to hold for 1–2 months, so we look for momentum building rather than day-trade noise.',
          },
          {
            type: 'table',
            content: 'Pipeline stages',
            headers: ['Stage', 'Tool', 'What it does'],
            rows: [
              ['Trigger', 'n8n Schedule (cron) OR Telegram command', 'Fires daily at 8 AM or on-demand /picks message'],
              ['Watchlist', 'n8n Code node', 'Defines the 20 stocks to screen'],
              ['Price data', 'HTTP node → Yahoo Finance', 'Fetches 3 months of daily OHLCV per stock'],
              ['Signal math', 'n8n Code node (JavaScript)', 'Computes RSI-14, MACD, 50-day SMA per stock'],
              ['AI analysis', 'HTTP node → Claude API', 'Ranks candidates and gives buy reasoning'],
              ['Delivery', 'n8n Telegram node', 'Sends formatted picks to your chat'],
            ],
          },
          {
            type: 'heading',
            level: 3,
            content: 'Swing Trading Signals (1–2 Month Hold)',
          },
          {
            type: 'table',
            content: 'Entry signal criteria',
            headers: ['Signal', 'Bullish Condition', 'Why it matters'],
            rows: [
              ['RSI (14-day)', '40–60, trending up from oversold', 'Momentum recovering without being overbought'],
              ['MACD', 'MACD line crossing above signal line', 'Short-term momentum turning positive'],
              ['50-day SMA', 'Price above the 50-day SMA', 'Stock is in a medium-term uptrend'],
              ['Volume', 'Above-average volume on up days', 'Institutional buying confirmation'],
              ['Recent performance', 'Not already up 20%+ in past 30 days', 'Avoids chasing extended moves'],
            ],
          },
          {
            type: 'callout',
            calloutVariant: 'warning',
            content: '**This is a tutorial, not financial advice.** The signals and Claude\'s output are educational examples of how to structure an AI-assisted screening tool. Always do your own research before investing.',
          },
          {
            type: 'tip',
            content: 'Why Yahoo Finance for data? It\'s the most accessible free option — no API key required, no sign-up. The unofficial endpoint `query1.finance.yahoo.com` returns JSON with full OHLCV history. Ideal for tutorials and personal projects.',
          },
        ],
      },
      {
        id: 'lesson-13-2',
        title: 'Setting Up Your Telegram Bot',
        description: 'Create a Telegram bot with BotFather, get your chat ID, and configure n8n\'s Telegram nodes.',
        estimatedMinutes: 8,
        blocks: [
          {
            type: 'lesson-player',
          },
          {
            type: 'text',
            content: 'Telegram\'s Bot API is the easiest messaging integration available — a bot is created in under 5 minutes and the API is completely free with no rate limits for personal use. n8n has a native Telegram node that handles authentication automatically.',
          },
          {
            type: 'steps',
            content: 'Create your Telegram bot',
            steps: [
              'Open Telegram and search for @BotFather',
              'Send /newbot and follow the prompts (choose a name and username ending in _bot)',
              'BotFather replies with your bot token — copy it (looks like 123456:ABC-DEF1234...)',
              'Open a chat with your new bot and send any message',
              'Fetch your chat_id: GET https://api.telegram.org/bot{YOUR_TOKEN}/getUpdates',
              'In the JSON response, find result[0].message.chat.id — this is your chat_id',
            ],
          },
          {
            type: 'code',
            language: 'bash',
            content: `# Get your chat_id after sending a message to your bot
curl "https://api.telegram.org/bot<YOUR_TOKEN>/getUpdates" | jq '.result[0].message.chat.id'

# Test sending a message manually
curl -X POST "https://api.telegram.org/bot<YOUR_TOKEN>/sendMessage" \\
  -H "Content-Type: application/json" \\
  -d '{
    "chat_id": "<YOUR_CHAT_ID>",
    "text": "Stock bot is online!",
    "parse_mode": "HTML"
  }'`,
          },
          {
            type: 'steps',
            content: 'Configure Telegram credentials in n8n',
            steps: [
              'In n8n, go to Settings → Credentials → Add Credential',
              'Choose "Telegram API" and paste your bot token',
              'Save — n8n will auto-verify the token against the Telegram API',
              'Add a Telegram node to any workflow and select your credential',
              'Set Chat ID to your chat_id from the getUpdates call above',
              'Test with "Send a text message" → "Hello from n8n!"',
            ],
          },
          {
            type: 'callout',
            calloutVariant: 'info',
            content: '**Using WhatsApp instead?** You can swap Telegram for WhatsApp via Twilio\'s WhatsApp API. Replace the Telegram node with an HTTP Request node POSTing to `https://api.twilio.com/2010-04-01/Accounts/{SID}/Messages.json`. The rest of the workflow is identical.',
          },
          {
            type: 'heading',
            level: 3,
            content: 'Adding an On-Demand /picks Command',
          },
          {
            type: 'steps',
            content: 'Set up Telegram webhook trigger (on-demand mode)',
            steps: [
              'In n8n, add a "Telegram Trigger" node as an alternative start node',
              'Set it to listen for "message" events',
              'Add an IF node: check if {{ $json.message.text }} equals "/picks"',
              'Route the TRUE branch into the same stock-fetching flow',
              'Now the bot responds to /picks in addition to the daily cron',
            ],
          },
          {
            type: 'tip',
            content: 'To enable Telegram commands in BotFather: send /setcommands to @BotFather, select your bot, and send: `picks - Get today\'s stock picks`. This adds /picks to your bot\'s command menu.',
          },
        ],
      },
      {
        id: 'lesson-13-3',
        title: 'Fetching & Calculating Stock Signals',
        description: 'Pull 3 months of daily price data from Yahoo Finance and compute RSI, MACD, and SMA in an n8n Code node.',
        estimatedMinutes: 10,
        blocks: [
          {
            type: 'lesson-player',
          },
          {
            type: 'text',
            content: 'The data pipeline fetches 3 months of daily candles for each stock and computes three technical indicators in a JavaScript Code node. These computed signals become the structured context Claude receives for its analysis.',
          },
          {
            type: 'code',
            language: 'javascript',
            content: `// n8n Code node — define watchlist and fetch URLs
const watchlist = [
  'AAPL','MSFT','GOOGL','AMZN','NVDA',
  'META','TSLA','JPM','V','UNH',
  'HD','JNJ','PG','MA','BAC',
  'XOM','ABBV','LLY','MRK','CVX'
];

// Build Yahoo Finance URLs (no API key needed)
return watchlist.map(ticker => ({
  json: {
    ticker,
    url: \`https://query1.finance.yahoo.com/v8/finance/chart/\${ticker}?interval=1d&range=3mo\`
  }
}));`,
          },
          {
            type: 'steps',
            content: 'Fetch data for each stock',
            steps: [
              'After the Code node, add a "Split In Batches" node (batch size: 5)',
              'Add an HTTP Request node: GET {{ $json.url }}',
              'Set "Response Format" to JSON',
              'Add a 200ms wait between batches to avoid rate-limiting Yahoo Finance',
              'Merge all results back with a "Merge" node (mode: Combine All)',
            ],
          },
          {
            type: 'code',
            language: 'javascript',
            content: `// n8n Code node — compute RSI, MACD, SMA from Yahoo response
function sma(arr, n) {
  const s = arr.slice(-n);
  return s.reduce((a, b) => a + b, 0) / s.length;
}

function ema(arr, n) {
  const k = 2 / (n + 1);
  return arr.reduce((prev, price, i) => i === 0 ? price : price * k + prev * (1 - k));
}

function rsi(closes, period = 14) {
  const changes = closes.slice(1).map((p, i) => p - closes[i]);
  const gains = changes.map(c => c > 0 ? c : 0).slice(-period);
  const losses = changes.map(c => c < 0 ? Math.abs(c) : 0).slice(-period);
  const avgGain = gains.reduce((a, b) => a + b, 0) / period;
  const avgLoss = losses.reduce((a, b) => a + b, 0) / period;
  if (avgLoss === 0) return 100;
  return 100 - (100 / (1 + avgGain / avgLoss));
}

function macdSignal(closes) {
  const ema12 = ema(closes, 12);
  const ema26 = ema(closes, 26);
  const macdLine = ema12 - ema26;
  // Simplified: compare current MACD to 3-day prior MACD
  const ema12prev = ema(closes.slice(0, -3), 12);
  const ema26prev = ema(closes.slice(0, -3), 26);
  const macdPrev = ema12prev - ema26prev;
  return { macdLine, crossingUp: macdLine > 0 && macdPrev <= 0 };
}

const results = [];

for (const item of $input.all()) {
  try {
    const chart = item.json.chart.result[0];
    const closes = chart.indicators.quote[0].close.filter(Boolean);
    const volumes = chart.indicators.quote[0].volume.filter(Boolean);
    const ticker = chart.meta.symbol;
    const currentPrice = closes[closes.length - 1];

    const rsiVal = rsi(closes);
    const sma50 = sma(closes, Math.min(50, closes.length));
    const { macdLine, crossingUp } = macdSignal(closes);
    const avgVol = sma(volumes, 20);
    const lastVol = volumes[volumes.length - 1];
    const priceChange30d = ((currentPrice - closes[closes.length - 22]) / closes[closes.length - 22]) * 100;

    results.push({ json: {
      ticker,
      currentPrice: currentPrice.toFixed(2),
      rsi: rsiVal.toFixed(1),
      macdLine: macdLine.toFixed(3),
      macdCrossingUp: crossingUp,
      sma50: sma50.toFixed(2),
      aboveSMA50: currentPrice > sma50,
      volumeRatio: (lastVol / avgVol).toFixed(2),
      priceChange30d: priceChange30d.toFixed(1),
    }});
  } catch (e) {
    // Skip stocks with incomplete data
  }
}

return results;`,
          },
          {
            type: 'callout',
            calloutVariant: 'tip',
            content: 'The indicators are intentionally simplified for a tutorial. In a production system you\'d use a proper TA library (like `technicalindicators` on npm) and feed more history for accurate MACD signal lines. The structure and pipeline are identical — just swap in better math.',
          },
          {
            type: 'tip',
            content: 'After the signal computation node, add a "Filter" node to drop stocks where: RSI > 70 (overbought) OR priceChange30d > 20 (already extended). This pre-filters the list before sending to Claude, reducing token usage.',
          },
        ],
      },
      {
        id: 'lesson-13-4',
        title: 'Claude as the Swing Trading Analyst',
        description: 'Structure the stock data as context, craft the swing trading prompt, format the Telegram message, and deploy the complete bot.',
        estimatedMinutes: 12,
        blocks: [
          {
            type: 'section-tabs',
            sectionTabs: [

              // ── Tab 1: Overview ──────────────────────────────────────────────
              {
                label: '① Overview',
                blocks: [
                  {
                    type: 'lesson-player',
                  },
                  {
                    type: 'callout',
                    calloutVariant: 'tip',
                    content: '**All files are ready — import and go.**\n\n`github.com/shali-mor/claude-mastery-exercises/tree/main/module-12-stock-bot/lesson-04-claude-analyst/`\n\n- **`workflow/stock-bot-workflow.json`** — import into n8n, all 13 nodes pre-wired\n- **`nodes/01–06`** — every JS snippet as a standalone file\n- **`.env.example`** · **`README.md`** — credentials + activation guide\n\nNo separate Git repo needed — all code goes into n8n Code nodes.',
                  },
                  {
                    type: 'heading',
                    content: 'The 13-Node Pipeline',
                    level: 2,
                  },
                  {
                    type: 'visual',
                    visualId: 'stock-bot-workflow',
                  },
                  {
                    type: 'table',
                    headers: ['#', 'Node', 'Type', 'What it does'],
                    rows: [
                      ['1', 'Schedule Trigger', 'Trigger', 'Mon–Fri 8 AM cron'],
                      ['2', 'Telegram Trigger', 'Trigger', 'On `/picks` command'],
                      ['3', 'Merge', 'Merge', 'Either trigger starts the pipeline'],
                      ['4', 'Set Watchlist', 'Code', 'Emits one item per ticker'],
                      ['5', 'Yahoo Finance', 'HTTP Request', 'Fetches 90d OHLCV per ticker'],
                      ['6', 'Compute Signals', 'Code', 'RSI · MACD · SMA50 · volume ratio'],
                      ['7', 'Filter', 'Filter', 'RSI < 70 AND 30d gain < 20%'],
                      ['8', 'Build Prompt', 'Code (all items)', 'One Claude prompt for all signals'],
                      ['9', 'Claude API', 'HTTP Request', 'POST /v1/messages · Haiku model'],
                      ['9a', 'Error Message', 'Code', 'Error branch — builds alert text'],
                      ['9b', 'Send Error', 'Telegram', 'Error branch — alerts you instantly'],
                      ['10', 'Parse Response', 'Code', 'JSON.parse + strip markdown fences'],
                      ['11', 'Format Message', 'Code', 'Build Telegram HTML with medals'],
                      ['12', 'Send Picks', 'Telegram', 'Deliver picks to your chat'],
                    ],
                  },
                ],
              },

              // ── Tab 2: Build it ──────────────────────────────────────────────
              {
                label: '② Build it',
                blocks: [
                  {
                    type: 'lesson-player',
                  },
                  // Phase 1
                  {
                    type: 'heading',
                    content: 'Phase 1 — Triggers & Merge (nodes 1–3)',
                    level: 2,
                  },
                  {
                    type: 'table',
                    headers: ['Node', 'Type', 'Key setting'],
                    rows: [
                      ['Schedule Trigger', 'Schedule Trigger', 'Cron: `0 8 * * 1-5` (Mon–Fri 8 AM)'],
                      ['Telegram Trigger', 'Telegram Trigger', 'Event: Message received · filter: `/picks`'],
                      ['Merge', 'Merge', 'Mode: Passthrough — whichever trigger fires first wins'],
                    ],
                  },
                  // Phase 2
                  {
                    type: 'heading',
                    content: 'Phase 2 — Data Pipeline (nodes 4–6)',
                    level: 2,
                  },
                  {
                    type: 'table',
                    headers: ['Node', 'Type', 'Key setting'],
                    rows: [
                      ['Set Watchlist', 'Code', 'Run Once For All Items · returns one item per ticker'],
                      ['Yahoo Finance', 'HTTP Request', 'GET `https://query1.finance.yahoo.com/v8/finance/chart/{{ $json.ticker }}?interval=1d&range=90d`'],
                      ['Compute Signals', 'Code', 'Run Once For Each Item · RSI · MACD · SMA50 · vol ratio'],
                    ],
                  },
                  {
                    type: 'tabs',
                    tabs: [
                      {
                        label: 'Set Watchlist (node 4)',
                        language: 'javascript',
                        content: `// Code node: "Set Watchlist" — Run Once For All Items
const tickers = [
  'AAPL', 'MSFT', 'NVDA', 'GOOGL', 'META',
  'AMZN', 'TSLA', 'JPM',  'V',     'MA',
  'UNH',  'LLY',  'XOM',  'CVX',   'HD',
  'COST', 'AVGO', 'ASML', 'AMD',   'NFLX',
];
return tickers.map(ticker => ({ json: { ticker } }));`,
                      },
                      {
                        label: 'Compute Signals (node 6)',
                        language: 'javascript',
                        content: `// Code node: "Compute Signals" — Run Once For Each Item
const item = $input.first().json;
const ticker = item.meta?.symbol ?? 'UNKNOWN';
const closes  = item.indicators?.quote?.[0]?.close  ?? [];
const volumes = item.indicators?.quote?.[0]?.volume ?? [];
if (closes.length < 50) return [{ json: { ticker, skip: true } }];
function calcRSI(p, n=14) { let g=0,l=0; for(let i=1;i<=n;i++){const d=p[i]-p[i-1];if(d>0)g+=d;else l-=d;} let ag=g/n,al=l/n; for(let i=n+1;i<p.length;i++){const d=p[i]-p[i-1];ag=(ag*(n-1)+Math.max(d,0))/n;al=(al*(n-1)+Math.max(-d,0))/n;} return al===0?100:100-100/(1+ag/al); }
function calcEMA(p,n){const k=2/(n+1);let e=p.slice(0,n).reduce((a,b)=>a+b,0)/n;for(let i=n;i<p.length;i++)e=p[i]*k+e*(1-k);return e;}
const e12=calcEMA(closes,12),e26=calcEMA(closes,26),macdLine=e12-e26;
const ms=closes.slice(-35).map((_,i,a)=>{const s=closes.slice(0,closes.length-a.length+i+1);return calcEMA(s,12)-calcEMA(s,26);});
const sig=calcEMA(ms,9),sma50=closes.slice(-50).reduce((a,b)=>a+b,0)/50;
const rv=volumes.slice(-5).reduce((a,b)=>a+(b??0),0)/5,av=volumes.slice(-20).reduce((a,b)=>a+(b??0),0)/20;
const p30=closes[closes.length-31]??closes[0],cp=closes[closes.length-1];
return [{json:{ticker,currentPrice:Math.round(cp*100)/100,rsi:Math.round(calcRSI(closes)*10)/10,macdLine:Math.round(macdLine*100)/100,macdCrossingUp:macdLine>sig&&macdLine>0,aboveSMA50:cp>sma50,volumeRatio:Math.round((av>0?rv/av:1)*100)/100,priceChange30d:Math.round(((cp-p30)/p30)*1000)/10}}];`,
                      },
                    ],
                  },
                  {
                    type: 'callout',
                    calloutVariant: 'warning',
                    content: 'Yahoo Finance is unofficial — no auth needed but rate-limited. Add a **Wait node (0.5 s)** before the HTTP Request if you see 429 errors.',
                  },
                  // Phase 3
                  {
                    type: 'heading',
                    content: 'Phase 3 — Filter & Prompt (nodes 7–8)',
                    level: 2,
                  },
                  {
                    type: 'table',
                    headers: ['Node', 'Config'],
                    rows: [
                      ['Filter', '`rsi` < 70 **AND** `priceChange30d` < 20'],
                      ['Build Prompt', 'Code node · **Run Once For All Items** · aggregates all signals into one Claude prompt'],
                    ],
                  },
                  {
                    type: 'code',
                    language: 'javascript',
                    content: `// Code node: "Build Prompt" — Run Once For All Items
const stocks = $input.all().map(i => i.json).filter(s => !s.skip);
if (!stocks.length) return [{ json: { error: 'No stocks passed filter.' } }];
const today = new Date().toISOString().split('T')[0];
const tbl = stocks.map(s =>
  \`\${s.ticker}: $\${s.currentPrice} RSI=\${s.rsi} MACD=\${s.macdLine}(\${s.macdCrossingUp?'↑':'flat'}) \` +
  \`SMA50=\${s.aboveSMA50?'above':'below'} vol=\${s.volumeRatio}x 30d=\${s.priceChange30d}%\`
).join('\\n');
const prompt = \`Swing trading analyst. Hold 1–2 months, target 10–25% gains.\\n\\nToday: \${today}\\n\${tbl}\\n\\nCriteria (0–5): RSI 40–65 · MACD crossing up · above 50-SMA · vol >1.2x · <20% 30d.\\nPick TOP 3.\\n\\nRespond ONLY in JSON (no fences):\\n{"date":"\${today}","picks":[{"ticker":"X","score":4,"reason":"...","risk":"..."}],"summary":"..."}\`;
return [{ json: { prompt, stockCount: stocks.length } }];`,
                  },
                  // Phase 4
                  {
                    type: 'heading',
                    content: 'Phase 4 — Claude API (node 9)',
                    level: 2,
                  },
                  {
                    type: 'table',
                    headers: ['Setting', 'Value'],
                    rows: [
                      ['Node type', 'HTTP Request'],
                      ['Method / URL', 'POST `https://api.anthropic.com/v1/messages`'],
                      ['Auth', 'Generic Credential Type → Header Auth → credential `Anthropic` (header `x-api-key`)'],
                      ['Extra header', '`anthropic-version: 2023-06-01`'],
                      ['On Error', '**Continue to error output** (Settings tab) — enables red error pin'],
                    ],
                  },
                  {
                    type: 'code',
                    language: 'json',
                    content: `{ "model": "claude-haiku-4-5-20251001", "max_tokens": 1024, "messages": [{ "role": "user", "content": "{{ $json.prompt }}" }] }`,
                  },
                  {
                    type: 'heading',
                    content: 'Error Branch (nodes 9a–9b)',
                    level: 3,
                  },
                  {
                    type: 'steps',
                    steps: [
                      'Claude API node → **Settings** → On Error → "Continue to error output"',
                      'Connect the red error pin → new **Code node** "Error Message" → **Telegram** "Send Error"',
                    ],
                  },
                  {
                    type: 'code',
                    language: 'javascript',
                    content: `// Code node: "Error Message"
const err = $input.first().json.error?.message ?? 'Unknown error';
return [{ json: { message: \`❌ <b>Stock Bot Error</b>\\n\\n<code>\${err}</code>\\n\\nCheck n8n → Executions.\` } }];`,
                  },
                  // Phase 5
                  {
                    type: 'heading',
                    content: 'Phase 5 — Parse, Format & Send (nodes 10–12)',
                    level: 2,
                  },
                  {
                    type: 'table',
                    headers: ['Node', 'Config'],
                    rows: [
                      ['Parse Response', 'Code · strips markdown fences · JSON.parse'],
                      ['Format Message', 'Code · builds Telegram HTML with medals'],
                      ['Send Picks', 'Telegram · Chat ID = your numeric ID · **Parse Mode = HTML** · Text = `{{ $json.message }}`'],
                    ],
                  },
                  {
                    type: 'callout',
                    calloutVariant: 'info',
                    content: 'Get your chat ID: message **@userinfobot** in Telegram — it replies with your number.',
                  },
                  {
                    type: 'tabs',
                    tabs: [
                      {
                        label: 'Parse Response (node 10)',
                        language: 'javascript',
                        content: `// Code node: "Parse Response"
const raw = $input.first().json.content?.[0]?.text ?? '';
let data;
try { data = JSON.parse(raw.replace(/^\`\`\`json\\s*/i,'').replace(/\\s*\`\`\`$/,'').trim()); }
catch(e) { return [{ json: { parseError: true, message: '❌ Could not parse Claude response.' } }]; }
if (!data.picks?.length) return [{ json: { parseError: true, message: '❌ Unexpected JSON shape.' } }];
return [{ json: data }];`,
                      },
                      {
                        label: 'Format Message (node 11)',
                        language: 'javascript',
                        content: `// Code node: "Format Message"
const data = $input.first().json;
if (data.parseError) return [{ json: { message: data.message } }];
const medals = ['🥇','🥈','🥉'];
const lines = [\`📈 <b>Swing Trade Picks — \${data.date}</b>\\n\`, \`<i>\${data.summary}</i>\\n\`];
data.picks.forEach((p,i) => lines.push(\`\${medals[i]} <b>\${p.ticker}</b> (score: \${p.score}/5)\`,\`💡 \${p.reason}\`,\`⚠️ Risk: \${p.risk}\\n\`));
lines.push('<i>Not financial advice. Do your own research.</i>');
return [{ json: { message: lines.join('\\n') } }];`,
                      },
                    ],
                  },
                ],
              },

              // ── Tab 3: Deploy ────────────────────────────────────────────────
              {
                label: '③ Deploy',
                blocks: [
                  {
                    type: 'lesson-player',
                  },
                  {
                    type: 'steps',
                    steps: [
                      'Click **Activate** (top-right toggle) — schedule goes live.',
                      'Click **Execute Workflow** — runs the full pipeline immediately to confirm everything works.',
                      'Send `/picks` to your bot in Telegram to test the on-demand trigger.',
                      'Check **n8n → Executions** to inspect any node failures.',
                      'Export the workflow (⋯ → Export) — the reference copy is already in the exercise repo.',
                    ],
                  },
                  {
                    type: 'checklist',
                    content: 'Pre-launch checklist',
                    items: [
                      { text: 'Schedule Trigger cron: `0 8 * * 1-5`', description: 'Mon–Fri 8 AM before US market open.' },
                      { text: 'Anthropic credential in n8n: Header Auth · name `Anthropic` · key `x-api-key`', description: 'Never pasted directly into a node.' },
                      { text: 'Telegram bot token + chat ID configured', description: 'Bot from BotFather · chat ID from @userinfobot.' },
                      { text: '"Build Prompt" → Run Once For All Items', description: 'Aggregates all tickers into one Claude call.' },
                      { text: 'Claude API node → On Error = Continue to error output', description: 'Enables the error branch.' },
                      { text: 'Telegram Send nodes → Parse Mode = HTML', description: 'Required for bold / italic / code tags.' },
                    ],
                  },
                  {
                    type: 'heading',
                    content: 'Example Output',
                    level: 2,
                  },
                  {
                    type: 'code',
                    language: 'text',
                    content: `📈 Swing Trade Picks — 2026-03-11

Market consolidating after last week's rally — early rotation into tech.

🥇 NVDA (score: 5/5)
💡 RSI at 52 with MACD crossover and 1.8x average volume.
⚠️ Risk: Earnings in 3 weeks could introduce volatility.

🥈 MSFT (score: 4/5)
💡 Recovering from RSI-44 with steady institutional volume.
⚠️ Risk: Watch broad tech rotation risk.

🥉 JPM (score: 4/5)
💡 Financials showing strength above 50-SMA, rate tailwind.
⚠️ Risk: Fed meeting this month could shift sentiment.

Not financial advice. Do your own research.`,
                  },
                  {
                    type: 'callout',
                    calloutVariant: 'success',
                    content: '**Bot is live.** Every weekday morning — or on `/picks` — it screens 20 stocks, runs the signals, and delivers Claude\'s top 3 swing candidates to your Telegram in under 10 seconds.\n\nNext: expand to 50 tickers, tune the scoring criteria, add a Friday weekly-recap branch, or swap Telegram for Slack.',
                  },
                ],
              },

            ],
          },
        ],
      },
    ],
  },
  {
    id: 'module-14',
    title: 'Testing AI-Assisted Code',
    description: 'Validate what Claude writes — test-driven workflows, review patterns, static analysis, and automated CI gates that catch AI mistakes before they reach production.',
    icon: 'ShieldCheck',
    color: 'green',
    quizId: 'quiz-module-14',
    lessons: [
      // ── Lesson 14-1: Why AI Code Needs Testing ───────────────────────────
      {
        id: 'lesson-14-1',
        title: 'Why You Can\'t Skip Testing AI Output',
        description: 'AI-generated code fails in specific, predictable ways — understand the failure modes so you can design the right safeguards.',
        estimatedMinutes: 5,
        blocks: [
          { type: 'lesson-player' },
          {
            type: 'text',
            content: 'Claude writes correct-looking code. That\'s the risk. Unlike a junior developer whose uncertainty is visible, Claude produces confident, well-formatted output whether it\'s right or wrong. The failure modes are consistent and learnable — and once you know them, you can test for them systematically.',
          },
          {
            type: 'heading', level: 2,
            content: 'The six failure modes of AI-generated code',
          },
          {
            type: 'table',
            headers: ['Failure mode', 'What it looks like', 'How to catch it'],
            rows: [
              ['**Hallucinated APIs**', 'Claude calls a method that doesn\'t exist, or passes wrong argument types', 'TypeScript strict mode + `tsc --noEmit` in CI'],
              ['**Plausible but wrong logic**', 'Off-by-one errors, wrong boundary conditions, incorrect boolean logic', 'Unit tests with edge cases — especially zero, null, empty, max'],
              ['**Security blind spots**', 'Missing input validation, unescaped output, hardcoded secrets', 'SAST tools (ESLint security rules, Snyk) + `/security-review` skill'],
              ['**Stale knowledge**', 'Uses deprecated API patterns, outdated library versions, old syntax', 'Check against current docs, run tests against actual library'],
              ['**Context amnesia**', 'Ignores constraints from earlier in the conversation', 'Review against the original requirements, not just the code'],
              ['**Over-engineering**', 'Adds unnecessary abstraction, genericity, or complexity', 'Code review — ask "is this the simplest thing that works?"'],
            ],
          },
          {
            type: 'callout',
            calloutVariant: 'warning',
            content: '**The confidence problem.** Claude doesn\'t say "I\'m not sure" before writing a hallucinated API call. It writes it with the same confident style as correct code. You cannot tell from reading it — you have to run it.',
          },
          {
            type: 'heading', level: 2,
            content: 'The validation hierarchy',
          },
          {
            type: 'steps',
            content: 'Run these checks on every significant AI-generated change',
            steps: [
              '**Type check** (`tsc --noEmit`) — catches hallucinated APIs and type errors instantly, costs nothing',
              '**Lint** (`eslint`) — catches security anti-patterns, unused variables, style violations',
              '**Unit tests** — verify logic correctness, especially edge cases the code needs to handle',
              '**Integration tests** — verify the code works against real dependencies, not mocks',
              '**Manual review** — read every line Claude wrote. You are responsible for code you commit.',
            ],
          },
          {
            type: 'callout',
            calloutVariant: 'tip',
            content: '**The review mindset shift.** Reviewing AI code requires more suspicion than reviewing human code. A human developer is embarrassed to submit broken code. Claude has no such filter. Assume there are bugs and look for them actively.',
          },
        ],
      },

      // ── Lesson 14-2: TDD with Claude ─────────────────────────────────────
      {
        id: 'lesson-14-2',
        title: 'Test-Driven Development with Claude',
        description: 'Write tests first, let Claude implement to pass them — the workflow that produces the most reliable AI-generated code.',
        estimatedMinutes: 10,
        blocks: [
          { type: 'lesson-player' },
          {
            type: 'text',
            content: 'TDD with Claude flips the usual workflow: instead of asking Claude to write code and then hoping it works, you write the tests first and ask Claude to make them pass. This gives Claude a precise, machine-checkable definition of "correct" — and gives you immediate, objective feedback.',
          },
          {
            type: 'heading', level: 2,
            content: 'The TDD + Claude workflow',
          },
          {
            type: 'steps',
            content: 'Red → Green → Refactor, AI-assisted',
            steps: [
              '**Write the tests yourself.** Define the expected behaviour, edge cases, and failure modes in a test file. Do not ask Claude to write the tests — this is where your domain knowledge lives.',
              '**Run the tests.** They should fail (red). Confirm the failures are "not implemented" not "syntax error".',
              '**Ask Claude to implement the function to pass the tests.** Paste the test file and the function signature. Claude implements to the spec you defined.',
              '**Run the tests again.** If any fail, paste the failure output back to Claude and ask it to fix only the failing cases.',
              '**Refactor.** Ask Claude to clean up the implementation. Re-run tests to confirm refactoring didn\'t break anything.',
            ],
          },
          {
            type: 'comparison',
            content: '',
            do: {
              label: '✅ TDD approach',
              language: 'text',
              code: `// 1. You write tests first
describe('parseAmount', () => {
  it('parses "$1,234.56" → 1234.56', ...)
  it('returns null for empty string', ...)
  it('handles negative values "-$50"', ...)
  it('rejects non-numeric "abc"', ...)
})

// 2. Ask Claude:
"Implement parseAmount(input: string): number | null
to pass these tests: [paste test file]"

→ Claude has a precise target. You verify mechanically.`,
            },
            dont: {
              label: '❌ Code-first approach',
              language: 'text',
              code: `// Ask Claude to implement
"Write a parseAmount function that parses
currency strings"

// Then ask Claude to write tests
"Now write tests for it"

→ Claude tests its own implementation.
  It will write tests that pass, not tests
  that verify correct behaviour.`,
            },
          },
          {
            type: 'heading', level: 2,
            content: 'Prompting Claude in TDD mode',
          },
          {
            type: 'code',
            language: 'text',
            content: `Here are the tests for a parseAmount function.
All tests are currently failing.

[paste test file]

Implement parseAmount in src/utils/parseAmount.ts
so that all tests pass. Requirements:
- TypeScript with strict mode
- No external dependencies
- Export as named export

Do not modify the test file.`,
          },
          {
            type: 'heading', level: 2,
            content: 'Handling test failures',
          },
          {
            type: 'code',
            language: 'text',
            content: `// When tests fail after Claude's implementation:
"3 tests are still failing. Here is the output:

  ✕ returns null for empty string
    Expected: null
    Received: NaN

  ✕ rejects non-numeric 'abc'
    Expected: null
    Received: NaN

Fix only these failing cases. Do not change
the passing tests or their behaviour."`,
          },
          {
            type: 'callout',
            calloutVariant: 'tip',
            content: '**Scope the fix.** Always tell Claude which tests are failing and paste the exact output. If you just say "fix it", Claude may rewrite the entire implementation and break tests that were passing.',
          },
          {
            type: 'heading', level: 2,
            content: 'What to test that Claude commonly gets wrong',
          },
          {
            type: 'checklist',
            content: 'Edge cases Claude misses most often',
            items: [
              { text: 'Empty input (`""`, `[]`, `{}`, `null`, `undefined`)', description: 'Claude often forgets null/undefined checks.' },
              { text: 'Boundary values (0, -1, max int, max string length)', description: 'Off-by-one errors are the most common Claude logic bug.' },
              { text: 'Concurrent calls / race conditions', description: 'Claude rarely thinks about concurrency without explicit prompting.' },
              { text: 'Error propagation (does it throw, return null, or swallow?)', description: 'Claude is inconsistent about error handling conventions.' },
              { text: 'Idempotency (calling the function twice gives the same result)', description: 'Claude may write code with hidden side effects.' },
            ],
          },
        ],
      },

      // ── Lesson 14-3: Review Patterns for AI Output ───────────────────────
      {
        id: 'lesson-14-3',
        title: 'Code Review Patterns for AI Output',
        description: 'A structured review checklist for AI-generated code — what to look for, what to skip, and how to use Claude to review its own output.',
        estimatedMinutes: 8,
        blocks: [
          { type: 'lesson-player' },
          {
            type: 'text',
            content: 'Reviewing AI code efficiently means knowing what to look for and what you can skip. You don\'t need to verify every line manually — but you do need a systematic approach for the things that matter.',
          },
          {
            type: 'heading', level: 2,
            content: 'The AI code review checklist',
          },
          {
            type: 'checklist',
            content: 'Review every AI-generated change against these',
            items: [
              { text: 'Does it actually solve the stated problem?', description: 'Read the requirement, then read the code. Claude sometimes solves an adjacent problem.' },
              { text: 'Are all external APIs/methods real and used correctly?', description: 'Search the docs or hover in your IDE. Hallucinated methods compile in dynamic languages.' },
              { text: 'Is every input validated at the boundary?', description: 'Check the entry points — API handlers, form processors, file parsers.' },
              { text: 'Does it handle errors consistently with the rest of the codebase?', description: 'Claude may throw where you return, or return where you throw.' },
              { text: 'Are there any hardcoded values that should be config?', description: 'Magic numbers, hardcoded URLs, fixed timeouts.' },
              { text: 'Does it match the existing code style and patterns?', description: 'Claude follows general conventions, not your specific ones unless told.' },
              { text: 'Is it simpler than what you would have written?', description: 'If not — ask Claude to simplify. AI code tends toward over-engineering.' },
            ],
          },
          {
            type: 'heading', level: 2,
            content: 'Using Claude to review Claude\'s own output',
          },
          {
            type: 'text',
            content: 'Claude can review its own code — but only if you start a fresh context. Asking "is this code correct?" in the same session that wrote it almost always gets "yes". In a new session with no prior context, Claude is a useful second opinion.',
          },
          {
            type: 'code',
            language: 'text',
            content: `// In a NEW Claude Code session (or /clear first):
Review this code for:
1. Logic errors and edge cases
2. Security vulnerabilities (OWASP Top 10)
3. Missing error handling
4. Anything that will fail at scale

Be a skeptical senior engineer. Look for problems.
Don't praise what's correct — only flag issues.

[paste the code]`,
          },
          {
            type: 'callout',
            calloutVariant: 'warning',
            content: '**Context bias.** If Claude wrote the code in the current session, asking it to review the same code will almost always get a positive response — it has anchored on the code it produced. Always review AI output in a fresh context.',
          },
          {
            type: 'heading', level: 2,
            content: 'Static analysis as a first pass',
          },
          {
            type: 'table',
            headers: ['Tool', 'What it catches', 'Setup'],
            rows: [
              ['`tsc --noEmit`', 'Type errors, hallucinated APIs, wrong argument types', 'Built into TypeScript'],
              ['ESLint + security plugins', 'XSS, injection, insecure patterns, no-eval', '`npm i eslint-plugin-security`'],
              ['Snyk / `npm audit`', 'Vulnerable dependencies Claude may have suggested', '`npx snyk test` or `npm audit`'],
              ['Semgrep', 'Custom pattern matching — enforce your own rules', '`semgrep --config auto`'],
            ],
          },
          {
            type: 'callout',
            calloutVariant: 'tip',
            content: '**Automate the boring checks.** Run `tsc --noEmit && eslint && npm audit` in a pre-commit hook or CI step. This catches the mechanical errors automatically — leaving your manual review time for logic and architecture.',
          },
        ],
      },

      // ── Lesson 14-4: Automated Validation — Hooks & CI Gates ─────────────
      {
        id: 'lesson-14-4',
        title: 'Automated Validation — Hooks & CI Gates',
        description: 'Build a safety net around AI-generated code using pre-commit hooks, CI gates, and PostToolUse hooks that validate every file Claude writes.',
        estimatedMinutes: 8,
        blocks: [
          { type: 'lesson-player' },
          {
            type: 'text',
            content: 'The goal is to make correctness automatic — not dependent on remembering to run checks. Hooks and CI gates enforce quality at every stage: right after Claude writes a file, before a commit, and before a merge.',
          },
          {
            type: 'heading', level: 2,
            content: 'Layer 1: PostToolUse hook — validate immediately',
          },
          {
            type: 'text',
            content: 'A `PostToolUse` hook fires after Claude writes or edits a file. Use it to run type-checking and linting instantly — so Claude sees the errors and can fix them in the same session.',
          },
          {
            type: 'code',
            language: 'bash',
            content: `# .claude/hooks/validate-on-write.sh
#!/bin/bash
# Fires after every Write or Edit tool call

FILE="$CLAUDE_TOOL_OUTPUT"

# Only validate TypeScript/JavaScript files
if [[ "$FILE" =~ \.(ts|tsx|js|jsx)$ ]]; then
  echo "Validating $FILE..."

  # Type check the whole project (fast with incremental)
  npx tsc --noEmit --incremental 2>&1 | head -20

  # Lint just the changed file
  npx eslint "$FILE" --max-warnings 0 2>&1 | head -20
fi`,
          },
          {
            type: 'code',
            language: 'json',
            content: `// .claude/settings.json — register the hook
{
  "hooks": {
    "PostToolUse": [
      {
        "matcher": "Write|Edit",
        "hooks": [
          { "type": "command", "command": ".claude/hooks/validate-on-write.sh" }
        ]
      }
    ]
  }
}`,
          },
          {
            type: 'heading', level: 2,
            content: 'Layer 2: Pre-commit hook — catch before commit',
          },
          {
            type: 'code',
            language: 'bash',
            content: `# .husky/pre-commit — runs before every git commit
#!/bin/sh
echo "Running pre-commit validation..."

# Type check
npx tsc --noEmit || exit 1

# Lint staged files only (fast)
npx lint-staged || exit 1

# Run tests related to changed files
npx vitest run --changed || exit 1

echo "All checks passed."`,
          },
          {
            type: 'heading', level: 2,
            content: 'Layer 3: CI gate — block the merge',
          },
          {
            type: 'code',
            language: 'yaml',
            content: `# .github/workflows/validate.yml
name: Validate AI-assisted changes

on: [pull_request]

jobs:
  validate:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v4
      - uses: actions/setup-node@v4
        with: { node-version: '20', cache: 'npm' }
      - run: npm ci

      - name: Type check
        run: npx tsc --noEmit

      - name: Lint
        run: npx eslint src/ --max-warnings 0

      - name: Test
        run: npm test

      - name: Security audit
        run: npm audit --audit-level=high

      - name: Claude review (on large diffs)
        if: github.event.pull_request.changed_files > 10
        env:
          ANTHROPIC_API_KEY: \${{ secrets.ANTHROPIC_API_KEY }}
        run: |
          git diff origin/main...HEAD | head -c 30000 | \\
          claude -p "Review this diff for logic errors and
          security issues. List only real bugs — not style.
          Format: bullet list. If no issues found, say LGTM." \\
          --model claude-sonnet-4-6`,
          },
          {
            type: 'heading', level: 2,
            content: 'The complete safety net',
          },
          {
            type: 'table',
            headers: ['When', 'What runs', 'Catches'],
            rows: [
              ['Claude writes a file', 'PostToolUse hook: tsc + eslint', 'Type errors, lint violations — fixed in same session'],
              ['`git commit`', 'Pre-commit: tsc + lint-staged + vitest --changed', 'Broken types, lint, failing tests for changed files'],
              ['PR opened', 'CI: tsc + eslint + full test suite + npm audit', 'Any issues that slipped through local checks'],
              ['PR has 10+ files', 'CI: Claude review via `claude -p`', 'Logic errors and security issues in large diffs'],
            ],
          },
          {
            type: 'callout',
            calloutVariant: 'success',
            content: 'With all three layers in place, AI-generated code gets validated at the moment of writing, before committing, and before merging. You catch issues at the cheapest possible moment — when they\'re easiest to fix.',
          },
        ],
      },
    ],
  },
];

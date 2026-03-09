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
        estimatedMinutes: 10,
        blocks: [
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
        estimatedMinutes: 15,
        blocks: [
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
        estimatedMinutes: 8,
        blocks: [
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
        estimatedMinutes: 8,
        blocks: [
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
        estimatedMinutes: 10,
        blocks: [
          {
            type: 'text',
            content: 'Claude Code gives you three ways to extend and automate your workflow: **built-in slash commands**, **custom skills**, and **hooks**. They look similar but serve different purposes. Picking the wrong one costs you time — picking the right one multiplies your output.',
          },
          {
            type: 'table',
            headers: ['Extension', 'What it is', 'When to use it'],
            rows: [
              ['Slash command', 'Built-in Claude Code command (`/help`, `/compact`, `/clear`)', 'Standard Claude Code actions — cannot be added, only used'],
              ['Skill (custom command)', 'A Markdown file in `.claude/commands/` invoked with `/name`', 'Reusable prompts or workflows specific to **your project or team**'],
              ['Hook', 'A shell script that fires automatically on Claude Code events', 'Automations that run **without user input** — lint on save, block dangerous commands, log all actions'],
            ],
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
        ],
      },

      // ── Lesson 2-2: Writing Skills That Work ────────────────────────────
      {
        id: 'lesson-2-2',
        title: 'Writing Skills That Work',
        description: 'Learn the skill file format, $ARGUMENTS, and the writing patterns that make Claude follow your instructions reliably every time.',
        estimatedMinutes: 18,
        blocks: [
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
            ],
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
        estimatedMinutes: 20,
        blocks: [
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
        estimatedMinutes: 15,
        blocks: [
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
        estimatedMinutes: 12,
        blocks: [
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
        estimatedMinutes: 8,
        blocks: [
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
        estimatedMinutes: 12,
        blocks: [
          {
            type: 'text',
            content: 'Prompt caching lets you mark portions of your prompt as cacheable. On subsequent requests, cached tokens are read at ~10% of the normal input price. This is the highest-ROI optimization for apps with large, repeated contexts.',
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
            type: 'code',
            language: 'typescript',
            content: `import Anthropic from '@anthropic-ai/sdk';

const client = new Anthropic();

// Add cache_control to large, stable parts of your prompt
const response = await client.messages.create({
  model: 'claude-sonnet-4-6',
  max_tokens: 1024,
  system: [
    {
      type: 'text',
      text: yourLargeDocumentOrInstructions,
      // This gets cached after the first request
      cache_control: { type: 'ephemeral' },
    }
  ],
  messages: [
    { role: 'user', content: userQuestion }
  ]
});`,
          },
          {
            type: 'callout',
            calloutVariant: 'info',
            content: 'Cache break-even: 1 write (1.25x) + 1 read (0.10x) = 1.35x total for 2 uses. Without caching that\'s 2.0x. You save money starting from the very first cache hit.',
          },
        ],
      },
      {
        id: 'lesson-4-3',
        title: 'Batch API',
        description: 'Cut costs 50% on non-time-sensitive workloads with the Message Batches API.',
        estimatedMinutes: 10,
        blocks: [
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
            type: 'code',
            language: 'typescript',
            content: `import Anthropic from '@anthropic-ai/sdk';

const client = new Anthropic();

// Create a batch of requests
const batch = await client.messages.batches.create({
  requests: items.map((item, i) => ({
    custom_id: \`request-\${i}\`,
    params: {
      model: 'claude-haiku-4-5-20251001',
      max_tokens: 256,
      messages: [{ role: 'user', content: item.text }],
    }
  }))
});

// Poll until complete (or use webhooks)
const results = await client.messages.batches.results(batch.id);`,
          },
        ],
      },
      {
        id: 'lesson-4-4',
        title: 'Context Management Strategies',
        description: 'Control token costs through smart context windowing and model selection.',
        estimatedMinutes: 10,
        blocks: [
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
        estimatedMinutes: 10,
        blocks: [
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
            type: 'text',
            content: 'Save this to `.claude/commands/pick-model.md`. Run `/pick-model` before starting a task and Claude will read your description, score its complexity, and output the optimal model plus the command to switch.',
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
            type: 'text',
            content: 'This hook fires on every prompt. It reads the prompt text, detects simple tasks, and injects a cost warning into Claude\'s context if you\'re on Opus for something Haiku could handle.',
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
        estimatedMinutes: 10,
        blocks: [
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
        estimatedMinutes: 12,
        blocks: [
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
        estimatedMinutes: 15,
        blocks: [
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
        estimatedMinutes: 10,
        blocks: [
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
        estimatedMinutes: 10,
        blocks: [
          {
            type: 'text',
            content: 'A **sub-agent** is a separate Claude instance you spawn from inside a conversation. It runs autonomously, has its own context window, and reports back a single result when it finishes. Think of it like hiring a contractor: you give them a well-defined job, they go away and do it, and you get a deliverable back.',
          },
          {
            type: 'callout',
            calloutVariant: 'info',
            content: 'Sub-agents are launched with the **Task tool** — the tool Claude Code uses internally when you ask it to delegate work. When you build your own agents with the Claude API, you give your model the same Task-like capability by providing tools that can call Claude recursively.',
          },
          {
            type: 'heading',
            content: 'Why Use Sub-Agents?',
          },
          {
            type: 'table',
            headers: ['Problem', 'Sub-Agent Solution'],
            rows: [
              ['Context window fills up on large codebases', 'Delegate file exploration to an agent; get a summary back'],
              ['Sequential tasks waste time', 'Run 3–5 agents in parallel, merge results'],
              ['One conversation can\'t hold all the detail', 'Each agent gets only the context it needs'],
              ['You want specialization', 'One agent writes, another reviews, another tests'],
            ],
          },
          {
            type: 'heading',
            content: 'The Sub-Agent Mental Model',
          },
          {
            type: 'steps',
            content: 'The sub-agent lifecycle',
            steps: [
              'Parent decides to delegate — the orchestrator identifies a well-scoped sub-task that benefits from isolation or parallelism.',
              'Sub-agent is spawned with context — the parent passes a detailed prompt. The agent starts fresh with only that prompt and no memory of the parent conversation.',
              'Sub-agent works autonomously — it uses its tools (Read, Grep, Bash, Write, etc.) to complete the task. The parent waits or continues with other work if non-blocking.',
              'Result is returned — the sub-agent sends a single final message. The parent integrates the result and continues.',
            ],
          },
          {
            type: 'callout',
            calloutVariant: 'warning',
            content: '**Key constraint**: sub-agents do not share memory with the parent. Anything the parent knows must be explicitly passed in the prompt. This is a feature — it forces clear communication — but it means sloppy prompts produce sloppy results.',
          },
        ],
      },
      {
        id: 'lesson-7-2',
        title: 'Spawning Agents with the Task Tool',
        description: 'Learn the exact API for launching sub-agents and writing effective delegation prompts.',
        estimatedMinutes: 15,
        blocks: [
          {
            type: 'text',
            content: 'In Claude Code, sub-agents are launched via the **Task tool**. Each call spawns one agent with a specific `subagent_type`, a `prompt`, and optional parameters like `run_in_background` and `model`.',
          },
          {
            type: 'heading',
            content: 'Task Tool Parameters',
          },
          {
            type: 'table',
            headers: ['Parameter', 'Required', 'Description'],
            rows: [
              ['`subagent_type`', 'Yes', 'Which specialized agent to use (e.g., `Bash`, `Explore`, `general-purpose`)'],
              ['`prompt`', 'Yes', 'The full task description — treat it like a mini CLAUDE.md'],
              ['`description`', 'Yes', 'Short 3–5 word label shown in the UI'],
              ['`run_in_background`', 'No', 'Set `true` to launch without blocking — useful for parallel work'],
              ['`model`', 'No', 'Override the model: `"haiku"`, `"sonnet"`, or `"opus"`'],
              ['`isolation`', 'No', 'Set `"worktree"` to give the agent its own git branch'],
            ],
          },
          {
            type: 'heading',
            content: 'Anatomy of a Good Delegation Prompt',
          },
          {
            type: 'code',
            language: 'markdown',
            content: `# Task: Analyze authentication module

## Context
You are reviewing the auth system in a Next.js 14 app.
Relevant files are in \`src/app/api/auth/\` and \`src/lib/auth.ts\`.

## Your Goal
Find all places where JWTs are verified and check whether:
1. The expiry (\`exp\` claim) is validated
2. The signature algorithm is pinned (not 'none')
3. Errors are handled (not swallowed)

## Output Format
Return a markdown list. For each location include:
- File path and line number
- Verdict: PASS / FAIL / NEEDS_REVIEW
- One-line explanation

## Important
- Read files; do NOT modify anything
- If a file is missing, note it and continue`,
          },
          {
            type: 'callout',
            calloutVariant: 'tip',
            content: 'A great delegation prompt has four parts: **Context** (what the agent needs to know), **Goal** (what done looks like), **Output Format** (how to return the result), and **Constraints** (what NOT to do).',
          },
          {
            type: 'heading',
            content: 'Available Sub-Agent Types',
          },
          {
            type: 'table',
            headers: ['Type', 'Best For'],
            rows: [
              ['`Bash`', 'Git operations, running commands, terminal tasks'],
              ['`Explore`', 'Finding files, searching code, answering codebase questions'],
              ['`general-purpose`', 'Open-ended research, multi-step tasks, broad searches'],
              ['`Plan`', 'Designing implementation strategies, architecture decisions'],
              ['GSD agents (`gsd-executor`, etc.)', 'Full GSD workflow phases — planning, executing, verifying'],
            ],
          },
          {
            type: 'exercise',
            content: 'Write a delegation prompt for an Explore agent',
            exercise: {
              prompt: 'Write a Task tool call (as a JSON block) that spawns an `Explore` agent to find all React components in `src/components` that use the `useEffect` hook. The agent should return a list of file paths and line numbers. It should run in the foreground.',
              hints: [
                'The `subagent_type` should be `"Explore"`',
                'The prompt should tell the agent exactly what to search for and how to format results',
                'Set `description` to a short label like "Find useEffect usages"',
              ],
              solution: `{
  "subagent_type": "Explore",
  "description": "Find useEffect usages",
  "prompt": "Search all .tsx and .ts files in src/components for usages of the useEffect hook.\\n\\nFor each file that uses useEffect:\\n- List the file path\\n- List the line numbers where useEffect appears\\n\\nReturn results as a markdown list. Do not modify any files."
}`,
              solutionLanguage: 'json',
            },
          },
        ],
      },
      {
        id: 'lesson-7-3',
        title: 'Parallelization Patterns',
        description: 'Run multiple agents concurrently and merge their results for dramatically faster workflows.',
        estimatedMinutes: 15,
        blocks: [
          {
            type: 'text',
            content: 'The real power of sub-agents is **parallelism**. Instead of researching four topics sequentially, you launch four agents at once and collect all the results in roughly the time it takes to do one. This section covers the core patterns for parallel agent work.',
          },
          {
            type: 'heading',
            content: 'Pattern 1: Parallel Research Fan-Out',
          },
          {
            type: 'text',
            content: 'Break one large research question into N independent sub-questions and launch N agents simultaneously. Merge their findings in a final step.',
          },
          {
            type: 'code',
            language: 'markdown',
            content: `# Parallel Research: API Security Audit

Launch these 3 agents IN PARALLEL (single message, three Task calls):

Agent 1 — Authentication:
  Explore src/app/api/auth/ and report JWT handling issues.

Agent 2 — Input Validation:
  Explore all API route handlers, look for missing zod/validation.

Agent 3 — Rate Limiting:
  Check middleware.ts and API routes for rate-limit enforcement.

After all three return, synthesize findings into a single report.`,
          },
          {
            type: 'callout',
            calloutVariant: 'info',
            content: '**Rule of thumb**: agents are independent when the output of one is NOT an input to another. If Agent B needs Agent A\'s result, they must be sequential. Everything else can be parallel.',
          },
          {
            type: 'heading',
            content: 'Pattern 2: Map–Reduce',
          },
          {
            type: 'text',
            content: 'Assign one agent per item in a list (map), then combine all results (reduce). Classic for processing many files, repos, or issues at once.',
          },
          {
            type: 'steps',
            content: 'Map–Reduce execution',
            steps: [
              'Map phase — for each item (file, module, ticket…), spawn one agent. Pass only the data for that item. All agents run in parallel with `run_in_background: true`.',
              'Collect phase — wait for all background agents to finish. Use `TaskOutput` to retrieve results by agent ID.',
              'Reduce phase — the orchestrator (or a dedicated synthesis agent) merges all agent outputs into one coherent result.',
            ],
          },
          {
            type: 'heading',
            content: 'Pattern 3: Specialist Pipeline',
          },
          {
            type: 'text',
            content: 'Chain specialized agents where each stage feeds the next. This is sequential but lets each agent focus on one thing it does well.',
          },
          {
            type: 'comparison',
            content: '',
            do: {
              label: '✅ Specialist pipeline',
              language: 'typescript',
              code: `// Each agent has one focused job
// 1. Researcher gathers facts
const research = await Task({ type: 'Explore', prompt: '...' });
// 2. Planner designs solution using research
const plan = await Task({ type: 'Plan', prompt: \`Based on: \${research}\` });
// 3. Executor implements the plan
await Task({ type: 'gsd-executor', prompt: \`Execute: \${plan}\` });`,
            },
            dont: {
              label: '❌ Monolithic prompt',
              language: 'typescript',
              code: `// Stuffing research + planning + execution
// into one gigantic prompt = context bloat,
// confused output, harder to debug.
await Task({
  type: 'general-purpose',
  prompt: \`Research everything, make a plan,
           then implement it all at once...\`
});`,
            },
          },
          {
            type: 'heading',
            content: 'Pattern 4: Competitive Execution',
          },
          {
            type: 'text',
            content: 'Launch multiple agents to solve the same problem with different approaches. Pick the best result. Useful for creative tasks, architecture decisions, or when correctness is critical.',
          },
          {
            type: 'callout',
            calloutVariant: 'tip',
            content: 'Use `model: "haiku"` for simple map-phase agents (fast + cheap) and `model: "opus"` for the reduce/synthesis agent where quality matters most.',
          },
        ],
      },
      {
        id: 'lesson-7-4',
        title: 'Agent Communication & Best Practices',
        description: 'Design robust multi-agent systems: context passing, error handling, and avoiding common pitfalls.',
        estimatedMinutes: 12,
        blocks: [
          {
            type: 'text',
            content: 'Building reliable multi-agent systems requires more than just launching agents. You need to think about how context flows between them, how to handle failures, and how to avoid the common traps that make agent pipelines brittle.',
          },
          {
            type: 'heading',
            content: 'Context Passing Strategies',
          },
          {
            type: 'table',
            headers: ['Strategy', 'When to Use', 'Example'],
            rows: [
              ['Inline in prompt', 'Small data (< 500 tokens)', 'Pass a list of file paths directly in the prompt string'],
              ['File reference', 'Medium data', 'Write results to `/tmp/research.md`, tell the next agent to read it'],
              ['Structured output', 'Machine-readable handoffs', 'Ask the first agent to return JSON, parse it, inject into next prompt'],
              ['Shared state file', 'Long pipelines', 'Maintain a `.planning/state.md` that each agent reads and updates'],
            ],
          },
          {
            type: 'heading',
            content: 'Error Handling in Agent Pipelines',
          },
          {
            type: 'steps',
            content: 'Handling failures gracefully',
            steps: [
              'Check the result before continuing — a sub-agent can return a partial or error result. Always inspect the output for failure signals ("I could not find…", "Error:", empty string) before using it downstream.',
              'Retry with more context, not the same prompt — if an agent fails, diagnose why. Add the missing context or sharpen the goal. Re-running the identical prompt usually produces the same failure.',
              'Use isolation for risky work — set `isolation: "worktree"` when an agent will write files or make commits. Changes are isolated until you explicitly merge them.',
              'Limit scope with explicit constraints — include "do NOT modify files", "read only", or "stop after X steps" in the prompt. Agents without constraints can over-reach.',
            ],
          },
          {
            type: 'heading',
            content: 'Common Pitfalls',
          },
          {
            type: 'checklist',
            content: 'Watch out for these common pitfalls',
            items: [
              {
                text: 'Prompt too vague',
                description: '"Analyze the codebase" — for what? By what criteria? What should the output look like? Vague prompts produce vague answers.',
              },
              {
                text: 'Forgetting agents start fresh',
                description: 'Every sub-agent has zero memory of the parent conversation. If the agent needs a config value, file path, or prior decision — put it in the prompt.',
              },
              {
                text: 'Parallelizing dependent tasks',
                description: 'If Agent B needs Agent A\'s output, they are NOT independent. Run them sequentially; run independent tasks in parallel.',
              },
              {
                text: 'Using Opus for everything',
                description: 'Haiku is 20× cheaper and fast enough for most map-phase tasks (reading files, running grep, listing results). Reserve Opus for synthesis and complex reasoning.',
              },
              {
                text: 'No output format specified',
                description: 'Without a format spec, agents return prose. Prose is hard to parse programmatically. Ask for JSON, markdown tables, or numbered lists.',
              },
            ],
          },
          {
            type: 'heading',
            content: 'Designing Trustworthy Pipelines',
          },
          {
            type: 'callout',
            calloutVariant: 'tip',
            content: '**The Golden Rule of Sub-Agents**: a pipeline is only as reliable as its weakest prompt. Spend 80% of your design time on the delegation prompt — context, goal, output format, and constraints. The infrastructure is easy; clear communication is hard.',
          },
          {
            type: 'code',
            language: 'markdown',
            content: `# Sub-Agent Prompt Template

## Context
[What the agent needs to know about the project, codebase, or prior decisions]

## Goal
[Specific, measurable outcome — what "done" looks like]

## Constraints
- [What NOT to do: read-only, don't modify X, stop after Y]
- [Scope limits: only look in src/foo, only up to 5 files]

## Output Format
[Exact structure: JSON schema / markdown list / table with columns]

## If Blocked
[What to do if something is missing or ambiguous — fail loudly, not silently]`,
          },
          {
            type: 'callout',
            calloutVariant: 'success',
            content: 'Sub-agents transform Claude Code from a single-threaded assistant into a **multi-agent workforce**. Mastering delegation prompts, parallelism patterns, and context passing is what separates a 10× engineer from a 100× one.',
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
        estimatedMinutes: 10,
        blocks: [
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
        estimatedMinutes: 12,
        blocks: [
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
        estimatedMinutes: 15,
        blocks: [
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
        estimatedMinutes: 10,
        blocks: [
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
        estimatedMinutes: 10,
        blocks: [
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
        estimatedMinutes: 12,
        blocks: [
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
        estimatedMinutes: 15,
        blocks: [
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
        estimatedMinutes: 8,
        blocks: [
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
        description: 'Understand the milestone → phase → task hierarchy that GSD uses to ship software.',
        estimatedMinutes: 10,
        blocks: [
          {
            type: 'text',
            content: 'GSD (Get Stuff Done) is a structured, AI-orchestrated software development methodology built as a Claude Code plugin. It uses a Milestone → Phase → Task hierarchy to break large goals into executable, verifiable units of work.',
          },
          {
            type: 'table',
            content: 'GSD hierarchy',
            headers: ['Level', 'Description', 'Example'],
            rows: [
              ['Milestone', 'A major version or product goal', '"Build MVP" or "v2.0 Launch"'],
              ['Phase', 'A logical chunk of work within the milestone', '"Phase 1: Database schema" or "Phase 3: Auth"'],
              ['Task', 'A specific, actionable work item', '"Create users table migration"'],
            ],
          },
          {
            type: 'callout',
            calloutVariant: 'tip',
            content: 'GSD\'s power comes from parallelism: independent tasks within a phase run as simultaneous sub-agents. A 10-task phase might complete in the time it takes to do 2-3 tasks sequentially.',
          },
        ],
      },
      {
        id: 'lesson-3-2',
        title: 'Starting & Planning with GSD',
        description: 'Initialize projects, create milestones, and generate detailed phase plans.',
        estimatedMinutes: 12,
        blocks: [
          {
            type: 'text',
            content: 'GSD\'s planning workflow guides you from a rough idea to a detailed, executable plan. Each command builds context for the next.',
          },
          {
            type: 'steps',
            content: 'Starting a new GSD project',
            steps: [
              'Run /gsd:new-project — GSD interviews you about the project, tech stack, and goals. Creates PROJECT.md.',
              'Run /gsd:new-milestone — Define the first milestone (e.g., "MVP"). Creates milestone section in PROJECT.md.',
              'Run /gsd:plan-phase — Creates a detailed PLAN.md for Phase 1 with implementation tasks and verification criteria.',
              'Review the plan, request adjustments if needed, then approve.',
            ],
          },
          {
            type: 'code',
            language: 'bash',
            content: `# Typical GSD project startup
/gsd:new-project     # Gather project context → PROJECT.md
/gsd:new-milestone   # Define Milestone 1 (e.g., "v1 MVP")
/gsd:plan-phase      # Create PLAN.md for Phase 1`,
          },
          {
            type: 'callout',
            calloutVariant: 'info',
            content: 'PLAN.md is the contract for the phase. It lists every task, the files to create/modify, and the acceptance criteria. /gsd:execute-phase reads this file to know what to build.',
          },
        ],
      },
      {
        id: 'lesson-3-3',
        title: 'Executing & Verifying Work',
        description: 'Run phases, validate results, and manage the milestone lifecycle.',
        estimatedMinutes: 12,
        blocks: [
          {
            type: 'text',
            content: 'After planning comes execution. GSD\'s execute, verify, and audit commands ensure quality at each step — from individual phases to full milestone completion.',
          },
          {
            type: 'table',
            content: 'Execution & verification commands',
            headers: ['Command', 'Purpose'],
            rows: [
              ['/gsd:execute-phase', 'Run all tasks in the current PLAN.md using parallel sub-agents'],
              ['/gsd:verify-work', 'Interactive UAT — validate each requirement from the plan was built correctly'],
              ['/gsd:audit-milestone', 'Check if the entire milestone is complete before archiving'],
              ['/gsd:complete-milestone', 'Archive the milestone, prepare for the next one'],
              ['/gsd:progress', 'Show current milestone status, completed phases, and next action'],
            ],
          },
          {
            type: 'tip',
            content: 'Always run /gsd:verify-work after execution before marking a phase complete. GSD\'s verification is conversational — it will point out gaps and create follow-up todos.',
          },
        ],
      },
      {
        id: 'lesson-3-4',
        title: 'Advanced GSD Workflows',
        description: 'Debug complex issues, map large codebases, and handle urgent work mid-phase.',
        estimatedMinutes: 10,
        blocks: [
          {
            type: 'text',
            content: 'GSD has specialized commands for common real-world scenarios: debugging across context resets, mapping unfamiliar codebases, and slipping urgent work between planned phases.',
          },
          {
            type: 'table',
            content: 'Advanced GSD commands',
            headers: ['Command', 'When to use'],
            rows: [
              ['/gsd:debug', 'Persistent debugging that survives context resets'],
              ['/gsd:map-codebase', 'Parallel analysis of a large, unfamiliar codebase'],
              ['/gsd:quick', 'Execute a small task with GSD guarantees but skip planning agents'],
              ['/gsd:insert-phase', 'Insert an urgent phase (e.g., 72.1) between existing phases'],
              ['/gsd:pause-work', 'Create a context handoff document when switching sessions'],
              ['/gsd:resume-work', 'Restore full context when returning to paused work'],
            ],
          },
          {
            type: 'callout',
            calloutVariant: 'success',
            content: '/gsd:debug is particularly valuable for hard bugs. It writes its state (hypotheses, tests run, findings) to .planning/debug/ — so you can pick up exactly where you left off after a context reset.',
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
        estimatedMinutes: 10,
        blocks: [
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
        estimatedMinutes: 12,
        blocks: [
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
        estimatedMinutes: 15,
        blocks: [
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
        estimatedMinutes: 10,
        blocks: [
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
        estimatedMinutes: 10,
        blocks: [
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
        estimatedMinutes: 12,
        blocks: [
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
        estimatedMinutes: 12,
        blocks: [
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
        estimatedMinutes: 8,
        blocks: [
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
        estimatedMinutes: 15,
        blocks: [
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
        estimatedMinutes: 15,
        blocks: [
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
        estimatedMinutes: 20,
        blocks: [
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
        estimatedMinutes: 15,
        blocks: [
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
        estimatedMinutes: 12,
        blocks: [
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
        estimatedMinutes: 12,
        blocks: [
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
        estimatedMinutes: 15,
        blocks: [
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
        description: 'Structure the stock data as context, craft the swing trading prompt, and format the Telegram message.',
        estimatedMinutes: 15,
        blocks: [
          {
            type: 'text',
            content: 'With clean, structured signal data for each stock, we now ask Claude to act as a swing trading analyst. The key is giving Claude a clear strategy definition, the data in a scannable format, and a structured output requirement so n8n can format the Telegram message reliably.',
          },
          {
            type: 'code',
            language: 'javascript',
            content: `// n8n Code node — build the Claude prompt from all stock signals
const stocks = $input.all().map(i => i.json);

const stockTable = stocks.map(s =>
  \`\${s.ticker}: price=\$\${s.currentPrice} RSI=\${s.rsi} MACD=\${s.macdLine}(\${s.macdCrossingUp ? 'crossing up' : 'flat'}) vs50SMA=\${s.aboveSMA50 ? 'above' : 'below'} volRatio=\${s.volumeRatio}x 30d%=\${s.priceChange30d}%\`
).join('\\n');

const prompt = \`You are a swing trading analyst. The investor's strategy is to hold positions for 1–2 months, targeting 10–25% gains by riding medium-term momentum.

Today's screening data for \${stocks.length} stocks:
\${stockTable}

Scoring criteria for a strong swing trade candidate:
- RSI between 40–65 (momentum building, not overbought)
- MACD crossing up or recently positive (momentum turning)
- Price above 50-day SMA (medium-term uptrend intact)
- Volume ratio > 1.2 on recent up days (institutional interest)
- Not already up 20%+ in 30 days (room to run)

Task:
1. Score each stock against these criteria (0–5 points)
2. Select the TOP 3 buy candidates
3. For each pick, give: ticker, score, one-sentence reason, and one key risk to watch

Respond in this exact JSON format:
{
  "date": "YYYY-MM-DD",
  "picks": [
    {
      "ticker": "AAPL",
      "score": 4,
      "reason": "RSI recovering from 48 with MACD crossover and volume surge — momentum building.",
      "risk": "Watch for broad market selloff given high beta."
    }
  ],
  "summary": "One sentence market context for today."
}\`;

return [{ json: { prompt, stockCount: stocks.length } }];`,
          },
          {
            type: 'steps',
            content: 'Wire Claude API call and format Telegram message',
            steps: [
              'Add an HTTP Request node: POST https://api.anthropic.com/v1/messages',
              'Headers: x-api-key (from credential), anthropic-version: 2023-06-01',
              'Body: model claude-haiku-4-5-20251001, max_tokens: 1024, messages with the prompt',
              'Add a Code node to parse Claude\'s JSON response and format a Telegram message',
              'Add the Telegram node to send the formatted message',
            ],
          },
          {
            type: 'code',
            language: 'javascript',
            content: `// n8n Code node — parse Claude response and format Telegram HTML message
const raw = $input.first().json.content[0].text;

let data;
try {
  // Claude sometimes wraps JSON in markdown fences — strip them
  data = JSON.parse(raw.replace(/^\`\`\`json\\n?|\\n?\`\`\`$/g, '').trim());
} catch (e) {
  return [{ json: { message: '❌ Could not parse Claude response. Try again.' } }];
}

const medals = ['🥇','🥈','🥉'];
const lines = [
  \`📈 <b>Swing Trade Picks — \${data.date}</b>\\n\`,
  \`<i>\${data.summary}</i>\\n\`,
];

data.picks.forEach((p, i) => {
  lines.push(
    \`\${medals[i]} <b>\${p.ticker}</b> (score: \${p.score}/5)\`,
    \`💡 \${p.reason}\`,
    \`⚠️ Risk: \${p.risk}\\n\`
  );
});

lines.push('\\n<i>Not financial advice. Do your own research.</i>');

return [{ json: { message: lines.join('\\n') } }];`,
          },
          {
            type: 'code',
            language: 'json',
            content: `// Example Telegram message output
📈 Daily Swing Trade Picks — 2026-03-08

Market consolidating after last week's rally — momentum
stocks showing early rotation into tech.

🥇 NVDA (score: 5/5)
💡 RSI at 52 with MACD crossover and 1.8x average volume —
   classic breakout setup above 50-day SMA.
⚠️ Risk: Earnings in 3 weeks could introduce volatility.

🥈 MSFT (score: 4/5)
💡 Recovering from oversold RSI-44, now turning up with
   steady institutional volume.
⚠️ Risk: Watch broad tech rotation risk.

🥉 JPM (score: 4/5)
💡 Financials showing strength; above 50-SMA with positive
   MACD and rate-driven tailwind.
⚠️ Risk: Fed meeting this month could shift sentiment.

Not financial advice. Do your own research.`,
          },
          {
            type: 'checklist',
            content: 'Full workflow checklist',
            items: [
              { text: 'Schedule Trigger: 0 8 * * 1-5 (8 AM weekdays)', description: 'Fires before US market open.' },
              { text: 'Telegram Trigger: listen for /picks command', description: 'Allows on-demand runs any time.' },
              { text: 'Anthropic API key stored in n8n Credential store', description: 'Never hardcoded.' },
              { text: 'Error branch → Telegram alert if Claude call fails', description: 'You\'ll know if the bot silently broke.' },
              { text: 'max_tokens set to 1024', description: 'Three picks with reasoning fit comfortably in 1024 tokens.' },
              { text: 'Disclaimer line in every message', description: 'This is educational output, not financial advice.' },
            ],
          },
          {
            type: 'callout',
            calloutVariant: 'success',
            content: 'Your stock picks bot is ready to deploy. Every weekday morning — or whenever you send /picks — it fetches live price data, computes swing trading signals for 20 stocks, and delivers Claude\'s top 3 ranked candidates with reasoning directly to your Telegram. Extend the watchlist, tune the strategy criteria, or swap Telegram for WhatsApp — the architecture is the same.',
          },
        ],
      },
    ],
  },
];

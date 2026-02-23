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
            content: 'Claude Code has 29 built-in slash commands that control everything from context management to model selection. Mastering these is key to an efficient workflow.',
          },
          {
            type: 'table',
            content: 'Core slash commands',
            headers: ['Command', 'Purpose'],
            rows: [
              ['/help', 'Show available commands'],
              ['/clear', 'Clear conversation history'],
              ['/compact', 'Summarize conversation to reduce tokens'],
              ['/cost', 'Show current session token usage and cost'],
              ['/model', 'Switch the active Claude model'],
              ['/status', 'Show current model, permissions, and config'],
              ['/memory', 'Edit Claude\'s memory (CLAUDE.md)'],
              ['/init', 'Initialize a CLAUDE.md in the current project'],
              ['/review', 'Request a code review of recent changes'],
              ['/exit or /quit', 'Exit the Claude Code session'],
            ],
          },
          {
            type: 'callout',
            calloutVariant: 'tip',
            content: 'Use /cost frequently during long sessions to track token usage. Pair with /compact when costs accumulate — it generates a summary that preserves context at a fraction of the token cost.',
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
    title: 'Skills & Hooks',
    description: 'Build custom skills and hook into Claude\'s lifecycle events to automate your workflow.',
    icon: 'Zap',
    color: 'purple',
    quizId: 'quiz-module-2',
    lessons: [
      {
        id: 'lesson-2-1',
        title: 'Understanding Claude Code Skills',
        description: 'Create reusable, slash-invocable prompts that automate your team\'s common tasks.',
        estimatedMinutes: 10,
        blocks: [
          {
            type: 'text',
            content: 'Skills are markdown files that become slash commands. They let you package common workflows — like creating commits, reviewing PRs, or running deployments — into reusable, shareable prompts.',
          },
          {
            type: 'steps',
            content: 'Creating a skill',
            steps: [
              'Create the skills directory: mkdir -p ~/.claude/skills (global) or .claude/skills (project)',
              'Create a markdown file: e.g., ~/.claude/skills/commit.md',
              'Write your skill prompt using markdown — it becomes the context for Claude',
              'Invoke it as a slash command: /commit',
            ],
          },
          {
            type: 'code',
            language: 'markdown',
            content: `# ~/.claude/skills/commit.md
Create a git commit for the current staged changes.

1. Run \`git diff --staged\` to see what's staged
2. Write a concise commit message following this format:
   - First line: imperative mood, max 72 chars (e.g., "Add user authentication")
   - Blank line
   - Body: explain WHY, not what (the diff shows what)
3. Include "Co-Authored-By: Claude" at the end
4. Run \`git commit -m "$(cat <<'EOF'...EOF)"\` to commit`,
          },
          {
            type: 'callout',
            calloutVariant: 'info',
            content: 'Project-level skills in .claude/skills/ override global skills with the same name. This lets you customize team-specific skills per-project.',
          },
        ],
      },
      {
        id: 'lesson-2-2',
        title: 'Hook Events & Types',
        description: 'Intercept and extend Claude\'s behavior with lifecycle hooks.',
        estimatedMinutes: 12,
        blocks: [
          {
            type: 'text',
            content: 'Hooks are shell commands or scripts that fire at specific points in Claude\'s execution lifecycle. They enable powerful automation: auto-formatting, cost tracking, notifications, security guards, and more.',
          },
          {
            type: 'table',
            content: 'Key hook events',
            headers: ['Event', 'Fires When', 'Can Block?'],
            rows: [
              ['PreToolUse', 'Before any tool call', 'Yes'],
              ['PostToolUse', 'After any tool call completes', 'No'],
              ['PreBashExec', 'Before bash command runs', 'Yes'],
              ['PostBashExec', 'After bash command completes', 'No'],
              ['PreRead', 'Before a file is read', 'Yes'],
              ['PostRead', 'After a file is read', 'No'],
              ['PreWrite', 'Before a file is written', 'Yes'],
              ['PostWrite', 'After a file is written', 'No'],
              ['Stop', 'When Claude finishes responding', 'No'],
              ['Notification', 'Claude-triggered notifications', 'No'],
              ['PreCompact', 'Before conversation compaction', 'Yes'],
              ['PostCompact', 'After compaction completes', 'No'],
              ['UserPromptSubmit', 'When user submits a prompt', 'Yes'],
              ['AssistantResponse', 'When Claude generates a response', 'No'],
              ['SubagentStop', 'When a sub-agent finishes', 'No'],
            ],
          },
          {
            type: 'code',
            language: 'json',
            content: `// ~/.claude/settings.json
{
  "hooks": {
    "Stop": [
      {
        "type": "command",
        "command": "osascript -e 'display notification \"Claude finished\" with title \"Claude Code\"'"
      }
    ],
    "PreBashExec": [
      {
        "type": "command",
        "command": "echo 'Executing: $CLAUDE_TOOL_INPUT' >> ~/.claude/audit.log"
      }
    ]
  }
}`,
          },
        ],
      },
      {
        id: 'lesson-2-3',
        title: 'Building Custom Hooks',
        description: 'Write practical hooks for notifications, formatting, and security.',
        estimatedMinutes: 15,
        blocks: [
          {
            type: 'text',
            content: 'Hooks receive context about the operation via environment variables and stdin. They can return JSON to control behavior — blocking operations, modifying inputs, or providing feedback to Claude.',
          },
          {
            type: 'code',
            language: 'bash',
            content: `#!/bin/bash
# ~/.claude/hooks/guard-production.sh
# PreBashExec hook — blocks commands that could affect production

INPUT=$(cat)  # Reads the bash command being executed

# Block any command targeting production
if echo "$INPUT" | grep -qE "(production|prod-db|api.prod)"; then
  echo '{"action": "block", "reason": "Production operations require manual approval. Run this in a separate terminal after review."}'
  exit 0
fi

# Allow everything else
echo '{"action": "continue"}'`,
          },
          {
            type: 'code',
            language: 'json',
            content: `// Configure the hook in ~/.claude/settings.json
{
  "hooks": {
    "PreBashExec": [
      {
        "type": "command",
        "command": "~/.claude/hooks/guard-production.sh"
      }
    ]
  }
}`,
          },
          {
            type: 'tip',
            content: 'Hooks that return {"action": "block", "reason": "..."} prevent the operation and send the reason to Claude, which can then try an alternative approach.',
          },
        ],
      },
      {
        id: 'lesson-2-4',
        title: 'Advanced Agent Patterns',
        description: 'Orchestrate multiple Claude agents for parallel, high-throughput workflows.',
        estimatedMinutes: 12,
        blocks: [
          {
            type: 'text',
            content: 'Claude Code can spawn sub-agents — separate Claude instances that work on isolated tasks in parallel. This dramatically speeds up complex tasks like running multiple test suites, analyzing multiple files, or implementing independent features simultaneously.',
          },
          {
            type: 'callout',
            calloutVariant: 'info',
            content: 'The Task tool (available to Claude Code agents) spawns sub-agents. Sub-agents have their own context window, preventing context pollution between independent tasks.',
          },
          {
            type: 'code',
            language: 'markdown',
            content: `# Example: parallel agent orchestration in a skill

Run these three tasks in parallel using the Task tool:

**Agent 1**: Run the full test suite and capture results
**Agent 2**: Run \`npm audit\` and identify high-severity vulnerabilities
**Agent 3**: Check for TypeScript errors with \`tsc --noEmit\`

Wait for all three to complete, then summarize:
- Tests: X passing, Y failing
- Security: N vulnerabilities (list high-severity ones)
- Types: N errors (list the first 5)`,
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

  // ─────────────────────────────────────────────────────────────────────────
  // MODULE 6: Writing Skills & Commands — Best Practices
  // ─────────────────────────────────────────────────────────────────────────
  {
    id: 'module-6',
    title: 'Writing Skills & Commands',
    description: 'Learn when and how to write reusable skills, custom slash commands, and hooks — with real-world best practices.',
    icon: 'Wand2',
    color: 'violet',
    quizId: 'quiz-module-6',
    lessons: [
      // ── Lesson 6-1: Skills vs Commands — When to use each ──────────────
      {
        id: 'lesson-6-1',
        title: 'Skills vs Slash Commands — When to Use Each',
        description: 'Understand the difference between skills, slash commands, and hooks, and know exactly when each one is the right tool.',
        estimatedMinutes: 12,
        blocks: [
          {
            type: 'text',
            content: 'Claude Code gives you three main extension points: **built-in slash commands**, **custom skills**, and **hooks**. They look similar but serve different purposes. Choosing the right one saves you time and keeps your workflow clean.',
          },
          {
            type: 'heading',
            level: 2,
            content: 'The three extension points',
          },
          {
            type: 'table',
            headers: ['Extension', 'What it is', 'When to use it'],
            rows: [
              ['Slash command', 'Built-in Claude Code command (`/help`, `/commit`, `/clear`)', 'Built-in workflow actions — cannot be added, only used'],
              ['Skill (custom command)', 'A Markdown file in `.claude/commands/` you invoke with `/name`', 'Reusable prompts or workflows specific to **your project or team**'],
              ['Hook', 'A shell script that runs automatically on Claude Code events', 'Automations that run **without user input** (e.g. lint on save, log every tool call)'],
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
                text: 'You repeat the same prompt or workflow more than twice',
                description: 'If you find yourself typing the same instructions every session, that\'s a skill waiting to be written.',
              },
              {
                text: 'The task needs project-specific context',
                description: 'Skills can reference your project\'s conventions, file structure, and coding style by describing them in the skill body.',
              },
              {
                text: 'Other team members would benefit from the same workflow',
                description: 'Skills in `.claude/commands/` are committed to Git — the whole team shares them automatically.',
              },
              {
                text: 'The workflow involves multiple steps or conditions',
                description: 'Skills excel at multi-step workflows: "read X, analyse Y, then write Z following our conventions".',
              },
            ],
          },
          {
            type: 'heading',
            level: 2,
            content: 'When NOT to write a skill',
          },
          {
            type: 'callout',
            calloutVariant: 'warning',
            content: 'Don\'t write a skill for a one-off task. Skills are for **repeatable workflows**. If you only need something once, just type the prompt directly. Over-engineering kills productivity.',
          },
          {
            type: 'table',
            headers: ['Situation', 'Right tool', 'Why'],
            rows: [
              ['Run once, never again', 'Direct prompt', 'No skill file needed — just describe the task'],
              ['Trigger automatically without input', 'Hook', 'Hooks fire on events; skills need `/invoke`'],
              ['Enforce a rule on every file save', 'PreToolUse hook', 'Hook intercepts the action before it happens'],
              ['Standard Claude Code action', 'Built-in `/command`', '`/commit`, `/review`, `/help` are already built in'],
            ],
          },
          {
            type: 'callout',
            calloutVariant: 'tip',
            content: '**Rule of three**: wait until you\'ve typed the same prompt three times before writing a skill. On the third time, write the skill instead of the prompt.',
          },
        ],
      },

      // ── Lesson 6-2: Writing Your First Skill ────────────────────────────
      {
        id: 'lesson-6-2',
        title: 'Writing Your First Skill',
        description: 'Learn the skill file format, best-practice structure, and how to write skills that Claude actually follows reliably.',
        estimatedMinutes: 20,
        blocks: [
          {
            type: 'text',
            content: 'A skill is a plain Markdown file placed in `.claude/commands/` (project-level) or `~/.claude/commands/` (global). The filename becomes the slash command. A file called `write-test.md` becomes `/write-test`.',
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
                label: 'Minimal skill',
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

Keep explanations concise. Use bullet points. Include a short
code example if it helps illustrate a concept.`,
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
            content: 'When you write `$ARGUMENTS` in your skill, Claude substitutes whatever the user typed after the command name. For example, `/explain useAuth hook` passes `"useAuth hook"` as `$ARGUMENTS`. This makes skills flexible — they work on whatever context you point them at.',
          },
          {
            type: 'heading',
            level: 2,
            content: 'Do vs Don\'t — writing skill prompts',
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
            content: 'Best practices for reliable skills',
          },
          {
            type: 'checklist',
            content: 'Skill writing best practices',
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
                text: 'Keep skills focused — one job per file',
                description: 'A skill that does one thing well is more reliable and easier to maintain than a Swiss army knife skill.',
              },
            ],
          },
          {
            type: 'heading',
            level: 2,
            content: 'Project vs global skills',
          },
          {
            type: 'table',
            headers: ['Location', 'Path', 'Scope', 'Use case'],
            rows: [
              ['Project skill', '`.claude/commands/name.md`', 'Current project only (committed to Git)', 'Project-specific conventions, workflows, stack'],
              ['Global skill', '`~/.claude/commands/name.md`', 'All projects on your machine', 'Personal workflows, universal helpers'],
            ],
          },
          {
            type: 'exercise',
            content: 'Write a skill for your project',
            exercise: {
              prompt: 'Create a skill file called `add-jsdoc.md` in `.claude/commands/`. It should instruct Claude to add JSDoc comments to a function specified by `$ARGUMENTS`. Include: parameter descriptions, return type, and a one-line summary. Do not modify the function logic.',
              hints: [
                'The filename (without `.md`) becomes the command: `add-jsdoc.md` → `/add-jsdoc`',
                'Use `$ARGUMENTS` where you want the user\'s input to be substituted',
                'Start with a clear first sentence that states the single objective',
              ],
              solution: `# .claude/commands/add-jsdoc.md

---
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

      // ── Lesson 6-3: Writing Hooks — Automate Without Being Asked ────────
      {
        id: 'lesson-6-3',
        title: 'Writing Hooks — Automate Without Being Asked',
        description: 'Write hooks that enforce rules, log actions, and automate quality checks — all without manual intervention.',
        estimatedMinutes: 18,
        blocks: [
          {
            type: 'text',
            content: 'Hooks are shell scripts that Claude Code runs automatically at specific points in its workflow. Unlike skills (which you invoke), hooks fire on their own whenever a matching event occurs. They\'re ideal for enforcing team standards and automating quality gates.',
          },
          {
            type: 'heading',
            level: 2,
            content: 'Hook lifecycle events',
          },
          {
            type: 'table',
            headers: ['Event', 'When it fires', 'Common use cases'],
            rows: [
              ['`PreToolUse`', 'Before Claude uses any tool', 'Block dangerous commands, require confirmation, log all tool calls'],
              ['`PostToolUse`', 'After a tool completes', 'Run lint/format after a file write, log results'],
              ['`Notification`', 'When Claude sends a notification', 'Desktop alerts, Slack pings on long task completion'],
              ['`Stop`', 'When Claude stops (task complete)', 'Run test suite, open browser, trigger CI'],
              ['`SubagentStop`', 'When a sub-agent completes', 'Aggregate results from parallel agents'],
            ],
          },
          {
            type: 'heading',
            level: 2,
            content: 'Hook configuration — settings.json',
          },
          {
            type: 'text',
            content: 'Hooks are configured in `.claude/settings.json` (project-level) or `~/.claude/settings.json` (global). Each hook specifies the event, an optional matcher, and the command to run.',
          },
          {
            type: 'tabs',
            content: '',
            tabs: [
              {
                label: 'Run lint on every file write',
                language: 'json',
                content: `{
  "hooks": {
    "PostToolUse": [
      {
        "matcher": "Write",
        "hooks": [
          {
            "type": "command",
            "command": "npx eslint --fix $CLAUDE_TOOL_RESULT_FILE_PATH 2>&1 || true"
          }
        ]
      }
    ]
  }
}`,
              },
              {
                label: 'Block rm -rf in Bash',
                language: 'json',
                content: `{
  "hooks": {
    "PreToolUse": [
      {
        "matcher": "Bash",
        "hooks": [
          {
            "type": "command",
            "command": "echo $CLAUDE_TOOL_INPUT | grep -q 'rm -rf' && echo 'BLOCK: rm -rf is not allowed' && exit 2 || exit 0"
          }
        ]
      }
    ]
  }
}`,
              },
              {
                label: 'Desktop notification on completion',
                language: 'json',
                content: `{
  "hooks": {
    "Stop": [
      {
        "hooks": [
          {
            "type": "command",
            "command": "osascript -e 'display notification \\"Claude Code finished\\" with title \\"Claude Code\\"'"
          }
        ]
      }
    ]
  }
}`,
              },
              {
                label: 'Run tests after every write',
                language: 'json',
                content: `{
  "hooks": {
    "PostToolUse": [
      {
        "matcher": "Write",
        "hooks": [
          {
            "type": "command",
            "command": "cd $CLAUDE_PROJECT_ROOT && npm test --passWithNoTests 2>&1 | tail -5"
          }
        ]
      }
    ]
  }
}`,
              },
            ],
          },
          {
            type: 'heading',
            level: 2,
            content: 'Exit codes control Claude\'s behaviour',
          },
          {
            type: 'table',
            headers: ['Exit code', 'Effect on Claude', 'Use case'],
            rows: [
              ['`0`', 'Continue normally', 'Hook ran, everything fine'],
              ['`2`', '**Block** the tool call — Claude will not proceed', 'Prevent dangerous actions (rm -rf, force push)'],
              ['Non-zero (not 2)', 'Show the output to Claude as context', 'Lint errors, test failures — Claude reads and fixes them'],
            ],
          },
          {
            type: 'callout',
            calloutVariant: 'tip',
            content: '**Exit code 2 is your safety net.** Use it to hard-block actions your team should never do. For softer enforcement (show lint errors and let Claude fix them), use a non-zero exit code other than 2.',
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
              ['`$CLAUDE_TOOL_INPUT`', 'PreToolUse', 'Full JSON input to the tool'],
              ['`$CLAUDE_TOOL_RESULT`', 'PostToolUse', 'Tool output / result'],
              ['`$CLAUDE_TOOL_RESULT_FILE_PATH`', 'PostToolUse (Write)', 'Path of the file just written'],
              ['`$CLAUDE_PROJECT_ROOT`', 'All', 'Absolute path to the project root'],
            ],
          },
          {
            type: 'exercise',
            content: 'Write a hook that logs every Bash command Claude runs',
            exercise: {
              prompt: 'Add a `PreToolUse` hook to `.claude/settings.json` that appends every Bash command Claude runs to a file called `.claude/bash-history.log` with a timestamp. The hook should NOT block Claude — just log and continue.',
              hints: [
                'Use exit code `0` to let Claude continue after logging',
                'The command string is in `$CLAUDE_TOOL_INPUT` as JSON — use `jq` to extract the command field',
                '`date -u +"%Y-%m-%dT%H:%M:%SZ"` gives an ISO timestamp',
              ],
              solution: `// .claude/settings.json
{
  "hooks": {
    "PreToolUse": [
      {
        "matcher": "Bash",
        "hooks": [
          {
            "type": "command",
            "command": "echo \\"$(date -u +\\"%Y-%m-%dT%H:%M:%SZ\\") $(echo $CLAUDE_TOOL_INPUT | jq -r '.command // empty')\\" >> .claude/bash-history.log; exit 0"
          }
        ]
      }
    ]
  }
}`,
              solutionLanguage: 'json',
            },
          },
          {
            type: 'heading',
            level: 2,
            content: 'When to use hooks vs skills',
          },
          {
            type: 'comparison',
            content: '',
            do: {
              label: '✅ Use a hook for…',
              language: 'markdown',
              code: `# Automatic, event-driven automation

- Run ESLint every time Claude writes a .ts file
- Block force-push to main
- Send Slack message when a long task finishes
- Log all file changes for audit purposes
- Run type-check after every file modification

Key: these happen WITHOUT user input
and respond to Claude's OWN actions.`,
            },
            dont: {
              label: '✅ Use a skill for…',
              language: 'markdown',
              code: `# User-invoked, prompt-driven workflows

- /write-test — write tests for current file
- /security-review — audit the current diff
- /add-changelog — append to CHANGELOG.md
- /explain $ARGUMENTS — explain a function

Key: these run WHEN INVOKED by the user
via /command-name.`,
            },
          },
        ],
      },

      // ── Lesson 6-4: Workflow Patterns & Team Best Practices ─────────────
      {
        id: 'lesson-6-4',
        title: 'Workflow Patterns & Team Best Practices',
        description: 'Production-proven patterns for structuring your .claude directory, maintaining skills as a team, and avoiding common pitfalls.',
        estimatedMinutes: 15,
        blocks: [
          {
            type: 'text',
            content: 'Your `.claude/` directory is as important as your `package.json`. A well-structured `.claude/` makes onboarding instant, enforces team standards automatically, and captures hard-won institutional knowledge.',
          },
          {
            type: 'heading',
            level: 2,
            content: 'Recommended .claude/ structure',
          },
          {
            type: 'code',
            language: 'bash',
            content: `.claude/
├── CLAUDE.md              # Project context: stack, conventions, what NOT to do
├── settings.json          # Hooks configuration
├── commands/              # Project skills (committed to Git)
│   ├── write-test.md      # /write-test
│   ├── security-review.md # /security-review
│   ├── add-changelog.md   # /add-changelog
│   └── explain.md         # /explain $ARGUMENTS
└── bash-history.log       # Optional: hook audit log (add to .gitignore)`,
          },
          {
            type: 'heading',
            level: 2,
            content: 'Writing a great CLAUDE.md',
          },
          {
            type: 'text',
            content: '`CLAUDE.md` is loaded automatically every session. It\'s your project\'s instruction manual for Claude. Think of it as the onboarding doc you wish you had on day one — but written for an AI that will actually read every word.',
          },
          {
            type: 'tabs',
            content: '',
            tabs: [
              {
                label: 'CLAUDE.md template',
                language: 'markdown',
                content: `# Project Context

## Stack
- **Framework:** Next.js 14 (App Router)
- **Language:** TypeScript (strict mode)
- **Styling:** Tailwind CSS v4 — no inline styles
- **State:** Zustand with \`useShallow\` selectors
- **Database:** PostgreSQL via Prisma ORM

## Conventions
- Components go in \`src/components/\` — one component per file
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
                label: 'Minimal CLAUDE.md',
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
            content: 'The five golden rules',
          },
          {
            type: 'checklist',
            content: 'Golden rules for Claude Code workflows',
            items: [
              {
                text: 'Commit `.claude/commands/` to Git',
                description: 'Skills are team knowledge. Commit them so every developer gets the same `/commands` automatically when they clone the repo.',
              },
              {
                text: 'Keep CLAUDE.md under 200 lines',
                description: 'Claude reads CLAUDE.md every session. Long files dilute the important parts. Be ruthless — if it\'s not critical context, leave it out.',
              },
              {
                text: 'Name skills after the action, not the tool',
                description: '`/write-test` is better than `/jest`. `/add-changelog` is better than `/markdown`. The action-first name is self-documenting.',
              },
              {
                text: 'Test your hooks with exit code 0 first',
                description: 'Start hooks in "log only" mode (exit 0) before enabling blocking behaviour (exit 2). This lets you verify they fire correctly without disrupting your workflow.',
              },
              {
                text: 'Review skills quarterly',
                description: 'Skills go stale. Add a calendar reminder to review `.claude/commands/` every quarter. Delete skills you no longer use — dead code applies to skills too.',
              },
            ],
          },
          {
            type: 'heading',
            level: 2,
            content: 'Anti-patterns to avoid',
          },
          {
            type: 'table',
            headers: ['Anti-pattern', 'Problem', 'Fix'],
            rows: [
              ['Mega-skill that does 10 things', 'Unpredictable, hard to debug, low reliability', 'One skill = one job. Split into multiple focused skills.'],
              ['Vague skill prompt ("help me with X")', 'Claude interprets it differently each time', 'Be specific: list exactly what to check, what to produce, what to avoid.'],
              ['Hooks that always exit 2', 'Claude gets blocked constantly, frustrating UX', 'Only block truly dangerous actions. Use non-zero for soft failures.'],
              ['CLAUDE.md with your life story', 'Important context gets buried', 'Max 200 lines. Use headers. Put the most critical rules first.'],
              ['Skills with no constraints', 'Claude modifies unexpected files', 'Always specify what Claude should NOT touch.'],
            ],
          },
          {
            type: 'heading',
            level: 2,
            content: 'Starter kit — copy this for any new project',
          },
          {
            type: 'exercise',
            content: 'Set up .claude/ for a new project',
            exercise: {
              prompt: 'Bootstrap a `.claude/` directory for a TypeScript Node.js project. Create: (1) a `CLAUDE.md` with your stack and top 5 conventions, (2) a `/write-test` skill, (3) a PostToolUse hook that runs `tsc --noEmit` after every file write.',
              hints: [
                'For CLAUDE.md, the most useful sections are: Stack, Conventions, and "What NOT to do"',
                'Your `/write-test` skill should reference your test framework (Jest, Vitest, etc.) and your test file naming convention',
                'The `tsc --noEmit` hook should match on the `Write` tool and use `|| true` so type errors don\'t hard-block Claude — they should be shown as context',
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
- Co-locate test file: same directory as source
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
            content: 'A well-configured `.claude/` directory is a force multiplier. It turns a general-purpose AI into a specialist that knows your codebase, enforces your standards, and works exactly how your team works.',
          },
        ],
      },
    ],
  },
];

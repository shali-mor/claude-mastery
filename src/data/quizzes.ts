import type { Quiz } from '@/types/quiz';

export const quizzes: Quiz[] = [
  {
    id: 'quiz-module-1',
    moduleId: 'module-1',
    title: 'Claude Code Basics Quiz',
    questions: [
      {
        id: 'q1-1',
        type: 'multiple-choice',
        questionText: 'Which slash command shows the current session token usage and cost?',
        options: [
          { id: 'a', text: '/cost', isCorrect: true, explanation: 'Correct! /cost shows the token count and estimated USD cost for the current session.' },
          { id: 'b', text: '/status', isCorrect: false, explanation: '/status shows the current model and configuration, not token costs.' },
          { id: 'c', text: '/config', isCorrect: false, explanation: '/config opens configuration settings, not cost information.' },
          { id: 'd', text: '/memory', isCorrect: false, explanation: '/memory manages Claude\'s memory files, not cost tracking.' },
        ],
        globalExplanation: 'Use /cost during any Claude Code session to see how many tokens you\'ve used and the approximate dollar cost. This helps you decide when to /compact or switch models.',
      },
      {
        id: 'q1-2',
        type: 'multiple-choice',
        questionText: 'What does the --print (-p) CLI flag do?',
        options: [
          { id: 'a', text: 'Prints the Claude Code version', isCorrect: false, explanation: '--version is used for version info, not --print.' },
          { id: 'b', text: 'Runs a single non-interactive prompt and exits', isCorrect: true, explanation: 'Correct! --print (or -p) passes a prompt directly and Claude responds then exits — perfect for scripting.' },
          { id: 'c', text: 'Prints the current configuration', isCorrect: false, explanation: '/config or /status handles configuration display.' },
          { id: 'd', text: 'Enables verbose logging', isCorrect: false, explanation: '--verbose enables verbose logging, not --print.' },
        ],
        globalExplanation: 'The --print flag enables non-interactive "piped" mode: `claude -p "summarize this file" < README.md`. Great for shell scripting and CI pipelines.',
      },
      {
        id: 'q1-3',
        type: 'multiple-choice',
        questionText: 'Which command initializes a CLAUDE.md file in the current project?',
        options: [
          { id: 'a', text: '/memory', isCorrect: false, explanation: '/memory manages Claude\'s long-term memory, not project initialization.' },
          { id: 'b', text: '/config', isCorrect: false, explanation: '/config manages Claude Code settings, not CLAUDE.md.' },
          { id: 'c', text: '/init', isCorrect: true, explanation: 'Correct! /init analyzes your project and creates a CLAUDE.md with project-specific context and instructions.' },
          { id: 'd', text: '/setup', isCorrect: false, explanation: 'There is no /setup command in Claude Code.' },
        ],
        globalExplanation: 'Running /init in a new project creates a CLAUDE.md file that persists instructions across sessions. Claude reads this automatically at startup.',
      },
      {
        id: 'q1-4',
        type: 'true-false',
        questionText: 'The /compact command permanently deletes your conversation history.',
        options: [
          { id: 'a', text: 'True', isCorrect: false, explanation: '/compact creates a summary of the conversation, it does not permanently delete history. The full history is replaced with a compressed summary.' },
          { id: 'b', text: 'False', isCorrect: true, explanation: 'Correct! /compact replaces conversation history with an AI-generated summary, preserving the key context while reducing token usage.' },
        ],
        globalExplanation: '/compact is a lossless-ish compression — it summarizes the conversation to reduce token count. Some detail may be lost, but the summary captures the important context.',
      },
      {
        id: 'q1-5',
        type: 'multiple-choice',
        questionText: 'Which permission mode allows all operations without any confirmation prompts?',
        options: [
          { id: 'a', text: 'default', isCorrect: false, explanation: 'default mode prompts for permission on potentially dangerous operations.' },
          { id: 'b', text: 'acceptEdits', isCorrect: false, explanation: 'acceptEdits allows file edits without prompts, but still prompts for other dangerous operations.' },
          { id: 'c', text: 'bypassPermissions', isCorrect: true, explanation: 'Correct! bypassPermissions (via --dangerously-skip-permissions) skips ALL permission checks. Use only in trusted automated environments.' },
          { id: 'd', text: 'autoApprove', isCorrect: false, explanation: 'autoApprove is not a valid Claude Code permission mode.' },
        ],
        globalExplanation: 'The three permission modes are: default (safest), acceptEdits (allows file changes), and bypassPermissions (no restrictions). Always use the most restrictive mode for your use case.',
      },
      {
        id: 'q1-6',
        type: 'multiple-choice',
        questionText: 'What keyboard shortcut creates a newline in Claude Code without submitting the message?',
        options: [
          { id: 'a', text: 'Enter', isCorrect: false, explanation: 'Enter submits the message in Claude Code.' },
          { id: 'b', text: 'Ctrl+Enter', isCorrect: false, explanation: 'Ctrl+Enter is not the standard newline shortcut in Claude Code.' },
          { id: 'c', text: 'Shift+Enter', isCorrect: true, explanation: 'Correct! Shift+Enter inserts a newline without submitting, allowing you to write multi-line messages.' },
          { id: 'd', text: 'Alt+Enter', isCorrect: false, explanation: 'Alt+Enter is not a shortcut in Claude Code.' },
        ],
        globalExplanation: 'Shift+Enter adds a newline in the input. This is essential for writing multi-line code snippets or structured prompts before submitting.',
      },
    ],
  },
  {
    id: 'quiz-module-2',
    moduleId: 'module-2',
    title: 'Skills & Hooks Quiz',
    questions: [
      {
        id: 'q2-1',
        type: 'multiple-choice',
        questionText: 'Where are Claude Code skills defined?',
        options: [
          { id: 'a', text: 'In CLAUDE.md', isCorrect: false, explanation: 'CLAUDE.md contains project context and instructions, not skill definitions.' },
          { id: 'b', text: 'In ~/.claude/skills/ directory', isCorrect: true, explanation: 'Correct! Skills are markdown files in ~/.claude/skills/ (or project-level .claude/skills/). The filename becomes the skill name.' },
          { id: 'c', text: 'In package.json scripts', isCorrect: false, explanation: 'package.json scripts are npm scripts, not Claude Code skills.' },
          { id: 'd', text: 'In .env files', isCorrect: false, explanation: '.env files store environment variables, not skill definitions.' },
        ],
        globalExplanation: 'Skills are markdown files in ~/.claude/skills/ (global) or .claude/skills/ (project). A skill named "commit.md" becomes invocable as /commit.',
      },
      {
        id: 'q2-2',
        type: 'multiple-choice',
        questionText: 'Which hook event fires BEFORE a tool is called?',
        options: [
          { id: 'a', text: 'PostToolUse', isCorrect: false, explanation: 'PostToolUse fires after a tool completes.' },
          { id: 'b', text: 'PreToolUse', isCorrect: true, explanation: 'Correct! PreToolUse fires before Claude executes any tool call, allowing you to intercept, modify, or block it.' },
          { id: 'c', text: 'ToolStart', isCorrect: false, explanation: 'ToolStart is not a valid hook event in Claude Code.' },
          { id: 'd', text: 'BeforeExec', isCorrect: false, explanation: 'BeforeExec is not a valid hook event name.' },
        ],
        globalExplanation: 'PreToolUse is one of the most powerful hooks — it fires before any tool execution. You can use it to validate, log, or block tool calls based on your custom logic.',
      },
      {
        id: 'q2-3',
        type: 'multiple-choice',
        questionText: 'What does a hook return value of {"action": "block"} cause?',
        options: [
          { id: 'a', text: 'Pauses execution and waits for user input', isCorrect: false, explanation: 'Hooks do not have a built-in "pause and wait" return action.' },
          { id: 'b', text: 'Prevents the tool from executing and sends the reason to Claude', isCorrect: true, explanation: 'Correct! Returning {"action": "block", "reason": "..."} from a PreToolUse hook prevents the tool call and informs Claude why it was blocked.' },
          { id: 'c', text: 'Kills the entire Claude Code session', isCorrect: false, explanation: 'Block only stops the current tool call, not the session.' },
          { id: 'd', text: 'Logs the tool call and continues normally', isCorrect: false, explanation: 'That would be {"action": "continue"} or returning nothing.' },
        ],
        globalExplanation: 'PreToolUse hooks can return {"action": "block", "reason": "message"} to prevent dangerous operations. Claude receives the reason and can adjust its approach.',
      },
      {
        id: 'q2-4',
        type: 'multiple-choice',
        questionText: 'Which hook event is useful for sending desktop notifications when Claude finishes a task?',
        options: [
          { id: 'a', text: 'PostToolUse', isCorrect: false, explanation: 'PostToolUse fires after each individual tool call, not when Claude finishes the whole task.' },
          { id: 'b', text: 'Stop', isCorrect: true, explanation: 'Correct! The Stop event fires when Claude completes its response and stops, making it perfect for sending "Claude is done" notifications.' },
          { id: 'c', text: 'AssistantResponse', isCorrect: false, explanation: 'AssistantResponse fires when Claude generates a response, not necessarily when it fully stops.' },
          { id: 'd', text: 'Notification', isCorrect: false, explanation: 'Notification fires for Claude\'s own notification events, not for task completion.' },
        ],
        globalExplanation: 'The Stop hook fires once when Claude finishes. A common use: `echo "Claude finished" | osascript -e \'display notification "Done"\' ` to get a macOS notification.',
      },
      {
        id: 'q2-5',
        type: 'true-false',
        questionText: 'Skills can call other skills using the /skill-name syntax within their markdown body.',
        options: [
          { id: 'a', text: 'True', isCorrect: true, explanation: 'Correct! Skills can reference other skills using slash commands in their prompts. This enables composable skill chains.' },
          { id: 'b', text: 'False', isCorrect: false, explanation: 'Skills can indeed reference other skills, enabling powerful composition patterns.' },
        ],
        globalExplanation: 'Skills compose! A /deploy skill could call /test, /build, and /notify as sub-skills. This enables modular, reusable automation workflows.',
      },
    ],
  },
  {
    id: 'quiz-module-3',
    moduleId: 'module-3',
    title: 'GSD Plugin Quiz',
    questions: [
      {
        id: 'q3-1',
        type: 'multiple-choice',
        questionText: 'In GSD methodology, what is a "milestone"?',
        options: [
          { id: 'a', text: 'A single task or bug fix', isCorrect: false, explanation: 'That would be a todo or a quick task, not a milestone.' },
          { id: 'b', text: 'A git tag marking a release', isCorrect: false, explanation: 'While milestones often align with releases, in GSD they represent larger goals.' },
          { id: 'c', text: 'A major version or product goal broken into phases', isCorrect: true, explanation: 'Correct! A milestone is a significant product goal (like "v1.0 launch") that gets broken into 3–10 phases of work.' },
          { id: 'd', text: 'A Claude Code session', isCorrect: false, explanation: 'Sessions are individual conversations, not GSD milestones.' },
        ],
        globalExplanation: 'GSD organizes work as Milestones → Phases → Tasks. A milestone might be "Build MVP", broken into phases like "Setup", "Core Features", "Polish", etc.',
      },
      {
        id: 'q3-2',
        type: 'multiple-choice',
        questionText: 'Which GSD command creates a detailed PLAN.md for a phase?',
        options: [
          { id: 'a', text: '/gsd:new-phase', isCorrect: false, explanation: 'There is no /gsd:new-phase command. Use /gsd:add-phase to add a phase to the roadmap.' },
          { id: 'b', text: '/gsd:plan-phase', isCorrect: true, explanation: 'Correct! /gsd:plan-phase analyzes the codebase and creates a detailed PLAN.md with implementation steps.' },
          { id: 'c', text: '/gsd:design', isCorrect: false, explanation: '/gsd:design is not a GSD command.' },
          { id: 'd', text: '/gsd:blueprint', isCorrect: false, explanation: '/gsd:blueprint is not a GSD command.' },
        ],
        globalExplanation: '/gsd:plan-phase creates a PLAN.md with step-by-step implementation tasks, file paths to modify, and verification criteria. It\'s the foundation of each phase.',
      },
      {
        id: 'q3-3',
        type: 'multiple-choice',
        questionText: 'What does /gsd:execute-phase use to maximize throughput?',
        options: [
          { id: 'a', text: 'A single large context window', isCorrect: false, explanation: 'execute-phase does not rely on a single massive context.' },
          { id: 'b', text: 'Wave-based parallel sub-agents', isCorrect: true, explanation: 'Correct! /gsd:execute-phase spawns multiple parallel sub-agents in "waves", with each wave completing before the next starts. This dramatically speeds up execution.' },
          { id: 'c', text: 'Sequential file editing', isCorrect: false, explanation: 'Sequential editing is slower. GSD uses parallelism where tasks are independent.' },
          { id: 'd', text: 'Background bash processes', isCorrect: false, explanation: 'While bash is used, the key feature is Claude agent parallelism, not raw bash.' },
        ],
        globalExplanation: 'Wave-based parallelism is GSD\'s superpower. Independent tasks run in parallel sub-agents; dependent tasks wait for their wave to complete. This can cut execution time by 3–5x.',
      },
      {
        id: 'q3-4',
        type: 'multiple-choice',
        questionText: 'Which command should you use to validate built features through conversational UAT?',
        options: [
          { id: 'a', text: '/gsd:audit-milestone', isCorrect: false, explanation: '/gsd:audit-milestone checks if the milestone as a whole is complete, it\'s a broader review.' },
          { id: 'b', text: '/gsd:verify-work', isCorrect: true, explanation: 'Correct! /gsd:verify-work validates the specifically built features from the last phase through interactive acceptance testing.' },
          { id: 'c', text: '/gsd:test', isCorrect: false, explanation: '/gsd:test is not a GSD command.' },
          { id: 'd', text: '/gsd:check', isCorrect: false, explanation: '/gsd:check is not a GSD command.' },
        ],
        globalExplanation: '/gsd:verify-work runs a conversational UAT session, checking that each requirement from the PLAN.md was actually implemented correctly before marking the phase complete.',
      },
      {
        id: 'q3-5',
        type: 'true-false',
        questionText: '/gsd:debug maintains debugging context across conversation resets and context window limits.',
        options: [
          { id: 'a', text: 'True', isCorrect: true, explanation: 'Correct! /gsd:debug is specifically designed to persist debugging state in .planning/ files so you can resume debugging even after a context reset.' },
          { id: 'b', text: 'False', isCorrect: false, explanation: 'Persistence across context resets is one of GSD debug\'s key features.' },
        ],
        globalExplanation: 'GSD debug writes its state to .planning/debug/ — hypotheses tested, findings, reproduction steps. This survives context window limits and session restarts.',
      },
    ],
  },
  {
    id: 'quiz-module-4',
    moduleId: 'module-4',
    title: 'Cost Optimization Quiz',
    questions: [
      {
        id: 'q4-1',
        type: 'multiple-choice',
        questionText: 'How much cheaper are prompt cache reads compared to standard input token pricing?',
        options: [
          { id: 'a', text: '25% cheaper', isCorrect: false, explanation: '25% is actually the premium you PAY to write tokens to cache, not the read discount.' },
          { id: 'b', text: '50% cheaper', isCorrect: false, explanation: '50% is the Batch API discount, not the caching discount.' },
          { id: 'c', text: '90% cheaper', isCorrect: true, explanation: 'Correct! Cache reads cost just 10% of standard input pricing ($0.30/M vs $3.00/M for Sonnet). This is a 10x discount on cached tokens.' },
          { id: 'd', text: '75% cheaper', isCorrect: false, explanation: '75% cheaper would mean paying 25 cents on the dollar. The actual discount is 90% (paying 10 cents on the dollar).' },
        ],
        globalExplanation: 'Prompt caching: writes cost 125% of standard input (25% premium), reads cost 10% of standard input (90% discount). The break-even point is after just ~1.1 cache reads.',
      },
      {
        id: 'q4-2',
        type: 'multiple-choice',
        questionText: 'The Batch API (Message Batches) offers what discount over standard pricing?',
        options: [
          { id: 'a', text: '25% off', isCorrect: false, explanation: '25% off is not the Batch API discount. Think bigger.' },
          { id: 'b', text: '40% off', isCorrect: false, explanation: '40% off is not the Batch API discount.' },
          { id: 'c', text: '50% off', isCorrect: true, explanation: 'Correct! The Batch API processes requests asynchronously (up to 24h) at 50% of standard pricing for all token types.' },
          { id: 'd', text: '75% off', isCorrect: false, explanation: 'The Batch API is 50% off, not 75%. To get ~75% off, combine Batch with prompt caching.' },
        ],
        globalExplanation: 'Batch API = 50% off. Great for: running evals, data enrichment, bulk classification, report generation — anything that doesn\'t need real-time responses.',
      },
      {
        id: 'q4-3',
        type: 'multiple-choice',
        questionText: 'Which model is most cost-effective for high-volume, simple classification tasks?',
        options: [
          { id: 'a', text: 'Claude Opus 4.6', isCorrect: false, explanation: 'Opus is the most capable but most expensive. Using it for simple classification is wasteful.' },
          { id: 'b', text: 'Claude Sonnet 4.6', isCorrect: false, explanation: 'Sonnet is a good middle ground but Haiku is significantly cheaper for simple tasks.' },
          { id: 'c', text: 'Claude Haiku 4.5', isCorrect: true, explanation: 'Correct! Haiku 4.5 costs $0.80/M input and $4/M output — roughly 19x less than Opus. For classification it has more than enough capability.' },
          { id: 'd', text: 'Claude 3.5 Sonnet', isCorrect: false, explanation: 'Claude 3.5 Sonnet has similar pricing to Sonnet 4.6 and is not the cheapest option for simple tasks.' },
        ],
        globalExplanation: 'Model routing is key: use Haiku for simple/fast tasks, Sonnet for most production work, Opus only for complex reasoning where the quality difference matters.',
      },
      {
        id: 'q4-4',
        type: 'multiple-choice',
        questionText: 'What is the minimum number of cache reads needed to break even on a cache write?',
        options: [
          { id: 'a', text: '5 reads', isCorrect: false, explanation: 'You don\'t need 5 reads. The math: write costs 1.25x, reads cost 0.10x. So 1.25/0.10 = break-even at about 1.1 reads... but let\'s think about the net.' },
          { id: 'b', text: '2 reads', isCorrect: false, explanation: 'Not quite. The write premium over standard is 0.25x. Each read saves 0.90x. So 1 read gets you positive ROI after just the first re-use.' },
          { id: 'c', text: '1 read', isCorrect: true, explanation: 'Correct! Writing to cache costs 125% of standard. One cache read at 10% of standard makes the total 125+10=135% for 2 uses vs 200% standard. You\'re ahead after just 1 read.' },
          { id: 'd', text: '10 reads', isCorrect: false, explanation: '10 reads is way more than needed. You break even after just 1 cache read for any tokens that would have been sent again.' },
        ],
        globalExplanation: 'Cache economics: write at 1.25x, read at 0.10x. After 1 read: total cost = 1.25 + 0.10 = 1.35x for 2 passes. Without cache: 1.0 + 1.0 = 2.0x. Caching wins from the very first reuse.',
      },
      {
        id: 'q4-5',
        type: 'true-false',
        questionText: 'Streaming responses cost more tokens than non-streaming responses for the same content.',
        options: [
          { id: 'a', text: 'True', isCorrect: false, explanation: 'Streaming has no effect on token count or pricing. The same tokens are generated whether you stream or not.' },
          { id: 'b', text: 'False', isCorrect: true, explanation: 'Correct! Streaming is purely a delivery mechanism. The token count and cost are identical to non-streaming for the same prompt and response.' },
        ],
        globalExplanation: 'Streaming vs non-streaming makes no difference to pricing — it\'s just about when you receive the tokens. Use streaming for interactive UIs to improve perceived responsiveness.',
      },
    ],
  },
  {
    id: 'quiz-module-5',
    moduleId: 'module-5',
    title: 'Live API Mastery Quiz',
    questions: [
      {
        id: 'q5-1',
        type: 'multiple-choice',
        questionText: 'In the Anthropic Messages API, what is the correct top-level field for the system prompt?',
        options: [
          { id: 'a', text: 'messages[0].role = "system"', isCorrect: false, explanation: 'The Messages API does not use a "system" role in the messages array. System is a separate top-level field.' },
          { id: 'b', text: 'system (top-level field)', isCorrect: true, explanation: 'Correct! The system prompt is a separate top-level "system" field in the request body, not inside the messages array.' },
          { id: 'c', text: 'instructions', isCorrect: false, explanation: '"instructions" is not the correct field name in the Anthropic API.' },
          { id: 'd', text: 'system_prompt', isCorrect: false, explanation: 'The field is just "system", not "system_prompt".' },
        ],
        globalExplanation: 'Anthropic\'s API differs from OpenAI here: system is a top-level field, not a message role. This also enables prompt caching on the system field independently.',
      },
      {
        id: 'q5-2',
        type: 'multiple-choice',
        questionText: 'Which streaming event type contains the actual generated text tokens?',
        options: [
          { id: 'a', text: 'message_start', isCorrect: false, explanation: 'message_start fires at the beginning and contains metadata like usage, not text content.' },
          { id: 'b', text: 'content_block_start', isCorrect: false, explanation: 'content_block_start signals a new content block is beginning, but doesn\'t contain text delta.' },
          { id: 'c', text: 'content_block_delta', isCorrect: true, explanation: 'Correct! content_block_delta events contain the incremental text in delta.text — this is what you concatenate to build the full response.' },
          { id: 'd', text: 'message_delta', isCorrect: false, explanation: 'message_delta fires at the end and contains final usage stats, not the text content.' },
        ],
        globalExplanation: 'Streaming event flow: message_start → content_block_start → content_block_delta (repeats, contains text) → content_block_stop → message_delta (final usage) → message_stop.',
      },
      {
        id: 'q5-3',
        type: 'multiple-choice',
        questionText: 'What is the maximum value of the temperature parameter in the Claude API?',
        options: [
          { id: 'a', text: '1.0', isCorrect: true, explanation: 'Correct! Claude\'s temperature ranges from 0.0 (deterministic) to 1.0 (most creative/random). Default is typically around 1.0.' },
          { id: 'b', text: '2.0', isCorrect: false, explanation: 'Temperature max 2.0 is OpenAI\'s range. Claude\'s maximum is 1.0.' },
          { id: 'c', text: '10.0', isCorrect: false, explanation: 'Temperature 10 would be extremely random. Claude\'s max is 1.0.' },
          { id: 'd', text: '0.5', isCorrect: false, explanation: '0.5 is a reasonable default temperature, not the maximum.' },
        ],
        globalExplanation: 'Claude temperature: 0.0 = deterministic (same output for same input), 1.0 = maximum creativity. Use low temperature for factual/code tasks, higher for creative writing.',
      },
      {
        id: 'q5-4',
        type: 'multiple-choice',
        questionText: 'Which HTTP status code does the Anthropic API return for rate limit errors?',
        options: [
          { id: 'a', text: '400', isCorrect: false, explanation: '400 is a Bad Request error (invalid parameters), not a rate limit.' },
          { id: 'b', text: '401', isCorrect: false, explanation: '401 is an authentication error (invalid API key).' },
          { id: 'c', text: '429', isCorrect: true, explanation: 'Correct! 429 Too Many Requests is the standard HTTP status for rate limiting. Implement exponential backoff when you receive this.' },
          { id: 'd', text: '503', isCorrect: false, explanation: '503 is Service Unavailable (server-side error). Rate limits return 429.' },
        ],
        globalExplanation: 'On 429, implement exponential backoff: wait 1s, retry, if fail wait 2s, retry, then 4s, etc. The Anthropic SDK handles this automatically if you use the built-in retry logic.',
      },
      {
        id: 'q5-5',
        type: 'code-completion',
        questionText: 'In the Anthropic TypeScript SDK, what method creates a non-streaming message?',
        codeSnippet: `const client = new Anthropic({ apiKey: process.env.ANTHROPIC_API_KEY });
const message = await client.messages.______({
  model: "claude-sonnet-4-6",
  max_tokens: 1024,
  messages: [{ role: "user", content: "Hello!" }]
});`,
        options: [
          { id: 'a', text: 'create', isCorrect: true, explanation: 'Correct! client.messages.create() sends a non-streaming request and returns the complete message.' },
          { id: 'b', text: 'send', isCorrect: false, explanation: 'The method is .create(), not .send().' },
          { id: 'c', text: 'stream', isCorrect: false, explanation: '.stream() exists but returns a streaming response, not a complete message directly.' },
          { id: 'd', text: 'chat', isCorrect: false, explanation: 'The method is .create(), not .chat().' },
        ],
        globalExplanation: 'client.messages.create() is non-streaming. client.messages.stream() or passing stream: true gives you streaming. The SDK also provides .withResponse() for raw HTTP access.',
      },
    ],
  },

  // ─── Module 6: Writing Skills & Commands ───────────────────────────────
  {
    id: 'quiz-module-6',
    moduleId: 'module-6',
    title: 'Writing Skills & Commands Quiz',
    questions: [
      {
        id: 'q6-1',
        type: 'multiple-choice',
        questionText: 'Where do you place a project-level skill so the whole team shares it via Git?',
        options: [
          { id: 'a', text: '~/.claude/commands/', isCorrect: false, explanation: 'This is the global location — it only applies to your machine, not shared via Git.' },
          { id: 'b', text: '.claude/commands/', isCorrect: true, explanation: 'Correct! Project skills go in .claude/commands/ and are committed to Git so every team member gets them automatically.' },
          { id: 'c', text: '.github/commands/', isCorrect: false, explanation: 'Claude Code does not read from .github/ for skills.' },
          { id: 'd', text: 'src/commands/', isCorrect: false, explanation: 'Claude Code looks for skills in .claude/commands/, not in your source tree.' },
        ],
        globalExplanation: 'Project-level skills live in .claude/commands/ and should be committed to Git. Global skills (personal only) go in ~/.claude/commands/ on your home directory.',
      },
      {
        id: 'q6-2',
        type: 'multiple-choice',
        questionText: 'What does the $ARGUMENTS placeholder do in a skill file?',
        options: [
          { id: 'a', text: 'It sets the default model for that skill', isCorrect: false, explanation: '$ARGUMENTS has nothing to do with model selection.' },
          { id: 'b', text: 'It is substituted with whatever the user typed after the command name', isCorrect: true, explanation: 'Correct! If the skill is /explain and you run "/explain useAuth hook", then $ARGUMENTS becomes "useAuth hook".' },
          { id: 'c', text: 'It lists all available arguments for the command', isCorrect: false, explanation: '$ARGUMENTS is a substitution placeholder, not a help reference.' },
          { id: 'd', text: 'It passes environment variables to the skill', isCorrect: false, explanation: '$ARGUMENTS substitutes user text, not environment variables.' },
        ],
        globalExplanation: '$ARGUMENTS is a simple text substitution — it is replaced by whatever the user types after the slash command name. This makes skills reusable across different inputs.',
      },
      {
        id: 'q6-3',
        type: 'multiple-choice',
        questionText: 'Which hook exit code hard-blocks Claude from proceeding with a tool call?',
        options: [
          { id: 'a', text: '0', isCorrect: false, explanation: 'Exit code 0 means success — Claude continues normally.' },
          { id: 'b', text: '1', isCorrect: false, explanation: 'A non-zero code other than 2 shows the output to Claude as context but does not block.' },
          { id: 'c', text: '2', isCorrect: true, explanation: 'Correct! Exit code 2 tells Claude Code to block the tool call entirely. Use this for dangerous actions like rm -rf or force-pushing to main.' },
          { id: 'd', text: '127', isCorrect: false, explanation: 'Exit code 127 means "command not found" — it shows output as context but does not hard-block.' },
        ],
        globalExplanation: 'Exit code 2 is the special "block" exit code in Claude Code hooks. Any other non-zero exit code shows the hook output to Claude as context (useful for lint errors). Exit 0 continues normally.',
      },
      {
        id: 'q6-4',
        type: 'multiple-choice',
        questionText: 'You want lint to run automatically every time Claude writes a TypeScript file. What is the right approach?',
        options: [
          { id: 'a', text: 'Write a skill called /lint', isCorrect: false, explanation: 'A skill would require you to manually run /lint each time. The requirement is automatic.' },
          { id: 'b', text: 'Add it to CLAUDE.md as a reminder', isCorrect: false, explanation: 'CLAUDE.md is context, not automation. It would not actually run lint.' },
          { id: 'c', text: 'Add a PostToolUse hook matching "Write" that runs the linter', isCorrect: true, explanation: 'Correct! A PostToolUse hook fires automatically after every Write tool call. Match on "Write" and run your linter — no user input needed.' },
          { id: 'd', text: 'Use a PreToolUse hook on every tool', isCorrect: false, explanation: 'PreToolUse fires before the write, so the file hasn\'t been written yet. PostToolUse is correct for running lint after a file is written.' },
        ],
        globalExplanation: 'Hooks are for automatic, event-driven automation. A PostToolUse hook matching the Write tool fires every time Claude writes a file — perfect for running lint, type-check, or formatting automatically.',
      },
      {
        id: 'q6-5',
        type: 'multiple-choice',
        questionText: 'Which is the BEST name for a skill that generates a git commit message?',
        options: [
          { id: 'a', text: '/git', isCorrect: false, explanation: 'Too broad — this could mean anything git-related.' },
          { id: 'b', text: '/conventional-commits-helper-tool', isCorrect: false, explanation: 'Too long and describes the tool, not the action.' },
          { id: 'c', text: '/commit-msg', isCorrect: true, explanation: 'Correct! Action-first, specific, short. It clearly says what it does — generates a commit message.' },
          { id: 'd', text: '/claude-commit-generator-v2', isCorrect: false, explanation: 'Verbose, includes unnecessary words like "claude" and "v2".' },
        ],
        globalExplanation: 'Name skills after the action they perform, not the tool they use. Short, action-first names are self-documenting and easy to type: /write-test, /commit-msg, /security-review, /add-jsdoc.',
      },
      {
        id: 'q6-6',
        type: 'multiple-choice',
        questionText: 'What is the "rule of three" for deciding when to write a skill?',
        options: [
          { id: 'a', text: 'A skill must have at least three examples', isCorrect: false, explanation: 'This is about the number of examples in the skill file, not when to create one.' },
          { id: 'b', text: 'Wait until you have typed the same prompt three times, then write a skill instead', isCorrect: true, explanation: 'Correct! The rule of three prevents premature skill creation. After typing the same thing three times, it\'s clearly a repeatable workflow worth capturing.' },
          { id: 'c', text: 'A skill file must be under three hundred lines', isCorrect: false, explanation: 'There is no three-hundred-line rule for skills.' },
          { id: 'd', text: 'Every skill should cover three different use cases', isCorrect: false, explanation: 'Good skills are focused — one job per skill, not three use cases.' },
        ],
        globalExplanation: 'The rule of three is a practical heuristic: the first time you need something, just do it. The second time, do it again. The third time, write a skill. This prevents over-engineering while capturing genuinely reusable workflows.',
      },
    ],
  },
];

export function getQuizById(id: string): Quiz | undefined {
  return quizzes.find(q => q.id === id);
}

export function getQuizByModuleId(moduleId: string): Quiz | undefined {
  return quizzes.find(q => q.moduleId === moduleId);
}

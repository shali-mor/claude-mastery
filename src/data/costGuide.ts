/**
 * Content for the Cost Guide page (/cost-guide).
 *
 * Written as *tactics*, not reference material: every entry says what to do,
 * what it saves, and how to do it. Pricing figures live in `models.ts` — this
 * file never hardcodes per-model dollar amounts.
 */

/* ────────────────────────────────────────────────────────────────────────
   Quick wins — the ranked shortlist
   ──────────────────────────────────────────────────────────────────────── */

export interface QuickWin {
  rank: number;
  action: string;
  cmd: string;
  saving: string;
  effort: 'One-off setup' | 'Per session' | 'Habit';
}

export const quickWins: QuickWin[] = [
  {
    rank: 1,
    action: 'Switch to opusplan so routing happens automatically',
    cmd: '/model opusplan',
    saving: 'Most of the Opus premium',
    effort: 'One-off setup',
  },
  {
    rank: 2,
    action: 'Replace your chattiest MCP server with its CLI',
    cmd: 'claude mcp remove github',
    saving: '40–90% of MCP context',
    effort: 'One-off setup',
  },
  {
    rank: 3,
    action: 'Clear at every task boundary instead of one long session',
    cmd: '/clear',
    saving: 'Breaks the compounding',
    effort: 'Habit',
  },
  {
    rank: 4,
    action: 'Compress tool output before it reaches the context window',
    cmd: 'npm test 2>&1 | tail -40',
    saving: '~90% on log-heavy turns',
    effort: 'Habit',
  },
  {
    rank: 5,
    action: 'Put project context in CLAUDE.md so it is cached, not retyped',
    cmd: '/init',
    saving: 'Full price → 0.1×',
    effort: 'One-off setup',
  },
  {
    rank: 6,
    action: 'Show cost in the status line so it is never invisible',
    cmd: '/statusline',
    saving: 'Makes everything else stick',
    effort: 'One-off setup',
  },
];

/* ────────────────────────────────────────────────────────────────────────
   Tactics
   ──────────────────────────────────────────────────────────────────────── */

export interface Tactic {
  icon: string;
  action: string;
  cmd?: string;
  saving: string;
  problem: string;
  fix: string;
  example?: { before: string; after: string };
  flag?: boolean;
}

/** Let the tool pick the model for you. */
export const routingTactics: Tactic[] = [
  {
    icon: 'Split',
    action: 'Let opusplan route between models for you',
    cmd: '/model opusplan',
    saving: 'Opus quality, mostly Sonnet cost',
    flag: true,
    problem:
      'Manual routing does not survive contact with real work. Nobody runs /model haiku before a rename and /model opus before an architecture decision — people pick one model in the morning and pay that rate all day, usually the expensive one.',
    fix:
      'opusplan routes by mode, not automatically by task: Opus runs only while the session is in Plan Mode, and Sonnet runs for regular execution. The routing is free once you are there, but entering Plan Mode is still on you — press Shift+Tab to cycle into it, or just ask to plan first ("plan this out, don\'t implement yet"), which triggers it for that turn. Exit back to execution and it drops to Sonnet again. For most day-to-day development this is the single best default, and it is one command to set.',
  },
  {
    icon: 'Gauge',
    action: 'Drop effort before you drop model',
    cmd: '/effort low',
    saving: 'Reasoning tokens, keeps capability',
    problem:
      'When a session feels expensive the instinct is to downgrade the model, which costs you capability on everything for the rest of the session.',
    fix:
      'Effort is the finer-grained dial, and reasoning bills as output — the expensive half. Run low or medium for mechanical stretches and raise it for the hard turn, rather than switching models. Type "ultrathink" when you want exactly one deep turn instead of a permanently expensive session, and /effort auto to go back to the default.',
  },
  {
    icon: 'Bot',
    action: 'Pin cheap models to the skills that do not need thinking',
    saving: 'Per-invocation, forever',
    problem:
      'A skill that formats changelogs or fixes lint runs on whatever model your session happens to be using — often Opus, for work any model does identically.',
    fix:
      'Skill frontmatter takes a model: field. Pin mechanical skills to Haiku once and every future invocation is cheap, regardless of the session model. Pair it with context: fork to run the skill in an isolated subagent so its working tokens never land in your main window, and allowed-tools to stop it loading tools it does not need.',
    example: {
      before: '---\nname: fix-lint\n---',
      after: '---\nname: fix-lint\nmodel: claude-haiku-4-5\ncontext: fork\nallowed-tools: Read, Edit, Bash\n---',
    },
  },
  {
    icon: 'Layers',
    action: 'Send exploration to subagents, keep decisions in the main thread',
    cmd: '/agents',
    saving: 'Search cost stays out of your window',
    problem:
      'A broad "where is this handled?" search reads a dozen files into your main context, and you then pay to re-send all of them on every remaining turn of the session.',
    fix:
      'Subagents run in their own context window and return only a summary. The twelve files are read once, in someone else’s window, and you get a paragraph. Use them for wide searches, multi-file analysis, and independent parallel tracks — and give them a cheap model, since searching is not the part that needs Opus.',
  },
];

/** The user-facing headline section: MCP is where quiet money goes. */
export const mcpTactics: Tactic[] = [
  {
    icon: 'Terminal',
    action: 'Replace chatty MCP servers with the CLI you already have',
    cmd: 'gh pr list  # not the GitHub MCP server',
    saving: '40–90% of MCP context',
    flag: true,
    problem:
      'An MCP server’s tool schemas are standing context — they are sent whether you use the server or not. A single server exposing ~20 tools can add well over a thousand tokens to every request, and three of them put you several thousand tokens in the hole before you have typed anything. The output is worse too: MCP tools tend to return full structured payloads, while a shell command returns the ten lines you asked for.',
    fix:
      'Where a mature CLI exists, prefer it. GitHub is the clearest case — gh does more than the GitHub MCP server, Claude already knows it, and it costs nothing until it is actually invoked. The same holds for aws, gcloud, kubectl, psql, and docker. Teams that make this swap commonly report cutting total token use by roughly 40%, and more on tool-heavy workflows.',
    example: {
      before: 'MCP server: 20+ tool schemas in every request, always',
      after: 'gh / aws / kubectl: 0 tokens until Claude runs one',
    },
  },
  {
    icon: 'Wrench',
    action: 'Freeze a repeated MCP flow into a script the second time you need it',
    saving: 'Recurring cost → one-time cost',
    flag: true,
    problem:
      'The first time you ask Claude to do something through an MCP server it has to discover the right calls, inspect responses, and figure out the sequence. If that same flow is a weekly job, you pay that discovery cost every single time, plus the standing schema cost in between.',
    fix:
      'Do it through MCP once, while it is genuinely exploratory. Then ask Claude to write the working sequence out as a shell script or a project slash command, and use that from then on. The flow becomes deterministic, auditable, reviewable in a PR, runnable in CI without Claude at all — and it stops costing tokens to rediscover. Once every flow you rely on from a server is scripted, remove the server.',
    example: {
      before: '"Pull open PRs, group by author, flag stale" → MCP, every week',
      after: '.claude/commands/pr-triage.md → one Bash call',
    },
  },
  {
    icon: 'Search',
    action: 'Audit what each server and plugin actually costs you',
    cmd: 'claude plugin details <name>',
    saving: 'Tells you what to cut first',
    problem:
      'People disable MCP servers by vibes, dropping the one they feel guilty about rather than the one that is actually expensive.',
    fix:
      'Get the number. The /usage limits tab breaks usage down per MCP server, and claude plugin details <name> shows a plugin’s component inventory with its projected per-session token cost. Rank by cost, then cut from the top. Usually one or two servers account for most of the overhead and the rest are noise.',
  },
  {
    icon: 'Filter',
    action: 'Let tool search defer MCP tools — do not force them loaded',
    saving: 'Keeps idle schemas out of context',
    problem:
      'alwaysLoad: true pins every tool from a server into context permanently. Set on a large server, it is the most expensive single line in your MCP config.',
    fix:
      'Claude Code defers MCP tools behind a tool-search step by default, so schemas load only when relevant. Leave that default alone. Reserve alwaysLoad for small servers with a handful of tools you genuinely use on every turn, and never set it on a server exposing dozens.',
  },
  {
    icon: 'FolderTree',
    action: 'Scope MCP servers per project, not globally',
    cmd: 'claude --strict-mcp-config',
    saving: 'Stops cross-project bleed',
    problem:
      'A server installed globally because one repo needed it then loads for every other repo you touch, forever.',
    fix:
      'Put servers in the project’s .mcp.json where they belong, so a database server loads for the service that uses it and nowhere else. Use --strict-mcp-config to ignore inherited configuration entirely when you want a guaranteed-clean session.',
  },
];

/** Context discipline, expressed as actions. */
export const contextTactics: Tactic[] = [
  {
    icon: 'Eraser',
    action: 'Clear at every task boundary',
    cmd: '/clear',
    saving: 'Breaks the compounding',
    flag: true,
    problem:
      'Every turn re-sends the whole conversation. Work you finished an hour ago is still being billed on every message you send now, and it never stops until the session ends.',
    fix:
      'The moment you switch to something unrelated, clear. Starting a session is free; carrying context you no longer need is charged repeatedly. Three focused sessions cost dramatically less than one session covering the same three tasks.',
  },
  {
    icon: 'Minimize2',
    action: 'Compact with a focus, before auto-compact does it for you',
    cmd: '/compact keep the auth decisions',
    saving: '30–60% on long sessions',
    problem:
      'When the window fills, Claude Code compacts automatically. That summarization pass is billable work, it fires mid-task at the worst moment, and nobody steered what it chose to keep.',
    fix:
      'Watch /context and compact on your own terms. Always pass a focus — a bare /compact keeps what the summarizer guesses matters, while a directed one keeps the decisions and failing tests you actually need.',
  },
  {
    icon: 'SlidersHorizontal',
    action: 'Lower the auto-compact threshold instead of leaving it at the ceiling',
    cmd: '"autoCompactWindow": 120000  // settings.json',
    saving: 'Caps the worst case automatically',
    problem:
      'Auto-compact is on by default, but its trigger point sits near the ceiling of your context window — by the time it fires you have already paid to carry a nearly-full window for a while. If you are not going to watch /context yourself, the default threshold is not doing you any favors.',
    fix:
      'Set autoCompactWindow in settings.json to a smaller number (100,000–1,000,000) so compaction fires earlier and more predictably, with nothing to remember per session. This is a backstop, not a substitute for the /compact-with-a-focus habit above — steering compaction yourself still beats an automatic summary — but a lower threshold means the automatic one triggers sooner and cheaper on the sessions where you do not.',
  },
  {
    icon: 'FileText',
    action: 'Write down anything you have explained twice',
    cmd: '/init',
    saving: 'Full price → 0.1× on reuse',
    problem:
      'Re-explaining your stack, conventions, and commands at the start of every session is a cost you pay again and again for information that never changes.',
    fix:
      'Put it in CLAUDE.md. It loads at startup and sits in the stable cached prefix, so you pay the cache-read rate rather than full price — and every other engineer on the repo stops paying for it too. Treat "I have now said this twice" as the trigger to write it down.',
  },
  {
    icon: 'Crosshair',
    action: 'Name the file instead of describing the problem',
    saving: 'Cuts the discovery phase',
    problem:
      'A vague prompt makes Claude grep and read broadly just to work out what you meant. You pay for that exploration before any useful work begins, and it lands in your context permanently.',
    fix:
      'State the goal, the constraint, and the path in one message. "Fix the retry backoff in src/lib/http.ts — it should cap at 30s" costs a fraction of "the retries seem wrong somewhere, have a look".',
  },
  {
    icon: 'Search',
    action: 'Point at files rather than pasting them',
    saving: 'One read vs. every turn',
    problem:
      'A pasted 2,000-line file is in the conversation forever and is re-sent on every subsequent turn — not just the one that needed it.',
    fix:
      'Give the path and let Claude read the ranges it needs. Same information available, a fraction of the ongoing cost, and it can go back for more if the first read was not enough.',
  },
  {
    icon: 'Zap',
    action: 'Automate the cap with a PreToolUse hook on Read',
    saving: 'Oversized reads never happen, not even once',
    problem:
      'Pointing at file paths instead of pasting only helps if someone remembers to ask for a bounded range. Left alone, reading a 10,000-line file pulls the whole thing into context on the first ask.',
    fix:
      'A PreToolUse hook on the Read tool sees the file path before the read happens and can rewrite the call: check the target’s size, and if it is large and no limit was given, inject a bounded limit automatically via the hook’s updatedInput — the same rewrite mechanism the Bash output hook below uses, just pointed at Read instead of Bash.',
    example: {
      before: 'Read(file_path: "huge.log")   → whole file, unbounded',
      after: 'PreToolUse hook → updatedInput adds limit: 200',
    },
  },
  {
    icon: 'Rewind',
    action: 'Rewind instead of arguing with a wrong answer',
    cmd: '/rewind',
    saving: 'Deletes the dead end',
    problem:
      'Three messages correcting a wrong turn leave all four exchanges in context permanently. You now pay for the mistake and the argument about it on every remaining turn.',
    fix:
      'Rewind to before the wrong turn and re-prompt with better framing. The dead end disappears instead of compounding. Use /fork when you want to keep the original thread and try a different direction alongside it.',
  },
  {
    icon: 'MessageSquare',
    action: 'Ask side questions where they cannot accumulate',
    cmd: '/btw',
    saving: 'Zero ongoing context',
    problem:
      'A quick "what does this flag do?" mid-task permanently joins the conversation and gets re-sent for the rest of the session.',
    fix:
      '/btw spawns a temporary read-only agent in a sidebar. It runs separately from your main task and vanishes when closed — the exchange never enters your history, so it never gets re-sent.',
  },
  {
    icon: 'Target',
    action: 'Give the whole specification in the first message',
    cmd: '/goal',
    saving: 'Fewer, cheaper turns',
    problem:
      'Requirements revealed across six turns cost more than the same requirements stated once, because every turn re-sends everything before it and re-establishes context that was already there.',
    fix:
      'Front-load the spec: goal, constraints, paths, and what done looks like. For long autonomous runs, /goal sets a completion condition and shows a live overlay of elapsed time, turns, and tokens consumed so a runaway loop is visible while it is running.',
  },
];

/** Output is the expensive half — control both directions. */
export const outputTactics: Tactic[] = [
  {
    icon: 'Scissors',
    action: 'Filter command output before Claude ever sees it',
    cmd: 'npm test 2>&1 | tail -40',
    saving: '~90% on log-heavy turns',
    flag: true,
    problem:
      'Piping a full test run, build log, or query result into the conversation dumps thousands of tokens of noise in permanently — to surface one failing assertion.',
    fix:
      'Filter at the shell. tail, grep -c, --quiet flags, jq, or writing to a file Claude reads selectively. This is the highest-value habit on log-heavy work, and it is pure upside: Claude reads the same signal without the noise.',
    example: {
      before: 'npm test          → ~4,000 tokens of passing-test spam',
      after: 'npm test 2>&1 | tail -40   → ~200 tokens of what failed',
    },
  },
  {
    icon: 'Zap',
    action: 'Automate the filtering with a PreToolUse hook',
    saving: 'Applies without remembering',
    problem:
      'Filtering only helps when you remember to do it, and you will not remember at 5pm on a Friday.',
    fix:
      'A PreToolUse hook can rewrite Bash commands before they run, so compression happens whether or not anyone was thinking about it. This is exactly what the rtk tool below installs — and you can write your own for project-specific commands.',
  },
  {
    icon: 'TrendingDown',
    action: 'Ask for bounded output explicitly',
    saving: 'Output costs ~5× input',
    problem:
      'Output tokens cost roughly five times input, and extended thinking bills as output too. An open-ended question invites an essay you will skim.',
    fix:
      'Say how much you want. "Just the diff", "one paragraph", "list the three options, do not implement yet". This is a direct cost reduction, not a stylistic preference — and it usually gets you a more useful answer.',
  },
  {
    icon: 'Repeat',
    action: 'Bound your headless and scheduled runs',
    cmd: 'claude -p --max-turns 15',
    saving: 'Caps the worst-case',
    flag: true,
    problem:
      'Automated runs have nobody watching the token counter, which is precisely when a loop runs away overnight. This is the single most common way a large surprise bill happens.',
    fix:
      'Cap turns, pick the cheapest model that does the job, keep the prompt tight, and check /usage after the first few runs before you schedule it. If you use API keys, set a hard spend limit in the Console as a backstop — a limit that triggers is much cheaper than an invoice that surprises you.',
  },
];

/* ────────────────────────────────────────────────────────────────────────
   Open-source tooling
   ──────────────────────────────────────────────────────────────────────── */

export interface OssTool {
  name: string;
  url: string;
  license: string;
  local: boolean;
  what: string;
  use: string;
}

export const ossTools: OssTool[] = [
  {
    name: 'ccusage',
    url: 'https://github.com/ryoppippi/ccusage',
    license: 'MIT',
    local: true,
    what: 'Reads Claude Code’s local session logs and reports token usage and cost by day, week, month, session, and project — with a --breakdown flag for per-model detail and a "blocks" report that maps usage onto the 5-hour billing windows. Also covers Codex, Gemini CLI, Copilot CLI, and others, so a mixed-tool team gets one number.',
    use: 'npx ccusage@latest',
  },
  {
    name: 'cccost',
    url: 'https://github.com/badlogic/cccost',
    license: 'MIT',
    local: true,
    what: 'Wraps Claude Code and instruments its API calls directly, writing usage to a local JSON file in real time. Because it measures actual requests rather than reconstructing from logs, it stays accurate on resumed sessions and across mixed models — cases where the built-in counter can drift.',
    use: 'cccost   # in place of `claude`',
  },
  {
    name: 'Claude Code Usage Monitor',
    url: 'https://github.com/Maciek-roboblog/Claude-Code-Usage-Monitor',
    license: 'MIT',
    local: true,
    what: 'A live terminal dashboard for burn rate and plan limits: how fast you are consuming, when the current window resets, and a projection of whether you will hit the ceiling before it does. Auto-detects Pro / Max tiers.',
    use: 'uv tool install claude-monitor',
  },
  {
    name: 'rtk (Rust Token Killer)',
    url: 'https://github.com/rtk-ai/rtk',
    license: 'Apache-2.0',
    local: true,
    what: 'A CLI proxy that compresses command output before it reaches the model — git status, test runs, and build logs shrink dramatically while keeping the signal. Its Claude Code integration installs a PreToolUse hook that rewrites Bash commands automatically, so the saving applies without anyone remembering to pipe through tail.',
    use: 'rtk git status',
  },
];

/** Gateways and proxies — real tools, but a different risk profile. */
export const gatewayNote = {
  tools: ['Helicone', 'Langfuse', 'LiteLLM', 'Bifrost'],
  body:
    'Open-source LLM gateways and observability platforms add org-wide spend tracking, per-team budgets, and request-level attribution. They are genuinely useful at team scale, but they work by routing your API traffic through a proxy — which means your prompts and code pass through another system. Self-host them and run them past your security review before pointing production traffic at a hosted instance. For individual cost visibility, the local-only tools above give you most of the value with none of that exposure.',
};

/* ────────────────────────────────────────────────────────────────────────
   Billing model, visibility, anti-patterns, habits, teams
   ──────────────────────────────────────────────────────────────────────── */

export interface TokenKind {
  label: string;
  multiplier: string;
  what: string;
  note: string;
  tone: 'neutral' | 'warn' | 'good';
}

export const tokenKinds: TokenKind[] = [
  {
    label: 'Input tokens',
    multiplier: '1×',
    what: 'Everything you send: system prompt, tool definitions, CLAUDE.md, files read, and the whole conversation so far.',
    note: 'Re-sent on every turn — this is the one that compounds.',
    tone: 'neutral',
  },
  {
    label: 'Output tokens',
    multiplier: '~5×',
    what: 'Everything Claude writes back, including extended thinking, which is billed as output even when you never see it.',
    note: 'Five times the input rate. Bounded asks beat open-ended ones.',
    tone: 'warn',
  },
  {
    label: 'Cache writes',
    multiplier: '1.25×',
    what: 'The first time a stable prefix — system prompt, tools, CLAUDE.md, early conversation — is stored for reuse.',
    note: 'A 25% premium paid once; it pays for itself on the second turn.',
    tone: 'neutral',
  },
  {
    label: 'Cache reads',
    multiplier: '0.1×',
    what: 'Every later reuse of that stored prefix. Claude Code caches automatically — there is nothing to configure.',
    note: '90% off. Why a stable prefix beats a merely short one.',
    tone: 'good',
  },
];

export interface VisibilityTool {
  icon: string;
  title: string;
  cmd?: string;
  tag: string;
  desc: string;
}

export const visibilityTools: VisibilityTool[] = [
  {
    icon: 'PieChart',
    title: 'Find out what is driving your usage',
    cmd: '/usage',
    tag: 'Start here',
    desc: 'The merged home for cost, stats, and plan limits. The limits tab is the useful one for cutting cost: it breaks usage down by category — skills, subagents, plugins, and per-MCP-server — so you can name the expensive thing instead of guessing.',
  },
  {
    icon: 'Layers',
    title: 'Check what is filling the window right now',
    cmd: '/context',
    tag: 'Live',
    desc: 'A color-coded map of your context window. Use it as the trigger for the two decisions that matter: compact now, or clear and start fresh. Green means keep working; red means you are about to pay for an unsteered auto-compact.',
  },
  {
    icon: 'Terminal',
    title: 'Keep cost on screen permanently',
    cmd: '/statusline',
    tag: 'Do this once',
    desc: 'Put live context usage and session cost in the status line. Every other habit on this page is easier to keep when the number is always visible — spend you can see is spend you manage.',
  },
  {
    icon: 'BarChart3',
    title: 'Spot the habit, not the session',
    cmd: '/stats',
    tag: 'Weekly',
    desc: 'Daily usage over time, session history, and model preferences. One expensive session is noise; the same pattern across twenty sessions is a habit worth changing, and this is the only place it shows up.',
  },
  {
    icon: 'ShieldAlert',
    title: 'Set a hard ceiling before you need one',
    cmd: 'console.anthropic.com',
    tag: 'API keys',
    desc: 'Per-workspace spend limits and alert thresholds are the backstop for the runaway-loop scenario. Set them on day one of a project — an alert that fires is far cheaper than an invoice that surprises you.',
  },
  {
    icon: 'Radio',
    title: 'Give the team one dashboard',
    tag: 'Org scale',
    desc: 'Claude Code exports OpenTelemetry metrics — tokens and cost tagged by user, model, and session — into whatever you already run. Once cost sits beside your other operational metrics, it gets treated like one.',
  },
];

export interface AntiPattern {
  habit: string;
  why: string;
  instead: string;
}

export const antiPatterns: AntiPattern[] = [
  {
    habit: 'The all-day omnibus session',
    why: 'By turn 150, every message pays for 149 turns of unrelated history.',
    instead: '/clear at every task boundary.',
  },
  {
    habit: 'Every MCP server enabled, globally, forever',
    why: 'Standing schema cost on every request, in every repo, used or not.',
    instead: 'Scope per project; swap the chatty ones for their CLI.',
  },
  {
    habit: 'Re-running the same MCP flow weekly',
    why: 'You pay rediscovery every time for something that never changes.',
    instead: 'Script it after the first run; delete the server once nothing needs it.',
  },
  {
    habit: 'Pasting whole files into chat',
    why: 'Re-sent on every later turn, not just the one that needed it.',
    instead: 'Give the path and let Claude read what it needs.',
  },
  {
    habit: 'One model chosen in the morning, used all day',
    why: 'You pay the top rate for mechanical work, or lose quality on hard work.',
    instead: '/model opusplan and stop thinking about it.',
  },
  {
    habit: 'Arguing with a wrong answer',
    why: 'The dead end and the argument both stay in context permanently.',
    instead: '/rewind and re-prompt with better framing.',
  },
  {
    habit: 'Dumping full test and build output',
    why: 'Thousands of tokens of noise to surface one failing assertion.',
    instead: 'Pipe through tail or grep — or install a hook that does it for you.',
  },
  {
    habit: 'Unbounded headless runs',
    why: 'Nobody is watching the counter, which is when loops run away overnight.',
    instead: '--max-turns, cheapest adequate model, plus a Console spend limit.',
  },
];

export interface HabitGroup {
  cadence: string;
  icon: string;
  items: string[];
}

export const habitGroups: HabitGroup[] = [
  {
    cadence: 'Every session',
    icon: 'Timer',
    items: [
      '/clear before starting anything unrelated.',
      'Open with the goal, the constraints, and the file paths in one message.',
      'Pipe verbose commands through tail or grep.',
      'Glance at /context before and after anything large.',
    ],
  },
  {
    cadence: 'Every week',
    icon: 'LineChart',
    items: [
      'Run npx ccusage and find the most expensive project.',
      'Check the /usage limits tab for the most expensive MCP server.',
      'Script one repeated MCP flow, then drop the server if nothing else needs it.',
      'Move anything you explained twice into CLAUDE.md.',
    ],
  },
  {
    cadence: 'Every month',
    icon: 'Building2',
    items: [
      'Reconcile against Console Usage & Cost if you use API keys.',
      'Re-check spend limits and alert thresholds — they should still bite.',
      'Review the team’s default model, effort, and MCP config.',
      'Share the numbers. Cost stays invisible until someone shows it.',
    ],
  },
];

export interface TeamPractice {
  icon: string;
  title: string;
  desc: string;
}

export const teamPractices: TeamPractice[] = [
  {
    icon: 'Users',
    title: 'Ship a default config, not a policy document',
    desc: 'Check a project .mcp.json, a CLAUDE.md, and an agreed default model into the repo. Making the cheap path the default path moves a whole team; asking people to be disciplined does not.',
  },
  {
    icon: 'ShieldAlert',
    title: 'Set spend limits before the first incident',
    desc: 'Per-workspace limits and alert thresholds in the Console turn a runaway automation into a notification. Set them when the project starts, not after the month-end surprise.',
  },
  {
    icon: 'FileText',
    title: 'Review CLAUDE.md like you review code',
    desc: 'A good project CLAUDE.md is a cost asset multiplied across everyone on the repo — nobody pays to re-explain the same stack twice. A stale one quietly misleads every session that loads it.',
  },
  {
    icon: 'Radio',
    title: 'Put cost on a shared dashboard',
    desc: 'Export OTel metrics into the stack the team already watches, or run ccusage in CI and post the weekly number. Visibility does more for team spend than any individual optimisation.',
  },
];

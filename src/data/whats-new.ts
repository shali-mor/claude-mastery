export type UpdateCategory = 'command' | 'skill' | 'plugin' | 'hook' | 'behavior' | 'api' | 'security';

export interface WhatsNewEntry {
  id: string;
  version?: string;
  date: string; // 'YYYY-MM' or 'YYYY-MM-DD'
  category: UpdateCategory;
  title: string;
  summary: string;
  detail?: string;
  lessonRef?: string; // lesson ID if covered in tutorial
  tutorialCovered: boolean;
  isBreaking?: boolean;
}

export const whatsNew: WhatsNewEntry[] = [
  // ── 2026 ────────────────────────────────────────────────────────────────
  {
    id: 'plugin-marketplace-2026',
    date: '2026-02',
    category: 'plugin',
    title: 'Plugin marketplace launched',
    summary: 'Browse, install, and publish plugins via the /plugin command. Official Anthropic marketplace plus community marketplaces via GitHub URLs.',
    detail: 'Plugins bundle multiple skills, scripts, and assets into a distributable package. Skills in plugins are namespaced (/plugin-name:command). Submit your own at claude.ai/settings/plugins/submit.',
    lessonRef: 'lesson-2-1',
    tutorialCovered: true,
  },
  {
    id: 'skill-frontmatter-fields-2026',
    date: '2026-02',
    category: 'skill',
    title: 'New skill frontmatter fields',
    summary: 'Skills now support argument-hint, allowed-tools, context: fork, model, user-invocable, and disable-model-invocation in YAML frontmatter.',
    detail: 'argument-hint shows in autocomplete. allowed-tools restricts which tools the skill can use. context: fork runs in an isolated subagent. model pins a specific Claude model for the skill.',
    lessonRef: 'lesson-2-2',
    tutorialCovered: true,
  },
  {
    id: 'skill-auto-activation-2026',
    date: '2026-02',
    category: 'skill',
    title: 'Skills auto-activate from description',
    summary: 'Claude reads all skill description fields at session start and automatically invokes the matching skill — no /command needed.',
    lessonRef: 'lesson-2-2',
    tutorialCovered: true,
  },
  {
    id: 'agentskills-standard-2026',
    date: '2026-02',
    category: 'skill',
    title: 'AgentSkills open standard',
    summary: 'Claude Code skills now follow the AgentSkills open standard (agentskills.io), making them compatible across multiple AI tools.',
    lessonRef: 'lesson-2-1',
    tutorialCovered: true,
  },
  {
    id: 'prewrite-hook-2026',
    date: '2026-01',
    category: 'hook',
    title: 'PreWrite hook event added',
    summary: 'New PreWrite hook fires before any file write, allowing you to block or transform writes before they happen.',
    detail: 'Like PreToolUse but scoped specifically to file write operations. Exit code 2 blocks the write.',
    lessonRef: 'lesson-2-3',
    tutorialCovered: true,
  },
  {
    id: 'notification-hook-2026',
    date: '2026-01',
    category: 'hook',
    title: 'Notification hook event',
    summary: 'New Notification hook event fires when Claude sends a notification (e.g. task complete, attention needed).',
    lessonRef: 'lesson-2-3',
    tutorialCovered: true,
  },
  // ── 2025 ────────────────────────────────────────────────────────────────
  {
    id: 'isolation-worktree-2025',
    date: '2025-11',
    category: 'behavior',
    title: 'Agent worktree isolation',
    summary: 'Pass `isolation: "worktree"` when spawning an Agent to run it in a separate git branch. Changes are isolated until you review and merge — no risk of polluting main.',
    detail: 'The worktree is created automatically on a new branch. If the agent makes no changes, the worktree is cleaned up silently. If it does make changes, the branch and path are returned so you can review with `git diff main...branch`, then merge and remove with `git worktree remove`.',
    lessonRef: 'lesson-7-6',
    tutorialCovered: true,
  },
  {
    id: 'btw-command-2025',
    date: '2025-11',
    category: 'command',
    title: '/btw — ephemeral side-question agent',
    summary: 'Ask a quick question without it being saved to conversation history. /btw spawns a temporary agent that answers and disappears.',
    lessonRef: 'lesson-1-2',
    tutorialCovered: true,
  },
  {
    id: 'fork-command-2025',
    date: '2025-11',
    category: 'command',
    title: '/fork — branch conversation',
    summary: 'Branch the current conversation from this point, preserving context while allowing you to explore a different direction.',
    lessonRef: 'lesson-1-2',
    tutorialCovered: true,
  },
  {
    id: 'rewind-command-2025',
    date: '2025-11',
    category: 'command',
    title: '/rewind — roll back to checkpoint',
    summary: 'Roll the conversation back to a previous state, undoing recent changes and letting you take a different approach.',
    lessonRef: 'lesson-1-2',
    tutorialCovered: true,
  },
  {
    id: 'auto-memory-2025',
    date: '2025-10',
    category: 'behavior',
    title: 'Auto-memory per project',
    summary: 'Claude automatically persists notes across sessions in ~/.claude/projects/<hash>/memory/. Edit with /memory.',
    lessonRef: 'lesson-2-6',
    tutorialCovered: true,
  },
  {
    id: 'context-command-2025',
    date: '2025-10',
    category: 'command',
    title: '/context — visualize token usage',
    summary: 'Shows a color-coded grid of your context window usage, helping you decide when to /compact or /clear.',
    lessonRef: 'lesson-1-2',
    tutorialCovered: true,
  },
  {
    id: 'plan-mode-2025',
    date: '2025-09',
    category: 'command',
    title: '/plan — plan mode',
    summary: 'Enter plan mode to have Claude lay out its approach before executing. Review and edit the plan before any changes are made.',
    lessonRef: 'lesson-8-1',
    tutorialCovered: true,
  },
  {
    id: 'hooks-system-2025',
    date: '2025-08',
    category: 'hook',
    title: 'Hooks system launched',
    summary: 'Shell scripts that fire on Claude Code events (PreToolUse, PostToolUse, UserPromptSubmit, Stop). Exit code 2 blocks the action.',
    lessonRef: 'lesson-2-3',
    tutorialCovered: true,
  },
  {
    id: 'mcp-support-2025',
    date: '2025-07',
    category: 'behavior',
    title: 'MCP server support',
    summary: 'Connect Claude Code to any MCP (Model Context Protocol) server to add tools, resources, and capabilities.',
    lessonRef: 'lesson-9-1',
    tutorialCovered: true,
  },
];

export const CATEGORY_LABELS: Record<UpdateCategory, string> = {
  command: 'Command',
  skill: 'Skill',
  plugin: 'Plugin',
  hook: 'Hook',
  behavior: 'Behavior',
  api: 'API',
  security: 'Security',
};

export const CATEGORY_COLORS: Record<UpdateCategory, string> = {
  command: 'bg-blue-500/15 text-blue-700 dark:text-blue-400',
  skill: 'bg-green-500/15 text-green-700 dark:text-green-400',
  plugin: 'bg-purple-500/15 text-purple-700 dark:text-purple-400',
  hook: 'bg-orange-500/15 text-orange-700 dark:text-orange-400',
  behavior: 'bg-yellow-500/15 text-yellow-700 dark:text-yellow-400',
  api: 'bg-cyan-500/15 text-cyan-700 dark:text-cyan-400',
  security: 'bg-red-500/15 text-red-700 dark:text-red-400',
};

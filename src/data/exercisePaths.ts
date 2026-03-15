/**
 * Maps tutorial lesson IDs to their corresponding folder path
 * in the claude-mastery-exercises GitHub repository.
 *
 * Tutorial module numbering differs from the exercises repo numbering,
 * and some lessons within modules are in a different order.
 */
export const EXERCISE_PATHS: Record<string, string> = {
  // Module 1 → module-01-basics
  'lesson-1-1': 'module-01-basics/lesson-01-getting-started',
  'lesson-1-2': 'module-01-basics/lesson-02-slash-commands',
  'lesson-1-3': 'module-01-basics/lesson-03-cli-flags',
  'lesson-1-4': 'module-01-basics/lesson-04-permissions',

  'lesson-1-5': 'module-01-basics/lesson-05-ide-integration',
  'lesson-1-6': 'module-01-basics/lesson-06-settings-json',

  // Module 2 → module-02-skills-hooks
  'lesson-2-1': 'module-02-skills-hooks/lesson-01-skills-vs-hooks',
  'lesson-2-2': 'module-02-skills-hooks/lesson-02-writing-skills',
  'lesson-2-3': 'module-02-skills-hooks/lesson-03-hooks-in-practice',
  'lesson-2-4': 'module-02-skills-hooks/lesson-04-team-patterns',
  'lesson-2-5': 'module-02-skills-hooks/lesson-05-skills-library',
  'lesson-2-6': 'module-02-skills-hooks/lesson-06-memory-context',
  'lesson-2-7': 'module-02-skills-hooks/lesson-07-testing-refining-skills',

  // Module 3 (GSD) → module-08-gsd
  'lesson-3-1': 'module-08-gsd/lesson-01-methodology',
  'lesson-3-2': 'module-08-gsd/lesson-02-starting-planning',
  'lesson-3-3': 'module-08-gsd/lesson-03-executing-verifying',
  'lesson-3-4': 'module-08-gsd/lesson-04-advanced-workflows',

  // Module 5 addition
  'lesson-5-5': 'module-04-live-api/lesson-05-extended-thinking',

  // Module 6 (Prompt Engineering) → module-13-prompt-engineering
  'lesson-6-1': 'module-13-prompt-engineering/lesson-01-anatomy',
  'lesson-6-2': 'module-13-prompt-engineering/lesson-02-chain-of-thought',
  'lesson-6-3': 'module-13-prompt-engineering/lesson-03-few-shot',
  'lesson-6-4': 'module-13-prompt-engineering/lesson-04-debugging',

  // Module 4 (Cost Optimization) → module-03-cost-optimization
  // Note: Batch API (4-3) and Context Management (4-4) are swapped vs the repo
  'lesson-4-1': 'module-03-cost-optimization/lesson-01-pricing',
  'lesson-4-2': 'module-03-cost-optimization/lesson-02-prompt-caching',
  'lesson-4-3': 'module-03-cost-optimization/lesson-04-batch-api',
  'lesson-4-4': 'module-03-cost-optimization/lesson-03-context-management',
  'lesson-4-5': 'module-03-cost-optimization/lesson-05-auto-model-selection',

  // Module 5 (Live API) → module-04-live-api
  'lesson-5-1': 'module-04-live-api/lesson-01-messages-api',
  'lesson-5-2': 'module-04-live-api/lesson-02-streaming',
  'lesson-5-3': 'module-04-live-api/lesson-03-advanced-techniques',
  'lesson-5-4': 'module-04-live-api/lesson-04-production',

  // Module 7 (Sub-Agents) → module-05-sub-agents
  // lesson-7-3 is new (Writing Delegation Prompts), maps to task-tool folder
  'lesson-7-1': 'module-05-sub-agents/lesson-01-what-are-sub-agents',
  'lesson-7-2': 'module-05-sub-agents/lesson-02-task-tool',
  'lesson-7-3': 'module-05-sub-agents/lesson-02-task-tool',
  'lesson-7-4': 'module-05-sub-agents/lesson-03-parallelization',
  'lesson-7-5': 'module-05-sub-agents/lesson-04-agent-communication',
  'lesson-7-6': 'module-05-sub-agents/lesson-05-worktree-isolation',

  'lesson-7-7': 'module-05-sub-agents/lesson-07-multi-model-pipelines',

  // Module 8 (Plan Mode) → module-06-plan-mode
  'lesson-8-1': 'module-06-plan-mode/lesson-01-what-is-plan-mode',
  'lesson-8-2': 'module-06-plan-mode/lesson-02-entering-exiting',
  'lesson-8-3': 'module-06-plan-mode/lesson-03-plan-review-execute',
  'lesson-8-4': 'module-06-plan-mode/lesson-04-when-to-plan',

  // Module 9 (MCP) → module-07-mcp
  'lesson-9-1': 'module-07-mcp/lesson-01-what-is-mcp',
  'lesson-9-2': 'module-07-mcp/lesson-02-connecting-servers',
  'lesson-9-3': 'module-07-mcp/lesson-03-custom-mcp-server',
  'lesson-9-4': 'module-07-mcp/lesson-04-mcp-comparison',

  // Module 10 (n8n) → module-09-n8n
  'lesson-10-1': 'module-09-n8n/lesson-01-n8n-fundamentals',
  'lesson-10-2': 'module-09-n8n/lesson-02-calling-claude-api',
  'lesson-10-3': 'module-09-n8n/lesson-03-real-world-workflows',
  'lesson-10-4': 'module-09-n8n/lesson-04-prompt-engineering',

  // Module 11 (Automation Ecosystem) → module-10-automation
  'lesson-11-1': 'module-10-automation/lesson-01-shell-scripts-cron',
  'lesson-11-2': 'module-10-automation/lesson-02-zapier-make',
  'lesson-11-3': 'module-10-automation/lesson-03-webhooks',
  'lesson-11-4': 'module-10-automation/lesson-04-choosing-tools',

  'lesson-11-5': 'module-10-automation/lesson-05-github-actions',

  // Module 12 (Capstone) → module-11-capstone
  'lesson-12-1': 'module-11-capstone/lesson-01-designing-pipeline',
  'lesson-12-2': 'module-11-capstone/lesson-02-setup-mcp-hooks',
  'lesson-12-3': 'module-11-capstone/lesson-03-parallel-analysis',
  'lesson-12-4': 'module-11-capstone/lesson-04-wiring-shipping',

  // Module 14 (Testing AI Code) → module-14-testing-ai-code
  'lesson-14-1': 'module-14-testing-ai-code/lesson-01-why-testing',
  'lesson-14-2': 'module-14-testing-ai-code/lesson-02-tdd-with-claude',
  'lesson-14-3': 'module-14-testing-ai-code/lesson-03-review-patterns',
  'lesson-14-4': 'module-14-testing-ai-code/lesson-04-hooks-ci-gates',

  // Module 13 (Stock Bot) → module-12-stock-bot
  'lesson-13-1': 'module-12-stock-bot/lesson-01-architecture',
  'lesson-13-2': 'module-12-stock-bot/lesson-02-telegram-bot',
  'lesson-13-3': 'module-12-stock-bot/lesson-03-stock-signals',
  'lesson-13-4': 'module-12-stock-bot/lesson-04-claude-analyst',
};

const EXERCISES_REPO_BASE = 'https://github.com/shali-mor/claude-mastery-exercises/tree/main';

export function getExerciseUrl(lessonId: string): string {
  const path = EXERCISE_PATHS[lessonId];
  if (path) return `${EXERCISES_REPO_BASE}/${path}`;
  return 'https://github.com/shali-mor/claude-mastery-exercises';
}

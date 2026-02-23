export interface OptimizationTip {
  id: string;
  title: string;
  description: string;
  savingsEstimate: string;
  category: 'caching' | 'batching' | 'model-selection' | 'context' | 'prompt-engineering';
  applicableWhen: string;
}

export const optimizationTips: OptimizationTip[] = [
  {
    id: 'tip-1',
    title: 'Enable Prompt Caching',
    description:
      'Use cache_control breakpoints on large, repeated context (system prompts, documents, tool definitions). Cache reads cost ~90% less than regular input tokens.',
    savingsEstimate: 'Up to 90% on repeated input',
    category: 'caching',
    applicableWhen: 'You send the same large context in every request',
  },
  {
    id: 'tip-2',
    title: 'Use Batch API for Non-Urgent Work',
    description:
      'The Message Batches API processes requests asynchronously within 24 hours at 50% off standard pricing. Perfect for evals, data enrichment, and bulk classification.',
    savingsEstimate: '50% off all tokens',
    category: 'batching',
    applicableWhen: 'Tasks are not time-sensitive and can wait up to 24h',
  },
  {
    id: 'tip-3',
    title: 'Use Haiku for Simple Tasks',
    description:
      'Claude Haiku 4.5 costs ~19x less than Opus 4.6 per input token. Routing simpler tasks (classification, extraction, summarization) to Haiku dramatically cuts costs.',
    savingsEstimate: 'Up to 19x cheaper vs Opus',
    category: 'model-selection',
    applicableWhen: 'Task does not require deep reasoning or creativity',
  },
  {
    id: 'tip-4',
    title: 'Compact Your Context Regularly',
    description:
      'In Claude Code, use /compact to summarize the conversation. This reduces the growing context window and cuts input token costs on every subsequent turn.',
    savingsEstimate: '30–60% on long sessions',
    category: 'context',
    applicableWhen: 'Claude Code sessions that have been running for a while',
  },
  {
    id: 'tip-5',
    title: 'Set Explicit max_tokens',
    description:
      'Always specify max_tokens appropriate to your task. Leaving it at maximum means you pay for output capacity you rarely use, and open-ended prompts can over-generate.',
    savingsEstimate: 'Varies — 10–40% on verbose tasks',
    category: 'prompt-engineering',
    applicableWhen: 'Output length is predictable (e.g., structured JSON, summaries)',
  },
  {
    id: 'tip-6',
    title: 'Cache Tool Definitions',
    description:
      'If you use many tools, put a cache_control breakpoint after your tool definitions. They rarely change but add thousands of tokens per request.',
    savingsEstimate: 'Up to 90% on tool-heavy apps',
    category: 'caching',
    applicableWhen: 'You define 3+ tools that remain constant across requests',
  },
  {
    id: 'tip-7',
    title: 'Use Streaming Wisely',
    description:
      "Streaming doesn't affect token costs, but it reduces perceived latency. For batch workloads, non-streaming is fine. For interactive UIs, streaming improves UX at zero extra cost.",
    savingsEstimate: 'No direct savings, better UX',
    category: 'prompt-engineering',
    applicableWhen: 'Building interactive chat interfaces',
  },
  {
    id: 'tip-8',
    title: 'Combine Caching + Batching',
    description:
      'For maximum savings, use prompt caching on the static parts of your prompt AND the Batch API for the dynamic parts. Cache reads at 50% off already; batch adds another 50%.',
    savingsEstimate: 'Up to 95% on cacheable batch jobs',
    category: 'batching',
    applicableWhen: 'High-volume jobs with large shared context',
  },
  {
    id: 'tip-9',
    title: 'Shorten System Prompts',
    description:
      'Every request includes your system prompt. Trim redundant instructions, use bullet points over paragraphs, and remove examples that can be moved to few-shot in user turns.',
    savingsEstimate: '5–20% per request',
    category: 'prompt-engineering',
    applicableWhen: 'System prompt is longer than 500 tokens',
  },
  {
    id: 'tip-10',
    title: 'Monitor Costs with /cost',
    description:
      'In Claude Code, run /cost to see the session token spend. Use this to identify expensive operations and decide when to /compact or switch to a cheaper model.',
    savingsEstimate: 'Visibility → informed decisions',
    category: 'context',
    applicableWhen: 'Always — especially in long Claude Code sessions',
  },
];

export function getTipsForContext(
  inputTokens: number,
  outputTokens: number,
  cachedTokens: number,
  useBatch: boolean
): OptimizationTip[] {
  const tips: OptimizationTip[] = [];

  if (cachedTokens === 0 && inputTokens > 500) {
    tips.push(optimizationTips.find(t => t.id === 'tip-1')!);
  }
  if (!useBatch && inputTokens > 1000) {
    tips.push(optimizationTips.find(t => t.id === 'tip-2')!);
  }
  if (inputTokens > 2000) {
    tips.push(optimizationTips.find(t => t.id === 'tip-3')!);
  }
  if (cachedTokens > 0 && !useBatch) {
    tips.push(optimizationTips.find(t => t.id === 'tip-8')!);
  }

  // Always suggest at least one tip
  if (tips.length === 0) {
    tips.push(optimizationTips[0]);
    tips.push(optimizationTips[4]);
  }

  return tips.slice(0, 3);
}

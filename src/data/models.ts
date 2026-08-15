import type { ClaudeModel } from '@/types/model';

/**
 * Standard Claude API pricing, USD per million tokens.
 *
 * Cache writes are 1.25x the input rate; cache reads are 0.1x the input rate.
 * Batch API applies a further 50% discount to every token type.
 */
export const claudeModels: ClaudeModel[] = [
  {
    id: 'claude-fable-5',
    displayName: 'Claude Fable 5',
    family: 'claude-5',
    pricing: {
      inputPerMillion: 10.0,
      outputPerMillion: 50.0,
      cacheWritePerMillion: 12.5,
      cacheReadPerMillion: 1.0,
    },
    supportsBatchApi: true,
    supportsPromptCaching: true,
    contextWindow: 1_000_000,
    description: 'Most capable model, for the most demanding reasoning and long-horizon agentic work.',
  },
  {
    id: 'claude-opus-5',
    displayName: 'Claude Opus 5',
    family: 'claude-5',
    pricing: {
      inputPerMillion: 5.0,
      outputPerMillion: 25.0,
      cacheWritePerMillion: 6.25,
      cacheReadPerMillion: 0.5,
    },
    supportsBatchApi: true,
    supportsPromptCaching: true,
    contextWindow: 1_000_000,
    description: 'Complex agentic coding and deep reasoning at half the cost of Fable 5.',
  },
  {
    id: 'claude-sonnet-5',
    displayName: 'Claude Sonnet 5',
    family: 'claude-5',
    pricing: {
      inputPerMillion: 3.0,
      outputPerMillion: 15.0,
      cacheWritePerMillion: 3.75,
      cacheReadPerMillion: 0.3,
    },
    supportsBatchApi: true,
    supportsPromptCaching: true,
    contextWindow: 1_000_000,
    description: 'Best balance of speed and intelligence — near-Opus quality on coding and agentic work.',
  },
  {
    id: 'claude-haiku-4-5',
    displayName: 'Claude Haiku 4.5',
    family: 'claude-4',
    pricing: {
      inputPerMillion: 1.0,
      outputPerMillion: 5.0,
      cacheWritePerMillion: 1.25,
      cacheReadPerMillion: 0.1,
    },
    supportsBatchApi: true,
    supportsPromptCaching: true,
    contextWindow: 200_000,
    description: 'Fastest and cheapest — ideal for mechanical, high-volume, and simpler tasks.',
  },
  {
    id: 'claude-opus-4-8',
    displayName: 'Claude Opus 4.8',
    family: 'claude-4',
    pricing: {
      inputPerMillion: 5.0,
      outputPerMillion: 25.0,
      cacheWritePerMillion: 6.25,
      cacheReadPerMillion: 0.5,
    },
    supportsBatchApi: true,
    supportsPromptCaching: true,
    contextWindow: 1_000_000,
    description: 'Previous-generation Opus — highly autonomous on long-horizon agentic work.',
  },
  {
    id: 'claude-sonnet-4-6',
    displayName: 'Claude Sonnet 4.6',
    family: 'claude-4',
    pricing: {
      inputPerMillion: 3.0,
      outputPerMillion: 15.0,
      cacheWritePerMillion: 3.75,
      cacheReadPerMillion: 0.3,
    },
    supportsBatchApi: true,
    supportsPromptCaching: true,
    contextWindow: 1_000_000,
    description: 'Previous-generation Sonnet — still a strong everyday engineering model.',
  },
];

export const defaultModel = claudeModels.find(m => m.id === 'claude-sonnet-5')!;

export function getModelById(id: string): ClaudeModel | undefined {
  return claudeModels.find(m => m.id === id);
}

export function calculateCost(
  model: ClaudeModel,
  inputTokens: number,
  outputTokens: number,
  cachedInputTokens: number = 0,
  useBatch: boolean = false
): {
  inputCost: number;
  outputCost: number;
  cachedInputCost: number;
  total: number;
} {
  const batchMultiplier = useBatch && model.supportsBatchApi ? 0.5 : 1;

  const regularInputTokens = inputTokens - cachedInputTokens;
  const inputCost = (regularInputTokens / 1_000_000) * model.pricing.inputPerMillion * batchMultiplier;
  const outputCost = (outputTokens / 1_000_000) * model.pricing.outputPerMillion * batchMultiplier;
  const cachedInputCost = model.supportsPromptCaching && model.pricing.cacheReadPerMillion
    ? (cachedInputTokens / 1_000_000) * model.pricing.cacheReadPerMillion * batchMultiplier
    : (cachedInputTokens / 1_000_000) * model.pricing.inputPerMillion * batchMultiplier;

  return {
    inputCost,
    outputCost,
    cachedInputCost,
    total: inputCost + outputCost + cachedInputCost,
  };
}

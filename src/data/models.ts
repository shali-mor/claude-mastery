import type { ClaudeModel } from '@/types/model';

export const claudeModels: ClaudeModel[] = [
  {
    id: 'claude-opus-4-6',
    displayName: 'Claude Opus 4.6',
    family: 'claude-4',
    pricing: {
      inputPerMillion: 15.00,
      outputPerMillion: 75.00,
      cacheWritePerMillion: 18.75,
      cacheReadPerMillion: 1.50,
    },
    supportsBatchApi: true,
    supportsPromptCaching: true,
    contextWindow: 200000,
    description: 'Most powerful model for complex reasoning, research, and nuanced tasks.',
  },
  {
    id: 'claude-sonnet-4-6',
    displayName: 'Claude Sonnet 4.6',
    family: 'claude-4',
    pricing: {
      inputPerMillion: 3.00,
      outputPerMillion: 15.00,
      cacheWritePerMillion: 3.75,
      cacheReadPerMillion: 0.30,
    },
    supportsBatchApi: true,
    supportsPromptCaching: true,
    contextWindow: 200000,
    description: 'Best balance of intelligence and speed. Ideal for most production workloads.',
  },
  {
    id: 'claude-haiku-4-5-20251001',
    displayName: 'Claude Haiku 4.5',
    family: 'claude-4',
    pricing: {
      inputPerMillion: 0.80,
      outputPerMillion: 4.00,
      cacheWritePerMillion: 1.00,
      cacheReadPerMillion: 0.08,
    },
    supportsBatchApi: true,
    supportsPromptCaching: true,
    contextWindow: 200000,
    description: 'Fastest and most cost-effective. Perfect for high-volume, simpler tasks.',
  },
  {
    id: 'claude-3-7-sonnet-20250219',
    displayName: 'Claude 3.7 Sonnet',
    family: 'claude-3-7',
    pricing: {
      inputPerMillion: 3.00,
      outputPerMillion: 15.00,
      cacheWritePerMillion: 3.75,
      cacheReadPerMillion: 0.30,
    },
    supportsBatchApi: true,
    supportsPromptCaching: true,
    contextWindow: 200000,
    description: 'Previous-generation Sonnet with extended thinking capabilities.',
  },
  {
    id: 'claude-3-5-sonnet-20241022',
    displayName: 'Claude 3.5 Sonnet',
    family: 'claude-3-5',
    pricing: {
      inputPerMillion: 3.00,
      outputPerMillion: 15.00,
      cacheWritePerMillion: 3.75,
      cacheReadPerMillion: 0.30,
    },
    supportsBatchApi: true,
    supportsPromptCaching: true,
    contextWindow: 200000,
    description: 'Highly capable model with strong coding and analysis abilities.',
  },
  {
    id: 'claude-3-5-haiku-20241022',
    displayName: 'Claude 3.5 Haiku',
    family: 'claude-3-5',
    pricing: {
      inputPerMillion: 0.80,
      outputPerMillion: 4.00,
      cacheWritePerMillion: 1.00,
      cacheReadPerMillion: 0.08,
    },
    supportsBatchApi: true,
    supportsPromptCaching: true,
    contextWindow: 200000,
    description: 'Fast and affordable with improved capabilities over Haiku 3.',
  },
];

export const defaultModel = claudeModels.find(m => m.id === 'claude-sonnet-4-6')!;

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

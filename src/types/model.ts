export interface ModelPricing {
  inputPerMillion: number;
  outputPerMillion: number;
  cacheWritePerMillion?: number;
  cacheReadPerMillion?: number;
}

export type ModelFamily = 'claude-4' | 'claude-3-7' | 'claude-3-5' | 'claude-3';

export interface ClaudeModel {
  id: string;
  displayName: string;
  family: ModelFamily;
  pricing: ModelPricing;
  supportsBatchApi: boolean;
  supportsPromptCaching: boolean;
  contextWindow: number;
  description: string;
}

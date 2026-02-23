export type MessageRole = 'user' | 'assistant';

export interface PlaygroundMessage {
  id: string;
  role: MessageRole;
  content: string;
  tokenCount?: number;
  timestamp: number;
}

export interface PlaygroundSession {
  id: string;
  title: string;
  model: string;
  systemPrompt: string;
  messages: PlaygroundMessage[];
  totalInputTokens: number;
  totalOutputTokens: number;
  createdAt: number;
  updatedAt: number;
}

'use client';

import { useCallback } from 'react';
import { usePlayground } from '@/store';
import { useApiKey } from './useApiKey';
import { generateId } from '@/lib/utils';
import type { PlaygroundMessage } from '@/types/playground';

interface StreamOptions {
  sessionId: string;
  messages: Array<{ role: 'user' | 'assistant'; content: string }>;
  model: string;
  system?: string;
  maxTokens?: number;
}

export function useStreamingChat() {
  const { addMessage, updateLastAssistantMessage, setStreaming, updateSessionMeta } = usePlayground();
  const { getKey } = useApiKey();

  const sendMessage = useCallback(async (opts: StreamOptions): Promise<void> => {
    const apiKey = getKey();
    if (!apiKey) throw new Error('No API key set');

    setStreaming(true);

    // Add placeholder assistant message
    const assistantMsg: PlaygroundMessage = {
      id: generateId(),
      role: 'assistant',
      content: '',
      timestamp: Date.now(),
    };
    addMessage(opts.sessionId, assistantMsg);

    try {
      const res = await fetch('/api/chat', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'X-Anthropic-Key': apiKey,
        },
        body: JSON.stringify({
          messages: opts.messages,
          model: opts.model,
          system: opts.system,
          maxTokens: opts.maxTokens ?? 2048,
        }),
      });

      if (!res.ok) {
        const err = await res.text();
        throw new Error(`API error: ${res.status} — ${err}`);
      }

      const reader = res.body?.getReader();
      if (!reader) throw new Error('No response body');

      const decoder = new TextDecoder();
      let accumulated = '';
      let inputTokens = 0;
      let outputTokens = 0;

      while (true) {
        const { done, value } = await reader.read();
        if (done) break;

        const chunk = decoder.decode(value, { stream: true });
        const lines = chunk.split('\n');

        for (const line of lines) {
          if (line.startsWith('data: ')) {
            const data = line.slice(6).trim();
            if (data === '[DONE]') continue;
            try {
              const parsed = JSON.parse(data);
              if (parsed.type === 'content_block_delta' && parsed.delta?.type === 'text_delta') {
                accumulated += parsed.delta.text;
                updateLastAssistantMessage(opts.sessionId, accumulated);
              }
              if (parsed.type === 'message_delta' && parsed.usage) {
                outputTokens = parsed.usage.output_tokens ?? 0;
              }
              if (parsed.type === 'message_start' && parsed.message?.usage) {
                inputTokens = parsed.message.usage.input_tokens ?? 0;
              }
            } catch {
              // non-JSON lines, skip
            }
          }
        }
      }

      updateSessionMeta(opts.sessionId, inputTokens, outputTokens);
    } finally {
      setStreaming(false);
    }
  }, [getKey, addMessage, updateLastAssistantMessage, setStreaming, updateSessionMeta]);

  return { sendMessage };
}

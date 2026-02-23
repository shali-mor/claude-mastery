import type { PlaygroundSession, PlaygroundMessage } from '@/types/playground';
import { generateId } from '@/lib/utils';

export interface PlaygroundState {
  sessions: PlaygroundSession[];
  activeSessionId: string | null;
  isStreaming: boolean;
}

export const initialPlaygroundState: PlaygroundState = {
  sessions: [],
  activeSessionId: null,
  isStreaming: false,
};

export const createPlaygroundSlice = (set: (fn: (s: PlaygroundState) => PlaygroundState) => void, get: () => PlaygroundState) => ({
  ...initialPlaygroundState,

  createSession: (model: string, systemPrompt: string = ''): string => {
    const id = generateId();
    const session: PlaygroundSession = {
      id,
      title: 'New Chat',
      model,
      systemPrompt,
      messages: [],
      totalInputTokens: 0,
      totalOutputTokens: 0,
      createdAt: Date.now(),
      updatedAt: Date.now(),
    };
    set(s => ({ ...s, sessions: [...s.sessions, session], activeSessionId: id }));
    return id;
  },

  setActiveSession: (id: string) => set(s => ({ ...s, activeSessionId: id })),

  addMessage: (sessionId: string, message: PlaygroundMessage) =>
    set(s => ({
      ...s,
      sessions: s.sessions.map(sess => {
        if (sess.id !== sessionId) return sess;
        // Guard: keep at most 100 messages to prevent unbounded memory growth
        const messages = [...sess.messages, message];
        const capped = messages.length > 100 ? messages.slice(messages.length - 100) : messages;
        return { ...sess, messages: capped, updatedAt: Date.now() };
      }),
    })),

  updateLastAssistantMessage: (sessionId: string, content: string) =>
    set(s => ({
      ...s,
      sessions: s.sessions.map(sess => {
        if (sess.id !== sessionId) return sess;
        const msgs = [...sess.messages];
        const last = msgs[msgs.length - 1];
        if (last?.role === 'assistant') {
          msgs[msgs.length - 1] = { ...last, content };
        }
        return { ...sess, messages: msgs, updatedAt: Date.now() };
      }),
    })),

  setStreaming: (val: boolean) => set(s => ({ ...s, isStreaming: val })),

  updateSessionMeta: (sessionId: string, inputTokens: number, outputTokens: number) =>
    set(s => ({
      ...s,
      sessions: s.sessions.map(sess =>
        sess.id === sessionId
          ? {
              ...sess,
              totalInputTokens: sess.totalInputTokens + inputTokens,
              totalOutputTokens: sess.totalOutputTokens + outputTokens,
            }
          : sess
      ),
    })),

  clearSession: (sessionId: string) =>
    set(s => ({
      ...s,
      sessions: s.sessions.map(sess =>
        sess.id === sessionId ? { ...sess, messages: [], totalInputTokens: 0, totalOutputTokens: 0 } : sess
      ),
    })),

  updateSystemPrompt: (sessionId: string, systemPrompt: string) =>
    set(s => ({
      ...s,
      sessions: s.sessions.map(sess =>
        sess.id === sessionId ? { ...sess, systemPrompt } : sess
      ),
    })),

  updateModel: (sessionId: string, model: string) =>
    set(s => ({
      ...s,
      sessions: s.sessions.map(sess =>
        sess.id === sessionId ? { ...sess, model } : sess
      ),
    })),
});

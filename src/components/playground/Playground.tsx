'use client';

import { useState, useRef, useEffect } from 'react';
import { Send, Trash2, Settings2, Loader2, Key, X } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';
import { Badge } from '@/components/ui/badge';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Slider } from '@/components/ui/slider';
import { Label } from '@/components/ui/label';
import { ApiKeyGate } from './ApiKeyGate';
import { usePlayground, useSettings } from '@/store';
import { useStreamingChat } from '@/hooks/useStreamingChat';
import { useApiKey } from '@/hooks/useApiKey';
import { claudeModels } from '@/data/models';
import { generateId, formatTokens, formatCost } from '@/lib/utils';
import type { PlaygroundMessage } from '@/types/playground';

export function Playground() {
  const { hasApiKey, preferredModel } = useSettings();
  const { sessions, activeSessionId, createSession, addMessage, clearSession, updateSystemPrompt, updateModel, isStreaming } = usePlayground();
  const { sendMessage } = useStreamingChat();
  const { removeKey } = useApiKey();

  const [input, setInput] = useState('');
  const [systemPrompt, setSystemPrompt] = useState('You are a helpful assistant.');
  const [maxTokens, setMaxTokens] = useState(2048);
  const [showSettings, setShowSettings] = useState(false);
  const bottomRef = useRef<HTMLDivElement>(null);
  const textareaRef = useRef<HTMLTextAreaElement>(null);

  // Ensure an active session
  useEffect(() => {
    if (!activeSessionId) {
      createSession(preferredModel, systemPrompt);
    }
  }, []); // eslint-disable-line

  const activeSession = sessions.find(s => s.id === activeSessionId);

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [activeSession?.messages.length]);

  if (!hasApiKey) {
    return <ApiKeyGate />;
  }

  const handleSend = async () => {
    const text = input.trim();
    if (!text || isStreaming || !activeSessionId) return;

    setInput('');

    const userMsg: PlaygroundMessage = {
      id: generateId(),
      role: 'user',
      content: text,
      timestamp: Date.now(), // eslint-disable-line react-hooks/purity
    };
    addMessage(activeSessionId, userMsg);

    const conversationMessages = [
      ...(activeSession?.messages ?? []),
      userMsg,
    ].map(m => ({ role: m.role, content: m.content }));

    try {
      await sendMessage({
        sessionId: activeSessionId,
        messages: conversationMessages,
        model: activeSession?.model ?? preferredModel,
        system: activeSession?.systemPrompt || undefined,
        maxTokens,
      });
    } catch (err) {
      const errorMsg: PlaygroundMessage = {
        id: generateId(),
        role: 'assistant',
        content: `Error: ${err instanceof Error ? err.message : 'Unknown error'}`,
        timestamp: Date.now(), // eslint-disable-line react-hooks/purity
      };
      addMessage(activeSessionId, errorMsg);
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSend();
    }
  };

  const totalCost = activeSession
    ? formatCost(
        (activeSession.totalInputTokens / 1_000_000) * (claudeModels.find(m => m.id === activeSession.model)?.pricing.inputPerMillion ?? 3) +
        (activeSession.totalOutputTokens / 1_000_000) * (claudeModels.find(m => m.id === activeSession.model)?.pricing.outputPerMillion ?? 15)
      )
    : '$0';

  return (
    <div className="flex flex-col h-full max-h-[calc(100vh-64px)]">
      {/* Top bar */}
      <div className="flex items-center justify-between px-4 py-3 border-b border-border bg-card/50">
        <div className="flex items-center gap-3">
          <Select
            value={activeSession?.model ?? preferredModel}
            onValueChange={model => {
              if (activeSessionId) updateModel(activeSessionId, model);
            }}
          >
            <SelectTrigger className="w-48 h-8 text-xs">
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              {claudeModels.map(m => (
                <SelectItem key={m.id} value={m.id} className="text-xs">
                  {m.displayName}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>

          <div className="flex items-center gap-2 text-xs text-muted-foreground">
            <span>{formatTokens((activeSession?.totalInputTokens ?? 0) + (activeSession?.totalOutputTokens ?? 0))} tokens</span>
            <span>·</span>
            <span>~{totalCost}</span>
          </div>
        </div>

        <div className="flex items-center gap-2">
          <Button
            variant="ghost"
            size="icon"
            className="h-8 w-8"
            onClick={() => setShowSettings(!showSettings)}
            aria-label="Settings"
          >
            <Settings2 className="h-4 w-4" />
          </Button>
          <Button
            variant="ghost"
            size="icon"
            className="h-8 w-8"
            onClick={() => activeSessionId && clearSession(activeSessionId)}
            aria-label="Clear conversation"
          >
            <Trash2 className="h-4 w-4" />
          </Button>
          <Button
            variant="ghost"
            size="icon"
            className="h-8 w-8"
            onClick={removeKey}
            aria-label="Remove API key"
          >
            <Key className="h-4 w-4" />
          </Button>
        </div>
      </div>

      {/* Settings panel */}
      {showSettings && (
        <div className="px-4 py-3 border-b border-border bg-muted/20 space-y-4">
          <div className="flex items-start justify-between">
            <h3 className="text-sm font-medium">Settings</h3>
            <button onClick={() => setShowSettings(false)} className="text-muted-foreground hover:text-foreground">
              <X className="h-4 w-4" />
            </button>
          </div>
          <div className="space-y-2">
            <Label className="text-xs">System Prompt</Label>
            <Textarea
              value={activeSession?.systemPrompt ?? systemPrompt}
              onChange={e => {
                setSystemPrompt(e.target.value);
                if (activeSessionId) updateSystemPrompt(activeSessionId, e.target.value);
              }}
              rows={3}
              className="text-xs font-mono resize-none"
              placeholder="You are a helpful assistant."
            />
          </div>
          <div className="space-y-2">
            <div className="flex justify-between">
              <Label className="text-xs">Max Tokens</Label>
              <span className="text-xs font-mono text-muted-foreground">{maxTokens}</span>
            </div>
            <Slider
              value={[maxTokens]}
              onValueChange={([v]) => setMaxTokens(v)}
              min={256}
              max={8192}
              step={256}
            />
          </div>
        </div>
      )}

      {/* Messages */}
      <div className="flex-1 overflow-y-auto px-4 py-4 space-y-4">
        {(!activeSession || activeSession.messages.length === 0) && (
          <div className="flex flex-col items-center justify-center h-full text-center text-muted-foreground py-16">
            <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center mb-4">
              <Send className="h-5 w-5 text-primary" />
            </div>
            <p className="font-medium mb-1">Start a conversation</p>
            <p className="text-sm">Type a message below to chat with {claudeModels.find(m => m.id === activeSession?.model)?.displayName ?? 'Claude'}.</p>
          </div>
        )}

        {activeSession?.messages.map(msg => (
          <div
            key={msg.id}
            className={`flex ${msg.role === 'user' ? 'justify-end' : 'justify-start'}`}
          >
            <div
              className={`max-w-[80%] rounded-2xl px-4 py-3 text-sm leading-relaxed ${
                msg.role === 'user'
                  ? 'bg-primary text-primary-foreground rounded-br-sm'
                  : 'bg-muted text-foreground rounded-bl-sm'
              }`}
            >
              {msg.role === 'assistant' && msg.content === '' && isStreaming ? (
                <span className="flex items-center gap-2 text-muted-foreground">
                  <Loader2 className="h-3.5 w-3.5 animate-spin" />
                  <span>Thinking...</span>
                </span>
              ) : (
                <pre className="whitespace-pre-wrap font-sans">{msg.content}</pre>
              )}
            </div>
          </div>
        ))}
        <div ref={bottomRef} />
      </div>

      {/* Input */}
      <div className="px-4 py-4 border-t border-border bg-card/50">
        <div className="flex gap-2 items-end">
          <Textarea
            ref={textareaRef}
            value={input}
            onChange={e => setInput(e.target.value)}
            onKeyDown={handleKeyDown}
            placeholder="Message Claude… (Enter to send, Shift+Enter for newline)"
            className="resize-none min-h-[44px] max-h-40 text-sm"
            rows={1}
            disabled={isStreaming}
          />
          <Button
            onClick={handleSend}
            disabled={!input.trim() || isStreaming}
            size="icon"
            className="h-11 w-11 flex-shrink-0"
          >
            {isStreaming
              ? <Loader2 className="h-4 w-4 animate-spin" />
              : <Send className="h-4 w-4" />
            }
          </Button>
        </div>
        <p className="text-xs text-muted-foreground mt-2 text-center">
          Using your personal API key · Never stored on any server
        </p>
      </div>
    </div>
  );
}

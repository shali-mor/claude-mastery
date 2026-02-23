'use client';

import { useState } from 'react';
import { Lock, Eye, EyeOff, ExternalLink } from 'lucide-react';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { useApiKey } from '@/hooks/useApiKey';

export function ApiKeyGate() {
  const { saveKey } = useApiKey();
  const [value, setValue] = useState('');
  const [show, setShow] = useState(false);
  const [error, setError] = useState('');

  const handleSave = () => {
    if (!value.startsWith('sk-ant-')) {
      setError('API key must start with "sk-ant-"');
      return;
    }
    if (value.length < 20) {
      setError('API key appears to be too short.');
      return;
    }
    saveKey(value.trim());
    setValue('');
    setError('');
  };

  return (
    <div className="flex items-center justify-center h-full p-8">
      <Card className="w-full max-w-md">
        <CardHeader>
          <div className="flex items-center gap-3 mb-2">
            <div className="w-10 h-10 rounded-xl bg-primary/10 flex items-center justify-center">
              <Lock className="h-5 w-5 text-primary" />
            </div>
            <CardTitle>Enter your API Key</CardTitle>
          </div>
        </CardHeader>
        <CardContent className="space-y-4">
          <p className="text-sm text-muted-foreground">
            Your API key is stored locally in your browser and sent directly to the Anthropic API.
            It is never stored on any server.
          </p>

          <div className="relative">
            <Input
              type={show ? 'text' : 'password'}
              placeholder="sk-ant-..."
              value={value}
              onChange={e => { setValue(e.target.value); setError(''); }}
              onKeyDown={e => e.key === 'Enter' && handleSave()}
              className="pr-10 font-mono text-sm"
              autoComplete="off"
              autoCorrect="off"
              autoCapitalize="off"
              spellCheck={false}
            />
            <button
              type="button"
              onClick={() => setShow(!show)}
              className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground"
              aria-label={show ? 'Hide key' : 'Show key'}
            >
              {show ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
            </button>
          </div>

          {error && <p className="text-sm text-destructive">{error}</p>}

          <Button onClick={handleSave} className="w-full" disabled={!value.trim()}>
            Save API Key
          </Button>

          <p className="text-xs text-muted-foreground text-center">
            Don&apos;t have a key?{' '}
            <a
              href="https://console.anthropic.com/settings/keys"
              target="_blank"
              rel="noopener noreferrer"
              className="text-primary hover:underline inline-flex items-center gap-0.5"
            >
              Get one at console.anthropic.com
              <ExternalLink className="h-3 w-3" />
            </a>
          </p>
        </CardContent>
      </Card>
    </div>
  );
}

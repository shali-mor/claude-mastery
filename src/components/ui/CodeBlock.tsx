'use client';

import { useState, useEffect } from 'react';
import { Check, Copy } from 'lucide-react';
import { cn } from '@/lib/utils';
import type { BundledLanguage, BundledTheme } from 'shiki';

interface CodeBlockProps {
  code: string;
  language?: string;
  className?: string;
}

// Map common aliases to bundled shiki language IDs
const LANG_MAP: Record<string, BundledLanguage> = {
  bash: 'bash', sh: 'bash', shell: 'bash', zsh: 'bash',
  typescript: 'typescript', ts: 'typescript',
  javascript: 'javascript', js: 'javascript',
  tsx: 'tsx', jsx: 'jsx',
  json: 'json',
  css: 'css', html: 'html',
  markdown: 'markdown', md: 'markdown',
  python: 'python', py: 'python',
  yaml: 'yaml', yml: 'yaml',
};

const LIGHT_THEME: BundledTheme = 'github-light';
const DARK_THEME: BundledTheme = 'github-dark-dimmed';

export function CodeBlock({ code, language = 'bash', className }: CodeBlockProps) {
  const [copied, setCopied] = useState(false);
  const [highlighted, setHighlighted] = useState<string | null>(null);

  const lang: BundledLanguage = LANG_MAP[language.toLowerCase()] ?? 'bash';

  useEffect(() => {
    let cancelled = false;

    import('shiki').then(({ getSingletonHighlighter }) => {
      getSingletonHighlighter({
        langs: [lang],
        themes: [LIGHT_THEME, DARK_THEME],
      }).then(hl => {
        if (cancelled) return;
        const html = hl.codeToHtml(code, {
          lang,
          themes: { light: LIGHT_THEME, dark: DARK_THEME },
          defaultColor: false,
        });
        setHighlighted(html);
      }).catch(() => { /* use plain fallback */ });
    }).catch(() => { /* use plain fallback */ });

    return () => { cancelled = true; };
  }, [code, lang]);

  const copy = async () => {
    await navigator.clipboard.writeText(code);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className={cn('relative rounded-lg overflow-hidden border border-border', className)}>
      {/* Header bar */}
      <div className="flex items-center justify-between px-4 py-2 bg-muted/50 border-b border-border">
        <span className="text-xs text-muted-foreground font-mono">{language}</span>
        <button
          onClick={copy}
          className="flex items-center gap-1.5 text-xs text-muted-foreground hover:text-foreground transition-colors"
          aria-label="Copy code to clipboard"
        >
          {copied ? (
            <>
              <Check className="h-3.5 w-3.5 text-green-500" />
              <span className="text-green-500">Copied!</span>
            </>
          ) : (
            <>
              <Copy className="h-3.5 w-3.5" />
              <span>Copy</span>
            </>
          )}
        </button>
      </div>

      {highlighted ? (
        // Shiki-rendered HTML — strip Shiki's background so our app theme shows through
        <div
          className="shiki-wrapper overflow-x-auto text-sm leading-relaxed
            [&_.shiki]:!bg-transparent [&_pre]:!bg-transparent [&_code]:!bg-transparent
            [&_pre]:p-4 [&_pre]:m-0 [&_pre]:font-mono bg-muted/20"
          dangerouslySetInnerHTML={{ __html: highlighted }}
        />
      ) : (
        // Plain fallback while shiki initialises
        <pre className="p-4 overflow-x-auto bg-muted/20">
          <code className="text-sm font-mono leading-relaxed text-foreground">
            {code}
          </code>
        </pre>
      )}
    </div>
  );
}

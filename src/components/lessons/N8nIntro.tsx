'use client';

import { ExternalLink } from 'lucide-react';

// n8n brand colour: #EA4B71 (pink-red)
export default function N8nIntro() {
  return (
    <div className="flex items-center gap-5 rounded-xl border-2 border-[#EA4B71]/30 bg-[#EA4B71]/5 px-5 py-4">
      {/* n8n wordmark badge */}
      <div
        className="shrink-0 flex items-center justify-center w-14 h-14 rounded-2xl text-white font-black text-xl tracking-tighter select-none"
        style={{ background: 'linear-gradient(135deg, #EA4B71 0%, #c4365a 100%)' }}
        aria-hidden="true"
      >
        n8n
      </div>

      <div className="flex-1 min-w-0">
        <p className="text-sm font-semibold text-foreground leading-snug">
          n8n — Open-Source Workflow Automation
        </p>
        <p className="text-xs text-muted-foreground mt-1 leading-relaxed">
          Visual workflow builder · Self-hostable · 400+ integrations · Free for self-hosted deployments
        </p>
      </div>

      <a
        href="https://n8n.io"
        target="_blank"
        rel="noopener noreferrer"
        className="shrink-0 flex items-center gap-1.5 text-xs font-medium text-[#EA4B71] hover:underline"
      >
        n8n.io
        <ExternalLink className="h-3 w-3" />
      </a>
    </div>
  );
}

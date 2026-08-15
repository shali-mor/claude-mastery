'use client';

import { Printer, BookMarked } from 'lucide-react';
import { Cheatsheet } from '@/components/cheatsheet/Cheatsheet';

export default function CheatsheetPage() {
  return (
    <div className="min-h-screen pb-16 print:pb-0">

      {/* Hero */}
      <div className="border-b bg-card px-6 py-8 print:py-4">
        <div className="max-w-5xl mx-auto flex items-start justify-between gap-4 flex-wrap">
          <div className="flex items-center gap-3">
            <div className="p-2 rounded-lg bg-primary/10">
              <BookMarked className="h-6 w-6 text-primary" />
            </div>
            <div>
              <h1 className="text-2xl font-bold tracking-tight">
                Claude Code Mastery <span className="text-primary">Cheatsheet</span>
              </h1>
              <p className="text-xs text-muted-foreground mt-0.5">
                2026 Edition · Getting Started · Memory · Skills · Hooks · Context · Cost · Keyboard
              </p>
            </div>
          </div>
          <button
            onClick={() => window.print()}
            className="print:hidden flex items-center gap-2 px-3 py-2 rounded-lg border bg-card hover:bg-muted text-sm font-medium transition-colors"
          >
            <Printer className="h-4 w-4" />
            Print / Save PDF
          </button>
        </div>
      </div>

      {/* Cheatsheet */}
      <div className="max-w-5xl mx-auto px-4 py-6 print:px-2 print:py-2">
        <Cheatsheet />
      </div>

      {/* Print styles */}
      <style>{`
        @media print {
          @page { size: A4; margin: 10mm 8mm; }

          /* Hide chrome */
          nav, aside, header, footer,
          [data-sidebar], .print\\:hidden { display: none !important; }

          /* Unclamp the AppShell so content flows across pages */
          body, html { height: auto !important; overflow: visible !important; background: white !important; }
          body > div, body > div > div,
          main, [class*="flex"][class*="h-screen"],
          [class*="overflow-hidden"], [class*="overflow-y-auto"] {
            height: auto !important;
            overflow: visible !important;
            display: block !important;
          }

          /* Preserve colors */
          * { -webkit-print-color-adjust: exact !important; print-color-adjust: exact !important; }

          /* Force all accordion sections open */
          [data-section-content] { display: block !important; }
          [data-section-toggle] svg { display: none !important; }

          /* Page break control */
          [data-section-card] { break-inside: avoid; }

          /* 2-column grid for A4 width */
          [data-cheatsheet-grid] {
            display: grid !important;
            grid-template-columns: 1fr 1fr !important;
            gap: 8px !important;
          }

          /* Compact spacing */
          [data-section-card] { font-size: 9px !important; }
          [data-section-card] pre { font-size: 8.5px !important; padding: 4px !important; }
          [data-section-card] button { padding: 6px 8px !important; }
          [data-section-card] > div:last-child { padding: 4px 8px 6px !important; }
        }
      `}</style>
    </div>
  );
}

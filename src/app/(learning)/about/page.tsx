'use client';

import { motion } from 'framer-motion';
import { Code2, BookOpen, Terminal, DollarSign, Layers, Github, Sparkles } from 'lucide-react';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';

const features = [
  { icon: BookOpen,   label: '6 Modules',        desc: 'From basics to advanced API mastery' },
  { icon: Terminal,   label: 'Command Browser',   desc: '76+ slash commands, hooks, skills & CLI flags' },
  { icon: DollarSign, label: 'Cost Calculator',   desc: 'Real 2026 pricing with Batch & cache scenarios' },
  { icon: Code2,      label: 'Live Playground',   desc: 'Stream Claude responses with your own API key' },
  { icon: Layers,     label: 'Flashcard Mode',    desc: 'Active recall for every command in the catalog' },
  { icon: Sparkles,   label: 'Interactive Quizzes', desc: 'Inline knowledge checks at the end of every module' },
];

const stack = ['Next.js 16', 'TypeScript', 'Tailwind CSS', 'shadcn/ui', 'Zustand', 'Framer Motion', 'Shiki', 'Recharts', 'Anthropic SDK'];

export default function AboutPage() {
  return (
    <div className="max-w-3xl mx-auto px-6 py-10">
      <motion.div initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.4 }}>

        {/* Hero */}
        <div className="flex items-center gap-4 mb-8">
          <div className="w-14 h-14 rounded-2xl bg-primary flex items-center justify-center flex-shrink-0">
            <Code2 className="h-7 w-7 text-primary-foreground" />
          </div>
          <div>
            <h1 className="text-2xl font-bold">Claude Mastery</h1>
            <p className="text-muted-foreground text-sm">Interactive learning for Claude Code & API</p>
          </div>
        </div>

        {/* About */}
        <Card className="mb-8 border-primary/20 bg-primary/4">
          <CardContent className="pt-6">
            <p className="text-sm leading-7 mb-4">
              <strong>Claude Mastery</strong> is an interactive learning platform built to help developers
              go from zero to expert with Claude Code and the Anthropic API. It covers everything from
              slash commands and hooks to cost optimisation, live streaming, and writing your own skills.
            </p>
            <p className="text-sm leading-7 text-muted-foreground">
              Built and maintained by <span className="font-semibold text-foreground">Shali Mor</span>.
            </p>
          </CardContent>
        </Card>

        {/* Features */}
        <h2 className="text-base font-semibold mb-4">What's inside</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 mb-10">
          {features.map((f, i) => (
            <motion.div
              key={f.label}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.05 * i }}
            >
              <Card className="hover:border-primary/30 transition-colors h-full">
                <CardContent className="pt-4 flex gap-3">
                  <div className="w-8 h-8 rounded-lg bg-primary/10 flex items-center justify-center flex-shrink-0">
                    <f.icon className="h-4 w-4 text-primary" />
                  </div>
                  <div>
                    <p className="text-sm font-medium">{f.label}</p>
                    <p className="text-xs text-muted-foreground mt-0.5">{f.desc}</p>
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </div>

        {/* Stack */}
        <h2 className="text-base font-semibold mb-3">Built with</h2>
        <div className="flex flex-wrap gap-2 mb-10">
          {stack.map(s => (
            <Badge key={s} variant="secondary" className="text-xs">{s}</Badge>
          ))}
        </div>

        {/* Footer */}
        <div className="flex items-center justify-between pt-6 border-t border-border text-xs text-muted-foreground">
          <span>© 2026 Shali Mor</span>
          <a
            href="https://github.com/shali-mor/claude-mastery"
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-1.5 hover:text-foreground transition-colors"
          >
            <Github className="h-3.5 w-3.5" />
            shali-mor/claude-mastery
          </a>
        </div>

      </motion.div>
    </div>
  );
}

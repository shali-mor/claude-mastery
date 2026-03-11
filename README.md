<div align="center">

<img src="https://cdn.simpleicons.org/anthropic/D97706" alt="Anthropic" width="72" height="72" />

# Claude Mastery

**An interactive learning platform for mastering Claude Code — the Anthropic CLI**

[![Live Demo](https://img.shields.io/badge/Live%20Demo-claude--mastery.vercel.app-orange?style=flat-square&logo=vercel)](https://claude-mastery.vercel.app)
[![Next.js](https://img.shields.io/badge/Next.js-16-black?style=flat-square&logo=next.js)](https://nextjs.org)
[![TypeScript](https://img.shields.io/badge/TypeScript-5-3178C6?style=flat-square&logo=typescript&logoColor=white)](https://www.typescriptlang.org)
[![Tailwind CSS](https://img.shields.io/badge/Tailwind-4-06B6D4?style=flat-square&logo=tailwindcss&logoColor=white)](https://tailwindcss.com)

</div>

---

## What is this?

Claude Mastery is a self-paced course that teaches you how to get the most out of **Claude Code** — Anthropic's AI-powered CLI. It covers everything from first install to building real-world AI automation pipelines.

**12 modules · 60+ lessons · Interactive quizzes · Progress tracking**

## Features

- **Structured curriculum** — modules covering setup, memory, hooks, cost optimization, Plan Mode, MCP, n8n automation, and capstone projects
- **Interactive journey map** — visual progress canvas with an animated walking figure that advances as you complete lessons
- **Progress persistence** — lesson completions and quiz results saved to localStorage
- **Quizzes** — per-module quizzes with instant feedback and score tracking
- **Claude API playground** — live chat playground powered by the Anthropic API
- **Cost calculator** — estimate API costs across Claude model tiers
- **Cheatsheet** — printable quick-reference for all key commands, hooks, and workflows
- **Commands reference** — searchable index of every slash command and skill

## Tech Stack

| Layer | Tech |
|---|---|
| Framework | Next.js 16 (App Router) |
| Language | TypeScript |
| Styling | Tailwind CSS v4 + shadcn/ui |
| Animation | Framer Motion |
| State | Zustand (persisted) |
| Deploy | Vercel |

## Getting Started

```bash
# Install dependencies
npm install

# Add your Anthropic API key (for the playground feature)
cp .env.example .env.local
# → set ANTHROPIC_API_KEY=sk-ant-...

# Run development server
npm run dev
```

Open [http://localhost:3000](http://localhost:3000).

## Project Structure

```
src/
├── app/(learning)/        # All learning routes
│   ├── modules/           # Module list + journey map (List/Map toggle)
│   ├── modules/[id]/[id]  # Lesson viewer
│   ├── quizzes/[id]       # Per-module quiz
│   ├── cheatsheet/        # Printable cheatsheet
│   └── playground/        # Claude API chat
├── components/
│   ├── journey/           # SVG journey map canvas + walker animation
│   ├── modules/           # Module list, lesson content
│   └── layout/            # Sidebar, mobile nav
├── data/                  # modules.ts, quizzes.ts, commands.ts
└── store/                 # Zustand progress store
```

---

<div align="center">
  <sub>Built by <a href="https://github.com/shali-mor">Shali Mor</a></sub>
</div>

'use client';

import { useState, useRef } from 'react';
import Link from 'next/link';
import {
  motion, AnimatePresence,
  useMotionValue, useTransform, animate,
} from 'framer-motion';
import {
  BookOpen, Terminal, DollarSign, Code2, ArrowRight,
  Zap, Award, ChevronRight, CheckCircle2, Layers, Brain, Cpu, Menu,
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import { Show, SignInButton, SignUpButton, UserButton } from '@clerk/nextjs';
import { ThemeToggle } from '@/components/ui/ThemeToggle';
import { Sidebar } from '@/components/layout/Sidebar';
import { useProgress } from '@/store';
import { modules } from '@/data/modules';

const features = [
  {
    icon: BookOpen,
    title: `${modules.length} Learning Modules`,
    description: 'Structured lessons covering Claude Code basics, hooks, MCP, n8n automation, and real-world AI pipelines.',
    href: '/modules',
    color: 'text-blue-500',
    bg: 'bg-blue-500/10',
    glow: 'hover:shadow-blue-500/10',
  },
  {
    icon: Terminal,
    title: 'Command Browser',
    description: 'Searchable catalog of all slash commands, CLI flags, hooks, skills, and keyboard shortcuts.',
    href: '/commands',
    color: 'text-purple-500',
    bg: 'bg-purple-500/10',
    glow: 'hover:shadow-purple-500/10',
  },
  {
    icon: DollarSign,
    title: 'Cost Calculator',
    description: 'Real-time cost estimator with Batch API and prompt caching scenarios for all Claude models.',
    href: '/calculator',
    color: 'text-green-500',
    bg: 'bg-green-500/10',
    glow: 'hover:shadow-green-500/10',
  },
  {
    icon: Code2,
    title: 'Live Playground',
    description: 'Interact with Claude directly — streaming responses, model selection, token tracking.',
    href: '/playground',
    color: 'text-orange-500',
    bg: 'bg-orange-500/10',
    glow: 'hover:shadow-orange-500/10',
  },
];

const highlights = [
  { icon: Brain,        text: 'Learn by doing — interactive lessons, not just docs' },
  { icon: Layers,       text: 'From first command to advanced AI pipelines' },
  { icon: Cpu,          text: 'Real 2026 pricing — know exactly what you spend' },
  { icon: CheckCircle2, text: 'Progress synced across all your devices' },
];

// 3D tilt card component
function TiltCard({ children, className }: { children: React.ReactNode; className?: string }) {
  const ref = useRef<HTMLDivElement>(null);
  const mx = useMotionValue(0);
  const my = useMotionValue(0);
  const rotateX = useTransform(my, [-0.5, 0.5], [5, -5]);
  const rotateY = useTransform(mx, [-0.5, 0.5], [-5, 5]);

  function onMouseMove(e: React.MouseEvent) {
    const rect = ref.current?.getBoundingClientRect();
    if (!rect) return;
    mx.set((e.clientX - rect.left) / rect.width - 0.5);
    my.set((e.clientY - rect.top) / rect.height - 0.5);
  }

  function onMouseLeave() {
    animate(mx, 0, { duration: 0.4, type: 'spring', stiffness: 200, damping: 20 });
    animate(my, 0, { duration: 0.4, type: 'spring', stiffness: 200, damping: 20 });
  }

  return (
    <motion.div
      ref={ref}
      style={{ rotateX, rotateY, transformStyle: 'preserve-3d' }}
      whileHover={{ y: -6, scale: 1.02 }}
      transition={{ type: 'spring', stiffness: 350, damping: 25 }}
      onMouseMove={onMouseMove}
      onMouseLeave={onMouseLeave}
      className={className}
    >
      {children}
    </motion.div>
  );
}

function NavBar({ onMenuClick }: { onMenuClick: () => void }) {
  return (
    <header className="flex items-center justify-between px-4 py-4 border-b border-border">
      <div className="flex items-center gap-3">
        <Button variant="ghost" size="icon" onClick={onMenuClick} aria-label="Open menu">
          <Menu className="h-5 w-5" />
        </Button>
        <Link href="/" className="flex items-center gap-2">
          <motion.div
            className="w-7 h-7 rounded-md bg-primary flex items-center justify-center"
            whileHover={{ scale: 1.1, rotate: 5 }}
            transition={{ type: 'spring', stiffness: 400, damping: 15 }}
          >
            <Code2 className="h-4 w-4 text-primary-foreground" />
          </motion.div>
          <span className="font-semibold">Claude Mastery</span>
        </Link>
      </div>
      <div className="flex items-center gap-3">
        <ThemeToggle />
        <Show when="signed-out">
          <SignInButton mode="redirect">
            <Button variant="ghost" size="sm">Sign in</Button>
          </SignInButton>
          <SignUpButton mode="redirect">
            <Button size="sm">Sign up free</Button>
          </SignUpButton>
        </Show>
        <Show when="signed-in">
          <UserButton />
        </Show>
      </div>
    </header>
  );
}

function LandingPage() {
  return (
    <main className="max-w-6xl mx-auto px-6 py-16 relative">
      {/* Ambient background glow */}
      <div className="pointer-events-none absolute inset-0 overflow-hidden">
        <motion.div
          className="absolute -top-40 left-1/2 -translate-x-1/2 w-[600px] h-[400px] rounded-full bg-primary/8 blur-3xl"
          animate={{ scale: [1, 1.1, 1], opacity: [0.5, 0.8, 0.5] }}
          transition={{ duration: 6, repeat: Infinity, ease: 'easeInOut' }}
        />
      </div>

      {/* Hero */}
      <motion.div
        initial={{ opacity: 0, y: 24 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="text-center mb-20 relative"
      >
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.1 }}
        >
          <Badge variant="secondary" className="mb-5 text-sm px-3 py-1">
            <motion.span
              animate={{ opacity: [1, 0.5, 1] }}
              transition={{ duration: 2, repeat: Infinity }}
            >
              <Zap className="h-3.5 w-3.5 mr-1.5 inline" />
            </motion.span>
            The fastest way to master Claude Code & API
          </Badge>
        </motion.div>

        <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold tracking-tight mb-6 leading-tight">
          Go from zero to{' '}
          <span className="text-primary">Claude expert</span>
          <br className="hidden sm:block" />
          {' '}in hours, not weeks.
        </h1>

        <p className="text-lg text-muted-foreground max-w-2xl mx-auto mb-10 leading-relaxed">
          Claude Mastery is an interactive learning platform that teaches you Claude Code,
          the Anthropic API, cost optimisation, and real-world AI automation — with lessons,
          quizzes, a live playground, and progress that follows you everywhere.
        </p>

        <div className="flex flex-col sm:flex-row gap-3 justify-center">
          <SignUpButton mode="redirect">
            <motion.div whileHover={{ scale: 1.04 }} whileTap={{ scale: 0.97 }}>
              <Button size="lg" className="gap-2">
                Start learning free <ArrowRight className="h-4 w-4" />
              </Button>
            </motion.div>
          </SignUpButton>
          <SignInButton mode="redirect">
            <motion.div whileHover={{ scale: 1.04 }} whileTap={{ scale: 0.97 }}>
              <Button size="lg" variant="outline">Sign in</Button>
            </motion.div>
          </SignInButton>
        </div>
      </motion.div>

      {/* What you get */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.15, duration: 0.5 }}
        className="mb-20"
      >
        <h2 className="text-center text-2xl font-semibold mb-10">Everything you need in one place</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-5" style={{ perspective: 1000 }}>
          {features.map((feat, i) => (
            <motion.div
              key={feat.href}
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 + i * 0.08 }}
            >
              <TiltCard>
                <Card className={`h-full border-border/60 hover:border-primary/30 hover:shadow-xl ${feat.glow} transition-all duration-200 group`}>
                  <CardContent className="pt-6">
                    <motion.div
                      className={`w-11 h-11 rounded-xl ${feat.bg} flex items-center justify-center mb-4`}
                      whileHover={{ scale: 1.15, rotate: 8 }}
                      transition={{ type: 'spring', stiffness: 400, damping: 15 }}
                    >
                      <feat.icon className={`h-5 w-5 ${feat.color}`} />
                    </motion.div>
                    <h3 className="font-semibold mb-2 group-hover:text-primary transition-colors">
                      {feat.title}
                    </h3>
                    <p className="text-sm text-muted-foreground leading-relaxed">
                      {feat.description}
                    </p>
                  </CardContent>
                </Card>
              </TiltCard>
            </motion.div>
          ))}
        </div>
      </motion.div>

      {/* Why sign up */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.35, duration: 0.5 }}
        className="rounded-2xl border border-primary/20 bg-primary/5 p-8 md:p-12 text-center relative overflow-hidden"
      >
        <motion.div
          className="pointer-events-none absolute inset-0 bg-gradient-to-br from-primary/5 via-transparent to-transparent"
          animate={{ opacity: [0.5, 1, 0.5] }}
          transition={{ duration: 4, repeat: Infinity, ease: 'easeInOut' }}
        />
        <h2 className="text-2xl font-semibold mb-3 relative">Why create a free account?</h2>
        <p className="text-muted-foreground mb-8 max-w-xl mx-auto relative">
          Your progress is saved to the cloud — pick up exactly where you left off, on any device.
        </p>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 max-w-2xl mx-auto mb-8 text-left relative">
          {highlights.map(({ icon: Icon, text }, i) => (
            <motion.div
              key={text}
              className="flex items-start gap-3"
              initial={{ opacity: 0, x: -10 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.5 + i * 0.08 }}
            >
              <motion.div
                className="mt-0.5 w-8 h-8 rounded-lg bg-primary/10 flex items-center justify-center flex-shrink-0"
                whileHover={{ scale: 1.15, backgroundColor: 'hsl(var(--primary) / 0.2)' }}
              >
                <Icon className="h-4 w-4 text-primary" />
              </motion.div>
              <span className="text-sm text-muted-foreground leading-snug">{text}</span>
            </motion.div>
          ))}
        </div>
        <SignUpButton mode="redirect">
          <motion.div whileHover={{ scale: 1.04 }} whileTap={{ scale: 0.97 }} className="inline-block">
            <Button size="lg" className="gap-2">
              Create free account <ArrowRight className="h-4 w-4" />
            </Button>
          </motion.div>
        </SignUpButton>
      </motion.div>
    </main>
  );
}

function Dashboard() {
  const { completedLessons, quizResults } = useProgress();
  const totalLessons = modules.reduce((acc, m) => acc + m.lessons.length, 0);
  const overallProgress = totalLessons > 0
    ? Math.round((completedLessons.length / totalLessons) * 100)
    : 0;
  const quizCount = Object.keys(quizResults).length;

  return (
    <main className="max-w-6xl mx-auto px-6 py-12 relative">
      {/* Ambient glow */}
      <div className="pointer-events-none absolute inset-0 overflow-hidden">
        <motion.div
          className="absolute -top-32 right-1/4 w-[500px] h-[300px] rounded-full bg-primary/6 blur-3xl"
          animate={{ scale: [1, 1.15, 1], x: [0, 20, 0] }}
          transition={{ duration: 8, repeat: Infinity, ease: 'easeInOut' }}
        />
      </div>

      {/* Hero */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="text-center mb-16 relative"
      >
        <Badge variant="secondary" className="mb-4 text-sm">
          <motion.span animate={{ opacity: [1, 0.5, 1] }} transition={{ duration: 2, repeat: Infinity }}>
            <Zap className="h-3.5 w-3.5 mr-1 inline" />
          </motion.span>
          Learn Claude Code & API — the right way
        </Badge>
        <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold tracking-tight mb-6">
          Master{' '}
          <span className="text-primary">Claude Code</span>
          {' '}&{' '}
          <span className="text-primary">API</span>
        </h1>
        <p className="text-lg text-muted-foreground max-w-2xl mx-auto mb-8">
          Interactive lessons, a full command browser, cost calculator with real 2026 pricing,
          and a live API playground. Everything you need to go from beginner to expert.
        </p>
        <div className="flex flex-col sm:flex-row gap-3 justify-center">
          <motion.div whileHover={{ scale: 1.04 }} whileTap={{ scale: 0.97 }}>
            <Button asChild size="lg">
              <Link href="/modules">
                Continue Learning <ArrowRight className="ml-2 h-4 w-4" />
              </Link>
            </Button>
          </motion.div>
          <motion.div whileHover={{ scale: 1.04 }} whileTap={{ scale: 0.97 }}>
            <Button asChild size="lg" variant="outline">
              <Link href="/playground">
                Try Playground <Code2 className="ml-2 h-4 w-4" />
              </Link>
            </Button>
          </motion.div>
        </div>
      </motion.div>

      {/* Progress overview */}
      {completedLessons.length > 0 && (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="mb-12"
        >
          <TiltCard>
            <Card className="border-primary/20 bg-primary/5 hover:shadow-lg hover:shadow-primary/10 transition-all duration-300">
              <CardContent className="pt-6">
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-4">
                  <div>
                    <h2 className="font-semibold text-lg">Your Progress</h2>
                    <p className="text-sm text-muted-foreground">Keep it up!</p>
                  </div>
                  <div className="flex gap-4">
                    <motion.div className="text-center" whileHover={{ scale: 1.05 }}>
                      <div className="text-2xl font-bold text-primary">{completedLessons.length}</div>
                      <div className="text-xs text-muted-foreground">Lessons done</div>
                    </motion.div>
                    <motion.div className="text-center" whileHover={{ scale: 1.05 }}>
                      <div className="text-2xl font-bold text-primary">{quizCount}</div>
                      <div className="text-xs text-muted-foreground">Quizzes passed</div>
                    </motion.div>
                  </div>
                </div>
                <Progress value={overallProgress} className="h-2 mb-2" />
                <div className="flex justify-between text-xs text-muted-foreground">
                  <span>{overallProgress}% complete</span>
                  <span>{completedLessons.length}/{totalLessons} lessons</span>
                </div>
              </CardContent>
            </Card>
          </TiltCard>
        </motion.div>
      )}

      {/* Features grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-16" style={{ perspective: 1000 }}>
        {features.map((feat, i) => (
          <motion.div
            key={feat.href}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 + i * 0.1 }}
          >
            <Link href={feat.href}>
              <TiltCard>
                <Card className={`hover:border-primary/40 transition-all duration-200 hover:shadow-xl ${feat.glow} group cursor-pointer h-full`}>
                  <CardContent className="pt-6">
                    <motion.div
                      className={`w-10 h-10 rounded-xl ${feat.bg} flex items-center justify-center mb-4`}
                      whileHover={{ scale: 1.2, rotate: 10 }}
                      transition={{ type: 'spring', stiffness: 400, damping: 15 }}
                    >
                      <feat.icon className={`h-5 w-5 ${feat.color}`} />
                    </motion.div>
                    <h3 className="font-semibold mb-2 group-hover:text-primary transition-colors">
                      {feat.title}
                    </h3>
                    <p className="text-sm text-muted-foreground leading-relaxed">
                      {feat.description}
                    </p>
                    <div className="mt-4 flex items-center text-sm text-primary font-medium">
                      Explore
                      <motion.span
                        className="inline-block ml-1"
                        animate={{ x: [0, 3, 0] }}
                        transition={{ duration: 1.5, repeat: Infinity, ease: 'easeInOut' }}
                      >
                        <ChevronRight className="h-4 w-4" />
                      </motion.span>
                    </div>
                  </CardContent>
                </Card>
              </TiltCard>
            </Link>
          </motion.div>
        ))}
      </div>

      {/* Module quick-start */}
      <div>
        <h2 className="text-xl font-semibold mb-3">Learning Path</h2>
        <div className="rounded-xl border border-border overflow-hidden">
          {modules.map((module, i) => {
            const lessonIds = module.lessons.map(l => l.id);
            const completed = completedLessons.filter(id => lessonIds.includes(id)).length;
            const progress = lessonIds.length > 0 ? Math.round((completed / lessonIds.length) * 100) : 0;
            const hasQuiz = !!quizResults[module.quizId];

            return (
              <motion.div
                key={module.id}
                initial={{ opacity: 0, x: -10 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.4 + i * 0.05 }}
                whileHover={{ x: 3, backgroundColor: 'hsl(var(--muted) / 0.5)' }}
                className={i !== 0 ? 'border-t border-border' : ''}
              >
                <Link href={`/modules/${module.id}/${module.lessons[0]?.id}`}>
                  <div className="flex items-center gap-3 px-4 py-2.5 group cursor-pointer">
                    <span className="flex-shrink-0 w-5 text-xs font-bold text-muted-foreground text-right">{i + 1}</span>
                    <div className="flex-1 min-w-0 flex items-center gap-3">
                      <span className="text-sm font-medium truncate group-hover:text-primary transition-colors">{module.title}</span>
                      {hasQuiz && <Award className="h-3 w-3 text-yellow-500 flex-shrink-0" />}
                      <div className="flex items-center gap-2 ml-auto">
                        <Progress value={progress} className="h-1 w-20" />
                        <span className="text-xs text-muted-foreground whitespace-nowrap">{completed}/{lessonIds.length}</span>
                      </div>
                    </div>
                    <ChevronRight className="h-3.5 w-3.5 text-muted-foreground/50 group-hover:text-primary group-hover:translate-x-0.5 transition-all flex-shrink-0" />
                  </div>
                </Link>
              </motion.div>
            );
          })}
        </div>
      </div>
    </main>
  );
}

export function HomePage() {
  const [sidebarOpen, setSidebarOpen] = useState(false);

  return (
    <div className="min-h-screen bg-background">
      <AnimatePresence>
        {sidebarOpen && (
          <motion.div
            key="home-sidebar"
            className="fixed inset-0 z-50"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
          >
            <motion.div
              className="absolute inset-0 bg-black/50"
              onClick={() => setSidebarOpen(false)}
            />
            <motion.div
              className="absolute left-0 top-0 bottom-0 w-72"
              initial={{ x: -288 }}
              animate={{ x: 0 }}
              exit={{ x: -288 }}
              transition={{ type: 'spring', stiffness: 300, damping: 30 }}
            >
              <Sidebar mobile onClose={() => setSidebarOpen(false)} />
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      <NavBar onMenuClick={() => setSidebarOpen(o => !o)} />
      <Show when="signed-out">
        <LandingPage />
      </Show>
      <Show when="signed-in">
        <Dashboard />
      </Show>
    </div>
  );
}

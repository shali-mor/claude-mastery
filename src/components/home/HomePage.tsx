'use client';

import Link from 'next/link';
import { motion } from 'framer-motion';
import {
  BookOpen, Terminal, DollarSign, Code2, ArrowRight,
  Zap, Award, ChevronRight, CheckCircle2, Layers, Brain, Cpu,
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import { Show, SignInButton, SignUpButton, UserButton } from '@clerk/nextjs';
import { ThemeToggle } from '@/components/ui/ThemeToggle';
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
  },
  {
    icon: Terminal,
    title: 'Command Browser',
    description: 'Searchable catalog of all slash commands, CLI flags, hooks, skills, and keyboard shortcuts.',
    href: '/commands',
    color: 'text-purple-500',
    bg: 'bg-purple-500/10',
  },
  {
    icon: DollarSign,
    title: 'Cost Calculator',
    description: 'Real-time cost estimator with Batch API and prompt caching scenarios for all Claude models.',
    href: '/calculator',
    color: 'text-green-500',
    bg: 'bg-green-500/10',
  },
  {
    icon: Code2,
    title: 'Live Playground',
    description: 'Interact with Claude directly — streaming responses, model selection, token tracking.',
    href: '/playground',
    color: 'text-orange-500',
    bg: 'bg-orange-500/10',
  },
];

const highlights = [
  { icon: Brain,       text: 'Learn by doing — interactive lessons, not just docs' },
  { icon: Layers,      text: 'From first command to advanced AI pipelines' },
  { icon: Cpu,         text: 'Real 2026 pricing — know exactly what you spend' },
  { icon: CheckCircle2, text: 'Progress synced across all your devices' },
];

function NavBar() {
  return (
    <header className="flex items-center justify-between px-6 py-4 border-b border-border max-w-6xl mx-auto">
      <div className="flex items-center gap-2">
        <div className="w-7 h-7 rounded-md bg-primary flex items-center justify-center">
          <Code2 className="h-4 w-4 text-primary-foreground" />
        </div>
        <span className="font-semibold">Claude Mastery</span>
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
    <main className="max-w-6xl mx-auto px-6 py-16">
      {/* Hero */}
      <motion.div
        initial={{ opacity: 0, y: 24 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="text-center mb-20"
      >
        <Badge variant="secondary" className="mb-5 text-sm px-3 py-1">
          <Zap className="h-3.5 w-3.5 mr-1.5" />
          The fastest way to master Claude Code & API
        </Badge>

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
            <Button size="lg" className="gap-2">
              Start learning free <ArrowRight className="h-4 w-4" />
            </Button>
          </SignUpButton>
          <SignInButton mode="redirect">
            <Button size="lg" variant="outline">
              Sign in
            </Button>
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
        <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
          {features.map((feat, i) => (
            <motion.div
              key={feat.href}
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 + i * 0.08 }}
            >
              <Card className="h-full border-border/60 hover:border-primary/30 hover:shadow-md transition-all duration-200 group">
                <CardContent className="pt-6">
                  <div className={`w-11 h-11 rounded-xl ${feat.bg} flex items-center justify-center mb-4`}>
                    <feat.icon className={`h-5 w-5 ${feat.color}`} />
                  </div>
                  <h3 className="font-semibold mb-2 group-hover:text-primary transition-colors">
                    {feat.title}
                  </h3>
                  <p className="text-sm text-muted-foreground leading-relaxed">
                    {feat.description}
                  </p>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </div>
      </motion.div>

      {/* Why sign up */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.35, duration: 0.5 }}
        className="rounded-2xl border border-primary/20 bg-primary/5 p-8 md:p-12 text-center"
      >
        <h2 className="text-2xl font-semibold mb-3">Why create a free account?</h2>
        <p className="text-muted-foreground mb-8 max-w-xl mx-auto">
          Your progress is saved to the cloud — pick up exactly where you left off, on any device.
        </p>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 max-w-2xl mx-auto mb-8 text-left">
          {highlights.map(({ icon: Icon, text }) => (
            <div key={text} className="flex items-start gap-3">
              <div className="mt-0.5 w-8 h-8 rounded-lg bg-primary/10 flex items-center justify-center flex-shrink-0">
                <Icon className="h-4 w-4 text-primary" />
              </div>
              <span className="text-sm text-muted-foreground leading-snug">{text}</span>
            </div>
          ))}
        </div>
        <SignUpButton mode="redirect">
          <Button size="lg" className="gap-2">
            Create free account <ArrowRight className="h-4 w-4" />
          </Button>
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
    <main className="max-w-6xl mx-auto px-6 py-12">
      {/* Hero */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="text-center mb-16"
      >
        <Badge variant="secondary" className="mb-4 text-sm">
          <Zap className="h-3.5 w-3.5 mr-1" />
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
          <Button asChild size="lg">
            <Link href="/modules">
              Continue Learning <ArrowRight className="ml-2 h-4 w-4" />
            </Link>
          </Button>
          <Button asChild size="lg" variant="outline">
            <Link href="/playground">
              Try Playground <Code2 className="ml-2 h-4 w-4" />
            </Link>
          </Button>
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
          <Card className="border-primary/20 bg-primary/5">
            <CardContent className="pt-6">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-4">
                <div>
                  <h2 className="font-semibold text-lg">Your Progress</h2>
                  <p className="text-sm text-muted-foreground">Keep it up!</p>
                </div>
                <div className="flex gap-4">
                  <div className="text-center">
                    <div className="text-2xl font-bold text-primary">{completedLessons.length}</div>
                    <div className="text-xs text-muted-foreground">Lessons done</div>
                  </div>
                  <div className="text-center">
                    <div className="text-2xl font-bold text-primary">{quizCount}</div>
                    <div className="text-xs text-muted-foreground">Quizzes passed</div>
                  </div>
                </div>
              </div>
              <Progress value={overallProgress} className="h-2 mb-2" />
              <div className="flex justify-between text-xs text-muted-foreground">
                <span>{overallProgress}% complete</span>
                <span>{completedLessons.length}/{totalLessons} lessons</span>
              </div>
            </CardContent>
          </Card>
        </motion.div>
      )}

      {/* Features grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-16">
        {features.map((feat, i) => (
          <motion.div
            key={feat.href}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 + i * 0.1 }}
          >
            <Link href={feat.href}>
              <Card className="hover:border-primary/40 transition-all duration-200 hover:shadow-md group cursor-pointer h-full">
                <CardContent className="pt-6">
                  <div className={`w-10 h-10 rounded-xl ${feat.bg} flex items-center justify-center mb-4`}>
                    <feat.icon className={`h-5 w-5 ${feat.color}`} />
                  </div>
                  <h3 className="font-semibold mb-2 group-hover:text-primary transition-colors">
                    {feat.title}
                  </h3>
                  <p className="text-sm text-muted-foreground leading-relaxed">
                    {feat.description}
                  </p>
                  <div className="mt-4 flex items-center text-sm text-primary font-medium">
                    Explore <ChevronRight className="h-4 w-4 ml-1 group-hover:translate-x-1 transition-transform" />
                  </div>
                </CardContent>
              </Card>
            </Link>
          </motion.div>
        ))}
      </div>

      {/* Module quick-start */}
      <div>
        <h2 className="text-xl font-semibold mb-4">Learning Path</h2>
        <div className="space-y-3">
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
                transition={{ delay: 0.4 + i * 0.07 }}
              >
                <Link href={`/modules/${module.id}/${module.lessons[0]?.id}`}>
                  <Card className="hover:border-primary/40 transition-all group cursor-pointer">
                    <CardContent className="py-4 px-5">
                      <div className="flex items-center gap-4">
                        <div className="flex-shrink-0 w-8 h-8 rounded-full bg-primary/10 flex items-center justify-center text-sm font-bold text-primary">
                          {i + 1}
                        </div>
                        <div className="flex-1 min-w-0">
                          <div className="flex items-center gap-2 mb-1">
                            <span className="font-medium text-sm">{module.title}</span>
                            {hasQuiz && <Award className="h-3.5 w-3.5 text-yellow-500" />}
                          </div>
                          <div className="flex items-center gap-2">
                            <Progress value={progress} className="h-1 flex-1 max-w-32" />
                            <span className="text-xs text-muted-foreground whitespace-nowrap">
                              {completed}/{lessonIds.length} lessons
                            </span>
                          </div>
                        </div>
                        <ChevronRight className="h-4 w-4 text-muted-foreground group-hover:text-primary group-hover:translate-x-0.5 transition-all" />
                      </div>
                    </CardContent>
                  </Card>
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
  return (
    <div className="min-h-screen bg-background">
      <NavBar />
      <Show when="signed-out">
        <LandingPage />
      </Show>
      <Show when="signed-in">
        <Dashboard />
      </Show>
    </div>
  );
}

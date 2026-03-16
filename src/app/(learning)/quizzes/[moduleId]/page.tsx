import { notFound } from 'next/navigation';
import { getQuizByModuleId } from '@/data/quizzes';
import { modules } from '@/data/modules';
import { QuizRunner } from '@/components/quiz/QuizRunner';
import type { LessonTier } from '@/types/module';

interface Props {
  params: Promise<{ moduleId: string }>;
  searchParams: Promise<{ tier?: string }>;
}

export async function generateStaticParams() {
  return modules.map(m => ({ moduleId: m.id }));
}

export async function generateMetadata({ params, searchParams }: Props) {
  const { moduleId } = await params;
  const { tier } = await searchParams;
  const mod = modules.find(m => m.id === moduleId);
  const tierLabel = tier === 'advanced' ? ' Advanced' : '';
  return { title: `${mod?.title ?? 'Module'}${tierLabel} Quiz — Claude Mastery` };
}

export default async function QuizPage({ params, searchParams }: Props) {
  const { moduleId } = await params;
  const { tier: tierParam } = await searchParams;
  const tier: LessonTier = tierParam === 'advanced' ? 'advanced' : 'basic';
  const quiz = getQuizByModuleId(moduleId, tier);
  const mod = modules.find(m => m.id === moduleId);
  if (!quiz || !mod) notFound();

  return <QuizRunner quiz={quiz} module={mod} />;
}

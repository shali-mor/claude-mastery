import { notFound } from 'next/navigation';
import { getQuizByModuleId } from '@/data/quizzes';
import { modules } from '@/data/modules';
import { QuizRunner } from '@/components/quiz/QuizRunner';

interface Props {
  params: Promise<{ moduleId: string }>;
}

export async function generateStaticParams() {
  return modules.map(m => ({ moduleId: m.id }));
}

export async function generateMetadata({ params }: Props) {
  const { moduleId } = await params;
  const module = modules.find(m => m.id === moduleId);
  return { title: `${module?.title ?? 'Module'} Quiz — Claude Mastery` };
}

export default async function QuizPage({ params }: Props) {
  const { moduleId } = await params;
  const quiz = getQuizByModuleId(moduleId);
  const module = modules.find(m => m.id === moduleId);
  if (!quiz || !module) notFound();

  return <QuizRunner quiz={quiz} module={module} />;
}

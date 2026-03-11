import { notFound } from 'next/navigation';
import { modules } from '@/data/modules';
import { LessonPage } from '@/components/modules/LessonPage';

interface Props {
  params: Promise<{ moduleId: string; lessonId: string }>;
}

export async function generateStaticParams() {
  const paths: { moduleId: string; lessonId: string }[] = [];
  for (const mod of modules) {
    for (const lesson of mod.lessons) {
      paths.push({ moduleId: mod.id, lessonId: lesson.id });
    }
  }
  return paths;
}

export async function generateMetadata({ params }: Props) {
  const { moduleId, lessonId } = await params;
  const mod = modules.find(m => m.id === moduleId);
  const lesson = mod?.lessons.find(l => l.id === lessonId);
  if (!lesson) return { title: 'Lesson — Claude Mastery' };
  return { title: `${lesson.title} — Claude Mastery` };
}

export default async function LessonRoute({ params }: Props) {
  const { moduleId, lessonId } = await params;
  const mod = modules.find(m => m.id === moduleId);
  if (!mod) notFound();
  const lesson = mod.lessons.find(l => l.id === lessonId);
  if (!lesson) notFound();

  return <LessonPage module={mod} lesson={lesson} />;
}

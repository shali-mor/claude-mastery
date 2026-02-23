import { notFound } from 'next/navigation';
import { modules } from '@/data/modules';
import { LessonPage } from '@/components/modules/LessonPage';

interface Props {
  params: Promise<{ moduleId: string; lessonId: string }>;
}

export async function generateStaticParams() {
  const paths: { moduleId: string; lessonId: string }[] = [];
  for (const module of modules) {
    for (const lesson of module.lessons) {
      paths.push({ moduleId: module.id, lessonId: lesson.id });
    }
  }
  return paths;
}

export async function generateMetadata({ params }: Props) {
  const { moduleId, lessonId } = await params;
  const module = modules.find(m => m.id === moduleId);
  const lesson = module?.lessons.find(l => l.id === lessonId);
  if (!lesson) return { title: 'Lesson — Claude Mastery' };
  return { title: `${lesson.title} — Claude Mastery` };
}

export default async function LessonRoute({ params }: Props) {
  const { moduleId, lessonId } = await params;
  const module = modules.find(m => m.id === moduleId);
  if (!module) notFound();
  const lesson = module.lessons.find(l => l.id === lessonId);
  if (!lesson) notFound();

  return <LessonPage module={module} lesson={lesson} />;
}

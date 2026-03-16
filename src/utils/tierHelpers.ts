import type { Module, Lesson } from '@/types/module';

export function getBasicLessons(module: Module): Lesson[] {
  return module.lessons.filter(l => l.tier === 'basic');
}

export function getAdvancedLessons(module: Module): Lesson[] {
  return module.lessons.filter(l => l.tier === 'advanced');
}

export function isLastBasicLesson(module: Module, lessonId: string): boolean {
  const basics = getBasicLessons(module);
  return basics.length > 0 && basics[basics.length - 1].id === lessonId;
}

export function isLastAdvancedLesson(module: Module, lessonId: string): boolean {
  const advanced = getAdvancedLessons(module);
  return advanced.length > 0 && advanced[advanced.length - 1].id === lessonId;
}

export function getBasicProgress(module: Module, completedLessons: string[]): number {
  const basics = getBasicLessons(module);
  if (basics.length === 0) return 100;
  const done = basics.filter(l => completedLessons.includes(l.id)).length;
  return Math.round((done / basics.length) * 100);
}

export function getAdvancedProgress(module: Module, completedLessons: string[]): number {
  const advanced = getAdvancedLessons(module);
  if (advanced.length === 0) return 100;
  const done = advanced.filter(l => completedLessons.includes(l.id)).length;
  return Math.round((done / advanced.length) * 100);
}

export function allBasicComplete(module: Module, completedLessons: string[]): boolean {
  return getBasicLessons(module).every(l => completedLessons.includes(l.id));
}

export function allAdvancedComplete(module: Module, completedLessons: string[]): boolean {
  return getAdvancedLessons(module).every(l => completedLessons.includes(l.id));
}

export type QuestionType = 'multiple-choice' | 'true-false' | 'code-completion';

export interface AnswerOption {
  id: string;
  text: string;
  isCorrect: boolean;
  explanation: string;
}

export interface Question {
  id: string;
  type: QuestionType;
  questionText: string;
  codeSnippet?: string;
  options: AnswerOption[];
  globalExplanation: string;
}

import type { LessonTier } from './module';

export interface Quiz {
  id: string;
  moduleId: string;
  title: string;
  tier: LessonTier;
  questions: Question[];
}

export interface QuizResult {
  quizId: string;
  moduleId: string;
  score: number;
  total: number;
  completedAt: string;
  answers: Record<string, string>;
}

export type ContentBlockType =
  | 'text'
  | 'heading'
  | 'code'
  | 'callout'
  | 'steps'
  | 'tip'
  | 'warning'
  | 'table'
  | 'tabs'
  | 'exercise'
  | 'checklist'
  | 'comparison'
  | 'visual';

export type CalloutVariant = 'info' | 'warning' | 'success' | 'error' | 'tip';

export interface TabItem {
  label: string;
  content: string;
  language?: string;
}

export interface ChecklistItem {
  text: string;
  description?: string;
}

export interface ComparisonSide {
  label: string;
  code: string;
  language?: string;
}

export interface ContentBlock {
  type: ContentBlockType;
  content?: string;
  // heading
  level?: 2 | 3;
  // code
  language?: string;
  // callout
  calloutVariant?: CalloutVariant;
  // steps
  steps?: string[];
  // table
  headers?: string[];
  rows?: string[][];
  // tabs — array of { label, content, language? }
  tabs?: TabItem[];
  // exercise — interactive challenge with hints + solution
  exercise?: {
    prompt: string;
    hints?: string[];
    solution: string;
    solutionLanguage?: string;
  };
  // checklist — interactive best-practice checklist
  items?: ChecklistItem[];
  // comparison — do vs don't side-by-side
  do?: ComparisonSide;
  dont?: ComparisonSide;
  // visual — embeddable interactive diagram
  visualId?: string;
}

export interface Lesson {
  id: string;
  title: string;
  description: string;
  estimatedMinutes: number;
  blocks: ContentBlock[];
}

export interface Module {
  id: string;
  title: string;
  description: string;
  icon: string;
  color: string;
  lessons: Lesson[];
  quizId: string;
}

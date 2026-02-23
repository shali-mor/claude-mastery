'use client';

import { useState } from 'react';
import Link from 'next/link';
import { motion, AnimatePresence } from 'framer-motion';
import { CheckCircle, XCircle, ArrowRight, RotateCcw, Award, ChevronLeft, Sparkles } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Progress } from '@/components/ui/progress';
import { CodeBlock } from '@/components/ui/CodeBlock';
import { useProgress } from '@/store';
import type { Quiz } from '@/types/quiz';
import type { Module } from '@/types/module';

type State = 'idle' | 'question' | 'reviewing' | 'results';

interface QuizRunnerProps {
  quiz: Quiz;
  module: Module;
  /** When true, renders compactly inside a lesson page (no back-link, auto-start) */
  inline?: boolean;
}

export function QuizRunner({ quiz, module, inline = false }: QuizRunnerProps) {
  const { saveQuizResult } = useProgress();
  const [state, setState] = useState<State>(inline ? 'idle' : 'idle');
  const [currentIndex, setCurrentIndex] = useState(0);
  const [answers, setAnswers] = useState<Record<string, string>>({});
  const [selectedId, setSelectedId] = useState<string | null>(null);
  const [submitted, setSubmitted] = useState(false);

  const currentQuestion = quiz.questions[currentIndex];
  const isLast = currentIndex === quiz.questions.length - 1;

  const score = quiz.questions.filter(q => {
    const correctOption = q.options.find(o => o.isCorrect);
    return correctOption && answers[q.id] === correctOption.id;
  }).length;

  const startQuiz = () => {
    setState('question');
    setCurrentIndex(0);
    setAnswers({});
    setSelectedId(null);
    setSubmitted(false);
  };

  const selectAnswer = (optionId: string) => {
    if (submitted) return;
    setSelectedId(optionId);
  };

  const submitAnswer = () => {
    if (!selectedId) return;
    setAnswers(prev => ({ ...prev, [currentQuestion.id]: selectedId }));
    setSubmitted(true);
    setState('reviewing');
  };

  const nextQuestion = () => {
    if (isLast) {
      const finalScore = quiz.questions.filter(q => {
        const correctOption = q.options.find(o => o.isCorrect);
        return correctOption && (answers[q.id] === correctOption.id || (q.id === currentQuestion.id && selectedId === correctOption.id));
      }).length;

      saveQuizResult({
        quizId: quiz.id,
        moduleId: quiz.moduleId,
        score: finalScore,
        total: quiz.questions.length,
        completedAt: new Date().toISOString(),
        answers: { ...answers, [currentQuestion.id]: selectedId! },
      });
      setState('results');
    } else {
      setCurrentIndex(i => i + 1);
      setSelectedId(null);
      setSubmitted(false);
      setState('question');
    }
  };

  const containerClass = inline
    ? 'mt-10 pt-8 border-t-2 border-dashed border-primary/30'
    : 'max-w-2xl mx-auto px-6 py-8';

  // ── Idle ───────────────────────────────────────────────────────────────
  if (state === 'idle') {
    if (inline) {
      return (
        <div className={containerClass}>
          <div className="flex items-center gap-3 mb-6">
            <div className="w-10 h-10 rounded-xl bg-primary/10 flex items-center justify-center">
              <Award className="h-5 w-5 text-primary" />
            </div>
            <div>
              <h2 className="font-semibold text-base">{quiz.title}</h2>
              <p className="text-sm text-muted-foreground">{quiz.questions.length} questions · Test your knowledge</p>
            </div>
            <Button onClick={startQuiz} className="ml-auto gap-2">
              Start Quiz <ArrowRight className="h-4 w-4" />
            </Button>
          </div>
        </div>
      );
    }

    return (
      <div className={containerClass}>
        {!inline && (
          <Link href={`/modules/${module.id}/${module.lessons[0]?.id}`} className="inline-flex items-center gap-1 text-sm text-muted-foreground hover:text-foreground mb-6 transition-colors">
            <ChevronLeft className="h-3.5 w-3.5" />
            Back to {module.title}
          </Link>
        )}
        <div className="text-center py-12">
          <div className="w-16 h-16 rounded-2xl bg-primary/10 flex items-center justify-center mx-auto mb-6">
            <Award className="h-8 w-8 text-primary" />
          </div>
          <h1 className="text-2xl font-bold mb-2">{quiz.title}</h1>
          <p className="text-muted-foreground mb-8">
            {quiz.questions.length} questions · Test your knowledge of {module.title}
          </p>
          <Button onClick={startQuiz} size="lg">
            Start Quiz <ArrowRight className="ml-2 h-4 w-4" />
          </Button>
        </div>
      </div>
    );
  }

  // ── Results ─────────────────────────────────────────────────────────────
  if (state === 'results') {
    const percent = Math.round((score / quiz.questions.length) * 100);
    const passed = percent >= 70;

    const ResultsWrapper = ({ children }: { children: React.ReactNode }) =>
      inline ? (
        <div className={containerClass}>{children}</div>
      ) : (
        <div className={containerClass}>{children}</div>
      );

    return (
      <ResultsWrapper>
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          className="text-center py-8"
        >
          <div className={`w-20 h-20 rounded-full flex items-center justify-center mx-auto mb-6 ${passed ? 'bg-green-500/10' : 'bg-orange-500/10'}`}>
            {passed
              ? <Sparkles className="h-10 w-10 text-yellow-500" />
              : <RotateCcw className="h-10 w-10 text-orange-500" />
            }
          </div>

          <h2 className={`${inline ? 'text-xl' : 'text-3xl'} font-bold mb-2`}>
            {passed ? 'Great job!' : 'Keep practicing!'}
          </h2>
          <p className="text-muted-foreground mb-6">
            You scored <strong>{score}/{quiz.questions.length}</strong> ({percent}%)
          </p>

          <Progress value={percent} className="h-3 max-w-xs mx-auto mb-8" />

          {/* Per-question results */}
          <div className="text-left space-y-3 mb-8">
            {quiz.questions.map((q, i) => {
              const correct = q.options.find(o => o.isCorrect);
              const answered = answers[q.id];
              const isRight = answered === correct?.id;
              return (
                <div key={q.id} className={`flex items-start gap-3 p-3 rounded-lg border text-sm ${isRight ? 'border-green-500/20 bg-green-500/5' : 'border-red-500/20 bg-red-500/5'}`}>
                  {isRight
                    ? <CheckCircle className="h-4 w-4 text-green-500 flex-shrink-0 mt-0.5" />
                    : <XCircle className="h-4 w-4 text-red-500 flex-shrink-0 mt-0.5" />
                  }
                  <div>
                    <p className="font-medium text-foreground">Q{i + 1}: {q.questionText}</p>
                    {!isRight && correct && (
                      <p className="text-muted-foreground mt-1">Correct: {correct.text}</p>
                    )}
                  </div>
                </div>
              );
            })}
          </div>

          <div className="flex flex-col sm:flex-row gap-3 justify-center">
            <Button onClick={startQuiz} variant="outline" className="gap-2">
              <RotateCcw className="h-4 w-4" />
              Retake Quiz
            </Button>
            {!inline && (
              <Button asChild>
                <Link href={`/modules/${module.id}/${module.lessons[0]?.id}`}>
                  Back to Module <ChevronLeft className="h-4 w-4 ml-2" />
                </Link>
              </Button>
            )}
          </div>
        </motion.div>
      </ResultsWrapper>
    );
  }

  // ── Question / Reviewing ────────────────────────────────────────────────
  return (
    <div className={containerClass}>
      {!inline && (
        <div className="flex items-center gap-3 mb-2 text-sm text-muted-foreground">
          <Award className="h-4 w-4 text-primary" />
          <span className="font-medium text-foreground">{quiz.title}</span>
        </div>
      )}
      {inline && state === 'question' && (
        <div className="flex items-center gap-3 mb-4">
          <Award className="h-5 w-5 text-primary" />
          <h2 className="font-semibold text-base">{quiz.title}</h2>
        </div>
      )}

      {/* Progress */}
      <div className="flex items-center gap-3 mb-6">
        <Progress value={((currentIndex + 1) / quiz.questions.length) * 100} className="h-1.5 flex-1" />
        <span className="text-sm text-muted-foreground whitespace-nowrap">
          {currentIndex + 1} / {quiz.questions.length}
        </span>
      </div>

      <AnimatePresence mode="wait">
        <motion.div
          key={currentQuestion.id}
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          exit={{ opacity: 0, x: -20 }}
          transition={{ duration: 0.2 }}
        >
          <h3 className="text-base font-semibold mb-4">{currentQuestion.questionText}</h3>

          {currentQuestion.codeSnippet && (
            <div className="mb-4">
              <CodeBlock code={currentQuestion.codeSnippet} language="typescript" />
            </div>
          )}

          {/* Options */}
          <div
            role="radiogroup"
            aria-labelledby={`question-${currentQuestion.id}`}
            className="space-y-3 mb-6"
          >
            {currentQuestion.options.map(option => {
              const isSelected = selectedId === option.id;
              const isCorrect = option.isCorrect;
              const showResult = submitted;

              let borderClass = 'border-border hover:border-primary/50';
              let bgClass = '';
              if (isSelected && !showResult) { borderClass = 'border-primary'; bgClass = 'bg-primary/8'; }
              if (showResult) {
                if (isCorrect) { borderClass = 'border-green-500'; bgClass = 'bg-green-500/8'; }
                else if (isSelected && !isCorrect) { borderClass = 'border-red-500'; bgClass = 'bg-red-500/8'; }
              }

              return (
                <button
                  key={option.id}
                  role="radio"
                  aria-checked={isSelected}
                  onClick={() => selectAnswer(option.id)}
                  disabled={submitted}
                  className={`w-full flex items-start gap-3 p-4 rounded-lg border text-left transition-all text-sm ${borderClass} ${bgClass} disabled:cursor-default focus-visible:ring-2 focus-visible:ring-primary focus-visible:outline-none`}
                >
                  <div className={`flex-shrink-0 w-5 h-5 rounded-full border-2 flex items-center justify-center mt-0.5 transition-colors ${isSelected ? 'border-primary bg-primary' : 'border-muted-foreground'}`}>
                    {isSelected && <div className="w-2 h-2 rounded-full bg-primary-foreground" />}
                  </div>
                  <div className="flex-1">
                    <span>{option.text}</span>
                    {showResult && (isSelected || isCorrect) && (
                      <p className="text-xs text-muted-foreground mt-1 leading-relaxed">{option.explanation}</p>
                    )}
                  </div>
                  {showResult && isCorrect && <CheckCircle className="h-4 w-4 text-green-500 flex-shrink-0" />}
                  {showResult && isSelected && !isCorrect && <XCircle className="h-4 w-4 text-red-500 flex-shrink-0" />}
                </button>
              );
            })}
          </div>

          {submitted && (
            <motion.div
              initial={{ opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              className="p-4 rounded-lg bg-muted/40 border border-border text-sm text-muted-foreground mb-6"
            >
              {currentQuestion.globalExplanation}
            </motion.div>
          )}

          {!submitted ? (
            <Button onClick={submitAnswer} disabled={!selectedId} className="w-full sm:w-auto">
              Check Answer
            </Button>
          ) : (
            <Button onClick={nextQuestion} className="w-full sm:w-auto gap-2">
              {isLast ? 'See Results' : 'Next Question'}
              <ArrowRight className="h-4 w-4" />
            </Button>
          )}
        </motion.div>
      </AnimatePresence>
    </div>
  );
}

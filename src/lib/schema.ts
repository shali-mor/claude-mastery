import { pgTable, text, jsonb, timestamp } from 'drizzle-orm/pg-core';

export const userProgress = pgTable('user_progress', {
  userId: text('user_id').primaryKey(),
  completedLessons: text('completed_lessons').array().default([]),
  quizResults: jsonb('quiz_results').default({}),
  lastVisitedLessonId: text('last_visited_lesson_id'),
  updatedAt: timestamp('updated_at', { withTimezone: true }).defaultNow(),
});

export type UserProgress = typeof userProgress.$inferSelect;
export type NewUserProgress = typeof userProgress.$inferInsert;

import { auth } from '@clerk/nextjs/server';
import { NextRequest, NextResponse } from 'next/server';
import { db } from '@/lib/db';
import { userProgress } from '@/lib/schema';
import { eq } from 'drizzle-orm';

export async function GET() {
  const { userId } = await auth();
  if (!userId) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });

  const rows = await db
    .select()
    .from(userProgress)
    .where(eq(userProgress.userId, userId));

  if (rows.length === 0) return NextResponse.json(null);
  return NextResponse.json(rows[0]);
}

export async function POST(req: NextRequest) {
  const { userId } = await auth();
  if (!userId) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });

  const body = await req.json();
  const { completedLessons, quizResults, lastVisitedLessonId } = body;

  await db
    .insert(userProgress)
    .values({
      userId,
      completedLessons: completedLessons ?? [],
      quizResults: quizResults ?? {},
      lastVisitedLessonId: lastVisitedLessonId ?? null,
    })
    .onConflictDoUpdate({
      target: userProgress.userId,
      set: {
        completedLessons: completedLessons ?? [],
        quizResults: quizResults ?? {},
        lastVisitedLessonId: lastVisitedLessonId ?? null,
        updatedAt: new Date(),
      },
    });

  return NextResponse.json({ ok: true });
}

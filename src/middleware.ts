import { clerkMiddleware } from '@clerk/nextjs/server';
import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

// In-memory rate limit store.
// Resets on cold start — for multi-instance production use Upstash Redis instead.
const store = new Map<string, { count: number; resetAt: number }>();

function rateLimit(
  key: string,
  limit: number,
  windowMs: number
): { allowed: boolean; remaining: number } {
  const now = Date.now();
  const entry = store.get(key);

  if (!entry || now > entry.resetAt) {
    store.set(key, { count: 1, resetAt: now + windowMs });
    return { allowed: true, remaining: limit - 1 };
  }

  if (entry.count >= limit) {
    return { allowed: false, remaining: 0 };
  }

  entry.count++;
  return { allowed: true, remaining: limit - entry.count };
}

export default clerkMiddleware((_auth, req: NextRequest) => {
  // Rate-limit the chat proxy (user's own API key, but still burns serverless compute)
  if (req.nextUrl.pathname === '/api/chat') {
    const ip =
      req.headers.get('x-forwarded-for')?.split(',')[0]?.trim() ?? 'unknown';
    const { allowed, remaining } = rateLimit(`chat:${ip}`, 20, 60_000);

    if (!allowed) {
      return new NextResponse(
        JSON.stringify({ error: 'Too many requests. Try again in a minute.' }),
        {
          status: 429,
          headers: {
            'Content-Type': 'application/json',
            'Retry-After': '60',
            'X-RateLimit-Limit': '20',
            'X-RateLimit-Remaining': '0',
          },
        }
      );
    }

    const res = NextResponse.next();
    res.headers.set('X-RateLimit-Remaining', remaining.toString());
    return res;
  }

  return NextResponse.next();
});

export const config = {
  matcher: [
    // Run on all routes except Next.js internals and static files
    '/((?!_next/static|_next/image|favicon.ico|.*\\.(?:svg|png|jpg|jpeg|gif|webp)$).*)',
  ],
};

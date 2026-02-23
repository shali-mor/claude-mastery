'use client';

import { ErrorBoundary } from '@/components/ui/ErrorBoundary';
import { Playground } from '@/components/playground/Playground';

export default function PlaygroundPage() {
  return (
    <ErrorBoundary>
      <Playground />
    </ErrorBoundary>
  );
}

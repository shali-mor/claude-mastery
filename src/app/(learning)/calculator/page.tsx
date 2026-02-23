'use client';

import { ErrorBoundary } from '@/components/ui/ErrorBoundary';
import { CostCalculator } from '@/components/calculator/CostCalculator';

export default function CalculatorPage() {
  return (
    <ErrorBoundary>
      <CostCalculator />
    </ErrorBoundary>
  );
}

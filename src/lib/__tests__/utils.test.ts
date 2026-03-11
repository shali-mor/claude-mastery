import { describe, it, expect } from 'vitest';
import { cn, formatCost, formatTokens, generateId, slugify } from '../utils';

describe('cn', () => {
  it('merges class names', () => {
    expect(cn('foo', 'bar')).toBe('foo bar');
  });

  it('handles conditional classes', () => {
    expect(cn('foo', false && 'bar', 'baz')).toBe('foo baz');
  });

  it('resolves tailwind conflicts (last wins)', () => {
    expect(cn('p-4', 'p-2')).toBe('p-2');
  });

  it('handles empty input', () => {
    expect(cn()).toBe('');
  });
});

describe('formatCost', () => {
  it('returns $0.00 for negligible amounts', () => {
    expect(formatCost(0)).toBe('$0.00');
    expect(formatCost(0.0000001)).toBe('$0.00');
  });

  it('formats sub-cent amounts with 6 decimal places', () => {
    expect(formatCost(0.000001)).toBe('$0.000001');
    expect(formatCost(0.005)).toBe('$0.005000');
  });

  it('formats cent-range amounts with 4 decimal places', () => {
    expect(formatCost(0.05)).toBe('$0.0500');
    expect(formatCost(0.5)).toBe('$0.5000');
  });

  it('formats dollar amounts with 2 decimal places', () => {
    expect(formatCost(1.5)).toBe('$1.50');
    expect(formatCost(10)).toBe('$10.00');
  });
});

describe('formatTokens', () => {
  it('returns raw count below 1K', () => {
    expect(formatTokens(0)).toBe('0');
    expect(formatTokens(999)).toBe('999');
  });

  it('formats thousands as K', () => {
    expect(formatTokens(1000)).toBe('1K');
    expect(formatTokens(1500)).toBe('2K'); // toFixed(0) rounds
  });

  it('formats millions as M', () => {
    expect(formatTokens(1_000_000)).toBe('1.0M');
    expect(formatTokens(1_500_000)).toBe('1.5M');
  });
});

describe('generateId', () => {
  it('returns a non-empty string', () => {
    const id = generateId();
    expect(typeof id).toBe('string');
    expect(id.length).toBeGreaterThan(0);
  });

  it('returns unique values on each call', () => {
    const ids = new Set(Array.from({ length: 100 }, generateId));
    expect(ids.size).toBe(100);
  });
});

describe('slugify', () => {
  it('lowercases text', () => {
    expect(slugify('Hello World')).toBe('hello-world');
  });

  it('replaces spaces with hyphens', () => {
    expect(slugify('foo bar')).toBe('foo-bar');
  });

  it('collapses multiple spaces into one hyphen', () => {
    expect(slugify('foo  bar')).toBe('foo-bar');
  });

  it('removes special characters', () => {
    expect(slugify('Hello, World!')).toBe('hello-world');
  });

  it('handles already-slug input', () => {
    expect(slugify('already-slug')).toBe('already-slug');
  });
});

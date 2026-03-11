---
description: Find untested code and write missing Vitest tests
---

# Test Coverage

Improve test coverage for `$ARGUMENTS`.
If no argument is given, scan the entire `src/` directory.

## Steps

1. List existing test files:
   ```
   find src -name "*.test.*" -o -name "*.spec.*"
   ```

2. Read the source files in the target area.

3. Identify untested code, prioritised by risk:
   1. Utility / pure functions (easiest to test, highest ROI)
   2. API route handlers (validation, auth, error paths)
   3. Custom React hooks
   4. UI components with logic

4. Write Vitest tests in `src/**/__tests__/` using these patterns:

### Pure functions
```ts
describe('functionName', () => {
  it('handles the happy path', () => { ... });
  it('handles empty / null input', () => { ... });
  it('handles boundary values', () => { ... });
});
```

### API routes
```ts
it('returns 401 when unauthenticated', async () => {
  const req = new Request('http://localhost/api/foo', { method: 'POST' });
  const res = await POST(req as never);
  expect(res.status).toBe(401);
});
```

### React hooks
```ts
import { renderHook } from '@testing-library/react';

const { result } = renderHook(() => useMyHook());
expect(result.current.value).toBe(expectedValue);
```

5. Run `npm test` after writing and fix any failures before finishing.

Focus on the paths that would hurt most if broken in production.

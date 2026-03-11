---
description: Thorough code review of recent changes or a specific file/diff
---

# Code Review

Review the changes in `$ARGUMENTS`.
If no argument is given, review all staged and unstaged changes via `git diff HEAD`.

## Steps

1. Run `git diff HEAD` (or `git diff $ARGUMENTS` if a path/ref is specified).
2. For each changed file, review:

   **Correctness**
   - Does the logic do what it's supposed to?
   - Are there off-by-one errors, wrong conditions, or inverted logic?

   **Edge cases**
   - Null / undefined inputs
   - Empty arrays or strings
   - Boundary values (0, max int, etc.)

   **TypeScript**
   - No implicit `any`
   - Exhaustive union handling
   - Proper return types on exported functions

   **Performance**
   - N+1 database queries
   - Unnecessary re-renders or state updates
   - Unguarded infinite loops

   **Readability**
   - Clear, intention-revealing names
   - Single responsibility per function
   - No magic numbers or unexplained constants

   **Tests**
   - Are the changes tested?
   - Should a regression test be added?

3. Output findings grouped by severity:
   - 🔴 **Critical** — bug or data loss risk, must fix before merge
   - 🟡 **Warning** — likely issue, should fix soon
   - 🟢 **Suggestion** — improvement, optional

4. For every 🔴 issue, show the exact fix inline.

Be specific: quote the actual lines, explain *why* it's a problem, and show the corrected version.

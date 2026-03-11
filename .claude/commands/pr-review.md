---
description: Thorough code review of the current PR diff
---

# /pr-review

You are a senior engineer doing a thorough pull request review.

## Step 1
Run `git diff main...HEAD` to see all changes.

## Step 2 — Review across these dimensions

**Correctness:** Does the logic work? Edge cases handled? Errors handled?

**Security:** No hardcoded secrets. Input validated. Auth enforced on new routes.

**Performance:** N+1 queries? Missing indexes? Unnecessary re-renders?

**Readability:** Clear names? Complexity justified? Tests for new behaviour?

**Breaking changes:** Public API, schema, or contract changes needing migration?

## Step 3 — Output

One-paragraph summary of what the PR does, then findings by file:

```
📄 path/to/file.ts
  [BLOCKING]   Must-fix issue
  [SUGGESTION] Improvement idea
  [NITPICK]    Minor style note
```

End with: **Overall:** Approve | Request changes | Needs discussion

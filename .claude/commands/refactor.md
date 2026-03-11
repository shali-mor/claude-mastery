---
description: Refactor for clarity without changing behaviour
---

# /refactor

Refactor $ARGUMENTS for improved readability. Do NOT change observable behaviour.

## Step 1 — Identify code smells
- Functions >40 lines
- Nesting >3 levels deep
- Repeated logic (copy-paste code)
- Unclear names (single letters, abbreviations)
- Magic numbers and strings
- God functions doing too many things

## Step 2 — Plan, then confirm before proceeding

## Step 3 — Refactor in order
1. Rename for clarity
2. Extract magic values into named constants
3. Extract repeated logic into helpers
4. Break large functions into single-purpose functions
5. Flatten nesting with early returns
6. Remove dead code

Rules:
- One type of refactor at a time
- Every function name reads like a sentence
- Run tests after changes to verify behaviour is preserved
- No new features — refactor only

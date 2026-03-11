---
description: Write comprehensive tests for a file or function
---

# /write-tests

Write comprehensive tests for $ARGUMENTS.

## Step 1 — Read the code
Identify all exported functions/classes/components, their inputs/outputs, and dependencies to mock.

## Step 2 — Check existing conventions
Find 1–2 existing test files to understand framework (Jest, Vitest, Playwright), naming, and mocking patterns.

## Step 3 — Write tests covering

**Happy paths** — normal inputs produce expected outputs

**Edge cases:**
- Empty, null, undefined, zero, empty array
- Max/min values

**Error paths:**
- Invalid inputs throw the right error
- Network/DB failures handled gracefully

## Step 4
Place the test file following project conventions.
Print: N tests written covering X functions.

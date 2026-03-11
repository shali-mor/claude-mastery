---
description: Generate a conventional commit message from staged changes
---

# /commit

Generate a conventional commit message for the staged changes.

## Step 1
Run `git diff --staged`. If nothing staged, run `git diff HEAD`.

## Step 2 — Write the commit
Format: `type(scope): short description`

Types: feat | fix | docs | style | refactor | test | chore | perf | ci

Rules:
- Imperative mood, lowercase, ≤72 chars, no trailing period
- Body: explain the WHY — wrap at 72 chars
- Footer: `BREAKING CHANGE: description` if public API changes
- Footer: `Closes #123` if it fixes a GitHub issue

## Step 3
Present in a code block, then ask: "Run this commit? (yes or edit)"
If confirmed: `git commit -m "<message>"`

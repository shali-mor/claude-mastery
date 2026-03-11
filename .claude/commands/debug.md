---
description: Systematically debug a bug using the scientific method
---

# /debug

Debug the issue described in $ARGUMENTS using the scientific method.

## Step 1 — Understand the symptom
Restate in one sentence: what happens vs what should happen.

## Step 2 — Gather evidence
- Check recent git log: `git log --oneline -10`
- Read the error and stack trace carefully
- Search for the error string: `grep -r "error text" src/`
- Read the files in the stack trace

## Step 3 — Form hypotheses
List 2–4 possible root causes ranked by likelihood.

## Step 4 — Test hypotheses
Test the most likely first. Add a targeted log or read a value.
Do NOT change production logic yet.

## Step 5 — Fix
Once root cause confirmed:
- Make the minimal change that fixes it
- Explain why the fix works
- Note related areas with the same bug
- Suggest a regression test

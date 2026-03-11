---
description: Analyse a task and recommend the most cost-effective Claude model
---

# /pick-model

Analyse the task described in $ARGUMENTS and recommend the most
cost-effective Claude model that can handle it reliably.

## Scoring criteria

Assign one point for each of the following that applies:
1. Requires multi-step reasoning or planning
2. Involves debugging a non-obvious bug
3. Touches more than 5 files or >300 lines of code
4. Needs to understand broader system architecture
5. Is a research or synthesis task (not just writing code)

## Decision

| Score | Model | Switch command |
|-------|-------|---------------|
| 0–1   | Haiku  | `claude --model claude-haiku-4-5-20251001` |
| 2–3   | Sonnet | `claude --model claude-sonnet-4-6` |
| 4–5   | Opus   | `claude --model claude-opus-4-6` |

## Output format

```
Task: <one-line summary>
Score: N/5
Recommendation: <Model name>
Reason: <one sentence explaining the key factor>
Switch: <exact command to run>
Estimated saving vs Opus: ~Nx cheaper
```

If $ARGUMENTS is empty, ask: "Describe the task you're about to start."

#!/bin/bash
# PostToolUse hook: auto-sync exercises repo when lesson content changes.
# Injects a directive with the git diff so Claude acts immediately.

INPUT=$(cat)
FILE=$(echo "$INPUT" | jq -r '.tool_input.file_path // .tool_input.path // empty' 2>/dev/null)

# Only trigger on lesson content files
if ! echo "$FILE" | grep -qE "src/data/(modules|quizzes|exercisePaths|commands)\.ts$"; then
  exit 0
fi

BASENAME=$(basename "$FILE")
PROJECT_ROOT=$(git -C "$(dirname "$FILE")" rev-parse --show-toplevel 2>/dev/null)

# Prefer staged diff; fall back to working-tree diff
DIFF=$(cd "$PROJECT_ROOT" && git diff HEAD -- "$FILE" 2>/dev/null | head -400)
if [ -z "$DIFF" ]; then
  DIFF=$(cd "$PROJECT_ROOT" && git diff -- "$FILE" 2>/dev/null | head -400)
fi
if [ -z "$DIFF" ]; then
  DIFF="(no git diff available — file may be newly created)"
fi

cat <<DIRECTIVE
---
🔄 LESSON CONTENT AUTO-SYNC

$BASENAME was just modified. Automatically update the exercises repo now.
Do NOT ask the user — just do it.

Exercises repo: https://github.com/shali-mor/claude-mastery-exercises

Diff:
\`\`\`diff
$DIFF
\`\`\`

Steps (execute immediately):
1. Read src/data/exercisePaths.ts to get the lesson-ID → repo-path mapping
2. Identify every lesson ID that appears in the diff above
3. For each affected lesson:
   a. Fetch its current README: gh api repos/shali-mor/claude-mastery-exercises/contents/<path>/README.md
   b. Decode the content (base64) and update it to reflect the lesson changes
   c. Push the updated README back with: gh api ... -X PUT -f content="<base64>" -f sha="<sha>" -f message="..."
4. If a lesson is entirely new and has no README yet, create one following the structure of existing READMEs in that module
---
DIRECTIVE

exit 0

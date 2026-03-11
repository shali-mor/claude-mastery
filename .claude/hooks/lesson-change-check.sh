#!/bin/bash
# Fires after every Edit/Write tool use.
# If a lesson content file was modified, injects a prompt asking whether
# the practice exercises repository also needs to be updated.

INPUT=$(cat)
FILE=$(echo "$INPUT" | jq -r '.tool_input.file_path // .tool_input.path // empty' 2>/dev/null)

# Watch these files — they define lesson content
if echo "$FILE" | grep -qE "src/data/(modules|quizzes|exercisePaths|commands)\.ts$"; then
  BASENAME=$(basename "$FILE")
  echo "---"
  echo "📚 Lesson content file modified: $BASENAME"
  echo ""
  echo "The practice exercises repository may need to match this change:"
  echo "  https://github.com/shali-mor/claude-mastery-exercises"
  echo ""
  echo "Please ask the user: 'I just updated $BASENAME. Should the practice exercises repo be updated too? If yes, tell me what to change and I can open a task or guide you through it.'"
  echo "---"
fi

exit 0

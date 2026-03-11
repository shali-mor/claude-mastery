#!/bin/bash
# .claude/hooks/model-guard.sh
# UserPromptSubmit hook — warns when Opus is used for simple tasks.
# Claude sees the warning and can suggest switching before proceeding.

PROMPT=$(cat)
CURRENT_MODEL=${CLAUDE_MODEL:-"unknown"}

# Only warn if on an expensive model
if [[ "$CURRENT_MODEL" != *"opus"* && "$CURRENT_MODEL" != *"sonnet"* ]]; then
  echo '{"action":"continue"}'
  exit 0
fi

PROMPT_TEXT=$(echo "$PROMPT" | jq -r '.prompt // empty' 2>/dev/null || echo "$PROMPT")
WORD_COUNT=$(echo "$PROMPT_TEXT" | wc -w | tr -d ' ')

# Simple-task signals: short prompt with common simple-task keywords
if [ "$WORD_COUNT" -lt 20 ]; then
  SIMPLE_KEYWORDS="rename|fix typo|add comment|format|prettier|lint|reword|change color|update text|bump version"
  if echo "$PROMPT_TEXT" | grep -qiE "($SIMPLE_KEYWORDS)"; then
    echo '{"action":"continue","message":"⚠️  Cost tip: this looks like a simple task. Consider switching to Haiku (claude --model claude-haiku-4-5-20251001) — it costs ~20× less and handles this easily."}'
    exit 0
  fi
fi

echo '{"action":"continue"}'
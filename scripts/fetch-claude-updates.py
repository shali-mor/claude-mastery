#!/usr/bin/env python3
"""
Fetches Claude Code release info and calls the Gemini API to identify new features.
Writes NEW_UPDATES.json if new entries are found.
"""
import os, json, urllib.request, urllib.error, sys

api_key = os.environ.get("GEMINI_API_KEY", "")
latest_version = os.environ.get("LATEST_VERSION", "unknown")
changelog = os.environ.get("CHANGELOG", "")
whats_new_path = os.environ.get("WHATS_NEW_PATH", "src/data/whats-new.ts")

if not api_key:
    print("No GEMINI_API_KEY — skipping analysis")
    sys.exit(0)

with open(whats_new_path, "r") as f:
    current_data = f.read()

prompt = f"""You are maintaining the "What's New" feed for a Claude Code tutorial website.

Current whats-new.ts:
{current_data[:6000]}

Latest @anthropic-ai/claude-code version: {latest_version}

Changelog / release notes fetched today:
{changelog[:4000] if changelog else "(unavailable — use your knowledge of recent Claude Code updates)"}

Task:
1. Identify Claude Code features, commands, skills, hooks, or behaviors that are NEW and NOT already listed in the whats-new.ts above.
2. Focus especially on: new slash commands, new hook events, new Agent parameters (like isolation), new skill frontmatter fields, settings.json additions, sub-agent capabilities, MCP improvements, context window tools, cost/model features.
3. Only include things that are confirmed and specific — not vague or speculative.
4. For each new item, output a TypeScript object in this exact format (as a JSON array for easy parsing):

Output format — a JSON array of objects:
[
  {{
    "id": "unique-kebab-id-YYYY",
    "date": "YYYY-MM",
    "category": "command|skill|plugin|hook|behavior|api|security",
    "title": "Short title (max 60 chars)",
    "summary": "One sentence describing what changed and why it matters.",
    "detail": "Optional extra context or usage example. Can be empty string.",
    "tutorialCovered": false,
    "sourceUrl": "https://docs.anthropic.com/en/docs/claude-code/<relevant-page>"
  }}
]

For sourceUrl, use the most relevant official docs page. Common values:
- commands/slash commands: https://docs.anthropic.com/en/docs/claude-code/cli-reference
- hooks: https://docs.anthropic.com/en/docs/claude-code/hooks
- memory: https://docs.anthropic.com/en/docs/claude-code/memory
- MCP: https://docs.anthropic.com/en/docs/claude-code/mcp
- sub-agents/worktrees: https://docs.anthropic.com/en/docs/claude-code/sub-agents
- settings: https://docs.anthropic.com/en/docs/claude-code/settings
- skills/slash commands: https://docs.anthropic.com/en/docs/claude-code/slash-commands
- plugins: https://docs.anthropic.com/en/docs/claude-code/plugins
- overview: https://docs.anthropic.com/en/docs/claude-code/overview

If there are no new items to add, output exactly: NO_NEW_UPDATES

Only output the JSON array or NO_NEW_UPDATES — no other text."""

req_data = json.dumps({
    "contents": [{"parts": [{"text": prompt}]}],
    "generationConfig": {"maxOutputTokens": 2048},
}).encode()

req = urllib.request.Request(
    f"https://generativelanguage.googleapis.com/v1beta/models/gemini-2.0-flash:generateContent?key={api_key}",
    data=req_data,
    headers={"content-type": "application/json"},
)

try:
    with urllib.request.urlopen(req, timeout=30) as resp:
        result = json.loads(resp.read())
        text = result["candidates"][0]["content"]["parts"][0]["text"].strip()
        print(f"Gemini response (first 200 chars): {text[:200]}")

        if "NO_NEW_UPDATES" in text:
            print("No new updates found.")
            sys.exit(0)

        try:
            entries = json.loads(text)
            if not isinstance(entries, list) or len(entries) == 0:
                print("Empty or invalid response.")
                sys.exit(0)

            with open("NEW_UPDATES.json", "w") as f:
                json.dump(entries, f, indent=2)
            print(f"Found {len(entries)} new entries — wrote NEW_UPDATES.json")
        except json.JSONDecodeError as e:
            print(f"Could not parse JSON response: {e}")
            with open("NEW_UPDATES_RAW.txt", "w") as f:
                f.write(text)
            print("Saved raw response to NEW_UPDATES_RAW.txt")

except urllib.error.HTTPError as e:
    body = e.read().decode("utf-8", errors="replace")
    print(f"Gemini API HTTP error {e.code}: {body[:500]}")
    sys.exit(0)
except Exception as e:
    print(f"Gemini API error: {e}")
    sys.exit(0)

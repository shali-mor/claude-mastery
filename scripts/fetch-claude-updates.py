#!/usr/bin/env python3
"""
Fetches Claude Code release info and calls the Claude API to identify new features.
Writes NEW_UPDATES.json if new entries are found.
"""
import os, json, urllib.request, urllib.error, sys

api_key = os.environ.get("ANTHROPIC_API_KEY", "")
latest_version = os.environ.get("LATEST_VERSION", "unknown")
changelog = os.environ.get("CHANGELOG", "")
whats_new_path = os.environ.get("WHATS_NEW_PATH", "src/data/whats-new.ts")

if not api_key:
    print("No ANTHROPIC_API_KEY — skipping analysis")
    sys.exit(0)

with open(whats_new_path, "r") as f:
    current_data = f.read()

prompt = f"""You are maintaining the "What's New" feed for a Claude Code tutorial website.

Current whats-new.ts (first 4000 chars):
{current_data[:4000]}

Latest @anthropic-ai/claude-code version: {latest_version}

Changelog / release notes fetched today:
{changelog[:2000] if changelog else "(unavailable — use your knowledge of recent Claude Code updates)"}

Task:
1. Identify Claude Code features, commands, skills, hooks, or behaviors that are NEW and NOT already listed in the whats-new.ts above.
2. Only include things that are confirmed and specific — not vague or speculative.
3. For each new item, output a TypeScript object in this exact format (as a JSON array for easy parsing):

Output format — a JSON array of objects:
[
  {{
    "id": "unique-kebab-id-YYYY",
    "date": "YYYY-MM",
    "category": "command|skill|plugin|hook|behavior|api|security",
    "title": "Short title (max 60 chars)",
    "summary": "One sentence describing what changed and why it matters.",
    "detail": "Optional extra context or usage example. Can be empty string.",
    "tutorialCovered": false
  }}
]

If there are no new items to add, output exactly: NO_NEW_UPDATES

Only output the JSON array or NO_NEW_UPDATES — no other text."""

req_data = json.dumps({
    "model": "claude-3-5-haiku-20241022",
    "max_tokens": 2048,
    "messages": [{"role": "user", "content": prompt}]
}).encode()

req = urllib.request.Request(
    "https://api.anthropic.com/v1/messages",
    data=req_data,
    headers={
        "x-api-key": api_key,
        "anthropic-version": "2023-06-01",
        "content-type": "application/json",
    }
)

try:
    with urllib.request.urlopen(req, timeout=30) as resp:
        result = json.loads(resp.read())
        text = result["content"][0]["text"].strip()
        print(f"Claude response (first 200 chars): {text[:200]}")

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
    print(f"Claude API HTTP error {e.code}: {body[:500]}")
    sys.exit(0)
except Exception as e:
    print(f"Claude API error: {e}")
    sys.exit(0)

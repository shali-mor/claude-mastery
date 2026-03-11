---
description: Check Claude Code for new features not yet documented in the tutorial
argument-hint: [optional: focus area e.g. "hooks" or "skills"]
allowed-tools: [WebFetch, WebSearch, Read, Write, Bash]
---

# Check Claude Code Updates

Scan for new Claude Code features and update the tutorial's What's New feed.

## Steps

1. **Fetch the latest Claude Code info** from these sources:
   - WebFetch `https://code.claude.com/docs/en/changelog` (official changelog)
   - WebFetch `https://code.claude.com/docs/en/release-notes` (if exists)
   - Bash: `npm view @anthropic-ai/claude-code --json` (version + description)
   - WebSearch: "Claude Code new features 2026 site:anthropic.com OR site:code.claude.com"

2. **Read the current What's New data:**
   ```
   Read src/data/whats-new.ts
   ```

3. **Compare** — identify features, commands, skills, or behaviors that are:
   - Genuinely new (not already in whats-new.ts)
   - Specific and verifiable (not vague marketing language)
   - Focus on: $ARGUMENTS (or all categories if no argument given)

4. **For each new item found**, add an entry to `src/data/whats-new.ts`:
   ```typescript
   {
     id: 'unique-kebab-id-YYYY',
     date: 'YYYY-MM',
     category: 'command' | 'skill' | 'plugin' | 'hook' | 'behavior' | 'api',
     title: 'Short descriptive title',
     summary: 'One sentence: what changed and why it matters.',
     detail: 'Optional: extra context, usage example, or link.',
     lessonRef: 'lesson-X-Y', // only if already covered in the tutorial
     tutorialCovered: false,  // set true only if lesson already covers it
   },
   ```

5. **Check which lessons need updating** — for each new entry where `tutorialCovered: false`:
   - Look at the relevant module in `src/data/modules.ts`
   - Decide if the feature belongs in an existing lesson or needs a new one
   - Output a prioritized list: "Lesson X-Y should mention [feature] because [reason]"

6. **Output a summary:**
   ```
   ✅ X new entries added to whats-new.ts
   📚 Lessons to update: [list]
   ⏭️ Already documented: [count]
   ```

Do not add speculative or unverified entries. Only add things that are confirmed in official docs or release notes.

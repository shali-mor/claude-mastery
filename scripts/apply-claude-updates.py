#!/usr/bin/env python3
"""
Applies entries from NEW_UPDATES.json into src/data/whats-new.ts.
Inserts new entries at the top of the whatsNew array.
"""
import json, re, sys, os

updates_file = "NEW_UPDATES.json"
whats_new_path = os.environ.get("WHATS_NEW_PATH", "src/data/whats-new.ts")

if not os.path.exists(updates_file):
    print("No NEW_UPDATES.json found — nothing to apply.")
    sys.exit(0)

with open(updates_file) as f:
    new_entries = json.load(f)

with open(whats_new_path, "r") as f:
    content = f.read()

# Build TypeScript entries
ts_entries = []
for e in new_entries:
    detail = e.get("detail", "").replace("'", '"')
    detail_line = f"\n    detail: '{detail}'," if detail else ""
    title = e.get("title", "").replace("'", '"')
    summary = e.get("summary", "").replace("'", '"')
    entry = (
        f"  {{\n"
        f"    id: '{e['id']}',\n"
        f"    date: '{e['date']}',\n"
        f"    category: '{e['category']}',\n"
        f"    title: '{title}',\n"
        f"    summary: '{summary}',{detail_line}\n"
        f"    tutorialCovered: false,\n"
        f"  }},"
    )
    ts_entries.append(entry)

insertion = (
    "\n  // ── Auto-detected ──────────────────────────────────────────────────────\n"
    + "\n".join(ts_entries)
    + "\n"
)

# Insert right after the opening of the whatsNew array
updated = re.sub(
    r"(export const whatsNew: WhatsNewEntry\[\] = \[)",
    r"\1" + insertion,
    content,
    count=1,
)

if updated == content:
    # Fallback: insert before closing ];
    updated = content.replace("\n];\n", insertion + "\n];\n", 1)

if updated == content:
    print("ERROR: Could not find insertion point in whats-new.ts")
    sys.exit(1)

with open(whats_new_path, "w") as f:
    f.write(updated)

print(f"Added {len(new_entries)} entries to {whats_new_path}")

---
description: Add JSDoc comments to a function
---

# /add-jsdoc

Add JSDoc comments to the function named $ARGUMENTS.

Include:
- A one-line summary of what the function does
- @param tags for every parameter with type and description
- @returns tag with type and description
- @throws tag if the function can throw

Rules:
- Do NOT modify the function body or signature
- Use the TypeScript types from the source if available
- Keep descriptions concise (one sentence each)
- Place the JSDoc block immediately above the function

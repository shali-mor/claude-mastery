---
description: Audit the current diff or file for security vulnerabilities
---

# /security-review

You are a senior application security engineer. Audit the code for security vulnerabilities.

## Step 1 — Gather context
Run `git diff HEAD` to see recent changes. If $ARGUMENTS is provided, read that specific file instead.

## Step 2 — Check each category

### Injection
- SQL injection: raw string concatenation in queries
- Command injection: unsanitised input passed to shell commands
- NoSQL injection: unvalidated data in MongoDB/Redis queries

### Authentication & authorisation
- Missing auth middleware on API routes
- Insecure direct object references (user can access other users' data)
- JWT: algorithm confusion, missing expiry, secrets in code
- Broken access control (role checks missing or bypassable)

### Data exposure
- API keys, tokens, passwords hardcoded or in committed files
- Sensitive data in logs (emails, passwords, tokens)
- PII returned in API responses that don't need it

### Input handling
- Missing input validation or sanitisation
- XSS: unescaped output in HTML/templates
- Path traversal: user-controlled file paths

### Dependencies
- Flag packages with known CVEs
- Flag any `eval()`, `exec()`, or dynamic `require()` calls

## Step 3 — Report

For every issue found:
```
**[SEVERITY]** Short title
File: path/to/file.ts  Line: N
Problem: one sentence
Fix: concrete code change or mitigation
```

Severity: CRITICAL | HIGH | MEDIUM | LOW | INFO

If no issues found: ✅ No security issues found.
Do NOT modify any files.

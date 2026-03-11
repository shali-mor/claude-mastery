---
description: OWASP security audit of recent changes or a specified file
argument-hint: [file-path — omit to audit all recent changes]
allowed-tools: [Bash, Read, Grep, Glob]
---

# Security Review

Perform a security audit of `$ARGUMENTS`.
If no argument is given, audit all recent changes via `git diff HEAD`.

## Checklist

Run `git diff HEAD` (or read the specified files), then check each item:

### Injection
- [ ] SQL injection — raw string interpolation in queries?
- [ ] Command injection — `exec`/`spawn` with unsanitized user input?
- [ ] XSS — `dangerouslySetInnerHTML` or unescaped user content in HTML?

### Authentication & Authorization
- [ ] API routes missing an auth check (`auth()` / session validation)?
- [ ] Insecure direct object reference — can user A access user B's data?
- [ ] Hardcoded secrets, API keys, or credentials in source code?

### Input Validation
- [ ] User-supplied data used without validation (type, length, format)?
- [ ] Missing Content-Type check on API routes accepting JSON?
- [ ] Overly permissive CORS (`Access-Control-Allow-Origin: *` on auth'd endpoints)?

### Sensitive Data
- [ ] PII or secrets written to logs or error messages?
- [ ] Sensitive values in URLs (query params, path params)?
- [ ] `.env` files or secrets accidentally staged?

### Dependencies
- [ ] Run `npm audit` — any new high/critical vulnerabilities?
- [ ] Any `eval()`, `Function()`, or dynamic `require()` added?

## Output Format

Report findings as:
- 🚨 **Critical** — exploitable now, block deploy until fixed
- ⚠️ **High** — significant risk, fix within 24h
- 💡 **Informational** — best-practice improvement

For each finding: exact file + line, attack scenario, and the precise fix.

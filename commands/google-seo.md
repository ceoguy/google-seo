---
description: Do anything SEO grounded in Google's official docs (google-seo skill) — audit, fix, plan, or look up a rule
argument-hint: "[what you want — audit a site, fix indexing, look up a rule, etc.]"
allowed-tools: Bash(node:*), Bash(command -v:*), Grep, Read, Edit, Write, Skill
---
General entry point for the **google-seo** skill. Use for any SEO task not covered by the more specific commands.

1. **Load the skill first.** Invoke the Skill tool with `skill: "google-seo"` before answering, so the response is grounded in the corpus at `~/.claude/skills/google-seo/docs/`, not general knowledge.
2. **Route by intent of `$ARGUMENTS`:**
   - Auditing a live site → run the auditor (`node ~/.claude/skills/google-seo/audit.mjs <url> --render --json /tmp/seo-report.json`) and triage; same as `/google-seo-audit`.
   - Fixing SEO in a repo → the audit→fix→re-audit loop; same as `/google-seo-fix`.
   - Planning → the corpus build-order; same as `/google-seo-plan`.
   - A specific question ("does X need Y?", "why isn't this indexed?", "what does this structured-data feature require?") → answer from the reference sheets, grepping `docs/` for anything the sheets don't cover.
3. **Ground every claim.** Cite the Google doc. If the corpus doesn't say it, say so — never pass folklore off as documented policy. Partition any findings into auto-fix vs handoff and never fake a handoff.

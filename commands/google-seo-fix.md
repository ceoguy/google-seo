---
description: Audit the current repo's site, then fix the auto-fixable SEO findings and re-audit until clean
argument-hint: "[url]  — default: the production URL of the repo you're in"
allowed-tools: Bash(node:*), Bash(command -v:*), Bash(test:*), Bash(npm:*), Bash(git:*), Read, Edit, Write, Skill
---
Audit, then FIX the site's SEO in this codebase, the way Google documents it. Run this from inside the site's repo.

1. **Load the skill first.** Invoke the Skill tool with `skill: "google-seo"`.
2. **Target.** URL from `$ARGUMENTS`, else the production URL from the repo's config (confirm it before touching anything).
3. **Audit.** `node ~/.claude/skills/google-seo/audit.mjs <url> --render --json /tmp/seo-report.json` (see `/google-seo-audit` for flags/Chrome notes).
4. **Fix causes, not findings.** Work the **auto-fix** list only. N findings usually share one root cause (an unrendered shell, a shared template, a bad rewrite/route rule) — fix the cause. Match the codebase's conventions.
5. **Verify in the built artifact, not just the source.** After each fix, build and confirm the change is in the output the server actually serves. Deploy only with the user's go — production deploys are the user's call; prepare and verify first.
6. **Re-audit.** Repeat from 3. **Stop when two consecutive runs are clean**, or after 5 iterations without convergence — then report what will not converge and why. Never loop forever.
7. **Never fake a handoff finding.** aggregateRating you can't verify, backlinks, real-content quality, Core Web Vitals field data — surface them for the human; don't pretend to close them.

Report which files you changed, what each fix addressed, and the before/after finding counts.

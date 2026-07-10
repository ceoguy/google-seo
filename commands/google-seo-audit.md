---
description: Audit a live site's SEO against Google's official docs using the google-seo skill
argument-hint: "<url>  — e.g. https://example.com"
allowed-tools: Bash(node:*), Bash(command -v:*), Bash(test:*), Read, Skill
---
Audit the SEO of a live site strictly against Google's Search Central documentation.

1. **Load the skill first.** Invoke the Skill tool with `skill: "google-seo"` before anything else, so every finding is grounded in the corpus at `~/.claude/skills/google-seo/docs/`.
2. **Target.** Use the URL in `$ARGUMENTS`. If none was given, ask for one (or infer the production URL from the current repo's config and confirm it).
3. **Run the auditor.** `node ~/.claude/skills/google-seo/audit.mjs <url> --render --json /tmp/seo-report.json`
   - Needs Node ≥ 22; `--render` needs Chrome (`CHROME=/path` if not auto-found). If Chrome is missing, drop `--render` and say the raw-vs-rendered delta was skipped.
   - Large site? add `--max-pages 800 --max-sitemaps 20`.
4. **Triage the report — do not just dump it.** Partition findings into **auto-fix** (a code change closes it) and **handoff** (needs a human, Search Console, real content). Group by *root cause* — N findings usually share one cause. Lead with the criticals and highs.
5. **Report** the gap plainly: what's wrong, why it matters (cite the Google doc each finding names), and the shortest fix. Never invent a fix Google's docs don't support; if the corpus is silent, say so.

Do NOT change any code under this command — this is read-only. To fix, use `/google-seo-fix`.

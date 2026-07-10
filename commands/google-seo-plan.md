---
description: Build an SEO plan grounded in Google's official docs (new site or existing)
argument-hint: "<what the site is about, or a URL to plan improvements for>"
allowed-tools: Bash(node:*), Grep, Read, Skill
---
Produce an SEO plan grounded in Google's Search Central docs — not blog folklore.

1. **Load the skill first.** Invoke the Skill tool with `skill: "google-seo"`.
2. **Scope.** `$ARGUMENTS` is either a description of the site/product (plan from scratch) or a URL (plan improvements). If it's a URL, run `/google-seo-audit` on it first and build the plan on top of the real gaps.
3. **Follow the skill's build-order**, reading each reference sheet as you go: Search Essentials + spam policies (`references/essentials-and-content.md`) → `crawling.md` → `indexing-canonical.md` → `sitemaps.md` → `javascript-seo.md` → `structured-data.md` → `international.md` (only if multilingual) → `page-experience.md`. `monitoring-and-analytics.md` covers Search Console.
4. **Every recommendation cites the Google page that mandates it.** If a claim is not in the corpus (grep `~/.claude/skills/google-seo/docs/`), mark it `UNKNOWN — not stated in corpus` rather than asserting it. Flag anything gated (e.g. VacationRental needs a Google TAM + Hotel Center) so nothing is promised that can't be had.
5. **Deliver** a prioritized, sequenced plan: what to do, in what order, why (with the doc citation), and which items are code vs content vs off-page.

---
name: google-seo
description: >
  Build, audit, and fix a site's SEO strictly against Google's official Search Central
  documentation. Use when asked to audit SEO, fix indexing/canonical/sitemap/robots problems,
  set up SEO for a new site, check why pages aren't ranking or aren't indexed, look up what a
  structured-data feature requires, diagnose a traffic drop, verify hreflang/i18n, or make a
  JavaScript/SPA site crawlable.
  Ships a runnable auditor (audit.mjs) that diffs raw HTML against the rendered DOM — the check
  that catches client-rendered SEO, which Google renders (eventually) but AI crawlers never do.
  Every rule cites the Google doc that mandates it. Triggers: "SEO audit", "technical SEO",
  "not indexed", "canonical", "sitemap", "robots.txt", "hreflang", "structured data",
  "rich results", "Core Web Vitals", "traffic drop", "Search Console", "make my site rank".
---

# google-seo

Do SEO the way Google documents it, not the way blogs remember it. Every rule in `references/`
carries an exact quote and a path into a local fork of Search Central (158 pages, `docs/`).

**Know what this is and isn't.** `docs/` is the complete corpus — 158 of 158 pages. The
`references/` sheets summarize the subset that matters for a typical site audit, and
`audit.mjs` mechanically checks a subset of *those*. When a question falls outside the sheets,
**grep `docs/` directly** — it is the source of truth, and it is complete. See
`references/COVERAGE.md` for exactly which pages are summarized and which are not.

## The one thing most audits miss

Google runs **three phases: crawl → render → index**, and rendering sits in a queue that "may stay
on this queue for a few seconds, but it can take longer than that." Most other consumers of your
HTML — ChatGPT, Claude, Perplexity crawlers, Slack/X/WhatsApp unfurlers — **never render at all**.

So a client-rendered `<title>`, canonical, hreflang, or JSON-LD is invisible to them, and delayed
for Google. `audit.mjs --render` fetches both views and reports the delta. Start there.

Google is explicit about the fix: dynamic rendering is "a workaround and not a recommended
solution"; use **server-side rendering, static rendering, or hydration** instead.

## Workflow

### Auditing an existing site
1. `node audit.mjs https://example.com --render --json out.json`
2. Read the report. Findings are partitioned:
   - **auto-fix** — a code change closes it. This is your work list.
   - **handoff** — needs a human, Search Console, real content, or off-page work. Never fake these.
3. Triage by severity, then by *root cause*. N findings usually share one cause (an unrendered
   shell, a shared template, a bad rewrite rule). Fix causes, not findings.
4. Fix in source. Verify the fix is in the **built artifact**, not just the source.
5. Deploy. Wait for the edge to catch up (CDN caches can hold a stale response for minutes; a
   URL you fetched *before* a rewrite rule existed may serve the pre-rule response until TTL).
6. Re-run. Repeat from 2. **Stop when two consecutive runs are clean**, or after 5 iterations
   without convergence — then report what will not converge. Never loop forever.

### Building a new site
Read `references/essentials-and-content.md` first (Search Essentials + spam policies), then:
`crawling.md` → `indexing-canonical.md` → `sitemaps.md` → `javascript-seo.md` →
`structured-data.md` → `international.md` (only if multilingual) → `page-experience.md`.
`monitoring-and-analytics.md` covers Search Console and how GSC and Analytics disagree.

## Hard-won rules (each cost someone real traffic)

- **A wrong `rel=canonical` is worse than none.** Google ranks `rel=canonical` "A strong signal"
  and sitemap inclusion "A weak signal." A shared SPA shell that hardcodes `canonical` to the
  homepage tells Google every route is a duplicate of the homepage — and it outvotes your sitemap.
  Google's own out: "If you can't set the canonical URL in the HTML source code, leave it out and
  only set it with JavaScript."
- **`Disallow` is not `noindex`.** robots.txt "is not a mechanism for keeping a web page out of
  Google." And a page you disallow *cannot* be seen to have your `noindex` on it.
- **Never disallow your JS/CSS.** "Google Search won't render JavaScript from blocked files."
- **`<priority>` and `<changefreq>` are dead.** "Google ignores `<priority>` and `<changefreq>`
  values." A sitemap entry needs `<loc>`, plus `<lastmod>` *only if it is truthfully accurate*.
- **List only canonical URLs in the sitemap.** Google "generally shows the canonical URLs in its
  search results, which you can influence with sitemaps," and warns: "don't specify one URL in a
  sitemap, but a different URL for that same page using `rel="canonical"`." So a `<loc>` should be
  character-for-character the URL that page self-canonicalizes to.
  (The often-repeated "`/foo` and `/foo/` are different URLs, but at the domain root the slash is
  insignificant" is **not stated anywhere in this corpus** — it comes from Google's 2010 blog post
  *To slash or not to slash*. Treat it as folklore-with-a-source, not documented policy.)
- **hreflang has exactly three sanctioned homes**: HTML `<head>`, HTTP header, or sitemap. Each
  version "must list itself as well as all other language versions," plus `x-default`. A canonical
  must point at a page **in the same language**. Reciprocity is enforced: "If two pages don't both
  point to each other, the tags will be ignored."
- **`?lang=xx` locale URLs are the one i18n structure Google calls "Not recommended."** Prefer
  ccTLD, subdomain, or subdirectory.
- **Never fabricate `aggregateRating`/`Review` markup.** Structured data must describe content
  actually visible on the page. This is a manual-action offense.
- **Rich results can be gated.** `VacationRental` requires a Google Technical Account Manager and
  Hotel Center access; some carousels are beta. Check `references/structured-data.md` before
  promising a client a rich result they cannot get.
- **Don't write separate content "for AI."** Google calls that scaled content abuse. AI Overviews
  and AI Mode need no special markup — they run on core Search ranking.
- **HTML comments are not markup.** A comment that mentions a tag is not that tag; strip comments
  before you regex. (`audit.mjs` learned this the hard way on its first run.)

## audit.mjs

```
node audit.mjs <baseUrl> [--render] [--json out.json] [--max-pages N] [--max-render N] [--max-sitemaps N] [--noindex-ok /a,/b] [--quiet]
```

- Reads `robots.txt` → sitemap(s) → every page. No npm dependencies.
- `--render` drives headless Chrome over the DevTools Protocol (set `CHROME=/path` if not
  auto-found) and diffs raw vs rendered `<head>`. Needs Node ≥ 22. Only the first `--max-render`
  pages (default 25) are rendered; the rest are audited raw-only and the report says which.
- Exit `0` = no code-fixable findings (handoff items may still print) · `1` = auto-fix findings
  remain · `2` = usage error (missing/invalid base URL).
- Coverage is capped by `--max-pages` (default 100) and **logs what it skipped** — a partial crawl
  that reads as "all clear" is the worst possible output.

Checks it does NOT do (by design, they need a human or Google's own tools): Core Web Vitals field
data, manual actions, whether your content is actually helpful, backlink quality, and whether a
rating you marked up is real. Those surface as `handoff`.

## References

| File | Covers |
|---|---|
| `references/crawling.md` | robots.txt, crawlable links, URL structure, Googlebot, recrawl |
| `references/indexing-canonical.md` | canonical, noindex, robots meta, redirects, mobile-first |
| `references/sitemaps.md` | limits, lastmod, sitemap index, image/video/news extensions |
| `references/javascript-seo.md` | render queue, JS-injected head tags, dynamic rendering, lazy load |
| `references/structured-data.md` | feature → type → required props → gating; sd-policies |
| `references/international.md` | hreflang, x-default, locale URL structures, locale adaptation |
| `references/page-experience.md` | Core Web Vitals, interstitials, titles, snippets, AI features |
| `references/essentials-and-content.md` | Search Essentials, spam policies, E-E-A-T, gen-AI content |
| `references/monitoring-and-analytics.md` | Search Console, traffic-drop triage, GSC vs Analytics |
| `references/lifecycle-and-amp.md` | site moves, AMP, removals/redaction, pausing a site, A/B testing |
| `references/appearance-features.md` | snippets, sitelinks, favicons, site names, Discover, images/video, Web Stories |
| `references/ecommerce.md` | ecommerce URL structure, product data feeds, ecommerce structured data, pagination |
| `references/security-and-abuse.md` | malware, hacked content, social engineering, Safe Browsing repeat offenders |
| `references/COVERAGE.md` | which corpus pages the sheets cover (generated mechanically) |
| `docs/` | the full 158-page Google Search Central fork (grep it; it is the source of truth) |

Refresh the corpus: `python3 scripts/fetch-docs.py` (URL list is scraped from the live nav).

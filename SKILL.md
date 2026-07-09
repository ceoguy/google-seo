---
name: google-seo
description: >
  Build, audit, and fix a site's SEO strictly against Google's official Search Central
  documentation. Use when asked to audit SEO, fix indexing/canonical/sitemap/robots problems,
  set up SEO for a new site, check why pages aren't ranking or aren't indexed, validate structured
  data, diagnose a traffic drop, verify hreflang/i18n, or make a JavaScript/SPA site crawlable.
  Ships a runnable auditor (audit.mjs) that diffs raw HTML against the rendered DOM — the check
  that catches client-rendered SEO, which Google renders (eventually) but AI crawlers never do.
  Every rule cites the Google doc that mandates it. Triggers: "SEO audit", "technical SEO",
  "not indexed", "canonical", "sitemap", "robots.txt", "hreflang", "structured data",
  "rich results", "Core Web Vitals", "traffic drop", "Search Console", "make my site rank".
---

# google-seo

Do SEO the way Google documents it, not the way blogs remember it. Every rule in `references/`
carries an exact quote and a path into a local fork of Search Central (158 pages, `docs/`).

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
- **Sitemap `<loc>` must byte-match the page's canonical** — same scheme, host, trailing-slash
  form, and query. `/foo` and `/foo/` are different URLs (at the domain root only, the slash is
  insignificant).
- **hreflang has exactly three sanctioned homes**: HTML `<head>`, HTTP header, or sitemap. Each
  version "must list itself as well as all other language versions," plus `x-default`. A canonical
  must point at a page **in the same language**.
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
node audit.mjs <baseUrl> [--render] [--json out.json] [--max-pages N] [--noindex-ok /a,/b] [--quiet]
```

- Reads `robots.txt` → sitemap(s) → every page. No npm dependencies.
- `--render` drives headless Chrome over the DevTools Protocol (set `CHROME=/path` if not
  auto-found) and diffs raw vs rendered `<head>`. Needs Node ≥ 22.
- Exit `0` clean · `1` auto-fix findings remain · `2` crawl/setup error.
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
| `docs/` | the full 158-page Google Search Central fork (grep it; it is the source of truth) |

Refresh the corpus: `python3 scripts/fetch-docs.py` (URL list is scraped from the live nav).

# google-seo

A Claude Code / Agent skill that does SEO the way **Google documents it**, not the way blog posts
remember it.

It ships three things:

1. **`docs/`** — a local fork of all **158 pages** of [Google Search Central](https://developers.google.com/search/docs), converted to Markdown, each file stamped with its source URL and fetch date. This is complete.
2. **`references/`** — dense rule sheets distilling the pages that matter for auditing a typical site. Every rule carries an **exact quote** and a path back into `docs/`. Anything Google doesn't actually say is marked `UNKNOWN — not stated in corpus`, never guessed. **They do not cover all 158 pages** — [`references/COVERAGE.md`](references/COVERAGE.md) lists exactly which pages are summarized and which aren't, and it's generated mechanically so it can't drift.
3. **`audit.mjs`** — a dependency-free auditor that crawls a live site and reports findings, each citing the Google doc that mandates it. It implements a subset of the checks the sheets identify as auditable; the rest are documented, not automated.

The corpus is the source of truth. When a question falls outside the sheets, grep `docs/`.

## Why this exists

Most SEO audits check the raw HTML *or* the rendered page. The interesting bugs live in the **gap
between them**.

Google processes pages in three phases — crawl → render → index — and rendering waits in a queue
that "may stay on this queue for a few seconds, but it can take longer than that." Meanwhile the
other things reading your HTML — ChatGPT, Claude, and Perplexity crawlers, plus every social
unfurler — **never render JavaScript at all**.

So a `<title>`, `rel=canonical`, `hreflang`, or JSON-LD block that only appears after hydration is
delayed for Google and permanently invisible to everyone else.

`audit.mjs --render` fetches both views and diffs them. That single check found, on a production
site, that all 71 product pages were serving the homepage's `<title>` and a `rel=canonical`
pointing at the homepage — quietly telling Google that every page was a duplicate of the front page.

## Install

```bash
git clone https://github.com/ceoguy/google-seo.git ~/.claude/skills/google-seo
```

Claude Code discovers it automatically. Or just run the auditor standalone — it needs **Node ≥ 22**
and nothing else.

## Usage

```bash
# raw-HTML audit (fast, no browser)
node audit.mjs https://example.com

# add the rendered-DOM diff — this is the one that finds the real bugs
node audit.mjs https://example.com --render --json report.json

# large sites
node audit.mjs https://example.com --render --max-pages 500

# tell it which noindex pages are intentional
node audit.mjs https://example.com --noindex-ok /admin,/preview
```

| Flag | Meaning |
|---|---|
| `--render` | Drive headless Chrome (DevTools Protocol) and diff raw vs rendered `<head>`. Set `CHROME=/path/to/chrome` if not auto-found. |
| `--json <file>` | Write findings as JSON. |
| `--max-pages <n>` | Cap pages crawled (default 100). The tool **logs what it skipped** — a partial crawl that reads "all clear" is the worst possible output. |
| `--noindex-ok a,b` | Paths where `noindex` is deliberate. |
| `--quiet` | Findings only. |

Exit codes: `0` clean · `1` auto-fix findings remain · `2` crawl/setup error. Suitable for CI.

Findings are partitioned into:

- **auto-fix** — a code change closes it. Your work list.
- **handoff** — needs a human, Search Console, real content, or off-page work. The tool will not pretend to fix these, and neither should you.

## What it checks

**robots.txt** — reachable; not blocking all crawlers; `Sitemap:` present; **not disallowing your
JS/CSS** (because "Google Search won't render JavaScript from blocked files"); which AI crawlers you
have shut out.

**Sitemaps** — the 50MB / 50,000-URL limits; UTF-8; absolute, entity-escaped, fragment-free `<loc>`;
W3C-format `<lastmod>`; duplicate and cross-origin entries; sitemap-index nesting; and it flags
`<priority>` / `<changefreq>`, which "Google ignores."

**Canonical** — at most one tag; absolute; no fragment; self-referencing; and the killer:
**N distinct pages all canonicalizing to one URL**, which is how a shared SPA shell silently
de-indexes an entire site.

**Indexing** — `noindex` in meta *or* `X-Robots-Tag`; sitemap URLs that 404 or redirect.

**On-page** — missing/duplicate `<title>` and meta description (grouped by shared value, so one
template bug is one finding, not two hundred); missing `<h1>`; images without `alt`; viewport.

**International** — hreflang self-reference and `x-default`; `<html lang>`.

**Structured data** — JSON-LD parses; `aggregateRating` without a review count; and it always flags
ratings for human verification, because fabricating them is a manual-action offense. It does **not**
validate required properties per feature type — use `references/structured-data.md` and Google's
Rich Results Test for that.

**Crawling** — `<a>` elements with no crawlable `href` (`javascript:`, `#`, or missing); soft 404s
(a nonexistent URL answering `200`); non-HTTPS origins.

**JavaScript (`--render`)** — the raw-vs-rendered delta for `<title>`, canonical, hreflang, JSON-LD,
and `<h1>`.

## What it deliberately does NOT check

Core Web Vitals field data, manual actions, backlink quality, whether your content is actually
helpful, and whether a rating you marked up is real. These are `handoff` findings. A tool that
claimed to pass them would be lying to you.

It also does not yet implement every check the reference sheets identify as mechanically auditable
(AMP `rel=amphtml` pairing, per-type structured-data validation, pagination canonicals, sitemap
extension limits, and others). The sheets say *auditable*, not *audited*. `COVERAGE.md` and each
sheet's own `## Auditable checks` section are the honest list.

## The rules, in short

Distilled from `references/`. Each is quoted and sourced in full there.

- **A wrong `rel=canonical` is worse than none.** Google calls `rel=canonical` "A strong signal" and sitemap inclusion "A weak signal." Google's own escape hatch: *"If you can't set the canonical URL in the HTML source code, leave it out and only set it with JavaScript."*
- **`Disallow` is not `noindex`.** robots.txt "is not a mechanism for keeping a web page out of Google" — and a disallowed page can't be seen to carry your `noindex`.
- **`<priority>` and `<changefreq>` are dead.** Include `<lastmod>` only when it's truthfully accurate.
- **List only canonical URLs in a sitemap**, verbatim. Google warns: *"don't specify one URL in a sitemap, but a different URL for that same page using `rel="canonical"`."*
- **hreflang has exactly three sanctioned homes:** HTML `<head>`, HTTP header, or sitemap. Each version "must list itself as well as all other language versions," and *"If two pages don't both point to each other, the tags will be ignored."* Canonicals must stay in-language.
- **A soft 404 is an indexable error page.** In a client-routed SPA, *"Add a `<meta name="robots" content="noindex">` to error pages using JavaScript."*
- **`?lang=xx` is the one i18n URL structure Google marks "Not recommended."** Prefer ccTLD, subdomain, or subdirectory.
- **Dynamic rendering is "a workaround and not a recommended solution."** Use SSR, static rendering, or hydration.
- **Never fabricate `aggregateRating` or `Review` markup.** Structured data must describe what's visibly on the page.
- **Rich results can be gated.** `VacationRental` needs a Google Technical Account Manager and Hotel Center access. Check before promising a client a rich result they cannot have.
- **Don't write separate content "for AI."** Google calls that scaled content abuse; AI Overviews run on core Search ranking and need no special markup.

## Refreshing the corpus

Google updates these pages. The fork is reproducible:

```bash
python3 scripts/fetch-docs.py     # URL list in urls.txt, scraped from the live nav
```

`fetch-report.json` records any failures. It never silently skips a page.

## Layout

```
SKILL.md                  agent entry point — workflow + hard-won rules
audit.mjs                 the auditor (Node ≥ 22, zero deps)
references/*.md           9 distilled rule sheets, every claim quoted + sourced
docs/                     158-page Google Search Central fork
DOCS-INDEX.md             index of the fork
scripts/fetch-docs.py     regenerate the fork
urls.txt                  the page list
```

## License

Original work (`SKILL.md`, `audit.mjs`, `references/`, `scripts/`) is MIT — see `LICENSE`.

`docs/` is a fork of Google's Search Central documentation, redistributed under **CC BY 4.0** with
attribution — see `NOTICE.md`. It is a point-in-time snapshot and is **not authoritative**; always
defer to the live page linked in each file's `source:` frontmatter. Not affiliated with or endorsed
by Google.

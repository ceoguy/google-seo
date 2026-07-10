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

Claude Code discovers it automatically as a **skill**. Or just run the auditor standalone — it needs
**Node ≥ 22** and nothing else (Chrome only for `--render`).

## Using it in Claude Code

**As a skill (zero setup).** Once it's in `~/.claude/skills/`, the agent loads it on its own when your
request matches — "audit the SEO of https://example.com", "why isn't this page indexed?", "check my
hreflang", "set up SEO for a new site". Auto-triggering is driven by the skill's description, so it's
reliable but not guaranteed; if you want certainty, either **name it** ("use the google-seo skill to…")
or **pin it** in your `CLAUDE.md` (`For any SEO task, use the google-seo skill.`).

**As slash commands (guaranteed).** For SEO work you do often, the four commands in [`commands/`](commands/)
remove all doubt — invoking one *is* the instruction to load the skill. Install them once:

```bash
cp ~/.claude/skills/google-seo/commands/*.md ~/.claude/commands/
```

| Command | What it does |
|---|---|
| `/google-seo-audit <url>` | Read-only audit of a live site. Runs the auditor, groups findings by root cause, splits auto-fix vs handoff. |
| `/google-seo-fix [url]` | Run from inside the site's repo: audit → fix the auto-fix findings in code → re-audit until two clean runs. |
| `/google-seo-plan <topic\|url>` | A sequenced SEO plan in the skill's build-order, every recommendation citing the Google doc. |
| `/google-seo` | Catch-all — audit, fix, plan, or look up a rule; routes by what you type. |

Every command grounds its answer in the local corpus, never in blog folklore. New commands and skills
show up in a **new** Claude Code session (the list loads at startup).

## Usage

```bash
# raw-HTML audit (fast, no browser)
node audit.mjs https://example.com

# add the rendered-DOM diff — this is the one that finds the real bugs
node audit.mjs https://example.com --render --json report.json

# large sites — note --render only renders the first --max-render pages (default 25)
node audit.mjs https://example.com --render --max-pages 500 --max-render 100

# tell it which noindex pages are intentional
node audit.mjs https://example.com --noindex-ok /admin,/preview
```

| Flag | Meaning |
|---|---|
| `--render` | Drive headless Chrome (DevTools Protocol) and diff raw vs rendered `<head>`. Set `CHROME=/path/to/chrome` if not auto-found. |
| `--max-render <n>` | How many pages to actually render (default **25**). Rendering is slow; the rest are audited raw-only and say so. |
| `--max-sitemaps <n>` | How many child sitemaps to fetch from an index (default **50**), across the whole tree. A 2000-child news index would otherwise fetch every one. |
| `--max-prefix-probes <n>` | How many sitemap path prefixes to probe for soft 404s (default **8**). |
| `--json <file>` | Write findings as JSON. |
| `--max-pages <n>` | Cap pages crawled (default 100). The tool **logs what it skipped** — a partial crawl that reads "all clear" is the worst possible output. |
| `--noindex-ok a,b` | Paths where `noindex` is deliberate. |
| `--quiet` | Findings only. |

Exit codes: `0` = no code-fixable findings (handoff items may still be printed) · `1` = auto-fix
findings remain · `2` = usage error (missing/invalid base URL). Suitable for CI.

Findings are partitioned into:

- **auto-fix** — a code change closes it. Your work list.
- **handoff** — needs a human, Search Console, real content, or off-page work. The tool will not pretend to fix these, and neither should you.

**It tells you what it did not do.** Every cap, truncation, skip and fallback emits its own finding —
children beyond `--max-sitemaps`, `Sitemap:` directives beyond the cap, nesting below the depth cap,
pages beyond `--max-pages`, and a sitemap tree that produced nothing. A partial crawl that reads as
"all clear" is the worst output an auditor can produce. Identical findings reached through two paths
(a shared template, a diamond in the sitemap graph) are reported once.

## What it checks

**robots.txt** — reachable; not blocking all crawlers; `Sitemap:` present; **not disallowing your
JS/CSS** (because "Google Search won't render JavaScript from blocked files"); which AI crawlers you
have shut out.

**Sitemaps** — the 50MB / 50,000-URL limits; UTF-8; absolute, entity-escaped, fragment-free `<loc>`;
W3C-format `<lastmod>`; duplicate and cross-host entries; and it flags `<priority>` / `<changefreq>`,
which "Google ignores."

Nested sitemap indexes (Jetpack, WordPress) are **reported and then followed** — the protocol has no
nested-index form, but refusing to descend audits zero pages, which is worse. Bounded by depth, by a
whole-tree fetch budget, and by a cycle guard that knows a *diamond* (two sibling `Sitemap:` lines
pointing at one child) from a *loop*. A sitemap tree that yields **no page URLs at all** is itself a
finding, not a quiet fallback to auditing the homepage.

**Canonical** — at most one tag; absolute; no fragment; self-referencing; and the killer:
**N distinct pages all canonicalizing to one URL**, which is how a shared SPA shell silently
de-indexes an entire site.

**Indexing** — `noindex` in meta *or* `X-Robots-Tag`; sitemap URLs that 404 or redirect.

**On-page** — missing/duplicate `<title>` and meta description (grouped by shared value, so one
template bug is one finding, not two hundred); a missing `<h1>` (as information, not a defect —
the corpus mandates no h1 count); images without `alt`;
viewport; dead `meta keywords`; `rel=next/prev`.

**International** — hreflang self-reference, `x-default`, and **reciprocity across pages** (Google:
"If two pages don't both point to each other, the tags will be ignored"); `<html lang>`.

**Lifecycle** — AMP `rel=amphtml` ↔ `rel=canonical` pairing; paginated pages that canonicalize to
page 1; `Link: rel=canonical` HTTP header conflicting with the HTML tag.

**Structured data** — JSON-LD parses; `aggregateRating` without a review count; and it always flags
ratings for human verification, because fabricating them is a manual-action offense. It does **not**
validate required properties per feature type — use `references/structured-data.md` and Google's
Rich Results Test for that.

**Crawling** — `<a>` elements with no crawlable `href` (`javascript:`, `#`, or missing); non-HTTPS
origins; and soft 404s — a nonexistent URL answering `200`.

Soft-404 behaviour is **path-dependent** the moment a host has rewrite rules, so the tool probes one
nonexistent URL under *each* path prefix in your sitemap, not just at the site root. A static host
that rewrites `/product/:slug` to `/product/:slug/index.html` answers an unknown slug with an **empty
200** — an indexable page that cannot even carry a `noindex` — while the app's catch-all `404`s
correctly everywhere else. Google counts an empty page as a soft 404, so an empty `200` is
`critical`, whether probed or listed in your sitemap. If the site root *also* answers `200` (an SPA),
no prefix is blamed: the root finding already covers it.

That check found, on a live site, that every deleted or renamed product, post and article URL had
become an indexable empty page — and on `cloudflare.com`, that `/policies/<anything>` serves a real
`200` page while the root correctly `404`s.

**JavaScript (`--render`)** — the raw-vs-rendered delta for `<title>`, canonical, hreflang, JSON-LD,
and `<h1>`.

## What it deliberately does NOT check

Core Web Vitals field data, manual actions, backlink quality, whether your content is actually
helpful, and whether a rating you marked up is real. These are `handoff` findings. A tool that
claimed to pass them would be lying to you.

It also does not yet implement every check the reference sheets identify as mechanically auditable —
per-type structured-data validation, sitemap image/video/news extension limits, path-based pagination
(`/page/2/`), A/B-test redirect types, and paused-site status codes, among others. The sheets say
*auditable*, not *audited*; each sheet's own `## Auditable checks` section is the honest list.

## The rules, in short

Distilled from `references/`. Each is quoted and sourced in full there.

- **A wrong `rel=canonical` is worse than none.** Google calls `rel=canonical` "A strong signal" and sitemap inclusion "A weak signal." Google's own escape hatch: *"If you can't set the canonical URL in the HTML source code, leave it out and only set it with JavaScript."*
- **`Disallow` is not `noindex`.** robots.txt "is not a mechanism for keeping a web page out of Google" — and a disallowed page can't be seen to carry your `noindex`.
- **`<priority>` and `<changefreq>` are dead.** Include `<lastmod>` only when it's truthfully accurate.
- **List only canonical URLs in a sitemap**, verbatim. Google warns: *"don't specify one URL in a sitemap, but a different URL for that same page using `rel="canonical"`."*
- **hreflang has exactly three sanctioned homes:** HTML `<head>`, HTTP header, or sitemap. Each version "must list itself as well as all other language versions," and *"If two pages don't both point to each other, the tags will be ignored."* Canonicals must stay in-language.
- **A soft 404 is an indexable error page.** In a client-routed SPA, *"Add a `<meta name="robots" content="noindex">` to error pages using JavaScript."*
- **Putting the locale in a URL parameter is the one i18n structure Google marks "Not recommended."** Google's table names the structure "URL parameters" and gives `site.com?loc=de` as the example; `?lang=xx` is the same structure. The verdict is Google's; applying it to `?lang=` is ours. Prefer ccTLD, subdomain, or subdirectory.
- **Dynamic rendering is "a workaround and not a recommended solution."** Use SSR, static rendering, or hydration.
- **Never fabricate `aggregateRating` or `Review` markup.** Structured data must describe what's visibly on the page.
- **Rich results can be gated.** `VacationRental` needs a Google Technical Account Manager and Hotel Center access. Check before promising a client a rich result they cannot have.
- **Don't write separate content "for AI."** Google calls that scaled content abuse; AI Overviews run on core Search ranking and need no special markup.

## Maintenance scripts

```bash
python3 scripts/fetch-docs.py       # regenerate the 158-page fork (URL list scraped from the live nav)
python3 scripts/coverage.py         # which corpus pages the rule sheets cover -> references/COVERAGE.md
python3 scripts/verify-quotes.py    # check every quoted string against the corpus; --self-test proves the checker
```

`fetch-docs.py` writes `fetch-report.json` and never silently skips a page. `coverage.py` is generated,
so `COVERAGE.md` can't drift. `verify-quotes.py` is how the "every rule is a real Google quote" claim
stays true — run it before trusting a new rule sheet.

## Layout

```
SKILL.md                  agent entry point — workflow + hard-won rules
audit.mjs                 the auditor (Node ≥ 22, zero deps)
commands/*.md             optional Claude Code slash commands (copy to ~/.claude/commands/)
references/*.md           13 distilled rule sheets, every claim quoted + sourced
references/COVERAGE.md    which corpus pages the sheets cover (generated, can't drift)
docs/                     158-page Google Search Central fork
DOCS-INDEX.md             index of the fork
scripts/fetch-docs.py     regenerate the fork
scripts/coverage.py       regenerate COVERAGE.md
scripts/verify-quotes.py  verify every quote against the corpus
urls.txt                  the page list
```

## License

Original work (`SKILL.md`, `audit.mjs`, `references/`, `scripts/`) is MIT — see `LICENSE`.

`docs/` is a fork of Google's Search Central documentation, redistributed under **CC BY 4.0** with
attribution — see `NOTICE.md`. It is a point-in-time snapshot and is **not authoritative**; always
defer to the live page linked in each file's `source:` frontmatter. Not affiliated with or endorsed
by Google.

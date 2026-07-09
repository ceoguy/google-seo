# Monitoring, Debugging & Analytics

Ground truth from Google's monitor-debug docs (+ structured-data validation tooling): how to set up Search Console, which report answers which question, the traffic-drop decision tree, `site:` operator caveats, Rich Results Test vs URL Inspection authority, and why Search Console and Google Analytics numbers differ. Every claim is an exact quote + repo-relative source path. `UNKNOWN — not stated in corpus` where the fork is silent.

## Search Console: setup and which report answers which question

What it is: "Search Console provides information on how Google crawls, indexes, and serves websites." (`docs/search/docs/monitor-debug/search-console-start.md`)

Setup order (all quotes `docs/search/docs/monitor-debug/search-console-start.md`):

- "Verify site ownership. Get access to all of the information Search Console makes available."
- "Make sure Google can find and read your pages." (Index coverage report)
- "Consider submitting a sitemap to Search Console. Pages from your site can be discovered by Google without this step. However, submitting a sitemap using Search Console might speed up your site's discovery."
- "Monitor your site's performance." (Search performance report)

Report → question map (exact quotes, `docs/search/docs/monitor-debug/search-console-start.md`):

| Question | Report | Exact quote |
|---|---|---|
| How much traffic / which queries, clicks, impressions, position? | Search performance report | "shows how much traffic you're getting from Google Search, including breakdowns by queries, pages, and countries. For each of those breakdowns, you can see trends for impressions, clicks, and other metrics." |
| Is a specific URL indexed? | URL Inspection tool | "provides the current index status of website pages and options to test a live URL, to ask Google to crawl a specific page, and to view detailed information about the page's loaded resources" |
| Site-wide indexing errors? | Index Coverage report | "shows which pages have errors, warnings, or are excluded from Search." |
| Do I have a manual action? | Manual Actions report | "shows any issues, in which section of your site, and where to learn more about it." |
| Did structured data parse? | Rich result status reports | "show what structured data Google could or couldn't read from your site." |
| Was my site hacked / flagged? | Security Issues report | "shows warnings when Google finds that a website might have been hacked" |
| Is my page experience good (field data)? | Core Web Vitals report | "shows how pages perform based on real world usage data, sometimes called field data." |
| Migrating domains? | Change of Address tool | "tells Google about your change, and helps to migrate your Google Search results from your old site to your new site." |
| Urgently hide a page? | Removals tool | "A successful request lasts only about six months" |
| Which queries to improve (position vs CTR)? | Bubble chart | "The goal of this visualization is to help surface query optimization opportunities. The chart shows query performance, where the y-axis represents average position, the x-axis represents CTR" (`docs/search/docs/monitor-debug/bubble-chart-analysis.md`) |

## Traffic-drop decision tree

Framing (`docs/search/docs/monitor-debug/debugging-search-traffic-drops.md`): "A drop in organic Search traffic can happen for several reasons ... This guide explains how to use the Search Console Performance report and Google Trends to investigate the reasons for a drop."

Step 0 — read the chart and split the signal:

- "The best way to understand what happened to your traffic is to look at the main chart in your Search Console Performance report" — `docs/search/docs/monitor-debug/debugging-search-traffic-drops.md`
- "If both impressions and clicks dropped, check the list of the most common reasons that could have caused it. If your impressions remain the same but your clicks drop, you might not be generating the best page title and snippet that you could" — `docs/search/docs/monitor-debug/debugging-search-traffic-drops.md`
- Rule out seasonality/reporting: "Change the date range to include 16 months ... make sure it's not a drop that happens every year" and "check the Search Console Data Anomalies page to see if there is anything applicable to your site. The drop might be related to a change in the data processing or a logging error." — `docs/search/docs/monitor-debug/debugging-search-traffic-drops.md`
- Localize the blast radius: "Look for patterns in the pages affected ... If it's a site-wide issue, check the Page indexing report. If the drop only affects a group of pages, use the URL inspection tool to investigate a few pages." — `docs/search/docs/monitor-debug/debugging-search-traffic-drops.md`

The documented cause categories (each with its Search Console tell), quotes from `docs/search/docs/monitor-debug/debugging-search-traffic-drops.md`:

| Cause | Diagnostic quote |
|---|---|
| Technical issues | "Technical issues are errors that can prevent Google from crawling, indexing, or serving your pages to users." → "Check the Crawl stats report and Page indexing report" |
| Security issues | "If your site is affected by a security threat, like malware or phishing, Google may alert users before they reach your site" → "Check the Security Issues report" |
| Spam / manual action | "If your site doesn't comply with the Spam policies for Google web search, your content might rank lower in results or not appear in results at all." → "check the Manual Actions report" |
| Algorithmic update (incl. core) | "core updates and other smaller updates may change how some pages perform" → for large drops "self-assess your whole website overall (not just individual pages) to make sure it's helpful, reliable and people-first" |
| Seasonality / changing interests | "changes in user behavior will change the demand for certain queries" → filter to top queries then "check them on Google Trends to understand if the drop was only for your website or throughout the web" |
| Site moves & migrations | "you may experience ranking fluctuations while Google recrawls and reindexes your site" |

Note: the fork lists no separately-headed "disruptive changes" category — `UNKNOWN — not stated in corpus`.

Algorithmic-drop nuance: "there might not be anything fundamentally wrong with your content." Small vs large: "A small drop in position is when there's a small shift in position in the top results (for example, dropping from position 2 to 4 for a search query)"; "A large drop in position is when you see a notable drop out of the top results for a wide range of terms." — `docs/search/docs/monitor-debug/debugging-search-traffic-drops.md`

## Rich Results Test vs URL Inspection (which is authoritative)

- Both catch technical errors: "You can test compliance with technical guidelines using the Rich Results Test and the URL Inspection tool, which catch most technical errors." — `docs/search/docs/appearance/structured-data/sd-policies.md`
- Rich Results Test = development-time validation/preview: "The Rich Results Test is an easy and useful tool for validating your structured data, and in some cases, previewing a feature in Google Search." — `docs/search/docs/appearance/structured-data/intro-structured-data.md`
- Use both, at different stages: "check your structured data using the Rich Results Test during development, and the Rich result status reports after deployment" — `docs/search/docs/appearance/structured-data/intro-structured-data.md`
- Sequence in the deploy flow: "Validate your code using the Rich Results Test and fix any critical errors" then "Deploy a few pages ... and use the URL Inspection tool to test how Google sees the page." — `docs/search/docs/appearance/structured-data/review-snippet.md`
- URL Inspection = authoritative for what Google actually sees/found: "Confirm that your markup is valid, and that Google has found your structured data using the URL Inspection tool on your page." — `docs/search/docs/appearance/structured-data/intro-structured-data.md`
- URL Inspection beats `site:`/operators for debugging: "Because search operators are bound by indexing and retrieval limits, the URL Inspection tool in Search Console is more reliable for debugging purposes." — `docs/search/docs/monitor-debug/search-operators.md`

Takeaway: Rich Results Test validates/previews markup during development (not tied to your indexed page state); URL Inspection (live test) is authoritative for how Googlebot actually renders/sees the deployed URL and whether Google found the markup.

## `site:` operator caveats

All quotes from `docs/search/docs/monitor-debug/search-operators/all-search-site.md` unless noted:

- "The list of URLs returned is not always exhaustive. Bigger sites shouldn't expect to see all their URLs in the results."
- "The `site:` operator was designed primarily for search users and so it has some restrictions that site owners might find limiting."
- "The `site:` operator doesn't necessarily return all the URLs that are indexed under the prefix specified in the query. Keep this in mind if you want to use the `site:` operator for tasks like identifying how many URLs are indexed"
- "If a URL doesn't show in a `site:` query, use the URL Inspection tool to make sure the URL can be indexed"
- "A `site:` operator without a query (for example `site:example.com`) doesn't rank the results ... the results are relatively random."
- Query precision matters: "`site:https://www.example.com` doesn't return the same results as `site:https://example.com/`."
- Operator-level limit: "Because search operators are bound by indexing and retrieval limits, the URL Inspection tool in Search Console is more reliable for debugging purposes." — `docs/search/docs/monitor-debug/search-operators.md`

## Search Console vs Google Analytics: why the numbers differ

What each measures (`docs/search/docs/monitor-debug/google-analytics-search-console.md`):

- Search Console "focuses on activity that happened before a person arrived at your website from Google Search."
- Google Analytics "Provides data about visitors' interactions with your website, such as which pages they visit, how long they stay, and what actions they take."
- "these tools use different metrics and systems, which means the data won't match completely"
- Unit mismatch: "A click happens when a person clicks on a link in a Google Search result" vs "A session is a period of time during which a user interacts with your website ... Clicks and sessions are calculated differently"

Documented reasons for discrepancy (all `docs/search/docs/monitor-debug/google-analytics-search-console.md`):

- Implementation: "In Google Analytics, there are implementation and configuration issues that can affect your data quality. For example, there could be pages on your website where the Analytics tag is missing." (Search Console data "is processed by Google for all properties uniformly.")
- Consent/tracking: "If your site is asking users to accept tracking, and users opt out, that can skew Google Analytics data."
- Timezone: Search Console "default time zone is Pacific Time (PT)" and you can't change it, whereas GA timezone is configurable.
- Attribution: "Search Console counts every click in Google Search" vs GA's attribution models.
- Canonical vs any URL: "Search Console reports only on the Google Search canonical URL, whereas Google Analytics reports on any URL that includes the tracking code."
- Non-HTML: "If your site has non-HTML pages (for example, PDFs), Search Console includes these pages by default ... Your Google Analytics may not be configured to measure them"
- Bots: "Google Analytics automatically excludes traffic from known bots and spiders ... while Search Console doesn't necessarily filter them out."

Source of truth (`docs/search/docs/monitor-debug/google-analytics-search-console.md`):

- "The source of truth for Search performance will always be Search Console, while the source of truth for behavior inside your site will be Google Analytics."
- "Although the total counts don't match exactly, what's important is that the general trends have the same pattern."

## Recommendations

- Use the first-party tool: "we strongly encourage using our first-party tool, Google Search Console" — `docs/search/docs/fundamentals/third-party-seo.md`
- Trends for demand/keyword context: "Google Trends provides a random sample of aggregated, anonymized, and categorized Google and YouTube searches." — `docs/search/docs/monitor-debug/trends-start.md`
- Prevent UGC abuse: "Even simple deterrents such as an unusual challenge users have to complete before interacting with your property may discourage spammers." — `docs/search/docs/monitor-debug/prevent-abuse.md`
- Monitor for spam signals: "Monitor your property for spam signals such as redirects, large numbers of ad sections, certain spammy keywords ... The `site:` search operator or Google Alerts can help detect problems." — `docs/search/docs/monitor-debug/prevent-abuse.md`

## Ignored / myths

- Don't use `site:` to count indexed pages: "doesn't necessarily return all the URLs that are indexed" — `docs/search/docs/monitor-debug/search-operators/all-search-site.md`
- Recrawl isn't a rank/speed lever: "requesting a recrawl multiple times for the same URL won't get it crawled any faster." — `docs/search/docs/crawling-indexing/ask-google-to-recrawl.md`
- Requesting indexing ≠ guaranteed inclusion: "Requesting a crawl does not guarantee that inclusion in search results will happen instantly or even at all." — `docs/search/docs/crawling-indexing/ask-google-to-recrawl.md`
- Don't obsess over absolute position: "you shouldn't focus too much on your absolute position. Impressions and clicks are ultimately the measure of success for your site." — `docs/search/docs/monitor-debug/debugging-search-traffic-drops.md`
- GA and Search Console will never fully reconcile: "the data won't match completely" — `docs/search/docs/monitor-debug/google-analytics-search-console.md`

## Auditable checks

1. `[handoff]` Confirm the property is verified in Search Console (ownership) before any diagnostic — required "Get access to all of the information Search Console makes available" Source: `docs/search/docs/monitor-debug/search-console-start.md`.
2. `[handoff]` Traffic drop: open Performance report, set 16-month range, and split impressions vs clicks before assigning a cause (title/snippet issue vs demand vs indexing). Source: `docs/search/docs/monitor-debug/debugging-search-traffic-drops.md`.
3. `[handoff]` Traffic drop: check Data Anomalies + Manual Actions + Security Issues + Crawl stats/Page indexing reports to rule out reporting glitch, penalty, security, and technical causes. Source: `docs/search/docs/monitor-debug/debugging-search-traffic-drops.md`.
4. `[handoff]` Traffic drop: for a suspected external cause, filter to top queries and cross-check on Google Trends to separate site-specific drops from web-wide demand shifts. Source: `docs/search/docs/monitor-debug/debugging-search-traffic-drops.md`.
5. `[render]` To confirm "what Google sees" for a live URL, use URL Inspection (live test), not the `site:` operator or a raw fetch. Source: `docs/search/docs/monitor-debug/search-operators.md`, `docs/search/docs/appearance/structured-data/intro-structured-data.md`.
6. `[render]` Structured data: validate with Rich Results Test during development, then confirm Google found it via URL Inspection after deploy. Source: `docs/search/docs/appearance/structured-data/intro-structured-data.md`, `review-snippet.md`.
7. `[auto]` Never use `site:` result counts as an index-coverage metric; use the Index Coverage / Page Indexing report instead. Source: `docs/search/docs/monitor-debug/search-operators/all-search-site.md`, `docs/search/docs/monitor-debug/search-console-start.md`.
8. `[handoff]` When reconciling GA vs Search Console, expect mismatch; compare trend shape, not absolute totals, and attribute each metric to its source of truth (Search Console = search performance; GA = on-site behavior). Source: `docs/search/docs/monitor-debug/google-analytics-search-console.md`.
9. `[auto]` To request recrawl: use URL Inspection for a few URLs, sitemaps for many; do not re-submit the same URL repeatedly (quota, no speed benefit). Source: `docs/search/docs/crawling-indexing/ask-google-to-recrawl.md`.

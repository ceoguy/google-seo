# Search Essentials, Spam Policies & Helpful-Content

Ground truth from Google's Search Essentials + fundamentals docs: what a page must satisfy to be eligible, every spam behavior that can demote/remove a site, the E-E-A-T self-assessment, and Google's stance on AI content. Every bullet is an exact quote + repo-relative source path. If a claim is not in the corpus it is marked `UNKNOWN — not stated in corpus`.

## The three Search Essentials pillars

Google Search Essentials "make up the core parts of what makes your web-based content ... eligible to appear and perform well on Google Search" (`docs/search/docs/essentials.md`). The three pillars:

| Pillar | Exact quote | Source |
|---|---|---|
| Technical requirements | "Technical requirements: What Google needs from a web page to show it in Google Search." | `docs/search/docs/essentials.md` |
| Spam policies | "Spam policies: The behaviors and tactics that can lead to lower ranking or being completely omitted from Google Search results." | `docs/search/docs/essentials.md` |
| Key best practices | "Key best practices: The main things that can help improve how your site appears in Google Search results." | `docs/search/docs/essentials.md` |

- "It doesn't cost any money to appear in Google Search results, no matter what anyone tries to tell you." — `docs/search/docs/essentials.md`
- "just because a page meets all of these requirements and best practices, doesn't mean that Google will crawl, index, or serve its content." — `docs/search/docs/essentials.md`

## Hard requirements

Technical requirements (`docs/search/docs/essentials/technical.md`) — the minimum to be *eligible* to be indexed:

- "Googlebot isn't blocked." — `docs/search/docs/essentials/technical.md`
- "The page works, meaning that Google receives an HTTP `200 (success)` status code." — `docs/search/docs/essentials/technical.md`
- "The page has indexable content." — `docs/search/docs/essentials/technical.md`
- "It costs nothing to get your page in search results, no matter what anyone tries to tell you." — `docs/search/docs/essentials/technical.md`
- "Just because a page meets these requirements doesn't mean that a page will be indexed; indexing isn't guaranteed." — `docs/search/docs/essentials/technical.md`
- Indexable content means: "The textual content is in a [file type that Google Search supports]." — `docs/search/docs/essentials/technical.md`
- Indexable content means: "The content doesn't violate our [spam policies]." — `docs/search/docs/essentials/technical.md`
- "Google only indexes pages on the web that are accessible to the public and which don't block our crawler, Googlebot, from crawling them. If a page is made private, such as requiring a log-in to view it, Googlebot will not crawl it." — `docs/search/docs/essentials/technical.md`
- "While blocking Googlebot with a robots.txt file will prevent crawling, a page's URL might still appear in search results. To instruct Google not to index a page, use `noindex` and allow Google to crawl the URL." — `docs/search/docs/essentials/technical.md`

The three stages content must pass (`docs/search/docs/fundamentals/how-search-works.md`):

- "Crawling: Google downloads text, images, and videos from pages it found on the internet with automated programs called crawlers." — `docs/search/docs/fundamentals/how-search-works.md`
- "Indexing: Google analyzes the text, images, and video files on the page, and stores the information in the Google index, which is a large database." — `docs/search/docs/fundamentals/how-search-works.md`
- "Serving search results: When a user searches on Google, Google returns information that's relevant to the user's query." — `docs/search/docs/fundamentals/how-search-works.md`
- "Google doesn't guarantee that it will crawl, index, or serve your page, even if your page follows the Google Search Essentials." — `docs/search/docs/fundamentals/how-search-works.md`
- "During the crawl, Google renders the page and runs any JavaScript it finds using a recent version of Chrome ... without rendering Google might not see that content." — `docs/search/docs/fundamentals/how-search-works.md`

## Spam policies (full catalog)

"Sites that violate our policies may rank lower in results or not appear in results at all." (`docs/search/docs/essentials/spam-policies.md`). All quotes below from `docs/search/docs/essentials/spam-policies.md` unless noted.

| Policy | One-line definition (exact quote) |
|---|---|
| Cloaking | "Cloaking refers to the practice of presenting different content to users and search engines with the intent to manipulate search rankings and mislead users." |
| Doorway abuse (doorway pages) | "Doorway abuse is when sites or pages are created to rank for specific, similar search queries. They lead users to intermediate pages that are not as useful as the final destination." |
| Expired domain abuse | "Expired domain abuse is where an expired domain name is purchased and repurposed primarily to manipulate search rankings by hosting content that provides little to no value to users." |
| Hacked content | "Hacked content is any content placed on a site without permission, due to vulnerabilities in a site's security." |
| Hidden text and link abuse | "Hidden text or link abuse is the practice of placing content on a page in a way solely to manipulate search engines and not to be easily viewable by human visitors." |
| Keyword stuffing | "Keyword stuffing refers to the practice of filling a web page with keywords or numbers in an attempt to manipulate rankings in Google Search results." |
| Link spam | "Link spam is the practice of creating links to or from a site primarily for the purpose of manipulating search rankings." |
| Machine-generated traffic | "refers to the practice of sending automated queries to Google. This includes scraping results for rank-checking purposes or other types of automated access to Google Search conducted without express permission." |
| Malicious practices | "Malicious practices create a mismatch between user expectations and the actual outcome, leading to a negative and deceptive user experience, or compromised user security or privacy." |
| Misleading functionality | "Misleading functionality refers to the practice of intentionally creating sites that trick users into thinking they would be able to access some content or services but in reality can't." |
| Scaled content abuse | "Scaled content abuse is when many pages are generated for the primary purpose of manipulating search rankings and not helping users." |
| Scraping | "Scraping refers to the practice of taking content from other sites, often through automated means, and hosting it with the purpose of manipulating search rankings." |
| Site reputation abuse | "Site reputation abuse is a tactic where third-party content is published on a host site mainly because of that host's already-established ranking signals, which it has earned primarily from its first-party content." |
| Sneaky redirects | "Sneaky redirecting is the practice of doing this maliciously in order to either show users and search engines different content or show users unexpected content that does not fulfill their original needs." |
| Thin affiliation | "Thin affiliation is the practice of publishing content with product affiliate links where the product descriptions and reviews are copied directly from the original merchant without any original content or added value." |
| User-generated spam | "User-generated spam is spammy content added to a site by users through a channel intended for user content." |

Key clarifications inside these policies (exact quotes):

- Scaled content abuse explicitly includes AI: "Using generative AI tools or other similar tools to generate many pages without adding value for users" — `docs/search/docs/essentials/spam-policies.md`
- Cloaking carve-out for paywalls: "If you operate a paywall or a content-gating mechanism, we don't consider this to be cloaking if Google can see the full content of what's behind the paywall just like any person who has access to the gated material and if you follow our Flexible Sampling general guidance." — `docs/search/docs/essentials/spam-policies.md`
- Hidden-text NON-violations: "Accordion or tabbed content that toggle between hiding and showing additional content" and "Text that's only accessible to screen readers ... intended to improve the experience for those using screen readers" — `docs/search/docs/essentials/spam-policies.md`
- Link spam is not blanket-banned: "It's not a violation of our policies to have such links as long as they are qualified with a `rel=\"nofollow\"` or `rel=\"sponsored\"` attribute value to the `<a>` tag." — `docs/search/docs/essentials/spam-policies.md`. (This spam-policies line names only two values; the definitive outbound-links page lists **three** — `sponsored`, `ugc`, `nofollow` — see "Qualifying outbound links" below.)
- Legitimate (non-sneaky) redirects: "Moving your site to a new address", "Consolidating several pages into one", "Redirecting users to an internal page once they are logged in" — `docs/search/docs/essentials/spam-policies.md`

Other practices that can lead to demotion or removal (`docs/search/docs/essentials/spam-policies.md`):

- Legal removals: "When we receive a significant volume of valid copyright removal requests involving a given site, we are able to use that to demote other content from the site in our results." — `docs/search/docs/essentials/spam-policies.md`
- Personal information removals: "If we process a significant volume of personal information removals involving a site with exploitative removal practices, we demote other content from the site in our results." — `docs/search/docs/essentials/spam-policies.md`
- Policy circumvention: "If a site continues to engage in actions intended to bypass our spam policies or content policies for Google Search, we may take appropriate action ..." — `docs/search/docs/essentials/spam-policies.md`
- Scam and fraud: "Scam and fraud come in many forms, including but not limited to impersonating an official business or service through imposter sites, intentionally displaying false information about a business or service, or otherwise attracting users to a site on false pretenses." — `docs/search/docs/essentials/spam-policies.md`

Enforcement mechanism: "We detect policy-violating practices both through automated systems and, as needed, human review that can result in a manual action." — `docs/search/docs/essentials/spam-policies.md`

## Qualifying outbound links: `sponsored` / `ugc` / `nofollow`

The definitive page is `docs/search/docs/crawling-indexing/qualify-outbound-links.md`, which documents **three** `rel` values (not two). For regular links you want fetched and parsed, add no `rel` attribute. Use one or more of the following otherwise:

| Value | When it applies (exact quote) | Source |
|---|---|---|
| `rel="sponsored"` | "Mark links that are advertisements or paid placements (commonly called paid links ) with the `sponsored` value." | `docs/search/docs/crawling-indexing/qualify-outbound-links.md` |
| `rel="ugc"` | "We recommend marking user-generated content (UGC) links, such as comments and forum posts, with the `ugc` value." | `docs/search/docs/crawling-indexing/qualify-outbound-links.md` |
| `rel="nofollow"` | "Use the `nofollow` value when other values don't apply, and you'd rather Google not associate your site with, or crawl the linked page from, your site. For links within your own site, use the robots.txt `disallow` rule." | `docs/search/docs/crawling-indexing/qualify-outbound-links.md` |

- `sponsored` supersedes `nofollow` for paid links: "The `nofollow` attribute was previously recommended for these types of links and is still an acceptable way to flag them, though `sponsored` is preferred." — `docs/search/docs/crawling-indexing/qualify-outbound-links.md`
- `ugc` can be relaxed for trusted users: "If you want to recognize and reward trustworthy contributors, you might remove this attribute from links posted by members or users who have consistently made high-quality contributions over time." — `docs/search/docs/crawling-indexing/qualify-outbound-links.md`
- Combine values: "You may specify multiple `rel` values as a space- or comma-separated list." Examples: `rel="ugc nofollow"`, `rel="ugc,nofollow"`. — `docs/search/docs/crawling-indexing/qualify-outbound-links.md`
- Only `nofollow` also exists as a robots directive: "These `rel` attributes are used only in `<a>` elements that Google can crawl, except `nofollow`, which is also available as robots `meta` tag." — `docs/search/docs/crawling-indexing/qualify-outbound-links.md`

**`nofollow` status — hint vs directive:** The qualify-outbound-links page does not use the exact words "hint" or "directive" — the explicit "nofollow is a hint, not a directive" framing is `UNKNOWN — not stated in corpus` on that page. The corpus does, however, treat it as a hint rather than an absolute rule: (a) links so marked "will generally not be followed. Remember that the linked pages may be found through other means, such as sitemaps or links from other sites, and thus they may still be crawled." — `docs/search/docs/crawling-indexing/qualify-outbound-links.md`; and (b) another page literally calls it a hint: "you can join a `nofollow` hint with a `noindex` rule" — `docs/search/docs/crawling-indexing/block-indexing.md`. (Contrast: `noindex` is enforced — see the Hard requirements above — while `nofollow` "generally" is not, and the link may still be crawled.)

## E-E-A-T and the self-assessment

Framework (`docs/search/docs/fundamentals/creating-helpful-content.md`):

- "they identify a mix of factors that can help determine which content demonstrates aspects of experience, expertise, authoritativeness, and trustworthiness, or what we call E-E-A-T." — `docs/search/docs/fundamentals/creating-helpful-content.md`
- "Of these aspects, trust is most important. The others contribute to trust, but content doesn't necessarily have to demonstrate all of them." — `docs/search/docs/fundamentals/creating-helpful-content.md`
- "While E-E-A-T itself isn't a specific ranking factor, using a mix of factors that can identify content with good E-E-A-T is useful." — `docs/search/docs/fundamentals/creating-helpful-content.md`
- YMYL: "our systems give even more weight to content that aligns with strong E-E-A-T for topics that could significantly impact the health, financial stability, or safety of people, or the welfare or well-being of society. We call these \"Your Money or Your Life\" topics, or YMYL for short." — `docs/search/docs/fundamentals/creating-helpful-content.md`
- "Search raters have no control over how pages rank. Rater data is not used directly in our ranking algorithms." — `docs/search/docs/fundamentals/creating-helpful-content.md`

Self-assessment questions (all verbatim from `docs/search/docs/fundamentals/creating-helpful-content.md`):

Content and quality —
- "Does the content provide original information, reporting, research, or analysis?"
- "Does the content provide a substantial, complete, or comprehensive description of the topic?"
- "If the content draws on other sources, does it avoid simply copying or rewriting those sources, and instead provide substantial additional value and originality?"
- "Does the content provide substantial value when compared to other pages in search results?"
- "Is the content mass-produced by or outsourced to a large number of creators, or spread across a large network of sites, so that individual pages or sites don't get as much attention or care?"

Expertise —
- "Does the content present information in a way that makes you want to trust it, such as clear sourcing, evidence of the expertise involved, background about the author or the site that publishes it ...?"
- "Is this content written or reviewed by an expert or enthusiast who demonstrably knows the topic well?"
- "Does the content have any easily-verified factual errors?"

People-first vs search-engine-first —
- "People-first content means content that's created primarily for people, and not to manipulate search engine rankings." — `docs/search/docs/fundamentals/creating-helpful-content.md`
- "Does your content clearly demonstrate first-hand expertise and a depth of knowledge (for example, expertise that comes from having actually used a product or service, or visiting a place)?"
- Warning sign: "Is the content primarily made to attract visits from search engines?"
- Warning sign: "Are you using extensive automation to produce content on many topics?"

Who / How / Why —
- "Is it self-evident to your visitors who authored your content?" — `docs/search/docs/fundamentals/creating-helpful-content.md`
- "\"Why\" is perhaps the most important question to answer about your content. Why is it being created in the first place?" — `docs/search/docs/fundamentals/creating-helpful-content.md`

## Google's stance on AI-generated content

- "Generative AI can be particularly useful when researching a topic, and to add structure to original content. However, using generative AI tools or other similar tools to generate many pages without adding value for users may violate Google's spam policy on scaled content abuse." — `docs/search/docs/fundamentals/using-gen-ai-content.md`
- "If you're using generative AI content on your website, make sure your work meets the standards of the Search Essentials and our spam policies." — `docs/search/docs/fundamentals/using-gen-ai-content.md`
- "When creating content for the web, focus on accuracy, quality, and relevance, especially when automatically generating the content." — `docs/search/docs/fundamentals/using-gen-ai-content.md`
- Disclosure guidance: "If you use automation, including AI-generation, to produce content for the primary purpose of manipulating search rankings, that's a violation of our spam policies." — `docs/search/docs/fundamentals/creating-helpful-content.md`
- "Overall, AI or automation disclosures are useful for content where someone might think \"How was this created?\" Consider adding these when it would be reasonably expected." — `docs/search/docs/fundamentals/creating-helpful-content.md`
- Ecommerce specific: "AI-generated images must contain metadata using the IPTC `DigitalSourceType` `TrainedAlgorithmicMedia` metadata. AI-generated product data such as title and description attributes must be specified separately and labeled as AI-generated." — `docs/search/docs/fundamentals/using-gen-ai-content.md`

## Recommendations

- "Create helpful, reliable, people-first content." — `docs/search/docs/essentials.md`
- "Use words that people would use to look for your content, and place those words in prominent locations on the page, such as the title and main heading of a page, and other descriptive locations such as alt text and link text." — `docs/search/docs/essentials.md`
- "Make your links crawlable so that Google can find other pages on your site via the links on your page." — `docs/search/docs/essentials.md`
- "Creating content that people find compelling and useful will likely influence your website's presence in search results more than any of the other suggestions in this guide." — `docs/search/docs/fundamentals/seo-starter-guide.md`
- Descriptive URLs: "Try to include words in the URL that may be useful for users" — `docs/search/docs/fundamentals/seo-starter-guide.md`
- Titles: "a good title is unique to the page, clear and concise, and accurately describes the contents of the page." — `docs/search/docs/fundamentals/seo-starter-guide.md`
- Snippets/meta description: "A good meta description is short, unique to one particular page, and includes the most relevant points of the page." — `docs/search/docs/fundamentals/seo-starter-guide.md`
- Alt text: "Alt text is a short, but descriptive piece of text that explains the relationship between the image and your content." — `docs/search/docs/fundamentals/seo-starter-guide.md`
- Duplicate handling: "try to ensure that each piece of content on your site is only accessible through one individual URL" — `docs/search/docs/fundamentals/seo-starter-guide.md`
- UGC links: "make sure every link that's posted by users has a `nofollow` or similar annotation automatically added by your CMS." — `docs/search/docs/fundamentals/seo-starter-guide.md`
- Use Search Console: "we strongly encourage using our first-party tool, Google Search Console, which provides you with key information and data directly from Google Search itself." — `docs/search/docs/fundamentals/third-party-seo.md`
- Vet third-party advice: "carefully evaluating any advice you might be considering implementing against our official SEO guidance ... and making your own informed decisions." — `docs/search/docs/fundamentals/third-party-seo.md`
- Timeframe expectation: "Some changes might take effect in a few hours, others could take several months. In general, you likely want to wait a few weeks to assess whether your work had beneficial effects" — `docs/search/docs/fundamentals/seo-starter-guide.md`

## Ignored / myths

- Meta keywords: "Google Search doesn't use the keywords meta tag." — `docs/search/docs/fundamentals/seo-starter-guide.md`
- Keywords in domain/URL: "the keywords in the name of the domain (or URL path) alone have hardly any effect beyond appearing in breadcrumbs." — `docs/search/docs/fundamentals/seo-starter-guide.md`
- TLD: "Otherwise Google Search doesn't care which TLD you're using (whether it's a .com or .org or .asia)." — `docs/search/docs/fundamentals/seo-starter-guide.md`
- Content length / word count: "The length of the content alone doesn't matter for ranking purposes (there's no magical word count target, minimum or maximum, though you probably want to have at least one word)." — `docs/search/docs/fundamentals/seo-starter-guide.md`
- Word-count myth restated: "Are you writing to a particular word count because you've heard or read that Google has a preferred word count? (No, we don't.)" — `docs/search/docs/fundamentals/creating-helpful-content.md`
- PageRank is not everything: "We have many ranking signals, and PageRank is just one of those." — `docs/search/docs/fundamentals/seo-starter-guide.md`
- Duplicate content "penalty": "If you have some content that's accessible under multiple URLs, it's fine; don't fret about it. It's inefficient, but it's not something that will cause a manual action." — `docs/search/docs/fundamentals/seo-starter-guide.md`
- Heading order: "from Google Search perspective, it doesn't matter if you're using them out of order." — `docs/search/docs/fundamentals/seo-starter-guide.md`
- E-E-A-T is not a ranking factor: "Thinking E-E-A-T is a ranking factor" → "No, it's not." — `docs/search/docs/fundamentals/seo-starter-guide.md`
- Pay-to-crawl / pay-to-rank: "Google doesn't accept payment to crawl a site more frequently, or rank it higher. If anyone tells you otherwise, they're wrong." — `docs/search/docs/fundamentals/how-search-works.md`
- Ads don't affect organic: "Advertising with Google won't have any effect on your site's presence in our search results." — `docs/search/docs/fundamentals/do-i-need-seo.md`
- Guaranteed rankings: "No one can guarantee a #1 ranking on Google." — `docs/search/docs/fundamentals/do-i-need-seo.md`
- Third-party tool "approval": "Third-party tools don't have access to our internal ranking data. They can't guarantee performance." — `docs/search/docs/fundamentals/third-party-seo.md`
- Link-scheme SEOs: "You should never have to link to an SEO. Avoid SEOs that talk about link popularity schemes or submitting your site to thousands of search engines." — `docs/search/docs/fundamentals/do-i-need-seo.md`

## Auditable checks

1. `[auto]` Fetch each URL server-side; assert HTTP 200. Any 3xx/4xx/5xx on a page meant to rank fails "The page works". Source: `docs/search/docs/essentials/technical.md`.
2. `[auto]` Parse robots.txt and page `robots`/`X-Robots-Tag`. Flag any rank-intended URL that is `Disallow`-ed (crawl-blocked) or carries `noindex`. Source: `docs/search/docs/essentials/technical.md`.
3. `[auto]` Confirm page body has real indexable text in a supported file type (not an empty shell filled only by blocked resources). Source: `docs/search/docs/essentials/technical.md`.
4. `[render]` Render with JS enabled (headless Chrome) and diff against raw HTML; if primary content only appears post-render, verify Googlebot-equivalent rendering exposes it (cloaking/JS-content risk). Source: `docs/search/docs/fundamentals/how-search-works.md`, `docs/search/docs/essentials/spam-policies.md`.
5. `[render]` Compare content served to a Googlebot user-agent vs a normal browser UA; any material difference is potential cloaking. Source: `docs/search/docs/essentials/spam-policies.md`.
6. `[auto]` Grep for hidden-text patterns: `font-size:0`, `opacity:0`, `text-indent:-9999px`, white-on-white, off-screen positioning of keyword blocks. Source: `docs/search/docs/essentials/spam-policies.md`.
7. `[auto]` Detect keyword stuffing: repeated city/keyword lists, unnatural repetition, phone-number blocks with no added value. Source: `docs/search/docs/essentials/spam-policies.md`.
8. `[auto]` Check outbound links carry the right `rel` value: `sponsored` for ads/paid placements, `ugc` for user-generated links (comments, forum posts), `nofollow` when the others don't apply (`nofollow` is still an acceptable fallback for paid links, but `sponsored` is preferred); multiple values may be combined (`rel="ugc nofollow"`). Source: `docs/search/docs/crawling-indexing/qualify-outbound-links.md`, `docs/search/docs/essentials/spam-policies.md`, `docs/search/docs/fundamentals/seo-starter-guide.md`.
9. `[handoff]` Scaled-content review: is content mass-generated (incl. AI) across many pages without added value? Human judgment required against the scaled-content-abuse definition. Source: `docs/search/docs/essentials/spam-policies.md`, `docs/search/docs/fundamentals/using-gen-ai-content.md`.
10. `[handoff]` Run the E-E-A-T self-assessment questions against sample pages (original info? first-hand expertise? clear authorship/byline? factual errors?). Source: `docs/search/docs/fundamentals/creating-helpful-content.md`.
11. `[auto]` Confirm no reliance on meta keywords, exact-match TLD/domain keywords, or a target word count as an SEO tactic — these are documented non-signals. Source: `docs/search/docs/fundamentals/seo-starter-guide.md`.
12. `[handoff]` Redirect audit: confirm each redirect maps to a legitimate reason (site move, consolidation, post-login) and does not send bots vs users (or mobile vs desktop) to different destinations. Source: `docs/search/docs/essentials/spam-policies.md`.

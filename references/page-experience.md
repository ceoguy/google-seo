# Page Experience, SERP Appearance & AI Features

What Google means by "page experience" (Core Web Vitals, HTTPS, mobile, interstitials), how it generates title links / snippets / favicons, and how AI Overviews / AI Mode treat your content. Grounded only in Google Search Central docs.

## Hard requirements

- Mobile-first indexing uses the mobile page: "Google uses the mobile version of a site's content, crawled with the smartphone agent, for indexing and ranking. This is called mobile-first indexing." — `docs/search/docs/crawling-indexing/mobile/mobile-sites-mobile-first-indexing.md`
- Mobile must carry the primary content: "Make sure that your mobile site contains the same content as your desktop site." — `docs/search/docs/crawling-indexing/mobile/mobile-sites-mobile-first-indexing.md`
- Same robots meta on both versions: "Use the same robots `meta` tags on the mobile and desktop site. If you use a different robots `meta` tag on the mobile site (especially the `noindex` or `nofollow` tags), Google may fail to crawl and index your page". — `docs/search/docs/crawling-indexing/mobile/mobile-sites-mobile-first-indexing.md`
- No interaction-gated primary content: "Don't lazy-load primary content upon user interaction. Google won't load content that requires user interactions (for example, swiping, clicking, or typing) to load." — `docs/search/docs/crawling-indexing/mobile/mobile-sites-mobile-first-indexing.md`
- Equivalent title/description across versions: "Make sure that the `title` element and the meta description are equivalent across both versions of your site." — `docs/search/docs/crawling-indexing/mobile/mobile-sites-mobile-first-indexing.md`
- Separate-URL canonical direction: "The desktop URL is always the canonical, and the mobile version is the alternate of that URL." — `docs/search/docs/crawling-indexing/mobile/mobile-sites-mobile-first-indexing.md`
- Every page needs a `<title>`: "Make sure every page on your site has a title specified in the `<title>` element." — `docs/search/docs/appearance/title-link.md`
- AI-feature eligibility = normal Search eligibility: "To be eligible to be shown as a supporting link in AI Overviews or AI Mode, a page must be indexed and eligible to be shown in Google Search with a snippet, fulfilling the Search technical requirements. There are no additional technical requirements." — `docs/search/docs/appearance/ai-features.md`
- Favicon: one per hostname, declared on the home page: "Google Search only supports one favicon per site, where a site is defined by the hostname." and "Add a `<link>` tag to the header of your home page". — `docs/search/docs/appearance/favicon-in-search.md`
- Favicon must be crawlable: "Googlebot-Image must be able to crawl the favicon file and Googlebot must be able to crawl the home page; they cannot be blocked for crawling." — `docs/search/docs/appearance/favicon-in-search.md`

## Recommendations

- Page experience is holistic, not one metric: "Site owners seeking to be successful with our systems should not focus on only one or two aspects of page experience. Instead, check if you're providing an overall great page experience across many aspects." — `docs/search/docs/appearance/page-experience.md`
- Page-experience self-assessment covers: "Do your pages have good Core Web Vitals?", "Are your pages served in a secure fashion?", "Does your content display well on mobile devices?", "Does your content avoid using an excessive amount of ads that distract from or interfere with the main content?", "Do your pages avoid using intrusive interstitials?", "Is your page designed so visitors can easily distinguish the main content from other content on your page?" — `docs/search/docs/appearance/page-experience.md`
- Core Web Vitals definition: "Core Web Vitals is a set of metrics that measure real-world user experience for loading performance, interactivity, and visual stability of the page." — `docs/search/docs/appearance/core-web-vitals.md`
- LCP threshold: "strive to have LCP occur within the first 2.5 seconds of the page starting to load." — `docs/search/docs/appearance/core-web-vitals.md`
- INP threshold: "strive to have an INP of less than 200 milliseconds." — `docs/search/docs/appearance/core-web-vitals.md`
- CLS threshold: "strive to have a CLS score of less than 0.1." — `docs/search/docs/appearance/core-web-vitals.md`
- Prefer responsive design: "Google recommends Responsive Web Design because it's the easiest design pattern to implement and maintain." — `docs/search/docs/crawling-indexing/mobile/mobile-sites-mobile-first-indexing.md`
- Use banners, not interstitials: "Instead of full page interstitials, use banners that take up only a small fraction of the screen to grab your users' attention." — `docs/search/docs/appearance/avoid-intrusive-interstitials.md`
- Interstitial mistakes to avoid: "Don't obscure the entire page with interstitials." and "Don't redirect the user to a separate page for their consent or input." — `docs/search/docs/appearance/avoid-intrusive-interstitials.md`
- Title link — what you control: "Make sure every page on your site has a title specified in the `<title>` element." plus writing "descriptive and concise text", avoiding keyword stuffing, boilerplate, and making "clear which text is the main title for the page." — `docs/search/docs/appearance/title-link.md`
- Title link sources Google draws from: "Content in `<title>` elements", "Main visual title shown on the page", "Heading elements, such as `<h1>` elements", "Content in `og:title` `meta` tags", "Other content that's large and prominent", "Other text contained in the page", "Anchor text on the page", "Text within links that point to the page", "`WebSite` structured data". — `docs/search/docs/appearance/title-link.md`
- Snippet source and meta-description role: "Google primarily uses the content on the page to automatically determine the appropriate snippet. We may also use descriptive information in the meta description element when it describes the page better than other parts of the content." — `docs/search/docs/appearance/snippet.md`
- Snippets are query-dependent: "Snippets are designed to emphasize and preview the page content that best relates to a user's specific search. This means that Google Search might show different snippets for different searches." — `docs/search/docs/appearance/snippet.md`
- Snippet controls you have: "To prevent Google from displaying a snippet for your page in search results, use the `nosnippet` meta tag." / "To specify the maximum length for your snippets, use the `max-snippet:[number]` meta tag." / "prevent certain parts of the page from being shown in a snippet by using the `data-nosnippet` attribute." — `docs/search/docs/appearance/snippet.md`
- Unique meta descriptions: "Wherever possible, create descriptions that accurately describe the specific page." — `docs/search/docs/appearance/snippet.md`
- Favicon spec: "Your favicon must be a square (1:1 aspect ratio) that's at least 8x8px. While the minimum size requirement is 8x8px, we recommend using a favicon that's larger than 48x48px". — `docs/search/docs/appearance/favicon-in-search.md`
- Favicon URL stability: "The favicon URL must be stable (don't change the URL frequently)." — `docs/search/docs/appearance/favicon-in-search.md`
- AI-feature SEO best practices: "Ensuring that crawling is allowed in robots.txt, and by any CDN or hosting infrastructure", "Making sure that important content is available in textual form", "Making sure your structured data matches the visible text on the page". — `docs/search/docs/appearance/ai-features.md`
- AI generative-search is still SEO: "optimizing for generative AI search is optimizing for the search experience, and thus still SEO." — `docs/search/docs/fundamentals/ai-optimization-guide.md`
- Controlling AI-feature exposure: "To limit the information shown from your pages in Search, use `nosnippet`, `data-nosnippet`, `max-snippet`, or `noindex` controls." and for training/grounding "read more about Google-Extended." — `docs/search/docs/appearance/ai-features.md`

## Ignored / myths

- No single page-experience ranking signal: "There is no single signal. Our core ranking systems look at a variety of signals that align with overall page experience." — `docs/search/docs/appearance/page-experience.md`
- Only CWV among page-experience aspects directly ranks: "Beyond Core Web Vitals, other page experience aspects don't directly help your website rank higher in search results." — `docs/search/docs/appearance/page-experience.md`
- A perfect CWV score is not a ranking guarantee: "getting good results in reports like Search Console's Core Web Vitals report or third-party tools doesn't guarantee that your pages will rank at the top of Google Search results". — `docs/search/docs/appearance/page-experience.md`
- Page experience won't override relevance: "Google Search always seeks to show the most relevant content, even if the page experience is sub-par." — `docs/search/docs/appearance/page-experience.md`
- You cannot hand-set titles/snippets: title links — "we can't manually change title links for individual sites" — `docs/search/docs/appearance/title-link.md`; snippets — "we can't manually change snippets for individual sites" — `docs/search/docs/appearance/snippet.md`
- No special markup / files for AI features: "There are no additional requirements to appear in AI Overviews or AI Mode, nor other special optimizations necessary." and "You don't need to create new machine readable files, AI text files, or markup to appear in these features. There's also no special schema.org structured data that you need to add." — `docs/search/docs/appearance/ai-features.md`
- llms.txt is ignored: "You don't need to create new machine readable files, AI text files, markup, or Markdown to appear in Google Search (including its generative AI capabilities), as Google Search itself doesn't use them." and "Google Search ignores them." — `docs/search/docs/fundamentals/ai-optimization-guide.md`
- No "chunking" requirement / no ideal length: "There's no requirement to break your content into tiny pieces for AI to better understand it." and "There's no ideal page length". — `docs/search/docs/fundamentals/ai-optimization-guide.md`
- Don't rewrite content just for AI: "You don't need to write in a specific way just for generative AI search." — `docs/search/docs/fundamentals/ai-optimization-guide.md`
- Structured data not required for AI (still worthwhile for rich results): "Structured data isn't required for generative AI search, and there's no special schema.org markup you need to add. However, it's a good idea to continue using it as part of your overall SEO strategy, as it helps with being eligible for rich results on Google Search." — `docs/search/docs/fundamentals/ai-optimization-guide.md`
- Favicon appearance not guaranteed: "A favicon isn't guaranteed to appear in Google Search results, even if all guidelines are met." — `docs/search/docs/appearance/favicon-in-search.md`

## Auditable checks

1. [auto] Confirm the page is served over HTTPS.
2. [auto] Confirm each page has a non-empty, unique `<title>` element; flag half-empty (`| Site Name`), boilerplate, or duplicated titles.
3. [auto] Confirm a `<meta name="description">` exists and is unique per page; flag keyword-string descriptions and site-wide-identical descriptions.
4. [auto] Detect `og:title` presence and check consistency with `<title>` (both are title-link sources).
5. [auto] Confirm the home page declares `<link rel="icon" ...>` (or `apple-touch-icon`); verify the favicon URL is stable and not per-load randomized.
6. [auto] Confirm the favicon file and home page are not blocked in robots.txt for Googlebot / Googlebot-Image.
7. [auto] Check robots meta parity: mobile and desktop versions carry the same robots directives (no mobile-only `noindex`/`nofollow`).
8. [auto] Confirm no unsupported/AI "magic" files are relied upon (llms.txt etc. are ignored by Google) — presence is harmless but must not substitute for indexable HTML.
9. [auto] For separate-URL (m-dot) sites, verify desktop is `rel=canonical` and mobile is `rel=alternate` back to it, and that hreflang links stay within their own version set.
10. [render] Measure Core Web Vitals against thresholds: LCP < 2.5 s, INP < 200 ms, CLS < 0.1 (field/lab data).
11. [render] Detect intrusive interstitials/dialogs that obscure the whole page or redirect to a separate consent page before content is reachable.
12. [render] Verify primary content and headings render equivalently on the mobile (smartphone) viewport vs desktop, since mobile is indexed.
13. [render] Confirm no primary content requires swipe/click/type interaction to load on the mobile render.
14. [render] Confirm the main title/`<h1>` is visually the most prominent heading so Google isn't forced to substitute another title source.
15. [handoff] Review Search Console Core Web Vitals report and HTTPS report for site-level field data and secure-serving status.
16. [handoff] Verify site in Search Console and use the URL Inspection tool to confirm Googlebot receives the intended title, description, and preview controls; recall Google may still override titles/snippets it deems inaccurate.

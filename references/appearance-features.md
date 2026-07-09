# Appearance features

Google Search appearance surfaces and their eligibility rules: site names, sitelinks, snippets, featured snippets, Discover, Images, video, favicon, dates, paywalls/flexible sampling, preferred sources, translated results, Web Stories, enriched results, ranking/spam/core updates, business details, package tracking, and the structured-data gallery. All quotes verbatim from `docs/search/docs/appearance/`. Page experience is covered separately in `references/page-experience.md` (cross-ref, not duplicated here).

## Hard requirements

Musts, required fields, technical guidelines, and eligibility blockers.

### Site names
- **`WebSite` structured data must live on the home page.** "The `WebSite` structured data must be on the home page of the site. By home page, we mean the domain or subdomain level root URI. For example, `https://example.com` is the home page of the domain, while `https://example.com/de/index.html` isn't the home page." — `docs/search/docs/appearance/site-names.md`
- **Add `WebSite` structured data to indicate the preference; it is the strongest signal.** "To indicate your site name preference, add `WebSite` structured data to your home page. ... However, `WebSite` structured data is most important, if you want to specify a preference." — `docs/search/docs/appearance/site-names.md`
- **Required `WebSite` properties: `name` and `url`.** "`name` | Text | The name of the website." and "`url` | URL | The URL of the home page of the site. Set this to the canonical home page of your site's domain or subdomain." — `docs/search/docs/appearance/site-names.md`
- **One site name per site (domain/subdomain); not at subdirectory level.** "Currently, Google Search only supports one site name per site, where a site is defined by the domain or subdomain. Google Search does not support site names at the subdirectory level." — `docs/search/docs/appearance/site-names.md`
- **Home page must be crawlable.** "If we don't have access to the content on your home page because it is blocked, we may not be able to generate a site name." — `docs/search/docs/appearance/site-names.md`
- **Duplicate home pages must carry the same structured data.** "make sure that you're using the same structured data on all page duplicates, not just on the canonical page." — `docs/search/docs/appearance/site-names.md`

### Favicon
- **`<link>` icon tag on the home page; supported `rel` values.** "Add a `<link>` tag to the header of your home page" with `rel="icon"` (also `shortcut icon`, `apple-touch-icon`, `apple-touch-icon-precomposed`). — `docs/search/docs/appearance/favicon-in-search.md`
- **Square, 1:1, ≥8x8px; larger recommended.** "Your favicon must be a square (1:1 aspect ratio) that's at least 8x8px. While the minimum size requirement is 8x8px, we recommend using a favicon that's larger than 48x48px". — `docs/search/docs/appearance/favicon-in-search.md`
- **One favicon per hostname; must be crawlable; stable URL.** "Google Search only supports one favicon per site, where a site is defined by the hostname." / "Googlebot-Image must be able to crawl the favicon file and Googlebot must be able to crawl the home page". / "The favicon URL must be stable (don't change the URL frequently)." — `docs/search/docs/appearance/favicon-in-search.md`
- **Inappropriate imagery is replaced.** "Google won't show any favicon that it deems inappropriate, including pornography or hate symbols ... Google replaces it with a default icon." — `docs/search/docs/appearance/favicon-in-search.md`

### Web Stories
- **Four fields required on every Web Story.** "Remember that the following fields are required on every Web Story: `publisher-logo-src`, `poster-portrait-src`, `title`, and `publisher`." — `docs/search/docs/appearance/enable-web-stories.md`
- **Poster image size + aspect ratio.** "Make sure that the image linked to your `<amp-story> poster-portrait-src` attribute is at least 640x853px and use an aspect ratio of 3:4." — `docs/search/docs/appearance/web-stories-creation-best-practices.md`
- **Publisher-logo size + aspect ratio.** "Make sure that the logo image linked to your `<amp-story> publisher-logo-src` attribute is at least 96x96 px and aspect ratio of 1:1." — `docs/search/docs/appearance/web-stories-creation-best-practices.md`
- **Must be valid AMP.** "Web Stories must be valid AMP pages. To avoid invalid AMP issues, test your Story using the AMP Validator tool". — `docs/search/docs/appearance/web-stories-creation-best-practices.md`
- **Must be self-canonical; must not be `noindex`.** "All Web Stories must be canonical. Make sure that each Web Story has a `link rel=\"canonical\"` to itself." / "Don't include a `noindex` attribute in your story". — `docs/search/docs/appearance/web-stories-creation-best-practices.md`
- **Text-heavy policy (content policy blocker).** "We don't allow Web Stories that are text heavy. Web Stories may not be eligible if the majority of pages have more than 180 characters of text. Usage of bite-sized video (less than 60 seconds per page) wherever possible is encouraged." — `docs/search/docs/appearance/web-stories-content-policy.md`
- **No poster-image burned-in text.** "Don't include text in the poster image ... Avoid using images that contain burned in text, as this could obstruct the title of your story when users preview your story in Search results." — `docs/search/docs/appearance/web-stories-creation-best-practices.md`
- **Other content-policy blockers.** No copyright infringement, no low-quality/stretched assets, no missing narrative, no incomplete stories, not "overly commercial" (sole goal = advertising). — `docs/search/docs/appearance/web-stories-content-policy.md`

### Video
- **Watch page must be indexed AND performing before its video is indexed.** "The indexed watch page must be performing well in Search before its video can be considered for indexing. Just because the watch page is indexed doesn't mean that the video will also be indexed." — `docs/search/docs/appearance/video.md`
- **Video must be embedded, not hidden, with a valid thumbnail at a stable URL.** "The video must be embedded on a watch page." / "The video can't be hidden behind other elements." / "must have a valid thumbnail that's available at a stable URL." — `docs/search/docs/appearance/video.md`
- **Use embeddable HTML elements; don't require user actions to load.** "Google can find videos referenced by a `<video>`, `<embed>`, `<iframe>`, or `<object>` element." / "Don't rely on user actions (such as swiping, clicking, or typing) to load the video." — `docs/search/docs/appearance/video.md`
- **Allow Google to fetch the video bytes for previews/key-moments.** "Google needs to successfully fetch the actual bytes of a video file to enable features like video previews and key moments." Don't block the file with `noindex`/robots.txt. — `docs/search/docs/appearance/video.md`
- **Thumbnail specs.** "Size | Minimum 60x30 pixels, larger preferred." + formats BMP/GIF/JPEG/PNG/WebP/SVG/AVIF + "At least 80% of the thumbnail's pixels must have an alpha (transparency) value greater than 250." — `docs/search/docs/appearance/video.md`
- **Paywalled video needs paywall structured data to be indexed.** "If you're using a paywall ... add paywall structured data so that Google can still find and index the video." — `docs/search/docs/appearance/video.md`

### Google Images
- **Use `<img src>` HTML elements; CSS images are not indexed.** "Google doesn't index CSS images." (Good: `<img src="puppy.jpg" alt="...">`; Bad: `<div style="background-image:url(puppy.jpg)">`) — `docs/search/docs/appearance/google-images.md`
- **Provide an `<img>` `src` fallback when using `<picture>`/`srcset`.** "make sure that you provide an `img` element as a fallback with a `src` attribute when using the `picture` element". — `docs/search/docs/appearance/google-images.md`
- **Supported image formats.** "BMP, GIF, JPEG, PNG, WebP, SVG, and AVIF." — `docs/search/docs/appearance/google-images.md`
- **`image` attribute is required for the Images badge/rich result.** "In each of these structured data types, the image attribute is a required field to be eligible for a badge and rich result in Google Images." — `docs/search/docs/appearance/google-images.md`

### Package tracking (Early Adopters Program)
- **Region + API prerequisites.** "Your package delivery company must either be based out of India, Japan, or Brazil, or must be the sole authorized provider ... that services those areas." + real-time POST-only RESTful JSON API. — `docs/search/docs/appearance/package-tracking.md`
- **API responsiveness SLA.** "require that your API respond within 700ms on average with the 95th percentile not exceeding 1,000ms." — `docs/search/docs/appearance/package-tracking.md`
- **Required field `CurrentStatus`; no personal/geographic data about recipient/sender accepted.** — `docs/search/docs/appearance/package-tracking.md`

### Enriched search results
- **Required properties + leaf pages only.** "Each enriched search type defines a required set of properties. Items missing the required properties are ineligible." / "Enriched search is only available for leaf pages, not for listing pages." — `docs/search/docs/appearance/enriched-search-results.md`
- **Site-wide exclusion risk.** "If the enriched search ranking algorithm decides that a large part of a site is not meeting the quality bar, it can exclude the entire site from enriched search results." — `docs/search/docs/appearance/enriched-search-results.md`

### Top Places List
- **Physical location only; list must be curated, genuine, independent, unsponsored, non-templated, non-vulgar.** "The list must be curated by the content provider, be genuine, independent, and not sponsored." / "must not consist of templated sentences built from data or automated metrics." — `docs/search/docs/appearance/top-places-list.md`

## Recommendations

Recommended/best-practice items ("recommend", "consider", "avoid"), plus opt-in/opt-out mechanics.

### Snippets & meta descriptions
- **Unique, descriptive meta description per page.** "Identical or similar descriptions on every page of a site aren't helpful ... create descriptions that accurately describe the specific page." — `docs/search/docs/appearance/snippet.md`
- **Programmatic descriptions are fine for large sites.** "programmatic generation of the descriptions can be appropriate and are encouraged. Good descriptions are human-readable and diverse." — `docs/search/docs/appearance/snippet.md`
- **Control snippet display via robots directives.** `nosnippet` (prevent), `max-snippet:[number]` (length cap), `data-nosnippet` (per-element). — `docs/search/docs/appearance/snippet.md`
- **"Read more" deep links: keep content immediately visible; don't hijack scroll/hash.** "Make sure content is immediately visible on the page to a human (and not hidden behind an expandable section or tabbed interface, for example)." — `docs/search/docs/appearance/snippet.md`

### Featured snippets
- **Opt out via `nosnippet` (all) or lower `max-snippet` (featured only).** "To block all snippets ... add the `nosnippet` rule". "If you want to retain snippets in regularly-formatted search results, but you don't want to appear in featured snippets, experiment with setting the `max-snippet` rule to lower lengths." — `docs/search/docs/appearance/featured-snippets.md`

### Sitelinks
- **Improve sitelink quality via titles, structure, concise anchor text; remove via `noindex`.** "Make sure that the text you use as your page titles and in your headings is informative, relevant, and compact." / "If you need to remove a sitelink, consider removing the page from your site or using `noindex`." — `docs/search/docs/appearance/sitelinks.md`

### Discover
- **Compelling large images improve Discover eligibility.** "Include compelling, high-quality images ... At least 1200 px wide", "more than 300,000 total pixels", "16x9 aspect ratio", enabled by `max-image-preview:large` or AMP. — `docs/search/docs/appearance/google-discover.md`
- **Specify preferred image via schema.org or `og:image`; avoid generic/text-heavy images.** "For best results, avoid using text-heavy images in the schema.org markup or `og:image` `meta` tag." — `docs/search/docs/appearance/google-discover.md`
- **Avoid clickbait/sensationalism; write titles that capture the essence.** — `docs/search/docs/appearance/google-discover.md`

### Images (landing-page optimization)
- **Specify preferred image via `primaryImageOfPage`, main-entity `image`, or `og:image`.** Choose relevant, representative, non-generic, non-extreme-aspect, high-resolution images. — `docs/search/docs/appearance/google-images.md`
- **Descriptive filenames + informative alt text; avoid keyword stuffing.** "use filenames that are short, but descriptive" / "Avoid filling `alt` attributes with keywords". — `docs/search/docs/appearance/google-images.md`
- **Consistent image URL for crawl-budget/caching.** "consistently reference the image with the same URL, so that Google can cache and reuse the image". — `docs/search/docs/appearance/google-images.md`

### Publication / byline dates
- **Add a prominent user-visible date, labeled.** "Add a user-visible date to the page and feature it prominently. Label your dates appropriately with text like \"Publish\" or \"Last updated\"." — `docs/search/docs/appearance/publication-dates.md`
- **Specify dates in structured data (`datePublished`/`dateModified`).** Recommend a `CreativeWork` subtype (`Article`, `BlogPosting`, `VideoObject`). — `docs/search/docs/appearance/publication-dates.md`
- **Date required, time optional; keep visible and structured dates consistent; no future dates; minimize other dates.** "The date is required; the time is not". "Don't specify future dates". "Minimize the presence of other dates on the page". — `docs/search/docs/appearance/publication-dates.md`

### Flexible sampling (paywalls)
- **Recommended article count.** "for most daily news publishers, we expect the value to fall between 6 and 10 articles per user per month." / "provide 10 articles per month to Google search users and iterate from there." — `docs/search/docs/appearance/flexible-sampling.md`
- **Prefer monthly metering; consider lead-in.** "we think that monthly, rather than daily metering provides more flexibility". "some publishers show the first few sentences of an article \"above the fold\" ... We think this is a good practice." — `docs/search/docs/appearance/flexible-sampling.md`
- **Paywalled content: enclose in structured data to avoid cloaking.** "Enclose paywalled content with structured data in order to help Google differentiate paywalled content from the practice of cloaking, where the content served to Googlebot is different from the content served to users." — `docs/search/docs/appearance/flexible-sampling.md`

### Translated results
- **Opt out with the `notranslate` rule (meta tag or `X-Robots-Tag` header).** "To opt out of all translation features in Google Search, use the `notranslate` rule, which can be implemented as a `meta` tag or an HTTP header". — `docs/search/docs/appearance/translated-results.md`
- **Ad networks must decode the Google Translate hostname.** Strip `.translate.goog`, apply the `_x_tr_*` decode steps, reconstruct URL. — `docs/search/docs/appearance/ad-network-and-translation.md`

### Preferred sources
- **Only domain/subdomain sites are eligible; guide users via deeplink/button (optional).** "Only domain-level and subdomain-level sites are eligible to appear in the source preferences tool". "It's not required to do them in order to appear as a preferred source." — `docs/search/docs/appearance/preferred-sources.md`

### Business details
- **Claim Business Profile, verify in Search Console, add `Organization` (logo) + `Breadcrumb` structured data.** "add `Organization` structured data to your official website that identifies the location of your preferred logo." — `docs/search/docs/appearance/establish-business-details.md`

## Ignored / myths

Things that are automated, cannot be forced, or are explicitly not required.

- **Discover needs NO special tags or structured data.** "Content is automatically eligible to appear in Discover if it is indexed by Google and meets Discover's content policies. No special tags or structured data are required." — `docs/search/docs/appearance/google-discover.md`
- **You cannot mark a page as a featured snippet.** "You can't. Google systems determine whether a page would make a good featured snippet". — `docs/search/docs/appearance/featured-snippets.md`
- **No exact minimum length for featured snippets.** "Google does not provide an exact minimum length required to appear as a featured snippet." — `docs/search/docs/appearance/featured-snippets.md`
- **Site names are fully automated and cannot be manually changed.** "Google's generation of site names on the Google Search results page is completely automated". "we can't manually change automatically selected site names". — `docs/search/docs/appearance/site-names.md`
- **Sitelinks are automated; no markup forces them.** "At the moment, sitelinks are automated." / "We only show sitelinks for results when we think they'll be useful to the user." — `docs/search/docs/appearance/sitelinks.md`
- **Snippets/meta descriptions cannot be manually set; there is no length limit.** "we can't manually change snippets for individual sites". "There's no limit on how long a meta description can be, but the snippet is truncated". — `docs/search/docs/appearance/snippet.md`
- **A favicon (and site name) is not guaranteed even if all guidelines are met.** "A favicon isn't guaranteed to appear in Google Search results, even if all guidelines are met." — `docs/search/docs/appearance/favicon-in-search.md`
- **Adding markup doesn't guarantee a video feature.** "Google doesn't guarantee that adding markup will result in a specific video feature in Search results". — `docs/search/docs/appearance/video.md`
- **A byline date is never guaranteed to show.** "Google doesn't guarantee that a byline date, whether visible or in structured data, will be shown in search results". — `docs/search/docs/appearance/publication-dates.md`
- **No single optimal sampling value.** "There is no single value for optimal sampling across different businesses." — `docs/search/docs/appearance/flexible-sampling.md`
- **Translated results require no opt-in.** "This feature is applicable across all pages and results based on the user's language. You don't need to do anything to opt in." — `docs/search/docs/appearance/translated-results.md`
- **Core updates don't target individual sites/pages.** "These changes are broad in nature, and don't target specific sites or individual web pages." — `docs/search/docs/appearance/core-updates.md`
- **Core-update recovery: avoid "quick fix" element removals.** "Avoid doing \"quick fix\" changes (like removing some page element because you heard it was bad for SEO)." — `docs/search/docs/appearance/core-updates.md`
- **Link-spam-update losses may be unrecoverable.** "when our systems remove the effects spammy links may have, any ranking benefit the links may have previously generated for your site is lost." — `docs/search/docs/appearance/spam-updates.md`
- **Exact-match domains get no extra credit.** "our exact match domain system works to ensure we don't give too much credit for content hosted under domains designed to exactly match particular queries." — `docs/search/docs/appearance/ranking-systems-guide.md`
- **Helpful Content / Panda / Penguin / Hummingbird are retired into core ranking (not separate systems to "pass").** Helpful content system "became part of our core ranking systems" (March 2024). — `docs/search/docs/appearance/ranking-systems-guide.md`
- **Site diversity generally caps a site at two top listings; subdomains count as the root domain.** "we generally won't show more than two web page listings from the same site in our top results". — `docs/search/docs/appearance/ranking-systems-guide.md`
- **Reviews system evaluates first-party standalone reviews, not third-party user reviews; doesn't solely depend on product markup.** "It does not evaluate third-party reviews". "we don't solely depend on it." — `docs/search/docs/appearance/reviews-system.md`

## Reference: structured-data gallery
Full list of rich-result types Google supports (each links to its own doc) — Article, Breadcrumb, Carousel, Course list, Dataset, Discussion forum, Education Q&A, Employer aggregate rating, Event, Image metadata, Job posting, Local business, Math solver, Movie, Organization, Product, Profile page, Q&A, Recipe, Review snippet, Software app, Speakable, Subscription and paywalled content, Vacation rental, Video. — `docs/search/docs/appearance/structured-data/search-gallery.md`

## Auditable checks

Tags: `[auto]` = static HTML/source, robots, or structured-data check; `[render]` = needs rendered DOM / image dimensions / crawl-fetch behavior; `[handoff]` = needs human judgment, external service, or account.

1. `[auto]` Home page carries `WebSite` structured data with required `name` + `url`; not placed on a subdirectory; duplicate home pages (http/https, www/non-www) share identical markup.
2. `[auto]` A `<link rel="icon">` (or supported `rel`) is present in the home-page `<head>` with a stable `href`.
3. `[render]` Favicon file is square (1:1), ≥8x8px (ideally >48x48px), a valid format, and crawlable by Googlebot-Image.
4. `[auto]` Each Web Story declares all four required fields: `publisher-logo-src`, `poster-portrait-src`, `title`, `publisher`.
5. `[render]` Web Story `poster-portrait-src` image is ≥640x853px at 3:4; `publisher-logo-src` is ≥96x96px at 1:1; poster has no burned-in text.
6. `[auto]` Web Story is self-canonical, has no `noindex`, and validates as AMP.
7. `[render]` Web Story pages: majority have ≤180 characters of text (text-heavy policy).
8. `[render]` Videos are embedded via `<video>/<embed>/<iframe>/<object>`, not hidden, load without user action, and have a valid thumbnail (≥60x30px, ≥80% pixels alpha>250) at a stable URL.
9. `[auto]` Paywalled videos/articles carry paywall structured data (differentiates from cloaking).
10. `[render]` Images use `<img src>` (no CSS background images for indexable content) in a supported format; `<picture>`/`srcset` include an `<img src>` fallback.
11. `[auto]` A preferred image is declared (`primaryImageOfPage` / main-entity `image` / `og:image`), non-generic and non-text-heavy; image structured-data types include the required `image` attribute.
12. `[auto]` `<img>` elements have descriptive, non-stuffed `alt` text and descriptive filenames.
13. `[auto]` Each indexable content page has a unique, descriptive meta description (site-level only on home/aggregation pages).
14. `[auto]` A prominent, labeled user-visible date is present; `datePublished`/`dateModified` structured data matches it; no future dates; other on-page dates minimized.
15. `[auto]` Snippet/featured-snippet controls used as intended (`nosnippet`, `max-snippet:[n]`, `data-nosnippet`) where opting out.
16. `[render]` "Read more" deep-link targets are immediately visible (not behind tabs/accordions) and page load doesn't remove the hash or force scroll.
17. `[auto]` Translation opt-out (`notranslate` meta or `X-Robots-Tag` header) present only where intended.
18. `[handoff]` Ad network decodes `.translate.goog` hostnames per the documented `_x_tr_*` steps (unit-test against the provided table).
19. `[handoff]` `Organization` (with logo) + `Breadcrumb` structured data added; Business Profile claimed; Search Console verified.
20. `[handoff]` Package-tracking API meets region eligibility, POST-only JSON contract, `CurrentStatus`, and the 700ms/1000ms latency SLA (no personal/geo data).
21. `[handoff]` Enriched-result pages are leaf pages with all required properties; relevance and completeness reviewed.
22. `[handoff]` Top-Places lists are curated, independent, unsponsored, non-templated (human review).
23. `[handoff]` After a core/spam update, changes focus on sustainable content quality, not quick-fix element removal; link-spam losses accepted as unrecoverable.

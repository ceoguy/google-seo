# Indexing, Canonicalization & Robots Meta
Reference for controlling indexing (noindex / X-Robots-Tag), choosing canonical URLs, redirects, page metadata, and mobile-first indexing. Grounded only in the local Search Central fork; every claim has an exact quote + repo-relative source path.

## Hard requirements

- For `noindex` to work, the page must be crawlable: "For the `noindex` rule to be effective, the page or resource must not be blocked by a robots.txt file, and it has to be otherwise accessible to the crawler." — `docs/search/docs/crawling-indexing/block-indexing.md`
- `noindex` in robots.txt is not supported: "Specifying the `noindex` rule in the robots.txt file is not supported by Google." — `docs/search/docs/crawling-indexing/block-indexing.md`
- Indexing/serving rules can't be honored on disallowed URLs: "If indexing or serving rules must be followed, the URLs containing those rules cannot be disallowed from crawling." — `docs/search/docs/crawling-indexing/robots-meta-tag.md`
- The `rel="canonical"` `link` element must be in `<head>`: "The `rel="canonical"` `link element` is only accepted if it appears in the `<head>` section of the HTML" — `docs/search/docs/crawling-indexing/consolidate-duplicate-urls.md`
- Use absolute (not relative) canonical URLs: "Use absolute paths rather than relative paths with the `rel="canonical"` `link` element." — `docs/search/docs/crawling-indexing/consolidate-duplicate-urls.md`
- Don't declare conflicting canonicals across methods: "Don't specify different URLs as canonical for the same page using different canonicalization techniques" — `docs/search/docs/crawling-indexing/consolidate-duplicate-urls.md`
- Don't make a fragment the canonical: "Don't specify a URL fragment as canonical, as Google generally doesn't support URL fragments." — `docs/search/docs/crawling-indexing/consolidate-duplicate-urls.md`
- Don't use robots.txt for canonicalization: "Don't use the robots.txt file for canonicalization purposes. Google may still index URLs that are disallowed in robots.txt without their content." — `docs/search/docs/crawling-indexing/consolidate-duplicate-urls.md`
- `<head>` may only contain valid elements: "The `<head>` element must only contain the following valid elements ... `title`, `meta`, `link`, `script`, `style`, `base`, `noscript`, `template`" — `docs/search/docs/crawling-indexing/valid-page-metadata.md`
- An invalid element ends `<head>` parsing: "If you use an invalid element in the `<head>` element, Google ignores any elements that appear after the invalid element." — `docs/search/docs/crawling-indexing/valid-page-metadata.md`
- Mobile-first: use the same robots `meta` tags on both versions: "If you use a different robots `meta` tag on the mobile site (especially the `noindex` or `nofollow` tags), Google may fail to crawl and index your page" — `docs/search/docs/crawling-indexing/mobile/mobile-sites-mobile-first-indexing.md`
- Separate-URL setup: desktop is canonical, mobile is alternate: "The desktop URL is always the canonical, and the mobile version is the alternate of that URL." — `docs/search/docs/crawling-indexing/mobile/mobile-sites-mobile-first-indexing.md`

## Recommendations

- Canonical hints are optional: "While we encourage you to use these methods, none of them are required" — `docs/search/docs/crawling-indexing/consolidate-duplicate-urls.md`
- Pick ONE canonical method (element or HTTP header): "We recommend that you choose one of these and go with that; while supported, using both methods at the same time is more error prone" — `docs/search/docs/crawling-indexing/consolidate-duplicate-urls.md`
- Use the `rel="canonical"` HTTP header for non-HTML (e.g. PDF): "Only works for HTML pages, not for files such as PDF. In such cases, you can use the `rel="canonical"` HTTP header." — `docs/search/docs/crawling-indexing/consolidate-duplicate-urls.md`
- Link internally to the canonical URL: "When linking within your site, link to the canonical URL rather than a duplicate URL." — `docs/search/docs/crawling-indexing/consolidate-duplicate-urls.md`
- Prefer HTTPS as canonical: "Google prefers HTTPS pages over equivalent HTTP pages as canonical" — `docs/search/docs/crawling-indexing/consolidate-duplicate-urls.md`
- Don't `noindex` to pick a canonical within one site: "We don't recommend using `noindex` to prevent selection of a canonical page within a single site ... `rel="canonical"` `link` annotations are the preferred solution." — `docs/search/docs/crawling-indexing/consolidate-duplicate-urls.md`
- Use permanent server-side redirects for moves: "If you need to change the URL of a page as it is shown in search engine results, we recommend that you use a permanent server-side redirect whenever possible." — `docs/search/docs/crawling-indexing/301-redirects.md`
- Permanent = `301`/`308`; temporary = `302`/`303`/`307`: "The `301` and `308` status codes mean that a page has permanently moved to a new location." — `docs/search/docs/crawling-indexing/301-redirects.md`
- Only use JS redirects as a last resort: "Only use JavaScript redirects if you can't do server-side or `meta refresh` redirects." — `docs/search/docs/crawling-indexing/301-redirects.md`
- Prefer server-side `301` over meta-refresh: "We recommend using a server-side `301` redirect instead." — `docs/search/docs/crawling-indexing/special-tags.md`
- Responsive design is the recommended mobile configuration: "Google recommends Responsive Web Design because it's the easiest design pattern to implement and maintain." — `docs/search/docs/crawling-indexing/mobile/mobile-sites-mobile-first-indexing.md`
- Keep mobile content equal to desktop: "Make sure that your mobile site contains the same content as your desktop site." — `docs/search/docs/crawling-indexing/mobile/mobile-sites-mobile-first-indexing.md`
- Keep title/description equal across versions: "Make sure that the `title` element and the meta description are equivalent across both versions of your site." — `docs/search/docs/crawling-indexing/mobile/mobile-sites-mobile-first-indexing.md`
- Use `X-Robots-Tag` header to control non-HTML files: "To block indexing of non-HTML resources, such as PDF files, video files, or image files, use the `X-Robots-Tag` response header instead." — `docs/search/docs/crawling-indexing/robots-meta-tag.md`

## Facts / semantics (verbatim)

- Canonical designation is a hint: "indicating a canonical preference is a hint, not a rule." — `docs/search/docs/crawling-indexing/canonicalization.md`
- Method strength order: "Redirects ... A strong signal", "`rel="canonical"` `link` annotations: A strong signal", "Sitemap inclusion: A weak signal" — `docs/search/docs/crawling-indexing/consolidate-duplicate-urls.md`
- Conflicting robots rules → most restrictive wins: "In the case of conflicting robots rules, the more restrictive rule applies. For example, if a page has both `max-snippet:50` and `nosnippet` rules, the `nosnippet` rule will apply." — `docs/search/docs/crawling-indexing/robots-meta-tag.md`
- Default robots values need no declaration: "The default values are `index, follow` and don't need to be specified." — `docs/search/docs/crawling-indexing/special-tags.md`
- `none` = `noindex, nofollow`: "Equivalent to `noindex, nofollow`." — `docs/search/docs/crawling-indexing/robots-meta-tag.md`
- `max-snippet:0` = `nosnippet`; `max-snippet:-1` = no limit: "`0`: No snippet is to be shown. Equivalent to `nosnippet`." — `docs/search/docs/crawling-indexing/robots-meta-tag.md`
- Robots meta is honored in `<body>` too: "Google Search doesn't enforce placement of meta robots in the HTML head and will respect robots meta tags in the body section of an HTML document as well." — `docs/search/docs/crawling-indexing/robots-meta-tag.md`
- `noindex` needs a (re)crawl to take effect: "it's probably because we haven't crawled the page since you added the `noindex` rule." — `docs/search/docs/crawling-indexing/block-indexing.md`
- Instant vs delayed meta-refresh: "Google Search interprets instant `meta refresh` redirects as permanent redirects." / "delayed `meta refresh` redirects as temporary redirects." — `docs/search/docs/crawling-indexing/301-redirects.md`
- HTTPS canonicalization is broken by bad certs / HTTP redirects: "Avoid bad TLS/SSL certificates and HTTPS-to-HTTP redirects because they cause Google to prefer HTTP very strongly." — `docs/search/docs/crawling-indexing/consolidate-duplicate-urls.md`
- `data-nosnippet` only on `span`/`div`/`section`: "This can be done on an HTML-element level with the `data-nosnippet` HTML attribute on `span`, `div`, and `section` elements." — `docs/search/docs/crawling-indexing/robots-meta-tag.md`

## Ignored / myths

- meta keywords do nothing: "The meta-keyword tag is not used by Google Search, and it has no effect on indexing and ranking at all." — `docs/search/docs/crawling-indexing/special-tags.md`
- `lang` attribute is not used for language: "Google Search detects the language of a page based on the textual content of the page. It doesn't rely on code annotations such as the `lang`." — `docs/search/docs/crawling-indexing/special-tags.md`
- `rel="next"`/`rel="prev"` are dead: "Google no longer uses these HTML `<link>` tags, and they have no effect on indexing." — `docs/search/docs/crawling-indexing/special-tags.md`
- `noarchive` is dead: "The `noarchive` rule is no longer used by Google Search ... as the cached link feature no longer exists." — `docs/search/docs/crawling-indexing/robots-meta-tag.md`
- `nocache` is unused: "The `nocache` rule isn't used by Google Search." — `docs/search/docs/crawling-indexing/robots-meta-tag.md`
- `nositelinkssearchbox` is dead: "The `nositelinkssearchbox` rule is no longer used by Google Search ... as the feature no longer exists." — `docs/search/docs/crawling-indexing/robots-meta-tag.md`
- `rel="canonical"` with `hreflang`/`lang`/`media`/`type` is ignored: "`rel="canonical"` annotations with `hreflang`, `lang`, `media`, and `type` attributes are not used for canonicalization." — `docs/search/docs/crawling-indexing/consolidate-duplicate-urls.md`
- Unsupported `meta` tags are silently ignored: "Google will ignore `meta` tags that it doesn't support." — `docs/search/docs/crawling-indexing/special-tags.md`
- URL removal tool is not a canonicalization tool: "Don't use the URL removal tool for canonicalization. It hides all versions of a URL from Search." — `docs/search/docs/crawling-indexing/consolidate-duplicate-urls.md`

## Auditable checks

1. `[auto]` For any page carrying `noindex` (meta or `X-Robots-Tag`), confirm the same URL is NOT `disallow`ed in robots.txt. Maps to "noindex must be crawlable."
2. `[auto]` Confirm no `noindex` directive appears inside the robots.txt file (unsupported). Maps to "noindex in robots.txt not supported."
3. `[auto]` The `<link rel="canonical">` appears inside `<head>` (before any invalid `<head>` element such as `<img>`/`<iframe>`). Maps to head-placement + valid-head requirements.
4. `[auto]` Canonical `href` is an absolute URL (`^https?://`), not a relative path and not a `#fragment`. Maps to absolute-URL + no-fragment requirements.
5. `[auto]` At most one canonical target per page across HTML element and `Link:` HTTP header; flag if they disagree. Maps to "no conflicting canonicals / pick one method."
6. `[auto]` `<head>` contains only allowed elements (`title`, `meta`, `link`, `script`, `style`, `base`, `noscript`, `template`) up to the metadata being read. Maps to valid-`<head>` requirement.
7. `[auto]` Self/HTTPS preference: the HTTPS URL does not redirect to HTTP and its canonical points to the HTTPS version. Maps to "prefer HTTPS."
8. `[auto]` Permanent moves return `301`/`308` (not `302`/`303`/`307`, not JS-only). Maps to permanent-redirect recommendation.
9. `[auto]` Flag `<meta name="keywords">`, `rel="next"|"prev"`, `noarchive`, `nocache`, `nositelinkssearchbox` as no-ops. Maps to ignored/myths list.
10. `[auto]` `data-nosnippet` only on `span`/`div`/`section` elements. Maps to `data-nosnippet` element rule.
11. `[auto]` Robots directives don't conflict silently; if both `nosnippet` and `max-snippet:N` present, note `nosnippet` wins. Maps to "most restrictive wins."
12. `[handoff]` Compare mobile vs desktop (separate-URL/dynamic-serving) fetches for identical robots `meta`, canonical/alternate pairing, content, and title/description. Maps to mobile-first requirements.

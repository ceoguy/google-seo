# International & Multilingual SEO

How to structure, annotate, and serve multi-language / multi-region sites so Google indexes each locale and shows the right version. Grounded only in Google Search Central docs.

## Hard requirements

- Reciprocity (bidirectional): "Each language version must list itself as well as all other language versions." — `docs/search/docs/specialty/international/localized-versions.md`
- Non-reciprocal annotations are dropped: "If two pages don't both point to each other, the tags will be ignored." — `docs/search/docs/specialty/international/localized-versions.md`
- Missing return link = ignored: "Missing return links: If page X links to page Y, page Y must link back to page X. If this is not the case for all pages that use `hreflang` annotations, those annotations may be ignored or not interpreted correctly." — `docs/search/docs/specialty/international/localized-versions.md`
- Alternate URLs must be absolute: "Alternate URLs must be fully-qualified, including the transport method (http/https), so: `https://example.com/foo`, not `//example.com/foo` or `/foo`" — `docs/search/docs/specialty/international/localized-versions.md`
- Every version's annotation set is identical (including a self-reference): "For each variation of the page, include a set of `<link>` elements in the `<head>` element, one link for each page variant including itself. The set of links is identical for every version of the page." — `docs/search/docs/specialty/international/localized-versions.md`
- Language code cannot be a bare country code: "You can't specify the country code by itself. The first code stands for the language and Google doesn't automatically derive the language from a country code." — `docs/search/docs/specialty/international/localized-versions.md`
- Only ISO 639-1 + ISO 3166-1 Alpha 2 codes: "Only language codes listed in ISO 639-1 and region codes listed in ISO 3166-1 Alpha 2 are supported; other codes that aren't listed in those standards, such as es-419, aren't supported." — `docs/search/docs/specialty/international/localized-versions.md`
- Reserved region codes are ignored: "using `EU`, `UN`, or `UK` in `hreflang` annotations doesn't have an effect on Google Search." — `docs/search/docs/specialty/international/localized-versions.md`

## Recommendations

- Four localized-URL structures and Google's verdict (from the URL-structure options table):
  - Country-specific domain — "`example.de`" — Pros: "Clear geotargeting", "Server location irrelevant", "Easy separation of sites". — `docs/search/docs/specialty/international/managing-multi-regional-sites.md`
  - Subdomains with gTLD — "`de.example.com`" — Pros: "Easy to set up", "Allows different server locations". — `docs/search/docs/specialty/international/managing-multi-regional-sites.md`
  - Subdirectories with gTLD — "`example.com/de/`" — Pros: "Easy to set up", "Low maintenance (same host)". — `docs/search/docs/specialty/international/managing-multi-regional-sites.md`
  - URL parameters — "`site.com?loc=de`" — verdict: "Not recommended." (Cons: "URL-based segmentation difficult"). — `docs/search/docs/specialty/international/managing-multi-regional-sites.md`
- Use distinct URLs per language, not cookies/browser settings: "Google recommends using different URLs for each language version of a page rather than using cookies or browser settings to adjust the content language on the page." — `docs/search/docs/specialty/international/managing-multi-regional-sites.md`
- Three sanctioned hreflang delivery methods: "There are three ways to indicate multiple language/locale versions of a page to Google:" — "HTML", "HTTP Headers", "Sitemap". — `docs/search/docs/specialty/international/localized-versions.md`
- Pick one method; all three are equal: "The three methods are equivalent from Google's perspective and you can choose the method that's the most convenient for your site. While you can use all three methods at the same time, there's no benefit in Search". — `docs/search/docs/specialty/international/localized-versions.md`
- HTTP-header method is for non-HTML files: "You can return an HTTP header with your page's GET response to tell Google about all of the language and region variants of a page. This is useful for non-HTML files (like PDFs)." — `docs/search/docs/specialty/international/localized-versions.md`
- x-default fallback: "Consider adding a fallback page for unmatched languages, especially on language/country selectors or auto-redirecting home pages. Use the the `x-default` value" — `docs/search/docs/specialty/international/localized-versions.md`
- What x-default is for: "The reserved `x-default` value is used when no other language/region matches the user's browser setting. This value is recommended for specifying the fallback page for users whose language settings don't match any of your site's localized versions." — `docs/search/docs/specialty/international/localized-versions.md`
- Provide a language catchall: "if you have specific URLs for English speakers in Ireland (`en-ie`), Canada (`en-ca`), and Australia (`en-au`), provide a generic English (`en`) page for searchers in the US, UK, and all other English-speaking locations." — `docs/search/docs/specialty/international/localized-versions.md`
- Same-language canonical rule (canonical consolidates only same-language duplicates; hreflang handles cross-language): "If you provide similar or duplicate content on different URLs in the same language as part of a multi-regional site (for instance, if both `example.de/` and `example.com/de/` show similar German language content), pick a preferred version and use the `rel="canonical"` element and `hreflang` tags to make sure that the correct language or regional URL is served to searchers." — `docs/search/docs/specialty/international/managing-multi-regional-sites.md`
- Translated pages are not duplicates: "Localized versions of a page are only considered duplicates if the main content of the page remains untranslated." — `docs/search/docs/specialty/international/localized-versions.md`
- Make page language obvious in visible content: "Google uses the visible content of your page to determine its language. We don't use any code-level language information such as `lang` attributes, or the URL." — `docs/search/docs/specialty/international/managing-multi-regional-sites.md`
- Let users switch, don't auto-switch: "Consider adding hyperlinks to other language versions of a page. That way users can click to choose a different language version of the page." — `docs/search/docs/specialty/international/managing-multi-regional-sites.md`
- Use explicit locale signals: "make sure you explicitly tell Google about any locale or language variation that your site exposes, using one of the methods shown here (such as `hreflang` entries, ccTLDs, or explicit links)." — `docs/search/docs/specialty/international/managing-multi-regional-sites.md`
- Separate locale URLs + hreflang is the recommendation for locale-adaptive sites: "We recommend using separate locale URL configurations and annotating them with `rel="alternate"` hreflang annotations." — `docs/search/docs/specialty/international/locale-adaptive-pages.md`

## Ignored / myths

- Auto-redirect by detected language: "Avoid automatically redirecting users from one language version of a site to a different language version of a site. For example, don't redirect based on what you think the user's language may be. These redirections could prevent users (and search engines) from viewing all the versions of your site." — `docs/search/docs/specialty/international/managing-multi-regional-sites.md`
- IP-based content adaptation warning: "Don't use IP analysis to adapt your content. IP location analysis is difficult and generally not reliable. Furthermore, Google may not be able to crawl variations of your site properly." — `docs/search/docs/specialty/international/managing-multi-regional-sites.md`
- Googlebot mostly crawls from the US without Accept-Language: "the Googlebot crawler usually originates from the USA. In addition, the crawler sends HTTP requests without setting `Accept-Language` in the request header." — `docs/search/docs/specialty/international/managing-multi-regional-sites.md`
- hreflang / `lang` are NOT language-detection signals: "Google doesn't use `hreflang` or the HTML `lang` attribute to detect the language of a page; instead, we use algorithms to determine the language." — `docs/search/docs/specialty/international/localized-versions.md`
- Locational meta tags are ignored: "Google ignores locational `meta` tags (like `geo.position` or `distribution`) or geotargeting HTML attributes." — `docs/search/docs/specialty/international/managing-multi-regional-sites.md`
- Some ccTLDs are treated as generic: "We also treat some vanity ccTLDs (such as .tv and .me) as gTLDs, as we've found that users and website owners frequently see these as being more generic than country-targeted." — `docs/search/docs/specialty/international/managing-multi-regional-sites.md`

## Auditable checks

1. [auto] Extract every `hreflang` annotation from HTML `<head>`, `Link:` HTTP headers, and XML sitemap; normalize into a locale→URL map per page.
2. [auto] Verify reciprocity: for each A→B hreflang, confirm B→A exists; flag any missing return link (annotation will be ignored).
3. [auto] Verify each page's annotation set includes a self-referencing entry for its own locale.
4. [auto] Verify all alternate URLs are fully-qualified (scheme + host); flag protocol-relative (`//`) or root-relative (`/foo`) hrefs.
5. [auto] Validate each `hreflang` value: language present (ISO 639-1), optional region (ISO 3166-1 Alpha 2); flag bare country codes, `es-419`, and reserved codes `EU`/`UN`/`UK`.
6. [auto] Confirm an `hreflang="x-default"` entry exists on language/country selectors and auto-redirecting home pages.
7. [auto] Flag URL-parameter locale schemes (e.g. `?loc=de`, `?lang=de`) as "Not recommended"; prefer ccTLD, subdomain, or subdirectory.
8. [auto] Cross-check canonical vs hreflang: flag any page whose `rel="canonical"` points to a different-language URL (canonical should consolidate only same-language duplicates).
9. [auto] Scan for ignored/legacy geo signals in `<head>` (`geo.position`, `distribution`, geotargeting attributes) and report them as no-ops.
10. [render] Load each locale URL and detect client-side auto-redirects that send visitors to a different language version (blocks Googlebot and users from other versions).
11. [render] Simulate a request appearing to originate outside the US (or without `Accept-Language`) and confirm the same locale URL still serves its own content rather than IP-adapting it.
12. [handoff] Confirm visible on-page content (not just `lang`/URL) unambiguously signals each page's language, since Google detects language algorithmically from visible text.
13. [handoff] For geotargeting, set/verify country targeting via ccTLD or Search Console signals and confirm intended target market.

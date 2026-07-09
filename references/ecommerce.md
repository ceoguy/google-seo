# Ecommerce

Google Search rules for ecommerce sites: URL/variant structure, pagination, crawlable navigation, product structured data, Merchant Center feeds, launch, and reviews. All quotes are verbatim from the local corpus (`docs/search/docs/specialty/ecommerce/`).

## Hard requirements

Rules Google states as musts, "don't"s, or crawl/index blockers. Ignoring these can make products undiscoverable.

- **Links must be `<a href>`, not JS events (navigation).** "To ensure Googlebot correctly locates the link, use `<a href>` tags when creating links to other content. Don't use JavaScript events on other HTML DOM elements for navigation." — `docs/search/docs/specialty/ecommerce/help-google-understand-your-ecommerce-site-structure.md`
- **Links in content must be `<a href>`, not JS navigation.** "Include links directly on the pages using `<a href>` tags; don't use JavaScript to navigate between pages. Googlebot might not detect navigation from JavaScript code." — `docs/search/docs/specialty/ecommerce/designing-a-url-structure-for-ecommerce-sites.md`
- **Google crawls `href` of `<a>`, does not click buttons or run user-action JS.** "When crawling a site to find pages to index, Google generally crawls URLs found in the `href` attribute of `<a>` elements. Google's crawlers don't \"click\" buttons and generally don't trigger JavaScript functions that require user actions to update the current page contents." — `docs/search/docs/specialty/ecommerce/pagination-and-incremental-page-loading.md`
- **Each paginated page needs a unique URL.** "Give each page a unique URL. For example, include a `?page=n` query parameter, as URLs in a paginated sequence are treated as separate pages by Google." — `docs/search/docs/specialty/ecommerce/pagination-and-incremental-page-loading.md`
- **Paginated results must each have a unique URL (top mistake area).** "Make sure each page in paginated results has a unique URL. We see the most URL mistakes in pagination URL structures." — `docs/search/docs/specialty/ecommerce/designing-a-url-structure-for-ecommerce-sites.md`
- **Do NOT canonicalize paginated pages to page 1.** "Don't use the first page of a paginated sequence as the canonical page. Instead, give each page its own [canonical URL]." — `docs/search/docs/specialty/ecommerce/pagination-and-incremental-page-loading.md`
- **Do NOT use `#` fragments for page numbers.** "Don't use URL fragment identifiers (the text after a `#` in a URL) for page numbers in a collection. Google ignores fragment identifiers." — `docs/search/docs/specialty/ecommerce/pagination-and-incremental-page-loading.md`
- **Each product variant must be identifiable by a separate URL.** "To help Google understand your product variants, make sure that each variant can be identified by a separate URL." Recommended structures: "A path segment, such as `/t-shirt/green`" or "A query parameter, such as `/t-shirt?color=green`". — `docs/search/docs/specialty/ecommerce/designing-a-url-structure-for-ecommerce-sites.md`
- **Variant canonical rule (query-parameter variants).** "If you use optional query parameters to identify variants, use the URL with the query parameter omitted as the [canonical URL]. This can help Google better understand the relationship between product variants." — `docs/search/docs/specialty/ecommerce/designing-a-url-structure-for-ecommerce-sites.md`
- **Variant canonical rule (unique-URL variants).** "For products with unique URLs per variant, include the canonical product URL on all variant pages using a `<link rel=\"canonical\">` tag." — `docs/search/docs/specialty/ecommerce/designing-a-url-structure-for-ecommerce-sites.md`
- **Use one consistent URL across links, sitemap, and canonical.** "Use the same URL in internal links, sitemap files, and `<link rel=\"canonical\">` tags." — `docs/search/docs/specialty/ecommerce/designing-a-url-structure-for-ecommerce-sites.md`
- **Self-referencing canonical on all indexable pages + include in sitemap.** "Use a self-referencing `<link rel=\"canonical\">` tag ... on all indexable pages and include those URLs in a [sitemap] file." — `docs/search/docs/specialty/ecommerce/designing-a-url-structure-for-ecommerce-sites.md`
- **Block filter / alternative-sort variations from indexing.** "To avoid indexing variations of the same list of results, block unwanted URLs from being indexed with the `noindex` robots `meta` tag or discourage crawling of particular URL patterns with a robots.txt file." — `docs/search/docs/specialty/ecommerce/pagination-and-incremental-page-loading.md`
- **Don't disable add-to-cart to block purchasing.** "Don't disable add-to-cart functionality as a way to stopping users from purchasing products. Google may use add-to-cart as a part of verifying the final price details, including tax and shipping costs." — `docs/search/docs/specialty/ecommerce/how-to-launch-an-ecommerce-website.md`
- **Merchant Center is mandatory for some surfaces.** "Participation in Google Merchant Center is mandatory for some Google surfaces, such as listings in the Google Shopping tab." — `docs/search/docs/specialty/ecommerce/share-your-product-data-with-google.md`
- **Category pages should link to every product you want indexed.** "If category pages don't include direct links to all products in a category, Googlebot might not find all of your products by crawling alone. ... It's strongly recommended to link to all products that you wish indexed. If it's not possible to link to all pages, use a [sitemap] or a [Google Merchant Center feed]." — `docs/search/docs/specialty/ecommerce/help-google-understand-your-ecommerce-site-structure.md`

## Recommendations

Google-recommended best practices ("recommend", "consider", "avoid", "use"). Not strict blockers.

- **Link paginated pages sequentially.** "include links from each page to the following page using `<a href>` tags. This can help Googlebot ... find subsequent pages." Also "consider linking from all individual pages in a collection back to the first page of the collection". — `docs/search/docs/specialty/ecommerce/pagination-and-incremental-page-loading.md`
- **Paginated pages may share titles/descriptions.** "pages in a paginated sequence don't need to follow this recommendation. You can use the same titles and descriptions for all pages in the sequence." — `docs/search/docs/specialty/ecommerce/pagination-and-incremental-page-loading.md`
- **Prefer `?key=value` over `?value`.** "Use `?key=value` URL parameters rather than `?value`, where possible." — `docs/search/docs/specialty/ecommerce/designing-a-url-structure-for-ecommerce-sites.md`
- **Don't repeat a parameter key.** "Avoid using the same parameters twice. Googlebot may ignore one of the values otherwise." (recommended `?type=candy,sweet`; not recommended `?type=candy&type=sweet`) — `docs/search/docs/specialty/ecommerce/designing-a-url-structure-for-ecommerce-sites.md`
- **Avoid ephemeral/tracking parameters in internal links.** "Avoid internally linking to temporary parameters, such as session-IDs, tracking codes, user-relative values ... use long-term, persistent URLs." — `docs/search/docs/specialty/ecommerce/designing-a-url-structure-for-ecommerce-sites.md`
- **Descriptive words in URL paths.** "Add descriptive words in URL paths." (recommended `/product/black-t-shirt-with-a-white-collar`; not recommended `/product/3243`) — `docs/search/docs/specialty/ecommerce/designing-a-url-structure-for-ecommerce-sites.md`
- **Normalize case; minimize duplicate URLs.** "Minimize the number of alternative URLs that return the same content" and "convert all text to the same case". — `docs/search/docs/specialty/ecommerce/designing-a-url-structure-for-ecommerce-sites.md`
- **Meaningful anchor text, not "click here".** "Include meaningful text between `<a href>` and `</a>` tags where possible ... Don't use generic phrases such as \"click here\"." — `docs/search/docs/specialty/ecommerce/designing-a-url-structure-for-ecommerce-sites.md`
- **Empty categories: noindex or 404.** "Avoid linking to, or at least indexing, pages without useful content. If a category has no items, use a `noindex` robots `meta` tag. ... consider returning a `404 (not found)` HTTP status code for the page." — `docs/search/docs/specialty/ecommerce/designing-a-url-structure-for-ecommerce-sites.md`
- **Add product structured data (increases eligibility, not required).** "While structured data isn't required to appear in Google Search results, it can help Google understand your page better and display it as a rich result." Increases eligibility for "Product rich results". — `docs/search/docs/specialty/ecommerce/share-your-product-data-with-google.md`
- **Relevant ecommerce structured-data types:** `BreadcrumbList`, `LocalBusiness`, `Organization`, `Product` and `ProductGroup`, `Review`, `VideoObject`. "The following types of structured data are particularly relevant for ecommerce websites." — `docs/search/docs/specialty/ecommerce/include-structured-data-relevant-to-ecommerce.md`
- **Share product data via Merchant Center feed.** "Tell Google directly which products you want to show on Google by uploading a feed to Google Merchant Center." Automated feeds suit "smaller sites that are updated less frequently"; feed files / Content API suit "larger sites or sites with frequently changing content". — `docs/search/docs/specialty/ecommerce/share-your-product-data-with-google.md`
- **Auto-update Merchant Center from site to avoid price/stock lag.** "tell Google Merchant Center to automatically update its copy of your product data based on the website contents, when such a discrepancy is noticed." — `docs/search/docs/specialty/ecommerce/share-your-product-data-with-google.md`
- **Promote important products with more internal links.** "the more links a page has to it within a site, the higher the relative importance of the page". — `docs/search/docs/specialty/ecommerce/help-google-understand-your-ecommerce-site-structure.md`
- **Launch registration steps.** Verify ownership, ask Google to index (URL Inspection for few URLs, sitemap for many), track indexing, establish business details if physical, sign up for Merchant Center. — `docs/search/docs/specialty/ecommerce/how-to-launch-an-ecommerce-website.md`
- **Launch-without-availability: mark stock unavailable via feed.** "provide product data to Google Merchant Center with stock marked as unavailable for purchase using the `excluded_destination` attribute." — `docs/search/docs/specialty/ecommerce/how-to-launch-an-ecommerce-website.md`
- **`data-nosnippet` to exclude content from snippets.** "If you want to explicitly tell Google not to use content on a page to form a snippet, add a `data-nosnippet` attribute to that HTML element." — `docs/search/docs/specialty/ecommerce/share-your-product-data-with-google.md`
- **High-quality reviews: quality over length, first-hand evidence.** "focus on the quality and originality of your reviews, not the length" and "Provide evidence such as visuals, audio, or other links of your own experience". — `docs/search/docs/specialty/ecommerce/write-high-quality-reviews.md`

## Ignored / myths

Things Google explicitly does NOT use, does NOT require, or treats as equivalent — do not waste effort on these.

- **`rel=next` / `rel=prev` are dead (for Google).** "In the past, Google used `<link rel=\"next\" href=\"...\">` and `<link rel=\"prev\" href=\"...\">` to identify next page and previous page relationships. Google no longer uses these tags, although these links may still be used by other search engines." — `docs/search/docs/specialty/ecommerce/pagination-and-incremental-page-loading.md`
- **Fragment identifiers are ignored in indexing.** "Google does not use fragment identifiers in indexing." e.g. "`/product/t-shirt#black` and `/product/t-shirt#white` are considered to be the same page by Google." — `docs/search/docs/specialty/ecommerce/designing-a-url-structure-for-ecommerce-sites.md`
- **URL structure is NOT used to derive site structure.** "Google generally doesn't look at the structure of URLs to work out the structure of a site. Instead, it analyzes the linkages between pages". — `docs/search/docs/specialty/ecommerce/help-google-understand-your-ecommerce-site-structure.md`
- **Structured data is NOT required to appear in Search.** "structured data isn't required to appear in Google Search results". — `docs/search/docs/specialty/ecommerce/share-your-product-data-with-google.md`
- **Merchant Center upload is NOT mandatory to appear in Search (only for some surfaces).** "While uploading product data to Google Merchant Center isn't mandatory to appear in Google search results, it can enhance Google's understanding of your products." — `docs/search/docs/specialty/ecommerce/share-your-product-data-with-google.md`
- **Googlebot does NOT submit search boxes.** "Googlebot generally doesn't try to submit searches into a search box as part of crawling a site." — `docs/search/docs/specialty/ecommerce/help-google-understand-your-ecommerce-site-structure.md`
- **On an ecommerce platform, you can likely skip manual URL design.** "If you're using an ecommerce platform, you can most likely skip this section, as the platform has most likely already considered these issues for you." — `docs/search/docs/specialty/ecommerce/designing-a-url-structure-for-ecommerce-sites.md`

## Auditable checks

Tags: `[auto]` = static HTML/source or robots/sitemap check; `[render]` = needs rendered DOM / JS execution / crawl behavior; `[handoff]` = needs human judgment, account, or external service.

1. `[auto]` Assert no `<link rel="next">` / `<link rel="prev">` are relied on for pagination (presence is harmless but not used by Google).
2. `[auto]` Every paginated page URL is unique and uses a query/path param (e.g. `?page=n`), not a `#` fragment, for the page number.
3. `[auto]` Paginated pages carry a self-referencing canonical, NOT a canonical pointing to page 1.
4. `[auto]` Each product variant resolves to a distinct URL (path segment or query param).
5. `[auto]` Query-parameter variant pages canonicalize to the parameter-omitted URL; unique-URL variant pages canonicalize to the canonical product URL.
6. `[auto]` Internal links, sitemap entries, and `rel=canonical` all use the same URL form (consistent inclusion/exclusion of `?page=1`, case, trailing slash).
7. `[auto]` All indexable pages have a self-referencing `rel=canonical` and appear in a sitemap.
8. `[auto]` Filter / alternative-sort URLs are excluded via `noindex` meta or robots.txt disallow.
9. `[auto]` URL params use `?key=value` form; no duplicated param keys; no session-ID/tracking/time params in internal links.
10. `[auto]` Empty category pages return `noindex` or `404`.
11. `[render]` Primary navigation and pagination controls are real `<a href>` links in the rendered DOM (not button/`onclick`/JS-only navigation).
12. `[render]` Category pages link directly to all products intended for indexing (or a sitemap/Merchant feed covers the gap).
13. `[render]` Product pages expose valid `Product`/`ProductGroup` structured data (and `BreadcrumbList`/`Organization`/`Review`/`VideoObject` where applicable).
14. `[auto]` Anchor text is descriptive (flag generic "click here" / empty anchors).
15. `[handoff]` Merchant Center account exists and a product feed is uploaded when targeting the Shopping tab / Lens / Maps surfaces.
16. `[handoff]` Merchant Center is set to auto-update from site content to prevent price/stock lag.
17. `[handoff]` Launch checklist completed (verify ownership, request indexing, track Page Indexing report, establish business details if physical).
18. `[handoff]` Add-to-cart remains enabled even during "not yet purchasable" launch states; unavailability handled via feed `excluded_destination`, not by disabling cart.
19. `[handoff]` Review content shows first-hand evidence, expertise, and comparisons (quality, not length); affiliate links follow paid-links guidance.

## Where ecommerce data can appear

Organic product results come from your pages; the Shopping tab and Lens come from a feed.

- **Shopping tab / Google Lens need Merchant Center, not markup.** "If you want your products to be
  found in the Google Shopping tab, upload your products to Google Merchant Center." Same for Lens:
  "make sure your product details are uploaded to Google Merchant Center."
  — `docs/search/docs/specialty/ecommerce/where-ecommerce-data-can-appear-on-google.md`
- Practical consequence: perfect `Product` structured data will **not** put you in the Shopping tab.
  A missing Merchant Center feed is a `[handoff]` finding, never an `[auto]` fix.

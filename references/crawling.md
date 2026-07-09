# Crawling & robots.txt
Reference for how Googlebot discovers, fetches, and is controlled on a site. Grounded only in the local Search Central fork. Every claim carries an exact quote + repo-relative source path.

## Hard requirements

- Reserved URL characters must be percent-encoded: "Characters defined by the standard as reserved must be percent encoded." — `docs/search/docs/crawling-indexing/url-structure.md`
- Links must be `<a href>` to be crawled: "Generally, Google can only crawl your link if it's an `<a>` HTML element (also known as anchor element) with an `href` attribute." — `docs/search/docs/crawling-indexing/links-crawlable.md`
- The URL in an `<a>` must resolve to a real address: "Make sure that the URL in your `<a>` element resolves into an actual web address (meaning, it resembles a URI) that Google crawlers can send requests to" — `docs/search/docs/crawling-indexing/links-crawlable.md`
- robots.txt must be at the site root: "You must place the robots.txt file in the top-level directory of a site, on a supported protocol." — `docs/crawling/docs/robots-txt/robots-txt-spec.md`
- Crawlers do not look for robots.txt in subfolders: "Not a valid robots.txt file. Crawlers don't check for robots.txt files in subdirectories." — `docs/crawling/docs/robots-txt/robots-txt-spec.md`
- robots.txt rules scope is host+protocol+port only: "The rules listed in the robots.txt file apply only to the host, protocol, and port number where the robots.txt file is hosted." — `docs/crawling/docs/robots-txt/robots-txt-spec.md`
- robots.txt must be UTF-8 plain text: "The robots.txt file must be a UTF-8 encoded plain text file and the lines must be separated by `CR`, `CR/LF`, or `LF`." — `docs/crawling/docs/robots-txt/robots-txt-spec.md`
- robots.txt file-size cap is 500 KiB: "Google enforces a robots.txt file size limit of 500 kibibytes (KiB). Content which is after the maximum file size is ignored." — `docs/crawling/docs/robots-txt/robots-txt-spec.md`
- A robots.txt `[path]` must start with `/` and is case-sensitive: "The path value must start with `/` to designate the root and the value is case-sensitive." — `docs/crawling/docs/robots-txt/robots-txt-spec.md`
- A `sitemap:` line in robots.txt must be an absolute URL: "It must be a fully qualified URL, including the protocol and host, and doesn't have to be URL-encoded." — `docs/crawling/docs/robots-txt/robots-txt-spec.md`
- robots.txt is NOT a way to hide a page from Search: "Don't use a robots.txt file as a means to hide your web pages ... from Google Search results." — `docs/search/docs/crawling-indexing/robots/intro.md`
- Only `user-agent`, `allow`, `disallow`, `sitemap` fields are honored: "Google supports the following fields (other fields such as `crawl-delay` aren't supported)". — `docs/crawling/docs/robots-txt/robots-txt-spec.md`

## Recommendations

- Prefer hyphens over underscores: "we recommend using hyphens (`-`) instead of underscores (`_`) to separate words in your URLs" — `docs/search/docs/crawling-indexing/url-structure.md`
- Use descriptive, readable URLs: "When possible, use readable words rather than long ID numbers in your URLs." — `docs/search/docs/crawling-indexing/url-structure.md`
- Trim needless parameters: "Whenever possible, shorten URLs by trimming unnecessary parameters (meaning, parameters that don't change the content)." — `docs/search/docs/crawling-indexing/url-structure.md`
- Normalize case: "convert all text to the same case so it's easier for Google to determine that URLs reference the same page." — `docs/search/docs/crawling-indexing/url-structure.md`
- `nofollow` infinite calendars: "If your site has an infinite calendar, add a `nofollow` attribute to links to dynamically created future calendar pages." — `docs/search/docs/crawling-indexing/url-structure.md`
- Use root-relative (not parent-relative) links to avoid infinite spaces: "To fix, use root-relative URLs in your links (instead of parent-relative)." — `docs/search/docs/crawling-indexing/url-structure.md`
- Anchor text should be descriptive: "Good anchor text is descriptive, reasonably concise, and relevant to the page that it's on and to the page it links to." — `docs/search/docs/crawling-indexing/links-crawlable.md`
- Provide alt text for image links: "For images as links, Google uses the `alt` attribute of the `img` element as anchor text" — `docs/search/docs/crawling-indexing/links-crawlable.md`
- Every important page should be internally linked: "Every page you care about should have a link from at least one other page on your site." — `docs/search/docs/crawling-indexing/links-crawlable.md`
- Return `404`/`410` for gone pages (fixes soft 404): "return a `404 (not found)` or `410 (gone)` response (status) code for the page." — `docs/search/docs/crawling-indexing/troubleshoot-crawling-errors.md`
- Use `<lastmod>` and news sitemaps to speed re-crawl of updates: "Use the `<lastmod>` tag in sitemaps to indicate when an indexed URL has been updated." — `docs/search/docs/crawling-indexing/troubleshoot-crawling-errors.md`
- Send `304 (Not Modified)` when content is unchanged: "you can send a `304 (Not Modified)` HTTP status code and no response body for any Googlebot request if the content hasn't changed" — `docs/search/docs/crawling-indexing/troubleshoot-crawling-errors.md`
- To slow crawling in an emergency, return `503`/`429`: "Return `503` or `429` HTTP response status codes temporarily for Googlebot requests when your server is overloaded. Googlebot will retry these URLs for about 2 days." — `docs/search/docs/crawling-indexing/troubleshoot-crawling-errors.md`
- To reduce crawl rate short-term, return `500`/`503`/`429`: "then return `500`, `503`, or `429` HTTP response status code instead of `200` to the crawl requests." — `docs/crawling/docs/crawlers-fetchers/reduce-crawl-rate.md`
- Prefer `ETag` over `Last-Modified`: "we recommend using `ETag` instead of the `Last-Modified` header to indicate caching preference as `ETag` doesn't have date formatting issues." — `docs/crawling/docs/crawlers-fetchers/overview-google-crawlers.md`
- Verify Googlebot before blocking: "The best way to verify that a request actually comes from Googlebot is to use a reverse DNS lookup on the source IP" — `docs/search/docs/crawling-indexing/googlebot.md`

## Facts / limits (verbatim numbers)

- Googlebot fetch caps: "Googlebot crawls the first 2MB of a supported file type, and the first 64MB of a PDF file." — `docs/search/docs/crawling-indexing/googlebot.md`
- Default crawler cap (other clients): "By default, Google's crawlers and fetchers only crawl the first 15MB of a file, and any content beyond this limit is ignored." — `docs/crawling/docs/crawlers-fetchers/overview-google-crawlers.md`
- File-size limit applies uncompressed: "The file size limit is applied on the uncompressed data." — `docs/search/docs/crawling-indexing/googlebot.md`
- Typical visit frequency: "Googlebot shouldn't access your site more than once every few seconds on average." — `docs/search/docs/crawling-indexing/googlebot.md`
- robots.txt caching: "Google generally caches the contents of robots.txt file for up to 24 hours" — `docs/crawling/docs/robots-txt/robots-txt-spec.md`
- robots.txt `3xx`: "Google follows at least five redirect hops ... and then stops and treats it as a `404` for the robots.txt file." — `docs/crawling/docs/robots-txt/robots-txt-spec.md`
- robots.txt `4xx` (except 429): "Google's crawlers treat all `4xx` errors, except `429`, as if a valid robots.txt file didn't exist." — `docs/crawling/docs/robots-txt/robots-txt-spec.md`
- robots.txt `5xx`: "For the first 12 hours, Google stops crawling the site but keeps trying to fetch the robots.txt file." and "for the next 30 days Google will use the last good version" — `docs/crawling/docs/robots-txt/robots-txt-spec.md`
- Rule precedence: "crawlers use the most specific rule based on the length of the rule path. In case of conflicting rules ... Google uses the least restrictive rule." — `docs/crawling/docs/robots-txt/robots-txt-spec.md`
- Wildcards supported: "`*` designates 0 or more instances of any valid character." and "`$` designates the end of the URL." — `docs/crawling/docs/robots-txt/robots-txt-spec.md`
- Sustained `503`/`429` drops URLs: "returning `503` or `429` for more than 2 days will cause Google to drop those URLs from the index." — `docs/search/docs/crawling-indexing/troubleshoot-crawling-errors.md`
- Indexable file types are determined by `Content-Type`: "The file type is determined by the `Content-Type` HTTP header returned when Google crawls the file" — `docs/search/docs/crawling-indexing/indexable-file-types.md`
- Verify via reverse+forward DNS to `googlebot.com`, `google.com`, or `googleusercontent.com`: "Verify that the domain name is either `googlebot.com`, `google.com`, or `googleusercontent.com`." — `docs/crawling/docs/crawlers-fetchers/verifying-googlebot.md`

## Ignored / myths

- `crawl-delay` is ignored: "other fields such as `crawl-delay` aren't supported" — `docs/crawling/docs/robots-txt/robots-txt-spec.md`
- Invalid lines and a BOM are ignored: "Google ignores invalid lines in robots.txt files, including the Unicode Byte Order Mark (BOM) at the beginning of the robots.txt file" — `docs/crawling/docs/robots-txt/robots-txt-spec.md`
- `401`/`403` do NOT limit crawl rate: "Don't use `401` and `403` status codes for limiting the crawl rate. The `4xx` status codes, except `429`, have no effect on crawl rate." — `docs/crawling/docs/robots-txt/robots-txt-spec.md`
- Disallow ≠ removed from Search: "we might still find and index a disallowed URL if it is linked from other places on the web." — `docs/search/docs/crawling-indexing/robots/intro.md`
- You can't hide a site by not linking it: "It's almost impossible to keep a site secret by not publishing links to it." — `docs/search/docs/crawling-indexing/googlebot.md`
- Requesting a recrawl guarantees nothing: "Requesting a crawl does not guarantee that inclusion in search results will happen instantly or even at all." — `docs/search/docs/crawling-indexing/ask-google-to-recrawl.md`
- Re-submitting the same URL does not speed it up: "requesting a recrawl multiple times for the same URL won't get it crawled any faster." — `docs/search/docs/crawling-indexing/ask-google-to-recrawl.md`
- Sitemaps are hints for crawling: "Sitemaps are useful suggestions to Googlebot, not absolute requirements." — `docs/search/docs/crawling-indexing/troubleshoot-crawling-errors.md`
- Google can't selectively target Googlebot Smartphone vs Desktop in robots.txt: "you cannot selectively target either Googlebot Smartphone or Googlebot Desktop using robots.txt." — `docs/search/docs/crawling-indexing/googlebot.md`
- URL fragments generally unsupported: "Don't use fragments to change the content of a page, as Google Search generally doesn't support URL fragments." — `docs/search/docs/crawling-indexing/url-structure.md`

## Auditable checks

1. `[auto]` Fetch `<origin>/robots.txt`; confirm it lives at the top-level path `/robots.txt` (not a subdirectory). Maps to root-location requirement.
2. `[auto]` robots.txt response is `2xx`; treat `3xx` chains >5 hops, `4xx` (≠429), and DNS failures as "no restrictions" per spec — flag if the site relies on robots.txt for blocking. Maps to error-handling facts.
3. `[auto]` robots.txt body size ≤ 500 KiB (512,000 bytes). Maps to 500 KiB cap.
4. `[auto]` robots.txt is valid UTF-8 with no leading BOM affecting rules. Maps to UTF-8 requirement.
5. `[auto]` Every `disallow`/`allow` path begins with `/`. Maps to path requirement.
6. `[auto]` Each `Sitemap:` line in robots.txt is an absolute URL (`^https?://` or `ftp://`). Maps to fully-qualified-sitemap requirement.
7. `[auto]` Flag any `crawl-delay:` directive as ignored/no-op. Maps to unsupported-fields myth.
8. `[auto]` Parse rendered HTML: internal navigation links are `<a>` elements with a non-empty `href` (flag `<span href>`, `routerLink`, `onclick`-only, `javascript:` hrefs). Maps to crawlable-links requirement.
9. `[auto]` Image links (`<a><img></a>`) have non-empty `alt`. Maps to image-link anchor-text recommendation.
10. `[auto]` HTML document transfer size < 2MB and PDFs < 64MB (uncompressed) so content isn't truncated. Maps to Googlebot fetch caps.
11. `[auto]` Removed/nonexistent pages return `404`/`410`, not `200` with an error body (soft-404 detection). Maps to soft-404 recommendation.
12. `[auto]` No reserved/non-ASCII characters left unencoded in emitted `href` values. Maps to percent-encoding requirement.
13. `[handoff]` Confirm robots.txt does not block CSS/JS resources needed to render primary content (needs render comparison / GSC URL Inspection). Maps to "don't block critical resources."
14. `[handoff]` Confirm a request claiming to be Googlebot passes reverse+forward DNS to an approved Google domain. Maps to verification recommendation.

# Sitemaps
Reference for building, sizing, submitting, and extending XML sitemaps (image / video / news / hreflang). Grounded only in the local Search Central fork; every claim has an exact quote + repo-relative source path.

## Hard requirements

- Size cap per sitemap — 50MB / 50,000 URLs: "All formats limit a single sitemap to 50MB (uncompressed) or 50,000 URLs. If you have a larger file or more URLs, you must break your sitemap into multiple sitemaps." — `docs/search/docs/crawling-indexing/sitemaps/build-sitemap.md`
- Sitemap must be UTF-8: "The sitemap file must be UTF-8 encoded." — `docs/search/docs/crawling-indexing/sitemaps/build-sitemap.md`
- URLs must be fully-qualified/absolute: "Use fully-qualified, absolute URLs in your sitemaps. Google will attempt to crawl your URLs exactly as listed." — `docs/search/docs/crawling-indexing/sitemaps/build-sitemap.md`
- Tag values must be entity-escaped: "As with all XML files, all tag values must be entity escaped." — `docs/search/docs/crawling-indexing/sitemaps/build-sitemap.md`
- Sitemap scope is its directory (unless submitted via Search Console): "a sitemap affects only descendants of the parent directory." — `docs/search/docs/crawling-indexing/sitemaps/build-sitemap.md`
- Text sitemap: only URLs, one per line, `.txt`: "Don't put anything other than URLs in the sitemap file." — `docs/search/docs/crawling-indexing/sitemaps/build-sitemap.md`
- Sitemap-index entries must be same-site: "The referenced sitemaps must be hosted on the same site as your sitemap index file. This requirement is waived if you set up cross-site submission." — `docs/search/docs/crawling-indexing/sitemaps/large-sitemaps.md`
- Sitemap-index entries must be same directory or lower: "Sitemaps that are referenced in the sitemap index file must be in the same directory as the sitemap index file, or lower in the site hierarchy." — `docs/search/docs/crawling-indexing/sitemaps/large-sitemaps.md`
- Sitemap index cap — 50,000 `loc`: "A sitemap index file may have up to 50,000 `loc` tags." — `docs/search/docs/crawling-indexing/sitemaps/large-sitemaps.md`
- Max 500 index files per site: "You can submit up to 500 sitemap index files for each site in your Search Console account." — `docs/search/docs/crawling-indexing/sitemaps/large-sitemaps.md`
- `lastmod` must be W3C Datetime: "The value for the `lastmod` tag must be in W3C Datetime format." — `docs/search/docs/crawling-indexing/sitemaps/large-sitemaps.md`
- Image: required tags `<image:image>` + `<image:loc>`: "To make sure Google can use your image sitemap, you must use the following required tags" — `docs/search/docs/crawling-indexing/sitemaps/image-sitemaps.md`
- Image cap — 1,000 per URL: "Each `<url>` tag can contain up to 1,000 `<image:image>` tags." — `docs/search/docs/crawling-indexing/sitemaps/image-sitemaps.md`
- Video: required `<video:video>`, `<video:thumbnail_loc>`, `<video:title>`, `<video:description>`, plus one of content/player loc: "It's required to provide either a `<video:content_loc>` or `<video:player_loc>` tag." — `docs/search/docs/crawling-indexing/sitemaps/video-sitemaps.md`
- Video `player_loc`/`content_loc` must differ from `<loc>`: "Must not be the same as the URL in the parent `<loc>` tag." — `docs/search/docs/crawling-indexing/sitemaps/video-sitemaps.md`
- Video duration range 1–28800s: "Value must be from `1` to `28800` (8 hours)." — `docs/search/docs/crawling-indexing/sitemaps/video-sitemaps.md`
- Video description ≤ 2048 chars: "A description of the video. Maximum 2048 characters." — `docs/search/docs/crawling-indexing/sitemaps/video-sitemaps.md`
- Video ≤ 32 tags: "A maximum of 32 tags is permitted per video." — `docs/search/docs/crawling-indexing/sitemaps/video-sitemaps.md`
- Video uploader ≤ 255 chars: "The video uploader's name. The string value can be a maximum of 255 characters." — `docs/search/docs/crawling-indexing/sitemaps/video-sitemaps.md`
- Video files must be Googlebot-accessible: "All files referenced in the video sitemap must be accessible to Googlebot." — `docs/search/docs/crawling-indexing/sitemaps/video-sitemaps.md`
- News: required `<news:news>`, `<news:publication>`, `<news:name>`, `<news:language>`, `<news:publication_date>`, `<news:title>`: "To make sure Google can use your news sitemap, you must use the following required tags" — `docs/search/docs/crawling-indexing/sitemaps/news-sitemap.md`
- News cap — 1,000 `news:news` per sitemap: "a sitemap may have up to 1,000 `news:news` tags. If there are more than 1,000 `<news:news>` tags in a news sitemap, split your sitemap into several smaller sitemaps." — `docs/search/docs/crawling-indexing/sitemaps/news-sitemap.md`
- News: only articles from the last two days: "Only include recent URLs for articles that were created in the last two days." — `docs/search/docs/crawling-indexing/sitemaps/news-sitemap.md`
- Each extension needs its `xmlns` namespace on `<urlset>`: "For each sitemap extension that you want to use in a sitemap you need to specify the respective namespace" — `docs/search/docs/crawling-indexing/sitemaps/combine-sitemap-extensions.md`

## Recommendations

- Post the sitemap at the site root: "a sitemap posted at the site root can affect all files on the site, which is where we recommend posting your sitemaps." — `docs/search/docs/crawling-indexing/sitemaps/build-sitemap.md`
- List canonical URLs only: "Include the URLs in your sitemap that you want to see in Google's search results." — `docs/search/docs/crawling-indexing/sitemaps/build-sitemap.md`
- Point to one version (mobile or desktop): "If you have different URLs for mobile and desktop versions of a page, we recommend pointing to only one version in a sitemap." — `docs/search/docs/crawling-indexing/sitemaps/build-sitemap.md`
- `lastmod` should reflect a significant update: "The `<lastmod>` value should reflect the date and time of the last significant update to the page." — `docs/search/docs/crawling-indexing/sitemaps/build-sitemap.md`
- Split oversized sitemaps and use an index: "if the sitemap becomes too large, you must split it into smaller sitemaps." — `docs/search/docs/crawling-indexing/sitemaps/build-sitemap.md`
- Reference the sitemap from robots.txt: "Insert the following line anywhere in your robots.txt file, specifying the path to your sitemap." — `docs/search/docs/crawling-indexing/sitemaps/build-sitemap.md`
- News: keep updating one sitemap, don't spawn new ones: "Update your news sitemap with fresh articles as they're published. Don't create a new sitemap with each update." — `docs/search/docs/crawling-indexing/sitemaps/news-sitemap.md`
- Video: prefer `content_loc` over `player_loc`: "We recommend that your provide the `<video:content_loc>` tag, if possible. This is the most effective way for Google to fetch your video content files." — `docs/search/docs/crawling-indexing/sitemaps/video-sitemaps.md`
- Google recommends video sitemaps over mRSS: "Google recommends using video sitemaps, however we also support mRSS feeds." — `docs/search/docs/crawling-indexing/sitemaps/video-sitemaps.md`
- A sitemap may be unnecessary for small, well-linked sites (~500 pages): "Your site is 'small'. By small, we mean about 500 pages or fewer on your site." — `docs/search/docs/crawling-indexing/sitemaps/overview.md`
- Combining extensions bloats file size — watch limits: "Combining sitemap extensions increases the file size of your sitemap significantly." — `docs/search/docs/crawling-indexing/sitemaps/combine-sitemap-extensions.md`

## Facts / semantics (verbatim)

- Google has no preferred format: "choose the one that is the most appropriate for your site and setup (Google doesn't have a preference)." — `docs/search/docs/crawling-indexing/sitemaps/build-sitemap.md`
- Supported formats: XML, RSS/mRSS/Atom 1.0, and text: "Google accepts RSS 2.0 and Atom 1.0 feeds." — `docs/search/docs/crawling-indexing/sitemaps/build-sitemap.md`
- Sitemap namespace: "`http://www.sitemaps.org/schemas/sitemap/0.9`" — `docs/search/docs/crawling-indexing/sitemaps/build-sitemap.md`
- Image namespace: "`http://www.google.com/schemas/sitemap-image/1.1`" — `docs/search/docs/crawling-indexing/sitemaps/image-sitemaps.md`
- Video namespace: "`http://www.google.com/schemas/sitemap-video/1.1`" — `docs/search/docs/crawling-indexing/sitemaps/combine-sitemap-extensions.md`
- News namespace: "`http://www.google.com/schemas/sitemap-news/0.9`" — `docs/search/docs/crawling-indexing/sitemaps/news-sitemap.md`
- hreflang uses xhtml namespace: "`xhtml:` (for `hreflang`) ... `http://www.w3.org/1999/xhtml`" — `docs/search/docs/crawling-indexing/sitemaps/combine-sitemap-extensions.md`
- News `<news:language>` uses ISO 639 (2–3 letters), with `zh-cn`/`zh-tw` exceptions: "Exception: For Simplified Chinese, use `zh-cn` and for Traditional Chinese, use `zh-tw`." — `docs/search/docs/crawling-indexing/sitemaps/news-sitemap.md`
- Video `expiration_date` hides the video after that date: "If present, Google Search won't show your video after this date." — `docs/search/docs/crawling-indexing/sitemaps/video-sitemaps.md`

## Ignored / myths

- `<priority>` and `<changefreq>` are ignored: "Google ignores `<priority>` and `<changefreq>` values." — `docs/search/docs/crawling-indexing/sitemaps/build-sitemap.md`
- `<lastmod>` used only if trustworthy: "Google uses the `<lastmod>` value if it's consistently and verifiably (for example by comparing to the last modification of the page) accurate." — `docs/search/docs/crawling-indexing/sitemaps/build-sitemap.md`
- Submitting a sitemap guarantees nothing: "submitting a sitemap is merely a hint: it doesn't guarantee that Google will download the sitemap or use the sitemap for crawling URLs on the site." — `docs/search/docs/crawling-indexing/sitemaps/build-sitemap.md`
- A sitemap does not guarantee indexing: "A sitemap helps search engines discover URLs on your site, but it doesn't guarantee that all the items in your sitemap will be crawled and indexed." — `docs/search/docs/crawling-indexing/sitemaps/overview.md`
- URL order is irrelevant: "You don't have to worry about the order of the URLs in your sitemap, it doesn't matter to Google." — `docs/search/docs/crawling-indexing/sitemaps/build-sitemap.md`
- An empty news sitemap is harmless: "It won't cause any problems with Google Search if the file is empty." — `docs/search/docs/crawling-indexing/sitemaps/news-sitemap.md`
- Deprecated image tags removed: "We removed the following tags and attributes from our documentation: `<image:caption>`, `<image:geo_location>`, `<image:title>`, `<image:license>`." — `docs/search/docs/crawling-indexing/sitemaps/image-sitemaps.md`
- Deprecated video tags removed: "We removed the following tags and attributes from our documentation: `<video:category>`, `<video:gallery_loc>` ... the `<video:price>` tag ... and the `<video:tvshow>` tag" — `docs/search/docs/crawling-indexing/sitemaps/video-sitemaps.md`

## Auditable checks

1. `[auto]` Each sitemap file ≤ 50MB uncompressed. Maps to size cap.
2. `[auto]` `<loc>` (URL) count per sitemap ≤ 50,000. Maps to URL cap.
3. `[auto]` Sitemap served/decoded as valid UTF-8. Maps to UTF-8 requirement.
4. `[auto]` Every `<loc>` is an absolute URL (`^https?://`), not relative. Maps to fully-qualified-URL requirement.
5. `[auto]` All tag values are XML entity-escaped (no raw `&`, `<`, `>`). Maps to entity-escaping requirement.
6. `[auto]` Sitemap-index `<loc>` count ≤ 50,000, and each referenced sitemap is same-host and same-directory-or-lower vs the index. Maps to index caps + location rules.
7. `[auto]` `<image:image>` count per `<url>` ≤ 1,000. Maps to image cap.
8. `[auto]` Video `<video:duration>` is between 1 and 28800; `<video:description>` ≤ 2048 chars; `<video:tag>` count ≤ 32; `<video:uploader>` ≤ 255 chars. Maps to video limits.
9. `[auto]` Each `<video:video>` has thumbnail+title+description and at least one of `content_loc`/`player_loc`, and those differ from the parent `<loc>`. Maps to video required-tags rule.
10. `[auto]` `<news:news>` count per sitemap ≤ 1,000 and each `<news:publication_date>` is within the last 2 days. Maps to news cap + recency rules.
11. `[auto]` `<priority>`/`<changefreq>` absent or flagged as ignored. Maps to ignored-values myth.
12. `[auto]` Every used extension (`image`/`video`/`news`/`xhtml`) has its matching `xmlns` declared on `<urlset>`. Maps to namespace requirement.
13. `[auto]` `<lastmod>` values parse as W3C Datetime. Maps to lastmod-format requirement.
14. `[auto]` Text sitemaps contain only one URL per line with a `.txt` extension. Maps to text-sitemap rule.
15. `[handoff]` Sitemap URLs are the site's canonical URLs (needs canonical cross-check per page). Maps to "list canonical URLs" recommendation.
16. `[handoff]` ≤ 500 sitemap index files submitted for the site (Search Console account view). Maps to 500-index cap.

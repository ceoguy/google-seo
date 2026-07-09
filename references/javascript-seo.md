# JavaScript SEO

How Googlebot crawls, renders, and indexes JavaScript-powered pages, and what a JS site must get right to be indexable. Grounded only in Google Search Central docs.

## Hard requirements

- Three-phase pipeline: "Google processes JavaScript web apps in three main phases:" — "Crawling", "Rendering", "Indexing". — `docs/search/docs/crawling-indexing/javascript/javascript-seo-basics.md`
- Crawl and render are separate queues with unpredictable delay: "Googlebot queues pages for both crawling and rendering. It is not immediately obvious when a page is waiting for crawling and when it is waiting for rendering." — `docs/search/docs/crawling-indexing/javascript/javascript-seo-basics.md`
- Rendering is deferred, not instant: "The page may stay on this queue for a few seconds, but it can take longer than that. Once Google's resources allow, a headless Chromium renders the page and executes the JavaScript." — `docs/search/docs/crawling-indexing/javascript/javascript-seo-basics.md`
- Only 200 pages are queued to render: "Googlebot queues all pages with a `200` HTTP status code for rendering, unless a robots `meta` tag or header tells Google not to index the page." — `docs/search/docs/crawling-indexing/javascript/javascript-seo-basics.md`
- "All pages with a `200` HTTP status code are sent to the rendering queue, no matter whether JavaScript is present on the page." — `docs/search/docs/crawling-indexing/javascript/javascript-seo-basics.md`
- Non-200 may not render: "If the HTTP status code is non-`200` (for example, on error pages with `404` status code), rendering might be skipped." — `docs/search/docs/crawling-indexing/javascript/javascript-seo-basics.md`
- Blocked resources are not rendered: "Google Search won't render JavaScript from blocked files or on blocked pages." — `docs/search/docs/crawling-indexing/javascript/javascript-seo-basics.md`
- noindex+JS trap: "When Google encounters the `noindex` tag, it may skip rendering and JavaScript execution, which means using JavaScript to change or remove the robots `meta` tag from `noindex` may not work as expected. If you do want the page indexed, don't use a `noindex` tag in the original page code." — `docs/search/docs/crawling-indexing/javascript/javascript-seo-basics.md`
- Indexing sees only rendered output: "This means Google can only see content that's visible in the rendered HTML." and "If the content isn't visible in the rendered HTML, Google won't be able to index it." — `docs/search/docs/crawling-indexing/javascript/javascript-seo-basics.md`
- Structured data must be in the rendered DOM: "Google Search can understand and process structured data that's available in the DOM when it renders the page." — `docs/search/docs/appearance/structured-data/generate-structured-data-with-javascript.md`
- Links must be real anchors, not fragments: "Google can only discover your links if they are `<a>` HTML elements with an `href` attribute." and "To ensure that Googlebot can parse and extract your URLs, don't use fragments to load different page content." — `docs/search/docs/crawling-indexing/javascript/javascript-seo-basics.md`
- No cross-page state: "WRS does not retain state across page loads:" — "Local Storage and Session Storage data are cleared across page loads." / "HTTP Cookies are cleared across page loads." — `docs/search/docs/crawling-indexing/javascript/fix-search-javascript.md`
- HTTP only: "Googlebot uses HTTP requests to retrieve content from your server. It does not support other types of connections, such as `WebSockets` or `WebRTC` connections." — `docs/search/docs/crawling-indexing/javascript/fix-search-javascript.md`
- Googlebot declines permissions: "Expect Googlebot to decline user permission requests." (e.g. "if you make the `Camera API` required, Googlebot can't provide a camera to you.") — `docs/search/docs/crawling-indexing/javascript/fix-search-javascript.md`
- Server-response paywalls that only hide content via JS leak it / aren't reliable: "Make sure your paywall only provides the full content once the subscription status is confirmed." — `docs/search/docs/crawling-indexing/javascript/fix-search-javascript.md`
- Lazy-load must not depend on interaction: "The methods mentioned don't rely on user actions, such as scrolling or clicking, to load content, which is important as Google Search does not interact with your page." — `docs/search/docs/crawling-indexing/javascript/lazy-loading.md`

## Recommendations

- Head tags Google DOES pick up from JS/rendered HTML — title & meta description: "You can use JavaScript to set or change the meta description as well as the `<title>` element." — `docs/search/docs/crawling-indexing/javascript/javascript-seo-basics.md`
- Head tags Google DOES pick up — JSON-LD: "you can use JavaScript to generate the required JSON-LD and inject it into the page." — `docs/search/docs/crawling-indexing/javascript/javascript-seo-basics.md`
- Prefer server-side / pre-rendering: "server-side or pre-rendering is still a great idea because it makes your website faster for users and crawlers, and not all bots can run JavaScript." — `docs/search/docs/crawling-indexing/javascript/javascript-seo-basics.md`
- Canonical belongs in HTML: "The best way to set the canonical URL is to use HTML, but if you have to use JavaScript, make sure that you always set the canonical URL to the same value as the original HTML." — `docs/search/docs/crawling-indexing/javascript/javascript-seo-basics.md`
- If canonical is JS-injected, exactly one: "make sure that this is the only `rel="canonical"` link tag on the page." and "Conflicting or multiple `rel="canonical"` link tags may lead to unexpected results." — `docs/search/docs/crawling-indexing/javascript/javascript-seo-basics.md`
- Use History API routing, not hash fragments: "We recommend using the History API to load different content based on the URL in a SPA." — `docs/search/docs/crawling-indexing/javascript/fix-search-javascript.md`
- Avoid soft 404s in SPAs: redirect to a real 404, or "Add a `<meta name="robots" content="noindex">` to error pages using JavaScript." — `docs/search/docs/crawling-indexing/javascript/javascript-seo-basics.md`
- Content fingerprinting to survive aggressive caching: "WRS may ignore caching headers. This may lead WRS to use outdated JavaScript or CSS resources. Content fingerprinting avoids this problem by making a fingerprint of the content part of the filename, like `main.2bb85551.js`." — `docs/search/docs/crawling-indexing/javascript/fix-search-javascript.md`
- Feature-detect unsupported APIs (e.g. WebGL): "feature detection shows that Googlebot doesn't support WebGL." — `docs/search/docs/crawling-indexing/javascript/fix-search-javascript.md`
- Lazy-load only what enters the viewport: "make sure that your lazy-loading implementation loads all relevant content whenever it is visible in the viewport." — `docs/search/docs/crawling-indexing/javascript/lazy-loading.md`
- Infinite scroll needs paginated, stable URLs: "Give each chunk its own persistent, unique URL." — `docs/search/docs/crawling-indexing/javascript/lazy-loading.md`
- Web components: expose light DOM via slots because "When Google renders a page, it flattens the shadow DOM and light DOM content." — `docs/search/docs/crawling-indexing/javascript/javascript-seo-basics.md`
- Test with the URL input, not code paste: "We recommend that you use the URL input instead of the code input because there are JavaScript limitations when using the code input (for example, CORS restrictions)." — `docs/search/docs/appearance/structured-data/generate-structured-data-with-javascript.md`
- If structured-data type is unsupported by the tool: "If the rendered HTML contains the structured data, Google Search will be able to process it." — `docs/search/docs/appearance/structured-data/generate-structured-data-with-javascript.md`
- GTM-generated JSON-LD should read from page variables: "Duplicating the information in GTM increases the risk of having a mismatch between page content and the structured data inserted using GTM." — `docs/search/docs/appearance/structured-data/generate-structured-data-with-javascript.md`
- Dynamically generated Product markup is risky for fast-changing data: "dynamically-generated markup can make Shopping crawls less frequent and less reliable, which can be an issue for fast-changing content like product availability and price." — `docs/search/docs/appearance/structured-data/generate-structured-data-with-javascript.md`

## Ignored / myths

- Canonical via JS is discouraged (Google does read it, but advises against it): "While we don't recommend using JavaScript for this, it is possible to inject a `rel="canonical"` link tag with JavaScript. Google Search will pick up the injected canonical URL when rendering the page." — `docs/search/docs/crawling-indexing/javascript/javascript-seo-basics.md`
- Do NOT use JS to overwrite the HTML canonical with a different value: "you shouldn't use JavaScript to change the canonical URL to something else than the URL you specified as the canonical URL in the original HTML." — `docs/search/docs/crawling-indexing/javascript/javascript-seo-basics.md`
- Dynamic rendering is deprecated / a workaround, not a solution: "Dynamic rendering was a workaround and not a long-term solution for problems with JavaScript-generated content in search engines." and "Dynamic rendering is a workaround and not a recommended solution, because it creates additional complexities and resource requirements." — `docs/search/docs/crawling-indexing/javascript/dynamic-rendering.md`
- What to use instead of dynamic rendering: "Instead, we recommend that you use server-side rendering, static rendering, or hydration as a solution." — `docs/search/docs/crawling-indexing/javascript/dynamic-rendering.md`
- Dynamic rendering that serves matching content is not cloaking, but divergent content is: "Using dynamic rendering to serve completely different content to users and crawlers can be considered cloaking." — `docs/search/docs/crawling-indexing/javascript/dynamic-rendering.md`
- Hash-fragment routing is dead: "The AJAX-crawling scheme has been deprecated since 2015, so you can't rely on URL fragments to work with Googlebot." — `docs/search/docs/crawling-indexing/javascript/fix-search-javascript.md`
- Client-side analytics under-reports Googlebot: "Client-side analytics may not provide a full or accurate representation of Googlebot and WRS activity on your site." — `docs/search/docs/crawling-indexing/javascript/fix-search-javascript.md`

## Auditable checks

1. [auto] Fetch the raw HTML (no JS execution) and record presence/values of `<title>`, `<meta name="description">`, `<link rel="canonical">`, `<meta name="robots">`, and any `application/ld+json` blocks.
2. [auto] Flag any page intended for indexing that ships `<meta name="robots" content="noindex">` in the raw initial HTML — rendering/JS may be skipped, so JS cannot later remove it (noindex+JS trap).
3. [auto] Confirm internal navigation uses real `<a href="/path">` links; flag `href="#/..."` hash-fragment routes as undiscoverable.
4. [auto] Parse robots.txt and flag `Disallow` rules covering the page's JS/CSS resource paths (blocked resources are not rendered).
5. [auto] Check JS/CSS asset filenames for content fingerprints/version hashes (e.g. `main.2bb85551.js`) to avoid stale cached resources.
6. [render] Render the page in a headless browser and diff the rendered `<head>` against raw HTML; confirm final `<title>`, meta description, and JSON-LD are present after JS execution.
7. [render] Confirm the primary/main content is present in the rendered DOM (app-shell pages where raw HTML lacks content must fill it in on render).
8. [render] Extract `<link rel="canonical">` from the rendered DOM: verify there is exactly one and that its value equals the raw-HTML canonical (no JS-mutated divergence to a different URL).
9. [render] Verify JS-injected structured data (JSON-LD) appears in the rendered DOM and matches visible content.
10. [render] Load without any scroll/click/keyboard interaction and confirm lazy-loaded media resolve to real `src` values on `<img>`/`<video>` in the rendered HTML.
11. [render] For infinite scroll, confirm each chunk exposes a persistent unique URL and that the displayed URL updates via the History API.
12. [render] Confirm web-component content (light DOM via `<slot>`) is visible in the flattened rendered HTML.
13. [render] Detect SPA soft-404s: request a known-missing route and confirm it returns a server 404 or renders a `noindex` robots tag rather than a bare 200.
14. [render] Confirm the page needs no WebSocket/WebRTC/persisted-state/user-permission to expose content (Googlebot has none of these).
15. [handoff] Run Google's URL Inspection Tool or Rich Results Test (URL input, not code paste) and review the rendered HTML/JS console output in Search Console.
16. [handoff] Confirm dynamic rendering is not the site's chosen strategy; if present, migrate to SSR / static rendering / hydration.

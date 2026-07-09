#!/usr/bin/env node
/**
 * google-seo audit engine — deterministic SEO auditor grounded in Google Search Central docs.
 *
 *   node audit.mjs <baseUrl> [options]
 *
 *   --json <file>        write findings as JSON
 *   --max-pages <n>      cap pages crawled (default 100)
 *   --noindex-ok a,b     paths where noindex is intentional
 *   --render             ALSO fetch each page with headless Chrome and diff raw vs rendered head.
 *                        This is how you catch client-rendered SEO: Google renders JS (with a queue
 *                        delay), most AI crawlers do not. Requires CHROME env or a system Chrome.
 *   --quiet              findings only
 *
 * Exit: 0 = no code-fixable findings (handoff items may still be printed) · 1 = auto-fix findings
 *        remain · 2 = crawl/setup error.
 *
 * Every check cites the Google doc that mandates it, so a finding can be argued from source.
 * ponytail: Node stdlib only (plus optional puppeteer-less CDP via Chrome's own protocol for
 * --render). No deps to install for the default (raw-HTTP) mode.
 */
import { writeFileSync } from 'node:fs';
import { argv, exit, env } from 'node:process';

// ---- args -------------------------------------------------------------------------------------
const args = argv.slice(2);
const base = args.find((a) => !a.startsWith('--'));
if (!base) { console.error('usage: node audit.mjs <baseUrl> [--json out.json] [--render] [--max-pages n]'); exit(2); }
const flag = (n, d = null) => { const i = args.indexOf('--' + n); return i === -1 ? d : (args[i + 1]?.startsWith('--') ? true : args[i + 1] ?? true); };
const has = (n) => args.includes('--' + n);
// `--max-pages` with no value makes flag() return true; Number(true) is 1, which would silently
// crawl a single page while reporting nothing amiss.
// `--max-pages` with no value makes flag() return the boolean true, and Number(true) === 1 --
// finite, so a NaN guard passes it through and we silently crawl a single page. Reject the type.
// Must be a POSITIVE INTEGER. `--max-pages 0` audited nothing and exited 0 -- a clean bill of health
// for zero work. `--max-pages -5` silently dropped the last five pages via slice(0,-5).
const num = (n, d) => {
  const raw = flag(n, d);
  if (typeof raw === 'boolean') return d;
  const v = Number(raw);
  if (!Number.isFinite(v) || v < 1) { if (raw !== d) console.error(`[audit] --${n} must be a positive integer; using ${d}`); return d; }
  return Math.floor(v);
};
const MAX_PAGES = num('max-pages', 100);
const NOINDEX_OK = String(flag('noindex-ok', '')).split(',').filter(Boolean);
const RENDER = has('render');
const QUIET = has('quiet');

const origin = new URL(base).origin;
const UA = 'Mozilla/5.0 (compatible; google-seo-audit/1.0; +https://github.com/ceoguy/google-seo)';

// ---- findings ---------------------------------------------------------------------------------
const findings = [];
/** @param sev critical|high|medium|low  @param cls auto-fix|render|handoff */
const add = (sev, area, cls, where, msg, doc) => findings.push({ severity: sev, area, class: cls, where, message: msg, doc });

const SEV_ORDER = { critical: 0, high: 1, medium: 2, low: 3 };
// Strip a trailing slash from the PATH only. Operating on the full href would eat the slash inside
// a query value (`?path=/a/b/`), collapsing two genuinely distinct URLs into one.
const norm = (u) => {
  try {
    const x = new URL(u, origin);
    const path = x.pathname === '/' ? '/' : x.pathname.replace(/\/$/, '');
    return x.origin + path + x.search;
  } catch { return u; }
};

async function get(url) {
  try {
    const r = await fetch(url, { headers: { 'User-Agent': UA, 'Accept-Language': 'en' }, redirect: 'follow' });
    return { status: r.status, body: await r.text(), headers: r.headers, finalUrl: r.url };
  } catch (e) { return { status: 0, body: '', headers: new Headers(), finalUrl: url, error: String(e.message || e) }; }
}

// ---- tiny HTML helpers (raw-HTML view = what a non-rendering crawler sees) ----------------------
// Comments are NOT markup. Strip them first or a doc-comment that mentions a tag (e.g. an
// explanatory `<!-- no <link rel="canonical"> here -->`) is scored as that tag. Cost me a false
// "2 canonical tags" on the very first run.
const decomment = (h) => h.replace(/<!--[\s\S]*?-->/g, '');
// <script>/<style> BODIES are not markup either. `var s = "<title>Fake</title>"` inside a script
// otherwise wins over the real <title> (tagText takes the first match) and invents duplicates.
// Keep JSON-LD: it is read separately, by type, and stripping it would blind the structured-data
// checks. Replace with a same-length-ish placeholder so offsets stay sane.
// Empty EVERY script body for markup scans, JSON-LD included: a `"text": "<img src=a.png>"` string
// inside a JSON-LD block is DATA, not three real images. jsonLdBlocks() reads the untouched HTML.
const descript = (h) => h.replace(/<script\b[^>]*>[\s\S]*?<\/script>/gi, '<script></script>')
  .replace(/<style\b[^>]*>[\s\S]*?<\/style>/gi, '<style></style>');
const clean = (h) => descript(decomment(h));
// Chrome hands back a DECODED DOM (`&#8217;` -> `’`), while a raw fetch keeps the entity. Compare
// like with like or every static page whose title contains an entity is falsely reported as
// "differs raw vs rendered -- prerender your head". WordPress emits &#8217; for apostrophes.
// U+10FFFF is the last valid code point; String.fromCodePoint throws RangeError beyond it, and a
// single malformed entity on one page would abort the whole audit (and write no JSON).
const cp = (n) => (Number.isInteger(n) && n >= 0 && n <= 0x10FFFF ? String.fromCodePoint(n) : '\uFFFD');
const decodeEnts = (s) => s
  .replace(/&#x([0-9a-f]+);/gi, (_, n) => cp(parseInt(n, 16)))
  .replace(/&#(\d+);/g, (_, n) => cp(Number(n)))
  .replace(/&quot;/g, '"').replace(/&apos;/g, "'")
  .replace(/&nbsp;/g, '\u00a0').replace(/&lt;/g, '<').replace(/&gt;/g, '>')
  .replace(/&amp;/g, '&');   // last: never resurrect an entity we just produced
const tagText = (h, t) => [...h.matchAll(new RegExp(`<${t}\\b[^>]*>([\\s\\S]*?)</${t}>`, 'gi'))].map((m) => decodeEnts(m[1].replace(/<[^>]+>/g, '')).trim());
// Delimit attribute values by a BACKREFERENCE to the opening quote. A `["']([^"']*)["']` class ends
// the capture at the first apostrophe, so content="it's great" captured "it" -- which then read as a
// missing description, or grouped every contraction-sharing page as a "duplicate".
const ATTR = (name) => `${name}=(["'])((?:(?!\\1).)*)\\1`;
// HTML5 allows unquoted attribute values for space-free content; without this fallback a valid
// `content=Something` reads as an empty description. The leading \s is load-bearing: without it,
// `<meta name="robots" data-note="content=noindex">` matched INSIDE the data-note value and
// reported a false CRITICAL noindex. An attribute always starts after whitespace.
const UNQ = (name) => `\\s${name}=([^\\s"'>]+)`;
// The KEY attribute may itself be unquoted (`<meta name=description content=X>`), so match the
// name with optional quotes and a trailing delimiter.
const KEY = (attr, key) => `${attr}=["']?${key}(?=["'\\s>])`;
const metaCRaw = (h, attr, key) => h.match(new RegExp(`<meta[^>]*${KEY(attr, key)}[^>]*${ATTR('content')}`, 'i'))?.[2]
  ?? h.match(new RegExp(`<meta[^>]*${ATTR('content')}[^>]*${KEY(attr, key)}`, 'i'))?.[2]
  ?? h.match(new RegExp(`<meta[^>]*${KEY(attr, key)}[^>]*${UNQ('content')}`, 'i'))?.[1]
  ?? h.match(new RegExp(`<meta[^>]*${UNQ('content')}[^>]*${KEY(attr, key)}`, 'i'))?.[1] ?? '';
const metaC = (h, attr, key) => decodeEnts(metaCRaw(h, attr, key));
const linkHref = (h, rel) => decodeEnts(h.match(new RegExp(`<link[^>]*rel=["']${rel}["'][^>]*${ATTR('href')}`, 'i'))?.[2]
  ?? h.match(new RegExp(`<link[^>]*${ATTR('href')}[^>]*rel=["']${rel}["']`, 'i'))?.[2] ?? '');
const allCanonicals = (h) => [...h.matchAll(/<link[^>]*rel=["']canonical["'][^>]*>/gi)].map((m) => m[0]);
const hreflangs = (h) => [...h.matchAll(/<link[^>]*rel=["']alternate["'][^>]*>/gi)]
  .map((m) => ({ lang: m[0].match(/hreflang=["']([^"']+)["']/i)?.[1], href: m[0].match(/href=["']([^"']+)["']/i)?.[1] }))
  .filter((x) => x.lang && x.href);
const jsonLdBlocks = (h) => [...h.matchAll(/<script[^>]*type=["']application\/ld\+json["'][^>]*>([\s\S]*?)<\/script>/gi)].map((m) => m[1]);

// ---- robots.txt -------------------------------------------------------------------------------
// "it is not a mechanism for keeping a web page out of Google" — robots/intro
const AI_BOTS = ['GPTBot', 'ClaudeBot', 'PerplexityBot', 'OAI-SearchBot', 'Google-Extended'];
// Consecutive `User-agent:` lines SHARE the rule block that follows them. Parse into
// agent -> rules[]; a lazy "until the next User-agent line" regex gives the first agent in a
// stacked group zero rules, so `User-agent: *\nUser-agent: Googlebot\nDisallow: /` reads as
// "nothing is blocked" when in fact everything is.
function robotsGroups(body) {
  const groups = new Map(); // lowercased agent -> array of rule lines
  let pending = [];
  let current = [];
  for (const raw of body.split(/\r?\n/)) {
    const line = raw.replace(/#.*$/, '').trim();
    if (!line) continue;
    const ua = line.match(/^User-agent:\s*(\S+)/i);
    if (ua) {
      if (current.length) { pending = []; current = []; }   // a rule block ended; start a new stack
      pending.push(ua[1].toLowerCase());
      if (!groups.has(ua[1].toLowerCase())) groups.set(ua[1].toLowerCase(), []);
      continue;
    }
    if (!pending.length) continue;                           // rule outside any group
    current.push(line);
    for (const a of pending) groups.get(a).push(line);
  }
  return groups;
}

async function auditRobots() {
  const { status, body } = await get(origin + '/robots.txt');
  if (status !== 200) { add('high', 'crawling', 'auto-fix', '/robots.txt', `robots.txt returns ${status}`, 'robots/intro'); return { disallows: [], sitemaps: [] }; }
  const groups = robotsGroups(body);
  const blocksAll = (agent) => (groups.get(agent.toLowerCase()) || []).some((l) => /^Disallow:\s*\/\s*$/i.test(l));
  if (blocksAll('*')) add('critical', 'crawling', 'auto-fix', '/robots.txt', 'robots.txt blocks all crawlers (User-agent: * / Disallow: /)', 'robots/intro');
  for (const b of AI_BOTS) { if (blocksAll(b)) add('medium', 'ai-search', 'handoff', '/robots.txt', `${b} is fully disallowed — that engine cannot cite this site`, 'robots/intro'); }
  if (Buffer.byteLength(body, 'utf8') > 500 * 1024) add('medium', 'crawling', 'auto-fix', '/robots.txt', 'robots.txt exceeds 500 KiB — "Google enforces a robots.txt file size limit of 500 kibibytes"', 'crawling/robots-txt/robots-txt-spec');
  const sitemaps = [...body.matchAll(/^\s*Sitemap:\s*(\S+)/gim)].map((m) => m[1]);
  if (!sitemaps.length) add('medium', 'sitemap', 'auto-fix', '/robots.txt', 'no Sitemap: directive in robots.txt', 'sitemaps/build-sitemap');
  const disallows = [...body.matchAll(/^\s*Disallow:\s*(\S+)/gim)].map((m) => m[1]).filter((p) => p && p !== '/');
  // "Google Search won't render JavaScript from blocked files or on blocked pages" — javascript-seo-basics
  for (const p of disallows) if (/^\/(assets|static|_next|js|css|dist|build)\b/i.test(p)) add('critical', 'javascript', 'auto-fix', '/robots.txt', `robots.txt disallows "${p}" — blocking render resources stops Google rendering the page`, 'javascript/javascript-seo-basics');
  return { disallows, sitemaps };
}

// ---- sitemap ----------------------------------------------------------------------------------
const W3C_DATE = /^\d{4}-\d{2}-\d{2}([T ]\d{2}:\d{2}(:\d{2})?(\.\d+)?(Z|[+-]\d{2}:\d{2})?)?$/;
const MAX_URLS = 50000, MAX_BYTES = 50 * 1024 * 1024;

// Checks that apply to ONE sitemap file, whether it is a standalone sitemap or an index child.
// Running these only on the index (as an earlier version did) means an oversized 60,000-URL child
// sails through -- and index-using sites are exactly the large sites that need auditing.
function auditOneSitemap(url, body, headers, { isIndex }) {
  const ctype = headers.get?.('content-type') || '';
  if (!/xml/i.test(ctype)) add('medium', 'sitemap', 'auto-fix', url, `Content-Type is "${ctype}" (expected XML)`, 'sitemaps/build-sitemap');
  // XML defaults to UTF-8, so an absent declaration is fine. Only a declared NON-UTF-8 encoding
  // violates "The sitemap file must be UTF-8 encoded."
  const declEnc = body.match(/<\?xml[^>]*encoding=["']([^"']+)["']/i)?.[1];
  if (declEnc && !/^utf-?8$/i.test(declEnc)) add('high', 'sitemap', 'auto-fix', url, `declares encoding="${declEnc}" — "The sitemap file must be UTF-8 encoded"`, 'sitemaps/build-sitemap');

  const bytes = Buffer.byteLength(body, 'utf8');
  if (bytes > MAX_BYTES) add('critical', 'sitemap', 'auto-fix', url, `${(bytes / 1048576).toFixed(1)}MB — "All formats limit a single sitemap to 50MB (uncompressed) or 50,000 URLs"`, 'sitemaps/build-sitemap');

  // hreflang may be delivered in the sitemap ("There are three ways ...: HTML, HTTP Headers,
  // Sitemap"). Harvest it so cross-page reciprocity and language-cluster logic see it.
  if (!isIndex) {
    for (const m of body.matchAll(/<url>([\s\S]*?)<\/url>/gi)) {
      const loc = m[1].match(/<loc>([^<]+)<\/loc>/i)?.[1]?.trim();
      if (!loc) continue;
      const alts = [...m[1].matchAll(/<xhtml:link[^>]*rel=["']alternate["'][^>]*>/gi)]
        .map((x) => ({ lang: x[0].match(/hreflang=["']([^"']+)["']/i)?.[1], href: x[0].match(/href=["']([^"']+)["']/i)?.[1] }))
        .filter((x) => x.lang && x.href);
      if (alts.length) sitemapAlts.set(loc, alts);
    }
  }

  const locs = [...body.matchAll(/<loc>([^<]+)<\/loc>/gi)].map((m) => m[1].trim());
  if (locs.length > MAX_URLS) {
    add('critical', 'sitemap', 'auto-fix', url,
      `${locs.length} ${isIndex ? 'child sitemaps' : 'URLs'} in one file (limit 50,000)`,
      isIndex ? 'sitemaps/large-sitemaps' : 'sitemaps/build-sitemap');
  }
  if (/<priority>/i.test(body)) add('low', 'sitemap', 'auto-fix', url, '<priority> present — "Google ignores <priority> and <changefreq> values"', 'sitemaps/build-sitemap');
  if (/<changefreq>/i.test(body)) add('low', 'sitemap', 'auto-fix', url, '<changefreq> present — Google ignores it', 'sitemaps/build-sitemap');

  const lastmods = [...body.matchAll(/<lastmod>([^<]+)<\/lastmod>/gi)].map((m) => m[1].trim());
  const bad = lastmods.filter((d) => !W3C_DATE.test(d));
  if (bad.length) add('medium', 'sitemap', 'auto-fix', url, `${bad.length} <lastmod> not W3C Datetime (e.g. "${bad[0]}")`, 'sitemaps/build-sitemap');
  if (!isIndex && !lastmods.length && locs.length) add('low', 'sitemap', 'auto-fix', url, 'no <lastmod> anywhere — add it where you can compute it accurately', 'sitemaps/build-sitemap');
  return locs;
}

function validateLocs(locs, where) {
  for (const l of locs) {
    if (!/^https?:\/\//i.test(l)) { add('high', 'sitemap', 'auto-fix', where, `<loc> not absolute: ${l}`, 'sitemaps/build-sitemap'); continue; }
    if (/&(?!amp;|lt;|gt;|quot;|apos;|#)/.test(l)) add('high', 'sitemap', 'auto-fix', where, `<loc> has unescaped & : ${l}`, 'sitemaps/build-sitemap');
    if (l.includes('#')) add('medium', 'sitemap', 'auto-fix', where, `<loc> contains a fragment: ${l}`, 'consolidate-duplicate-urls');
    try { if (new URL(l).origin !== origin) add('medium', 'sitemap', 'handoff', where, `<loc> is cross-origin (${l}) — valid only if submitted in GSC or referenced from that host's robots.txt`, 'sitemaps/build-sitemap'); }
    catch { add('high', 'sitemap', 'auto-fix', where, `<loc> is not a valid URL: ${l}`, 'sitemaps/build-sitemap'); }
  }
}

// Audit ONE sitemap URL (standalone or index) and return the PAGE urls it yields.
async function auditSitemapTree(url) {
  const { status, body, headers } = await get(url);
  if (status !== 200) { add('high', 'sitemap', 'auto-fix', url, `sitemap not 200 (got ${status})`, 'sitemaps/build-sitemap'); return []; }

  const isIndex = /<sitemapindex/i.test(body);
  const top = auditOneSitemap(url, body, headers, { isIndex });

  if (!isIndex) {
    validateLocs(top, url);
    const d = top.filter((l, i) => top.indexOf(l) !== i);
    if (d.length) add('low', 'sitemap', 'auto-fix', url, `${new Set(d).size} duplicate <loc> entries`, 'sitemaps/build-sitemap');
    return [...new Set(top)];
  }

  // Index: every child gets the full per-file treatment. No silent truncation.
  const all = [];
  for (const child of new Set(top)) {
    const r = await get(child);
    if (r.status !== 200) { add('high', 'sitemap', 'auto-fix', child, `child sitemap not 200 (got ${r.status})`, 'sitemaps/large-sitemaps'); continue; }
    const childIsIndex = /<sitemapindex/i.test(r.body);
    const locs = auditOneSitemap(child, r.body, r.headers, { isIndex: childIsIndex });
    if (childIsIndex) {
      // An index whose child is an index. Do NOT treat the grandchild sitemap URLs as pages --
      // they'd be fetched and scored as HTML ("missing <title>" on an .xml file), while the real
      // pages never get audited at all.
      add('high', 'sitemap', 'auto-fix', child, 'a sitemap index lists another sitemap index — nested indexes are not supported; point the index at urlset sitemaps', 'sitemaps/large-sitemaps');
      continue;
    }
    validateLocs(locs, child);
    all.push(...locs);
  }
  const dupes = all.filter((l, i) => all.indexOf(l) !== i);
  if (dupes.length) add('low', 'sitemap', 'auto-fix', url, `${new Set(dupes).size} duplicate <loc> entries across children`, 'sitemaps/build-sitemap');
  return [...new Set(all)];
}

// robots.txt may list SEVERAL sibling Sitemap: directives (pages / news / images). Auditing only
// the first silently drops every page in the rest.
async function auditSitemap(smUrls) {
  // Dedup: two identical `Sitemap:` lines would otherwise fetch the same file twice and emit every
  // sitemap-level finding twice.
  const list = [...new Set(smUrls.length ? smUrls : [origin + '/sitemap.xml'])];
  const all = [];
  for (const sm of list) all.push(...await auditSitemapTree(sm));
  return [...new Set(all)];
}

// ---- per page ---------------------------------------------------------------------------------
const seenTitle = new Map(), seenDesc = new Map(), canonicalTargets = new Map();
const hreflangGraph = new Map();   // url -> Set(alternate urls it declares)
const sitemapAlts = new Map();     // url -> [{lang, href}] declared via <xhtml:link> in the sitemap

function auditHtml(rawHtml, url, view /* 'raw' | 'rendered' */, headers) {
  const html = clean(rawHtml);          // markup scans: every script body emptied
  const withScripts = decomment(rawHtml); // structured data: script bodies intact
  const path = new URL(url).pathname + new URL(url).search;
  const tag = view === 'rendered' ? '[rendered] ' : '';
  const out = {};

  const title = tagText(html, 'title')[0] || '';
  out.title = title;
  if (!title) add('critical', 'on-page', view === 'raw' ? 'auto-fix' : 'render', path, `${tag}missing <title>`, 'appearance/title-link');
  // Duplicate title/description are collected, not reported per-page: N pages sharing one title is
  // ONE defect (usually an unrendered SPA shell), and emitting it N times buries everything else.
  else if (view === 'raw') seenTitle.set(url, title);

  const desc = metaC(html, 'name', 'description');
  out.desc = desc;
  if (!desc) add('high', 'on-page', view === 'raw' ? 'auto-fix' : 'render', path, `${tag}missing meta description`, 'appearance/snippet');
  else if (view === 'raw') seenDesc.set(url, desc);

  // canonical — "A strong signal that the specified URL should become canonical"
  const canons = allCanonicals(html);
  const canonical = linkHref(html, 'canonical');
  out.canonical = canonical;
  if (canons.length > 1) add('high', 'canonical', 'auto-fix', path, `${tag}${canons.length} rel=canonical tags (must be at most one)`, 'consolidate-duplicate-urls');
  if (canonical) {
    if (!/^https?:\/\//i.test(canonical)) add('medium', 'canonical', 'auto-fix', path, `${tag}canonical is relative ("${canonical}") — "Use absolute paths rather than relative paths"`, 'consolidate-duplicate-urls');
    if (canonical.includes('#')) add('high', 'canonical', 'auto-fix', path, `${tag}canonical contains a fragment — "Google generally doesn't support URL fragments"`, 'consolidate-duplicate-urls');
    if (view === 'raw') {
      // linkHref() decodes entities, so the sitemap <loc> (which is entity-ESCAPED per spec) must be
      // decoded too. Comparing decoded-canonical against raw-loc reported `?b=1&amp;c=2` as pointing
      // somewhere else than `?b=1&c=2` -- a false finding on a perfectly correct site.
      const durl = decodeEnts(url);
      const t = norm(canonical);
      canonicalTargets.set(t, [...(canonicalTargets.get(t) || []), path]);
      if (t !== norm(durl)) add('high', 'canonical', 'auto-fix', path, `canonical points at a different URL: ${canonical}`, 'consolidate-duplicate-urls');
      // BYTE-match, not normalized match. norm() deliberately collapses trailing slashes, so a
      // sitemap listing /foo/ while the page canonicalizes to /foo would otherwise slip through --
      // and "don't specify one URL in a sitemap, but a different URL ... using rel=canonical".
      else if (canonical !== durl) add('low', 'sitemap', 'auto-fix', path, `sitemap <loc> "${url}" and canonical "${canonical}" differ only in form (slash/scheme/case). List the canonical verbatim.`, 'sitemaps/build-sitemap');
    }
  } else if (view === 'raw') {
    // Not automatically a defect: "If you can't set the canonical URL in the HTML source code,
    // leave it out and only set it with JavaScript." Flag as informational only if rendered has one.
    out.noRawCanonical = true;
  }

  // robots meta / X-Robots-Tag
  // Combine, don't short-circuit: `<meta name="robots" content="all">` alongside
  // `<meta name="googlebot" content="noindex">` means the page IS noindexed for Google.
  const robots = [metaC(html, 'name', 'robots'), metaC(html, 'name', 'googlebot')].filter(Boolean).join(' ');
  const xrobots = headers?.get?.('x-robots-tag') || '';
  // "none" is equivalent to "noindex, nofollow" — a page carrying it is fully blocked.
  // Raw view only: the rendered pass would re-report the identical tag with a [rendered] prefix.
  // A noindex that ONLY appears after JS is caught by the raw-vs-rendered delta instead.
  if (view === 'raw' && /\b(noindex|none)\b/i.test(robots + ' ' + xrobots) && !NOINDEX_OK.includes(new URL(url).pathname)) {
    add('critical', 'indexing', 'handoff', path, `${tag}page is noindex ("${robots || xrobots}") — a human must confirm this is intentional`, 'crawling-indexing/block-indexing');
  }

  // HTML head first; otherwise the sitemap's annotations for this exact URL.
  out.hreflang = hreflangs(html);
  out.hreflangFromSitemap = false;
  if (!out.hreflang.length && sitemapAlts.has(url)) { out.hreflang = sitemapAlts.get(url); out.hreflangFromSitemap = true; }
  if (out.hreflang.length) {
    const via = out.hreflangFromSitemap ? ' (delivered via sitemap)' : '';
    const selfListed = out.hreflang.some((h) => norm(h.href) === norm(url));
    if (!selfListed) add('high', 'international', view === 'raw' ? 'auto-fix' : 'render', path, `${tag}hreflang set${via} does not list itself — "Each language version must list itself as well as all other language versions"`, 'specialty/international/localized-versions');
    if (!out.hreflang.some((h) => h.lang.toLowerCase() === 'x-default')) add('low', 'international', 'auto-fix', path, `${tag}no x-default hreflang${via}`, 'specialty/international/localized-versions');
    // reciprocity is a CROSS-page property; record the graph and check it after the crawl
    if (view === 'raw') hreflangGraph.set(norm(url), new Set(out.hreflang.filter((h) => h.lang.toLowerCase() !== 'x-default').map((h) => norm(h.href))));
  }

  // structured data. Rendered view only re-checks when raw carried NO JSON-LD at all, otherwise
  // every block is reported twice.
  const skipSd = view === 'rendered' && (rawViews.get(url)?.jsonLdBlockCount ?? 0) > 0;
  for (const blk of (skipSd ? [] : jsonLdBlocks(withScripts))) {
    try {
      const data = JSON.parse(blk);
      const nodes = Array.isArray(data) ? data : data['@graph'] || [data];
      for (const n of nodes) {
        if (n?.aggregateRating) {
          const ar = n.aggregateRating;
          const cnt = Number(ar.reviewCount ?? ar.ratingCount ?? 0);
          if (!cnt) add('high', 'structured-data', 'auto-fix', path, `${tag}aggregateRating without reviewCount/ratingCount > 0`, 'structured-data/review-snippet');
          add('medium', 'structured-data', 'handoff', path, `${tag}aggregateRating present on ${n['@type']} — verify the ratings are real and visible on the page (never fabricate)`, 'structured-data/sd-policies');
        }
      }
    } catch { add('high', 'structured-data', view === 'raw' ? 'auto-fix' : 'render', path, `${tag}JSON-LD block does not parse`, 'structured-data/intro-structured-data'); }
  }
  out.jsonLdBlockCount = jsonLdBlocks(withScripts).length;   // an INVALID block still counts as present
  out.jsonLdTypes = jsonLdBlocks(withScripts).flatMap((b) => { try { const d = JSON.parse(b); return (Array.isArray(d) ? d : d['@graph'] || [d]).map((x) => x['@type']); } catch { return []; } });

  if (view === 'raw') {
    if (!/<meta[^>]*name=["']viewport["']/i.test(html)) add('medium', 'page-experience', 'auto-fix', path, 'missing viewport meta — "Presence of this tag indicates to Google that the page is mobile friendly"', 'crawling-indexing/special-tags');
    if (!/<html[^>]*\blang=/i.test(html)) add('low', 'international', 'auto-fix', path, 'missing <html lang>', 'specialty/international/localized-versions');
    const h1 = tagText(html, 'h1');
    // Only RECORD here. Whether this becomes a finding depends on whether the page is actually
    // rendered later -- with --render on, only the first N pages are; the rest still need the
    // raw-only handoff, or the signal silently disappears for them (and for everyone if Chrome dies).
    // No "exactly one <h1>" rule exists in Google's docs -- the corpus only says to "provide
    // headings to help users navigate your pages". So: no multi-h1 finding, and a MISSING heading is
    // reported as information for a human, never as a defect.
    if (!h1.length) out.noRawH1 = true;
    const imgs = [...html.matchAll(/<img\b[^>]*>/gi)].map((m) => m[0]);
    const noAlt = imgs.filter((t) => !/\balt=/i.test(t)).length;
    if (noAlt) add('low', 'on-page', 'auto-fix', path, `${noAlt}/${imgs.length} <img> without alt`, 'appearance/google-images');

    // "Link: <...>; rel=canonical" — the only canonical method for PDFs/non-HTML, and a silent
    // conflict source when it disagrees with the HTML tag.
    const linkHdr = headers?.get?.('link') || '';
    const hdrCanon = linkHdr.match(/<([^>]+)>\s*;\s*rel=["']?canonical/i)?.[1];
    if (hdrCanon && canonical && norm(hdrCanon) !== norm(canonical)) {
      add('high', 'canonical', 'auto-fix', path, `Link: rel=canonical header (${hdrCanon}) disagrees with the HTML canonical (${canonical})`, 'consolidate-duplicate-urls');
    }

    // Crawlable links: "use <a> tags with href attributes". onclick/javascript: nav is not crawled.
    const fakeNav = [...html.matchAll(/<a\b[^>]*>/gi)].map((m) => m[0])
      // `javascript:` with ANY payload (void(0), doThing()) is non-crawlable; a bare `#` is too,
      // but `#section` is a legitimate in-page anchor and must not count.
      .filter((a) => !/\bhref\s*=/i.test(a) || /href\s*=\s*["']\s*javascript:/i.test(a) || /href\s*=\s*["']\s*#\s*["']/i.test(a)).length;
    if (fakeNav >= 3) add('medium', 'crawling', 'auto-fix', path, `${fakeNav} <a> elements without a crawlable href (missing href, or javascript:/# only)`, 'crawling-indexing/links-crawlable');

    // Robots directives that gate previews/AI surfaces and that most audits never look at.
    const rb = (metaC(html, 'name', 'robots') + ' ' + (headers?.get?.('x-robots-tag') || '')).toLowerCase();
    if (/\bnoimageindex\b/.test(rb)) add('medium', 'indexing', 'handoff', path, 'noimageindex — images on this page cannot be indexed', 'crawling-indexing/robots-meta-tag');
    if (/\bunavailable_after\b/.test(rb)) add('low', 'indexing', 'handoff', path, 'unavailable_after set — page will drop out of the index on that date', 'crawling-indexing/robots-meta-tag');
    if (/\bnosnippet\b/.test(rb) && /\bmax-snippet\b/.test(rb)) add('low', 'indexing', 'auto-fix', path, 'both nosnippet and max-snippet present — the most restrictive wins; drop one', 'crawling-indexing/robots-meta-tag');
    if (/<meta[^>]*name=["']keywords["']/i.test(html)) add('low', 'on-page', 'auto-fix', path, 'meta keywords present — Google does not use it', 'crawling-indexing/special-tags');

    // "Google no longer uses [rel=next/prev]" for pagination.
    if (/<link[^>]*rel=["'](next|prev)["']/i.test(html)) add('low', 'crawling', 'auto-fix', path, 'rel=next/prev present — Google no longer uses these for pagination', 'specialty/ecommerce/pagination-and-incremental-page-loading');

    // "Don't use the first page of a paginated sequence as the canonical page. Instead, give each
    // page its own canonical URL." Only assert when this URL IS a paginated page.
    // Only `page`. `?p=456` is WordPress's post-ID permalink, not a paginated sequence, and it
    // canonicalizes to the pretty URL by design — treating `p` as pagination flags that as a bug.
    const u = new URL(url);
    const pageParam = [...u.searchParams.keys()].find((k) => /^page$/i.test(k));
    if (pageParam && Number(u.searchParams.get(pageParam)) > 1 && canonical) {
      // A malformed canonical (href="http://") throws here. It is already reported as a bad
      // canonical elsewhere; do not let it abort the page and strand half-written global state.
      try {
        const c = new URL(canonical, origin);
        if (!c.searchParams.has(pageParam)) add('high', 'canonical', 'auto-fix', path, `paginated page canonicalizes to page 1 (${canonical}) — "give each page its own canonical URL"`, 'specialty/ecommerce/pagination-and-incremental-page-loading');
      } catch { add('medium', 'canonical', 'auto-fix', path, `canonical is not a valid URL: "${canonical}"`, 'consolidate-duplicate-urls'); }
    }

    // AMP pairing: the canonical page must point at its AMP page and vice-versa.
    out.amphtml = linkHref(html, 'amphtml');
  }
  return out;
}

// ---- rendered view (headless Chrome via CDP, no npm deps) --------------------------------------
async function renderedHtml(urls) {
  const { spawn } = await import('node:child_process');
  const { existsSync } = await import('node:fs');
  const chrome = env.CHROME || ['/Applications/Google Chrome.app/Contents/MacOS/Google Chrome', '/usr/bin/google-chrome', '/usr/bin/chromium'].find((p) => existsSync(p));
  if (!chrome) { add('medium', 'javascript', 'handoff', '-', '--render requested but no Chrome found (set CHROME=/path)', 'javascript/javascript-seo-basics'); return new Map(); }
  const port = 9222 + (process.pid % 500);
  const proc = spawn(chrome, ['--headless=new', `--remote-debugging-port=${port}`, '--no-sandbox', '--disable-gpu', 'about:blank'], { stdio: 'ignore' });
  const out = new Map();
  try {
    let ver = null;
    for (let i = 0; i < 40 && !ver; i++) { await new Promise((r) => setTimeout(r, 250)); try { ver = await (await fetch(`http://127.0.0.1:${port}/json/version`)).json(); } catch { /* not up yet */ } }
    if (!ver) throw new Error('Chrome DevTools endpoint never came up');
    for (const u of urls) {
      const tab = await (await fetch(`http://127.0.0.1:${port}/json/new?${encodeURIComponent(u)}`, { method: 'PUT' })).json();
      const html = await cdpHtml(tab.webSocketDebuggerUrl);
      out.set(u, html);
      await fetch(`http://127.0.0.1:${port}/json/close/${tab.id}`);
    }
  } catch (e) { add('medium', 'javascript', 'handoff', '-', `--render failed: ${e.message}`, 'javascript/javascript-seo-basics'); }
  finally { proc.kill(); }
  return out;
}
async function cdpHtml(wsUrl) {
  const WebSocket = globalThis.WebSocket; // Node >= 22
  if (!WebSocket) throw new Error('global WebSocket missing — needs Node >= 22');
  return new Promise((resolve, reject) => {
    const ws = new WebSocket(wsUrl);
    let id = 0; const want = new Map();
    const send = (method, params = {}) => new Promise((res) => { const i = ++id; want.set(i, res); ws.send(JSON.stringify({ id: i, method, params })); });
    const timer = setTimeout(() => { try { ws.close(); } catch {} reject(new Error('render timeout')); }, 25000);
    ws.onmessage = (ev) => { const m = JSON.parse(ev.data); if (m.id && want.has(m.id)) want.get(m.id)(m.result); };
    ws.onerror = () => { clearTimeout(timer); reject(new Error('ws error')); };
    ws.onopen = async () => {
      // give the SPA a beat to hydrate and inject head tags
      await new Promise((r) => setTimeout(r, 3500));
      const r = await send('Runtime.evaluate', { expression: 'document.documentElement.outerHTML', returnByValue: true });
      clearTimeout(timer); try { ws.close(); } catch {}
      resolve(r?.result?.value || '');
    };
  });
}

// ---- site-level probes --------------------------------------------------------------------------
const GHOST = origin + '/__google-seo-audit-probe-404__';
let ghostIs200 = false;

async function siteProbes() {
  if (new URL(base).protocol !== 'https:') add('high', 'page-experience', 'auto-fix', origin, 'site is not served over HTTPS', 'appearance/page-experience');

  // Soft 404: a URL that cannot exist must not answer 200.
  const r = await get(GHOST);
  ghostIs200 = r.status === 200;
  if (!ghostIs200) return;
  if (/\bnoindex\b/i.test(metaC(clean(r.body), 'name', 'robots'))) return; // already handled in source

  // A client-routed SPA usually CANNOT return 404 -- Google's sanctioned remedy is a JS-injected
  // noindex, which raw HTML can't show. Don't call that broken; say what still needs proving.
  if (RENDER) return;  // the render pass below decides
  add('medium', 'crawling', 'handoff', GHOST,
    'a nonexistent URL returns HTTP 200 (soft 404). If this is a client-routed SPA, confirm the error page adds noindex via JS — "Add a <meta name=\'robots\' content=\'noindex\'> to error pages using JavaScript." Re-run with --render to check automatically.',
    'crawling-indexing/javascript/javascript-seo-basics');
}

// ---- main -------------------------------------------------------------------------------------
await siteProbes();
const { sitemaps } = await auditRobots();
let urls = await auditSitemap(sitemaps);
if (!urls.length) urls = [origin + '/'];
const sameOrigin = urls.filter((u) => { try { return new URL(u).origin === origin; } catch { return false; } });
const pages = sameOrigin.slice(0, MAX_PAGES);
if (sameOrigin.length > MAX_PAGES) console.error(`[audit] NOTE: capping at ${MAX_PAGES} of ${sameOrigin.length} sitemap URLs (--max-pages to raise). Coverage is partial.`);

const rawViews = new Map();
let renderedUrls = new Set();   // pages a headless browser actually returned HTML for
for (const u of pages) {
  const { status, body, headers, finalUrl } = await get(u);
  const path = new URL(u).pathname;
  if (status !== 200) { add('critical', 'indexing', 'auto-fix', path, `sitemap URL returns ${status}`, 'sitemaps/build-sitemap'); continue; }
  if (norm(finalUrl) !== norm(u)) add('medium', 'indexing', 'auto-fix', path, `sitemap URL redirects to ${finalUrl} — list the final URL`, 'crawling-indexing/301-redirects');
  // One malformed page must never abort the crawl. Report it and keep going -- a crash exits 1,
  // which is indistinguishable from "findings remain", so CI would read it as an ordinary red.
  try { rawViews.set(u, auditHtml(body, u, 'raw', headers)); }
  catch (e) { add('medium', 'crawling', 'handoff', path, `could not parse this page (${e.message}); it was skipped`, 'crawling-indexing/troubleshoot-crawling-errors'); }
}

// cross-page: many pages sharing one canonical target == the homepage-canonical trap
for (const [target, srcs] of canonicalTargets) {
  // `target` came from linkHref (entities decoded); `p` is the raw sitemap path, where XML mandates
  // `&amp;`. Compare decoded-to-decoded or a self-canonical hub counts as its own victim -- a false
  // CRITICAL on any URL with two query params.
  const others = srcs.filter((p) => norm(decodeEnts(origin + p)) !== target);
  if (others.length >= 3) add('critical', 'canonical', 'auto-fix', target, `${others.length} distinct pages declare canonical -> ${target}. rel=canonical is "A strong signal"; this de-indexes them into one page.`, 'consolidate-duplicate-urls');
}

// AMP pairing: "Google Search requires that an AMP page links to a canonical page." Fetch each
// declared AMP page and confirm its rel=canonical points back. Only runs when AMP is in use.
for (const [u, v] of rawViews) {
  if (!v.amphtml) continue;
  // Resolve against the PAGE url, not the origin: href="amp" on /blog/post means /blog/amp.
  const amp = new URL(v.amphtml, u).href;
  const r = await get(amp);
  const p = new URL(u).pathname;
  if (r.status !== 200) { add('high', 'amp', 'auto-fix', p, `rel=amphtml points at ${amp}, which returns ${r.status}`, 'crawling-indexing/amp/validate-amp'); continue; }
  const back = linkHref(clean(r.body), 'canonical');
  if (!back) add('high', 'amp', 'auto-fix', amp, 'AMP page has no rel=canonical back to the HTML page', 'crawling-indexing/amp/enhance-amp');
  else if (norm(back) !== norm(u)) add('high', 'amp', 'auto-fix', amp, `AMP page canonicalizes to ${back}, not to its HTML page ${u}`, 'crawling-indexing/amp/validate-amp');
}

// cross-page: hreflang reciprocity. "If two pages don't both point to each other, the tags will be
// ignored." Only assert on pages we actually fetched — a missing return link from an unfetched page
// is unknown, not broken.
for (const [u, alts] of hreflangGraph) {
  for (const alt of alts) {
    if (alt === u || !hreflangGraph.has(alt)) continue;
    if (!hreflangGraph.get(alt).has(u)) {
      add('high', 'international', 'auto-fix', new URL(u).pathname + new URL(u).search,
        `hreflang is not reciprocal: this page points to ${alt}, which does not point back. "If two pages don't both point to each other, the tags will be ignored."`,
        'specialty/international/localized-versions');
    }
  }
}

// cross-page: duplicate <title>/<description> reported once per shared value, listing victims.
// Two URLs that declare each other as hreflang alternates are ONE page in two languages. Their raw
// HTML legitimately matches when a single static document answers every language variant; the real
// defect there is "title differs raw vs rendered", already reported. Counting them as duplicate
// titles buries the actual finding under one entry per property.
const areAlternates = (a, b) => hreflangGraph.get(norm(a))?.has(norm(b)) || hreflangGraph.get(norm(b))?.has(norm(a));
const shortPath = (u) => { try { const x = new URL(u); return x.pathname + x.search; } catch { return u; } };

// Count CONNECTED COMPONENTS of the alternate relation, not a greedy first-fit over
// representatives. With hub-and-spoke hreflang (A~B, B~C, A!~C) greedy first-fit reports a
// duplicate for crawl order [A,B,C] and stays silent for [B,A,C] -- same site, same graph.
// Returns ONE representative per connected component. `areAlternates` is not transitive, so a
// greedy "not directly adjacent to any rep" loop splits an A~B~C chain into two reps while the
// component count is one -- the message then claims more distinct pages than the gate found.
function components(urls) {
  const seen = new Set();
  const reps = [];
  for (const start of urls) {
    if (seen.has(start)) continue;
    reps.push(start);
    const queue = [start];
    seen.add(start);
    while (queue.length) {
      const cur = queue.pop();
      for (const other of urls) if (!seen.has(other) && areAlternates(cur, other)) { seen.add(other); queue.push(other); }
    }
  }
  return reps;
}

for (const [label, map, sev, doc] of [['<title>', seenTitle, 'high', 'appearance/title-link'], ['meta description', seenDesc, 'medium', 'appearance/snippet']]) {
  const byValue = new Map();
  for (const [u, v] of map) byValue.set(v, [...(byValue.get(v) || []), u]);
  for (const [v, urls] of byValue) {
    if (urls.length < 2) continue;
    const reps = components(urls);
    if (reps.length < 2) continue;   // one page, N languages — not a duplicate
    const paths = reps.map(shortPath);
    add(sev, 'on-page', 'auto-fix', paths[0], `${paths.length} distinct pages share one ${label} ("${v.slice(0, 50)}…") — e.g. ${paths.slice(0, 4).join(', ')}${paths.length > 4 ? ` +${paths.length - 4} more` : ''}. If these are client-rendered, the raw HTML is an unrendered shell.`, doc);
  }
}

// raw-vs-rendered delta: the AI-crawler blind spot
if (RENDER) {
  const RENDER_CAP = num('max-render', 25);
  const batch = pages.slice(0, Math.min(pages.length, RENDER_CAP));
  if (pages.length > batch.length) console.error(`[audit] NOTE: rendering only ${batch.length} of ${pages.length} pages (--max-render to raise). The rest are audited raw-only.`);
  if (ghostIs200) batch.push(GHOST); // settle the soft-404 question in the same Chrome session
  const rendered = await renderedHtml(batch);

  if (ghostIs200) {
    const gh = rendered.get(GHOST);
    const ok = gh && /\bnoindex\b/i.test(metaC(clean(gh), 'name', 'robots'));
    if (!ok) add('high', 'crawling', 'auto-fix', GHOST, 'a nonexistent URL returns HTTP 200 and the rendered page carries no noindex — a soft 404 that Google can index', 'crawling-indexing/javascript/javascript-seo-basics');
    rendered.delete(GHOST); // not a real page; keep it out of the head-delta comparison AND the count
  }
  renderedUrls = new Set([...rendered.keys()].filter((k) => rendered.get(k)));

  for (const [u, html] of rendered) {
    if (!html) continue;
    let rv;
    try { rv = auditHtml(html, u, 'rendered'); }
    catch (e) { add('medium', 'crawling', 'handoff', new URL(u).pathname, `could not parse the rendered DOM (${e.message}); skipped`, 'crawling-indexing/troubleshoot-crawling-errors'); continue; }
    const raw = rawViews.get(u) || {};
    const path = new URL(u).pathname + new URL(u).search; // ?lang= variants are distinct URLs
    if (raw.title && rv.title && raw.title !== rv.title) add('high', 'javascript', 'auto-fix', path, `<title> differs raw vs rendered — non-rendering crawlers (most AI engines) see "${raw.title.slice(0, 50)}", Google-after-render sees "${rv.title.slice(0, 50)}". Prerender or SSR the head.`, 'javascript/dynamic-rendering');
    if (raw.noRawCanonical && rv.canonical) {
      // If this URL's hreflang alternates differ from it ONLY by query string, then one static
      // document is serving every language variant and a baked-in canonical would necessarily be
      // wrong for three of the four. Don't demand an impossible fix — name the structural cause.
      // EVERY non-self alternate must be a query-variant of this same path. If even one alternate
      // lives at its own path (/fr/x), a static per-path canonical IS possible and should be baked.
      const others = (raw.hreflang || []).filter((h) => h.lang.toLowerCase() !== 'x-default' && norm(new URL(h.href, u).href) !== norm(u));
      const queryOnlyAlts = others.length > 0 && others.every((h) => {
        try { const a = new URL(h.href, u); const b = new URL(u); return a.pathname === b.pathname && a.search !== b.search; } catch { return false; }
      });
      if (queryOnlyAlts) add('medium', 'international', 'handoff', path, `canonical can only be set by JS here: one document answers several ?param language URLs, so no single baked canonical is correct for all of them. Google marks URL-parameter locales "Not recommended" — move to /xx/ subdirectories (or ccTLD/subdomain) and the canonical can be static.`, 'specialty/international/managing-multi-regional-sites');
      else add('medium', 'canonical', 'auto-fix', path, `canonical exists only after JS runs. Google honors it at render time but "we don't recommend using JavaScript for this" — bake it into the HTML source.`, 'javascript/javascript-seo-basics');
    }
    if (!raw.jsonLdBlockCount && rv.jsonLdTypes?.length) add('high', 'structured-data', 'auto-fix', path, `structured data (${rv.jsonLdTypes.join(', ')}) exists only after JS runs — AI crawlers and social scrapers never see it`, 'structured-data/generate-structured-data-with-javascript');
    if (!raw.hreflang?.length && rv.hreflang?.length) add('high', 'international', 'auto-fix', path, `hreflang exists only after JS runs, and the sitemap does not carry it either. Google sanctions only HTML head / HTTP header / sitemap delivery.`, 'specialty/international/localized-versions');
    if (raw.noRawH1) {
      if (tagText(clean(html), 'h1').length) add('medium', 'on-page', 'auto-fix', path, '<h1> only exists after JS runs', 'javascript/javascript-seo-basics');
      else add('low', 'on-page', 'handoff', path, 'no <h1> anywhere, rendered or raw. Google mandates no h1 count; it asks you to "provide headings to help users navigate your pages".', 'fundamentals/seo-starter-guide');
    }
  }
}

// Pages we never rendered (raw-only run, over the render cap, or Chrome unavailable) still owe an
// h1 verdict. Without this the signal silently vanishes for them.
for (const [u, v] of rawViews) {
  if (!v.noRawH1 || renderedUrls.has(u)) continue;
  const p = new URL(u).pathname + new URL(u).search;
  add('low', 'on-page', 'handoff', p, 'no <h1> in the raw HTML, and this page was not rendered. Google mandates no h1 count — it asks you to "provide headings to help users navigate your pages". If the page is client-rendered the heading may be added by JS; re-run with --render (or raise --max-render) to tell the difference.', 'fundamentals/seo-starter-guide');
}

// ---- report -----------------------------------------------------------------------------------
findings.sort((a, b) => SEV_ORDER[a.severity] - SEV_ORDER[b.severity] || a.area.localeCompare(b.area));
const autoFix = findings.filter((f) => f.class === 'auto-fix');
const handoff = findings.filter((f) => f.class !== 'auto-fix');

// --quiet suppresses the HEADER, not the findings. A "quiet" run that prints nothing is
// indistinguishable from a clean one.
if (!QUIET) {
  console.log(`\n# SEO audit — ${origin}`);
  console.log(`pages audited: ${pages.length}${RENDER ? ` (raw; ${renderedUrls.size} also rendered)` : ' (raw HTML only; add --render for the JS delta)'}`);
  console.log(`findings: ${findings.length}  |  auto-fix: ${autoFix.length}  |  handoff: ${handoff.length}\n`);
}
for (const grp of [['AUTO-FIX (code changes)', autoFix], ['HANDOFF (human / GSC / content)', handoff]]) {
  if (!grp[1].length) continue;
  if (!QUIET) console.log(`## ${grp[0]}`);
  for (const f of grp[1]) console.log(`- [${f.severity}] (${f.area}) ${f.where} — ${f.message}  ‹${f.doc}›`);
  if (!QUIET) console.log('');
}
if (!QUIET) {
  if (!findings.length) console.log('CLEAN — no findings.\n');
  else if (!autoFix.length) console.log(`No code-fixable defects. ${handoff.length} item(s) need a human — exiting 0.\n`);
}
if (flag('json')) writeFileSync(String(flag('json')), JSON.stringify({ origin, pages: pages.length, rendered: RENDER, findings }, null, 2));
// 1 only when a CODE change can close something. Handoff findings (a human must verify a rating is
// real, a bot is deliberately blocked) would otherwise wedge CI red forever with no fix available.
exit(autoFix.length ? 1 : 0);

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
 * Exit: 0 clean · 1 findings remain · 2 crawl/setup error.
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
const MAX_PAGES = Number(flag('max-pages', 100));
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
const norm = (u) => { try { const x = new URL(u, origin); x.hash = ''; return x.href.replace(/\/$/, x.pathname === '/' ? '/' : ''); } catch { return u; } };

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
const tagText = (h, t) => [...h.matchAll(new RegExp(`<${t}\\b[^>]*>([\\s\\S]*?)</${t}>`, 'gi'))].map((m) => m[1].replace(/<[^>]+>/g, '').trim());
const metaC = (h, attr, key) => h.match(new RegExp(`<meta[^>]*${attr}=["']${key}["'][^>]*content=["']([^"']*)["']`, 'i'))?.[1]
  ?? h.match(new RegExp(`<meta[^>]*content=["']([^"']*)["'][^>]*${attr}=["']${key}["']`, 'i'))?.[1] ?? '';
const linkHref = (h, rel) => h.match(new RegExp(`<link[^>]*rel=["']${rel}["'][^>]*href=["']([^"']*)["']`, 'i'))?.[1]
  ?? h.match(new RegExp(`<link[^>]*href=["']([^"']*)["'][^>]*rel=["']${rel}["']`, 'i'))?.[1] ?? '';
const allCanonicals = (h) => [...h.matchAll(/<link[^>]*rel=["']canonical["'][^>]*>/gi)].map((m) => m[0]);
const hreflangs = (h) => [...h.matchAll(/<link[^>]*rel=["']alternate["'][^>]*>/gi)]
  .map((m) => ({ lang: m[0].match(/hreflang=["']([^"']+)["']/i)?.[1], href: m[0].match(/href=["']([^"']+)["']/i)?.[1] }))
  .filter((x) => x.lang && x.href);
const jsonLdBlocks = (h) => [...h.matchAll(/<script[^>]*type=["']application\/ld\+json["'][^>]*>([\s\S]*?)<\/script>/gi)].map((m) => m[1]);

// ---- robots.txt -------------------------------------------------------------------------------
// "it is not a mechanism for keeping a web page out of Google" — robots/intro
const AI_BOTS = ['GPTBot', 'ClaudeBot', 'PerplexityBot', 'OAI-SearchBot', 'Google-Extended'];
async function auditRobots() {
  const { status, body } = await get(origin + '/robots.txt');
  if (status !== 200) { add('high', 'crawling', 'auto-fix', '/robots.txt', `robots.txt returns ${status}`, 'robots/intro'); return { disallows: [], sitemaps: [] }; }
  const group = (ua) => (body.match(new RegExp(`User-agent:\\s*${ua}[\\s\\S]*?(?=\\nUser-agent:|$)`, 'i')) || [''])[0];
  if (/^\s*Disallow:\s*\/\s*$/im.test(group('\\*'))) add('critical', 'crawling', 'auto-fix', '/robots.txt', 'robots.txt blocks all crawlers (User-agent: * / Disallow: /)', 'robots/intro');
  for (const b of AI_BOTS) { const g = group(b); if (g && /^\s*Disallow:\s*\/\s*$/im.test(g)) add('medium', 'ai-search', 'handoff', '/robots.txt', `${b} is fully disallowed — that engine cannot cite this site`, 'robots/intro'); }
  const sitemaps = [...body.matchAll(/^\s*Sitemap:\s*(\S+)/gim)].map((m) => m[1]);
  if (!sitemaps.length) add('medium', 'sitemap', 'auto-fix', '/robots.txt', 'no Sitemap: directive in robots.txt', 'sitemaps/build-sitemap');
  const disallows = [...body.matchAll(/^\s*Disallow:\s*(\S+)/gim)].map((m) => m[1]).filter((p) => p && p !== '/');
  // "Google Search won't render JavaScript from blocked files or on blocked pages" — javascript-seo-basics
  for (const p of disallows) if (/^\/(assets|static|_next|js|css|dist|build)\b/i.test(p)) add('critical', 'javascript', 'auto-fix', '/robots.txt', `robots.txt disallows "${p}" — blocking render resources stops Google rendering the page`, 'javascript/javascript-seo-basics');
  return { disallows, sitemaps };
}

// ---- sitemap ----------------------------------------------------------------------------------
const W3C_DATE = /^\d{4}-\d{2}-\d{2}([T ]\d{2}:\d{2}(:\d{2})?(\.\d+)?(Z|[+-]\d{2}:\d{2})?)?$/;
async function auditSitemap(smUrls) {
  const url = smUrls[0] || origin + '/sitemap.xml';
  const { status, body, headers } = await get(url);
  if (status !== 200) { add('high', 'sitemap', 'auto-fix', '/sitemap.xml', `sitemap not 200 (got ${status})`, 'sitemaps/build-sitemap'); return []; }

  const ctype = headers.get('content-type') || '';
  if (!/xml/i.test(ctype)) add('medium', 'sitemap', 'auto-fix', url, `sitemap Content-Type is "${ctype}" (expected XML)`, 'sitemaps/build-sitemap');
  // "The sitemap file must be UTF-8 encoded."
  if (!/encoding=["']UTF-8["']/i.test(body) && !/charset=utf-8/i.test(ctype)) add('medium', 'sitemap', 'auto-fix', url, 'sitemap does not declare UTF-8 encoding', 'sitemaps/build-sitemap');
  // "All formats limit a single sitemap to 50MB (uncompressed) or 50,000 URLs."
  const bytes = Buffer.byteLength(body, 'utf8');
  if (bytes > 50 * 1024 * 1024) add('critical', 'sitemap', 'auto-fix', url, `sitemap is ${(bytes / 1048576).toFixed(1)}MB (limit 50MB) — split with a sitemap index`, 'sitemaps/large-sitemaps');

  let locs = [...body.matchAll(/<loc>([^<]+)<\/loc>/gi)].map((m) => m[1].trim());
  if (/<sitemapindex/i.test(body)) {
    const nested = [];
    for (const sm of locs.slice(0, 50)) { const r = await get(sm); nested.push(...[...r.body.matchAll(/<loc>([^<]+)<\/loc>/gi)].map((m) => m[1].trim())); }
    locs = nested;
  } else if (locs.length > 50000) {
    add('critical', 'sitemap', 'auto-fix', url, `${locs.length} URLs in one sitemap (limit 50,000) — use a sitemap index`, 'sitemaps/large-sitemaps');
  }

  // "Google ignores <priority> and <changefreq> values."
  if (/<priority>/i.test(body)) add('low', 'sitemap', 'auto-fix', url, '<priority> present — "Google ignores <priority> and <changefreq> values"', 'sitemaps/build-sitemap');
  if (/<changefreq>/i.test(body)) add('low', 'sitemap', 'auto-fix', url, '<changefreq> present — Google ignores it', 'sitemaps/build-sitemap');

  // "Use fully-qualified, absolute URL in your sitemaps." + entity escaping
  for (const l of locs.slice(0, 500)) {
    if (!/^https?:\/\//i.test(l)) add('high', 'sitemap', 'auto-fix', url, `<loc> not absolute: ${l}`, 'sitemaps/build-sitemap');
    if (/&(?!amp;|lt;|gt;|quot;|apos;|#)/.test(l)) add('high', 'sitemap', 'auto-fix', url, `<loc> has unescaped & : ${l}`, 'sitemaps/build-sitemap');
    if (l.includes('#')) add('medium', 'sitemap', 'auto-fix', url, `<loc> contains a fragment: ${l}`, 'consolidate-duplicate-urls');
    try { if (new URL(l).origin !== origin) add('medium', 'sitemap', 'handoff', url, `<loc> is cross-origin (${l}) — only valid if submitted in GSC or referenced via robots.txt`, 'sitemaps/build-sitemap'); } catch { add('high', 'sitemap', 'auto-fix', url, `<loc> is not a valid URL: ${l}`, 'sitemaps/build-sitemap'); }
  }
  const lastmods = [...body.matchAll(/<lastmod>([^<]+)<\/lastmod>/gi)].map((m) => m[1].trim());
  const badDates = lastmods.filter((d) => !W3C_DATE.test(d));
  if (badDates.length) add('medium', 'sitemap', 'auto-fix', url, `${badDates.length} <lastmod> not W3C Datetime (e.g. "${badDates[0]}")`, 'sitemaps/build-sitemap');
  if (!lastmods.length && locs.length) add('low', 'sitemap', 'auto-fix', url, 'no <lastmod> anywhere — add it where you can compute it accurately', 'sitemaps/build-sitemap');

  const dupes = locs.filter((l, i) => locs.indexOf(l) !== i);
  if (dupes.length) add('low', 'sitemap', 'auto-fix', url, `${new Set(dupes).size} duplicate <loc> entries`, 'sitemaps/build-sitemap');
  return [...new Set(locs)];
}

// ---- per page ---------------------------------------------------------------------------------
const seenTitle = new Map(), seenDesc = new Map(), canonicalTargets = new Map();

function auditHtml(rawHtml, url, view /* 'raw' | 'rendered' */, headers) {
  const html = decomment(rawHtml);
  const path = new URL(url).pathname + new URL(url).search;
  const tag = view === 'rendered' ? '[rendered] ' : '';
  const out = {};

  const title = tagText(html, 'title')[0] || '';
  out.title = title;
  if (!title) add('critical', 'on-page', view === 'raw' ? 'auto-fix' : 'render', path, `${tag}missing <title>`, 'appearance/title-link');
  // Duplicate title/description are collected, not reported per-page: N pages sharing one title is
  // ONE defect (usually an unrendered SPA shell), and emitting it N times buries everything else.
  else if (view === 'raw') seenTitle.set(path, title);

  const desc = metaC(html, 'name', 'description');
  out.desc = desc;
  if (!desc) add('high', 'on-page', view === 'raw' ? 'auto-fix' : 'render', path, `${tag}missing meta description`, 'appearance/snippet');
  else if (view === 'raw') seenDesc.set(path, desc);

  // canonical — "A strong signal that the specified URL should become canonical"
  const canons = allCanonicals(html);
  const canonical = linkHref(html, 'canonical');
  out.canonical = canonical;
  if (canons.length > 1) add('high', 'canonical', 'auto-fix', path, `${tag}${canons.length} rel=canonical tags (must be at most one)`, 'consolidate-duplicate-urls');
  if (canonical) {
    if (!/^https?:\/\//i.test(canonical)) add('medium', 'canonical', 'auto-fix', path, `${tag}canonical is relative ("${canonical}") — "Use absolute paths rather than relative paths"`, 'consolidate-duplicate-urls');
    if (canonical.includes('#')) add('high', 'canonical', 'auto-fix', path, `${tag}canonical contains a fragment — "Google generally doesn't support URL fragments"`, 'consolidate-duplicate-urls');
    if (view === 'raw') {
      const t = norm(canonical);
      canonicalTargets.set(t, [...(canonicalTargets.get(t) || []), path]);
      if (t !== norm(url)) add('high', 'canonical', 'auto-fix', path, `canonical points at a different URL: ${canonical}`, 'consolidate-duplicate-urls');
    }
  } else if (view === 'raw') {
    // Not automatically a defect: "If you can't set the canonical URL in the HTML source code,
    // leave it out and only set it with JavaScript." Flag as informational only if rendered has one.
    out.noRawCanonical = true;
  }

  // robots meta / X-Robots-Tag
  const robots = metaC(html, 'name', 'robots') || metaC(html, 'name', 'googlebot') || '';
  const xrobots = headers?.get?.('x-robots-tag') || '';
  if (/noindex/i.test(robots + ' ' + xrobots) && !NOINDEX_OK.includes(new URL(url).pathname)) {
    add('critical', 'indexing', 'auto-fix', path, `${tag}page is noindex ("${robots || xrobots}") — confirm intentional`, 'crawling-indexing/block-indexing');
  }

  // hreflang reciprocity is cross-page; collect here
  out.hreflang = hreflangs(html);
  if (out.hreflang.length) {
    const selfListed = out.hreflang.some((h) => norm(h.href) === norm(url));
    if (!selfListed) add('high', 'international', view === 'raw' ? 'auto-fix' : 'render', path, `${tag}hreflang set does not list itself — "Each language version must list itself as well as all other language versions"`, 'specialty/international/localized-versions');
    if (!out.hreflang.some((h) => h.lang.toLowerCase() === 'x-default')) add('low', 'international', 'auto-fix', path, `${tag}no x-default hreflang`, 'specialty/international/localized-versions');
  }

  // structured data
  for (const blk of jsonLdBlocks(html)) {
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
  out.jsonLdTypes = jsonLdBlocks(html).flatMap((b) => { try { const d = JSON.parse(b); return (Array.isArray(d) ? d : d['@graph'] || [d]).map((x) => x['@type']); } catch { return []; } });

  if (view === 'raw') {
    if (!/<meta[^>]*name=["']viewport["']/i.test(html)) add('medium', 'page-experience', 'auto-fix', path, 'missing viewport meta (mobile-first indexing)', 'mobile/mobile-sites-mobile-first-indexing');
    if (!/<html[^>]*\blang=/i.test(html)) add('low', 'international', 'auto-fix', path, 'missing <html lang>', 'specialty/international/localized-versions');
    const h1 = tagText(html, 'h1');
    if (!h1.length) out.noRawH1 = true;
    const imgs = [...html.matchAll(/<img\b[^>]*>/gi)].map((m) => m[0]);
    const noAlt = imgs.filter((t) => !/\balt=/i.test(t)).length;
    if (noAlt) add('low', 'on-page', 'auto-fix', path, `${noAlt}/${imgs.length} <img> without alt`, 'appearance/google-images');
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

// ---- main -------------------------------------------------------------------------------------
const { sitemaps } = await auditRobots();
let urls = await auditSitemap(sitemaps);
if (!urls.length) urls = [origin + '/'];
const sameOrigin = urls.filter((u) => { try { return new URL(u).origin === origin; } catch { return false; } });
const pages = sameOrigin.slice(0, MAX_PAGES);
if (sameOrigin.length > MAX_PAGES) console.error(`[audit] NOTE: capping at ${MAX_PAGES} of ${sameOrigin.length} sitemap URLs (--max-pages to raise). Coverage is partial.`);

const rawViews = new Map();
for (const u of pages) {
  const { status, body, headers, finalUrl } = await get(u);
  const path = new URL(u).pathname;
  if (status !== 200) { add('critical', 'indexing', 'auto-fix', path, `sitemap URL returns ${status}`, 'sitemaps/build-sitemap'); continue; }
  if (norm(finalUrl) !== norm(u)) add('medium', 'indexing', 'auto-fix', path, `sitemap URL redirects to ${finalUrl} — list the final URL`, 'crawling-indexing/301-redirects');
  rawViews.set(u, auditHtml(body, u, 'raw', headers));
}

// cross-page: many pages sharing one canonical target == the homepage-canonical trap
for (const [target, srcs] of canonicalTargets) {
  const others = srcs.filter((p) => norm(origin + p) !== target);
  if (others.length >= 3) add('critical', 'canonical', 'auto-fix', target, `${others.length} distinct pages declare canonical -> ${target}. rel=canonical is "A strong signal"; this de-indexes them into one page.`, 'consolidate-duplicate-urls');
}

// cross-page: duplicate <title>/<description> reported once per shared value, listing victims.
for (const [label, map, sev, doc] of [['<title>', seenTitle, 'high', 'appearance/title-link'], ['meta description', seenDesc, 'medium', 'appearance/snippet']]) {
  const byValue = new Map();
  for (const [p, v] of map) byValue.set(v, [...(byValue.get(v) || []), p]);
  for (const [v, paths] of byValue) {
    if (paths.length < 2) continue;
    add(sev, 'on-page', 'auto-fix', paths[0], `${paths.length} pages share one ${label} ("${v.slice(0, 50)}…") — e.g. ${paths.slice(0, 4).join(', ')}${paths.length > 4 ? ` +${paths.length - 4} more` : ''}. If these are client-rendered, the raw HTML is an unrendered shell.`, doc);
  }
}

// raw-vs-rendered delta: the AI-crawler blind spot
if (RENDER) {
  const rendered = await renderedHtml(pages.slice(0, Math.min(pages.length, 25)));
  for (const [u, html] of rendered) {
    if (!html) continue;
    const rv = auditHtml(html, u, 'rendered');
    const raw = rawViews.get(u) || {};
    const path = new URL(u).pathname + new URL(u).search; // ?lang= variants are distinct URLs
    if (raw.title && rv.title && raw.title !== rv.title) add('high', 'javascript', 'auto-fix', path, `<title> differs raw vs rendered — non-rendering crawlers (most AI engines) see "${raw.title.slice(0, 50)}", Google-after-render sees "${rv.title.slice(0, 50)}". Prerender or SSR the head.`, 'javascript/dynamic-rendering');
    if (raw.noRawCanonical && rv.canonical) add('medium', 'canonical', 'auto-fix', path, `canonical exists only after JS runs. Google honors it at render time but "we don't recommend using JavaScript for this" — bake it into the HTML source.`, 'javascript/javascript-seo-basics');
    if (!raw.jsonLdTypes?.length && rv.jsonLdTypes?.length) add('high', 'structured-data', 'auto-fix', path, `structured data (${rv.jsonLdTypes.join(', ')}) exists only after JS runs — AI crawlers and social scrapers never see it`, 'structured-data/generate-structured-data-with-javascript');
    if (!raw.hreflang?.length && rv.hreflang?.length) add('high', 'international', 'auto-fix', path, `hreflang exists only after JS runs. Google sanctions only HTML head / HTTP header / sitemap delivery.`, 'specialty/international/localized-versions');
    if (raw.noRawH1 && tagText(html, 'h1').length) add('medium', 'on-page', 'auto-fix', path, `<h1> only exists after JS runs`, 'javascript/javascript-seo-basics');
  }
}

// ---- report -----------------------------------------------------------------------------------
findings.sort((a, b) => SEV_ORDER[a.severity] - SEV_ORDER[b.severity] || a.area.localeCompare(b.area));
const autoFix = findings.filter((f) => f.class === 'auto-fix');
const handoff = findings.filter((f) => f.class !== 'auto-fix');

if (!QUIET) {
  console.log(`\n# SEO audit — ${origin}`);
  console.log(`pages audited: ${pages.length}${RENDER ? ' (raw + rendered)' : ' (raw HTML only; add --render for the JS delta)'}`);
  console.log(`findings: ${findings.length}  |  auto-fix: ${autoFix.length}  |  handoff: ${handoff.length}\n`);
  for (const grp of [['AUTO-FIX (code changes)', autoFix], ['HANDOFF (human / GSC / content)', handoff]]) {
    if (!grp[1].length) continue;
    console.log(`## ${grp[0]}`);
    for (const f of grp[1]) console.log(`- [${f.severity}] (${f.area}) ${f.where} — ${f.message}  ‹${f.doc}›`);
    console.log('');
  }
  if (!findings.length) console.log('CLEAN — no findings.\n');
}
if (flag('json')) writeFileSync(String(flag('json')), JSON.stringify({ origin, pages: pages.length, rendered: RENDER, findings }, null, 2));
exit(findings.length ? (autoFix.length ? 1 : 0) : 0);

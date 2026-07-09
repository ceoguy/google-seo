#!/usr/bin/env node
/**
 * Regression suite for audit.mjs. Every assertion exists because a reviewer produced a failing
 * repro; none were written to make the suite look green.
 *
 * WHAT THIS PROVES, HONESTLY:
 *  - INTEGRATION tests run the real `audit.mjs` as a subprocess against a fixture site served on
 *    localhost and assert on its JSON output. These prove end-to-end behavior.
 *  - UNIT tests exercise pure helpers COPIED from audit.mjs. It cannot be imported (top-level code,
 *    calls exit()), so these guard regex/algorithm shape, not the wiring. Where the fixture can
 *    express the same bug, an integration test covers it too.
 *  - `--render` paths are NOT covered here: they need headless Chrome. Exercise them by hand with
 *    `node audit.mjs <url> --render`.
 *
 * Run: node test-audit.mjs
 */
import { createServer } from 'node:http';
import { spawn } from 'node:child_process';
import { readFileSync, unlinkSync } from 'node:fs';
import { fileURLToPath } from 'node:url';
import path from 'node:path';

const HERE = path.dirname(fileURLToPath(import.meta.url));
let pass = 0, fail = 0;
const t = (name, cond) => { cond ? pass++ : fail++; console.log(`${cond ? 'PASS' : 'FAIL'}  ${name}`); };

// ---------------------------------------------------------------- unit: pure helpers ------------
const ATTR = (n) => `${n}=(["'])((?:(?!\\1).)*)\\1`;
const UNQ = (n) => `\\s${n}=([^\\s"'>]+)`;
const KEY = (a, k) => `${a}=["']?${k}(?=["'\\s>])`;
const metaC = (h, a, k) => h.match(new RegExp(`<meta[^>]*${KEY(a, k)}[^>]*${ATTR('content')}`, 'i'))?.[2]
  ?? h.match(new RegExp(`<meta[^>]*${ATTR('content')}[^>]*${KEY(a, k)}`, 'i'))?.[2]
  ?? h.match(new RegExp(`<meta[^>]*${KEY(a, k)}[^>]*${UNQ('content')}`, 'i'))?.[1]
  ?? h.match(new RegExp(`<meta[^>]*${UNQ('content')}[^>]*${KEY(a, k)}`, 'i'))?.[1] ?? '';

t("apostrophe in a double-quoted value survives", metaC(`<meta name="description" content="it's great">`, 'name', 'description') === "it's great");
t("value starting with an apostrophe is not empty", metaC(`<meta name="description" content="'Tis the season">`, 'name', 'description') === "'Tis the season");
t("single-quoted value", metaC(`<meta name='description' content='plain'>`, 'name', 'description') === 'plain');
t("reversed attribute order", metaC(`<meta content="it's x" name="description">`, 'name', 'description') === "it's x");
t("unquoted value (valid HTML5)", metaC('<meta name="description" content=RealDesc>', 'name', 'description') === 'RealDesc');
t("content= inside ANOTHER attribute's value is not captured", metaC('<meta name="robots" data-note="content=noindex">', 'name', 'robots') === '');
t("empty content is still 'missing'", metaC('<meta name="description" content="">', 'name', 'description') === '');
t("unquoted KEY attribute (name=description)", metaC('<meta name=description content=RealDesc>', 'name', 'description') === 'RealDesc');
t("a longer key (descriptionX) does not match 'description'", metaC('<meta name=descriptionX content=Nope>', 'name', 'description') === '');

function robotsGroups(body) {
  const g = new Map(); let pending = [], current = [];
  for (const raw of body.split(/\r?\n/)) {
    const line = raw.replace(/#.*$/, '').trim(); if (!line) continue;
    const ua = line.match(/^User-agent:\s*(\S+)/i);
    if (ua) { if (current.length) { pending = []; current = []; } pending.push(ua[1].toLowerCase()); if (!g.has(ua[1].toLowerCase())) g.set(ua[1].toLowerCase(), []); continue; }
    if (!pending.length) continue; current.push(line); for (const a of pending) g.get(a).push(line);
  }
  return g;
}
const blocksAll = (g, a) => (g.get(a.toLowerCase()) || []).some((l) => /^Disallow:\s*\/\s*$/i.test(l));
t("stacked 'User-agent: *' + Googlebot -> * is blocked", blocksAll(robotsGroups('User-agent: *\nUser-agent: Googlebot\nDisallow: /'), '*'));
t("stacked GPTBot + CCBot -> GPTBot is blocked", blocksAll(robotsGroups('User-agent: GPTBot\nUser-agent: CCBot\nDisallow: /'), 'GPTBot'));
t("a separate group does not leak onto *", !blocksAll(robotsGroups('User-agent: *\nAllow: /\n\nUser-agent: Bad\nDisallow: /'), '*'));
t("'none' is detected as noindex", /\b(noindex|none)\b/i.test('none'));
t("'nonetheless' is not a noindex hit", !/\b(noindex|none)\b/i.test('nonetheless'));

const origin = 'https://example.com';
const norm = (u) => { try { const x = new URL(u, origin); const p = x.pathname === '/' ? '/' : x.pathname.replace(/\/$/, ''); return x.origin + p + x.search; } catch { return u; } };
t("a trailing slash INSIDE a query value is preserved", norm('https://example.com/p?path=/a/b/') === 'https://example.com/p?path=/a/b/');
t("root keeps its slash", norm('https://example.com/') === 'https://example.com/');
t("path trailing slash is stripped", norm('https://example.com/foo/') === 'https://example.com/foo');
t("?lang= variants stay distinct", norm('https://example.com/r?lang=en') !== norm('https://example.com/r'));

const pageParam = (u) => [...new URL(u).searchParams.keys()].find((k) => /^page$/i.test(k));
t("?p=456 (WordPress post id) is not pagination", pageParam('https://x.com/?p=456') === undefined);
t("?page=3 is pagination", pageParam('https://x.com/?page=3') === 'page');
t("amphtml resolves against the page, not the origin", new URL('amp', 'https://x.com/blog/post').href === 'https://x.com/blog/amp');

// Chrome decodes entities in the DOM; a raw fetch does not. Compare decoded, or every static page
// with an apostrophe in its title is falsely told to prerender.
const decodeEnts = (s) => s
  .replace(/&#x([0-9a-f]+);/gi, (_, n) => String.fromCodePoint(parseInt(n, 16)))
  .replace(/&#(\d+);/g, (_, n) => String.fromCodePoint(Number(n)))
  .replace(/&quot;/g, '"').replace(/&apos;/g, "'")
  .replace(/&nbsp;/g, '\u00a0').replace(/&lt;/g, '<').replace(/&gt;/g, '>').replace(/&amp;/g, '&');
t("&#39; decodes to an apostrophe", decodeEnts("It&#39;s") === "It's");
t("&#8217; (curly) decodes", decodeEnts('It&#8217;s') === 'It\u2019s');
t("&quot; decodes", decodeEnts('Say &quot;hi&quot;') === 'Say "hi"');
t("&amp;amp; does not resurrect an entity", decodeEnts('A &amp;amp; B') === 'A &amp; B');
t("raw-vs-rendered title compare is entity-insensitive", decodeEnts('It&#39;s a Test') === decodeEnts("It's a Test"));
// an out-of-range code point must degrade, not throw: one bad page killed the entire audit
const cp = (n) => (Number.isInteger(n) && n >= 0 && n <= 0x10FFFF ? String.fromCodePoint(n) : '\ufffd');
t("&#1114112; (> U+10FFFF) degrades instead of throwing", cp(1114112) === '\ufffd');
t("a valid code point still decodes", cp(39) === "'");
// decoded canonical must be compared against a decoded <loc>, not the raw escaped one
t("escaped &amp; in <loc> matches the decoded canonical", decodeEnts('https://x/p?b=1&amp;c=2') === 'https://x/p?b=1&c=2');

// <script>/<style> bodies are not markup: a tag string inside JS must not win over the real tag
const decomment2 = (h) => h.replace(/<!--[\s\S]*?-->/g, '');
const descript = (h) => h.replace(/<script\b(?![^>]*type=["']application\/ld\+json["'])[^>]*>[\s\S]*?<\/script>/gi, '<script></script>').replace(/<style\b[^>]*>[\s\S]*?<\/style>/gi, '<style></style>');
const clean = (h) => descript(decomment2(h));
const titles = (h) => [...h.matchAll(/<title\b[^>]*>([\s\S]*?)<\/title>/gi)].map((m) => m[1].trim());
t("a <title> inside a <script> body does not win", titles(clean('<script>var s = "<title>Fake</title>";</script><title>Real</title>'))[0] === 'Real');
t("JSON-LD scripts survive stripping", /Product/.test(clean('<script type="application/ld+json">{"@type":"Product"}</script>')));
t("<style> bodies are stripped", !/h1/.test(clean('<style>h1{color:red}</style>')));

// googlebot-specific noindex must not be hidden by a generic robots meta
const combined = (h) => [metaC(h, 'name', 'robots'), metaC(h, 'name', 'googlebot')].filter(Boolean).join(' ');
t("googlebot noindex is seen even when robots=all", /\bnoindex\b/.test(combined('<meta name="robots" content="all"><meta name="googlebot" content="noindex">')));
t("robots=all alone is not noindex", !/\bnoindex\b/.test(combined('<meta name="robots" content="all">')));

// javascript:void(0) is non-crawlable; #section is a legitimate anchor
const fakeNav = (h) => [...h.matchAll(/<a\b[^>]*>/gi)].map((m) => m[0])
  .filter((a) => !/\bhref\s*=/i.test(a) || /href\s*=\s*["']\s*javascript:/i.test(a) || /href\s*=\s*["']\s*#\s*["']/i.test(a)).length;
t("javascript:void(0) counts as non-crawlable", fakeNav('<a href="javascript:void(0)">x</a>') === 1);
t("javascript:doThing() counts", fakeNav('<a href="javascript:doThing()">x</a>') === 1);
t("bare # counts", fakeNav('<a href="#">x</a>') === 1);
t("#section anchor does NOT count", fakeNav('<a href="#section">x</a>') === 0);
t("a real link does not count", fakeNav('<a href="/page">x</a>') === 0);

// --max-pages with no value must fall back to the default, not Number(true)===1
const numFallback = (v, d) => { if (typeof v === 'boolean') return d; const x = Number(v); return Number.isFinite(x) ? x : d; };
const numGuard = (raw, d) => { if (typeof raw === 'boolean') return d; const v = Number(raw); if (!Number.isFinite(v) || v < 1) return d; return Math.floor(v); };
t("--max-pages with no value falls back to the default", numGuard(true, 100) === 100);
t("--max-pages 500 is honored", numGuard('500', 100) === 500);
t("--max-pages 0 falls back (0 audited nothing and exited clean)", numGuard('0', 100) === 100);
t("--max-pages -5 falls back (slice(0,-5) dropped the last 5 pages)", numGuard('-5', 100) === 100);
t("--max-pages 3.7 floors to 3", numGuard('3.7', 100) === 3);
t("--max-pages abc falls back", numGuard('abc', 100) === 100);

// connected components must not depend on iteration order (hub-and-spoke: A~B, B~C, A!~C)
const graph = new Map([['B', new Set(['A', 'C'])], ['A', new Set(['B'])], ['C', new Set(['B'])]]);
const areAlt = (a, b) => graph.get(a)?.has(b) || graph.get(b)?.has(a);
function clusterCount(urls) {
  const seen = new Set(); let n = 0;
  for (const s of urls) { if (seen.has(s)) continue; n++; const q = [s]; seen.add(s); while (q.length) { const c = q.pop(); for (const o of urls) if (!seen.has(o) && areAlt(c, o)) { seen.add(o); q.push(o); } } }
  return n;
}
t("cluster count is order-independent", clusterCount(['A', 'B', 'C']) === 1 && clusterCount(['B', 'A', 'C']) === 1 && clusterCount(['C', 'A', 'B']) === 1);
t("an unrelated page forms its own cluster", clusterCount(['A', 'B', 'C', 'D']) === 2);

// The MESSAGE count must equal the GATE count. Greedy direct-adjacency splits an A~B~C chain into
// two reps (A and C aren't directly linked) while the component count is 1.
function components(urls) {
  const seen = new Set(); const reps = [];
  for (const s0 of urls) { if (seen.has(s0)) continue; reps.push(s0); const q = [s0]; seen.add(s0);
    while (q.length) { const c = q.pop(); for (const o of urls) if (!seen.has(o) && areAlt(c, o)) { seen.add(o); q.push(o); } } }
  return reps;
}
const greedy = (urls) => { const r = []; for (const u of urls) if (!r.some((x) => areAlt(x, u))) r.push(u); return r; };
t("components() yields one rep per component on an A~B~C chain", components(['A', 'B', 'C', 'D']).length === clusterCount(['A', 'B', 'C', 'D']));
t("greedy adjacency overcounts the same chain (the bug)", greedy(['A', 'B', 'C', 'D']).length === 3);

// JSON-LD string values are DATA, not markup: emptying every script body is what makes that true.
const descriptAll = (h) => h.replace(/<script\b[^>]*>[\s\S]*?<\/script>/gi, '<script></script>');
const imgCount = (h) => [...h.matchAll(/<img\b[^>]*>/gi)].length;
t("an <img> string inside JSON-LD is not counted as an image", imgCount(descriptAll('<script type="application/ld+json">{"t":"<img src=a><img src=b>"}</script>')) === 0);

// canonicalTargets self-exclusion must decode before comparing
const decEnt = (x) => x.replace(/&amp;/g, '&');
const normX = (u) => { const p = new URL(u, 'https://x.com'); const q = p.pathname === '/' ? '/' : p.pathname.replace(/\/$/, ''); return p.origin + q + p.search; };
t("a spec-escaped self-canonical hub excludes itself", normX(decEnt('https://x.com' + '/h?a=1&amp;b=2')) === normX(decEnt('https://x.com/h?a=1&amp;b=2')));

// ------------------------------------------------------- integration: the real audit.mjs --------
const page = (title, extra = '', body = '<h1>Heading</h1>') =>
  `<!doctype html><html lang="en"><head><meta name="viewport" content="width=device-width">
<title>${title}</title>${extra}</head><body>${body}</body></html>`;

const ROUTES = {
  '/robots.txt': ['text/plain', 'User-agent: *\nAllow: /\nSitemap: {B}/sitemap.xml\nSitemap: {B}/sitemap.xml\n'],
  '/sitemap.xml': ['application/xml', `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
<url><loc>{B}/ok</loc><priority>0.8</priority></url>
<url><loc>{B}/trap</loc></url>
<url><loc>{B}/unquoted</loc></url>
<url><loc>{B}/dup-a</loc></url>
<url><loc>{B}/dup-b</loc></url>
<url><loc>{B}/list?page=2</loc></url>
<url><loc>{B}/commented</loc></url>
<url><loc>{B}/no-h1</loc></url>
<url><loc>{B}/entity-title</loc></url>
<url><loc>{B}/gbot-noindex</loc></url>
<url><loc>{B}/bad-entity</loc></url>
<url><loc>{B}/script-title</loc></url>
<url><loc>{B}/two-h1</loc></url>
<url><loc>{B}/jsonld-img</loc></url>
<url><loc>{B}/chain-a</loc></url>
<url><loc>{B}/chain-b</loc></url>
<url><loc>{B}/chain-c</loc></url>
<url><loc>{B}/chain-d</loc></url>
<url><loc>{B}/hub?a=1&amp;b=2</loc></url>
<url><loc>{B}/vic1</loc></url>
<url><loc>{B}/vic2</loc></url>
<url><loc>{B}/amp-canonical?b=1&amp;c=2</loc></url>
</urlset>`],
  '/ok': ['text/html', page('Unique OK page', '<meta name="description" content="A page that is fine and it&#39;s quoted properly here.">')],
  '/trap': ['text/html', page('Trap page', '<meta name="robots" data-note="content=noindex"><meta name="description" content="This page is not actually noindexed at all.">')],
  '/unquoted': ['text/html', page('Unquoted page', '<meta name=description content=RealDescriptionWithoutQuotes>')],
  '/dup-a': ['text/html', page('Shared Title', '<meta name="description" content="Distinct description for page A here.">')],
  '/dup-b': ['text/html', page('Shared Title', '<meta name="description" content="Distinct description for page B here.">')],
  '/list': ['text/html', page('Listing page two', '<meta name="description" content="The second page of the listing."><link rel="canonical" href="{B}/list">')],
  '/commented': ['text/html', page('Commented page', '<meta name="description" content="Canonical appears only inside a comment."><!-- <link rel="canonical" href="{B}/elsewhere"> -->')],
  // exercises the h1 paths for real: zero headings, and two headings.
  '/no-h1': ['text/html', page('Page without any heading', '<meta name="description" content="This page has no heading element.">', '<p>no heading</p>')],
  // Two headings AND one deliberate img-without-alt, so we can prove the page was really crawled.
  '/two-h1': ['text/html', page('Page with two headings', '<meta name="description" content="Two headings, which Google does not forbid.">', '<h1>One</h1><h1>Two</h1><img src="/x.png">')],
  '/entity-title': ['text/html', page('It&#39;s an entity title', '<meta name="description" content="Title carries an HTML entity apostrophe.">')],
  '/gbot-noindex': ['text/html', page('Googlebot noindex page', '<meta name="robots" content="all"><meta name="googlebot" content="noindex"><meta name="description" content="Noindexed for Googlebot only.">')],
  // a code point above U+10FFFF used to throw RangeError and abort the whole audit
  '/script-title': ['text/html', '<!doctype html><html lang="en"><head><meta name="viewport" content="width=device-width"><script>var t = "<title>Fake Script Title</title>";</script><title>The Real Title Here</title><meta name="description" content="A title string hides inside a script body."></head><body><h1>H</h1></body></html>'],
  // JSON-LD carrying <img> strings must not be scanned as markup (it has NO real images)
  // hreflang CHAIN: a<->b, b<->c, but a and c are NOT directly linked. All four share one <title>.
  // components() sees {a,b,c} + {d} = 2. Greedy direct-adjacency wrongly reports 3.
  '/chain-a': ['text/html', page('Chained Shared Title', '<meta name="description" content="Chain page a with its own description."><link rel="alternate" hreflang="en" href="{B}/chain-a"><link rel="alternate" hreflang="fr" href="{B}/chain-b">')],
  '/chain-b': ['text/html', page('Chained Shared Title', '<meta name="description" content="Chain page b with its own description."><link rel="alternate" hreflang="fr" href="{B}/chain-b"><link rel="alternate" hreflang="en" href="{B}/chain-a"><link rel="alternate" hreflang="de" href="{B}/chain-c">')],
  '/chain-c': ['text/html', page('Chained Shared Title', '<meta name="description" content="Chain page c with its own description."><link rel="alternate" hreflang="de" href="{B}/chain-c"><link rel="alternate" hreflang="fr" href="{B}/chain-b">')],
  '/chain-d': ['text/html', page('Chained Shared Title', '<meta name="description" content="Unrelated page d with its own description.">')],
  '/jsonld-img': ['text/html', '<!doctype html><html lang="en"><head><meta name="viewport" content="width=device-width"><title>JSON-LD image strings</title><meta name="description" content="Images appear only inside a JSON-LD string value."><script type="application/ld+json">{"@context":"https://schema.org","@type":"FAQPage","text":"<img src=a.png><img src=b.png><img src=c.png>"}</script></head><body><h1>H</h1></body></html>'],
  // a spec-correct self-canonical hub whose loc escapes & as &amp;, plus ONE victim (below the >=3 threshold)
  '/hub': ['text/html', page('Hub page', '<meta name="description" content="A hub that correctly self canonicalizes."><link rel="canonical" href="{B}/hub?a=1&amp;b=2">')],
  '/vic1': ['text/html', page('Victim one', '<meta name="description" content="This page canonicalizes to the hub, victim one."><link rel="canonical" href="{B}/hub?a=1&amp;b=2">')],
  '/vic2': ['text/html', page('Victim two', '<meta name="description" content="This page canonicalizes to the hub, victim two."><link rel="canonical" href="{B}/hub?a=1&amp;b=2">')],
  '/bad-entity': ['text/html', page('Bad&#1114112;Entity Title', '<meta name="description" content="Title carries an out of range character reference.">')],
  // a spec-correct page: both the sitemap <loc> and the canonical escape & as &amp;
  '/amp-canonical': ['text/html', page('Ampersand canonical page', '<meta name="description" content="Canonical and loc both escape the ampersand."><link rel="canonical" href="{B}/amp-canonical?b=1&amp;c=2">')],
};

const server = createServer((req, res) => {
  const url = req.url.split('?')[0];
  const hit = ROUTES[url];
  const base = `http://127.0.0.1:${server.address().port}`;
  if (!hit) { res.writeHead(404, { 'content-type': 'text/html' }); return res.end('<h1>404</h1>'); }
  res.writeHead(200, { 'content-type': hit[0] });
  res.end(hit[1].replaceAll('{B}', base));
});

await new Promise((r) => server.listen(0, '127.0.0.1', r));
const BASE = `http://127.0.0.1:${server.address().port}`;
const OUT = path.join(HERE, '.test-findings.json');

const code = await new Promise((resolve) => {
  const p = spawn('node', [path.join(HERE, 'audit.mjs'), BASE, '--json', OUT, '--quiet'], { stdio: ['ignore', 'ignore', 'ignore'] });
  p.on('close', resolve);
});
server.close();

const findings = JSON.parse(readFileSync(OUT, 'utf8')).findings;
unlinkSync(OUT);
const has = (re) => findings.some((f) => re.test(f.message));
const count = (re) => findings.filter((f) => re.test(f.message)).length;
// page-scoped: a global `has()` would be satisfied by a DIFFERENT page's finding.
const onPage = (p, re) => findings.some((f) => String(f.where).includes(p) && re.test(f.message));

console.log('\n--- integration: the real audit.mjs against a fixture site ---');

// STRUCTURAL GUARD: every fixture page must be reachable from the sitemap, or its assertions are
// vacuous. A page defined in ROUTES but absent from <urlset> is never fetched, and any `!has(...)`
// about it passes no matter what the code does. This exact mistake has been made twice.
const sitemapXml = ROUTES['/sitemap.xml'][1];
const orphans = Object.keys(ROUTES)
  .filter((r) => !['/robots.txt', '/sitemap.xml'].includes(r))
  .filter((r) => !sitemapXml.includes(`{B}${r}<`) && !sitemapXml.includes(`{B}${r}?`));
t(`[meta] no orphan fixture pages (unreachable => vacuous assertions)${orphans.length ? ': ' + orphans.join(', ') : ''}`, orphans.length === 0);
t('[e2e] exits 1 when auto-fix findings remain', code === 1);
t('[e2e] `data-note="content=noindex"` is NOT reported as noindex', !onPage('/trap', /is noindex/i));
t('[e2e] unquoted `content=` is not reported as a missing description', count(/missing meta description/) === 0);
t('[e2e] a canonical inside an HTML comment is not counted as a tag', !has(/rel=canonical tags/));
t('[e2e] the dup-a/dup-b shared title is reported exactly once', findings.filter((f) => /share one <title>/.test(f.message) && f.message.includes('"Shared Title')).length === 1);
t('[e2e] distinct descriptions are not called duplicates', !has(/share one meta description/));
t('[e2e] <priority> is flagged as ignored by Google', has(/<priority> present/));
t('[e2e] duplicate `Sitemap:` directives do not double-report', count(/<priority> present/) === 1);
t('[e2e] ?page=2 canonicalizing to page 1 is flagged', has(/paginated page canonicalizes to page 1/));
t('[e2e] a site that returns real 404s gets NO soft-404 finding', !has(/soft 404/i));
t('[e2e] every finding carries a doc citation', findings.length > 0 && findings.every((f) => f.doc && f.doc.length > 3));
t('[e2e] a page with ZERO <h1> yields a handoff, not a defect', findings.some((f) => String(f.where).includes('/no-h1') && /no <h1>/.test(f.message) && f.class === 'handoff'));
// This must be able to FAIL: assert the page was actually crawled, then that it produced no h1
// finding. Previously /two-h1 was defined but absent from the sitemap, so the check was vacuous.
const twoH1Crawled = onPage('/two-h1', /without alt/);   // its img has no alt -> proves it was fetched
t('[e2e] /two-h1 is actually crawled (guard against a vacuous assertion)', twoH1Crawled);
t('[e2e] a page with TWO <h1> yields no h1 finding (Google states no h1-count rule)', !onPage('/two-h1', /<h1>/));
t('[e2e] an entity in a title is not a duplicate/parse artifact', !findings.some((f) => /&#39;/.test(f.message)));
t('[e2e] googlebot-only noindex IS detected despite robots=all', onPage('/gbot-noindex', /is noindex/i));

// second fixture: a catch-all that answers 200 for EVERYTHING (the SPA case). The soft-404 probe
// must fire here, and must not fire above. One test without the other proves nothing.
const spa = createServer((req, res) => {
  if (req.url.startsWith('/robots.txt')) { res.writeHead(200, { 'content-type': 'text/plain' }); return res.end('User-agent: *\nAllow: /\n'); }
  res.writeHead(200, { 'content-type': 'text/html' });
  res.end(page('SPA shell', '<meta name="description" content="Every path answers two hundred here.">'));
});
await new Promise((r) => spa.listen(0, '127.0.0.1', r));
const SPA_BASE = `http://127.0.0.1:${spa.address().port}`;
const OUT2 = path.join(HERE, '.test-findings2.json');
await new Promise((resolve) => spawn('node', [path.join(HERE, 'audit.mjs'), SPA_BASE, '--json', OUT2, '--quiet'], { stdio: ['ignore', 'ignore', 'ignore'] }).on('close', resolve));
spa.close();
const spaFindings = JSON.parse(readFileSync(OUT2, 'utf8')).findings;
unlinkSync(OUT2);
t('[e2e] a catch-all 200 site IS reported as a soft 404', spaFindings.some((f) => /soft 404/i.test(f.message)));
t('[e2e] an out-of-range entity does not abort the audit', findings.length > 0 && !onPage('/bad-entity', /could not parse/));
t('[e2e] a correctly-escaped &amp; canonical is NOT called a different URL', !onPage('/amp-canonical', /points at a different URL/));
t('[e2e] a <title> inside a <script> does not create a phantom duplicate', !findings.some((f) => /Fake Script Title/.test(f.message)));
t('[e2e] <img> strings inside JSON-LD are not counted as images', !onPage('/jsonld-img', /without alt/));
t('[e2e] JSON-LD is still parsed (structured data checks not blinded)', findings.every((f) => !/JSON-LD block does not parse/.test(f.message)));
t('[e2e] a spec-escaped self-canonical hub is not its own victim (no false CRITICAL)', !findings.some((f) => f.severity === 'critical' && /declare canonical/.test(f.message)));
// the chain shares one <title>: 3 language variants + 1 unrelated page = 2 distinct pages, not 3
const chainMsg = findings.find((f) => /Chained Shared Title/.test(f.message))?.message ?? '';
t('[e2e] an hreflang chain counts as ONE page, so the message says 2 distinct pages', /^2 distinct pages share one <title>/.test(chainMsg));

console.log(`\n${pass} passed, ${fail} failed`);
process.exit(fail ? 1 : 0);

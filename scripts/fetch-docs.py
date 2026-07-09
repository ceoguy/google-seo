#!/usr/bin/env python3
"""Fork Google Search Central docs to local markdown.

Fetches each page, extracts the <article> body (devsite wraps content in
.devsite-article-body), converts to markdown, writes docs/<path>.md with
frontmatter carrying the source URL + fetch date. Idempotent: re-running
overwrites. Failures are recorded, never silently skipped.
"""
import concurrent.futures as cf
import datetime
import json
import pathlib
import re
import sys
import time
import urllib.request
import urllib.error

ROOT = pathlib.Path(__file__).resolve().parent.parent
DOCS = ROOT / "docs"
BASE = "https://developers.google.com"
UA = "Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/125.0 Safari/537.36"
TODAY = datetime.date.today().isoformat()


def fetch(url: str, tries: int = 5) -> str:
    """GET with backoff. Google 302s to a consent/throttle page under rapid parallel load; a 302
    here is rate limiting, not a dead link, so retry rather than record a phantom broken page."""
    last = None
    for i in range(tries):
        req = urllib.request.Request(url, headers={"User-Agent": UA, "Accept-Language": "en-US,en"})
        try:
            with urllib.request.urlopen(req, timeout=60) as r:
                if r.status == 200:
                    return r.read().decode("utf-8", "replace")
                last = f"HTTP {r.status}"
        except urllib.error.HTTPError as e:
            last = f"HTTP {e.code}"
            if e.code not in (302, 429, 500, 503):
                raise
        except Exception as e:  # noqa: BLE001
            last = type(e).__name__
        time.sleep(2 ** i + 0.5 * i)
    raise RuntimeError(last or "unknown")


def decode_entities(s: str) -> str:
    for a, b in [("&nbsp;", " "), ("&lt;", "<"), ("&gt;", ">"), ("&quot;", '"'), ("&#39;", "'"), ("&mdash;", "—"), ("&amp;", "&")]:
        s = s.replace(a, b)
    return s


def strip_tags(html: str) -> str:
    """Minimal, dependency-free HTML -> markdown-ish text.

    ponytail: no bs4/html2text install. Good enough for a reference corpus that
    agents grep and read; upgrade to a real parser only if fidelity bites.
    """
    h = html
    # Pull <pre> blocks out FIRST. Google's examples are literal <script type="application/ld+json">
    # tags rendered inside <pre>; strip noise first and the noise-stripper eats the example. Park
    # them behind placeholders, then restore after all tag surgery is done.
    blocks: list[str] = []

    def _park(m):
        blocks.append(re.sub(r"<[^>]+>", "", m.group(1)))
        return f"\x00PRE{len(blocks) - 1}\x00"
    h = re.sub(r"<pre[^>]*>(.*?)</pre>", _park, h, flags=re.S | re.I)

    # drop noise
    h = re.sub(r"<(script|style|svg|noscript)\b[^>]*>.*?</\1>", "", h, flags=re.S | re.I)
    h = re.sub(r"<devsite-[^>]*>|</devsite-[^>]*>", "", h, flags=re.I)
    h = re.sub(r"<code[^>]*>(.*?)</code>", r"`\1`", h, flags=re.S | re.I)

    # tables: emit one markdown row per <tr>, cells flattened to a single line. Google puts the
    # required/recommended PROPERTY definitions in tables -- the most load-bearing content on the
    # structured-data pages -- and a naive tag-strip turns them into unreadable blank-line soup.
    def _row(m):
        cells = re.findall(r"<t[dh]\b[^>]*>(.*?)</t[dh]>", m.group(1), re.S | re.I)
        if not cells:
            return m.group(0)  # never DELETE a span we failed to parse -- return it untouched
        flat = [re.sub(r"\s+", " ", re.sub(r"<[^>]+>", " ", c)).strip() for c in cells]
        return "\n| " + " | ".join(flat) + " |"
    # `(?:(?!</?tr\b).)*` keeps the body from spilling across a neighbouring row: a stray unmatched
    # </tr> would otherwise let one match swallow (and drop) every heading up to the next one.
    h = re.sub(r"<tr\b[^>]*>((?:(?!</?tr\b).)*)</tr>", _row, h, flags=re.S | re.I)
    # headings
    for n in range(1, 7):
        h = re.sub(rf"<h{n}[^>]*>(.*?)</h{n}>", lambda m, n=n: "\n" + "#" * n + " " + re.sub(r"<[^>]+>", "", m.group(1)).strip() + "\n", h, flags=re.S | re.I)
    # links -> [text](href)
    h = re.sub(r'<a\b[^>]*href="([^"]+)"[^>]*>(.*?)</a>',
               lambda m: f"[{re.sub(r'<[^>]+>', '', m.group(2)).strip()}]({m.group(1) if m.group(1).startswith('http') else BASE + m.group(1)})",
               h, flags=re.S | re.I)
    # lists / structure
    h = re.sub(r"<li[^>]*>", "\n- ", h, flags=re.I)
    h = re.sub(r"</(p|div|tr|section|ul|ol|table|h\d)>", "\n", h, flags=re.I)
    h = re.sub(r"<br\s*/?>", "\n", h, flags=re.I)
    h = re.sub(r"</t[dh]>", " | ", h, flags=re.I)
    h = re.sub(r"<[^>]+>", "", h)
    # entities
    h = decode_entities(h)
    h = re.sub(r"\n{3,}", "\n\n", h)
    h = re.sub(r"[ \t]{2,}", " ", h)
    # restore parked code blocks (entities inside them were already decoded above)
    h = re.sub(r"\x00PRE(\d+)\x00", lambda m: "\n```\n" + decode_entities(blocks[int(m.group(1))]).strip() + "\n```\n", h)
    return h.strip()


def article_body(html: str) -> str:
    """Slice the article body.

    Devsite nests <article> elements (tab panels, callouts): the structured-data pages carry five
    </article> tags. A non-greedy match stops at the FIRST close and silently drops the rest of the
    page -- which is how four feature guides lost their 'Required properties' tables. Take the last
    close instead, and treat "no match" as a hard failure rather than falling back to the whole
    document (nav chrome would masquerade as content).
    """
    start = re.search(r'<div[^>]*class="[^"]*devsite-article-body[^"]*"[^>]*>', html, re.I)
    if not start:
        start = re.search(r"<article\b[^>]*>", html, re.I)
    if not start:
        return ""
    end = html.rfind("</article>")
    if end == -1 or end <= start.end():
        end = len(html)
    return html[start.end():end]


def title_of(html: str) -> str:
    m = re.search(r"<title>(.*?)</title>", html, re.S | re.I)
    t = re.sub(r"\s*\|\s*Google.*$", "", m.group(1).strip()) if m else "Untitled"
    return t.replace("\n", " ").strip()


def out_path(url: str) -> pathlib.Path:
    p = url.split("developers.google.com", 1)[-1].split("#")[0].split("?")[0].strip("/")
    p = p or "index"
    return DOCS / (p + ".md")


def one(url: str):
    try:
        html = fetch(url)
    except urllib.error.HTTPError as e:
        return url, None, f"HTTP {e.code}"
    except Exception as e:  # noqa: BLE001
        return url, None, type(e).__name__ + ": " + str(e)[:80]
    raw_body = article_body(html)
    if not raw_body:
        return url, None, "no article body found"
    body = strip_tags(raw_body)
    if len(body) < 200:
        return url, None, f"body too short ({len(body)} chars)"
    # Conversion guard: measure WORDS kept, not headings. Google nests <h2> inside <td> on several
    # pages (search-operators, robots-meta-tag), so a heading count says "truncated" when the
    # flattener has merely turned a heading into a table cell. Words don't lie. A silently short
    # body reads as a complete page downstream, which is worse than a loud failure.
    # Compare like with like on ALPHANUMERIC tokens:
    #  - drop the same noise (inline script/style JSON, SVG) that strip_tags drops, else the
    #    denominator counts text we deliberately removed;
    #  - count [A-Za-z0-9]+ runs, not whitespace-split tokens, because entity decoding rewrites
    #    "&lt;" -> "<" and glues punctuation to words, so raw and converted tokenize differently.
    #    (Chased this as "369 lost words" on javascript-seo-basics; nothing was lost.)
    denom_html = re.sub(r"<(script|style|svg|noscript)\b[^>]*>.*?</\1>", " ", raw_body, flags=re.S | re.I)
    words = lambda s: re.findall(r"[A-Za-z0-9]+", s)  # noqa: E731
    want = len(words(decode_entities(re.sub(r"<[^>]+>", " ", denom_html))))
    got = len(words(body))
    if want and got < want * 0.9:
        return url, None, f"conversion lost text ({got}/{want} word tokens) — likely truncated"
    dest = out_path(url)
    dest.parent.mkdir(parents=True, exist_ok=True)
    fm = f"---\nsource: {url}\ntitle: {json.dumps(title_of(html))}\nfetched: {TODAY}\n---\n\n"
    dest.write_text(fm + body, encoding="utf-8")
    return url, str(dest.relative_to(ROOT)), None


def main():
    urls = [u.strip() for u in (ROOT / "urls.txt").read_text().splitlines() if u.strip() and not u.startswith("#")]
    print(f"fetching {len(urls)} pages -> {DOCS}")
    ok, fail = [], []
    with cf.ThreadPoolExecutor(max_workers=4) as ex:
        for url, dest, err in ex.map(one, urls):
            (fail if err else ok).append((url, err or dest))
            if err:
                print(f"  FAIL {url}: {err}", file=sys.stderr)
    print(f"\nwrote {len(ok)} / {len(urls)}  |  failed {len(fail)}")
    (ROOT / "fetch-report.json").write_text(json.dumps({"date": TODAY, "ok": len(ok), "failed": fail}, indent=2))
    return 1 if fail else 0


if __name__ == "__main__":
    sys.exit(main())

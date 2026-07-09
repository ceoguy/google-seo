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
import urllib.request
import urllib.error

ROOT = pathlib.Path(__file__).resolve().parent.parent
DOCS = ROOT / "docs"
BASE = "https://developers.google.com"
UA = "Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/125.0 Safari/537.36"
TODAY = datetime.date.today().isoformat()


def fetch(url: str) -> str:
    req = urllib.request.Request(url, headers={"User-Agent": UA, "Accept-Language": "en-US,en"})
    with urllib.request.urlopen(req, timeout=45) as r:
        return r.read().decode("utf-8", "replace")


def strip_tags(html: str) -> str:
    """Minimal, dependency-free HTML -> markdown-ish text.

    ponytail: no bs4/html2text install. Good enough for a reference corpus that
    agents grep and read; upgrade to a real parser only if fidelity bites.
    """
    h = html
    # drop noise
    h = re.sub(r"<(script|style|svg|noscript)\b[^>]*>.*?</\1>", "", h, flags=re.S | re.I)
    h = re.sub(r"<devsite-[^>]*>|</devsite-[^>]*>", "", h, flags=re.I)
    # code blocks
    h = re.sub(r"<pre[^>]*>(.*?)</pre>", lambda m: "\n```\n" + re.sub(r"<[^>]+>", "", m.group(1)) + "\n```\n", h, flags=re.S | re.I)
    h = re.sub(r"<code[^>]*>(.*?)</code>", r"`\1`", h, flags=re.S | re.I)
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
    for a, b in [("&nbsp;", " "), ("&amp;", "&"), ("&lt;", "<"), ("&gt;", ">"), ("&quot;", '"'), ("&#39;", "'"), ("&mdash;", "—")]:
        h = h.replace(a, b)
    h = re.sub(r"\n{3,}", "\n\n", h)
    h = re.sub(r"[ \t]{2,}", " ", h)
    return h.strip()


def article_body(html: str) -> str:
    m = re.search(r'<div[^>]*class="[^"]*devsite-article-body[^"]*"[^>]*>(.*?)</article>', html, re.S | re.I)
    if not m:
        m = re.search(r"<article\b[^>]*>(.*?)</article>", html, re.S | re.I)
    return m.group(1) if m else html


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
    body = strip_tags(article_body(html))
    if len(body) < 200:
        return url, None, f"body too short ({len(body)} chars)"
    dest = out_path(url)
    dest.parent.mkdir(parents=True, exist_ok=True)
    fm = f"---\nsource: {url}\ntitle: {json.dumps(title_of(html))}\nfetched: {TODAY}\n---\n\n"
    dest.write_text(fm + body, encoding="utf-8")
    return url, str(dest.relative_to(ROOT)), None


def main():
    urls = [u.strip() for u in (ROOT / "urls.txt").read_text().splitlines() if u.strip() and not u.startswith("#")]
    print(f"fetching {len(urls)} pages -> {DOCS}")
    ok, fail = [], []
    with cf.ThreadPoolExecutor(max_workers=8) as ex:
        for url, dest, err in ex.map(one, urls):
            (fail if err else ok).append((url, err or dest))
            if err:
                print(f"  FAIL {url}: {err}", file=sys.stderr)
    print(f"\nwrote {len(ok)} / {len(urls)}  |  failed {len(fail)}")
    (ROOT / "fetch-report.json").write_text(json.dumps({"date": TODAY, "ok": len(ok), "failed": fail}, indent=2))
    return 1 if fail else 0


if __name__ == "__main__":
    sys.exit(main())

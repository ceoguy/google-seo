#!/usr/bin/env python3
"""Verify Google-attributed quotes against the corpus. Advisory review queue, not a gate.

WHY: retyping a quote from memory is how a paraphrase ends up inside quotation marks. Three review
rounds each caught one, and two of the hand-fixes introduced a NEW paraphrase while repairing the
old one. Hand-checking does not work. Check mechanically.

WHAT IT COVERS, HONESTLY:
  - Extracts quoted spans on lines that attribute to Google ("Google: ...", "Google warns: ...")
    or that cite a corpus path.
  - It does NOT understand English. It cannot distinguish our prose-in-quotes from Google's words,
    so it skips spans that look like markdown table cells, code, or our own labels (NOT_A_QUOTE
    below). That is its blind spot: a fabrication hidden inside one of those is invisible.
  - A span verifies if it appears verbatim in ANY corpus page. Matching it to the SPECIFIC page
    cited is a stricter check this tool does not attempt; the review agents do that.

Usage:
  python3 scripts/verify-quotes.py            # report unverified spans (exit 0; advisory)
  python3 scripts/verify-quotes.py --strict   # exit 1 if any span is unverified
  python3 scripts/verify-quotes.py --list     # print every span checked (audit the exclusions)
  python3 scripts/verify-quotes.py --self-test  # inject a known fabrication; assert we catch it
"""
import pathlib
import re
import sys

ROOT = pathlib.Path(__file__).resolve().parent.parent

ATTRIBUTION = re.compile(
    r"Google(?:\s+\w+){0,3}\s*(?:says|states|warns|calls|notes|is explicit|mandates|:)"
    r"|corpus says|verbatim:|quote:",
    re.I,
)
CITES_PATH = re.compile(r"docs/(?:search|crawling)/docs/")
# A line that DISCLAIMS a phrase asserts the phrase is absent; verifying it would invert the meaning.
DISCLAIMER = re.compile(r"does not use|UNKNOWN|not stated in corpus|nowhere in|folklore", re.I)
# Not Google's words: markdown table cells, robots/code snippets, our own labels.
NOT_A_QUOTE = re.compile(
    r"^\s*[\w\s]+\|"
    r"|^(User-agent|Disallow|Allow|Sitemap):"
    r"|^[\w.-]+\.(md|mjs|py|xml|txt|html)"
    r"|^https?://"
    r"|\*\*$|:$"
)


def norm(s: str) -> str:
    s = s.replace("’", "'").replace("“", '"').replace("”", '"')
    s = re.sub(r"\[([^\]]+)\]\([^)]*\)", r"\1", s)   # [text](url) -> text
    s = re.sub(r"\[([^\]]+)\]", r"\1", s)            # leftover [brackets]
    s = s.replace("`", "").replace("\\", "").replace('"', "")
    s = re.sub(r"\s+", " ", s)
    # link-stripping in the corpus leaves "paid links )" / "text ." -- tighten punctuation spacing
    s = re.sub(r"\s+([),.;:])", r"\1", s)
    return s.strip()


_pages = [p.read_text(errors="replace") for p in (ROOT / "docs").rglob("*.md")]
CORPUS = norm(" ".join(_pages))
# Per-file link collapse: Google embeds [text](url) mid-sentence, and a non-greedy link regex would
# chew across file boundaries if applied after joining.
CORPUS_DELINKED = " ".join(norm(re.sub(r"\[([^\]]+)\]\([^)]*\)", r"\1", pg)) for pg in _pages)

TARGETS = [ROOT / "SKILL.md", ROOT / "README.md", ROOT / "audit.mjs"] + sorted((ROOT / "references").glob("*.md"))


def check(files):
    bad, spans = [], []
    for f in files:
        if f.name == "COVERAGE.md" or not f.exists():
            continue
        for i, line in enumerate(f.read_text(errors="replace").split("\n"), 1):
            if DISCLAIMER.search(line):
                continue
            if not (ATTRIBUTION.search(line) or CITES_PATH.search(line)):
                continue
            for q in re.findall(r'"([^"]{25,})"', line):
                if NOT_A_QUOTE.search(q) or len(re.findall(r"[A-Za-z']{2,}", q)) < 4:
                    continue
                nq = norm(q).rstrip(",")
                spans.append((f.relative_to(ROOT), i, nq))
                probes = [nq, nq.rstrip(".")] + [
                    p.strip() for p in re.split(r"\s*\.\.\.\s*|\s*…\s*", nq) if len(p.strip()) > 15
                ]
                if not any(p in CORPUS or p in CORPUS_DELINKED for p in probes):
                    bad.append((f.relative_to(ROOT), i, nq))
    return bad, spans


if "--self-test" in sys.argv:
    # Inject the exact fabrication that survived three hand-reviews; assert the tool catches it.
    real = "aren't important to understanding the meaning of the page"
    fake = "aren't important to the content of the page"
    src = ROOT / "references" / "crawling.md"
    orig = src.read_text()
    if real not in orig:
        print("FAIL: the reference quote is missing; self-test cannot run")
        sys.exit(1)
    src.write_text(orig.replace(real, fake))
    try:
        bad, _ = check(TARGETS)
    finally:
        src.write_text(orig)
    caught = any("crawling.md" in str(p) for p, _, _ in bad)
    print(("PASS" if caught else "FAIL") + ": verifier detects a fabricated quote tail")
    sys.exit(0 if caught else 1)

bad, spans = check(TARGETS)
if "--list" in sys.argv:
    for p, i, q in spans:
        print(f"  {p}:{i}  {q[:90]}")
print(f"checked {len(spans)} attributed spans across {len(TARGETS)} files")
if bad:
    print(f"\n{len(bad)} span(s) NOT matched verbatim in docs/ — REVIEW EACH BY HAND:\n")
    for p, i, q in bad:
        print(f'  {p}:{i}\n    "{q[:110]}"\n')
    print("Not all of these are defects. The matcher cannot tell our own prose, markdown table")
    print("cells or elided quotes from Google's words, and its normalization is imperfect. Treat")
    print("this as a REVIEW QUEUE, not a verdict. --self-test proves it catches a real fabrication.")
    # Advisory by default: a noisy gate gets ignored, which is worse than no gate.
    sys.exit(1 if "--strict" in sys.argv else 0)
print("all attributed quotes verified verbatim against the corpus")

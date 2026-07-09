# Attribution

`docs/` is an unmodified-in-substance local fork of Google's Search Central documentation
(https://developers.google.com/search/docs), fetched by `scripts/fetch-docs.py` and converted
from HTML to Markdown. Each file's frontmatter records its `source:` URL and `fetched:` date.

Google states on those pages: "Except as otherwise noted, the content of this page is licensed
under the Creative Commons Attribution 4.0 License, and code samples are licensed under the
Apache 2.0 License."

This fork is redistributed under CC BY 4.0 with attribution to Google. It is a point-in-time
snapshot and is **not** authoritative — always defer to the live page linked in each file's
`source:` frontmatter. Google, Google Search, and Search Console are trademarks of Google LLC.
This project is not affiliated with or endorsed by Google.

Everything outside `docs/` (SKILL.md, audit.mjs, references/, scripts/) is original work,
MIT-licensed — see LICENSE.

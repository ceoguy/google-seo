# Security and abuse

What gets a site flagged by Safe Browsing or hit with a Security Issues report, and how to get out.
Sibling: `references/monitoring-and-analytics.md` (Search Console reports, user-generated spam).

## Hard requirements

- **Embedded third-party content is your problem.** "Embedded social engineering content is a policy
  violation for the host page." — `docs/search/docs/monitor-debug/security/social-engineering.md`.
  Ad slots and iframes you did not author still count against you.
- **Software you distribute must be honest about itself.** "Accurately inform users of a software's
  purpose and intent." And where behaviour affects the browser, "package these behaviors in clear
  language and don't frame them as insignificant." —
  `docs/search/docs/monitor-debug/security/malware.md`.
- **Repeat Offender status is a 30-day lockout.** "Sites that repeatedly switch between compliant
  and noncompliant behavior within a short window of time will be classified as Repeat Offenders."
  "Repeat Offender status persists for 30 days" before another review can be requested. —
  `docs/search/docs/monitor-debug/security/safe-browsing-repeat-offenders.md`.
  Practical consequence: do not request reconsideration until the root cause is actually gone.
  A cycle of clean/hacked/clean is treated worse than staying down.

## What social engineering means here

It is broader than phishing. The page qualifies if "the site tricks users into revealing their
personal information (for example, passwords, phone numbers, or social security numbers)" — and also
if it tricks them into installing software or acts deceptively about who operates it.
— `docs/search/docs/monitor-debug/security/social-engineering.md`

## Recommendations

- **Harden the machine you publish from, not just the server.** Google's first prevention item is
  that the "local workstation has up-to-date software, is clean from viruses, trojans, or similar
  malware." — `docs/search/docs/monitor-debug/security/prevent-malware.md`.
- **"Stay up-to-date with the latest software updates and patches."** Same page. It notes the problem
  "affects not only small sites."
- **Wire up Search Console notifications before you need them.** Malware detection surfaces there;
  the Security Issues report is the authoritative channel. —
  `docs/search/docs/monitor-debug/security/prevent-malware.md`, `.../social-engineering.md`.

## Ignored / myths

- **"It's only in an ad, so it isn't my content."** False, per the host-page quote above.
- **"I fixed it, so I can ask for review immediately, repeatedly."** That behaviour is what defines a
  Repeat Offender.
- Whether Safe Browsing flags affect *ranking* (as opposed to interstitial warnings and Search
  Console reports) is `UNKNOWN — not stated in corpus`.

## Auditable checks

1. `[handoff]` Search Console → Security Issues report is empty. Only Google can answer this.
2. `[handoff]` Site is not listed in Safe Browsing. Requires Google's data, not a crawl.
3. `[auto]` No mixed content / non-HTTPS origin (a hijack vector and a page-experience signal) —
   see `references/page-experience.md`.
4. `[handoff]` Third-party ad and embed inventory reviewed for social-engineering creatives; the
   host page owns the violation.
5. `[handoff]` Publishing workstations and CMS are patched; Search Console email alerts enabled.
6. `[handoff]` Before requesting reconsideration, confirm the root cause is removed — a compliant /
   noncompliant cycle triggers 30-day Repeat Offender status.

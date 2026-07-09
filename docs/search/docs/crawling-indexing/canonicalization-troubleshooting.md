---
source: https://developers.google.com/search/docs/crawling-indexing/canonicalization-troubleshooting
title: "Fix Canonicalization Issues"
fetched: 2026-07-08
---

# Fix canonicalization issues

 

 Use the
 [URL Inspection tool](https://support.google.com/webmasters/answer/9012289#google-selected-canonical)
 to check
 [which page Google considers canonical](https://developers.google.com/search/docs/crawling-indexing/canonicalization).
 Even if you explicitly designate a canonical page, Google might choose a different canonical
 for various reasons, such as the quality of the content. Before troubleshooting, think about
 whether the Google-selected canonical makes more sense than your preferred canonical URL for
 your users coming from Google Search.

 There are various reasons why the selected canonical URL differs from the canonical URL you'd
 prefer to see in Search. The most common issues are:

 Common canonicalization issues | 

 
 
## Language variants without localized annotations
 | 
 
 If you have multiple websites that serve substantially the same content localized to
 different users around the world, be sure to
 [follow our guidelines for localized sites](https://developers.google.com/search/docs/specialty/international).
 For example, if you have different sites for your English-speaking users in the United
 States, United Kingdom, and Australia respectively, but the content is the same, adding
 `hreflang` annotations to your pages can help the right pages surface for users
 in different regions.
 | 
 

 
 
## Incorrect canonical elements
 | 
 
 Some content management systems (CMS) or CMS plugins can make incorrect use of
 canonicalization techniques to point to undesired URLs. Check your HTML with your browser's
 developer tools to see if so. If your site is indicating an unexpected canonical URL
 preference, perhaps through incorrect use of `rel="canonical"` or a
 `3xx` redirect, contact your CMS provider and report this error to them.
 | 
 

 
 
## Misconfigured servers
 | 
 
 Some hosting misconfigurations may cause unexpected cross-domain URL selection. For example:
 
 
- 
 A server may be misconfigured to return content from `example.com` in
 response to a request for a URL on `other.example`
 
 
- 
 Two unrelated web servers may return identical
 [`soft 404` pages](https://developers.google.com/search/docs/crawling-indexing/troubleshoot-crawling-errors#soft-404-errors)
 that Google fails to identify as error pages. If you notice this is the case, get
 in touch with your hosting provider.
 
 

 | 
 

 
 
## Malicious hacking
 | 
 
 Some attacks on websites introduce code that returns an HTTP
 [`3xx` redirect](https://developers.google.com/search/docs/crawling-indexing/301-redirects)
 or inserts a cross-domain `rel="canonical"` `link` annotation
 into the HTML `<head>` or HTTP header, usually pointing to a URL
 hosting malicious or spammy content. In these cases, our algorithms may choose the
 malicious or spammy URL instead of the URL on the
 [compromised website](https://web.dev/articles/hacked).
 | 
 

 
 
## Syndicated content
 | 
 
 The canonical link element is not recommended for those who want to avoid duplication by
 syndication partners, because the pages are often very different. The most effective
 solution is for partners to block indexing of your content. For more, see
 [Avoid article duplication in Google News](https://support.google.com/news/publisher-center/answer/9606800),
 which also has advice about blocking syndicated content from Google Search.
 | 
 

 
 
## A copycat website
 | 
 
 In rare situations, our algorithm may select a URL from an external site that is hosting
 your content without your permission. If you believe that another site is duplicating
 your content in violation of copyright law, you may contact the site's host to request
 removal. In addition, you can request that Google remove the infringing page from our
 search results by
 [filing a request under the Digital Millennium Copyright Act](https://support.google.com/legal/answer/1120734).
 | 
 

 Keep in mind that if a canonical URL is in a Search Console property that you don't own, you won't
 be able to see any of the traffic for your duplicate page.

 
 
 
 

 
 
 

 
 
 
 
 
 
 
 
 

 
 
 
 Send feedback
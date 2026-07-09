---
source: https://developers.google.com/search/docs/crawling-indexing/amp/validate-amp
title: "Validate your AMP Pages"
fetched: 2026-07-08
---

# Validate your AMP content

 
After you've [created AMP content](https://developers.google.com/search/docs/guides/enhance-amp), here are
 some ways to validate your AMP content:

- Use the [AMP Test Tool](https://search.google.com/test/amp) to
ensure that your AMP content is valid.
 
- For [applicable AMP content types](https://developers.google.com/search/docs/guides/about-amp), use the [Rich Results Test](https://search.google.com/test/rich-results) to verify that your structured data parses properly.
 
- Use the [AMP status report](https://search.google.com/search-console/amp)
 to monitor the performance of all AMP pages on your site.

 
 
 
 

## Fix common AMP errors

If your AMP page doesn't appear in Google Search, try the following steps:

Note: It can take time for Google to index your AMP content.
 

- [Make your page
discoverable](https://www.ampproject.org/docs/guides/discovery) by linking your pages.
 
 
- Did you add `rel="amphtml"` to the canonical page?
 
- Did you add `rel="amphtml"` to other non-AMP pages (for example, mobile)?
 
- Did you add `rel="canonical"` to the AMP page?

 

 

- Follow the [Google Search guidelines for AMP pages](https://developers.google.com/search/docs/crawling-indexing/amp).

- Make your AMP content accessible to Googlebot:
 
 
- Edit your site's robots.txt to allow Googlebot to crawl the canonical page, AMP page, and
 links in the structured data (if applicable). 
 
- Remove all robots `meta` tags and `X-Robots-Tag` HTTP headers from your
canonical and AMP content. For more information, see [Robots `meta` tag and `X-Robots-Tag` HTTP header specifications](https://developers.google.com/search/docs/crawling-indexing/robots-meta-tag).
 

- Ensure that your structured data follows the structured data guidelines for
[your page and feature type](https://developers.google.com/search/docs/guides/search-gallery). For more information about structured data
requirements for AMP, see [About AMP on Google Search](https://developers.google.com/search/docs/guides/about-amp).

 

If your AMP page still isn't appearing in Google Search after completing the
 steps, here are some additional reasons:

- Certain Google Search features might not be available in your country.

- Your site might not be indexed yet. For more information about crawling and indexing, see the [Crawling and indexing FAQ](https://developers.google.com/search/help/crawling-index-faq).
 

## Resources

To debug validation errors, see the following [ampproject.org](https://www.ampproject.org/) resources:

- [AMP validation errors](https://www.ampproject.org/docs/reference/validation_errors)

- [How do I fix validation errors?](https://www.ampproject.org/docs/guides/validate#how-do-i-fix-validation-errors?)
 

 
 
 
 

 
 
 

 
 
 
 
 
 
 
 
 

 
 
 
 Send feedback
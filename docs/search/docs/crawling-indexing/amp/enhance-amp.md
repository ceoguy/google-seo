---
source: https://developers.google.com/search/docs/crawling-indexing/amp/enhance-amp
title: "Enhance AMP Content in Google Search"
fetched: 2026-07-08
---

# Enhance AMP content in Google Search

 
 
 You can enhance your [AMP](https://developers.google.com/amp) content in Google
 Search by creating a basic AMP page, adding structured data, monitoring your pages, and
 practicing with codelabs.
 

 
## Create a basic AMP page

 
 
- 
 [Create your first AMP page](https://www.ampproject.org/docs/get_started/create).
 
 
- 
 Follow the [Google Search guidelines for AMP pages](https://developers.google.com/search/docs/crawling-indexing/amp).
 
 
- 
 Make your content
 [discoverable by linking your pages](https://www.ampproject.org/docs/guides/discovery).
 For crawling and indexing, Google Search requires that an AMP page links to a
 [canonical page](https://developers.google.com/search/docs/crawling-indexing/consolidate-duplicate-urls). The
 canonical page can be either a non-AMP version of the page or it can be the AMP page itself.
 
 
- 
 Ensure that users can experience the same content and complete the same actions on AMP pages as
 on the corresponding canonical pages, where possible.
 
 
- 
 Use the [AMP Test Tool](https://search.google.com/test/amp) to ensure that your page
 meets the Google Search requirements for a valid AMP HTML document.
 
 
- 
 Use the same
 [structured data markup](https://developers.google.com/search/docs/appearance/structured-data/intro-structured-data) across both the
 canonical and AMP pages.
 
 
- 
 Apply common content best practices:
 
 
- Make sure that your [robots.txt file](https://developers.google.com/search/docs/crawling-indexing/robots/robots_txt) doesn't
 block your AMP page.
 Use [robots `meta` tags,
 `data-nosnippet`, and `X-Robots-Tag`](https://developers.google.com/search/docs/crawling-indexing/robots-meta-tag) where appropriate.
 
 
- 
 Follow the guidelines for
 [hreflang for language and regional URLs](https://developers.google.com/search/docs/specialty/international/localized-versions).
 For AMP specific examples, see
 [Internationalization](https://amp.dev/documentation/examples/guides/internationalization/).
 
 

 
 

 
## Create an AMP page using a CMS

If you serve your web content through a Content Management System (CMS), you can
use an existing CMS plugin (such as for [WordPress](https://wordpress.org/plugins/amp/), [Drupal](https://www.drupal.org/project/amp), or Joomla) or implement
custom functionality in your CMS to generate AMP content. If you intend to
customize your CMS, follow these guidelines in addition to [Create a basic AMP page](https://developers.google.com#create-basic-amp):

 

- Consider how AMP HTML files will fit your site's URL path scheme. If you're generating an AMP
 page in addition to a canonical non-AMP page, we recommend choosing one of the following URL schemes:
 
 
- https://www.example.com/myarticle/amp
 
- https://www.example.com/myarticle.amp.html
 

 

- Develop a structured data markup template. Here are some guidelines:
 
 
- Construct the template based on the requirements for the type of content
you are publishing.
 
- Refer to [AMP Project metadata examples](https://github.com/ampproject/amphtml/tree/main/examples/metadata-examples) for sample templates for recipes, articles, videos, and reviews.
 

 
 

## Optimize for rich results

You can use structured data to enhance the appearance of your page in search results. AMP pages with
 structured data can appear as a [rich result](https://developers.google.com/search/docs/appearance/structured-data/search-gallery),
 like the Top stories carousel or host carousel.

 
 
- [Implement structured data](https://developers.google.com/search/docs/appearance/structured-data/intro-structured-data).
 
- Verify that your structured data parses correctly by using the [Rich Results Test](https://search.google.com/test/rich-results).

- Verify your complete AMP setup by using the [AMP Test Tool](https://search.google.com/test/amp).
 

## Monitor and improve your pages

Periodically check all of your AMP pages by monitoring the following reports:

 

- [AMP status report](https://search.google.com/search-console/amp): Catch site
 templating and other site-wide implementation issues that can affect large numbers of your AMP
 pages.

- [Rich result status reports](https://support.google.com/webmasters/answer/7552505):
 Identify problems with your structured data and opportunities to provide additional structured
 data.
 

 If you need to stop serving your AMP pages from Google Search results, follow [Remove AMP from Google Search results](https://developers.google.com/search/docs/crawling-indexing/amp/remove-amp).

## Practice with codelabs

Here are some codelabs to practice building AMP pages:

 

- Learn how to build AMP pages with the [AMP
foundations codelab.](https://codelabs.developers.google.com/codelabs/accelerated-mobile-pages-foundations/)

- Add features like analytics, video embedding, social media integration, and
image carousels to your AMP pages with the [Advanced concepts codelab.](https://codelabs.developers.google.com/codelabs/accelerated-mobile-pages-advanced/#0)

- Build a [beautiful, interactive, and canonical AMP pages codelab](https://developers.google.com/codelabs/amp-beautiful-interactive-canonical#0) that incorporates many AMP
features and extended components.

- Use AMP components to build a [PWA](https://developers.google.com/web/progressive-web-apps)
experience with the [AMP+PWA codelab](https://amp.dev/documentation/guides-and-tutorials/integrate/integrate-with-apps/).
 

## Resources

Now that you've created your AMP pages, here are some resources for learning more about other Google
 product integrations for AMP:

 

- Learn how to [Create AMP ad
units.](https://support.google.com/adsense/answer/7183212)

- Learn how to [monetize your AMP pages](https://support.google.com/dfp_premium/topic/7178122).

- Use [Google Tag
Manager](https://support.google.com/tagmanager/answer/9205783) to optimize and measure marketing initiatives.

- Add [analytics to your AMP pages](https://developers.google.com/analytics/devguides/collection/amp-analytics) to track user interactions with built-in Google Analytics
support.
 

 
 
 
 

 
 
 

 
 
 
 
 
 
 
 
 

 
 
 
 Send feedback
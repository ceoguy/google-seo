---
source: https://developers.google.com/search/docs/fundamentals/get-started-developers
title: "SEO Guide for Web Developers"
fetched: 2026-07-08
---

# Get started with Search: a developer's guide

 
 
 Making your content search-friendly matters because it's how you get more relevant users viewing
 your content. This is called search engine optimization (SEO), which can result in more
 interested users coming to your site. If Google Search has trouble understanding your page,
 you're possibly missing out on an important source of traffic.
 

 
 This guide covers what developers can do to make sure that their sites work well with Google
 Search. In addition to the items in this guide, make sure that your site is
 [secure](https://web.dev/explore/secure),
 [fast](https://web.dev/explore/fast),
 [accessible to all](https://web.dev/explore/accessible), and
 [works on all devices](https://developers.google.com/search/docs/crawling-indexing/mobile/mobile-sites-mobile-first-indexing).

 For help that's not so technical, visit the
 [SEO starter guide](https://developers.google.com/search/docs/fundamentals/seo-starter-guide). The SEO
 starter guide covers other aspects of SEO, like authoring content.
 
## Find out how Google sees your site

 
 To get started, test your site in the [URL inspection tool](https://search.google.com/search-console) or
 [Rich Results Test](https://search.google.com/test/rich-results) to
 see how Google sees your site.
 [Googlebot is Google's web
 crawling bot](https://developers.google.com/search/docs/crawling-indexing/googlebot) that discovers new and updated pages for the Google index. For
 more information about the process, go to
 [How Google Search Works](https://developers.google.com/search/docs/fundamentals/how-search-works).

 
 You may be surprised to find that Google doesn't always see everything that you see in the
 browser. In the following example, Google doesn't know there are images on this page
 because the page uses a JavaScript feature that isn't supported by Google.
 

 
 
 User view
 Here's how a user views the page. Users can view the images and text in the browser.

 

 
 
 Google view
 Here's how Google views the page. Google doesn't know there are images on this page
 because the page uses a JavaScript feature that isn't supported by Google.

 

 
 

 
## Check your links

 
 Googlebot navigates from URL to URL by fetching and parsing links, sitemaps, and redirects. Googlebot
 treats every URL as if it's the first and only URL it has seen from your site. To make sure
 that Googlebot can find all the URLs on your site:
 

 
 
- Use [`<a>` elements that Google can crawl](https://developers.google.com/search/docs/crawling-indexing/links-crawlable#crawlable-links).
 Ensure that all pages on the site can be reached by a link from another findable page. Make
 sure the referring link includes either text or, for images, an alt
 attribute, that is relevant to the target page.
 
- [Build and submit a sitemap](https://developers.google.com/search/docs/crawling-indexing/sitemaps/build-sitemap)
 to help Googlebot more intelligently crawl your site. A sitemap is a file where
 you provide information about the pages, videos, and other files on your site, and the
 relationships between them.
 
- For JavaScript apps that have only one HTML page, make sure that each screen or piece of
 individual content has a URL.
 

 
## Check how you're using JavaScript

 
 While Google does run JavaScript, there are some differences and limitations that you need
 to account for when designing your pages and applications to accommodate how crawlers access
 and render your content.

 Learn more about the [basics of JavaScript SEO](https://developers.google.com/search/docs/guides/javascript-seo-basics) or how to [fix
 Search-related JavaScript problems](https://developers.google.com/search/docs/guides/fix-search-javascript).
 

 
 To learn more about how Google handles JavaScript when crawling, rendering, and indexing, see the following video.
 

 
 
 

 
## Keep Google updated when content changes

 
 To make sure that Google finds your new or updated pages quickly:
 

 
 
- [Submit sitemaps](https://developers.google.com/search/docs/crawling-indexing/sitemaps/build-sitemap).
 
- [Ask Google to recrawl your
 URLs](https://developers.google.com/search/docs/crawling-indexing/ask-google-to-recrawl).
 

 If you're still having trouble getting your page indexed, check your server logs for errors.
 

 
## Don't forget about the words on the page

 
 Googlebot can only find content that is textually visible. For example, text in videos is
 invisible to Googlebot. To make sure that Google Search understands what your page is about:
 

 
 
- Make sure that your visual content is expressed in text form.
 For example, a product category page that contains a list of images of shirts with no textual
 context about each image is suboptimal. The product category page should include some
 textual explanation for each image.
 
- Make sure that every page has a
 [descriptive title](https://developers.google.com/search/docs/appearance/title-link#page-titles) and
 [meta description](https://developers.google.com/search/docs/appearance/snippet#meta-descriptions).
 Unique titles and meta descriptions help Google show how your
 pages are relevant to users, which in turn can increase your search traffic.
 
- Use semantic HTML. While Google indexes HTML, PDF content, images,
 and videos, it doesn't index content that requires plugins (for example, Java or Silverlight)
 or content that is rendered in a canvas. Instead of using a plugin, use semantic HTML markup
 for your content whenever possible.
 
- 
 Make sure your text content is accessible in the
 [DOM.
 For example, content that is added via the CSS `content` property](https://developer.mozilla.org/en-US/docs/Web/API/Document_Object_Model/Introduction)
 is not part of the DOM and Google Search ignores it at the moment. It's fine to use the `content` property for decorative content; Google Search may not index this content.
 
 

 
## Tell Google about other versions of your content

 
 Google doesn't automatically know that there are multiple versions of your site or content. For
 example, a mobile and desktop version, or international versions of your site. To make sure
 that Google serves the right version to users, you can:
 

 
 
- [Consolidate duplicate
 URLs](https://developers.google.com/search/docs/crawling-indexing/consolidate-duplicate-urls).
 
- [Tell
 Google about localized versions of your site](https://developers.google.com/search/docs/specialty/international/localized-versions).
 
- [Make your AMP pages
 discoverable](https://www.ampproject.org/docs/fundamentals/discovery).
 

 
## Control what content Google sees

 
 There are several ways to block Googlebot:

 
 
- To block Google from finding your page, restrict access to your content to logged in
 users (for example, use a login page or
 [password-protect your
 page](https://developers.google.com/search/docs/crawling-indexing/control-what-you-share)).
 
- To block Googlebot from crawling your page,
 [create a robots.txt](https://developers.google.com/search/docs/crawling-indexing/robots/create-robots-txt).
 A robots.txt is not a mechanism for keeping a web page out of Google. To
 keep a web page out of Google, use the `noindex` robots rules, or
 [password-protect](https://developers.google.com/search/docs/crawling-indexing/control-what-you-share) your page.
 
 
 
- To block Google from indexing your page but still allow crawling,
 [add a
 `noindex` tag](https://developers.google.com/search/docs/crawling-indexing/robots-meta-tag#noindex).
 Combining multiple crawling and indexing rules might cause some
 rules to counteract other rules. Learn how to configure these rules properly
 by reading
 [Combining crawling with indexing / serving rules](https://developers.google.com/search/docs/crawling-indexing/robots-meta-tag#combining).
 
 

 If your content isn't showing up in Google Search and you want it to show up, follow these
 steps:

 
 
- Check if Googlebot can access the page with the
 [URL inspection tool](https://support.google.com/webmasters/answer/9012289).
 
 
- [Test your robot.txt](https://support.google.com/webmasters/answer/6062598)
 file to see if you're unintentionally blocking Googlebot from crawling your
 site.
 
- Check your HTML for `noindex` rules in `meta` tags.
 

 
## Enable rich results for your site

 
 A rich result can include styling, images, or other interactive features that can help your
 site stand out more in Search results. You can help Google understand your page better and
 show rich results for it in Search by providing explicit clues about the meaning of a page
 [with structured data on the page](https://developers.google.com/search/docs/appearance/structured-data/intro-structured-data). If
 you're not sure where to start, [explore our gallery of available features](https://developers.google.com/search/docs/guides/search-gallery).
 

 

 
 
 
 

 
 
 

 
 
 
 
 
 
 
 
 

 
 
 
 Send feedback
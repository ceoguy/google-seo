---
source: https://developers.google.com/search/docs/crawling-indexing/troubleshoot-crawling-errors
title: "Troubleshoot Google Search Crawling Errors"
fetched: 2026-07-08
---

# Troubleshoot Google Search crawling errors

 
Here are the key steps to troubleshooting and fixing Google Search crawling issues for your site:

 
- [See if Googlebot is encountering availability issues on your
 site](https://developers.google.com#availability_issues).
 
- [See whether you have pages that aren't being crawled, but
 should be](https://developers.google.com#not_crawled_should_be).
 
- [See whether any parts of your site need to be crawled more quickly than
 they already are.](https://developers.google.com#updates)
 
- [Improve your site's crawl efficiency.](https://developers.google.com#improve_crawl_efficiency)
 
- [Handle overcrawling of your site](https://developers.google.com#emergencies).

## See if Googlebot is encountering availability issues on your site

Improving your site availability won't necessarily increase your crawl budget; Google
 determines the best crawl rate based on the crawl demand, as described previously. However,
 availability issues do prevent Google from crawling your site as much as it might want to.

Diagnosing:

 Use the [Crawl Stats report](https://support.google.com/webmasters/answer/9679690)
 to see Googlebot's crawling history for your site. The report shows when Google encountered
 availability issues on your site. If availability errors or warnings are reported for your site,
 look for instances in the Host availability graphs where Googlebot requests exceeded the
 red limit line, click into the graph to see which URLs were failing, and try to correlate
 those with issues on your site.

 Additionally, you can also use the
 [URL Inspection Tool](https://support.google.com/webmasters/answer/9012289)
 to test a few URLs on your site. If the tool returns
 [Hostload exceeded](https://support.google.com/webmasters/answer/9012289#live_indexable&zippy=%2Cadditional-response-data%2Curl-status-live-test%2Csite-wide-availability-issues%2Cavailability-live-test)
 warnings, that means that Googlebot can't crawl as many URLs from your site as it discovered.

Treating:

- Read the [documentation
 for the Crawl Stats report](https://support.google.com/webmasters/answer/9679690) to learn how to find and handle some availability issues.

- Block pages from crawling if you don't want them to be crawled. (See [manage
 your inventory](https://developers.google.com/crawling/docs/crawl-budget#manage_inventory))

- Increase page loading and rendering speed. (See [Improve
 your site's crawl efficiency](https://developers.google.com#improve_crawl_efficiency))

- Increase your server capacity. If Google consistently seems to be crawling
 your site at its serving capacity limit, but you still have important URLs that aren't being
 crawled or updated as much as they need, having more serving resources might enable Google to
 request more pages on your site. Check your host availability history in the
 [Crawl Stats
 report](https://support.google.com/webmasters/answer/9679690) to see if Google's crawl rate seems to be crossing the limit line often. If so,
 increase your serving resources for a month and see whether crawling requests increased during
 that same period.

## See if any parts of your site are not crawled, but should be

Google spends as much time as necessary on your site in order to index all the high-quality,
 user-valuable content that it can find. If you think that Googlebot is missing important
 content, either it doesn't know about the content, the content is blocked from Google, or your
 site availability is throttling Google's access (or Google is trying not to overload your site).

Remember the difference between crawling and indexing.
 This page is about helping Google crawl your site efficiently, not whether the pages
 found make it into the index.
Diagnosing:

Search Console doesn't provide a crawl history for your site that can be filtered by URL or
 path, but you can inspect your site logs to see whether specific URLs have been crawled by
 [Googlebot](https://developers.google.com/search/docs/crawling-indexing/overview-google-crawlers). Whether or
 not those crawled URLs have been indexed is another story.

Remember that for most sites, new pages will take several days minimum to be noticed; most
 sites shouldn't expect same-day crawling for URLs, with the exception of time-sensitive sites
 such as news sites.

Treating:

If you are adding pages to your site and they are not being crawled in a reasonable amount of
 time, either Google doesn't know about them, the content is blocked, your site has reached its
 maximum serving capacity, or you are [out of crawl budget](https://developers.google.com/crawling/docs/crawl-budget#more-crawl-budget).

- Tell Google about your new pages: update your sitemaps to reflect new URLs.

- Examine your robots.txt rules to confirm that you're not accidentally blocking pages.

- Review your crawling priorities (a.k.a. use your crawl budget wisely). [Manage
 your inventory](https://developers.google.com/crawling/docs/crawl-budget#manage_inventory) and [improve your site's crawling efficiency](https://developers.google.com#improve_crawl_efficiency).

- [Check that you're not running out of serving capacity](https://developers.google.com#availability_issues).
 Googlebot will scale back its crawling if it detects that your servers are having trouble
 responding to crawl requests.

Note that pages might not be shown in search results, even if crawled, if there isn't
 sufficient value or user demand for the content.

## See if updates are crawled quickly enough

If we're missing new or updated pages on your site, perhaps it's because we haven't seen them,
 or haven't noticed that they are updated. Here is how you can help us be aware of page
 updates.

Note that Google strives to check and index pages in a reasonably timely manner. For most
 sites, this is three days or more. Don't expect Google to index pages the same day that you
 publish them unless you are a news site or have other high-value, extremely time-sensitive
 content.

Diagnosing:

Examine your site logs to see when specific URLs were crawled by [Googlebot](https://developers.google.com/search/docs/crawling-indexing/overview-google-crawlers).

To learn the indexing date, use the URL Inspection tool or do a search for URLs that
 you updated.

Treating:

Do:

- Use a [news sitemap](https://developers.google.com/search/docs/crawling-indexing/sitemaps/news-sitemap) if your site
 has news content.

- Use the `<lastmod>` tag in sitemaps to indicate when an indexed URL has
 been updated.

- Use a [crawlable URL structure](https://developers.google.com/search/docs/crawling-indexing/url-structure) to help Google find your pages.

- Provide standard, [crawlable `<a>` links](https://developers.google.com/search/docs/crawling-indexing/links-crawlable#crawlable-links)
 to help Google find your pages.

- If your site uses separate HTML for mobile and desktop versions, provide the same set of links
 on the mobile version as you have on the desktop version. If it's not possible to provide the
 same set of links on the mobile version, ensure that they're included in a
 [sitemap](https://developers.google.com/search/docs/crawling-indexing/sitemaps/overview) file.
 Google only
 [indexes the
 mobile version](https://developers.google.com/search/docs/crawling-indexing/mobile/mobile-sites-mobile-first-indexing) of pages, and limiting the links shown there
 can slow down discovery of new pages.

Avoid:

- Submitting the same, unchanged sitemap multiple times per day.

- Expecting that Googlebot will crawl everything in a sitemap, or crawl them immediately.
 Sitemaps are useful suggestions to Googlebot, not absolute requirements.

- Including URLs in your sitemaps that [you don't want to appear in Search](https://developers.google.com#hide_urls).
 This can waste your crawl budget on pages that you don't want indexed.

## Improve your site's crawl efficiency

### Increase your page loading speed

 Google's crawling is limited by bandwidth, time, and availability of Googlebot instances.
 If your server responds to requests quicker, we might be able to crawl more pages on your
 site. That said, Google only wants to crawl high quality content, so just making low
 quality pages faster won't encourage Googlebot to crawl more of your site; conversely, if we
 think that we're missing high-quality content on your site, we'll probably increase your
 budget to crawl that content.

Here's how you can optimize your pages and resources for crawling:

- Prevent large but unimportant resources from being loaded by Googlebot using robots.txt.
 Be sure to block only non-critical resources—that is, resources that aren't important to
 understanding the meaning of the page (such as decorative images).

- Make sure that your pages are fast to load.

- Watch out for long redirect chains, which have a negative effect on crawling.

- Both the time to respond to server requests, as well as the time needed to render pages,
 matters, including load and run time for embedded resources such as images and scripts. Be
 aware of large or slow resources required for indexing.

### Specify content changes with HTTP status codes

 Google generally supports the
 [`If-Modified-Since` and `If-None-Match` HTTP request headers](https://developer.mozilla.org/docs/Web/HTTP/Headers/If-Modified-Since)
 for crawling. Google's crawlers don't send the headers with all crawl attempts; it depends on
 the use case of the request (for example,
 [AdsBot](https://developers.google.com/search/docs/crawling-indexing/overview-google-crawlers#adsbot) is more
 likely to set the `If-Modified-Since` and `If-None-Match` HTTP request
 headers). If our crawlers send the `If-Modified-Since` header, the header's value
 is the [date and time](https://www.rfc-editor.org/rfc/rfc9110#name-if-modified-since)
 the content was last crawled. Based on that value, the server may choose to return a
 `304 (Not Modified)` HTTP status code with no response body, in which case Google
 will reuse the content version it crawled the last time. If the content is newer than the date
 specified by the crawler in the `If-Modified-Since` header, the server can return a
 `200 (OK)` HTTP status code with the response body.

 Independently of the request headers, you can send a `304 (Not Modified)` HTTP
 status code and no response body for any Googlebot request if the content hasn't changed since
 Googlebot last visited the URL. This will save your server processing time and resources,
 which may indirectly improve crawl efficiency.

## Hide URLs that you don't want in search results

 Wasting server resources on unnecessary pages can reduce crawl activity from pages that are
 important to you, which may cause a significant delay in discovering great new or updated
 content on a site.

 Blocking or hiding already crawled pages from recrawls won't shift your crawl budget to
 another part of your site unless Google is already hitting your site's serving limits.

 Exposing many URLs on your site that you don't want crawled by Search can negatively affect a
 site's crawling and indexing. Typically these URLs fall into the following categories:

- 
 [Faceted navigation](https://developers.google.com/search/docs/crawling-indexing/crawling-managing-faceted-navigation)
 and [session identifiers](https://developers.google.com/search/blog/2007/09/google-duplicate-content-caused-by-url):
 Faceted navigation is typically duplicate content from the site; session identifiers and
 other URL parameters that simply sort or filter the page don't provide new content. Learn how to
 [manage crawling of faceted navigation pages](https://developers.google.com/search/docs/crawling-indexing/crawling-managing-faceted-navigation).

- [Duplicate content](https://developers.google.com/search/docs/crawling-indexing/consolidate-duplicate-urls):
 Help Google identify duplicate content to avoid unnecessary crawling.

- [`soft 404` pages](https://developers.google.com#soft-404-errors): Return a `404`
 code when a page no longer exists.

- [Hacked pages](https://developers.google.com/search/docs/monitor-debug/security/what-is-hacked): Be sure to check
 the [Security
 Issues report](https://search.google.com/search-console/security-issues) and fix or remove any hacked pages you find.

- [Infinite spaces](https://developers.google.com/search/blog/2008/08/to-infinity-and-beyond-no) and proxies:
 Block these from crawling with robots.txt.

- [Low quality and spam content](https://developers.google.com/search/docs/essentials/spam-policies):
 Good to avoid, obviously.

- Shopping cart pages, infinite scrolling pages, and pages that perform an action (such as
 "sign up" or "buy now" pages).

Do:

- Use robots.txt if you don't want Google to crawl a resource or page at all.

- If a common resource is reused on multiple pages (such as a shared image or JavaScript
 file), reference the resource from the same URL in each page, so that Google can cache and
 reuse the same resource without needing to request the same resource multiple times.

Avoid:

- Don't add or remove pages or directories from robots.txt regularly as a way of reallocating
 crawl budget for your site. Use robots.txt only for pages or resources that
 you don't want to appear on Google for the long run.

- Don't rotate sitemaps or use other temporary hiding mechanisms to reallocate budget.

### `soft 404` errors

 A `soft 404` error is when a URL that returns a page telling the user that the page does
 not exist and also a
 [`200 (success)`](https://en.wikipedia.org/wiki/List_of_HTTP_status_codes#2xx_Success)
 status code. In some cases, it might be a page with no main content or empty page.

 Such pages may be generated for various reasons by your website's web server or content
 management system, or the user's browser. For example:

 
- A missing server-side include file.
 
- A broken connection to the database.
 
- An empty internal search result page.
 
- An unloaded or otherwise missing JavaScript file.

 It's a bad user experience to return a `200 (success)` status code, but then
 display or suggest an error message or some kind of error on the page. Users may think the
 page is a live working page, but then are presented with some kind of error. Such pages are
 excluded from Search.

 When Google's algorithms detect that the page is actually an error page based on its content,
 Search Console will show a `soft 404` error in the site's
 [Page Indexing report](https://support.google.com/webmasters/answer/7440203).

#### Fix `soft 404` errors

 Depending on the state of the page and the outcome you want, you can solve `soft 404`
 errors in multiple ways:

 
- [The page and content are no longer available.](https://developers.google.com#pagegone)
 
- [The page or content is now somewhere else.](https://developers.google.com#pagemoved)
 
- [The page and content still exist.](https://developers.google.com#pageother)

 Try to determine which solution would be the best for your users.

##### The page and content are no longer available

 If you removed the page and there's no replacement page on your site with similar content,
 return a
 [`404 (not found)` or `410 (gone)`](https://en.wikipedia.org/wiki/List_of_HTTP_status_codes#4xx_Client_errors)
 response (status) code for the page. These status codes indicate to search engines that the
 page doesn't exist and you don't want search engines to index the page.

 If you have access to your server's configuration files, you can make these error pages useful
 to users by customizing them. A good custom `404` page helps people find the
 information they're looking for, and also provides other helpful content that encourages
 people to explore your site further. Here are some tips for designing a useful custom
 `404` page:

 
- 
 Tell visitors clearly that the page they're looking for can't be found. Use language that is
 friendly and inviting.
 
- 
 Make sure your `404` page has the same look and feel (including navigation) as
 the rest of your site.
 
- 
 Consider adding links to your most popular articles or posts, as well as a link to your
 site's home page.
 
- Think about providing a way for users to report a broken link.

 Custom `404` pages are created solely for users. Since these pages are useless from
 a search engine's perspective, make sure the server returns a `404` HTTP status
 code to prevent having the pages indexed.

##### The page or content is now somewhere else

 If your page has moved or has a clear replacement on your site, return a
 [`301 (permanent redirect)`](https://developers.google.com/search/docs/crawling-indexing/301-redirects)
 to redirect the user. This won't interrupt their browsing experience and it's also a great
 way to tell search engines about the new location of the page. Use the
 [URL Inspection tool](https://support.google.com/webmasters/answer/9012289)
 to verify whether your URL is actually returning the correct code.

##### The page and content still exist

 If an otherwise good page was flagged with a `soft 404` error, it's likely it
 didn't load properly for Googlebot, it was missing critical resources, or it displayed a
 prominent error message during rendering. Use the
 [URL Inspection tool](https://support.google.com/webmasters/answer/9012289)
 to examine the rendered content and the returned HTTP code. If the rendered page is blank,
 nearly blank, or the content has an error message, it could be that your page references many
 resources that can't be loaded (images, scripts, and other non-textual elements), which can be
 interpreted as a `soft 404`.
 Reasons that resources can't be loaded include blocked resources (blocked by
 [robots.txt](https://developers.google.com/search/docs/crawling-indexing/robots/intro)), having too many
 resources on a page, various server errors, or slow loading or very large resources.

## Handle overcrawling of your site (emergencies)

Googlebot has algorithms to prevent it from overwhelming your site with crawl requests.
 However, if you find that Googlebot is overwhelming your site, there are a few things you can
 do.

Diagnosing:

Monitor your server for excessive Googlebot requests to your site.

Treating:

In an emergency, we recommend the following steps to slow down an overwhelming crawl from
 Googlebot:

- Return `503` or `429` HTTP response status codes temporarily for Googlebot requests when your
 server is overloaded. Googlebot will retry these URLs for about 2 days. Note that returning
 "no availability" codes for more than a few days will cause Google to permanently slow or
 stop crawling URLs on your site, so follow the additional next steps.

- 
 When the crawl rate goes down, stop returning `503` or `429` HTTP
 response status codes for crawl requests; returning `503` or `429` for
 more than 2 days will cause Google to drop those URLs from the index.

- Monitor your crawling and your host capacity over time.

- 
 If the problematic crawler is one of the
 [AdsBot crawlers](https://developers.google.com/search/docs/crawling-indexing/google-special-case-crawlers#adsbot-mobile-web),
 the problem is likely that you have created
 [Dynamic Search Ad targets](https://support.google.com/google-ads/answer/2497706)
 for your site that Google is trying to crawl. This crawl will reoccur every 3 weeks. If you don't
 have the server capacity to handle these crawls, either limit your ad targets or get increased
 serving capacity.

 
 
 
 

 
 
 

 
 
 
 
 
 
 
 
 

 
 
 
 Send feedback
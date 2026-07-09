---
source: https://developers.google.com/crawling/docs/crawlers-fetchers/reduce-crawl-rate
title: "Reduce Google Crawl Rate"
fetched: 2026-07-08
---

# Reduce the Google crawl rate

 

 Google's crawler infrastructure has sophisticated algorithms to determine the optimal crawl rate
 for a site. Our goal is to crawl as many pages from your site as we can on each visit without
 overwhelming your server. In some cases, Google's crawling of your site might be causing a
 critical load on your infrastructure, or cause unwanted costs during an outage. To alleviate this,
 you may decide to reduce the number of requests made by Google's crawlers.

## Understand the cause of the sharp increase in crawling

 Sharp increase in crawling may be caused by inefficiencies in your site's structure or issues with
 your site otherwise. Based on the reports we've received in the past, the most common causes are:

 
- 
 Inefficient configuration of URLs on the site, which is typically casued by a specific
 functionality of the site:
 
 
- Faceted navigation or other sorting and filtering functionality of the site
 
- A calendar with a lot of URLs for specific dates
 

 
 
- 
 [A Dynamic Search Ad target](https://developers.google.com/search/docs/crawling-indexing/troubleshoot-crawling-errors#adsbot)
 

 We strongly recommend that you check with your hosting company and look at recent access logs of
 your server to understand the source of the traffic, and see if it fits in the aformentioned
 common causes of the sharp increase in crawling. Then, check our guides about
 [managing crawling of faceted navigation URLs](https://developers.google.com/search/docs/crawling-indexing/crawling-managing-faceted-navigation)
 and
 [optimizing crawling efficiency](https://developers.google.com/search/docs/crawling-indexing/troubleshoot-crawling-errors#improve_crawl_efficiency).

## Urgently reduce crawler traffic (for emergencies)

 Warning: When considering reducing the Google's crawl rate, keep in mind that this will
 have broad effects. For Search, Googlebot will discover fewer new pages, and existing pages will
 be refreshed less frequently (for example, prices and product availability may take longer to be
 reflected in Search), and removed pages may stay in the index longer. For Google Ads, your
 campaigns may be cancelled or paused, and your ads may not serve.

 If you need to urgently reduce the crawl rate for short period of time (for example, a couple
 of hours, or 1-2 days), then return `500`, `503`, or `429` HTTP
 response status code instead of `200` to the crawl requests. Google's crawling
 infrastructure reduces your site's crawling rate when it encounters a significant number of URLs
 with `500`, `503`, or `429` HTTP response status codes (for
 example, if you
 [disabled your website](https://developers.google.com/search/docs/crawling-indexing/pause-online-business)).
 The reduced crawl rate affects the whole hostname of your site (for example,
 `subdomain.example.com`), both the crawling of the URLs that return errors, as well as
 the URLs that return content. Once the number of these errors is reduced, the crawl rate will
 automatically start increasing again.

 Warning: We don't recommend that you do this for a long period of time (meaning, longer
 than 1-2 days) as it may have a negative effect on how your site appears in Google products. For
 example, in case of Search, if Googlebot observes these status codes on the same URL for multiple
 days, the URL may be dropped from Google's index.

## Exceptional requests to reduce crawl rate

 If serving errors to Google's crawlers is not feasible on your infrastructure,
 [file a special request](https://search.google.com/search-console/googlebot-report)
 to report a problem with unusually high crawl rate, mentioning the optimal rate for your site in
 your request. You cannot request an increase in crawl rate, and it may take several days for the
 request to be evaluated and fulfilled.

 
 

 
 

 

 
 
 
 
 
 
 
 
 

 
 
 
 Send feedback
---
source: https://developers.google.com/search/docs/crawling-indexing/site-move-no-url-changes
title: "Changing Your Web Hosting and SEO"
fetched: 2026-07-08
---

# Changing your hosting

 

 Follow this guide to minimize the impact of changing your site's hosting infrastructure on
 the site's performance in Google Search. A change in hosting infrastructure means switching
 hosting providers or moving to a content distribution network (CDN). This guide is only for
 migrations that don't affect the user-visible URL.

 Changing the URLs? If you're making visible URL changes, start with
 [Site moves with URL changes](https://developers.google.com/search/docs/crawling-indexing/site-move-with-url-changes).

## Overview

 
- 
 [Prepare the new hosting infrastructure](https://developers.google.com#hosting-infrastructure).
 Upload your content to the new servers or configure your CDN and your origin servers, and
 test it.
 
 
- 
 [Start the site move](https://developers.google.com#start-site-move). Change the DNS settings of your
 domain name to point to the new hosting infrastructure. This step is the actual site move
 step that starts the process of sending your traffic to the new infrastructure.
 
 
- 
 [Monitor traffic](https://developers.google.com#monitor). Keep tabs on the traffic served by the old
 and new hosting.
 
 
- 
 [Shut down](https://developers.google.com#shut-down-old-hosting). Shut down the old hosting
 infrastructure when you're confident that all users, including Googlebot, are receiving
 content correctly from the new infrastructure and no one is using the old infrastructure.
 

## Prepare the new hosting infrastructure

This section covers steps to take before you start the actual infrastructure move.

### Copy and test your new site

 First, upload a copy of your site to your new hosting provider. What a "copy of your website"
 means depends entirely on your old content management platform; it may be actual HTML files
 that you replicate on your new hosting platform, or a database export that you have to
 import in the new location. Once you do that, verify that it works as expected by thoroughly
 testing all aspects of how your users interact with your site. Here are a few suggestions:

 
- 
 Create a testing environment, perhaps with IP-restricted access, through which you
 test all of the features before the website goes live.
 
 
- 
 Open your new site in a web browser and review all elements of your site: pages,
 images, forms, and downloads (such as PDF files).
 
 
- 
 Allow for public testing with a temporary hostname for your new infrastructure (like
 `beta.example.com`) so you can test accessibility by browsers. A temporary
 hostname can help you test whether Googlebot can reach your site or not. To prevent
 accidentally letting the test site get indexed, add the
 [`noindex` `robots` rule](https://developers.google.com/search/docs/crawling-indexing/block-indexing)
 to the HTML or the HTTP headers of your pages.
 

### Check that Googlebot is able to access the new hosting infrastructure

 If you don't already have a Search Console account,
 [create a new account](https://support.google.com/webmasters/answer/34592)
 for your site to help you monitor Google access and traffic. If you created a temporary
 hostname for your new site, verify that property as well. Check that Googlebot can access your
 new infrastructure using the
 [URL Inspection Tool](https://support.google.com/webmasters/answer/9012289)
 in Search Console.

 Caution: Check your firewall configuration or denial of service (DoS) protection. Make
 sure it does not block Googlebot's ability to reach the DNS or the hosting provider's servers.
 [Learn how to verify Googlebot](https://developers.google.com/search/docs/crawling-indexing/verifying-googlebot#use-automatic-solutions).

### Lower the TTL value for your DNS records

 You can help make your site move go faster if you lower your site DNS records' TTL value,
 which will allow the new settings to propagate to ISPs faster. DNS settings are usually cached
 by ISPs based on the specified
 [Time to Live (TTL) setting](https://wikipedia.org/wiki/Time_to_live#DNS_records).
 Consider lowering the TTL to a conservative low value (for example, a few hours) at least a
 week in advance of the move to refresh DNS caches faster.

### Review Search Console verification

Make sure your Search Console verification will continue to work after the hosting move.

 If you're using the
 [HTML file method](https://support.google.com/webmasters/answer/9008080#html_verification)
 to verify ownership of your site in Search Console, make sure you don't forget to include your
 current verification file in your new copy of the site.

 Likewise, if you include in your content management system's (CMS) templates a
 [`meta` tag](https://support.google.com/webmasters/answer/9008080#meta_tag_verification)
 or
 [Google Analytics](https://support.google.com/webmasters/answer/9008080#google_analytics_verification)
 to verify ownership, ensure the new CMS copy includes these as well.

## Start the move

The move process is as follows.

 
- 
 Remove any temporary blocks to crawling. While building the new copy of a site, some
 site owners use a robots.txt file to disallow all crawling by Googlebot and other crawlers,
 or use `noindex` `meta` tags or HTTP headers to block indexing of
 content. Be sure to remove any such blocks from the new copy of the site when you're ready
 to start the move.
 
 
- 
 Update the DNS settings. You start the move by updating the DNS records to point to
 the new hosting provider. Check with your DNS provider for how to do that.
 

## Monitor traffic

To monitor that your infrastructure change is going smoothly:

 
- 
 Keep an eye on the server logs on both new and old servers.

 As DNS setting propagates and the site traffic moves, you'll notice a drop in traffic
 logged on the old servers and a corresponding increase in traffic on the new servers.
 
 
- 
 Use different public DNS checking tools.

 Check that different ISPs around the world are updating to your new DNS settings correctly.
 
 
- 
 Monitor crawling.

 Monitor the
 [Index coverage](https://support.google.com/webmasters/answer/7440203)
 graphs in Search Console.
 

### A note about Googlebot's crawl rate

 When you change hosting infrastructure, it's normal to see a temporary drop in Googlebot's
 crawl rate immediately after the launch, followed by a steady increase over the next few
 days, potentially to rates that may be higher than before the move.

 This fluctuation occurs because we determine crawl rate for a site based on many signals, and
 these signals change when your hosting changes. As long as Googlebot doesn't encounter any
 serious problems or slowdowns when accessing your new serving infrastructure, it will try to
 crawl your site as fast as necessary and possible.

## Shut down old hosting

 Check the server logs on the old provider and, once the traffic to the old provider reaches
 zero, you can shut down your old hosting infrastructure. This completes the hosting change.

 
 
 
 

 
 
 

 
 
 
 
 
 
 
 
 

 
 
 
 Send feedback
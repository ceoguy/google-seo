---
source: https://developers.google.com/search/docs/appearance/enable-web-stories
title: "Enable Web Stories on Google"
fetched: 2026-07-08
---

# Enable Web Stories on Google

 

 Web Stories are a web-based version of the popular "Stories" format that blend video, audio,
 images, animation and text to create a dynamic consumption experience. This visual format
 lets you explore content at your own pace by tapping through it, or swiping from one piece of
 content to the next.

 This guide explains how to make your Web Stories eligible to appear on Google Search (including
 [Discover](https://developers.google.com/search/docs/appearance/google-discover)).

If you're a creator, check out
 [these resources on creating stories](https://amp.dev/about/stories),
 without any coding involved.

 Here's an overview of how to enable Web Stories on Google:

 
- [Create the Web Story](https://developers.google.com#create).
 
- [Make sure the Web Story is valid AMP](https://developers.google.com#valid-amp).
 
- [Verify the metadata](https://developers.google.com#metadata).
 
- [Check if the Web Story is indexed](https://developers.google.com#indexed).
 
- Follow the [Web Story Content Policies](https://developers.google.com/search/docs/guides/web-stories-content-policy).

## Feature availability

 Web Stories can appear as a single result on Google Search, which is available in all
 regions and languages where Google Search is available.

 In the Discover feed, Web Stories can appear as a single card where you can tap through the
 story. While this appearance is available in all regions and languages where Google Discover is
 available, it's most likely to appear in the United States, India, and Brazil.

## Create the Web Story

 Web Stories are web pages under the hood and must follow the same guidelines and best practices
 that apply to publishing regular web pages. There are two ways to get started:

 
- Pick one of several [Story editor tools](https://amp.dev/documentation/tools/stories/) to start creating stories without any coding involved.
 
- If you have engineering resources, you can
 [get started with AMP](https://amp.dev/about/stories). To ensure
 your Web Story renders appropriately, we suggest using
 [Chrome Developer Tools](https://developers.google.com/web/tools/chrome-devtools/device-mode#device)
 to simulate different device sizes and formats.

 To ensure a smooth process, review the [Best practices for creating Web Stories](https://developers.google.com/search/docs/guides/web-stories-creation-best-practices).

 
 

## Make sure the Web Story is valid AMP

 After you've developed the story, make sure the Web Story is valid AMP. A
 valid AMP story adheres to various
 [AMP specifications](https://amp.dev/documentation/guides-and-tutorials/learn/webstory_technical_details/).
 This provides optimal performance and the best experience. You can use the
 following tools to check that your Web Story is valid AMP:

 
- [Web Stories Google Test
 Tool](https://search.google.com/test/amp): Check that the Web Story is valid.
 
- [URL Inspection Tool](https://support.google.com/webmasters/answer/9012289): Check
 that the Web Story is valid AMP and the Google indexing status of a URL.
 
- [AMP Linter](https://github.com/ampproject/amp-toolbox/tree/main/packages/linter):
 Validate Web Stories during development using the command line.

## Verify metadata

 To make your Web Stories eligible to appear on Google Search or Google
 Discover, supply the necessary metadata so your Web Story appears correctly
 in the preview.

 
- Refer to the [full list of metadata](https://amp.dev/documentation/components/amp-story/#metadata-guidelines).
 
- Verify that your Web Story preview appears correctly in the [Web Stories Google Test Tool](https://search.google.com/test/amp).

 Remember that the following fields are required on every Web Story: `publisher-logo-src`,
 `poster-portrait-src`, `title`, and `publisher`.

## Check if the Web Story is indexed

 Check to see if Google Search has indexed your Web Story. Use the
 [URL Inspection Tool](https://support.google.com/webmasters/answer/9012289)
 to submit individual URLs or review status using
 [Page Indexing report](https://developers.google.com/search/docs/crawling-indexing/ask-google-to-recrawl)
 or
 [Sitemaps report](https://support.google.com/webmasters/answer/7440203).
 If your Web Story isn't indexed:

 
- To make it easier for Google to discover your Web Story, link to your Web Stories from
 your site or add your Web Story URL to your sitemap.
 
- All Web Stories must be canonical. Make sure that each Web Story has a
 [`link rel="canonical"`](https://amp.dev/documentation/guides-and-tutorials/optimize-and-measure/discovery/)
 to itself. For example: `<link rel="canonical" href="https://www.example.com/url/to/webstory.html">`
 If there are multiple versions of the same story in different
 languages, make sure to [tell Google about localized versions](https://developers.google.com/search/docs/specialty/international/localized-versions).
 
 
 
- Check that the Web Story URL isn't
 [blocked from Googlebot](https://developers.google.com/search/docs/crawling-indexing) in
 your robots.txt file or by a `noindex` tag.

 
 
 
 

 
 
 

 
 
 
 
 [Next
 
 Best practices for creating Web Stories
 
 
 arrow_forward](https://developers.google.com/search/docs/appearance/web-stories-creation-best-practices)
 

 

 

 
 
 
 
 
 
 
 
 

 
 
 
 Send feedback
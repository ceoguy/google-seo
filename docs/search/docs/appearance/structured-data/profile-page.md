---
source: https://developers.google.com/search/docs/appearance/structured-data/profile-page
title: "Profile Page (ProfilePage) Schema Markup"
fetched: 2026-07-08
---

# Profile page (`ProfilePage`) structured data

 

`ProfilePage` markup is designed for any site where creators (either people or
 organizations) share first-hand perspectives. Adding this markup helps Google Search understand
 the creators that post in an online community, and show better content from that community in
 search results, including the [Discussions and Forums](https://blog.google/products/search/google-search-discussions-forums-news/) feature.

Other structured data features can link to pages with `ProfilePage` markup too. For example,
 [Article](https://developers.google.com/search/docs/appearance/structured-data/article)
 and [Recipe](https://developers.google.com/search/docs/appearance/structured-data/recipe) structured data have authors,
 and there are often several authors present in [discussion forum](https://developers.google.com/search/docs/appearance/structured-data/discussion-forum)
 and [Q&A page](https://developers.google.com/search/docs/appearance/structured-data/qapage) structured data.

 
## How to add structured data

 Structured data is a standardized format for providing information about a page and classifying the page
 content. If you're new to structured data, you can learn more about
 [how structured data works](https://developers.google.com/search/docs/appearance/structured-data/intro-structured-data).
 

 
 Here's an overview of how to build, test, and release structured data.

 
 
- Add the [required properties](https://developers.google.com#structured-data-type-definitions). Based on the
 format you're using, learn where to [insert structured data on the page](https://developers.google.com/search/docs/appearance/structured-data/intro-structured-data#format-placement).
 
 Using a CMS? It may be easier to use a plugin that's integrated into your CMS.
 

 Using JavaScript? Learn how to
 [generate structured data with JavaScript](https://developers.google.com/search/docs/appearance/structured-data/generate-structured-data-with-javascript).
 
 
- Follow the [guidelines](https://developers.google.com#guidelines).
 
- Validate your code using the
 [Rich Results Test](https://search.google.com/test/rich-results)
 and fix any critical errors. Consider also fixing any non-critical issues that may be flagged
 in the tool, as they can help improve the quality of your structured data (however, this isn't necessary to be eligible for rich results). 
 
- Deploy a few pages that include your structured data and use the [URL Inspection tool](https://support.google.com/webmasters/answer/9012289) to test how Google sees the page. Be sure that your page is
 accessible to Google and not blocked by a robots.txt file, the `noindex` tag, or
 login requirements. If the page looks okay, you can
 [ask Google to recrawl your URLs](https://developers.google.com/search/docs/crawling-indexing/ask-google-to-recrawl).
 Note: Allow time for re-crawling and re-indexing. Remember that it
 may take several days after publishing a page for Google to find and crawl it.
 
 
- To keep Google informed of future changes, we recommend that you
 [submit a sitemap](https://developers.google.com/search/docs/crawling-indexing/sitemaps/build-sitemap). You can automate this with the
 [Search Console Sitemap API](https://developers.google.com/webmaster-tools/v1/sitemaps).
 

 

## Examples

Here's an example of a profile page with markup:

 
 JSON-LD
 <html>
 <head>
 <title>Angelo Huff on Cool Forum Platform</title>
 <script type="application/ld+json">
 {
 "@context": "https://schema.org",
 "@type": "ProfilePage",
 "dateCreated": "2024-12-23T12:34:00-05:00",
 "dateModified": "2024-12-26T14:53:00-05:00",
 "mainEntity": {
 "@type": "Person",
 "name": "Angelo Huff",
 "alternateName": "ahuff23",
 "identifier": "123475623",
 "interactionStatistic": [{
 "@type": "InteractionCounter",
 "interactionType": "https://schema.org/FollowAction",
 "userInteractionCount": 1
 },{
 "@type": "InteractionCounter",
 "interactionType": "https://schema.org/LikeAction",
 "userInteractionCount": 5
 }],
 "agentInteractionStatistic": {
 "@type": "InteractionCounter",
 "interactionType": "https://schema.org/WriteAction",
 "userInteractionCount": 2346
 },
 "description": "Defender of Truth",
 "image": "https://example.com/avatars/ahuff23.jpg",
 "sameAs": [
 "https://www.example.com/real-angelo",
 "https://example.com/profile/therealangelohuff"
 ]
 }
 }
 </script>
 </head>
 <body>
 </body>
</html>
 

 

```
<html>
 <head>
 <title>Angelo Huff on Cool Forum Platform</title>
 <script type="application/ld+json">
 {
 "@context": "https://schema.org",
 "@type": "ProfilePage",
 "dateCreated": "2024-12-23T12:34:00-05:00",
 "dateModified": "2024-12-26T14:53:00-05:00",
 "mainEntity": {
 "@type": "Person",
 "name": "Angelo Huff",
 "alternateName": "ahuff23",
 "identifier": "123475623",
 "interactionStatistic": [{
 "@type": "InteractionCounter",
 "interactionType": "https://schema.org/FollowAction",
 "userInteractionCount": 1
 },{
 "@type": "InteractionCounter",
 "interactionType": "https://schema.org/LikeAction",
 "userInteractionCount": 5
 }],
 "agentInteractionStatistic": {
 "@type": "InteractionCounter",
 "interactionType": "https://schema.org/WriteAction",
 "userInteractionCount": 2346
 },
 "description": "Defender of Truth",
 "image": "https://example.com/avatars/ahuff23.jpg",
 "sameAs": [
 "https://www.example.com/real-angelo",
 "https://example.com/profile/therealangelohuff"
 ]
 }
 }
 </script>
 </head>
 <body>
 </body>
</html>
```
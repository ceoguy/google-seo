---
source: https://developers.google.com/search/docs/appearance/structured-data/video
title: "Video (VideoObject, Clip, BroadcastEvent) Schema Markup"
fetched: 2026-07-08
---

# Video (`VideoObject`, `Clip`, `BroadcastEvent`) structured data

 
While Google tries to automatically understand details about your video, you can influence the
 information that's shown in video results, such as the description, thumbnail URL, upload date, and duration, by marking up
 your video with [`VideoObject`](https://developers.google.com#video-object). Adding video structured data
 to your [watch pages](https://developers.google.com/search/docs/appearance/video#watch-page) can also make it easier
 for Google to find your video. Videos can appear in several different places on Google, including
 the main search results page, Video mode, Google Images, and
 [Google Discover](https://developers.google.com/search/docs/appearance/google-discover).

 Based on how you mark up your watch page, your videos may also be eligible for the following
 specific video features:

 Video features | 
 
 
 LIVE badge: Get a LIVE badge added to your video by marking your video with
 [`BroadcastEvent`](https://developers.google.com#broadcast-event). The LIVE badge can be applied to
 any public video that is live-streamed for any length of time. Here are a few examples:

 
 
- Sporting events
 
- Awards shows
 
- Influencer videos
 
- Live streaming video games
 

 
 Make sure you follow the [LIVE badge guidelines](https://developers.google.com#livestream-guidelines) and use
 the [Indexing API](https://developers.google.com/search/apis/indexing-api/v3/quickstart) to make sure
 Google crawls your page at the right time.
 

 | 
 
 
 | 
 

 
 
 
 Key moments
 

 
 
 The key moments feature is a way for users to navigate video segments like chapters in a book,
 which can help users engage more deeply with your content. Google Search tries to automatically
 detect the segments in your video and show key moments to users, without any effort on your
 part. Alternatively, you can tell Google about the important points of your video. We
 will prioritize key moments set by you, either through structured data or the YouTube description.
 

 
 
- If your video is embedded on your web page or you're running a video platform, there are two ways that you can enable key moments:
 
 
- [`Clip` structured data](https://developers.google.com/search/docs/appearance/structured-data/video#clip):
 Specify the exact start and end time to each segment, and what label to display for each
 segment. This is supported in all languages where Google Search is available.
 
- [`SeekToAction` structured data](https://developers.google.com/search/docs/appearance/structured-data/video#seek):
 Tell Google where timestamps typically go in your URL structure, so that Google can
 automatically identify key moments and link users to those points within the video. This
 is supported for the following languages: English, Spanish, Portuguese, Italian, Chinese,
 French, Japanese, German, Turkish, Korean, Dutch, and Russian.
 
 

 
 
- If your video is hosted on YouTube, you can specify the exact timestamps and labels
 in the video description on YouTube. Check out the
 [best practices for marking timestamps in YouTube descriptions](https://developers.google.com/search/docs/appearance/structured-data/video#best-practices-youtube).
 This is supported in all languages where Google Search is available. If you want to enable
 Video Chapters on YouTube, follow these
 [additional guidelines](https://support.google.com/youtube/answer/9884579).
 
 

 To opt out of the key moments feature completely (including any efforts Google may make to show
 key moments automatically for your video), use the
 [`nosnippet`](https://developers.google.com/search/docs/appearance/snippet#nosnippet) `meta` tag.
 

 | 
 
 
 | 
 

 
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

### Standard video result

Here's an example of a single [`VideoObject`](https://developers.google.com#video-object).

 
 JSON-LD
 <html>
 <head>
 <title>Introducing the self-driving bicycle in the Netherlands</title>
 <script type="application/ld+json">
 {
 "@context": "https://schema.org",
 "@type": "VideoObject",
 "name": "Introducing the self-driving bicycle in the Netherlands",
 "description": "This spring, Google is introducing the self-driving bicycle in Amsterdam, the world's premier cycling city. The Dutch cycle more than any other nation in the world, almost 900 kilometres per year per person, amounting to over 15 billion kilometres annually. The self-driving bicycle enables safe navigation through the city for Amsterdam residents, and furthers Google's ambition to improve urban mobility with technology. Google Netherlands takes enormous pride in the fact that a Dutch team worked on this innovation that will have great impact in their home country.",
 "thumbnailUrl": [
 "https://example.com/photos/1x1/photo.jpg",
 "https://example.com/photos/4x3/photo.jpg",
 "https://example.com/photos/16x9/photo.jpg"
 ],
 "uploadDate": "2024-03-31T08:00:00+08:00",
 "duration": "PT1M54S",
 "contentUrl": "https://www.example.com/video/123/file.mp4",
 "embedUrl": "https://www.example.com/embed/123",
 "interactionStatistic": {
 "@type": "InteractionCounter",
 "interactionType": { "@type": "WatchAction" },
 "userInteractionCount": 5647018
 },
 "regionsAllowed": ["US", "NL"]
 }
 </script>
 </head>
 <body>
 </body>
</html>
 

 

```
<html>
 <head>
 <title>Introducing the self-driving bicycle in the Netherlands</title>
 <script type="application/ld+json">
 {
 "@context": "https://schema.org",
 "@type": "VideoObject",
 "name": "Introducing the self-driving bicycle in the Netherlands",
 "description": "This spring, Google is introducing the self-driving bicycle in Amsterdam, the world's premier cycling city. The Dutch cycle more than any other nation in the world, almost 900 kilometres per year per person, amounting to over 15 billion kilometres annually. The self-driving bicycle enables safe navigation through the city for Amsterdam residents, and furthers Google's ambition to improve urban mobility with technology. Google Netherlands takes enormous pride in the fact that a Dutch team worked on this innovation that will have great impact in their home country.",
 "thumbnailUrl": [
 "https://example.com/photos/1x1/photo.jpg",
 "https://example.com/photos/4x3/photo.jpg",
 "https://example.com/photos/16x9/photo.jpg"
 ],
 "uploadDate": "2024-03-31T08:00:00+08:00",
 "duration": "PT1M54S",
 "contentUrl": "https://www.example.com/video/123/file.mp4",
 "embedUrl": "https://www.example.com/embed/123",
 "interactionStatistic": {
 "@type": "InteractionCounter",
 "interactionType": { "@type": "WatchAction" },
 "userInteractionCount": 5647018
 },
 "regionsAllowed": ["US", "NL"]
 }
 </script>
 </head>
 <body>
 </body>
</html>
```
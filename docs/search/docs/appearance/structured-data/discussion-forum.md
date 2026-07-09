---
source: https://developers.google.com/search/docs/appearance/structured-data/discussion-forum
title: "Discussion Forum (DiscussionForumPosting, SocialMediaPosting) Schema Markup"
fetched: 2026-07-08
---

# Discussion forum (`DiscussionForumPosting`) structured data

 

Discussion forum markup is designed for any forum-style site where people collectively share
 first-hand perspectives. When forum sites add this markup, Google Search can better identify online
 discussions across the web and make use of this markup in features such as
 [Discussions and Forums](https://blog.google/products/search/google-search-discussions-forums-news/).

Does your forum follow a question and answer pattern?
 Use [Q&A markup](https://developers.google.com/search/docs/appearance/structured-data/qapage) instead.

## How to use `DiscussionForumPosting` within a forum

In general, we recommend nesting comments under the post they relate to.
 If the forum has its own threading structure, use a tree of comments to represent its structure:

```
{
 "@context": "https://schema.org",
 "@type": "DiscussionForumPosting",
 "headline": "Very Popular Thread",
 ...
 "comment": [{
 "@type": "Comment",
 "text": "This should not be this popular",
 ...
 "comment": [{
 "@type": "Comment",
 "text": "Yes it should",
 ...
 }]
 }]
}
```

If it's more linear in nature (for example, an original post followed by a series of replies),
 nest them all under the original post as comments. Ideally, later pages of content in multi-page forums
 include the original post with the main page URL:

 

```
{
 // JSON-LD on non-threaded forum at https://example.com/post/very-popular-thread/14
 "@context": "https://schema.org",
 "@type": "DiscussionForumPosting",
 "headline": "Very Popular Thread", // Only the headline/topic is explicitly present
 "url": "https://example.com/post/very-popular-thread",
 ...
 "comment": [{
 "@type": "Comment",
 "text": "First Post on this Page",
 ...
 },{
 "@type": "Comment",
 "text": "Second Post on this Page",
 ...
 }]
}
```

If the URL is primarily about a single post, use [`mainEntity`](https://schema.org/mainEntity)
 (or [`mainEntityOfPage`](https://schema.org/mainEntityOfPage)) to identify the primary
 `DiscussionForumPosting`:

 

```
{
 "@context": "https://schema.org",
 "@type": "WebPage",
 "url": "https://example.com/post/very-popular-thread",
 "mainEntity": {
 "@type": "DiscussionForumPosting"
 ...
 }
}
```

For web pages that have a list of posts (for example, on a profile, topic, or category page),
 it's common that they don't have all the information present on the same page and require the user
 to click to get the extra information (like replies). It's up to you whether you choose to include
 only the information that is present on the page (and include the URL to the discussion-specific
 posting).

Don't mark one post on the page as a main entity if it's not a discussion page for the
 post. To show that pages are a related set of posts, it might be useful to attach them
 all to a
 [`Collection`](https://schema.org/Collection)
 or [`ItemList`](https://schema.org/ItemList) .

 
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

The following markup example shows a non-threaded, linear forum page:

 
 JSON-LD
 <html>
 <head>
 <title>I went to the concert!</title>
 <script type="application/ld+json">
 {
 "@context": "https://schema.org",
 "@type": "DiscussionForumPosting",
 "mainEntityOfPage": "https://example.com/post/very-popular-thread",
 "headline": "I went to the concert!",
 "text": "Look at how cool this concert was!",
 "video": {
 "@type": "VideoObject",
 "contentUrl": "https://example.com/media/super-cool-concert.mp4",
 "name": "Video of concert",
 "uploadDate": "2024-03-01T06:34:34+02:00",
 "thumbnailUrl": "https://example.com/media/super-cool-concert-snap.jpg"
 },
 "url": "https://example.com/post/very-popular-thread",
 "author": {
 "@type": "Person",
 "name": "Katie Pope",
 "url": "https://example.com/user/katie-pope",
 "agentInteractionStatistic": {
 "@type": "InteractionCounter",
 "interactionType": "https://schema.org/WriteAction",
 "userInteractionCount": 8
 }
 },
 "datePublished": "2024-03-01T08:34:34+02:00",
 "interactionStatistic": {
 "@type": "InteractionCounter",
 "interactionType": "https://schema.org/LikeAction",
 "userInteractionCount": 27
 },
 "comment": [{
 "@type": "Comment",
 "text": "Who's the person you're with?",
 "author": {
 "@type": "Person",
 "name": "Saul Douglas",
 "url": "https://example.com/user/saul-douglas",
 "agentInteractionStatistic": {
 "@type": "InteractionCounter",
 "interactionType": "https://schema.org/WriteAction",
 "userInteractionCount": 167
 }
 },
 "datePublished": "2024-03-01T09:46:02+02:00"
 },{
 "@type": "Comment",
 "text": "That's my mom, isn't she cool?",
 "author": {
 "@type": "Person",
 "name": "Katie Pope",
 "url": "https://example.com/user/katie-pope",
 "agentInteractionStatistic": {
 "@type": "InteractionCounter",
 "interactionType": "https://schema.org/WriteAction",
 "userInteractionCount": 8
 }
 },
 "datePublished": "2024-03-01T09:50:25+02:00",
 "interactionStatistic": {
 "@type": "InteractionCounter",
 "interactionType": "https://schema.org/LikeAction",
 "userInteractionCount": 7
 }
 }]
 }
 </script>
</head>
<body>
</body>
</html>
 

 

```
<html>
 <head>
 <title>I went to the concert!</title>
 <script type="application/ld+json">
 {
 "@context": "https://schema.org",
 "@type": "DiscussionForumPosting",
 "mainEntityOfPage": "https://example.com/post/very-popular-thread",
 "headline": "I went to the concert!",
 "text": "Look at how cool this concert was!",
 "video": {
 "@type": "VideoObject",
 "contentUrl": "https://example.com/media/super-cool-concert.mp4",
 "name": "Video of concert",
 "uploadDate": "2024-03-01T06:34:34+02:00",
 "thumbnailUrl": "https://example.com/media/super-cool-concert-snap.jpg"
 },
 "url": "https://example.com/post/very-popular-thread",
 "author": {
 "@type": "Person",
 "name": "Katie Pope",
 "url": "https://example.com/user/katie-pope",
 "agentInteractionStatistic": {
 "@type": "InteractionCounter",
 "interactionType": "https://schema.org/WriteAction",
 "userInteractionCount": 8
 }
 },
 "datePublished": "2024-03-01T08:34:34+02:00",
 "interactionStatistic": {
 "@type": "InteractionCounter",
 "interactionType": "https://schema.org/LikeAction",
 "userInteractionCount": 27
 },
 "comment": [{
 "@type": "Comment",
 "text": "Who's the person you're with?",
 "author": {
 "@type": "Person",
 "name": "Saul Douglas",
 "url": "https://example.com/user/saul-douglas",
 "agentInteractionStatistic": {
 "@type": "InteractionCounter",
 "interactionType": "https://schema.org/WriteAction",
 "userInteractionCount": 167
 }
 },
 "datePublished": "2024-03-01T09:46:02+02:00"
 },{
 "@type": "Comment",
 "text": "That's my mom, isn't she cool?",
 "author": {
 "@type": "Person",
 "name": "Katie Pope",
 "url": "https://example.com/user/katie-pope",
 "agentInteractionStatistic": {
 "@type": "InteractionCounter",
 "interactionType": "https://schema.org/WriteAction",
 "userInteractionCount": 8
 }
 },
 "datePublished": "2024-03-01T09:50:25+02:00",
 "interactionStatistic": {
 "@type": "InteractionCounter",
 "interactionType": "https://schema.org/LikeAction",
 "userInteractionCount": 7
 }
 }]
 }
 </script>
</head>
<body>
</body>
</html>
```
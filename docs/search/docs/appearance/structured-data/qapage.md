---
source: https://developers.google.com/search/docs/appearance/structured-data/qapage
title: "Schema for Q&amp;A Pages (QAPage)"
fetched: 2026-07-08
---

# Q&A (`QAPage`) structured data

 

Q&A pages are web pages that contain data in a question and answer format, which is one question
 followed by its answers. For content that represents a question and its
 answers, you can mark up your data with the [schema.org](https://schema.org/) `QAPage`, `Question`, and `Answer` types.

Properly marked up pages are eligible to have a rich result displayed on the search results
 page. This rich treatment helps your site reach the right users on Search.
 For example, you might see a rich result for the user query "How do I remove a cable that is
 stuck in a USB port?" if the page has been marked up with answers to that question.

 In addition to enabling your content for the rich result treatment, marking up
 your Q&A page helps Google generate a better
 [snippet](https://developers.google.com/search/docs/appearance/snippet) for your page.
 The content from the answers may appear in the basic result if the rich
 result is not shown.

 
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

The following markup example includes the `QAPage`, `Question`,
 and `Answer` type definitions in JSON-LD: 

 
 
 JSON-LD
 <html>
 <head>
 <title>How many ounces are there in a pound?</title>
 <script type="application/ld+json">
 {
 "@context": "https://schema.org",
 "@type": "QAPage",
 "mainEntity": {
 "@type": "Question",
 "name": "How many ounces are there in a pound?",
 "text": "I have taken up a new interest in baking and keep running across directions in ounces and pounds. I have to translate between them and was wondering how many ounces are in a pound?",
 "answerCount": 3,
 "upvoteCount": 26,
 "datePublished": "2024-02-14T15:34-05:00",
 "author": {
 "@type": "Person",
 "name": "Mary Stone",
 "url": "https://example.com/profiles/mary-stone"
 },
 "acceptedAnswer": {
 "@type": "Answer",
 "text": "1 pound (lb) is equal to 16 ounces (oz).",
 "image": "https://example.com/images/conversion-chart.jpg",
 "upvoteCount": 1337,
 "url": "https://example.com/question1#acceptedAnswer",
 "datePublished": "2024-02-14T16:34-05:00",
 "author": {
 "@type": "Person",
 "name": "Julius Fernandez",
 "url": "https://example.com/profiles/julius-fernandez"
 }
 },
 "suggestedAnswer": [
 {
 "@type": "Answer",
 "text": "Are you looking for ounces or fluid ounces? If you are looking for fluid ounces there are 15.34 fluid ounces in a pound of water.",
 "upvoteCount": 42,
 "url": "https://example.com/question1#suggestedAnswer1",
 "datePublished": "2024-02-14T15:39-05:00",
 "author": {
 "@type": "Person",
 "name": "Kara Weber",
 "url": "https://example.com/profiles/kara-weber"
 },
 "comment": {
 "@type": "Comment",
 "text": "I'm looking for ounces, not fluid ounces.",
 "datePublished": "2024-02-14T15:40-05:00",
 "author": {
 "@type": "Person",
 "name": "Mary Stone",
 "url": "https://example.com/profiles/mary-stone"
 }
 }
 }, {
 "@type": "Answer",
 "text": " I can't remember exactly, but I think 18 ounces in a lb. You might want to double check that.",
 "upvoteCount": 0,
 "url": "https://example.com/question1#suggestedAnswer2",
 "datePublished": "2024-02-14T16:02-05:00",
 "author": {
 "@type": "Person",
 "name": "Joe Cobb",
 "url": "https://example.com/profiles/joe-cobb"
 }
 }
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
 <title>How many ounces are there in a pound?</title>
 <script type="application/ld+json">
 {
 "@context": "https://schema.org",
 "@type": "QAPage",
 "mainEntity": {
 "@type": "Question",
 "name": "How many ounces are there in a pound?",
 "text": "I have taken up a new interest in baking and keep running across directions in ounces and pounds. I have to translate between them and was wondering how many ounces are in a pound?",
 "answerCount": 3,
 "upvoteCount": 26,
 "datePublished": "2024-02-14T15:34-05:00",
 "author": {
 "@type": "Person",
 "name": "Mary Stone",
 "url": "https://example.com/profiles/mary-stone"
 },
 "acceptedAnswer": {
 "@type": "Answer",
 "text": "1 pound (lb) is equal to 16 ounces (oz).",
 "image": "https://example.com/images/conversion-chart.jpg",
 "upvoteCount": 1337,
 "url": "https://example.com/question1#acceptedAnswer",
 "datePublished": "2024-02-14T16:34-05:00",
 "author": {
 "@type": "Person",
 "name": "Julius Fernandez",
 "url": "https://example.com/profiles/julius-fernandez"
 }
 },
 "suggestedAnswer": [
 {
 "@type": "Answer",
 "text": "Are you looking for ounces or fluid ounces? If you are looking for fluid ounces there are 15.34 fluid ounces in a pound of water.",
 "upvoteCount": 42,
 "url": "https://example.com/question1#suggestedAnswer1",
 "datePublished": "2024-02-14T15:39-05:00",
 "author": {
 "@type": "Person",
 "name": "Kara Weber",
 "url": "https://example.com/profiles/kara-weber"
 },
 "comment": {
 "@type": "Comment",
 "text": "I'm looking for ounces, not fluid ounces.",
 "datePublished": "2024-02-14T15:40-05:00",
 "author": {
 "@type": "Person",
 "name": "Mary Stone",
 "url": "https://example.com/profiles/mary-stone"
 }
 }
 }, {
 "@type": "Answer",
 "text": " I can't remember exactly, but I think 18 ounces in a lb. You might want to double check that.",
 "upvoteCount": 0,
 "url": "https://example.com/question1#suggestedAnswer2",
 "datePublished": "2024-02-14T16:02-05:00",
 "author": {
 "@type": "Person",
 "name": "Joe Cobb",
 "url": "https://example.com/profiles/joe-cobb"
 }
 }
 ]
 }
 }
 </script>
 </head>
 <body>
 </body>
</html>
```
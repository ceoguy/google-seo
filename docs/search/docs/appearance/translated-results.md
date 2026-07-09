---
source: https://developers.google.com/search/docs/appearance/translated-results
title: "Translated Google Search Results"
fetched: 2026-07-08
---

# Translated results in Google Search

 
 
 Google Search strives to make information accessible and useful to all users. To help address
 content and perspective gaps when a user searches in their local language, sometimes Google may translate the
 title link and snippet of a search result for results that aren't in the language of the search
 query, when available. Translated results enable people to view results from other languages in
 their language, and can help publishers reach a larger audience.
 

 
 
 
## Feature availability

 
 Currently, Google may translate results into the following languages: Arabic, Bengali, English,
 French, German, Gujarati, Hindi, Indonesian, Kannada, Korean, Malayalam, Marathi, Persian,
 Portuguese, Spanish, Tamil, Telugu, Thai, Turkish, Urdu, Vietnamese. It's available on mobile and desktop.
 

 
## How translated results work

 
 If the user clicks the translated title link, they're presented with a page that's been machine translated.
 Users also have an option to view the original search result, and access the entire page in the original language.
 

 
 Google doesn't host any translated pages. Opening a page through a translated result is no
 different than opening the original search result through [Google Translate](https://support.google.com/translate/answer/2534559)
 or using [Chrome in-browser translation](https://support.google.com/chrome/answer/173424).
 This means that Javascript on the page is usually supported, as well as embedded images and other
 page features.
 

 If you run an ad network, you may need to take additional action to ensure
 that your ad network displays correctly after a user clicks a translated result. Learn more
 about [enabling your ad network to work with
 translation-related Google Search features](https://developers.google.com/search/docs/appearance/ad-network-and-translation).
 
## Monitor performance in Search Console

 
 To monitor clicks and impressions for translated results, you can use the
 [Search Appearance filter](https://support.google.com/webmasters/answer/7576553#zippy=%2Csearch-appearance)
 in the [Performance report](https://support.google.com/webmasters/answer/7576553).
 

 
## Opting in or out of translated results

 
 This feature is applicable across all pages and results based on the user's language. You don't
 need to do anything to opt in.
 

 
 Translated results are like other translation-related features in Google Search. To opt out of
 all translation features in Google Search, use the
 [`notranslate` rule](https://developers.google.com/search/docs/crawling-indexing/robots-meta-tag#notranslate),
 which can be implemented as a `meta` tag or an HTTP header:
 

```
<!-- opt out of translation features on all search engines that support this rule -->
<meta name="robots" content="notranslate">
```

```
<!-- opt out of translation features on Google -->
<meta name="googlebot" content="notranslate">
```

 Alternatively, you can specify the rule as an HTTP response header:

```
HTTP/1.1 200 OK
Date: Tue, 25 May 2010 21:42:43 GMT
(...)
X-Robots-Tag: notranslate
(...)
```

 
 
 
 

 
 
 

 
 
 
 
 
 
 
 
 

 
 
 
 Send feedback
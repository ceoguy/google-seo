---
source: https://developers.google.com/search/docs/appearance/structured-data/paywalled-content
title: "Subscription and Paywalled Content Markup"
fetched: 2026-07-08
---

# Structured data for subscription and paywalled content (`CreativeWork`)

 

 This page describes how to use schema.org JSON-LD to indicate paywalled content on your site
 with
 [`CreativeWork`](https://schema.org/CreativeWork)
 properties. This structured data helps Google differentiate paywalled content from the
 practice of [cloaking](https://developers.google.com/search/docs/essentials/spam-policies#cloaking), which
 violates [spam policies](https://developers.google.com/search/docs/essentials/spam-policies).
 Learn more about
 [subscription and paywalled content](https://developers.google.com/search/docs/appearance/flexible-sampling).

 This guide only applies to content that you want crawled and indexed. If you don't want to
 have your paywalled content indexed, you can stop reading now.

## Example

Here's an example of
 `[NewsArticle](https://schema.org/NewsArticle)`
 structured data with paywalled content.

<html>
 <head>
 <title>Article headline</title>
 <script type="application/ld+json">
 {
 "@context": "https://schema.org",
 "@type": "NewsArticle",
 "headline": "Article headline",
 "image": "https://example.org/thumbnail1.jpg",
 "datePublished": "2025-02-05T08:00:00+08:00",
 "dateModified": "2025-02-05T09:20:00+08:00",
 "author": {
 "@type": "Person",
 "name": "John Doe",
 "url": "https://example.com/profile/johndoe123"
 },
 "description": "A most wonderful article",
 "isAccessibleForFree": false,
 "hasPart":
 {
 "@type": "WebPageElement",
 "isAccessibleForFree": false,
 "cssSelector" : ".paywall"
 }
 }
 </script>
 </head>
 <body>
 <div class="non-paywall">
 Non-Paywalled Content
 </div>
 <div class="paywall">
 Paywalled Content
 </div>
 </body>
</html>

```
<html>
 <head>
 <title>Article headline</title>
 <script type="application/ld+json">
 {
 "@context": "https://schema.org",
 "@type": "NewsArticle",
 "headline": "Article headline",
 "image": "https://example.org/thumbnail1.jpg",
 "datePublished": "2025-02-05T08:00:00+08:00",
 "dateModified": "2025-02-05T09:20:00+08:00",
 "author": {
 "@type": "Person",
 "name": "John Doe",
 "url": "https://example.com/profile/johndoe123"
 },
 "description": "A most wonderful article",
 "isAccessibleForFree": false,
 "hasPart":
 {
 "@type": "WebPageElement",
 "isAccessibleForFree": false,
 "cssSelector" : ".paywall"
 }
 }
 </script>
 </head>
 <body>
 <div class="non-paywall">
 Non-Paywalled Content
 </div>
 <div class="paywall">
 Paywalled Content
 </div>
 </body>
</html>
```

## Guidelines

 You must follow the
 [general structured data guidelines](https://developers.google.com/search/docs/appearance/structured-data/sd-policies) and
 [technical guidelines](https://developers.google.com/search/docs/appearance/structured-data/sd-policies#technical-guidelines) for
 your page to be eligible to appear in search results. In addition, the following guidelines
 apply to paywalled content:

Note: If you violate these policies, your page might not be eligible
 to be displayed in Search results. Read about
 [Spammy Structured Markup](https://support.google.com/webmasters/answer/3498001)
 to learn more.

 
- 
 JSON-LD and microdata formats are accepted methods for specifying structured data for
 paywalled content.
 
 
- 
 Don't nest content sections.
 
 
- 
 Only use `.class` selectors for the `cssSelector` property.
 
 
- 
 If you don't want the content to be accessible to the browser at the time of serving, choose a
 paywall implementation that doesn't supply the paywalled content to the browser. If you use a
 client-side JavaScript solution, check our [guidance on using JavaScript to implement paywalled content](https://developers.google.com/search/docs/crawling-indexing/javascript/fix-search-javascript#paywall).

## Add markup to paywalled content

 If you offer any
 [subscription-based access](https://developers.google.com/search/docs/appearance/flexible-sampling) to
 your website content, or if users must register for access to any content you want to be
 indexed, follow these steps. The following example applies to
 `NewsArticle` structured data. Make sure to follow these steps for
 all versions of your page (including AMP and non-AMP).

 
- 
 Add a class name around each paywalled section of your page. For example:

```
<body>
<p>This content is outside a paywall and is visible to all.</p>
<div class="paywall">This content is inside a paywall, and requires a subscription or registration.</div>
</body>
```

 
- 
 Add [`NewsArticle`](https://developers.google.com/search/docs/appearance/structured-data/article)
 structured data.
 
 
- 
 Add the highlighted JSON-LD structured data to your
 `NewsArticle` structured data.
 Note: The `cssSelector` references the
 class name that you added in Step 1.
 

```
{
 "@context": "https://schema.org",
 "@type": "NewsArticle",
 "mainEntityOfPage": {
 "@type": "WebPage",
 "@id": "https://example.org/article"
 },
 (...)
 "isAccessibleForFree": false,
 "hasPart": {
 "@type": "WebPageElement",
 "isAccessibleForFree": false,
 "cssSelector": ".paywall"
 }
}
```

 
 
- Validate your code using the [Rich Results Test](https://search.google.com/test/rich-results)
 and fix any critical errors.
 

### Multiple paywalled sections

If you have multiple paywalled sections on a page, add the class names as an array.

Here's an example of the paywalled sections on a page:

```
<body>
 <div class="section1">This content is inside a paywall, and requires a subscription or registration.</div>
 <p>This content is outside a paywall and is visible to all.</p>
 <div class="section2">This is another section that's inside a paywall, or requires a subscription or registration.</div>
</body>
```

 Here's an example of [`NewsArticle`](https://developers.google.com/search/docs/appearance/structured-data/article)
 structured data with multiple paywalled sections.

```
{
 "@context": "https://schema.org",
 "@type": "NewsArticle",
 "mainEntityOfPage": {
 "@type": "WebPage",
 "@id": "https://example.org/article"
 },
 (...)
 "isAccessibleForFree": false,
 "hasPart": [
 {
 "@type": "WebPageElement",
 "isAccessibleForFree": false,
 "cssSelector": ".section1"
 }, {
 "@type": "WebPageElement",
 "isAccessibleForFree": false,
 "cssSelector": ".section2"
 }
 ]
}
```

### Supported types

 This markup is supported for the
 `[CreativeWork](https://schema.org/CreativeWork)`
 type or one of the following more specific types of `CreativeWork`:

 
- 
 `[Article](https://schema.org/Article)`
 
 
- 
 `[NewsArticle](https://schema.org/NewsArticle)`
 
 
- 
 `[Blog](https://schema.org/Blog)`
 
 
- 
 `[Comment](https://schema.org/Comment)`
 
 
- 
 `[Course](https://schema.org/Course)`
 
 
- 
 `[HowTo](https://schema.org/HowTo)`
 
 
- 
 `[Message](https://schema.org/Message)`
 
 
- 
 `[Review](https://schema.org/Review)`
 
 
- 
 `[WebPage](https://schema.org/WebPage)`
 

Multiple schema.org types can be used, such as the following:

`"@type": ["Article", "LearningResource"]`

You must include the required properties for Google to understand that your article has paywalled
 content. You can add the recommended properties for more granularity about which sections of a page
 are behind a paywall (or require a subscription or registration).

 
 
 Required properties | 

 
 
 
 
 `isAccessibleForFree`
 | 
 `[Boolean](https://schema.org/Boolean)`

 Whether the article is accessible to everyone, or if it's behind a paywall (or requires a
 subscription or registration). Set the `isAccessibleForFree`
 property to `false` to specify that this section is behind a paywall.

 | 
 

 

 
 
 Recommended properties | 

 
 
 
 
 `hasPart.cssSelector`
 | 
 
 `[CssSelectorType](https://schema.org/CssSelectorType)`

 A CSS selector that references the class name that you [set in the HTML](https://developers.google.com#class-name-step)
 to specify the paywalled section.

 | 
 

 
 
 `hasPart.@type`
 | 
 
 `[Text](https://schema.org/Text)`

 Set the `@type` to `WebPageElement`.

 | 
 

 
 
 `hasPart.isAccessibleForFree`
 | 
 
 `[Boolean](https://schema.org/Boolean)`

 Whether this section of the article is behind a paywall (or requires a subscription or
 registration). Set the `isAccessibleForFree` property to `False` to
 specify that this section is behind a paywall.

 | 
 

 

## AMP considerations

Here's a list of considerations to keep in mind if you use AMP pages:

 
- 
 If you have an AMP page with paywalled content, use
 [`amp-subscriptions`](https://www.ampproject.org/docs/reference/components/amp-subscriptions)
 where appropriate.
 
 
- 
 Make sure that your authorization endpoint grants access to content to the appropriate bots
 from Google and others. This is different per publisher.
 
 
- 
 Ensure that your bot access policy is the same for AMP and non-AMP pages, otherwise this can
 result in content mismatch errors that appear in Search Console.
 

## Generative AI in Search considerations

 AI Overviews and AI Mode offer a preview of a topic or query based on a variety of sources, including web sources.
 As such, they are subject to Search's
 [preview controls](https://developers.google.com/search/docs/appearance/snippet#nosnippet).

## Make sure Google can crawl and index your pages

 If you want Google to crawl and index your content, including the paywalled sections, make
 sure [Googlebot](https://developers.google.com/search/docs/crawling-indexing/verifying-googlebot), and
 [`Googlebot-News`](https://developers.google.com/search/docs/crawling-indexing/overview-google-crawlers#googlebot-news) if
 applicable, can access your page.

 Use the [URL Inspection tool](https://support.google.com/webmasters/answer/9012289)
 to test how Google crawls and renders a URL on your site.

## Control what information is shown in search results

 To exclude certain sections of your content from appearing in search result snippets, use the
 [`data-nosnippet` HTML attribute](https://developers.google.com/search/docs/crawling-indexing/robots-meta-tag#data-nosnippet-attr).
 You can also limit how many characters a search result snippet may have by using the
 [`max-snippet` robots `meta` tag](https://developers.google.com/search/docs/crawling-indexing/robots-meta-tag#max-snippet).

 
## Troubleshooting

 
 If you're having trouble implementing or debugging structured data, here are some resources that
 may help you.
 

 
 
- If you're using a content management system (CMS) or someone else is taking care of your site,
 ask them to help you. Make sure to forward any Search Console message that details the issue to them.
 
- Google does not guarantee that features that consume structured data will show up in search results.
 For a list of common reasons why Google may not show your content in a rich result, see the
 [General Structured Data Guidelines](https://developers.google.com/search/docs/appearance/structured-data/sd-policies).
 
- You might have an error in your structured data. Check the
 [list of structured data errors](https://support.google.com/webmasters/answer/13300873)
 and the [Unparsable structured data report](https://support.google.com/webmasters/answer/9166415).
 
- If you received a structured data manual action against your page, the structured data on
 the page will be ignored (although the page can still appear in Google Search results). To fix
 [structured data issues](https://support.google.com/webmasters/answer/9044175#zippy=%2Cstructured-data-issue), use the [Manual Actions report](https://support.google.com/webmasters/answer/9044175).
 
 
- Review the [guidelines](https://developers.google.com#guidelines) again to identify if your content isn't compliant
 with the guidelines. The problem can be caused by either spammy content or spammy markup usage.
 However, the issue may not be a syntax issue, and so the Rich Results Test won't be able to
 identify these issues.
 
 
- [Troubleshoot missing rich results / drop in total rich results](https://support.google.com/webmasters/answer/13300208).
 
- Allow time for re-crawling and re-indexing. Remember that it may take several days after
 publishing a page for Google to find and crawl it. For general questions about crawling and indexing, check the
 [Google Search crawling and indexing FAQ](https://developers.google.com/search/help/crawling-index-faq).
 
 
- Post a question in the [Google Search Central forum](https://support.google.com/webmasters/community).
 

 

 
 
 
 

 
 
 

 
 
 
 
 
 
 
 
 

 
 
 
 Send feedback
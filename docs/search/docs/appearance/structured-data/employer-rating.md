---
source: https://developers.google.com/search/docs/appearance/structured-data/employer-rating
title: "Employer Rating (EmployerAggregateRating) Structured Data"
fetched: 2026-07-08
---

# Employer aggregate rating (`EmployerAggregateRating`) structured data

 
 
 If your site publishes user-generated ratings about hiring organizations, add
 `EmployerAggregateRating` structured data to your site.
 `EmployerAggregateRating` is an evaluation of a hiring organization
 compiled from many users. Adding `EmployerAggregateRating` can
 provide job seekers with ratings about a hiring organization to help them choose a job. It
 also offers prominent brand placement in the enriched job search experience on Google.
 

 
 During the beta phase, we recommended adding
 [review snippet structured data](https://developers.google.com/search/docs/appearance/structured-data/review-snippet) for your
 page to be eligible for the jobs enriched search results. If you currently have review snippet
 structured data on your site, we recommend that you transition from review snippet structured
 data to `EmployerAggregateRating` structured data soon.
 
 
 Does your site provide job postings? Consider adding
 [`JobPosting` structured data](https://developers.google.com/search/docs/appearance/structured-data/job-posting).
 
 
 
 
 Note: The actual appearance in search results might be different. You can
 preview most features with the
 [Rich Results Test](https://support.google.com/webmasters/answer/7445569).
 
 

## Example

 Here's an example for `EmployerAggregateRating` using JSON-LD code.

<html>
 <head>
 <title>World's Best Coffee Shop</title>
 <script type="application/ld+json">
 {
 "@context" : "https://schema.org/",
 "@type": "EmployerAggregateRating",
 "itemReviewed": {
 "@type": "Organization",
 "name" : "World's Best Coffee Shop",
 "sameAs" : "https://example.com"
 },
 "ratingValue": 91,
 "bestRating": 100,
 "worstRating": 1,
 "ratingCount" : "10561"
 }
 </script>
 </head>
 <body>
 </body>
</html>
 

 

```
<html>
 <head>
 <title>World's Best Coffee Shop</title>
 <script type="application/ld+json">
 {
 "@context" : "https://schema.org/",
 "@type": "EmployerAggregateRating",
 "itemReviewed": {
 "@type": "Organization",
 "name" : "World's Best Coffee Shop",
 "sameAs" : "https://example.com"
 },
 "ratingValue": 91,
 "bestRating": 100,
 "worstRating": 1,
 "ratingCount" : "10561"
 }
 </script>
 </head>
 <body>
 </body>
</html>
```

 
 
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
 

 

 
## Guidelines

 You must follow these guidelines to be eligible to appear in the Google job search experience.

 Warning: If your site violates one or more of these guidelines, then Google may take [manual action](https://support.google.com/webmasters/answer/2604824) against it. Once you have remedied the problem, you can submit your site for [reconsideration](https://support.google.com/webmasters/answer/35843).

 
- [Technical guidelines](https://developers.google.com#technical-guidelines)
 
- [Content guidelines](https://developers.google.com#content-guidelines)
 
- [Enriched search quality guidelines](https://developers.google.com/search/docs/appearance/enriched-search-results)
 
- [Search Essentials](https://developers.google.com/search/docs/essentials)
 
- [General structured data guidelines](https://developers.google.com/search/docs/appearance/structured-data/sd-policies)
 

 
### Technical guidelines

 
- Make sure that the ratings are available to users from the page where you add `EmployerAggregateRating` structured data. It must be immediately obvious to users that the page has rating content.
 
- Provide rating information about a specific hiring organization, not about a category or a list of items. For example, "top 10 best places to work" and "tech companies" aren't specific hiring organizations. 
 
- By default, Google assumes that your site uses a 5-point scale, where 5 is the best possible rating and 1 is the worst, but you can use any other scale. If you use a different scale, you can specify the best and worst ratings, and Google scales that to the 5-star system.
 

 
### Content guidelines

 
 
- Users must be able to post their own ratings on your site and your site must host those user ratings.

- The number of ratings must reflect actual ratings that users provide.

- The aggregate score must be accurately derived from the provided ratings.
 

 
## Structured data type definitions

This section describes the structured data types related to employer aggregate ratings. You must
 include the required properties for your content to be eligible for display in enhanced search results.

 
### `EmployerAggregateRating`

 The full definition of `EmployerAggregateRating` is avalailable at
 [schema.org/EmployerAggregateRating](https://schema.org/EmployerAggregateRating).

 The Google-supported properties are the following:

 
 
 Required properties | 

 
 
 
 `itemReviewed` | 
 `[Organization](https://schema.org/Organization)`

 The organization that is being rated. The `itemReviewed` property must point to a [schema.org/Organization](https://schema.org/Organization) that represents the company being rated.
 For example:

```
{
 "@context" : "https://schema.org/",
 "@type": "EmployerAggregateRating",
 "itemReviewed": {
 "@type": "Organization",
 "name" : "World's Best Coffee Shop",
 "sameAs" : "https://www.worlds-best-coffee-shop.example.com"
 }
}
```

 | 
 

 
 `ratingCount` | 
 `[Number](https://schema.org/Number)`

 The total number of ratings of the organization on your site. At least one of `ratingCount` or `reviewCount` is required.
 | 
 

 
 `ratingValue` | 
 `[Number](https://schema.org/Number)` or
 `[Text](https://schema.org/Text)`

 A numerical quality rating for the item, either a number, fraction, or percentage (for example, "4", "60%", or "6 / 10").
 Google understands the scale for fractions and percentages, since the scale is
 implied in the fraction itself or the percentage. The default scale for numbers is a
 5-point scale, where 1 is the lowest value and 5 is the highest value. If another scale is
 intended, use `bestRating`
 and `worstRating`.

 | 
 

 
 
 `reviewCount`
 | 
 
 `[Number](https://schema.org/Number)`

 Specifies the number of people who provided a review with or without an accompanying
 rating. At least one of `ratingCount` or `reviewCount` is required.
 

 | 
 

 
 

 
 
 Recommended properties | 

 
 
 
 `bestRating` | 
 `[Number](https://schema.org/Number)`

 The highest value allowed in this rating system. If `bestRating`
 is omitted, 5 is assumed.
 
 | 
 

 
 `worstRating` | 
 `[Number](https://schema.org/Number)`

 The lowest value allowed in this rating system. If `worstRating`
 is omitted, 1 is assumed. 
 | 
 

 
 

 
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
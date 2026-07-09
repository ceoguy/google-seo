---
source: https://developers.google.com/search/docs/appearance/structured-data/course
title: "Use Schema for Course List"
fetched: 2026-07-08
---

# Course list (`Course`) structured data

 

 With course list structured data, you can provide more information about your courses so that
 prospective students find your courses through Google Search. You can provide details including the course
 name, who's offering it, and a short description.

## Feature availability

 The course list rich result is available in English in all regions where Google Search is available.

 
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

### Single course details page

Here's an example of a single course details page. This page must be paired with a [summary page](https://developers.google.com/search/docs/appearance/structured-data/carousel#summary-page)
 that contains the [`ItemList` markup](https://developers.google.com#item-list).

<html>
 <head>
 <title>Introduction to Computer Science and Programming</title>
 <script type="application/ld+json">
 {
 "@context": "https://schema.org",
 "@type": "Course",
 "name": "Introduction to Computer Science and Programming",
 "description": "Introductory CS course laying out the basics.",
 "provider": {
 "@type": "Organization",
 "name": "University of Technology - Eureka",
 "sameAs": "https://www.example.com"
 }
 }
 </script>
 </head>
 <body>
 </body>
</html>

 You may see errors for other rich result types in the Rich Results Test. To be eligible for the
 course list feature, pay attention to any warnings or errors that are in the Course list item
 section; you can ignore the other errors.

```
<html>
 <head>
 <title>Introduction to Computer Science and Programming</title>
 <script type="application/ld+json">
 {
 "@context": "https://schema.org",
 "@type": "Course",
 "name": "Introduction to Computer Science and Programming",
 "description": "Introductory CS course laying out the basics.",
 "provider": {
 "@type": "Organization",
 "name": "University of Technology - Eureka",
 "sameAs": "https://www.example.com"
 }
 }
 </script>
 </head>
 <body>
 </body>
</html>
```

### Single, all-in-one page

Here's an example of a [single, all-in-one page](https://developers.google.com/search/docs/appearance/structured-data/carousel#all-in-one).
 This page setup includes both the list markup and the details for each course on the same page.

<html>
 <head>
 <title>Computer Science Courses</title>
 <script type="application/ld+json">
 {
 "@context": "https://schema.org",
 "@type": "ItemList",
 "itemListElement": [
 {
 "@type": "ListItem",
 "position": 1,
 "item": {
 "@type": "Course",
 "url":"https://www.example.com/courses#intro-to-cs",
 "name": "Introduction to Computer Science and Programming",
 "description": "This is an introductory CS course laying out the basics.",
 "provider": {
 "@type": "Organization",
 "name": "University of Technology - Example",
 "sameAs": "https://www.example.com"
 }
 }
 },
 {
 "@type": "ListItem",
 "position": 2,
 "item": {
 "@type": "Course",
 "url":"https://www.example.com/courses#intermediate-cs",
 "name": "Intermediate Computer Science and Programming",
 "description": "This is a CS course that builds on the basics learned in the Introduction course.",
 "provider": {
 "@type": "Organization",
 "name": "University of Technology - Example",
 "sameAs": "https://www.example.com"
 }
 }
 },
 {
 "@type": "ListItem",
 "position": 3,
 "item": {
 "@type": "Course",
 "url":"https://www.example.com/courses#advanced-cs",
 "name": "Advanced Computer Science and Programming",
 "description": "This CS course covers advanced programming principles.",
 "provider": {
 "@type": "Organization",
 "name": "University of Technology - Eureka",
 "sameAs": "https://www.example.com"
 }
 }
 }
 ]
 }
 </script>
 </head>
 <body>
 </body>
</html>

 You may see errors for other rich result types in the Rich Results Test. To be eligible for the
 course list feature, pay attention to any warnings or errors that are in the Course list item
 and Carousels sections; you can ignore the other errors.

```
<html>
 <head>
 <title>Computer Science Courses</title>
 <script type="application/ld+json">
 {
 "@context": "https://schema.org",
 "@type": "ItemList",
 "itemListElement": [
 {
 "@type": "ListItem",
 "position": 1,
 "item": {
 "@type": "Course",
 "url":"https://www.example.com/courses#intro-to-cs",
 "name": "Introduction to Computer Science and Programming",
 "description": "This is an introductory CS course laying out the basics.",
 "provider": {
 "@type": "Organization",
 "name": "University of Technology - Example",
 "sameAs": "https://www.example.com"
 }
 }
 },
 {
 "@type": "ListItem",
 "position": 2,
 "item": {
 "@type": "Course",
 "url":"https://www.example.com/courses#intermediate-cs",
 "name": "Intermediate Computer Science and Programming",
 "description": "This is a CS course that builds on the basics learned in the Introduction course.",
 "provider": {
 "@type": "Organization",
 "name": "University of Technology - Example",
 "sameAs": "https://www.example.com"
 }
 }
 },
 {
 "@type": "ListItem",
 "position": 3,
 "item": {
 "@type": "Course",
 "url":"https://www.example.com/courses#advanced-cs",
 "name": "Advanced Computer Science and Programming",
 "description": "This CS course covers advanced programming principles.",
 "provider": {
 "@type": "Organization",
 "name": "University of Technology - Eureka",
 "sameAs": "https://www.example.com"
 }
 }
 }
 ]
 }
 </script>
 </head>
 <body>
 </body>
</html>
```

## Guidelines

You must follow these guidelines to be eligible to appear in a course list.

Warning: If your site violates one or more of these guidelines, then
 Google may take [manual action](https://support.google.com/webmasters/answer/2604824)
 against it. Once you have remedied the problem, you can submit your site for [reconsideration](https://support.google.com/webmasters/answer/35843).

 
- [Content guidelines](https://developers.google.com#content-guidelines)
 
- [Technical guidelines](https://developers.google.com#technical-guidelines)
 
- [Carousel guidelines](https://developers.google.com/search/docs/appearance/structured-data/carousel#guidelines)
 
- [Search Essentials](https://developers.google.com/search/docs/essentials)
 
- [General structured data guidelines](https://developers.google.com/search/docs/appearance/structured-data/sd-policies)

### Content guidelines

 
- Only use `Course` markup for educational content that fits the following definition of a course:
 A series or unit of curriculum that contains lectures, lessons, or modules in a particular
 subject and/or topic.
 
- A course must have an explicit educational outcome of knowledge and/or
 skill in a particular subject and/or topic, and be led by one or more instructors with a roster of students.
 
- A general public event such as "Astronomy Day" is not a course, and a single 2-minute "How
 to make a Sandwich Video" is not a course.

### Technical guidelines

 You must mark up at least three courses. The courses can be on separate
 [detail pages](https://developers.google.com/search/docs/appearance/structured-data/carousel#details-page), or in
 an [all-in-one page](https://developers.google.com/search/docs/appearance/structured-data/carousel#all-in-one).

 You must add [Carousel markup](https://developers.google.com/search/docs/appearance/structured-data/carousel#details-page)
 to either a [summary page](https://developers.google.com/search/docs/appearance/structured-data/carousel#summary)
 or an [all-in-one page](https://developers.google.com/search/docs/appearance/structured-data/carousel#all-in-one).

Each course must have valid [name](https://schema.org/name) and
 [provider](https://schema.org/provider) properties. For example,
 the following naming practices are not valid:

 
 
- Promotional phrases: "Best school in the world"
 
- Prices in course titles: "Learn ukulele - only $30!"
 
- Using something other than a course for a title, such as: "Make money fast with this class!"
 
- Discounts or purchase opportunties, such as: "Leaders in their fields
 share their secrets — 25% off!"
 

## Structured data type definitions

You must include the required properties for your content to be eligible for display as a rich result.
 You can also include the recommended properties to add more information about your content,
 which could provide a better user experience.

### `Course`

 Use the following properties to mark up at least three courses. The courses can be on separate
 [detail pages](https://developers.google.com/search/docs/appearance/structured-data/carousel#details-page), or in
 an [all-in-one page](https://developers.google.com/search/docs/appearance/structured-data/carousel#all-in-one).

The full definition of `Course` is available at
 [schema.org/Course](https://schema.org/Course).
 The Google-supported properties are the following:

 Required properties | 

 
 `description` | 
 `[Text](https://schema.org/Text)`

 A description of the course. Display limit of 60 characters.
 | 
 

 
 `name` | 
 `[Text](https://schema.org/Text)`

 The title of the course.
 | 
 

 Recommended properties | 

 
 `provider` | 
 `[Organization](https://schema.org/Organization)`

 The organization that publishes the source content of the course. For example,
 UC Berkeley.
 | 
 

 
### `ItemList`

In addition to [`Course` properties](https://developers.google.com#course), add the following
 properties to specify the list. You can add these properties to either a
 [summary page](https://developers.google.com/search/docs/appearance/structured-data/carousel#summary) or an
 [all-in-one page](https://developers.google.com/search/docs/appearance/structured-data/carousel#all-in-one).

The full definition of `ItemList` is
available at [schema.org/ItemList](https://schema.org/ItemList).

 Required properties | 

 `itemListElement` | 
 `[ListItem](https://schema.org/ListItem)`

 Annotation for a single item page.
 | 
 

 
 `ListItem.position` | 
 `[Integer](https://schema.org/Integer)`

 Ordinal position of the item page in the list.
 | 
 

 
 `ListItem.url` | 
 `[URL](https://schema.org/URL)`

 The canonical URL of the item page. Every item must have a unique URL.
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
---
source: https://developers.google.com/search/docs/appearance/structured-data/movie
title: "Mark Up Movies with Structured Data"
fetched: 2026-07-08
---

# Movie carousel (`Movie`) structured data

 
 
 
 Mark up your movie lists with structured data so users can explore movies on Google
 Search in new ways. You can provide details about the movies, such as the title of the movie, director
 of the movie, and an image of the movie. The movie carousel is only available on mobile devices.
 

 Do you want to claim a specific movie in the knowledge panel? [Get verified on Google](https://support.google.com/knowledgepanel/answer/7534902).
 

 Do you want to enable a watch button? [Get started with Media
 Actions](https://developers.google.com/actions/media).
 
 
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

 
### Summary page + multiple full details pages

 
 The summary page has a short description of each item in the list, and each description points
 to a separate details page that is focused entirely on one item. Here's an example of the
 summary movie list in JSON-LD:
 

 

```
<html>
  <head>
    <title>The Best Movies from the Oscars - 2024</title>
    <script type="application/ld+json">
    {
      "@context":"https://schema.org",
      "@type":"ItemList",
      "itemListElement":[
        {
          "@type":"ListItem",
          "position":1,
          "url":"https://example.com/a-star-is-born.html"
        },
        {
          "@type":"ListItem",
          "position":2,
          "url":"https://example.com/bohemian-rhapsody.html"
        },
        {
          "@type":"ListItem",
          "position":3,
          "url":"https://example.com/black-panther.html"
        }
      ]
    }
    </script>
  </head>
  <body>
  </body>
</html>
```

 
### Single, all-in-one-page list

 
 A single, all-in-one-page list hosts all list information, including full text of each item.
 Here's an example of a single, all-in-one movie list in JSON-LD:
 

 <html>
 <head>
 <title>The Best Movies from the Oscars - 2024</title>
 <script type="application/ld+json">
 {
 "@context": "https://schema.org",
 "@type": "ItemList",
 "itemListElement": [
 {
 "@type": "ListItem",
 "position": 1,
 "item": {
 "@type": "Movie",
 "url": "https://example.com/2024-best-picture-noms#a-star-is-born",
 "name": "A Star Is Born",
 "image": "https://example.com/photos/6x9/photo.jpg",
 "dateCreated": "2024-10-05",
 "director": {
 "@type": "Person",
 "name": "Bradley Cooper"
 },
 "review": {
 "@type": "Review",
 "reviewRating": {
 "@type": "Rating",
 "ratingValue": 5
 },
 "author": {
 "@type": "Person",
 "name": "John D."
 }
 },
 "aggregateRating": {
 "@type": "AggregateRating",
 "ratingValue": 90,
 "bestRating": 100,
 "ratingCount": 19141
 }
 }
 },
 {
 "@type": "ListItem",
 "position": 2,
 "item": {
 "@type": "Movie",
 "name": "Bohemian Rhapsody",
 "url": "https://example.com/2024-best-picture-noms#bohemian-rhapsody",
 "image": "https://example.com/photos/6x9/photo.jpg",
 "dateCreated": "2024-11-02",
 "director": {
 "@type": "Person",
 "name": "Bryan Singer"
 },
 "review": {
 "@type": "Review",
 "reviewRating": {
 "@type": "Rating",
 "ratingValue": 3
 },
 "author": {
 "@type": "Person",
 "name": "Vin S."
 }
 },
 "aggregateRating": {
 "@type": "AggregateRating",
 "ratingValue": 61,
 "bestRating": 100,
 "ratingCount": 21985
 }
 }
 },
 {
 "@type": "ListItem",
 "position": 3,
 "item": {
 "@type": "Movie",
 "name": "Black Panther",
 "url": "https://example.com/2024-best-picture-noms#black-panther",
 "image": "https://example.com/photos/6x9/photo.jpg",
 "dateCreated": "2024-02-16",
 "director": {
 "@type": "Person",
 "name": "Ryan Coogler"
 },
 "review": {
 "@type": "Review",
 "reviewRating": {
 "@type": "Rating",
 "ratingValue": 2
 },
 "author": {
 "@type": "Person",
 "name": "Trevor R."
 }
 },
 "aggregateRating": {
 "@type": "AggregateRating",
 "ratingValue": 96,
 "bestRating": 100,
 "ratingCount": 88211
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
<html>
  <head>
    <title>The Best Movies from the Oscars - 2024</title>
    <script type="application/ld+json">
    {
      "@context": "https://schema.org",
      "@type": "ItemList",
      "itemListElement": [
        {
          "@type": "ListItem",
          "position": 1,
          "item": {
            "@type": "Movie",
            "url": "https://example.com/2024-best-picture-noms#a-star-is-born",
            "name": "A Star Is Born",
            "image": "https://example.com/photos/6x9/photo.jpg",
            "dateCreated": "2024-10-05",
            "director": {
                "@type": "Person",
                "name": "Bradley Cooper"
              },
            "review": {
              "@type": "Review",
              "reviewRating": {
                "@type": "Rating",
                "ratingValue": 5
              },
              "author": {
                "@type": "Person",
                "name": "John D."
              }
            },
              "aggregateRating": {
                "@type": "AggregateRating",
                "ratingValue": 90,
                "bestRating": 100,
                "ratingCount": 19141
              }
            }
          },
        {
          "@type": "ListItem",
          "position": 2,
          "item": {
            "@type": "Movie",
            "name": "Bohemian Rhapsody",
            "url": "https://example.com/2024-best-picture-noms#bohemian-rhapsody",
            "image": "https://example.com/photos/6x9/photo.jpg",
            "dateCreated": "2024-11-02",
            "director": {
                "@type": "Person",
                "name": "Bryan Singer"
              },
            "review": {
              "@type": "Review",
              "reviewRating": {
                "@type": "Rating",
                "ratingValue": 3
              },
              "author": {
                "@type": "Person",
                "name": "Vin S."
              }
            },
              "aggregateRating": {
                "@type": "AggregateRating",
                "ratingValue": 61,
                "bestRating": 100,
                "ratingCount": 21985
              }
            }
          },
        {
          "@type": "ListItem",
          "position": 3,
          "item": {
            "@type": "Movie",
            "name": "Black Panther",
            "url": "https://example.com/2024-best-picture-noms#black-panther",
            "image": "https://example.com/photos/6x9/photo.jpg",
            "dateCreated": "2024-02-16",
            "director": {
                "@type": "Person",
                "name": "Ryan Coogler"
              },
            "review": {
              "@type": "Review",
              "reviewRating": {
                "@type": "Rating",
                "ratingValue": 2
              },
              "author": {
                "@type": "Person",
                "name": "Trevor R."
              }
            },
              "aggregateRating": {
                "@type": "AggregateRating",
                "ratingValue": 96,
                "bestRating": 100,
                "ratingCount": 88211
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

 You must follow these guidelines to be eligible to appear in a movie carousel.

 Warning: If Google detects that some of the markup on your pages
 may be using techniques that are outside our structured data guidelines, your site may receive
 a [manual action](https://support.google.com/webmasters/answer/2604824).

 
- [Carousel guidelines](https://developers.google.com/search/docs/appearance/structured-data/carousel#guidelines)
 
- [Search Essentials](https://developers.google.com/search/docs/essentials)
 
- [General structured data guidelines](https://developers.google.com/search/docs/appearance/structured-data/sd-policies)
 

 
## Structured data type definitions

 You must include the required properties for your content to be eligible for display as a
 rich result. You can also include the recommended properties to add more information about
 your content, which could provide a better user experience.

 
### `Movie`

 
 In addition to the [Carousel properties](https://developers.google.com/search/docs/appearance/structured-data/carousel), define
 the following properties in your Carousel object.

 
 The full definition of `Movie` is available at
 [schema.org/Movie](https://schema.org/Movie).
 

 The Google-supported properties are the following:

 
 
 
 
| Required properties |
 
 
 
| `image` | ` URL ` or ` ImageObject ` An image that represents the movie. Additional image guidelines: Image URLs must be crawlable and indexable . Images must represent the marked up content. Images must be in .jpg, .png, or .gif format. Images must have a high resolution and have a 6:9 aspect ratio. While Google can crop images that are close to a 6:9 aspect ratio, images largely deviating from this ratio aren't eligible for the feature. |
 
| `name` | ` Text ` The name of the movie. |
 
 

 
 
 
 
| Recommended properties |
 
 
 
| `aggregateRating` | ` AggregateRating ` Annotation for the average review score assigned to the movie. Follow the Review snippet guidelines and list of required and recommended AggregateRating properties . |
 
| `dateCreated` | ` Date ` or ` DateTime ` The date the movie was released. |
 
| `director` | ` Person ` The director of the movie. For example: 
```
"director": {
  "@type": "Person",
  "name": "Bradley Cooper"
}
```
 |
 
| `review` | ` Review ` A nested `Review` of the movie. Follow the Review snippet guidelines and the list of required and recommended review properties . |
 
 

 
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
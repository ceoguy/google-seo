---
source: https://developers.google.com/search/docs/crawling-indexing/sitemaps/news-sitemap
title: "Create a News Sitemap"
fetched: 2026-07-08
---

# News sitemaps

 

 If you are a news publisher, use news sitemaps to tell Google about your news articles and
 additional information about them. You can either extend your existing sitemap with news
 specific tags, or create a separate news sitemap that's reserved just for your news articles.
 Either option is fine with Google, however creating a separate sitemap just for your news
 articles may enable better tracking of your content in Search in Search Console.

## News sitemap best practices

 News sitemaps are based on generic sitemaps, so the
 [general sitemap best practices](https://developers.google.com/search/docs/crawling-indexing/sitemaps/build-sitemap#general-guidelines)
 also apply to news sitemaps.

 Update your news sitemap with fresh articles as they're published. Don't create a new sitemap
 with each update. Google News crawls news sitemaps as often as it crawls the rest of your
 site.

 Only include recent URLs for articles that were created in the last two days. Once the
 articles are older than two days, either remove those URLs from the news sitemap or remove
 the `<news:news>` metadata in your sitemap from the older URLs.

 If you choose the method of removing old URLs from your news sitemap, this could mean that
 your sitemap becomes empty for a period of time (for example, if you haven't published
 articles in the last few days). You may see an Empty Sitemap warning in Search Console,
 but this is just to make sure it was intentional on your behalf. It won't cause any problems with
 Google Search if the file is empty.

## Example news sitemap

 The following example shows a regular sitemap with news extension. It contains one
 `<url>` tag and a single `<news:news>` tag with its required
 child tags:


```
<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9"
    xmlns:news="http://www.google.com/schemas/sitemap-news/0.9">
  <url>
  <loc>http://www.example.org/business/article55.html</loc>
  <news:news>
    <news:publication>
      <news:name>The Example Times</news:name>
      <news:language>en</news:language>
    </news:publication>
    <news:publication_date>2008-12-23</news:publication_date>
    <news:title>Companies A, B in Merger Talks</news:title>
  </news:news>
  </url>
</urlset>
```


## News sitemap reference

The `news` tags are defined in the news sitemap namespace:
 [`http://www.google.com/schemas/sitemap-news/0.9`](http://www.google.com/schemas/sitemap-news/0.9)

 To make sure Google can use your news sitemap, you must use the following required tags:

 
| Required tags |
 
| `<news:news>` | The parent tag of other tags in the `news:` namespace. Each `url` sitemap tag can have only one `news:news` tag (plus the respective closing tag) and a sitemap may have up to 1,000 `news:news` tags. If there are more than 1,000 `<news:news>` tags in a news sitemap, split your sitemap into several smaller sitemaps . |
 
| `<news:publication>` | The parent tag for the `<news:name>` and `<news:language>` tags. Each `<news:news>` parent tag may only have one `<news:publication>` tag. |
 
| `<news:name>` | The `<news:name>` tag is the name of the news publication. It must exactly match the name as it appears on your articles on news.google.com , omitting anything in parentheses. |
 
| `<news:language>` | The `<news:language>` tag is the language of your publication. Use an ISO 639 language code (two or three letters). Exception : For Simplified Chinese, use `zh-cn` and for Traditional Chinese, use `zh-tw`. |
 
| `<news:publication_date>` | The article publication date in W3C format . Use either the "complete date" format (`YYYY-MM-DD`) or the "complete date plus hours, minutes, and seconds" format with time zone designator format (`YYYY-MM-DDThh:mm:ssTZD`). Specify the original date and time when the article was first published on your site. Don't specify the time when you added the article to your sitemap. Google accepts any of the following formats: Complete date: `YYYY-MM-DD (1997-07-16)` Complete date plus hours and minutes: `YYYY-MM-DDThh:mmTZD (1997-07-16T19:20+01:00)` Complete date plus hours, minutes, and seconds: `YYYY-MM-DDThh:mm:ssTZD (1997-07-16T19:20:30+01:00)` Complete date plus hours, minutes, seconds, and a decimal fraction of a second: `YYYY-MM-DDThh:mm:ss.sTZD` (`1997-07-16T19:20:30.45+01:00`) |
 
| `<news:title>` | The title of the news article. Tip: Google may shorten the title of the news article for space reasons when displaying the article on various devices. Include the title of the article as it appears on your site. Don't include the author name, publication name, or publication date in the `<news:title>` tag. Learn more about creating better titles . |

 
## Troubleshooting sitemaps

 
 If you're having trouble with your sitemap, you can investigate the errors with Google Search Console.
 See Search Console's
 [sitemaps troubleshooting guide](https://support.google.com/webmasters/answer/7451001#errors)
 for help.
 

 
## Additional resources

 
 Want to learn more? Check out the following resources:
 

 
 
- 
 [Submit your sitemap to Google](https://developers.google.com/search/docs/crawling-indexing/sitemaps/build-sitemap#addsitemap)
 
 
- 
 [Learn how to combine sitemap extensions](https://developers.google.com/search/docs/crawling-indexing/sitemaps/combine-sitemap-extensions)
 
 

 
 
 
 

 
 
 

 
 
 
 
 
 
 
 
 

 
 
 
 Send feedback
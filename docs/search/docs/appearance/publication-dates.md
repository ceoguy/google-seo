---
source: https://developers.google.com/search/docs/appearance/publication-dates
title: "Add a Byline Date to Google Search Results"
fetched: 2026-07-08
---

# Influence your byline dates in Google Search

 
 A byline date is the date that Google estimates that the web page was updated or published.
 When Google can determine the byline date of your page or video, it can expose this information
 in Search results, if this information is considered to be useful to
 the user. You can provide information to help Google determine the byline date.

 
 
 
 Google doesn't depend on a single date factor because all factors can be
 prone to issues. That's why our systems look at several factors to determine our best estimate
 of when a page was published or significantly updated.

 
## How to provide date information to Google

 To provide date information to Google, follow these steps:

 
 
- Follow the [best practices for influencing byline dates](https://developers.google.com#guidelines).
 
- Add a user-visible date to the page and feature it prominently. Label
 your dates appropriately with text like "Publish" or "Last updated". Here are some examples
 of how you can highlight date information about a web page:
 
 
- Posted Feb 4, 2019
 
- Published February 4, 2019
 
- Last updated: Feb 14, 2018
 
- Updated Feb 14, 2019 8pm ET
 

 You can provide a publication date and/or a last updated date.
 

```
<html>
  <head>
    <title>Analyzing Google Search traffic drops</title>
  </head>
  <body>
    <p>
      Posted Tuesday, July 20, 2021
    </p>
    <p>
      Suppose you open Search Console and find out that your Google Search traffic dropped. What should you do?
    </p>
  </body>
</html>
```

 
 
- Specify dates with [structured data](https://developers.google.com/search/docs/appearance/structured-data/intro-structured-data).
 We recommend that you add a subtype of
 [`CreativeWork`](https://schema.org/CreativeWork)
 (such as [`Article`](https://developers.google.com/search/docs/appearance/structured-data/article),
 [`BlogPosting`](https://schema.org/BlogPosting),
 or [`VideoObject`](https://developers.google.com/search/docs/appearance/structured-data/video)),
 and specify the `datePublished` and/or `dateModified` fields.
 [Be sure to follow Google's structured data guidelines](https://developers.google.com/search/docs/appearance/structured-data/sd-policies)
 to help our crawlers understand your article dates.
 

```
<html>
  <head>
    <title>Analyzing Google Search traffic drops</title>
    <script type="application/ld+json">
    {
      "@context": "https://schema.org",
      "@type": "NewsArticle",
      "headline": "Analyzing Google Search traffic drops",
      "datePublished": "2021-07-20T08:00:00+08:00",
      "dateModified": "2021-07-20T09:20:00+08:00"
    }
    </script>
  </head>
  <body>
    <p>
      Posted Tuesday, July 20, 2021
    </p>
    <p>
      Suppose you open Search Console and find out that your Google Search traffic dropped. What should you do?
    </p>
  </body>
</html>
```

 
 

 
## Best practices for influencing byline dates

 While Google doesn't guarantee that a byline date, whether visible or in structured data, will be
 shown in search results, following these guidelines does help our algorithms find and process
 the information.
 
 
- The date is required; the time is not: However, we recommend
 you provide a time and timezone in markup for added precision.
 
- If you choose to specify the timezone, provide the [correct timezone](https://en.wikipedia.org/wiki/ISO_8601#Time_zone_designators),
 taking into account [daylight saving time](https://en.wikipedia.org/wiki/Daylight_saving_time)
 as appropriate.
 
- Make your dates and times consistent. Ensure that the date (and optional
 time and timezone) match between the equivalent user-visible and structured values. Time
 and timezone are optional in user-visible data even if provided in structured data.
 
- Don't specify future dates, or the date of the action described on the page.
 The dates must describe the publication or update date of the page, not the stories or events
 described therein. You can add [Event markup](https://developers.google.com/search/docs/appearance/structured-data/event) to the
 page to describe the activities listed on the page, if you like.
 
- Minimize the presence of other dates on the page: If you've followed the
 best practices and find incorrect dates are being selected, consider removing some or
 all other dates that appear on the page.
 
- If your page is intended to show up in Google News search,
 follow [these additional guidelines](https://support.google.com/news/publisher-center/answer/9607104).
 

 
 
 
 

 
 
 

 
 
 
 
 
 
 
 
 

 
 
 
 Send feedback
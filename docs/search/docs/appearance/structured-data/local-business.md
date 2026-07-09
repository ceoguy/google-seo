---
source: https://developers.google.com/search/docs/appearance/structured-data/local-business
title: "Local Business (LocalBusiness) Structured Data"
fetched: 2026-07-08
---

# Local business (`LocalBusiness`) structured data

 
When users search for businesses on Google Search or Maps, Search results may
 display a prominent Google knowledge panel with details about a business that matched
 the query. When users search for a type of business (for example, "best NYC restaurants"), they
 may see a carousel of businesses related to the query. With Local Business structured data, you
 can tell Google about business hours, different departments within a business, reviews (if your site captures reviews about other businesses), and more. If you want to help users to make a reservation or place an order
 directly in Search results, you can use the [Maps Booking API](https://developers.google.com/maps-booking/guides/starter-integration/overview) to enable bookings, payments, and other actions.

 
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

 
### Simple local business listing

 Here's an example of a local business listing using JSON-LD.

 

 
 
 Note: The actual appearance in search results might be different. You can
 preview most features with the
 [Rich Results Test](https://support.google.com/webmasters/answer/7445569).
 
 
 <html>
 <head>
 <title>Dave's Steak House</title>
 <script type="application/ld+json">
 {
 "@context": "https://schema.org",
 "@type": "Restaurant",
 "image": [
 "https://example.com/photos/1x1/photo.jpg",
 "https://example.com/photos/4x3/photo.jpg",
 "https://example.com/photos/16x9/photo.jpg"
 ],
 "name": "Dave's Steak House",
 "address": {
 "@type": "PostalAddress",
 "streetAddress": "148 W 51st St",
 "addressLocality": "New York",
 "addressRegion": "NY",
 "postalCode": "10019",
 "addressCountry": "US"
 },
 "review": {
 "@type": "Review",
 "reviewRating": {
 "@type": "Rating",
 "ratingValue": 4,
 "bestRating": 5
 },
 "author": {
 "@type": "Person",
 "name": "Lillian Ruiz"
 }
 },
 "geo": {
 "@type": "GeoCoordinates",
 "latitude": 40.761293,
 "longitude": -73.982294
 },
 "url": "https://www.example.com/restaurant-locations/manhattan",
 "telephone": "+12122459600",
 "servesCuisine": "American",
 "priceRange": "$$$",
 "openingHoursSpecification": [
 {
 "@type": "OpeningHoursSpecification",
 "dayOfWeek": [
 "Monday",
 "Tuesday"
 ],
 "opens": "11:30",
 "closes": "22:00"
 },
 {
 "@type": "OpeningHoursSpecification",
 "dayOfWeek": [
 "Wednesday",
 "Thursday",
 "Friday"
 ],
 "opens": "11:30",
 "closes": "23:00"
 },
 {
 "@type": "OpeningHoursSpecification",
 "dayOfWeek": "Saturday",
 "opens": "16:00",
 "closes": "23:00"
 },
 {
 "@type": "OpeningHoursSpecification",
 "dayOfWeek": "Sunday",
 "opens": "16:00",
 "closes": "22:00"
 }
 ],
 "menu": "https://www.example.com/menu"
 }
 </script>
 </head>
 <body>
 </body>
</html>
 

 

```
<html>
 <head>
 <title>Dave's Steak House</title>
 <script type="application/ld+json">
 {
 "@context": "https://schema.org",
 "@type": "Restaurant",
 "image": [
 "https://example.com/photos/1x1/photo.jpg",
 "https://example.com/photos/4x3/photo.jpg",
 "https://example.com/photos/16x9/photo.jpg"
 ],
 "name": "Dave's Steak House",
 "address": {
 "@type": "PostalAddress",
 "streetAddress": "148 W 51st St",
 "addressLocality": "New York",
 "addressRegion": "NY",
 "postalCode": "10019",
 "addressCountry": "US"
 },
 "review": {
 "@type": "Review",
 "reviewRating": {
 "@type": "Rating",
 "ratingValue": 4,
 "bestRating": 5
 },
 "author": {
 "@type": "Person",
 "name": "Lillian Ruiz"
 }
 },
 "geo": {
 "@type": "GeoCoordinates",
 "latitude": 40.761293,
 "longitude": -73.982294
 },
 "url": "https://www.example.com/restaurant-locations/manhattan",
 "telephone": "+12122459600",
 "servesCuisine": "American",
 "priceRange": "$$$",
 "openingHoursSpecification": [
 {
 "@type": "OpeningHoursSpecification",
 "dayOfWeek": [
 "Monday",
 "Tuesday"
 ],
 "opens": "11:30",
 "closes": "22:00"
 },
 {
 "@type": "OpeningHoursSpecification",
 "dayOfWeek": [
 "Wednesday",
 "Thursday",
 "Friday"
 ],
 "opens": "11:30",
 "closes": "23:00"
 },
 {
 "@type": "OpeningHoursSpecification",
 "dayOfWeek": "Saturday",
 "opens": "16:00",
 "closes": "23:00"
 },
 {
 "@type": "OpeningHoursSpecification",
 "dayOfWeek": "Sunday",
 "opens": "16:00",
 "closes": "22:00"
 }
 ],
 "menu": "https://www.example.com/menu"
 }
 </script>
 </head>
 <body>
 </body>
</html>
```

 
### Restaurant carousel (limited access)

 
 Here's an example of a restaurant that meets the requirements of a [details page](https://developers.google.com/search/docs/appearance/structured-data/carousel#details-page) (assuming there is also a [summary page](https://developers.google.com/search/docs/appearance/structured-data/carousel#summary-page) with Carousel markup). The Restaurant carousel is limited to a
 small set of restaurant providers. If you would like to participate, [register your interest](https://docs.google.com/a/google.com/forms/d/e/1FAIpQLSdZCJXAe2TtpiBe8Lx2dWR6LatLcCbFq7SZsyWqH6xJ7ulbaQ/viewform) in our form.
 

 <html>
 <head>
 <title>Trattoria Luigi</title>
 <script type="application/ld+json">
 {
 "@context": "https://schema.org/",
 "@type": "Restaurant",
 "name": "Trattoria Luigi",
 "image": [
 "https://example.com/photos/1x1/photo.jpg",
 "https://example.com/photos/4x3/photo.jpg",
 "https://example.com/photos/16x9/photo.jpg"
 ],
 "priceRange": "$$$",
 "servesCuisine": "Italian",
 "telephone": "+12125557234",
 "address": {
 "@type": "PostalAddress",
 "streetAddress": "148 W 51st St",
 "addressLocality": "New York",
 "addressRegion": "NY",
 "postalCode": "10019",
 "addressCountry": "US"
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
 <title>Trattoria Luigi</title>
 <script type="application/ld+json">
 {
 "@context": "https://schema.org/",
 "@type": "Restaurant",
 "name": "Trattoria Luigi",
 "image": [
 "https://example.com/photos/1x1/photo.jpg",
 "https://example.com/photos/4x3/photo.jpg",
 "https://example.com/photos/16x9/photo.jpg"
 ],
 "priceRange": "$$$",
 "servesCuisine": "Italian",
 "telephone": "+12125557234",
 "address": {
 "@type": "PostalAddress",
 "streetAddress": "148 W 51st St",
 "addressLocality": "New York",
 "addressRegion": "NY",
 "postalCode": "10019",
 "addressCountry": "US"
 }
 }
 </script>
 </head>
 <body>
 </body>
</html>
```

 
### Business hours

 The following examples demonstrate how to mark up different types of business
 hours.

 
 We accept both the official schema.org notation for indicating
 [dayOfWeek](https://schema.org/OpeningHoursSpecification)
 (canonical URLs for Monday, Tuesday), as well as a
 shorter form being discussed in the schema.org community. We expect
 to update this documentation to track the
 eventual outcome of those discussions, and to continue to accept both
 variations for backwards compatibility.

 
 
 Standard hours
 Excluding the `validFrom` and `validThrough` properties signify that the hours are valid year-round.This example defines a business that is open weekdays from 9am to 9pm, with
 weekend hours from 10am until 11pm.

```
"openingHoursSpecification": [
 {
 "@type": "OpeningHoursSpecification",
 "dayOfWeek": [
 "Monday",
 "Tuesday",
 "Wednesday",
 "Thursday",
 "Friday"
 ],
 "opens": "09:00",
 "closes": "21:00"
 },
 {
 "@type": "OpeningHoursSpecification",
 "dayOfWeek": [
 "Saturday",
 "Sunday"
 ],
 "opens": "10:00",
 "closes": "23:00"
 }
]
```
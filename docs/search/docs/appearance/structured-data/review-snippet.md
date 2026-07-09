---
source: https://developers.google.com/search/docs/appearance/structured-data/review-snippet
title: "Review Snippet (Review, AggregateRating) Structured Data"
fetched: 2026-07-08
---

# Review snippet (`Review`, `AggregateRating`) structured data

 
A review snippet is a short excerpt of a review or a rating from a review website, usually an
 average of the combined rating scores from many reviewers. When Google finds valid reviews or
 ratings markup, we may show a rich snippet that includes stars and other summary info from
 reviews or ratings. In addition to the text of the review, a rating is an evaluation described
 on a numeric scale (such as 1 to 5). Review snippets may appear in rich results or Google
 Knowledge Panels. You can supply ratings for the following features:

 
 
 
 Note: The actual appearance in search results might be different. You can
 preview most features with the
 [Rich Results Test](https://support.google.com/webmasters/answer/7445569).
 
 

 
- [Book](https://developers.google.com/search/docs/appearance/structured-data/book)
 
- [Course list](https://developers.google.com/search/docs/appearance/structured-data/course)
 
- [Event](https://developers.google.com/search/docs/appearance/structured-data/event)
 
- [Local business](https://developers.google.com/search/docs/appearance/structured-data/local-business) (only for
 sites that capture reviews about other local businesses; see the [guidelines about self-serving reviews](https://developers.google.com#self-serving))
 
 
- [Movie](https://developers.google.com/search/docs/appearance/structured-data/movie)
 
- [Product](https://developers.google.com/search/docs/appearance/structured-data/product)
 
- [Recipe](https://developers.google.com/search/docs/appearance/structured-data/recipe)
 
- [Software App](https://developers.google.com/search/docs/appearance/structured-data/software-app)

 Google also supports reviews for the following schema.org types (and their subtypes):

 
 
- `[CreativeWorkSeason](https://schema.org/CreativeWorkSeason)`
 
- `[CreativeWorkSeries](https://schema.org/CreativeWorkSeries)`
 
- `[Episode](https://schema.org/Episode)`
 
- `[Game](https://schema.org/Game)`
 
- `[MediaObject](https://schema.org/MediaObject)`
 
- `[MusicPlaylist](https://schema.org/MusicPlaylist)`
 
- `[MusicRecording](https://schema.org/MusicRecording)`
 
- `[Organization](https://schema.org/Organization)`
 (only for sites that capture reviews about other organizations; see the
 [guidelines about self-serving reviews](https://developers.google.com#self-serving))
 

 Does your site provide reviews about other employers? Use
 [`EmployerAggregateRating`
 structured
 data](https://developers.google.com/search/docs/appearance/structured-data/employer-rating).

 
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

There are several ways you can add `Review` structured data to a page:

 
- Add a simple review.
 
- Nest a review into another schema.org type using its
 [`review`](https://schema.org/review) property.
 
- Add aggregate ratings. You can omit the rating for an individual review if your marked-up
 content contains both an author and a review date. For aggregate reviews, you must supply
 the average rating for the rich snippet to display.
 
- Nest aggregate ratings into another schema.org type using its
 [`aggregateRating`](https://schema.org/aggregateRating)
 property.

### Simple review

Here's an example of a simple review.

 
### JSON-LD

 <html>
 <head>
 <title>Legal Seafood</title>
 <script type="application/ld+json">
 {
 "@context": "https://schema.org/",
 "@type": "Review",
 "itemReviewed": {
 "@type": "Restaurant",
 "image": "https://www.example.com/seafood-restaurant.jpg",
 "name": "Legal Seafood",
 "servesCuisine": "Seafood",
 "priceRange": "$$$",
 "telephone": "1234567",
 "address" :{
 "@type": "PostalAddress",
 "streetAddress": "123 William St",
 "addressLocality": "New York",
 "addressRegion": "NY",
 "postalCode": "10038",
 "addressCountry": "US"
 }
 },
 "reviewRating": {
 "@type": "Rating",
 "ratingValue": 4
 },
 "author": {
 "@type": "Person",
 "name": "Bob Smith"
 },
 "publisher": {
 "@type": "Organization",
 "name": "Washington Times"
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
 <title>Legal Seafood</title>
 <script type="application/ld+json">
 {
 "@context": "https://schema.org/",
 "@type": "Review",
 "itemReviewed": {
 "@type": "Restaurant",
 "image": "https://www.example.com/seafood-restaurant.jpg",
 "name": "Legal Seafood",
 "servesCuisine": "Seafood",
 "priceRange": "$$$",
 "telephone": "1234567",
 "address" :{
 "@type": "PostalAddress",
 "streetAddress": "123 William St",
 "addressLocality": "New York",
 "addressRegion": "NY",
 "postalCode": "10038",
 "addressCountry": "US"
 }
 },
 "reviewRating": {
 "@type": "Rating",
 "ratingValue": 4
 },
 "author": {
 "@type": "Person",
 "name": "Bob Smith"
 },
 "publisher": {
 "@type": "Organization",
 "name": "Washington Times"
 }
 }
 </script>
 </head>
 <body>
 </body>
</html>
```

 

 
 
### RDFa

 <html>
 <head>
 <title>Legal Seafood</title>
 </head>
 <body>
 <div vocab="https://schema.org/" typeof="Review">
 <div property="itemReviewed" typeof="Restaurant">
 <img property="image" src="https://example.com/photos/1x1/seafood-restaurant.jpg" alt="Legal Seafood"/>
 <span property="name">Legal Seafood</span>
 <span property="servesCuisine">Seafood</span>
 <span property="priceRange">$$$</span>
 <span property="telephone">1234567</span>
 <span property="address">123 William St, New York</span>
 </div>
 <span property="reviewRating" typeof="Rating">
 <span property="ratingValue">4</span>
 </span> stars -
 <b>"A good seafood place." </b>
 <span property="author" typeof="Person">
 <span property="name">Bob Smith</span>
 </span>
 <div property="publisher" typeof="Organization">
 <meta property="name" content="Washington Times">
 </div>
 </div>
 </body>
</html>
 

 

```
 <html>
 <head>
 <title>Legal Seafood</title>
 </head>
 <body>
 <div vocab="https://schema.org/" typeof="Review">
 <div property="itemReviewed" typeof="Restaurant">
 <img property="image" src="https://example.com/photos/1x1/seafood-restaurant.jpg" alt="Legal Seafood"/>
 <span property="name">Legal Seafood</span>
 <span property="servesCuisine">Seafood</span>
 <span property="priceRange">$$$</span>
 <span property="telephone">1234567</span>
 <span property="address">123 William St, New York</span>
 </div>
 <span property="reviewRating" typeof="Rating">
 <span property="ratingValue">4</span>
 </span> stars -
 <b>"A good seafood place." </b>
 <span property="author" typeof="Person">
 <span property="name">Bob Smith</span>
 </span>
 <div property="publisher" typeof="Organization">
 <meta property="name" content="Washington Times">
 </div>
 </div>
 </body>
</html>
```

 

 
 
### Microdata

 <html>
 <head>
 <title>Legal Seafood</title>
 </head>
 <body>
 <div itemscope itemtype="https://schema.org/Review">
 <div itemprop="itemReviewed" itemscope itemtype="https://schema.org/Restaurant">
 <img itemprop="image" src="https://example.com/photos/1x1/seafood-restaurant.jpg" alt="Legal Seafood"/>
 <span itemprop="name">Legal Seafood</span>
 <span itemprop="servesCuisine">Seafood</span>
 <span itemprop="priceRange">$$$</span>
 <span itemprop="telephone">1234567</span>
 <span itemprop="address">123 William St, New York</span>
 </div>
 <span itemprop="reviewRating" itemscope itemtype="https://schema.org/Rating">
 <span itemprop="ratingValue">4</span>
 </span> stars -
 <b>"A good seafood place." </b>
 <span itemprop="author" itemscope itemtype="https://schema.org/Person">
 <span itemprop="name">Bob Smith</span>
 </span>
 <div itemprop="publisher" itemscope itemtype="https://schema.org/Organization">
 <meta itemprop="name" content="Washington Times">
 </div>
 </div>
 </body>
</html>
 

 

```
 <html>
 <head>
 <title>Legal Seafood</title>
 </head>
 <body>
 <div itemscope itemtype="https://schema.org/Review">
 <div itemprop="itemReviewed" itemscope itemtype="https://schema.org/Restaurant">
 <img itemprop="image" src="https://example.com/photos/1x1/seafood-restaurant.jpg" alt="Legal Seafood"/>
 <span itemprop="name">Legal Seafood</span>
 <span itemprop="servesCuisine">Seafood</span>
 <span itemprop="priceRange">$$$</span>
 <span itemprop="telephone">1234567</span>
 <span itemprop="address">123 William St, New York</span>
 </div>
 <span itemprop="reviewRating" itemscope itemtype="https://schema.org/Rating">
 <span itemprop="ratingValue">4</span>
 </span> stars -
 <b>"A good seafood place." </b>
 <span itemprop="author" itemscope itemtype="https://schema.org/Person">
 <span itemprop="name">Bob Smith</span>
 </span>
 <div itemprop="publisher" itemscope itemtype="https://schema.org/Organization">
 <meta itemprop="name" content="Washington Times">
 </div>
 </div>
 </body>
</html>
```

### Nested review

Here's an example of a review that's nested in a `Product`. You can copy and
 paste the example to your own HTML page.

 
### JSON-LD

 <html>
 <head>
 <title>The Catcher in the Rye</title>
 <script type="application/ld+json">
 {
 "@context": "https://schema.org/",
 "@type": "Product",
 "brand": {
 "@type": "Brand",
 "name": "Penguin Books"
 },
 "description": "The Catcher in the Rye is a classic coming-of-age story: an story of teenage alienation, capturing the human need for connection and the bewildering sense of loss as we leave childhood behind.",
 "sku": "9780241984758",
 "mpn": "925872",
 "image": "https://www.example.com/catcher-in-the-rye-book-cover.jpg",
 "name": "The Catcher in the Rye",
 "review": [{
 "@type": "Review",
 "reviewRating": {
 "@type": "Rating",
 "ratingValue": 5
 },
 "author": {
 "@type": "Person",
 "name": "John Doe"
 }
 },
 {
 "@type": "Review",
 "reviewRating": {
 "@type": "Rating",
 "ratingValue": 1
 },
 "author": {
 "@type": "Person",
 "name": "Jane Doe"
 }
 }],
 "aggregateRating": {
 "@type": "AggregateRating",
 "ratingValue": 88,
 "bestRating": 100,
 "ratingCount": 20
 },
 "offers": {
 "@type": "Offer",
 "url": "https://example.com/offers/catcher-in-the-rye",
 "priceCurrency": "USD",
 "price": 5.99,
 "priceValidUntil": "2024-11-05",
 "itemCondition": "https://schema.org/UsedCondition",
 "availability": "https://schema.org/InStock",
 "seller": {
 "@type": "Organization",
 "name": "eBay"
 }
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
 <title>The Catcher in the Rye</title>
 <script type="application/ld+json">
 {
 "@context": "https://schema.org/",
 "@type": "Product",
 "brand": {
 "@type": "Brand",
 "name": "Penguin Books"
 },
 "description": "The Catcher in the Rye is a classic coming-of-age story: an story of teenage alienation, capturing the human need for connection and the bewildering sense of loss as we leave childhood behind.",
 "sku": "9780241984758",
 "mpn": "925872",
 "image": "https://www.example.com/catcher-in-the-rye-book-cover.jpg",
 "name": "The Catcher in the Rye",
 "review": [{
 "@type": "Review",
 "reviewRating": {
 "@type": "Rating",
 "ratingValue": 5
 },
 "author": {
 "@type": "Person",
 "name": "John Doe"
 }
 },
 {
 "@type": "Review",
 "reviewRating": {
 "@type": "Rating",
 "ratingValue": 1
 },
 "author": {
 "@type": "Person",
 "name": "Jane Doe"
 }
 }],
 "aggregateRating": {
 "@type": "AggregateRating",
 "ratingValue": 88,
 "bestRating": 100,
 "ratingCount": 20
 },
 "offers": {
 "@type": "Offer",
 "url": "https://example.com/offers/catcher-in-the-rye",
 "priceCurrency": "USD",
 "price": 5.99,
 "priceValidUntil": "2024-11-05",
 "itemCondition": "https://schema.org/UsedCondition",
 "availability": "https://schema.org/InStock",
 "seller": {
 "@type": "Organization",
 "name": "eBay"
 }
 }
 }
 </script>
 </head>
 <body>
 </body>
</html>
```

 

 
 
### RDFa

 <html>
 <head>
 <title>The Catcher in the Rye</title>
 </head>
 <body>
 <div vocab="https://schema.org/" typeof="Product">
 <div rel="schema:brand">
 <div typeof="schema:Brand">
 <div property="schema:name" content="Penguin"></div>
 </div>
 </div>
 <div property="schema:description" content="The Catcher in the Rye is a classic coming-of-age story: an story of teenage alienation, capturing the human need for connection and the bewildering sense of loss as we leave childhood behind."></div>
 <div property="schema:sku" content="9780241984758"></div>
 <div property="schema:mpn" content="925872"></div>
 <img property="image" src="https://example.com/photos/1x1/catcher-in-the-rye-book-cover.jpg" alt="Catcher in the Rye"/>
 <span property="name">The Catcher in the Rye</span>
 <div property="review" typeof="Review"> Reviews:
 <span property="reviewRating" typeof="Rating">
 <span property="ratingValue">5</span> -
 </span>
 <b>"A masterpiece of literature" </b> by
 <span property="author" typeof="Person">
 <span property="name">John Doe</span></span>, written on
 <meta property="datePublished" content="2006-05-04">4 May 2006
 <div>I really enjoyed this book. It captures the essential challenge people face as they try make sense of their lives and grow to adulthood.</div>
 <span property="publisher" typeof="Organization">
 <meta property="name" content="Washington Times">
 </span>
 </div><div property="review" typeof="Review">
 <span property="reviewRating" typeof="Rating">
 <span property="ratingValue">1</span> -
 </span>
 <b>"The worst thing I've ever read" </b> by
 <span property="author" typeof="Person">
 <span property="name">Jane Doe</span></span>, written on
 <meta property="datePublished" content="2006-05-10">10 May 2006
 <span property="publisher" typeof="Organization">
 <meta property="name" content="Washington Times">
 </span>
 </div>
 <div rel="schema:aggregateRating">
 <div typeof="schema:AggregateRating">
 <div property="schema:reviewCount" content="89"></div>
 <div property="schema:ratingValue" content="4.4">4,4</div> stars
 </div>
 </div>
 <div rel="schema:offers">
 <div typeof="schema:Offer">
 <div property="schema:price" content="4.99"></div>
 <div property="schema:availability" content="https://schema.org/InStock"></div>
 <div property="schema:priceCurrency" content="GBP"></div>
 <div property="schema:priceValidUntil" datatype="xsd:date" content="2024-11-21"></div>
 <div rel="schema:url" resource="https://example.com/catcher"></div>
 <div property="schema:itemCondition" content="https://schema.org/UsedCondition"></div>
 </div>
 </div>
 </div>
 </body>
</html>
 

 

```
 <html>
 <head>
 <title>The Catcher in the Rye</title>
 </head>
 <body>
 <div vocab="https://schema.org/" typeof="Product">
 <div rel="schema:brand">
 <div typeof="schema:Brand">
 <div property="schema:name" content="Penguin"></div>
 </div>
 </div>
 <div property="schema:description" content="The Catcher in the Rye is a classic coming-of-age story: an story of teenage alienation, capturing the human need for connection and the bewildering sense of loss as we leave childhood behind."></div>
 <div property="schema:sku" content="9780241984758"></div>
 <div property="schema:mpn" content="925872"></div>
 <img property="image" src="https://example.com/photos/1x1/catcher-in-the-rye-book-cover.jpg" alt="Catcher in the Rye"/>
 <span property="name">The Catcher in the Rye</span>
 <div property="review" typeof="Review"> Reviews:
 <span property="reviewRating" typeof="Rating">
 <span property="ratingValue">5</span> -
 </span>
 <b>"A masterpiece of literature" </b> by
 <span property="author" typeof="Person">
 <span property="name">John Doe</span></span>, written on
 <meta property="datePublished" content="2006-05-04">4 May 2006
 <div>I really enjoyed this book. It captures the essential challenge people face as they try make sense of their lives and grow to adulthood.</div>
 <span property="publisher" typeof="Organization">
 <meta property="name" content="Washington Times">
 </span>
 </div><div property="review" typeof="Review">
 <span property="reviewRating" typeof="Rating">
 <span property="ratingValue">1</span> -
 </span>
 <b>"The worst thing I've ever read" </b> by
 <span property="author" typeof="Person">
 <span property="name">Jane Doe</span></span>, written on
 <meta property="datePublished" content="2006-05-10">10 May 2006
 <span property="publisher" typeof="Organization">
 <meta property="name" content="Washington Times">
 </span>
 </div>
 <div rel="schema:aggregateRating">
 <div typeof="schema:AggregateRating">
 <div property="schema:reviewCount" content="89"></div>
 <div property="schema:ratingValue" content="4.4">4,4</div> stars
 </div>
 </div>
 <div rel="schema:offers">
 <div typeof="schema:Offer">
 <div property="schema:price" content="4.99"></div>
 <div property="schema:availability" content="https://schema.org/InStock"></div>
 <div property="schema:priceCurrency" content="GBP"></div>
 <div property="schema:priceValidUntil" datatype="xsd:date" content="2024-11-21"></div>
 <div rel="schema:url" resource="https://example.com/catcher"></div>
 <div property="schema:itemCondition" content="https://schema.org/UsedCondition"></div>
 </div>
 </div>
 </div>
 </body>
</html>
```

 

 
 
### Microdata

 <html>
 <head>
 <title>The Catcher in the Rye</title>
 </head>
 <body>
 <div itemscope itemtype="https://schema.org/Product">
 <div itemprop="brand" itemtype="https://schema.org/Brand" itemscope>
 <meta itemprop="name" content="Penguin" />
 </div>
 <meta itemprop="description" content="The Catcher in the Rye is a classic coming-of-age story: an story of teenage alienation, capturing the human need for connection and the bewildering sense of loss as we leave childhood behind." />
 <meta itemprop="sku" content="0446310786" />
 <meta itemprop="mpn" content="925872" />
 <img itemprop="image" src="https://example.com/photos/1x1/catcher-in-the-rye-book-cover.jpg" alt="Catcher in the Rye"/>
 <span itemprop="name">The Catcher in the Rye</span>
 <div itemprop="review" itemscope itemtype="https://schema.org/Review"> Reviews:
 <span itemprop="reviewRating" itemscope itemtype="https://schema.org/Rating">
 <span itemprop="ratingValue">5</span> -
 </span>
 <b>"A masterpiece of literature" </b> by
 <span itemprop="author" itemscope itemtype="https://schema.org/Person">
 <span itemprop="name">John Doe</span></span>, written on
 <meta itemprop="datePublished" content="2006-05-04">4 May 2006
 <div>I really enjoyed this book. It captures the essential challenge people face as they try make sense of their lives and grow to adulthood.</div>
 <span itemprop="publisher" itemscope itemtype="https://schema.org/Organization">
 <meta itemprop="name" content="Washington Times">
 </span>
 </div><div itemprop="review" itemscope itemtype="https://schema.org/Review">
 <span itemprop="reviewRating" itemscope itemtype="https://schema.org/Rating">
 <span itemprop="ratingValue">1</span> -
 </span>
 <b>"The worst thing I've ever read" </b> by
 <span itemprop="author" itemscope itemtype="https://schema.org/Person">
 <span itemprop="name">Jane Doe</span></span>, written on
 <meta itemprop="datePublished" content="2006-05-10">10 May 2006
 <span itemprop="publisher" itemscope itemtype="https://schema.org/Organization">
 <meta itemprop="name" content="Washington Times">
 </span>
 </div>
 <div itemprop="aggregateRating" itemtype="https://schema.org/AggregateRating" itemscope>
 <meta itemprop="reviewCount" content="89" />
 <span itemprop="ratingValue" content="4.4">4,4</span> stars
 </div>
 <div itemprop="offers" itemtype="https://schema.org/Offer" itemscope>
 <link itemprop="url" href="https://example.com/catcher" />
 <meta itemprop="availability" content="https://schema.org/InStock" />
 <meta itemprop="priceCurrency" content="GBP" />
 <meta itemprop="itemCondition" content="https://schema.org/UsedCondition" />
 <meta itemprop="price" content="4.99" />
 <meta itemprop="priceValidUntil" content="2024-11-21" />
 </div>
 </div>
 </body>
</html>
 

 

```
 <html>
 <head>
 <title>The Catcher in the Rye</title>
 </head>
 <body>
 <div itemscope itemtype="https://schema.org/Product">
 <div itemprop="brand" itemtype="https://schema.org/Brand" itemscope>
 <meta itemprop="name" content="Penguin" />
 </div>
 <meta itemprop="description" content="The Catcher in the Rye is a classic coming-of-age story: an story of teenage alienation, capturing the human need for connection and the bewildering sense of loss as we leave childhood behind." />
 <meta itemprop="sku" content="0446310786" />
 <meta itemprop="mpn" content="925872" />
 <img itemprop="image" src="https://example.com/photos/1x1/catcher-in-the-rye-book-cover.jpg" alt="Catcher in the Rye"/>
 <span itemprop="name">The Catcher in the Rye</span>
 <div itemprop="review" itemscope itemtype="https://schema.org/Review"> Reviews:
 <span itemprop="reviewRating" itemscope itemtype="https://schema.org/Rating">
 <span itemprop="ratingValue">5</span> -
 </span>
 <b>"A masterpiece of literature" </b> by
 <span itemprop="author" itemscope itemtype="https://schema.org/Person">
 <span itemprop="name">John Doe</span></span>, written on
 <meta itemprop="datePublished" content="2006-05-04">4 May 2006
 <div>I really enjoyed this book. It captures the essential challenge people face as they try make sense of their lives and grow to adulthood.</div>
 <span itemprop="publisher" itemscope itemtype="https://schema.org/Organization">
 <meta itemprop="name" content="Washington Times">
 </span>
 </div><div itemprop="review" itemscope itemtype="https://schema.org/Review">
 <span itemprop="reviewRating" itemscope itemtype="https://schema.org/Rating">
 <span itemprop="ratingValue">1</span> -
 </span>
 <b>"The worst thing I've ever read" </b> by
 <span itemprop="author" itemscope itemtype="https://schema.org/Person">
 <span itemprop="name">Jane Doe</span></span>, written on
 <meta itemprop="datePublished" content="2006-05-10">10 May 2006
 <span itemprop="publisher" itemscope itemtype="https://schema.org/Organization">
 <meta itemprop="name" content="Washington Times">
 </span>
 </div>
 <div itemprop="aggregateRating" itemtype="https://schema.org/AggregateRating" itemscope>
 <meta itemprop="reviewCount" content="89" />
 <span itemprop="ratingValue" content="4.4">4,4</span> stars
 </div>
 <div itemprop="offers" itemtype="https://schema.org/Offer" itemscope>
 <link itemprop="url" href="https://example.com/catcher" />
 <meta itemprop="availability" content="https://schema.org/InStock" />
 <meta itemprop="priceCurrency" content="GBP" />
 <meta itemprop="itemCondition" content="https://schema.org/UsedCondition" />
 <meta itemprop="price" content="4.99" />
 <meta itemprop="priceValidUntil" content="2024-11-21" />
 </div>
 </div>
 </body>
</html>
```

 

### Aggregate rating

Here's an example of an aggregate rating.

 
### JSON-LD

 <html>
 <head>
 <title>Legal Seafood</title>
 <script type="application/ld+json">
 {
 "@context": "https://schema.org/",
 "@type": "AggregateRating",
 "itemReviewed": {
 "@type": "Restaurant",
 "image": "https://www.example.com/seafood-restaurant.jpg",
 "name": "Legal Seafood",
 "servesCuisine": "Seafood",
 "telephone": "1234567",
 "address" : {
 "@type": "PostalAddress",
 "streetAddress": "123 William St",
 "addressLocality": "New York",
 "addressRegion": "NY",
 "postalCode": "10038",
 "addressCountry": "US"
 }
 },
 "ratingValue": 88,
 "bestRating": 100,
 "ratingCount": 20
 }
 </script>
 </head>
 <body>
 </body>
</html>
 

 

```
<html>
 <head>
 <title>Legal Seafood</title>
 <script type="application/ld+json">
 {
 "@context": "https://schema.org/",
 "@type": "AggregateRating",
 "itemReviewed": {
 "@type": "Restaurant",
 "image": "https://www.example.com/seafood-restaurant.jpg",
 "name": "Legal Seafood",
 "servesCuisine": "Seafood",
 "telephone": "1234567",
 "address" : {
 "@type": "PostalAddress",
 "streetAddress": "123 William St",
 "addressLocality": "New York",
 "addressRegion": "NY",
 "postalCode": "10038",
 "addressCountry": "US"
 }
 },
 "ratingValue": 88,
 "bestRating": 100,
 "ratingCount": 20
 }
 </script>
 </head>
 <body>
 </body>
</html>
```

 

 
 
### RDFa

 <html>
 <head>
 <title>Legal Seafood</title>
 </head>
 <body>
 <div vocab="https://schema.org/" typeof="AggregateRating">
 <div property="itemReviewed" typeof="Restaurant">
 <img property="image" src="https://example.com/photos/1x1/seafood-restaurant.jpg" alt="Legal Seafood"/>
 <span property="name">Legal Seafood</span>
 <span property="servesCuisine">Seafood</span>
 <span property="telephone">1234567</span>
 <span property="address">123 William St, New York</span>
 </div>
 <span property="ratingValue">4.2</span> out of <span property="bestRating">5</span> stars -
 <span property="ratingCount">123</span> votes
 </div>
 </body>
</html>
 

 

```
 <html>
 <head>
 <title>Legal Seafood</title>
 </head>
 <body>
 <div vocab="https://schema.org/" typeof="AggregateRating">
 <div property="itemReviewed" typeof="Restaurant">
 <img property="image" src="https://example.com/photos/1x1/seafood-restaurant.jpg" alt="Legal Seafood"/>
 <span property="name">Legal Seafood</span>
 <span property="servesCuisine">Seafood</span>
 <span property="telephone">1234567</span>
 <span property="address">123 William St, New York</span>
 </div>
 <span property="ratingValue">4.2</span> out of <span property="bestRating">5</span> stars -
 <span property="ratingCount">123</span> votes
 </div>
 </body>
</html>
```

 

 
 
### Microdata

 <html>
 <head>
 <title>Legal Seafood</title>
 </head>
 <body>
 <div itemscope itemtype="https://schema.org/AggregateRating">
 <div itemprop="itemReviewed" itemscope itemtype="https://schema.org/Restaurant">
 <img itemprop="image" src="https://example.com/photos/1x1/seafood-restaurant.jpg" alt="Legal Seafood"/>
 <span itemprop="name">Legal Seafood</span>
 <span itemprop="servesCuisine">Seafood</span>
 <span itemprop="telephone">1234567</span>
 <span itemprop="address">123 William St, New York</span>
 </div>
 <span itemprop="ratingValue">4.2</span> out of <span itemprop="bestRating">5</span> stars -
 <span itemprop="ratingCount">123</span> votes
 </div>
 </body>
</html>
 

 

```
 <html>
 <head>
 <title>Legal Seafood</title>
 </head>
 <body>
 <div itemscope itemtype="https://schema.org/AggregateRating">
 <div itemprop="itemReviewed" itemscope itemtype="https://schema.org/Restaurant">
 <img itemprop="image" src="https://example.com/photos/1x1/seafood-restaurant.jpg" alt="Legal Seafood"/>
 <span itemprop="name">Legal Seafood</span>
 <span itemprop="servesCuisine">Seafood</span>
 <span itemprop="telephone">1234567</span>
 <span itemprop="address">123 William St, New York</span>
 </div>
 <span itemprop="ratingValue">4.2</span> out of <span itemprop="bestRating">5</span> stars -
 <span itemprop="ratingCount">123</span> votes
 </div>
 </body>
</html>
```

 

### Nested aggregate rating

Here's an example of an aggregate rating that's nested in a `Product`. You can copy and paste the
 example to your own HTML page.

 
 
### JSON-LD

 <html>
 <head>
 <title>Executive Anvil</title>
 <script type="application/ld+json">
 {
 "@context": "https://schema.org/",
 "@type": "Product",
 "name": "Executive Anvil",
 "image": [
 "https://example.com/photos/1x1/photo.jpg",
 "https://example.com/photos/4x3/photo.jpg",
 "https://example.com/photos/16x9/photo.jpg"
 ],
 "brand": {
 "@type": "Brand",
 "name": "ACME"
 },
 "aggregateRating": {
 "@type": "AggregateRating",
 "ratingValue": 4.4,
 "ratingCount": 89
 },
 "offers": {
 "@type": "AggregateOffer",
 "lowPrice": 119.99,
 "highPrice": 199.99,
 "priceCurrency": "USD"
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
 <title>Executive Anvil</title>
 <script type="application/ld+json">
 {
 "@context": "https://schema.org/",
 "@type": "Product",
 "name": "Executive Anvil",
 "image": [
 "https://example.com/photos/1x1/photo.jpg",
 "https://example.com/photos/4x3/photo.jpg",
 "https://example.com/photos/16x9/photo.jpg"
 ],
 "brand": {
 "@type": "Brand",
 "name": "ACME"
 },
 "aggregateRating": {
 "@type": "AggregateRating",
 "ratingValue": 4.4,
 "ratingCount": 89
 },
 "offers": {
 "@type": "AggregateOffer",
 "lowPrice": 119.99,
 "highPrice": 199.99,
 "priceCurrency": "USD"
 }
 }
 </script>
 </head>
 <body>
 </body>
</html>
```

 

 
 
### RDFa

 <html>
 <head>
 <title>Executive Anvil</title>
 </head>
 <body>
 <div vocab="https://schema.org/" typeof="Product">
 <span property="brand" typeof="Brand">ACME</span> <span property="name">Executive Anvil</span>
 <img property="image" src="https://example.com/photos/1x1/anvil_executive.jpg" alt="Executive Anvil logo" />
 <span property="aggregateRating"
 typeof="AggregateRating">
 Average rating: <span property="ratingValue">4.4</span>, based on
 <span property="ratingCount">89</span> reviews
 </span>
 <span property="offers" typeof="AggregateOffer">
 from $<span property="lowPrice">119.99</span> to
 $<span property="highPrice">199.99</span>
 <meta property="priceCurrency" content="USD" />
 </span>
 </div>
 </body>
</html>
 

 

```
 <html>
 <head>
 <title>Executive Anvil</title>
 </head>
 <body>
 <div vocab="https://schema.org/" typeof="Product">
 <span property="brand" typeof="Brand">ACME</span> <span property="name">Executive Anvil</span>
 <img property="image" src="https://example.com/photos/1x1/anvil_executive.jpg" alt="Executive Anvil logo" />
 <span property="aggregateRating"
 typeof="AggregateRating">
 Average rating: <span property="ratingValue">4.4</span>, based on
 <span property="ratingCount">89</span> reviews
 </span>
 <span property="offers" typeof="AggregateOffer">
 from $<span property="lowPrice">119.99</span> to
 $<span property="highPrice">199.99</span>
 <meta property="priceCurrency" content="USD" />
 </span>
 </div>
 </body>
</html>
```

 

 
 
### Microdata

 <html>
 <head>
 <title>Executive Anvil</title>
 </head>
 <body>
 <div itemscope itemtype="https://schema.org/Product">
 <span itemprop="brand" itemtype="https://schema.org/Brand" itemscope>ACME</span> <span itemprop="name">Executive Anvil</span>
 <img itemprop="image" src="https://example.com/photos/1x1/anvil_executive.jpg" />
 <span itemprop="aggregateRating" itemscope itemtype="https://schema.org/AggregateRating">
 Average rating: <span itemprop="ratingValue">4.4</span>, based on
 <span itemprop="ratingCount">89</span> reviews
 </span>
 <span itemprop="offers" itemscope itemtype="https://schema.org/AggregateOffer">
 from $<span itemprop="lowPrice">119.99</span> to
 $<span itemprop="highPrice">199.99</span>
 <meta itemprop="priceCurrency" content="USD" />
 </span>
 </div>
 </body>
</html>
 

 

```
 <html>
 <head>
 <title>Executive Anvil</title>
 </head>
 <body>
 <div itemscope itemtype="https://schema.org/Product">
 <span itemprop="brand" itemtype="https://schema.org/Brand" itemscope>ACME</span> <span itemprop="name">Executive Anvil</span>
 <img itemprop="image" src="https://example.com/photos/1x1/anvil_executive.jpg" />
 <span itemprop="aggregateRating" itemscope itemtype="https://schema.org/AggregateRating">
 Average rating: <span itemprop="ratingValue">4.4</span>, based on
 <span itemprop="ratingCount">89</span> reviews
 </span>
 <span itemprop="offers" itemscope itemtype="https://schema.org/AggregateOffer">
 from $<span itemprop="lowPrice">119.99</span> to
 $<span itemprop="highPrice">199.99</span>
 <meta itemprop="priceCurrency" content="USD" />
 </span>
 </div>
 </body>
</html>
```

 

 

## Guidelines

Your content must follow these guidelines to be eligible to appear as a rich result.

Warning: If your site violates one or more of these guidelines,
 then Google may take [manual action](https://support.google.com/webmasters/answer/2604824)
 against it. Once you have remedied the problem, you can submit your site for
 [reconsideration](https://support.google.com/webmasters/answer/35843).

 
- [Technical guidelines](https://developers.google.com#technical-guidelines)
 
- [Search Essentials](https://developers.google.com/search/docs/essentials)
 
- [General structured data guidelines](https://developers.google.com/search/docs/appearance/structured-data/sd-policies)

### Technical guidelines

 
- Make sure to mark up an aggregate evaluation of an item by many people with
 [schema.org/AggregateRating](https://schema.org/AggregateRating). Google may
 display aggregate ratings as rich snippets or, for certain types of items, answers in
 search results.
 
- Refer clearly to a specific product or service by nesting the review within the markup of
 another schema.org type, such as [schema.org/Book](https://schema.org/Book) or
 [schema.org/Recipe](https://schema.org/Recipe), or by using a
 schema.org type as a value for the `itemReviewed` property.
 
- Make sure the review content you mark up are readily available to users from the
 marked-up page. It must be immediately obvious to users that the page has review
 content. For example, if you marked up reviews, users should be able to see the text of the
 review and associated rating. If you use `AggregateRating`, users should be able to
 see that aggregate rating on the page.
 
- We recommend only accepting ratings that are accompanied by a review comment and author's name.
 While not required, this approach can help your users see supporting details that explain the
 rating.
 
- Provide review information about a specific item, not about a category or a list of
 items.
 
 
- If you include multiple individual reviews, also include an aggregate rating of the individual reviews.
 
- Don't aggregate reviews or ratings from other websites.
 
- If the review snippet is for a local business or an organization, you must follow these additional guidelines:
 
 
- If the entity that's being reviewed controls the reviews about itself, their pages
 that use `LocalBusiness` or any other type of `Organization`
 structured data are ineligible for star review feature. For example, a review about entity A is placed on
 the website of entity A, either directly in their structured data or through an
 embedded third-party widget (for example, Google Business reviews or Facebook reviews widget).
 For more information, check out our
 [blog post on why we added this guideline](https://developers.google.com/search/blog/2019/09/making-review-rich-results-more-helpful#updated)
 and our [FAQ about the change](https://developers.google.com/search/blog/2019/09/making-review-rich-results-more-helpful#faq).
 
 
- Ratings must be sourced directly from users.
 
- Don't rely on human editors to create, curate, or compile ratings information for
 local businesses.
 

 

## Structured data type definitions

You must include the required properties for your structured data to display in search
 results. You can also include the recommended properties to add more information to your
 structured data, which could provide a better user experience.

### `Review`

The full definition of `Review` is available at
 [schema.org/Review](https://schema.org/Review).

 The Google-supported properties are the following:

 
 
 
 Required properties | 

 
 
 
 `author` | 
 `[Person](https://schema.org/Person)` or
 `[Organization](https://schema.org/Organization)`

 The author of the review. The reviewer's name must be a valid name. For example,
 "50% off until Saturday" is not a valid name for a reviewer.

 This field must be shorter than 100 characters. If it's longer than 100 characters,
 your page won't be eligible for an author-based review snippet.

 
 To help Google best
 understand authors across various features, consider following the
 [author markup best practices](https://developers.google.com/search/docs/appearance/structured-data/article#author-bp).
 

 | 
 

 
 
 `itemReviewed` (if review is not a [Nested Review](https://developers.google.com#embedded-review-example))
 | 
 
 One of the valid types

 The item that is being reviewed. However, if the review is nested into another
 schema.org type using the
 `[review](https://schema.org/review)` property,
 omit the `itemReviewed` property (we assume the parent item is the reviewed item).

 
 The valid types for the reviewed item are:

 
 
- `[Book](https://schema.org/Book)`
 
- `[Course](https://schema.org/Course)`
 
- `[CreativeWorkSeason](https://schema.org/CreativeWorkSeason)`
 
- `[CreativeWorkSeries](https://schema.org/CreativeWorkSeries)`
 
- `[Episode](https://schema.org/Episode)`
 
- `[Event](https://schema.org/Event)`
 
- `[Game](https://schema.org/Game)`
 
- `[HowTo](https://schema.org/HowTo)`
 
- `[LocalBusiness](https://schema.org/LocalBusiness)`
 
- `[MediaObject](https://schema.org/MediaObject)`
 
- `[Movie](https://schema.org/Movie)`
 
- `[MusicPlaylist](https://schema.org/MusicPlaylist)`
 
- `[MusicRecording](https://schema.org/MusicRecording)`
 
- `[Organization](https://schema.org/Organization)`
 
- `[Product](https://schema.org/Product)`
 
- `[Recipe](https://schema.org/Recipe)`
 
- `[SoftwareApplication](https://schema.org/SoftwareApplication)`
 

 | 
 

 
 
 `itemReviewed.name` or parent item `name` in [Nested Review](https://developers.google.com#embedded-review-example)
 | 
 
 `[Text](https://schema.org/Text)`

 The name of the item that is being reviewed. If the review is nested into another
 schema.org type using the
 `[review](https://schema.org/review)` property,
 you still need to provide the `name` of the thing that is being reviewed. For example:

 

```
{
 "@context": "https://schema.org/",
 "@type": "Game",
 "name": "Firefly",
 "review": {
 "@type": "Review",
 "reviewRating": {
 "@type": "Rating",
 "ratingValue": 5
 },
 "author": {
 "@type": "Person",
 "name": "John Doe"
 }
 }
}
```

 | 
 

 
 
 `reviewRating`
 | 
 
 `[Rating](https://schema.org/Rating)`

 The rating given in this review. The rating can be a nested
 [`Rating`](https://schema.org/Rating) or more specific subtype. The most typical
 subtype is [`AggregateRating`](https://developers.google.com#aggregated-rating-type-definition).

 | 
 

 
 
 `reviewRating.ratingValue`
 | 
 
 `[Number](https://schema.org/Number)` or
 `[Text](https://schema.org/Text)`

 A numerical quality rating for the item, either a number, fraction, or percentage (for
 example, `4`, `60%`, or `6 / 10`).
 Google understands the scale for fractions and percentages, since the scale is
 implied in the fraction itself or the percentage. The default scale for numbers is a
 5-point scale, where 1 is the lowest value and 5 is the highest value. If another scale is
 intended, use `bestRating` and `worstRating`.

 For decimal numbers, use a dot instead of a comma to specify the value (for example
 `4.4` instead of `4,4`). In Microdata and RDFa, you can use
 `content` attributes to override the visible content. That way, you can show
 the user whatever style convention you want, while also satisfying the dot requirement
 for structured data. For example:

 

```
<span itemprop="ratingValue" content="4.4">4,4</span> stars
```

 | 
 

 
 

 
 
 
 Recommended properties | 

 
 
 
 `datePublished` | 
 
 `[Date](https://schema.org/Date)`

 The date that the review was published, in
 [ISO 8601](https://en.wikipedia.org/wiki/ISO_8601) date
 format.
 

 | 
 

 
 
 `reviewRating.bestRating`
 | 
 
 `[Number](https://schema.org/Number)`

 The highest value allowed in this rating system. If `bestRating`
 is omitted, 5 is assumed.

 | 
 

 
 
 `reviewRating.worstRating`
 | 
 
 `[Number](https://schema.org/Number)`

 The lowest value allowed in this rating system. If `worstRating`
 is omitted, 1 is assumed.

 | 
 

 
 

 
### `AggregateRating`

 The full definition of `AggregateRating` is available at
 [schema.org/AggregateRating](https://schema.org/AggregateRating).

 The Google-supported properties are the following:

 
 
 
 Required properties | 

 
 
 
 
 `itemReviewed` (if aggregate rating is not a [Nested Aggregate Rating](https://developers.google.com#embedded-aggregate-rating))
 | 
 
 One of the valid types

 The item that is being rated. However, if the aggregate rating is nested into
 another schema.org type using the
 `[aggregateRating](https://schema.org/aggregateRating)`
 property, omit the `itemReviewed` property.

 
 The valid types for the reviewed item are:

 
 
- `[Book](https://schema.org/Book)`
 
- `[Course](https://schema.org/Course)`
 
- `[CreativeWorkSeason](https://schema.org/CreativeWorkSeason)`
 
- `[CreativeWorkSeries](https://schema.org/CreativeWorkSeries)`
 
- `[Episode](https://schema.org/Episode)`
 
- `[Event](https://schema.org/Event)`
 
- `[Game](https://schema.org/Game)`
 
- `[HowTo](https://schema.org/HowTo)`
 
- `[LocalBusiness](https://schema.org/LocalBusiness)`
 
- `[MediaObject](https://schema.org/MediaObject)`
 
- `[Movie](https://schema.org/Movie)`
 
- `[MusicPlaylist](https://schema.org/MusicPlaylist)`
 
- `[MusicRecording](https://schema.org/MusicRecording)`
 
- `[Organization](https://schema.org/Organization)`
 
- `[Product](https://schema.org/Product)`
 
- `[Recipe](https://schema.org/Recipe)`
 
- `[SoftwareApplication](https://schema.org/SoftwareApplication)`
 

 | 
 

 
 
 `itemReviewed.name` or parent item `name` in [Nested Aggregate Rating](https://developers.google.com#embedded-aggregate-rating)
 | 
 
 `[Text](https://schema.org/Text)`

 The name of the item that is being reviewed. If the review is nested into another
 schema.org type using the
 `[aggregateRating](https://schema.org/aggregateRating)` property,
 you still need to provide the `name` of the thing that is being reviewed. For example:

 

```
{
 "@context": "https://schema.org/",
 "@type": "Game",
 "name": "Firefly",
 "aggregateRating": {
 "@type": "AggregateRating",
 "ratingValue": 88,
 "bestRating": 100,
 "ratingCount": 20
 }
}
```

 | 
 

 
 
 `ratingCount`
 | 
 
 `[Number](https://schema.org/Number)`

 The total number of ratings for the item on your site. At least one of
 `ratingCount` or `reviewCount` is required.

 | 
 

 
 
 `reviewCount`
 | 
 
 `[Number](https://schema.org/Number)`

 Specifies the number of people who provided a review with or without an accompanying
 rating. At least one of `ratingCount` or `reviewCount` is required.
 

 | 
 

 
 
 `ratingValue`
 | 
 
 `[Number](https://schema.org/Number)` or
 `[Text](https://schema.org/Text)`

 The average rating for the item's quality using a numerical rating of either a number,
 fraction, or percentage (for example, `4`, `60%`, or `6 / 10`).
 Google understands the scale for fractions and percentages, since the scale is
 implied in the fraction itself or the percentage. The default scale for numbers is a
 5-point scale, where 1 is the lowest value and 5 is the highest value. If another scale is
 intended, use `bestRating` and `worstRating`.

 For decimal numbers, use a dot instead of a comma to specify the value (for example
 `4.4` instead of `4,4`). In Microdata and RDFa, you can use
 `content` attributes to override the visible content. That way, you can show
 the user whatever style convention you want, while also satisfying the dot requirement
 for structured data. For example:

 

```
<span itemprop="ratingValue" content="4.4">4,4</span> stars
```

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
 

 

## Monitor rich results with Search Console

 
 Search Console is a tool that helps you monitor how your pages perform in Google Search.
 You don't have to sign up for Search Console to be included in Google Search results,
 but it can help you understand and improve how Google sees your site. We
 recommend checking Search Console in the following cases:
 
 
- [After deploying structured data for the first time](https://developers.google.com#after-deploying)
 
- [After releasing new templates or updating your code](https://developers.google.com#after-releasing)
 
- [Analyzing traffic periodically](https://developers.google.com#analyzing-periodically)
 

 
 
 

 
### After deploying structured data for the first time

 
 After Google has indexed your pages, look for issues using the relevant
 [Rich result status report](https://support.google.com/webmasters/answer/7552505).
 Ideally, there will be an increase of valid items, and no increase in invalid items. If you find issues
 in your structured data:

 
 
- [Fix the invalid items](https://developers.google.com#troubleshooting).
 
- [Inspect a live URL](https://support.google.com/webmasters/answer/9012289#test_live_page) to check if the issue persists.
 
- [Request validation](https://support.google.com/webmasters/answer/13300208) using the status report.
 

 
### After releasing new templates or updating your code

 When you make significant changes to your website, monitor for increases in structured data invalid items.
 
 
- If you see an increase in invalid items, perhaps you rolled out a new template that doesn't work, or your site interacts with the existing
 template in a new and bad way.
 
- If you see a decrease in valid items (not matched by an increase in invalid items), perhaps you are
 no longer embedding structured data in your pages. Use the [URL Inspection tool](https://support.google.com/webmasters/answer/9012289) to learn what is causing the issue.
 

 
### Analyzing traffic periodically

 Analyze your Google Search traffic using the [Performance Report](https://support.google.com/webmasters/answer/7576553).
 The data will show you how often your page appears as a rich result in Search, how often users click on it and what is
 the average position you appear on search results. You can also automatically pull these
 results with the [Search Console API](https://developers.google.com/webmaster-tools/search-console-api-original/v3/how-tos/search_analytics).

 
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
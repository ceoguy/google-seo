---
source: https://developers.google.com/search/docs/appearance/structured-data/product-snippet
title: "How To Add Product Snippet Structured Data"
fetched: 2026-07-08
---

# Product snippet (`Product`, `Review`, `Offer`) structured data

 

 When you add `Product` markup to your page, it can be eligible for display as a product
 snippet, which is a [text result](https://developers.google.com/search/docs/appearance/visual-elements-gallery#text-result)
 that includes additional product information such as ratings, review information, price,
 and availability.

 This guide focuses on the `Product` structured data requirements for
 product snippets. If you're not sure which markup to use, read our
 [intro to `Product` markup](https://developers.google.com/search/docs/appearance/structured-data/product).

Can customers purchase products from you? Consider adding
 [merchant listing markup](https://developers.google.com/search/docs/appearance/structured-data/merchant-listing).

 
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

 The following examples illustrate how to include structured data on your web pages for different
 situations.

### Product review page

Here's an example of structured data on a product review page for product snippets treatment in search results.

 
 
#### JSON-LD

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
 "description": "Sleeker than ACME's Classic Anvil, the Executive Anvil is perfect for the business traveler looking for something to drop from a height.",
 "sku": "0446310786",
 "mpn": "925872",
 "brand": {
 "@type": "Brand",
 "name": "ACME"
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
 "name": "Fred Benson"
 }
 },
 "aggregateRating": {
 "@type": "AggregateRating",
 "ratingValue": 4.4,
 "reviewCount": 89
 },
 "offers": {
 "@type": "Offer",
 "url": "https://example.com/anvil",
 "priceCurrency": "USD",
 "price": 119.99,
 "priceValidUntil": "2024-11-20",
 "itemCondition": "https://schema.org/UsedCondition",
 "availability": "https://schema.org/InStock"
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
 "description": "Sleeker than ACME's Classic Anvil, the Executive Anvil is perfect for the business traveler looking for something to drop from a height.",
 "review": {
 "@type": "Review",
 "reviewRating": {
 "@type": "Rating",
 "ratingValue": 4,
 "bestRating": 5
 },
 "author": {
 "@type": "Person",
 "name": "Fred Benson"
 }
 },
 "aggregateRating": {
 "@type": "AggregateRating",
 "ratingValue": 4.4,
 "reviewCount": 89
 }
 }
 </script>
 </head>
 <body>
 </body>
</html>
```

 

 
 
#### RDFa

 <html>
 <head>
 <title>Executive Anvil</title>
 </head>
 <body>
 <div typeof="schema:Product">
 <div rel="schema:review">
 <div typeof="schema:Review">
 <div rel="schema:reviewRating">
 <div typeof="schema:Rating">
 <div property="schema:ratingValue" content="4"></div>
 <div property="schema:bestRating" content="5"></div>
 </div>
 </div>
 <div rel="schema:author">
 <div typeof="schema:Person">
 <div property="schema:name" content="Fred Benson"></div>
 </div>
 </div>
 </div>
 </div>
 <div rel="schema:image" resource="https://example.com/photos/4x3/photo.jpg"></div>
 <div property="schema:mpn" content="925872"></div>
 <div property="schema:name" content="Executive Anvil"></div>
 <div property="schema:description" content="Sleeker than ACME's Classic Anvil, the Executive Anvil is perfect for the business traveler looking for something to drop from a height."></div>
 <div rel="schema:image" resource="https://example.com/photos/1x1/photo.jpg"></div>
 <div rel="schema:brand">
 <div typeof="schema:Brand">
 <div property="schema:name" content="ACME"></div>
 </div>
 </div>
 <div rel="schema:aggregateRating">
 <div typeof="schema:AggregateRating">
 <div property="schema:reviewCount" content="89"></div>
 <div property="schema:ratingValue" content="4.4"></div>
 </div>
 </div>
 <div rel="schema:offers">
 <div typeof="schema:Offer">
 <div property="schema:price" content="119.99"></div>
 <div property="schema:availability" content="https://schema.org/InStock"></div>
 <div property="schema:priceCurrency" content="USD"></div>
 <div property="schema:priceValidUntil" datatype="xsd:date" content="2024-11-20"></div>
 <div rel="schema:url" resource="https://example.com/anvil"></div>
 <div property="schema:itemCondition" content="https://schema.org/UsedCondition"></div>
 </div>
 </div>
 <div rel="schema:image" resource="https://example.com/photos/16x9/photo.jpg"></div>
 <div property="schema:sku" content="0446310786"></div>
 </div>
 </body>
</html>
 

 

```
 <html>
 <head>
 <title>Executive Anvil</title>
 </head>
 <body>
 <div typeof="schema:Product">
 <div rel="schema:review">
 <div typeof="schema:Review">
 <div rel="schema:reviewRating">
 <div typeof="schema:Rating">
 <div property="schema:ratingValue" content="4"></div>
 <div property="schema:bestRating" content="5"></div>
 </div>
 </div>
 <div rel="schema:author">
 <div typeof="schema:Person">
 <div property="schema:name" content="Fred Benson"></div>
 </div>
 </div>
 </div>
 </div>
 <div property="schema:name" content="Executive Anvil"></div>
 <div property="schema:description" content="Sleeker than ACME's Classic Anvil, the Executive Anvil is perfect for the business traveler looking for something to drop from a height."></div>
 <div rel="schema:aggregateRating">
 <div typeof="schema:AggregateRating">
 <div property="schema:reviewCount" content="89"></div>
 <div property="schema:ratingValue" content="4.4"></div>
 </div>
 </div>
 </div>
 </body>
</html>
```

 

 
 
#### Microdata

 <html>
 <head>
 <title>Executive Anvil</title>
 </head>
 <body>
 <div>
 <div itemtype="https://schema.org/Product" itemscope>
 <meta itemprop="mpn" content="925872" />
 <meta itemprop="name" content="Executive Anvil" />
 <link itemprop="image" href="https://example.com/photos/16x9/photo.jpg" />
 <link itemprop="image" href="https://example.com/photos/4x3/photo.jpg" />
 <link itemprop="image" href="https://example.com/photos/1x1/photo.jpg" />
 <meta itemprop="description" content="Sleeker than ACME's Classic Anvil, the Executive Anvil is perfect for the business traveler looking for something to drop from a height." />
 <div itemprop="offers" itemtype="https://schema.org/Offer" itemscope>
 <link itemprop="url" href="https://example.com/anvil" />
 <meta itemprop="availability" content="https://schema.org/InStock" />
 <meta itemprop="priceCurrency" content="USD" />
 <meta itemprop="itemCondition" content="https://schema.org/UsedCondition" />
 <meta itemprop="price" content="119.99" />
 <meta itemprop="priceValidUntil" content="2024-11-20" />
 </div>
 <div itemprop="aggregateRating" itemtype="https://schema.org/AggregateRating" itemscope>
 <meta itemprop="reviewCount" content="89" />
 <meta itemprop="ratingValue" content="4.4" />
 </div>
 <div itemprop="review" itemtype="https://schema.org/Review" itemscope>
 <div itemprop="author" itemtype="https://schema.org/Person" itemscope>
 <meta itemprop="name" content="Fred Benson" />
 </div>
 <div itemprop="reviewRating" itemtype="https://schema.org/Rating" itemscope>
 <meta itemprop="ratingValue" content="4" />
 <meta itemprop="bestRating" content="5" />
 </div>
 </div>
 <meta itemprop="sku" content="0446310786" />
 <div itemprop="brand" itemtype="https://schema.org/Brand" itemscope>
 <meta itemprop="name" content="ACME" />
 </div>
 </div>
 </div>
 </body>
</html>
 

 

```
 <html>
 <head>
 <title>Executive Anvil</title>
 </head>
 <body>
 <div>
 <div itemtype="https://schema.org/Product" itemscope>
 <meta itemprop="name" content="Executive Anvil" />
 <meta itemprop="description" content="Sleeker than ACME's Classic Anvil, the Executive Anvil is perfect for the business traveler looking for something to drop from a height." />
 <div itemprop="aggregateRating" itemtype="https://schema.org/AggregateRating" itemscope>
 <meta itemprop="reviewCount" content="89" />
 <meta itemprop="ratingValue" content="4.4" />
 </div>
 <div itemprop="review" itemtype="https://schema.org/Review" itemscope>
 <div itemprop="author" itemtype="https://schema.org/Person" itemscope>
 <meta itemprop="name" content="Fred Benson" />
 </div>
 <div itemprop="reviewRating" itemtype="https://schema.org/Rating" itemscope>
 <meta itemprop="ratingValue" content="4" />
 <meta itemprop="bestRating" content="5" />
 </div>
 </div>
 </div>
 </div>
 </body>
</html>
```

 

### Pros and cons

Here's an example of an editorial product review page with pros and cons for product snippets
 treatment in search results.

 
 
#### JSON-LD

 <html>
 <head>
 <title>Cheese Knife Pro review</title>
 <script type="application/ld+json">
 {
 "@context": "https://schema.org",
 "@type": "Product",
 "name": "Cheese Grater Pro",
 "review": {
 "@type": "Review",
 "name": "Cheese Knife Pro review",
 "author": {
 "@type": "Person",
 "name": "Pascal Van Cleeff"
 },
 "positiveNotes": {
 "@type": "ItemList",
 "itemListElement": [
 {
 "@type": "ListItem",
 "position": 1,
 "name": "Consistent results"
 },
 {
 "@type": "ListItem",
 "position": 2,
 "name": "Still sharp after many uses"
 }
 ]
 },
 "negativeNotes": {
 "@type": "ItemList",
 "itemListElement": [
 {
 "@type": "ListItem",
 "position": 1,
 "name": "No child protection"
 },
 {
 "@type": "ListItem",
 "position": 2,
 "name": "Lacking advanced features"
 }
 ]
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
 <title>Cheese Knife Pro review</title>
 <script type="application/ld+json">
 {
 "@context": "https://schema.org",
 "@type": "Product",
 "name": "Cheese Grater Pro",
 "review": {
 "@type": "Review",
 "name": "Cheese Knife Pro review",
 "author": {
 "@type": "Person",
 "name": "Pascal Van Cleeff"
 },
 "positiveNotes": {
 "@type": "ItemList",
 "itemListElement": [
 {
 "@type": "ListItem",
 "position": 1,
 "name": "Consistent results"
 },
 {
 "@type": "ListItem",
 "position": 2,
 "name": "Still sharp after many uses"
 }
 ]
 },
 "negativeNotes": {
 "@type": "ItemList",
 "itemListElement": [
 {
 "@type": "ListItem",
 "position": 1,
 "name": "No child protection"
 },
 {
 "@type": "ListItem",
 "position": 2,
 "name": "Lacking advanced features"
 }
 ]
 }
 }
 }
 </script>
 </head>
 <body>
 </body>
</html>
```

 

 
 
#### RDFa

 <html>
 <head>
 <title>Cheese Knife Pro review</title>
 </head>
 <body>
 <div typeof="schema:Product">
 <div property="schema:name" content="Cheese Knife Pro review"></div>
 <div rel="schema:review">
 <div typeof="schema:Review">
 <div rel="schema:positiveNotes">
 <div typeof="schema:ItemList">
 <div rel="schema:itemListElement">
 <div typeof="schema:ListItem">
 <div property="schema:position" content="1"></div>
 <div property="schema:name" content="Consistent results"></div>
 </div>
 <div typeof="schema:ListItem">
 <div property="schema:position" content="2"></div>
 <div property="schema:name" content="Still sharp after many uses"></div>
 </div>
 </div>
 </div>
 </div>
 <div rel="schema:negativeNotes">
 <div typeof="schema:ItemList">
 <div rel="schema:itemListElement">
 <div typeof="schema:ListItem">
 <div property="schema:position" content="1"></div>
 <div property="schema:name" content="No child protection"></div>
 </div>
 <div typeof="schema:ListItem">
 <div property="schema:position" content="2"></div>
 <div property="schema:name" content="Lacking advanced features"></div>
 </div>
 </div>
 </div>
 </div>
 <div rel="schema:author">
 <div typeof="schema:Person">
 <div property="schema:name" content="Pascal Van Cleeff"></div>
 </div>
 </div>
 </div>
 </div>
 </div>
 </body>
</html>
 

 

```
 <html>
 <head>
 <title>Cheese Knife Pro review</title>
 </head>
 <body>
 <div typeof="schema:Product">
 <div property="schema:name" content="Cheese Knife Pro review"></div>
 <div rel="schema:review">
 <div typeof="schema:Review">
 <div rel="schema:positiveNotes">
 <div typeof="schema:ItemList">
 <div rel="schema:itemListElement">
 <div typeof="schema:ListItem">
 <div property="schema:position" content="1"></div>
 <div property="schema:name" content="Consistent results"></div>
 </div>
 <div typeof="schema:ListItem">
 <div property="schema:position" content="2"></div>
 <div property="schema:name" content="Still sharp after many uses"></div>
 </div>
 </div>
 </div>
 </div>
 <div rel="schema:negativeNotes">
 <div typeof="schema:ItemList">
 <div rel="schema:itemListElement">
 <div typeof="schema:ListItem">
 <div property="schema:position" content="1"></div>
 <div property="schema:name" content="No child protection"></div>
 </div>
 <div typeof="schema:ListItem">
 <div property="schema:position" content="2"></div>
 <div property="schema:name" content="Lacking advanced features"></div>
 </div>
 </div>
 </div>
 </div>
 <div rel="schema:author">
 <div typeof="schema:Person">
 <div property="schema:name" content="Pascal Van Cleeff"></div>
 </div>
 </div>
 </div>
 </div>
 </div>
 </body>
</html>
```

 

 
 
#### Microdata

 <html>
 <head>
 <title>Cheese Knife Pro review</title>
 </head>
 <body>
 <div itemtype="https://schema.org/Product" itemscope>
 <meta itemprop="name" content="Cheese Knife Pro" />
 <div itemprop="review" itemtype="https://schema.org/Review" itemscope>
 <div itemprop="author" itemtype="https://schema.org/Person" itemscope>
 <meta itemprop="name" content="Pascal Van Cleeff" />
 </div>
 <div itemprop="positiveNotes" itemtype="https://schema.org/ItemList" itemscope>
 <div itemprop="itemListElement" itemtype="https://schema.org/ListItem" itemscope>
 <meta itemprop="position" content="1" />
 <meta itemprop="name" content="Consistent results" />
 </div>
 <div itemprop="itemListElement" itemtype="https://schema.org/ListItem" itemscope>
 <meta itemprop="position" content="2" />
 <meta itemprop="name" content="Still sharp after many uses" />
 </div>
 </div>
 <div itemprop="negativeNotes" itemtype="https://schema.org/ItemList" itemscope>
 <div itemprop="itemListElement" itemtype="https://schema.org/ListItem" itemscope>
 <meta itemprop="position" content="1" />
 <meta itemprop="name" content="No child protection" />
 </div>
 <div itemprop="itemListElement" itemtype="https://schema.org/ListItem" itemscope>
 <meta itemprop="position" content="2" />
 <meta itemprop="name" content="Lacking advanced features" />
 </div>
 </div>
 </div>
 </div>
 </body>
</html>
 

 

```
 <html>
 <head>
 <title>Cheese Knife Pro review</title>
 </head>
 <body>
 <div itemtype="https://schema.org/Product" itemscope>
 <meta itemprop="name" content="Cheese Knife Pro" />
 <div itemprop="review" itemtype="https://schema.org/Review" itemscope>
 <div itemprop="author" itemtype="https://schema.org/Person" itemscope>
 <meta itemprop="name" content="Pascal Van Cleeff" />
 </div>
 <div itemprop="positiveNotes" itemtype="https://schema.org/ItemList" itemscope>
 <div itemprop="itemListElement" itemtype="https://schema.org/ListItem" itemscope>
 <meta itemprop="position" content="1" />
 <meta itemprop="name" content="Consistent results" />
 </div>
 <div itemprop="itemListElement" itemtype="https://schema.org/ListItem" itemscope>
 <meta itemprop="position" content="2" />
 <meta itemprop="name" content="Still sharp after many uses" />
 </div>
 </div>
 <div itemprop="negativeNotes" itemtype="https://schema.org/ItemList" itemscope>
 <div itemprop="itemListElement" itemtype="https://schema.org/ListItem" itemscope>
 <meta itemprop="position" content="1" />
 <meta itemprop="name" content="No child protection" />
 </div>
 <div itemprop="itemListElement" itemtype="https://schema.org/ListItem" itemscope>
 <meta itemprop="position" content="2" />
 <meta itemprop="name" content="Lacking advanced features" />
 </div>
 </div>
 </div>
 </div>
 </body>
</html>
```

 

### Shopping aggregator page

Here's an example of a shopping aggregator page for product snippets treatment in search results.

 
 
#### JSON-LD

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
 "description": "Sleeker than ACME's Classic Anvil, the Executive Anvil is perfect for the business traveler looking for something to drop from a height.",
 "sku": "0446310786",
 "mpn": "925872",
 "brand": {
 "@type": "Brand",
 "name": "ACME"
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
 "name": "Fred Benson"
 }
 },
 "aggregateRating": {
 "@type": "AggregateRating",
 "ratingValue": 4.4,
 "reviewCount": 89
 },
 "offers": {
 "@type": "AggregateOffer",
 "offerCount": 5,
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
 "description": "Sleeker than ACME's Classic Anvil, the Executive Anvil is perfect for the business traveler looking for something to drop from a height.",
 "sku": "0446310786",
 "mpn": "925872",
 "brand": {
 "@type": "Brand",
 "name": "ACME"
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
 "name": "Fred Benson"
 }
 },
 "aggregateRating": {
 "@type": "AggregateRating",
 "ratingValue": 4.4,
 "reviewCount": 89
 },
 "offers": {
 "@type": "AggregateOffer",
 "offerCount": 5,
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

 

 
 
#### RDFa

 <html>
 <head>
 <title>Executive Anvil</title>
 </head>
 <body>
 <div typeof="schema:Product">
 <div rel="schema:review">
 <div typeof="schema:Review">
 <div rel="schema:reviewRating">
 <div typeof="schema:Rating">
 <div property="schema:ratingValue" content="4"></div>
 <div property="schema:bestRating" content="5"></div>
 </div>
 </div>
 <div rel="schema:author">
 <div typeof="schema:Person">
 <div property="schema:name" content="Fred Benson"></div>
 </div>
 </div>
 </div>
 </div>
 <div rel="schema:aggregateRating">
 <div typeof="schema:AggregateRating">
 <div property="schema:reviewCount" content="89"></div>
 <div property="schema:ratingValue" content="4.4"></div>
 </div>
 </div>
 <div rel="schema:image" resource="https://example.com/photos/4x3/photo.jpg"></div>
 <div property="schema:mpn" content="925872"></div>
 <div property="schema:name" content="Executive Anvil"></div>
 <div property="schema:description" content="Sleeker than ACME's Classic Anvil, the Executive Anvil is perfect for the business traveler looking for something to drop from a height."></div>
 <div rel="schema:image" resource="https://example.com/photos/1x1/photo.jpg">
 </div>
 <div rel="schema:brand">
 <div typeof="schema:Brand">
 <div property="schema:name" content="ACME"></div>
 </div>
 </div>
 <div rel="schema:offers">
 <div typeof="schema:AggregateOffer">
 <div property="schema:offerCount" content="5"></div>
 <div property="schema:lowPrice" content="119.99"></div>
 <div property="schema:highPrice" content="199.99"></div>
 <div property="schema:priceCurrency" content="USD"></div>
 <div rel="schema:url" resource="https://example.com/anvil"></div>
 </div>
 </div>
 <div rel="schema:image" resource="https://example.com/photos/16x9/photo.jpg"></div>
 <div property="schema:sku" content="0446310786"></div>
 </div>
 </body>
</html>
 

 

```
 <html>
 <head>
 <title>Executive Anvil</title>
 </head>
 <body>
 <div typeof="schema:Product">
 <div rel="schema:review">
 <div typeof="schema:Review">
 <div rel="schema:reviewRating">
 <div typeof="schema:Rating">
 <div property="schema:ratingValue" content="4"></div>
 <div property="schema:bestRating" content="5"></div>
 </div>
 </div>
 <div rel="schema:author">
 <div typeof="schema:Person">
 <div property="schema:name" content="Fred Benson"></div>
 </div>
 </div>
 </div>
 </div>
 <div rel="schema:aggregateRating">
 <div typeof="schema:AggregateRating">
 <div property="schema:reviewCount" content="89"></div>
 <div property="schema:ratingValue" content="4.4"></div>
 </div>
 </div>
 <div rel="schema:image" resource="https://example.com/photos/4x3/photo.jpg"></div>
 <div property="schema:mpn" content="925872"></div>
 <div property="schema:name" content="Executive Anvil"></div>
 <div property="schema:description" content="Sleeker than ACME's Classic Anvil, the Executive Anvil is perfect for the business traveler looking for something to drop from a height."></div>
 <div rel="schema:image" resource="https://example.com/photos/1x1/photo.jpg">
 </div>
 <div rel="schema:brand">
 <div typeof="schema:Brand">
 <div property="schema:name" content="ACME"></div>
 </div>
 </div>
 <div rel="schema:offers">
 <div typeof="schema:AggregateOffer">
 <div property="schema:offerCount" content="5"></div>
 <div property="schema:lowPrice" content="119.99"></div>
 <div property="schema:highPrice" content="199.99"></div>
 <div property="schema:priceCurrency" content="USD"></div>
 <div rel="schema:url" resource="https://example.com/anvil"></div>
 </div>
 </div>
 <div rel="schema:image" resource="https://example.com/photos/16x9/photo.jpg"></div>
 <div property="schema:sku" content="0446310786"></div>
 </div>
 </body>
</html>
```

 

 
 
#### Microdata

 <html>
 <head>
 <title>Executive Anvil</title>
 </head>
 <body>
 <div>
 <div itemtype="https://schema.org/Product" itemscope>
 <meta itemprop="mpn" content="925872" />
 <meta itemprop="name" content="Executive Anvil" />
 <link itemprop="image" href="https://example.com/photos/16x9/photo.jpg" />
 <link itemprop="image" href="https://example.com/photos/4x3/photo.jpg" />
 <link itemprop="image" href="https://example.com/photos/1x1/photo.jpg" />
 <meta itemprop="description" content="Sleeker than ACME's Classic Anvil, the Executive Anvil is perfect for the business traveler looking for something to drop from a height." />
 <div itemprop="offers" itemtype="https://schema.org/AggregateOffer" itemscope>
 <meta itemprop="lowPrice" content="119.99" />
 <meta itemprop="highPrice" content="199.99" />
 <meta itemprop="offerCount" content="6" />
 <meta itemprop="priceCurrency" content="USD" />
 </div>
 <div itemprop="aggregateRating" itemtype="https://schema.org/AggregateRating" itemscope>
 <meta itemprop="reviewCount" content="89" />
 <meta itemprop="ratingValue" content="4.4" />
 </div>
 <div itemprop="review" itemtype="https://schema.org/Review" itemscope>
 <div itemprop="author" itemtype="https://schema.org/Person" itemscope>
 <meta itemprop="name" content="Fred Benson" />
 </div>
 <div itemprop="reviewRating" itemtype="https://schema.org/Rating" itemscope>
 <meta itemprop="ratingValue" content="4" />
 <meta itemprop="bestRating" content="5" />
 </div>
 </div>
 <meta itemprop="sku" content="0446310786" />
 <div itemprop="brand" itemtype="https://schema.org/Brand" itemscope>
 <meta itemprop="name" content="ACME" />
 </div>
 </div>
 </div>
 </body>
</html>
 

 

```
 <html>
 <head>
 <title>Executive Anvil</title>
 </head>
 <body>
 <div>
 <div itemtype="https://schema.org/Product" itemscope>
 <meta itemprop="mpn" content="925872" />
 <meta itemprop="name" content="Executive Anvil" />
 <link itemprop="image" href="https://example.com/photos/16x9/photo.jpg" />
 <link itemprop="image" href="https://example.com/photos/4x3/photo.jpg" />
 <link itemprop="image" href="https://example.com/photos/1x1/photo.jpg" />
 <meta itemprop="description" content="Sleeker than ACME's Classic Anvil, the Executive Anvil is perfect for the business traveler looking for something to drop from a height." />
 <div itemprop="offers" itemtype="https://schema.org/AggregateOffer" itemscope>
 <meta itemprop="lowPrice" content="119.99" />
 <meta itemprop="highPrice" content="199.99" />
 <meta itemprop="offerCount" content="6" />
 <meta itemprop="priceCurrency" content="USD" />
 </div>
 <div itemprop="aggregateRating" itemtype="https://schema.org/AggregateRating" itemscope>
 <meta itemprop="reviewCount" content="89" />
 <meta itemprop="ratingValue" content="4.4" />
 </div>
 <div itemprop="review" itemtype="https://schema.org/Review" itemscope>
 <div itemprop="author" itemtype="https://schema.org/Person" itemscope>
 <meta itemprop="name" content="Fred Benson" />
 </div>
 <div itemprop="reviewRating" itemtype="https://schema.org/Rating" itemscope>
 <meta itemprop="ratingValue" content="4" />
 <meta itemprop="bestRating" content="5" />
 </div>
 </div>
 <meta itemprop="sku" content="0446310786" />
 <div itemprop="brand" itemtype="https://schema.org/Brand" itemscope>
 <meta itemprop="name" content="ACME" />
 </div>
 </div>
 </div>
 </body>
</html>
```

 

## Guidelines

For your `Product` markup to be eligible for product snippets, you must follow these guidelines:

 
- [General structured data guidelines](https://developers.google.com/search/docs/appearance/structured-data/sd-policies)
 
- [Search Essentials](https://developers.google.com/search/docs/essentials)
 
- [Technical guidelines](https://developers.google.com#technical-guidelines)
 
- [Content guidelines](https://developers.google.com#content-guidelines)

### Technical guidelines

 
- Currently, product rich results only support pages that focus on a single product (or
 multiple variants of the same product). For example, "shoes in our shop" is not a specific product.
 This includes product variants where [each product variant has a distinct URL](https://developers.google.com/search/docs/specialty/ecommerce/designing-a-url-structure-for-ecommerce-sites#how-google-understands-urls-for-product-variants).
 We recommend focusing on adding markup to product pages instead of pages that list products or a category of products.
 
 
- For details about how to mark up product variants, refer to [product variant structured data documentation](https://developers.google.com/search/docs/appearance/structured-data/product-variants).
 
- When offering products for sale in multiple currencies, have a distinct URL per currency.
 For example, if a product is available for sale in Canadian and US dollars, use two
 distinct URLs, one per currency.
 
 
- [`Car`](https://schema.org/Car)
 isn't supported automatically as a subtype of `Product`. For now, include
 both [`Car`](https://schema.org/Car) and
 [`Product`](https://schema.org/Product) types if you
 want to attach ratings to it and be eligible for the Search feature. For example in JSON-LD:
 

```
{
 "@context": "https://schema.org",
 "@type": ["Product", "Car"],
 ...
}
```

 
 
- For [pros and cons](https://developers.google.com#pros-cons) structured data:
 Only editorial product review pages are eligible for the pros and cons appearance in
 Search, not merchant product pages or customer product reviews.
 
- If you're a merchant optimizing for all types of shopping results, we recommend putting
 `Product` structured data in the initial HTML for best results.
 
- For JavaScript-generated `Product` markup: Be aware that [dynamically-generated markup](https://developers.google.com/search/docs/appearance/structured-data/generate-structured-data-with-javascript)
 can make Shopping crawls less frequent and less reliable, which can be an issue for
 fast-changing content like product availability and price. If you're using JavaScript to
 generate `Product` markup, make sure your server has enough computing resources to
 handle increased traffic from Google.

### Content guidelines

 
- We don't allow content that promotes widely prohibited or regulated goods, services, or
 information that may facilitate serious, immediate, or long term harm to people. This
 includes content related to firearms and weapons, recreational drugs, tobacco and vaping
 products, and gambling-related products.

## Structured data type definitions

You must include the required properties for your content to be eligible for display as a
 rich result. You can also include the recommended properties to add more information to your
 structured data, which could provide a better user experience.

### `Product`

The full definition of `Product` is available at
 [schema.org/Product](https://schema.org/Product). When you mark up
 your content for product information, use the following properties of the
 `Product` type:

 
 
 Required properties | 

 
 
 
 `name` | 
 
 `[Text](https://schema.org/Text)`

 The name of the product.

 | 
 

 
 Product snippets require either `review` or `aggregateRating` or `offers` | 
 
 You must include one of the following properties:

 
 
- `review`
 
- `aggregateRating`
 
- `offers`
 

 You only need to provide one of `review`,
 `aggregateRating`, and `offers`, but the product snippets
 section of the Rich Results Test may report a warning if you provide
 `offers` without `review` or `aggregateRating`
 properties.
 | 
 

 

 
 
 Recommended properties | 

 
 
 
 `aggregateRating` | 
 
 `[AggregateRating](https://schema.org/AggregateRating)`

 A nested `aggregateRating` of the product. Follow the
 [Review snippet
 guidelines](https://developers.google.com/search/docs/appearance/structured-data/review-snippet#guidelines) and the list of required and recommended
 [`AggregateRating`
 properties](https://developers.google.com/search/docs/appearance/structured-data/review-snippet#aggregated-rating-type-definition).

 | 
 

 
 `offers` | 
 
 `[Offer](https://schema.org/Offer)` or `[AggregateOffer](https://schema.org/AggregateOffer)`

 A nested `Offer` or
 `AggregateOffer` to sell the product. Include the required and
 recommended properties for either [`Offer`](https://developers.google.com#offer-properties)
 or [`AggregateOffer`](https://developers.google.com#aggregate-offer-properties) (whichever
 is applicable to your content).

 
 To be eligible for the [price drop enhancement](https://developers.google.com/search/docs/appearance/structured-data/product#price-drop), use [`Offer`](https://developers.google.com#offer-properties),
 not `AggregateOffer`.
 

 | 
 

 
 `review` | 
 
 [`Review`](https://schema.org/Review)

 A nested `Review` of the product. Follow the
 [Review snippet
 guidelines](https://developers.google.com/search/docs/appearance/structured-data/review-snippet#guidelines) and the list of required and recommended
 [review
 properties](https://developers.google.com/search/docs/appearance/structured-data/review-snippet#review-properties).

 If you add a review for the product, the reviewer's name must be a valid name for a `Person` or
 `Team`.

 Not recommended: 50% off on Black Friday

 Recommended: "James Smith" or "CNET Reviewers"

 
 To manually tell Google about the [pros and cons](https://developers.google.com#pros-cons) of an editorial product review page,
 add the `positiveNotes` and/or `negativeNotes` properties to your nested product review.
 

 | 
 

 

### Product Reviews

#### `Review`

 As reviews are shared by multiple structured data types (such as
 `[Recipe](https://developers.google.com/search/docs/appearance/structured-data/recipe)` and
 `[Movie](https://developers.google.com/search/docs/appearance/structured-data/movie)`), the
 `Review` type is described separately in the
 [review snippet documentation](https://developers.google.com/search/docs/appearance/structured-data/review-snippet).

 The following properties are additional properties for the Review type to help people
 see a high-level summary of the pros and cons of an editorial product review.
 The pros and cons experience is available in Dutch, English, French, German, Italian,
 Japanese, Polish, Portuguese, Spanish, and Turkish in all countries where Google Search
 is available.

 While Google tries to automatically understand the pros and cons of an editorial product
 review, you can explicitly provide this information by adding the `positiveNotes` and/or
 `negativeNotes` properties to your nested product review. Be sure to follow the
 [pros and cons guidelines](https://developers.google.com#pros-cons-guidelines).

 
 Required properties | 

 
 
 Two statements about the product | 
 You must provide at least two statements about the product in any combination of
 positive or negative statements (for example, `ItemList` markup with two
 positive statements is valid):
 
 
- [`negativeNotes`](https://developers.google.com#negative-notes)
 
- [`positiveNotes`](https://developers.google.com#positive-notes)
 

 | 
 

 

 
 Recommended properties | 

 
 
 `negativeNotes` | 
 
 `[ItemList](https://schema.org/ItemList)`
 (see [`ItemList` for Positive and Negative Notes](https://developers.google.com#pros-cons-item-list)
 on usage of `ItemList` in this context)
 

 
 An optional nested list of negative statements about the product (cons).
 

 
 To list multiple negative statements, specify multiple `ListItem`
 properties in an `itemListElement` array. For example:
 

 

```
"review": {
 "@type": "Review",
 "negativeNotes": {
 "@type": "ItemList",
 "itemListElement": [
 {
 "@type": "ListItem",
 "position": 1,
 "name": "No child protection"
 },
 {
 "@type": "ListItem",
 "position": 2,
 "name": "Lacking advanced features"
 }
 ]
 }
}
```

 | 
 

 
 `positiveNotes` | 
 
 `[ItemList](https://schema.org/ItemList)`
 (see [`ItemList` for Positive and Negative Notes](https://developers.google.com#pros-cons-item-list)
 on usage of `ItemList` in this context)
 

 
 An optional nested list of positive statements about the product (pros).
 

 
 To list multiple positive statements, specify multiple `ListItem`
 properties in an `itemListElement` array. For example:
 

 

```
"review": {
 "@type": "Review",
 "positiveNotes": {
 "@type": "ItemList",
 "itemListElement": [
 {
 "@type": "ListItem",
 "position": 1,
 "name": "Consistent results"
 },
 {
 "@type": "ListItem",
 "position": 2,
 "name": "Still sharp after many uses"
 }
 ]
 }
}
```

 | 
 

 

#### `ItemList` for Positive and Negative Notes

 Positive and negative notes (pros and cons) inside the `Review` type make use
 of the generic `ItemList` and `ListItem` types.
 This section describes how to use these types for positive and negative notes.

 The following properties are used to capture pros and cons in a review.

 
 Required properties | 

 
 
 `itemListElement` | 
 
 `[ListItem](https://schema.org/ListItem)`

 
 A list of statements about the product, listed in a specific order.
 Specify each statement with a `ListItem`.
 

 | 
 

 
 `itemListElement.name` | 
 
 `[Text](https://schema.org/Text)`

 
 The key statement of the review.
 

 | 
 

 

 
 Recommended properties | 

 
 
 `itemListElement.position` | 
 
 `[Integer](https://schema.org/Integer)`

 
 The position of the review. Position 1 signifies the first statement in the list.
 

 | 
 

 

### Offer details

#### `Offer`

The full definition of `Offer` is available at
 [schema.org/Offer](https://schema.org/Offer). When marking up
 offers within a product, use the following properties of the `schema.org`
 [`Offer`](https://schema.org/Offer) type.

 
 Required properties | 

 
 
 `price` or `priceSpecification.price` | 
 
 `[Number](https://schema.org/Number)`

 The offer price of a product. Follow
 [schema.org usage guidelines](https://schema.org/price).

 
 Here's an example of the `price` property (the value can be a JSON string
 or number):
 

 

```
"offers": {
 "@type": "Offer",
 "price": 39.99,
 "priceCurrency": "USD"
}
```

 
 Here's an example of how to specify that a product is available without payment:
 

 

```
"offers": {
 "@type": "Offer",
 "price": 0,
 "priceCurrency": "EUR"
}
```

 
 Alternatively, the offer price may be nested inside a `priceSpecification`
 property instead of being provided at the `Offer` level.
 

 

```
"offers": {
 "@type": "Offer",
 "priceSpecification": {
 "@type": "PriceSpecification",
 "price": 9.99,
 "priceCurrency": "AUD"
 }
}
```

 
 
 If you use both the `offers.price` and `offers.priceSpecification`
 properties to encode an active price, Google will use the price provided through
 the `offers.price` property and ignore the `offers.priceSpecification`
 property.
 
 If you have complex pricing, check out the [pricing examples](https://developers.google.com/search/docs/appearance/structured-data/merchant-listing#pricing-example) and
 supported [pricing properties](https://developers.google.com/search/docs/appearance/structured-data/merchant-listing#offer-details) in the merchant listing documentation.
 
 | 
 

 

 
 Recommended properties | 

 
 
 `availability` | 
 
 `[ItemAvailability](https://schema.org/ItemAvailability)`

 Use the single most appropriate product availability option from the following list.

 
 
- `https://schema.org/BackOrder`: The item is on back order.
 
- `https://schema.org/Discontinued`: The item has been discontinued.
 
- `https://schema.org/InStock`: The item is in stock.
 
- `https://schema.org/InStoreOnly`: The item is only available for purchase in store.
 
- `https://schema.org/LimitedAvailability`: The item has limited availability.
 
- `https://schema.org/OnlineOnly`: The item is available online only.
 
- `https://schema.org/OutOfStock`: The item is currently out of stock.
 
- `https://schema.org/PreOrder`: The item is available for pre-order.
 
- `https://schema.org/PreSale`: The item is available for ordering and delivery before general availability.
 
- `https://schema.org/SoldOut`: The item has been sold out.
 

 The short names without the URL prefix are also supported (for example, `BackOrder`).

 | 
 

 
 `priceCurrency` or `priceSpecification.priceCurrency` | 
 
 `[Text](https://schema.org/Text)`

 The currency used to describe the product price, in three-letter
 [ISO 4217](https://en.wikipedia.org/wiki/ISO_4217)
 format.

 This property is currently recommended for product snippets to help Google
 determine the currency more accurately, but required for merchant listing experiences.
 It is therefore best to always provide this property.

 | 
 

 
 `priceValidUntil` | 
 
 `[Date](https://schema.org/Date)`

 The date (in [ISO 8601](https://en.wikipedia.org/wiki/ISO_8601)
 date format) after which the price will no longer be available, if applicable. Your product snippet
 may not display if the `priceValidUntil` property indicates a past date.

 | 
 

 

#### `UnitPriceSpecification`

 The full definition of `UnitPriceSpecification` is available at
 `[schema.org/UnitPriceSpecification](https://schema.org/UnitPriceSpecification)`.
 Use the following properties to capture more complex pricing schemes.

 
 Required properties | 

 
 
 `price` | 
 
 `[Number](https://schema.org/Number)`

 
 The offer price of a product. See also the `price` property of `Offer`.
 

 | 
 

 

 
 Recommended properties | 

 
 
 `priceCurrency` | 
 
 `[Text](https://schema.org/Text)`

 The currency used to describe the product price, in three-letter
 [ISO 4217](https://en.wikipedia.org/wiki/ISO_4217) format.
 See also the `priceCurrency` property of `Offer`.

 While this property is optional for product snippets, it's strongly recommended because
 it avoids pricing ambiguities and it's required for merchant
 listing experiences.

 | 
 

 

#### `AggregateOffer`

 The full definition of `AggregateOffer` is available at
 `[schema.org/AggregateOffer](https://schema.org/AggregateOffer)`.
 An `AggregateOffer` is a kind of `Offer` representing an aggregation of
 other offers. For example, it can be used for a product that is being sold by multiple merchants.
 Don't use `AggregateOffer` to describe a set of product variants.
 When marking up aggregate offers within a product, use the following properties of the `schema.org`
 [`AggregateOffer`](https://schema.org/AggregateOffer) type:

 
 Required properties | 

 
 
 `lowPrice` | 
 
 `[Number](https://schema.org/Number)`

 
 The lowest price of all offers available. Use a decimal separator (`.`) when
 expressing fractions of a currency unit, such as 1.23 for $1.23 US dollars.
 

 | 
 

 
 `priceCurrency` | 
 
 `[Text](https://schema.org/Text)`

 The currency used to describe the product price, in three-letter
 [ISO 4217](https://en.wikipedia.org/wiki/ISO_4217) format.

 | 
 

 

 
 Recommended properties | 

 
 
 `highPrice` | 
 
 `[Number](https://schema.org/Number)`

 The highest price of all offers available. Use a floating point number if necessary.

 | 
 

 
 `offerCount` | 
 
 `[Number](https://schema.org/Number)`

 The number of offers for the product.

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

 
 There are two Search Console reports related to `Product` structured data:
 

 
 
- [Merchant listings report](https://search.google.com/search-console/r/merchant-listings):
 For pages where shoppers can buy products.
 
- [Product snippets report](https://search.google.com/search-console/r/product):
 For other product related pages such as product reviews and aggregator sites.
 

 
 Both reports provide warnings and errors related to `Product` structured data, but
 are separate due to the different requirements for the associated experiences. For example, the
 [Merchant listings report](https://search.google.com/search-console/r/merchant-listings)
 includes checks for product snippets that include `Offer`
 structured data, so the
 [Product snippets](https://search.google.com/search-console/r/product)
 report only needs to be consulted for non-merchant listing pages.
 

 

 
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
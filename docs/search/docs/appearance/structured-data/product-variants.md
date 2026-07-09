---
source: https://developers.google.com/search/docs/appearance/structured-data/product-variants
title: "Product Variant Structured Data (ProductGroup, Product)"
fetched: 2026-07-08
---

# Product variant structured data (`ProductGroup`, `Product`)

 

 Many types of products such as apparel, shoes, furniture, electronic devices, and luggage are sold
 in different variations (for example various sizes, colors, materials, or patterns). To help Google
 better understand which products are variations of the same parent product, use the `ProductGroup` class with
 associated properties `variesBy`, `hasVariant`, and `productGroupID`
 to group such variants together, in addition to [`Product` structured data](https://developers.google.com/search/docs/appearance/structured-data/product).
 Adding this markup also makes your products eligible for display with variant information in
 merchant listing experiences.

 `ProductGroup` also lets you specify common product-properties for all variants, such as
 brand and review information, as well as the variant-determining properties, which
 can reduce the duplication of information.

 
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

 In general, there are two main design approaches that ecommerce websites use for product variants.
 This section describes how to set up product variant markup, depending on your
 website's design approach:

 
- [Single page](https://developers.google.com#single-page-website), where all variants are selectable on
 a single page without page reloads (usually through query parameters)
 
- [Multi page](https://developers.google.com#multi-page-website), where variants of the same product are
 accessible on different pages

### Single-page website

The single-page website examples use a website with the following assumptions:

 
- When no variants are selected, the main product page is returned by the following URL:
 `https://www.example.com/coat`
 
- The same page is returned with a specific, preselected variant using the following URLs:
 
 
- `https://www.example.com/coat?size=small&color=green`
 
- `https://www.example.com/coat?size=small&color=lightblue`
 
- `https://www.example.com/coat?size=large&color=lightblue`
 

 
 
- When the user selects a different variant on the page (using dropdowns for color and size), the
 image, price, and availability information change dynamically on the page without a page
 reload. The markup on the page doesn't change dynamically as the user selects different variants.
 

#### Single page example: variants nested under `ProductGroup`

In this example, the variants are nested under the top-level `ProductGroup` entity
 using the `hasVariant` property:

 
- The `ProductGroup` and three `Offer` entities (under the `Product`
 properties) all have distinct URLs. Alternatively, the URLs could have also been provided under
 `Product`.
 
- A common title and description are specified at the `ProductGroup` level.
 Variant-specific titles and descriptions are specified at the `Product` level.
 
- Other common variant properties (such as brand, pattern, material, and audience information) are also specified at the
 `ProductGroup` level.
 
- The `ProductGroup` specifies the variant-identifying properties using the
 `variesBy` property.
 
- The `ProductGroup` specifies the parent sku using `productGroupID`
 (which doesn't need to be repeated under the `Product` properties using
 `inProductGroupWithID`).

 We recommend this approach because it's the most compact and natural representation of a product
 group and its variants.

<html>
 <head>
 <title>Wool winter coat</title>
 <script type="application/ld+json">
 [
 {
 "@context": "https://schema.org/",
 "@type": "ProductGroup",
 "name": "Wool winter coat",
 "description": "Wool coat, new for the coming winter season",
 "url": "https://www.example.com/coat",
 "brand": {
 "@type": "Brand",
 "name": "Good brand"
 },
 "audience": {
 "@type": "PeopleAudience",
 "suggestedGender": "unisex",
 "suggestedAge": {
 "@type": "QuantitativeValue",
 "minValue": 13,
 "unitCode": "ANN"
 }
 },
 "productGroupID": "44E01",
 "pattern": "striped",
 "material": "wool",
 "variesBy": [
 "https://schema.org/size",
 "https://schema.org/color"
 ],
 "hasVariant": [
 {
 "@type": "Product",
 "sku": "44E01-M11000",
 "gtin14": "98766051104214",
 "image": "https://www.example.com/coat_small_green.jpg",
 "name": "Small green coat",
 "description": "Small wool green coat for the winter season",
 "color": "Green",
 "size": "small",
 "offers": {
 "@type": "Offer",
 "url": "https://www.example.com/coat?size=small&color=green",
 "priceCurrency": "USD",
 "price": 39.99,
 "itemCondition": "https://schema.org/NewCondition",
 "availability": "https://schema.org/InStock",
 "shippingDetails": { "@id": "#shipping_policy" },
 "hasMerchantReturnPolicy": { "@id": "#return_policy" }
 }
 },
 {
 "@type": "Product",
 "sku": "44E01-K11000",
 "gtin14": "98766051104207",
 "image": "https://www.example.com/coat_small_lightblue.jpg",
 "name": "Small light blue coat",
 "description": "Small wool light blue coat for the winter season",
 "color": "light blue",
 "size": "small",
 "offers": {
 "@type": "Offer",
 "url": "https://www.example.com/coat?size=small&color=lightblue",
 "priceCurrency": "USD",
 "price": 39.99,
 "itemCondition": "https://schema.org/NewCondition",
 "availability": "https://schema.org/InStock",
 "shippingDetails": { "@id": "#shipping_policy" },
 "hasMerchantReturnPolicy": { "@id": "#return_policy" }
 }
 },
 {
 "@type": "Product",
 "sku": "44E01-X1100000",
 "gtin14": "98766051104399",
 "image": "https://www.example.com/coat_large_lightblue.jpg",
 "name": "Large light blue coat",
 "description": "Large wool light blue coat for the winter season",
 "color": "light blue",
 "size": "large",
 "offers": {
 "@type": "Offer",
 "url": "https://www.example.com/coat?size=large&color=lightblue",
 "priceCurrency": "USD",
 "price": 49.99,
 "itemCondition": "https://schema.org/NewCondition",
 "availability": "https://schema.org/BackOrder",
 "shippingDetails": { "@id": "#shipping_policy" },
 "hasMerchantReturnPolicy": { "@id": "#return_policy" }
 }
 }
 ]
 },
 {
 "@context": "https://schema.org/",
 "@type": "OfferShippingDetails",
 "@id": "#shipping_policy",
 "shippingRate": {
 "@type": "MonetaryAmount",
 "value": 2.99,
 "currency": "USD"
 },
 "shippingDestination": {
 "@type": "DefinedRegion",
 "addressCountry": "US"
 },
 "deliveryTime": {
 "@type": "ShippingDeliveryTime",
 "handlingTime": {
 "@type": "QuantitativeValue",
 "minValue": 0,
 "maxValue": 1,
 "unitCode": "DAY"
 },
 "transitTime": {
 "@type": "QuantitativeValue",
 "minValue": 1,
 "maxValue": 5,
 "unitCode": "DAY"
 }
 }
 },
 {
 "@context": "http://schema.org/",
 "@type": "MerchantReturnPolicy",
 "@id": "#return_policy",
 "applicableCountry": "US",
 "returnPolicyCountry": "US",
 "returnPolicyCategory": "https://schema.org/MerchantReturnFiniteReturnWindow",
 "merchantReturnDays": 60,
 "returnMethod": "https://schema.org/ReturnByMail",
 "returnFees": "https://schema.org/FreeReturn"
 }
 ]
 </script>
 </head>
 <body>
 </body>
</html>

```
<html>
 <head>
 <title>Wool winter coat</title>
 <script type="application/ld+json">
 [
 {
 "@context": "https://schema.org/",
 "@type": "ProductGroup",
 "name": "Wool winter coat",
 "description": "Wool coat, new for the coming winter season",
 "url": "https://www.example.com/coat",
 "brand": {
 "@type": "Brand",
 "name": "Good brand"
 },
 "audience": {
 "@type": "PeopleAudience",
 "suggestedGender": "unisex",
 "suggestedAge": {
 "@type": "QuantitativeValue",
 "minValue": 13,
 "unitCode": "ANN"
 }
 },
 "productGroupID": "44E01",
 "pattern": "striped",
 "material": "wool",
 "variesBy": [
 "https://schema.org/size",
 "https://schema.org/color"
 ],
 "hasVariant": [
 {
 "@type": "Product",
 "sku": "44E01-M11000",
 "gtin14": "98766051104214",
 "image": "https://www.example.com/coat_small_green.jpg",
 "name": "Small green coat",
 "description": "Small wool green coat for the winter season",
 "color": "Green",
 "size": "small",
 "offers": {
 "@type": "Offer",
 "url": "https://www.example.com/coat?size=small&color=green",
 "priceCurrency": "USD",
 "price": 39.99,
 "itemCondition": "https://schema.org/NewCondition",
 "availability": "https://schema.org/InStock",
 "shippingDetails": { "@id": "#shipping_policy" },
 "hasMerchantReturnPolicy": { "@id": "#return_policy" }
 }
 },
 {
 "@type": "Product",
 "sku": "44E01-K11000",
 "gtin14": "98766051104207",
 "image": "https://www.example.com/coat_small_lightblue.jpg",
 "name": "Small light blue coat",
 "description": "Small wool light blue coat for the winter season",
 "color": "light blue",
 "size": "small",
 "offers": {
 "@type": "Offer",
 "url": "https://www.example.com/coat?size=small&color=lightblue",
 "priceCurrency": "USD",
 "price": 39.99,
 "itemCondition": "https://schema.org/NewCondition",
 "availability": "https://schema.org/InStock",
 "shippingDetails": { "@id": "#shipping_policy" },
 "hasMerchantReturnPolicy": { "@id": "#return_policy" }
 }
 },
 {
 "@type": "Product",
 "sku": "44E01-X1100000",
 "gtin14": "98766051104399",
 "image": "https://www.example.com/coat_large_lightblue.jpg",
 "name": "Large light blue coat",
 "description": "Large wool light blue coat for the winter season",
 "color": "light blue",
 "size": "large",
 "offers": {
 "@type": "Offer",
 "url": "https://www.example.com/coat?size=large&color=lightblue",
 "priceCurrency": "USD",
 "price": 49.99,
 "itemCondition": "https://schema.org/NewCondition",
 "availability": "https://schema.org/BackOrder",
 "shippingDetails": { "@id": "#shipping_policy" },
 "hasMerchantReturnPolicy": { "@id": "#return_policy" }
 }
 }
 ]
 },
 {
 "@context": "https://schema.org/",
 "@type": "OfferShippingDetails",
 "@id": "#shipping_policy",
 "shippingRate": {
 "@type": "MonetaryAmount",
 "value": 2.99,
 "currency": "USD"
 },
 "shippingDestination": {
 "@type": "DefinedRegion",
 "addressCountry": "US"
 },
 "deliveryTime": {
 "@type": "ShippingDeliveryTime",
 "handlingTime": {
 "@type": "QuantitativeValue",
 "minValue": 0,
 "maxValue": 1,
 "unitCode": "DAY"
 },
 "transitTime": {
 "@type": "QuantitativeValue",
 "minValue": 1,
 "maxValue": 5,
 "unitCode": "DAY"
 }
 }
 },
 {
 "@context": "http://schema.org/",
 "@type": "MerchantReturnPolicy",
 "@id": "#return_policy",
 "applicableCountry": "US",
 "returnPolicyCountry": "US",
 "returnPolicyCategory": "https://schema.org/MerchantReturnFiniteReturnWindow",
 "merchantReturnDays": 60,
 "returnMethod": "https://schema.org/ReturnByMail",
 "returnFees": "https://schema.org/FreeReturn"
 }
 ]
 </script>
 </head>
 <body>
 </body>
</html>
```

#### Single page example: variants separate from `ProductGroup`

This structure is similar to the previous example except the variants are defined separate (unnested) from
 the `ProductGroup`. This approach might be easier for some content management systems (CMSes) to
 generate.

<html>
 <head>
 <title>Wool winter coat</title>
 <script type="application/ld+json">
 [
 {
 "@context": "https://schema.org",
 "@type": "ProductGroup",
 "@id": "#coat_parent",
 "name": "Wool winter coat",
 "description": "Wool coat, new for the coming winter season",
 "url": "https://www.example.com/coat",
 // ... other ProductGroup-level properties
 "brand": {
 "@type": "Brand",
 "name": "Good brand"
 },
 "productGroupID": "44E01",
 "variesBy": [
 "https://schema.org/size",
 "https://schema.org/color"
 ]
 },
 {
 "@context": "https://schema.org",
 "@type": "Product",
 "isVariantOf": { "@id": "#coat_parent" },
 "name": "Small green coat",
 "description": "Small wool green coat for the winter season",
 "image": "https://www.example.com/coat_small_green.jpg",
 "size": "small",
 "color": "green",
 // ... other Product-level properties
 "offers": {
 "@type": "Offer",
 "url": "https://www.example.com/coat?size=small&color=green",
 "price": 39.99,
 "priceCurrency": "USD"
 // ... other offer-level properties
 }
 },
 {
 "@context": "https://schema.org",
 "@type": "Product",
 "isVariantOf": { "@id": "#coat_parent" },
 "name": "Small dark blue coat",
 "description": "Small wool light blue coat for the winter season",
 "image": "https://www.example.com/coat_small_lightblue.jpg",
 "size": "small",
 "color": "light blue",
 // ... other Product-level properties
 "offers": {
 "@type": "Offer",
 "url": "https://www.example.com/coat?size=small&color=lightblue",
 "price": 39.99,
 "priceCurrency": "USD"
 // ... other offer-level properties
 }
 },
 {
 "@context": "https://schema.org",
 "@type": "Product",
 "isVariantOf": { "@id": "#coat_parent" },
 "name": "Large light blue coat",
 "description": "Large wool light blue coat for the winter season",
 "image": "https://www.example.com/coat_large_lightblue.jpg",
 "size": "large",
 "color": "light blue",
 // ... other Product-level properties
 "offers": {
 "@type": "Offer",
 "url": "https://www.example.com/coat?size=large&color=lightblue",
 "price": 49.99,
 "priceCurrency": "USD"
 // ... other offer-level properties
 }
 }
 ]
 </script>
 </head>
 <body>
 </body>
</html>

```
<html>
 <head>
 <title>Wool winter coat</title>
 <script type="application/ld+json">
 [
 {
 "@context": "https://schema.org",
 "@type": "ProductGroup",
 "@id": "#coat_parent",
 "name": "Wool winter coat",
 "description": "Wool coat, new for the coming winter season",
 "url": "https://www.example.com/coat",
 // ... other ProductGroup-level properties
 "brand": {
 "@type": "Brand",
 "name": "Good brand"
 },
 "productGroupID": "44E01",
 "variesBy": [
 "https://schema.org/size",
 "https://schema.org/color"
 ]
 },
 {
 "@context": "https://schema.org",
 "@type": "Product",
 "isVariantOf": { "@id": "#coat_parent" },
 "name": "Small green coat",
 "description": "Small wool green coat for the winter season",
 "image": "https://www.example.com/coat_small_green.jpg",
 "size": "small",
 "color": "green",
 // ... other Product-level properties
 "offers": {
 "@type": "Offer",
 "url": "https://www.example.com/coat?size=small&color=green",
 "price": 39.99,
 "priceCurrency": "USD"
 // ... other offer-level properties
 }
 },
 {
 "@context": "https://schema.org",
 "@type": "Product",
 "isVariantOf": { "@id": "#coat_parent" },
 "name": "Small dark blue coat",
 "description": "Small wool light blue coat for the winter season",
 "image": "https://www.example.com/coat_small_lightblue.jpg",
 "size": "small",
 "color": "light blue",
 // ... other Product-level properties
 "offers": {
 "@type": "Offer",
 "url": "https://www.example.com/coat?size=small&color=lightblue",
 "price": 39.99,
 "priceCurrency": "USD"
 // ... other offer-level properties
 }
 },
 {
 "@context": "https://schema.org",
 "@type": "Product",
 "isVariantOf": { "@id": "#coat_parent" },
 "name": "Large light blue coat",
 "description": "Large wool light blue coat for the winter season",
 "image": "https://www.example.com/coat_large_lightblue.jpg",
 "size": "large",
 "color": "light blue",
 // ... other Product-level properties
 "offers": {
 "@type": "Offer",
 "url": "https://www.example.com/coat?size=large&color=lightblue",
 "price": 49.99,
 "priceCurrency": "USD"
 // ... other offer-level properties
 }
 }
 ]
 </script>
 </head>
 <body>
 </body>
</html>
```

### Multi-page website

The multi-page website markup examples use a website with the following assumptions:

 
- The light blue variants are available at the following URLs for small and large sizes:
 
 
- `https://www.example.com/coat/lightblue?size=small`
 
- `https://www.example.com/coat/lightblue?size=large`
 

 
 
- The green variant is available only in size small at `https://www.example.com/coat/green?size=small`.
 
- Both pages allow "jumping" to the other page (meaning, the page reloads) through a color selector in the UI.
 
- The site splits the equivalent markup from the single page examples across the two pages.

Notice that there's no `ProductGroup` definition on only one page which gets
 referenced from another page. This is because the `ProductGroup` needs to reference common
 attributes of the variants, such as brand, material, and age group. This also means that the full
 `ProductGroup` definition needs to be repeated on each of the variant pages.

#### Multi-page example: variants nested under `ProductGroup`

 This is the equivalent of the [first single-page example](https://developers.google.com#single-page-example-1), with
 the variant `Product` properties nested under the top-level `ProductGroup`
 using the`hasVariant` property. The `ProductGroup` definition is duplicated
 on both pages. Note the following:

 
- `ProductGroup` doesn't have a canonical URL, as there isn't a single URL representing
 the `ProductGroup`.
 
- The `ProductGroup` on each page has a full definition of the variants on the page
 as well as a variant with only the `url` property to link to the variants on the
 other page, which helps Google find your variants.

 
 
### Page 1: Light blue variants

The following example shows structured data on the first page for the light blue variants:

<html>
 <head>
 <title>Wool winter coat, light blue color</title>
 <script type="application/ld+json">
 [
 {
 "@context": "https://schema.org/",
 "@type": "ProductGroup",
 "name": "Wool winter coat",
 "description": "Wool coat, new for the coming winter season",
 // ... other ProductGroup-level properties
 "brand": {
 "@type": "Brand",
 "name": "Good brand"
 },
 "productGroupID": "44E01",
 "variesBy": [
 "https://schema.org/size",
 "https://schema.org/color"
 ],
 "hasVariant": [
 {
 "@type": "Product",
 "name": "Small light blue coat",
 "description": "Small wool light blue coat for the winter season",
 "image": "https://www.example.com/coat_small_lightblue.jpg",
 "size": "small",
 "color": "light blue",
 // ... other Product-level properties
 "offers": {
 "@type": "Offer",
 "url": "https://www.example.com/coat/lightblue?size=small",
 "price": 39.99,
 "priceCurrency": "USD"
 // ... other offer-level properties
 }
 },
 {
 "@type": "Product",
 "name": "Large light blue coat",
 "description": "Large wool light blue coat for the winter season",
 "image": "https://www.example.com/coat_large_lightblue.jpg",
 "size": "large",
 "color": "light blue",
 // ... other Product-level properties
 "offers": {
 "@type": "Offer",
 "url": "https://www.example.com/coat/lightblue?size=large",
 "price": 49.99,
 "priceCurrency": "USD"
 // ... other offer-level properties
 }
 },
 { "url": "https://www.example.com/coat/green?size=small" }
 ]
 }
 ]
 </script>
 </head>
 <body>
 </body>
</html>

```
<html>
 <head>
 <title>Wool winter coat, light blue color</title>
 <script type="application/ld+json">
 [
 {
 "@context": "https://schema.org/",
 "@type": "ProductGroup",
 "name": "Wool winter coat",
 "description": "Wool coat, new for the coming winter season",
 // ... other ProductGroup-level properties
 "brand": {
 "@type": "Brand",
 "name": "Good brand"
 },
 "productGroupID": "44E01",
 "variesBy": [
 "https://schema.org/size",
 "https://schema.org/color"
 ],
 "hasVariant": [
 {
 "@type": "Product",
 "name": "Small light blue coat",
 "description": "Small wool light blue coat for the winter season",
 "image": "https://www.example.com/coat_small_lightblue.jpg",
 "size": "small",
 "color": "light blue",
 // ... other Product-level properties
 "offers": {
 "@type": "Offer",
 "url": "https://www.example.com/coat/lightblue?size=small",
 "price": 39.99,
 "priceCurrency": "USD"
 // ... other offer-level properties
 }
 },
 {
 "@type": "Product",
 "name": "Large light blue coat",
 "description": "Large wool light blue coat for the winter season",
 "image": "https://www.example.com/coat_large_lightblue.jpg",
 "size": "large",
 "color": "light blue",
 // ... other Product-level properties
 "offers": {
 "@type": "Offer",
 "url": "https://www.example.com/coat/lightblue?size=large",
 "price": 49.99,
 "priceCurrency": "USD"
 // ... other offer-level properties
 }
 },
 { "url": "https://www.example.com/coat/green?size=small" }
 ]
 }
 ]
 </script>
 </head>
 <body>
 </body>
</html>
```

 
### Page 2: Green variant

 The following example shows structured data on the second page for the green variant:

 <html>
 <head>
 <title>Wool winter coat, green color</title>
 <script type="application/ld+json">
 [
 {
 "@context": "https://schema.org/",
 "@type": "ProductGroup",
 "name": "Wool winter coat",
 "description": "Wool coat, new for the coming winter season",
 // ... other ProductGroup-level properties
 "brand": {
 "@type": "Brand",
 "name": "Good brand"
 },
 "productGroupID": "44E01",
 "variesBy": [
 "https://schema.org/size",
 "https://schema.org/color"
 ],
 "hasVariant": [
 {
 "@type": "Product",
 "name": "Small green coat",
 "description": "Small wool green coat for the winter season",
 "image": "https://www.example.com/coat_green.jpg",
 "color": "green",
 "size": "small",
 // ... other Product-level properties
 "offers": {
 "@type": "Offer",
 "url": "https://www.example.com/coat/green?size=small",
 "price": 39.99,
 "priceCurrency": "USD"
 // ... other offer-level properties
 }
 },
 { "url": "https://www.example.com/coat/lightblue?size=small" },
 { "url": "https://www.example.com/coat/lightblue?size=large" }
 ]
 }
 ]
 </script>
 </head>
 <body>
 </body>
</html>
 

```
<html>
 <head>
 <title>Wool winter coat, green color</title>
 <script type="application/ld+json">
 [
 {
 "@context": "https://schema.org/",
 "@type": "ProductGroup",
 "name": "Wool winter coat",
 "description": "Wool coat, new for the coming winter season",
 // ... other ProductGroup-level properties
 "brand": {
 "@type": "Brand",
 "name": "Good brand"
 },
 "productGroupID": "44E01",
 "variesBy": [
 "https://schema.org/size",
 "https://schema.org/color"
 ],
 "hasVariant": [
 {
 "@type": "Product",
 "name": "Small green coat",
 "description": "Small wool green coat for the winter season",
 "image": "https://www.example.com/coat_green.jpg",
 "color": "green",
 "size": "small",
 // ... other Product-level properties
 "offers": {
 "@type": "Offer",
 "url": "https://www.example.com/coat/green?size=small",
 "price": 39.99,
 "priceCurrency": "USD"
 // ... other offer-level properties
 }
 },
 { "url": "https://www.example.com/coat/lightblue?size=small" },
 { "url": "https://www.example.com/coat/lightblue?size=large" }
 ]
 }
 ]
 </script>
 </head>
 <body>
 </body>
</html>
```

#### Multi-page example: variants separate from `ProductGroup`

This structure is similar to the previous multi-page example, except the variants are defined
 separately (unnested) from the `ProductGroup`. This approach might be easier for some
 CMSes to generate.

 
 
### Page 1: Light blue variants

 The following example shows structured data on the first page for the light blue variants:

 <html>
 <head>
 <title>Wool winter coat, lightblue color</title>
 <script type="application/ld+json">
 [
 {
 "@context": "https://schema.org/",
 "@type": "ProductGroup",
 "@id": "#coat_parent",
 "name": "Wool winter coat",
 "description": "Wool coat, new for the coming winter season",
 "brand": {
 "@type": "Brand",
 "name": "Good brand"
 },
 "audience": {
 "@type": "PeopleAudience",
 "suggestedGender": "unisex",
 "suggestedAge": {
 "@type": "QuantitativeValue",
 "minValue": 13,
 "unitCode": "ANN"
 }
 },
 "productGroupID": "44E01",
 "pattern": "striped",
 "material": "wool",
 "variesBy": [
 "https://schema.org/size",
 "https://schema.org/color"
 ]
 },
 {
 "@context": "https://schema.org",
 "@type": "Product",
 "isVariantOf": { "@id": "#coat_parent" },
 "sku": "44E01-K11000",
 "gtin14": "98766051104207",
 "image": "https://www.example.com/coat_lightblue.jpg",
 "name": "Small light blue coat",
 "description": "Small wool light blue coat for the winter season",
 "color": "light blue",
 "size": "small",
 "offers": {
 "@type": "Offer",
 "url": "https://www.example.com/coat/lightblue?size=small",
 "priceCurrency": "USD",
 "price": 39.99,
 "itemCondition": "https://schema.org/NewCondition",
 "availability": "https://schema.org/InStock",
 "shippingDetails": { "@id": "#shipping_policy" },
 "hasMerchantReturnPolicy": { "@id": "#return_policy" }
 }
 },
 {
 "@context": "https://schema.org",
 "@type": "Product",
 "isVariantOf": { "@id": "#coat_parent" },
 "sku": "44E01-X1100000",
 "gtin14": "98766051104399",
 "image": "https://www.example.com/coat_lightblue.jpg",
 "name": "Large light blue coat",
 "description": "Large wool light blue coat for the winter season",
 "color": "light blue",
 "size": "large",
 "offers": {
 "@type": "Offer",
 "url": "https://www.example.com/coat/lightblue?size=large",
 "priceCurrency": "USD",
 "price": 49.99,
 "itemCondition": "https://schema.org/NewCondition",
 "availability": "https://schema.org/BackOrder",
 "shippingDetails": { "@id": "#shipping_policy" },
 "hasMerchantReturnPolicy": { "@id": "#return_policy" }
 }
 },
 {
 "@context": "https://schema.org",
 "@type": "Product",
 "isVariantOf": { "@id": "#coat_parent" },
 "url": "https://www.example.com/coat/green?size=small"
 },
 {
 "@context": "https://schema.org/",
 "@type": "OfferShippingDetails",
 "@id": "#shipping_policy",
 "shippingRate": {
 "@type": "MonetaryAmount",
 "value": 2.99,
 "currency": "USD"
 },
 "shippingDestination": {
 "@type": "DefinedRegion",
 "addressCountry": "US"
 },
 "deliveryTime": {
 "@type": "ShippingDeliveryTime",
 "handlingTime": {
 "@type": "QuantitativeValue",
 "minValue": 0,
 "maxValue": 1,
 "unitCode": "DAY"
 },
 "transitTime": {
 "@type": "QuantitativeValue",
 "minValue": 1,
 "maxValue": 5,
 "unitCode": "DAY"
 }
 }
 },
 {
 "@context": "https://schema.org/",
 "@type": "MerchantReturnPolicy",
 "@id": "#return_policy",
 "applicableCountry": "US",
 "returnPolicyCountry": "US",
 "returnPolicyCategory": "https://schema.org/MerchantReturnFiniteReturnWindow",
 "merchantReturnDays": 60,
 "returnMethod": "https://schema.org/ReturnByMail",
 "returnFees": "https://schema.org/FreeReturn"
 }
 ]
 </script>
 </head>
 <body>
 </body>
</html>
 

 

```
<html>
 <head>
 <title>Wool winter coat, lightblue color</title>
 <script type="application/ld+json">
 [
 {
 "@context": "https://schema.org/",
 "@type": "ProductGroup",
 "@id": "#coat_parent",
 "name": "Wool winter coat",
 "description": "Wool coat, new for the coming winter season",
 "brand": {
 "@type": "Brand",
 "name": "Good brand"
 },
 "audience": {
 "@type": "PeopleAudience",
 "suggestedGender": "unisex",
 "suggestedAge": {
 "@type": "QuantitativeValue",
 "minValue": 13,
 "unitCode": "ANN"
 }
 },
 "productGroupID": "44E01",
 "pattern": "striped",
 "material": "wool",
 "variesBy": [
 "https://schema.org/size",
 "https://schema.org/color"
 ]
 },
 {
 "@context": "https://schema.org",
 "@type": "Product",
 "isVariantOf": { "@id": "#coat_parent" },
 "sku": "44E01-K11000",
 "gtin14": "98766051104207",
 "image": "https://www.example.com/coat_lightblue.jpg",
 "name": "Small light blue coat",
 "description": "Small wool light blue coat for the winter season",
 "color": "light blue",
 "size": "small",
 "offers": {
 "@type": "Offer",
 "url": "https://www.example.com/coat/lightblue?size=small",
 "priceCurrency": "USD",
 "price": 39.99,
 "itemCondition": "https://schema.org/NewCondition",
 "availability": "https://schema.org/InStock",
 "shippingDetails": { "@id": "#shipping_policy" },
 "hasMerchantReturnPolicy": { "@id": "#return_policy" }
 }
 },
 {
 "@context": "https://schema.org",
 "@type": "Product",
 "isVariantOf": { "@id": "#coat_parent" },
 "sku": "44E01-X1100000",
 "gtin14": "98766051104399",
 "image": "https://www.example.com/coat_lightblue.jpg",
 "name": "Large light blue coat",
 "description": "Large wool light blue coat for the winter season",
 "color": "light blue",
 "size": "large",
 "offers": {
 "@type": "Offer",
 "url": "https://www.example.com/coat/lightblue?size=large",
 "priceCurrency": "USD",
 "price": 49.99,
 "itemCondition": "https://schema.org/NewCondition",
 "availability": "https://schema.org/BackOrder",
 "shippingDetails": { "@id": "#shipping_policy" },
 "hasMerchantReturnPolicy": { "@id": "#return_policy" }
 }
 },
 {
 "@context": "https://schema.org",
 "@type": "Product",
 "isVariantOf": { "@id": "#coat_parent" },
 "url": "https://www.example.com/coat/green?size=small"
 },
 {
 "@context": "https://schema.org/",
 "@type": "OfferShippingDetails",
 "@id": "#shipping_policy",
 "shippingRate": {
 "@type": "MonetaryAmount",
 "value": 2.99,
 "currency": "USD"
 },
 "shippingDestination": {
 "@type": "DefinedRegion",
 "addressCountry": "US"
 },
 "deliveryTime": {
 "@type": "ShippingDeliveryTime",
 "handlingTime": {
 "@type": "QuantitativeValue",
 "minValue": 0,
 "maxValue": 1,
 "unitCode": "DAY"
 },
 "transitTime": {
 "@type": "QuantitativeValue",
 "minValue": 1,
 "maxValue": 5,
 "unitCode": "DAY"
 }
 }
 },
 {
 "@context": "https://schema.org/",
 "@type": "MerchantReturnPolicy",
 "@id": "#return_policy",
 "applicableCountry": "US",
 "returnPolicyCountry": "US",
 "returnPolicyCategory": "https://schema.org/MerchantReturnFiniteReturnWindow",
 "merchantReturnDays": 60,
 "returnMethod": "https://schema.org/ReturnByMail",
 "returnFees": "https://schema.org/FreeReturn"
 }
 ]
 </script>
 </head>
 <body>
 </body>
</html>
```

 

 
 
### Page 2: Green variant

 The following example shows structured data on the second page for the green variant:

 <html>
 <head>
 <title>Wool winter coat, green color</title>
 <script type="application/ld+json">
 [
 {
 "@context": "https://schema.org/",
 "@type": "ProductGroup",
 "@id": "#coat_parent",
 "name": "Wool winter coat",
 "description": "Wool coat, new for the coming winter season",
 "brand": {
 "@type": "Brand",
 "name": "Good brand"
 },
 "audience": {
 "@type": "PeopleAudience",
 "suggestedGender": "unisex",
 "suggestedAge": {
 "@type": "QuantitativeValue",
 "minValue": 13,
 "unitCode": "ANN"
 }
 },
 "productGroupID": "44E01",
 "pattern": "striped",
 "material": "wool",
 "variesBy": [
 "https://schema.org/size",
 "https://schema.org/color"
 ]
 },
 {
 "@context": "https://schema.org",
 "@type": "Product",
 "@id": "#small_green",
 "isVariantOf": { "@id": "#coat_parent" },
 "sku": "44E01-M11000",
 "gtin14": "98766051104214",
 "image": "https://www.example.com/coat_green.jpg",
 "name": "Small green coat",
 "description": "Small wool green coat for the winter season",
 "color": "green",
 "size": "small",
 "offers": {
 "@type": "Offer",
 "url": "https://www.example.com/coat/green?size=small",
 "priceCurrency": "USD",
 "price": 39.99,
 "itemCondition": "https://schema.org/NewCondition",
 "availability": "https://schema.org/InStock",
 "shippingDetails": { "@id": "#shipping_policy" },
 "hasMerchantReturnPolicy": { "@id": "#return_policy" }
 }
 },
 {
 "@context": "https://schema.org",
 "@type": "Product",
 "isVariantOf": { "@id": "#coat_parent" },
 "url": "https://www.example.com/coat/lightblue?size=small"
 },
 {
 "@context": "https://schema.org",
 "@type": "Product",
 "isVariantOf": { "@id": "#coat_parent" },
 "url": "https://www.example.com/coat/lightblue?size=large"
 },
 {
 "@context": "https://schema.org/",
 "@type": "OfferShippingDetails",
 "@id": "#shipping_policy",
 "shippingRate": {
 "@type": "MonetaryAmount",
 "value": "2.99",
 "currency": "USD"
 },
 "shippingDestination": {
 "@type": "DefinedRegion",
 "addressCountry": "US"
 },
 "deliveryTime": {
 "@type": "ShippingDeliveryTime",
 "handlingTime": {
 "@type": "QuantitativeValue",
 "minValue": 0,
 "maxValue": 1,
 "unitCode": "DAY"
 },
 "transitTime": {
 "@type": "QuantitativeValue",
 "minValue": 1,
 "maxValue": 5,
 "unitCode": "DAY"
 }
 }
 },
 {
 "@context": "https://schema.org/",
 "@type": "MerchantReturnPolicy",
 "@id": "#return_policy",
 "applicableCountry": "US",
 "returnPolicyCountry": "US",
 "returnPolicyCategory": "https://schema.org/MerchantReturnFiniteReturnWindow",
 "merchantReturnDays": 60,
 "returnMethod": "https://schema.org/ReturnByMail",
 "returnFees": "https://schema.org/FreeReturn"
 }
 ]
 </script>
 </head>
 <body>
 </body>
</html>
 

 

```
<html>
 <head>
 <title>Wool winter coat, green color</title>
 <script type="application/ld+json">
 [
 {
 "@context": "https://schema.org/",
 "@type": "ProductGroup",
 "@id": "#coat_parent",
 "name": "Wool winter coat",
 "description": "Wool coat, new for the coming winter season",
 "brand": {
 "@type": "Brand",
 "name": "Good brand"
 },
 "audience": {
 "@type": "PeopleAudience",
 "suggestedGender": "unisex",
 "suggestedAge": {
 "@type": "QuantitativeValue",
 "minValue": 13,
 "unitCode": "ANN"
 }
 },
 "productGroupID": "44E01",
 "pattern": "striped",
 "material": "wool",
 "variesBy": [
 "https://schema.org/size",
 "https://schema.org/color"
 ]
 },
 {
 "@context": "https://schema.org",
 "@type": "Product",
 "@id": "#small_green",
 "isVariantOf": { "@id": "#coat_parent" },
 "sku": "44E01-M11000",
 "gtin14": "98766051104214",
 "image": "https://www.example.com/coat_green.jpg",
 "name": "Small green coat",
 "description": "Small wool green coat for the winter season",
 "color": "green",
 "size": "small",
 "offers": {
 "@type": "Offer",
 "url": "https://www.example.com/coat/green?size=small",
 "priceCurrency": "USD",
 "price": 39.99,
 "itemCondition": "https://schema.org/NewCondition",
 "availability": "https://schema.org/InStock",
 "shippingDetails": { "@id": "#shipping_policy" },
 "hasMerchantReturnPolicy": { "@id": "#return_policy" }
 }
 },
 {
 "@context": "https://schema.org",
 "@type": "Product",
 "isVariantOf": { "@id": "#coat_parent" },
 "url": "https://www.example.com/coat/lightblue?size=small"
 },
 {
 "@context": "https://schema.org",
 "@type": "Product",
 "isVariantOf": { "@id": "#coat_parent" },
 "url": "https://www.example.com/coat/lightblue?size=large"
 },
 {
 "@context": "https://schema.org/",
 "@type": "OfferShippingDetails",
 "@id": "#shipping_policy",
 "shippingRate": {
 "@type": "MonetaryAmount",
 "value": "2.99",
 "currency": "USD"
 },
 "shippingDestination": {
 "@type": "DefinedRegion",
 "addressCountry": "US"
 },
 "deliveryTime": {
 "@type": "ShippingDeliveryTime",
 "handlingTime": {
 "@type": "QuantitativeValue",
 "minValue": 0,
 "maxValue": 1,
 "unitCode": "DAY"
 },
 "transitTime": {
 "@type": "QuantitativeValue",
 "minValue": 1,
 "maxValue": 5,
 "unitCode": "DAY"
 }
 }
 },
 {
 "@context": "https://schema.org/",
 "@type": "MerchantReturnPolicy",
 "@id": "#return_policy",
 "applicableCountry": "US",
 "returnPolicyCountry": "US",
 "returnPolicyCategory": "https://schema.org/MerchantReturnFiniteReturnWindow",
 "merchantReturnDays": 60,
 "returnMethod": "https://schema.org/ReturnByMail",
 "returnFees": "https://schema.org/FreeReturn"
 }
 ]
 </script>
 </head>
 <body>
 </body>
</html>
```

 

## Guidelines

For your product variant markup to be eligible for usage in Google Search, you must follow
 these guidelines:

 
- [General structured data guidelines](https://developers.google.com/search/docs/appearance/structured-data/sd-policies)
 
- [Search Essentials](https://developers.google.com/search/docs/essentials)
 
- [Technical guidelines](https://developers.google.com#technical-guidelines)
 
- [Free listings guidelines](https://support.google.com/merchants/answer/12073010) (for merchant listing experiences)

### Technical guidelines

 
- Each variant must have a unique ID in its corresponding structured data markup (for example,
 using the `sku` or `gtin` properties).
 
- Each product group must have a unique ID in its corresponding structured data markup, specified
 with the `inProductGroupWithID` property in variant `Product` properties or
 the `productGroupID` property in the `ProductGroup` property.
 
- Be sure to add `Product` structured data in addition to the product variant properties,
 following the list of [required properties
 for merchant listings](https://developers.google.com/search/docs/appearance/structured-data/merchant-listing#structured-data-type-definitions) (or [product snippets](https://developers.google.com/search/docs/appearance/structured-data/product-snippet#structured-data-type-definitions)).
 
 
- For [single-page sites](https://developers.google.com#single-page-website), there must be only one distinct
 canonical URL for the overall `ProductGroup` that all variants belong to. Typically
 this is the base URL that leads to a page without a variant pre-selected, for example: `https://www.example.com/winter_coat`.
 For [multi-page sites](https://developers.google.com#multi-page-website), this doesn't apply since there is no single canonical URL representing the `ProductGroup` property
 (since the variants are distributed across equally important pages).
 
 
- For [multi-page sites](https://developers.google.com#multi-page-website), each page must have full and
 self-contained markup for the entities defined on that page (meaning, off-page entities shouldn't
 be necessary to fully understand the markup on the page
 itself).
 
- The site must have the ability to preselect each variant directly with a distinct URL (using URL query parameters),
 for example `https://www.example.com/winter_coat/size=small&color=green`. This allows Google to crawl and
 identity each variant. Preselecting each variant includes showing the right image, price,
 and availability, as well as allowing the user to add the variant to the cart.
 
- If you're a merchant optimizing for all types of shopping results, we recommend putting
 `Product` structured data in the initial HTML for best results.
 
- For JavaScript-generated `Product` markup: Be aware that [dynamically-generated markup](https://developers.google.com/search/docs/appearance/structured-data/generate-structured-data-with-javascript)
 can make Shopping crawls less frequent and less reliable, which can be an issue for
 fast-changing content like product availability and price. If you're using JavaScript to
 generate `Product` markup, make sure your server has enough computing resources to
 handle increased traffic from Google.

## Structured data type definitions

You must include the required properties for your structured data to be eligible for usage in
 Google Search. You can also include the recommended properties to add more information about your
 product variants, which could provide a better user experience.

### `ProductGroup`

Google recognizes the following properties of `ProductGroup`. The full definition
 of `ProductGroup` is available at
 [schema.org/ProductGroup](https://schema.org/ProductGroup). When you mark up
 your content with product variant information, use the following properties of the
 `ProductGroup` property.

 
 
 Required properties | 

 
 
 
 `name` | 
 `[Text](https://schema.org/Text)`

 The name of the `ProductGroup` (for example, "Wool winter coat"). Make sure that
 the name of the variants in each `Product` item is more specific
 (for example, "Wool winter coat - green, size small", based on the variant-identifying properties.
 See the [Product documentation](https://developers.google.com/search/docs/appearance/structured-data/merchant-listing#name) for details.
 

 | 
 

 
 
 Recommended properties | 

 
 
 
 `aggregateRating` | 
 `[AggregateRating](https://schema.org/AggregateRating)`
 

 A nested `aggregateRating` of the `ProductGroup` (which is representative
 of all variants), if applicable. Follow the
 [Review snippet guidelines](https://developers.google.com/search/docs/appearance/structured-data/review-snippet#guidelines)
 and the list of required and recommended
 [`AggregateRating` properties](https://developers.google.com/search/docs/appearance/structured-data/review-snippet#aggregated-rating-type-definition).

 | 
 

 
 `brand` | 
 `[Brand](https://schema.org/Brand)`
 

 Brand information about the `ProductGroup` (same across all variants), if applicable.
 See the [Product documentation](https://developers.google.com/search/docs/appearance/structured-data/merchant-listing#brand)
 for details on `brand`.
 

 | 
 

 
 `brand.name` | 
 `[Text](https://schema.org/Text)`
 

 The name of the brand of the `ProductGroup` (same across all variants). If you're
 already adding the brand at the `ProductGroup` level, you don't need to add it
 again at the `Product` level.
 See the [Product documentation](https://developers.google.com/search/docs/appearance/structured-data/merchant-listing#brand)
 for details on `brand`.
 

 | 
 

 
 `description` | 
 `[Text](https://schema.org/Text)` or
 `[TextObject](https://schema.org/TextObject)`
 

 The description of the `ProductGroup`. For example, "Wool winter coat for cold
 weather climates". Make sure that the variant description is more specific and ideally uses
 words that identify the variant (such as color, size, material).
 

 In addition to the description of the `ProductGroup`, we
 recommend also adding a description of each variant at the `Product`
 level. See the [Product documentation](https://developers.google.com/search/docs/appearance/structured-data/merchant-listing#description)
 for details.
 | 
 

 
 `hasAdultConsideration` | 
 `[AdultOrientedEnumeration](https://schema.org/AdultOrientedEnumeration)`

 Indicates that the product is designated as adult-oriented for example, because it
 contains nudity or sexual content. If you sell products that are considered adult-oriented according to Google's
 [adult-oriented content policy](https://support.google.com/merchants/answer/12073010#res),
 you must use this property to label them as adult-oriented. While these products
 are eligible to be shown in Shopping ads and free listings, they are subject to age- and
 country-based restrictions. Labelling them ensures that Google can apply these
 restrictions and show appropriate and legally compliant content to people shopping online.
 While schema.org defines multiple values for `AdultOrientedEnumeration`,
 Google Search only supports the value `https://schema.org/SexualContentConsideration` for this property.

 | 
 

 
 `hasVariant` | 
 `[Product](https://schema.org/Product)`

 A nested `Product` property that is one of the variants of the
 `ProductGroup` property, if applicable. A `ProductGroup` typically has multiple
 nested variant `Product` properties.

 Alternatively, a variant `Product` property can reference back to its parent
 `ProductGroup` using the `isVariantOf` property on the `Product`
 property.
 

 | 
 

 
 `productGroupID` | 
 `[Text](https://schema.org/Text)`

 The identifier of the product group (also known as the parent sku). This identifier must be
 provided for the `ProductGroup` property or, alternatively, using `inProductGroupWithID`
 property for variants of the `ProductGroup` property. If you provide the identifier
 for both the `ProductGroup` property and its variant `Product`
 properties, they must match.
 

 | 
 

 
 `review` | 
 `[Review](https://schema.org/Review)`
 

 A nested `review` of the `ProductGroup`, if applicable. Follow the
 [Review snippet guidelines](https://developers.google.com/search/docs/appearance/structured-data/review-snippet#guidelines)
 and the list of required and recommended
 [review properties](https://developers.google.com/search/docs/appearance/structured-data/review-snippet#review-properties).
 

 | 
 

 
 `url` | 
 `[URL](https://schema.org/URL)`
 

 For [single-page websites](https://developers.google.com#single-page-website) only: The URL (without variant
 selectors) where the `ProductGroup` property is located, if applicable. Don't use this property
 for multi-page websites.
 

 | 
 

 
 `variesBy` | 
 `[DefinedTerm](https://schema.org/DefinedTerm)`

 Aspects by which the variants in the `ProductGroup`
 vary, (for example, size or color), if applicable. Reference these variant-identifying properties through
 their full Schema.org URL (for example,
 `https://schema.org/color`). The following properties are supported:
 

 
 
- `https://schema.org/color`
 
- `https://schema.org/size`
 
- `https://schema.org/suggestedAge`
 
- `https://schema.org/suggestedGender`
 
- `https://schema.org/material`
 
- `https://schema.org/pattern`
 

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
---
source: https://developers.google.com/search/docs/crawling-indexing/valid-page-metadata
title: "Valid Page Metadata for Google Search"
fetched: 2026-07-08
---

# Use valid HTML to specify page metadata

 
 
 Using valid HTML for page metadata ensures that Google can use the metadata as documented.
 Google tries to understand HTML even when it is invalid or inconsistent with the
 [HTML standard](https://html.spec.whatwg.org/multipage/),
 but errors in the markup can cause problems with how your metadata is used in Google Search.
 The primary element for specifying metadata about a page is the `<head>`
 element of an HTML document. If you use an invalid element in the `<head>` element, Google ignores any
 elements that appear after the invalid element.
 

 
## Use valid elements in the `<head>` element

 
 The `<head>` element must only contain the following valid elements (and no other invalid elements), as per
 the HTML standard:
 

 
 
- `title`
 
- `meta`
 
- `link`
 
- `script`
 
- `style`
 
- `base`
 
- `noscript`
 
- `template`
 

 
## Don't use invalid elements in the `<head>` element

 
 No element other than the aforementioned is permitted by the HTML standard in the
 `<head>` element. Common elements that appear in the `<head>` element,
 rendering it invalid are:
 

 
 
- `iframe`
 
- `img`
 

 
 We strongly recommend that you don't use these invalid elements in the
 `<head>` element, but if you must, place these invalid elements after the ones you
 want Google to see. Once Google detects one of these invalid elements, it assumes the end of
 the `<head>` element and stops reading any further elements in the
 `<head>` element.
 

 
 
 
 

 
 
 

 
 
 
 
 
 
 
 
 

 
 
 
 Send feedback
---
source: https://developers.google.com/search/docs/appearance/featured-snippets
title: "Featured Snippets and Your Website"
fetched: 2026-07-08
---

# Featured snippets and your website

 
Featured snippets are special boxes where the format of a regular search result is reversed, showing
 the descriptive [snippet](https://developers.google.com/search/docs/appearance/snippet)
 first. They can also appear within a [related questions group](https://developers.google.com/search/docs/appearance/visual-elements-gallery#related-questions-group) (also known as "People Also Ask").
 [Read more about how Google's Featured Snippets work.](https://support.google.com/websearch/answer/9351707)

## How can I opt out of featured snippets?

There are two ways that you can opt out of featured snippets: 

 
- [Block both featured and regular search snippets](https://developers.google.com#block-both)
 
- [Block featured snippets only](https://developers.google.com#block-fs)

### Block all snippets

To block all snippets (including featured snippets and regular snippets) from appearing for
 a given page, add the [`nosnippet` rule](https://developers.google.com/search/docs/crawling-indexing/robots-meta-tag#nosnippet)
 to that page.

 
- Text marked by the
 [`data-nosnippet` HTML attribute](https://developers.google.com/search/docs/crawling-indexing/robots-meta-tag#data-nosnippet-attr)
 won't appear in featured snippets or regular snippets either.
 
- If both `nosnippet` and
 `data-nosnippet` rules appear in a page,
 `nosnippet` takes priority, and snippets won't be shown for the
 page.

### Block featured snippets only

If you want to retain snippets in regularly-formatted search results, but you don't want to appear in
 featured snippets, experiment with setting the
 [`max-snippet` rule](https://developers.google.com/search/docs/crawling-indexing/robots-meta-tag#max-snippet)
 to lower lengths. Featured snippets will only appear if enough text can be shown to generate a
 useful featured snippet.

Keep lowering the value if pages continue to show for featured snippets. In general, the
 shorter your `max-snippet` rule setting, the less likely the page
 will appear as a featured snippet.

Google does not provide an exact minimum length required to appear as a featured snippet.
 This is because the minimum length is variable based on a number of factors, including—but not
 limited to—the information in the snippet, the language, and the platform (mobile device, app,
 or desktop).

 Using a low `max-snippet` setting doesn't guarantee that Google will
 stop showing featured snippets for your page. If you need a guaranteed solution, use the
 `nosnippet` rule.

## How can I mark my page as a featured snippet?

You can't. Google systems determine whether a page would make a good featured snippet for a
 user's search request, and if so, elevates it.

## What happens when a user clicks a featured snippet?

Clicking a featured snippet takes the user directly to the section of the page that appeared
 in the featured snippet. Scrolling to the position that appeared in the snippet happens
 automatically, without any additional annotation by the site. If a browser doesn't support the
 underlying technology needed, or if our systems can't confidently determine exactly where
 within a page to direct a click, clicking a featured snippet will take a user to the top of
 the source web page.

 
 
 
 

 
 
 

 
 
 
 
 
 
 
 
 

 
 
 
 Send feedback
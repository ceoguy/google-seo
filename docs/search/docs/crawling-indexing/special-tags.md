---
source: https://developers.google.com/search/docs/crawling-indexing/special-tags
title: "Meta Tags and Attributes that Google Supports"
fetched: 2026-07-08
---

# `meta` tags and attributes that Google supports

 

 This page explains what `meta` tags are, which `meta` tags and HTML
 attributes Google supports to control indexing, and other important points to note when
 implementing `meta` tags on your site.

 
 

## `meta` tags

 `meta` tags are HTML tags used to provide additional information about a page to
 search engines and other clients. Clients process the `meta` tags and ignore those they don't
 support. `meta` tags are added to the `<head>` section of
 your HTML page and generally look like this:

```
<!DOCTYPE html>
 <html>
 <head>
 <meta charset="utf-8">
 <meta name="description" content="Author: A.N. Author, Illustrator: P. Picture, Category: Books, Price: £9.24, Length: 784 pages">
 <meta name="google-site-verification" content="+nxGUDJ4QpAZ5l9Bsjdi102tLVC21AIh5d1Nl23908vVuFHs34=">
 <title>Example Books - high-quality used books for children</title>
 <meta name="robots" content="noindex,nofollow">
 </head>
</html>
```

 
 
 If you use a CMS, such as Wix, WordPress, or Blogger, you might not be able to edit
 your HTML directly, or you might prefer not to. Instead, your CMS might have a search engine
 settings page or some other mechanism to tell search engines about `meta` tags.
 

 
 If you want to add a `meta` tag to your website, search for instructions
 about modifying the `<head>` of your page on your CMS (for example,
 search for "wix add meta tags").
 

 
 
Google supports the following `meta` tags:

 
 List of `meta` tags that Google supports | 

 
 
 
 
### description

 | 
 
 

```
<meta name="description" content="A description of the page">
```

 Use this tag to provide a short description of the page. In some situations, this
 description is used in the
 [snippet shown in search results](https://developers.google.com/search/docs/appearance/snippet). | 
 

 
 
### robots and googlebot
 | 
 
 

```
<meta name="robots" content="..., ...">
```

 

```
<meta name="googlebot" content="..., ...">
```

 
 These `meta` tags control the behavior of search engine crawling and
 indexing.
 

 The `<meta name="robots" ...` tag applies to all search engines, while
 the `<meta name="googlebot ...` tag is specific to Google.

 In the case of conflicting `robots` (or `googlebot`)
 `meta` tags, the more restrictive tag applies. For example, if a page has
 both the `max-snippet:50` and `nosnippet` tags, the
 `nosnippet` tag will apply.

 The default values are `index, follow` and don't need to be specified.
 For a full list of values that Google supports, see the
 [list of valid rules](https://developers.google.com/search/docs/crawling-indexing/robots-meta-tag#directives).
 

 You can also specify this information in the header of your pages using the
 `X-Robots-Tag` HTTP header rule. This is particularly useful if you wish to limit
 indexing of non-HTML files like graphics or other kinds of documents.
 [More information about robots `meta` tags](https://developers.google.com/search/docs/crawling-indexing/robots-meta-tag).

 | 
 

 
 
 
### notranslate

 | 
 
 

```
<meta name="googlebot" content="notranslate">
```

 
 When Google recognizes that the contents of a page aren't in the language that the
 user likely wants to read, Google may provide a [translated title link and snippet](https://developers.google.com/search/docs/appearance/translated-results) in search results.
 If the user clicks the translated title link, all further user interaction with the page
 is through Google Translate, which will automatically translate any links followed. In
 general, this gives you the chance to provide your unique and
 compelling content to a much larger group of users. However, there may be situations
 where this is not desired. This `meta` tag tells Google that you don't want
 us to provide a translation for this page.
 

 | 
 

 
 
### nopagereadaloud
 | 
 
 

```
<meta name="google" content="nopagereadaloud">
```

 Prevents various [Google text-to-speech services](https://developers.google.com/search/docs/crawling-indexing/read-aloud-user-agent)
 from reading aloud web pages using text-to-speech (TTS).

 | 
 

 
 
### google-site-verification
 | 
 
 

```
<meta name="google-site-verification" content="...">
```

 
 You can use this tag on the top-level page of your site to [verify ownership for Search Console](https://support.google.com/webmasters/answer/9008080).
 Note that while the values of the `name` and
 `content` attributes must match exactly what is provided to you (including
 upper and lower case), it doesn't matter if you change the tag from XHTML to HTML or
 if the format of the tag matches the format of your page.
 

 | 
 

 
 
 
### Content-Type and charset

 | 
 
 

```
<meta http-equiv="Content-Type" content="...; charset=...">
```

 

```
<meta charset="...">
```

 
 These tags define the page's content type and character set respectively. Make sure that you
 surround the value of the `content` attribute in the
 [`http-equiv`](https://developer.mozilla.org/en-US/docs/Web/HTML/Element/meta#attr-http-equiv)
 `meta` tag with quotes—otherwise the
 [`charset`](https://developer.mozilla.org/en-US/docs/Web/HTML/Element/meta#charset)
 attribute may be interpreted incorrectly. We recommend using Unicode/UTF-8 where possible.
 

 | 
 

 
 
### refresh
 | 
 
 

```
<meta http-equiv="refresh" content="...;url=...">
```

 
 This tag, commonly called meta-refresh, sends the user to a new URL after a certain
 amount of time, and is sometimes used as a simple form of redirection. However, it is
 [not supported by all browsers and can be confusing to the user](https://www.w3.org/TR/WCAG10-HTML-TECHS/#meta-element).
 We recommend using a server-side
 [`301` redirect](https://developers.google.com/search/docs/crawling-indexing/301-redirects)
 instead.
 

 | 
 

 
 
### viewport
 | 
 
 

```
<meta name="viewport" content="...">
```

 
 This tag tells the browser how to render a page on a mobile device. Presence of this tag
 indicates to Google that the page is mobile friendly.
 [Read more about how to configure the `viewport` `meta` tag.](https://web.dev/articles/responsive-web-design-basics#size-content)
 

 | 
 

 
 
 
### rating

 | 
 
 

```
<meta name="rating" content="adult">
```

 

```
<meta name="rating" content="RTA-5042-1996-1400-1577-RTA">
```

 
 Labels a page as containing sexually-explicit adult content, to signal that it be filtered by SafeSearch
 results. [Learn more about labeling SafeSearch pages.](https://developers.google.com/search/docs/crawling-indexing/safesearch)
 

 | 
 

 

## HTML tag attributes

 [HTML tag attributes](https://developer.mozilla.org/docs/Web/HTML/Attributes)
 are additional values of HTML tags that configure the parent tag. For example, the
 `href` attribute of the `<a>` tag configures the resource the anchor
 tag points to: `<a href="https://example.com/"...>`.

 Google Search supports a limited number of HTML attributes for indexing purposes. Attributes
 like `src` and `href` are used for discovering resources such as images
 and URLs. Google also supports various
 [`rel` attributes](https://developers.google.com/search/docs/crawling-indexing/qualify-outbound-links)
 that allow site owners to qualify outbound links.

 The
 [`data-nosnippet` attribute](https://developers.google.com/search/docs/crawling-indexing/robots-meta-tag#data-nosnippet-attr)
 of `div`, `span`, and `section` tags allow you to exclude
 parts of an HTML page from snippets.

## Other points to note

 
- 
 Google can read both HTML and XHTML-style `meta` tags, regardless of the code
 used on the page.
 
 
- 
 To ensure machine readability, the `head` section must be
 [valid HTML](https://developers.google.com/search/docs/crawling-indexing/valid-page-metadata) and in case of
 attributes, all parent tags closed accordingly.
 
 
- 
 With the exception of `google-site-verification`, letter case is generally not
 important in `meta` tags.
 
 
- 
 You can use other `meta` tags if they are important to your site, but Google will
 ignore `meta` tags that it doesn't support.
 
 
- 
 If you're considering using JavaScript to inject or change `meta` tags, proceed
 with caution. We recommend that you avoid using JavaScript to inject or change
 `meta` tags whenever possible, and if you must use it,
 [test your implementations](https://developers.google.com/search/docs/crawling-indexing/javascript/fix-search-javascript)
 thoroughly.
 
 
- 
 To check the `meta` tags and attributes on your pages, use the
 [URL Inspection Tool](https://support.google.com/webmasters/answer/9012289).
 

 
## Unsupported tags and attributes

 
 The following tags and attributes aren't supported by Google Search and are ignored. We're
 including them here because they're either very common in HTML or we used to support them.
 

 
 
 
 Unsupported tags and attributes | 
 

 
 meta-keyword tag | 
 
 `<meta name="keywords" content="...">`
 The meta-keyword tag is not used by Google Search, and it has no effect on indexing and
 ranking at all. | 
 

 
 HTML tag `lang` attributes | 
 Google Search detects the language of a page
 based on the textual content of the page. It doesn't rely on code annotations such as the
 `lang`. | 
 

 
 
 `next` and `prev` `rel` attribute values
 | 
 
 

```
<link rel="next" href="...">
```

 

```
<link rel="prev" href="...">
```

 
 Google no longer uses these HTML `<link>` tags, and they have no effect on
 indexing.
 

 | 
 

 
 
 
### nositelinkssearchbox

 | 
 
 

```
<meta name="google" content="nositelinkssearchbox">
```

 
 The `nositelinkssearchbox` rule is no longer used by Google Search to control
 whether the sitelink search box is shown for a given page, as the feature no longer exists.
 

 | 
 

 

 
 
 
 

 
 
 

 
 
 
 
 
 
 
 
 

 
 
 
 Send feedback
---
source: https://developers.google.com/search/docs/crawling-indexing/prevent-images-on-your-page
title: "Remove your own site&apos;s images from Google Search"
fetched: 2026-07-08
---

# Remove images hosted on your site from search results

 

 Trying to remove images of yourself? See
 [Remove your personal information from Google](https://support.google.com/websearch/troubleshooter/3111061)
 instead.

## For emergency image removal

 To quickly remove images hosted on your site from Google's search results, use the
 [Removals tool](https://support.google.com/webmasters/answer/9689846#zippy=%2Cimage-url).
 Keep in mind that unless you also remove the images from your site or otherwise block the images
 as described in the [non-emergency image removal section](https://developers.google.com#non-emergency-image-removal),
 the images may resurface in Google's search results once the removal request expires.

## For non-emergency image removal

 There are two ways to remove images from your site from Google's search results:

 
- [robots.txt disallow rules](https://developers.google.com#robotstxt)
 
- 
 [The `noindex` `X-Robots-Tag` HTTP header](https://developers.google.com#noindex)
 

 The two methods have the same effect, choose the method that is more convenient for your site.
 Keep in mind that Googlebot has to crawl the URLs to extract the HTTP headers, so implementing
 both methods at the same time doesn't make sense.

 If you don't have access to the site that's hosting your images (for example a CDN) or your CMS
 doesn't provide a way to block images with the `noindex` `X-Robots-Tag` HTTP
 header or robots.txt, you might need to delete the images altogether from your site.

### Remove images using robots.txt rules

 To prevent images from your site appearing in Google's search results, add a
 [robots.txt](https://developers.google.com/search/docs/crawling-indexing/robots/intro) file to the root of the
 site that hosts the image, for example `https://yoursite.example.com/robots.txt`. While
 it takes longer to remove an image from Google's search results using robots.txt rules than it
 does to use the Removals tool, it gives you more flexibility and control through the use of
 wildcards or subpath blocking. It also applies to all search engines, whereas the Removals tool
 only applies to Google.

 For example, if you want Google to exclude the `dogs.jpg` image that appears on your
 site at `yoursite.example.com/images/dogs.jpg`, add the following to your robots.txt
 file:


```
User-agent: Googlebot-Image
Disallow: /images/dogs.jpg
```


 The next time Google crawls the `dogs.jpg` image, we'll see this rule and drop your
 image from our search results.

 Rules may include
 [special characters](https://developers.google.com/search/docs/crawling-indexing/robots/robots_txt#url-matching-based-on-path-values)
 for more flexibility and control. Specifically, the `*` character matches any sequence
 of characters which lets you to match multiple image paths with one rule.

 To remove multiple images on your site from Google's index, add a `disallow` rule for
 each image, or if the images share a common pattern such as a suffix in the filename, use a
 the `*` character in the filename. For example:


```
User-agent: Googlebot-Image
# Repeated 'disallow' rules for each image:
Disallow: /images/dogs.jpg
Disallow: /images/cats.jpg
Disallow: /images/llamas.jpg

# Wildcard character in the filename for
# images that share a common suffix. For example,
#   animal-picture-UNICORN.jpg and
#   animal-picture-SQUIRREL.jpg
# in the "images" directory
# will be matched by this pattern.
Disallow: /images/animal-picture-*.jpg
```


 To remove all the images on your site from our index, place the following rule in your robots.txt
 file:


```
User-agent: Googlebot-Image
Disallow: /
```


 To remove all files of a specific file type (for example, to include `.jpg` but not
 `.gif` images), you'd use the following robots.txt entry:


```
User-agent: Googlebot-Image
Disallow: /*.gif$
```


 By specifying `Googlebot-Image` as the `User-agent`, the images will be
 excluded from Google Images. If you would like to exclude the images from all Google searches
 (including Google Search and Google Images), specify the `Googlebot` user agent.

### Remove images with the `noindex` `X-Robots-Tag` HTTP header

 Alternatively, you can remove images hosted on your site from Google's search results by
 adding the `noindex` `X-Robots-Tag` to the HTTP response headers of the
 images you want to remove. In this case you must allow crawling the image URLs in order for
 Googlebot to be able to extract the `noindex` rule. To implement the
 `noindex` `X-Robots-Tag` HTTP response header,
 [follow our documentation about `noindex`](https://developers.google.com/search/docs/crawling-indexing/robots-meta-tag#xrobotstag-implementation).

 Note that adding the `noimageindex` robots tag to a particular page will also prevent
 that images embedded in that page from getting indexed. However, if the same images also appear in
 other pages, they might get indexed through those pages. To make sure a particular image is
 blocked no matter where it appears, use the `noindex` `X-Robots-Tag` HTTP
 response header.

## How do I remove images from properties that I don't own?

 See the
 [Google Search help documentation on how to remove an image from search results](https://support.google.com/websearch/answer/4628134).
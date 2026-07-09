---
source: https://developers.google.com/search/docs/crawling-indexing/keep-redacted-information-out
title: "Keep Redacted Information out of Google"
fetched: 2026-07-08
---

# Keep redacted information out of Google Search

 
 
 When publishing documents and images on the web, you may unintentionally publish information
 beyond what is immediately visible to the human eye. In particular, information that you might
 not see, or that was intended to be redacted, might be included in some document formats and
 visible to search engines.
 

 Because search engines index public material on the web, including images, content that is
 not completely redacted can potentially be findable in search engines. Assistive technologies
 like screen readers can make this seemingly "hidden" content more easily accessible, and
 common image understanding techniques like optical character recognition (OCR) similarly make
 it possible to search for this content.
 

 Even though putting text in a tiny font, using a font color that's the same as the background
 the text is on, or covering text with an image may make something invisible to the human eye,
 these methods don't actually redact material in a way that prevents search engines from
 indexing it and making it findable.
 

 
 Similarly, some document types include information in various ways that aren't immediately
 visible. They might include the document's change history, allowing users to see text that has
 been redacted or altered. They might retain the full versions of images that contain cropped
 or redacted information. There might also be metadata that's included in a file, which is not
 immediately visible, that may list the names of people who accessed or edited the file.
 

 
 All of this information can remain even when a document is exported or converted from one
 format to another. If you need to remove information from a file, it's critical that the
 information is removed completely from the file before that file is made public.
 

 
 Here are some best practices for how to appropriately redact information from documents that
 you don't want to be indexed and made discoverable via Google Search.
 

 
## Edit and export images before embedding them

 
 Google Search lists images that it finds across the web, both those that are on web pages or
 those that are embedded into various document formats. Embedded images are sometimes edited
 using only the containing document's editing tools. This can cause this redaction to fail when
 an image is indexed apart from the document. That is why it's best to edit images before
 embedding them into a document, not after. In particular:
 

 
 
- Crop out unwanted information from images before embedding them into documents. Some
 document editing tools (such as word processors or slide creation tools) will maintain any
 uncropped images that you use in the public version of the document, so be sure to review
 the tool's documentation thoroughly.
 
 
- 
 Completely remove or obscure any text or other non-public parts of the image, as OCR systems
 may turn any image text seen into searchable text.
 
- 
 Remove any undesired metadata.
 
 

 
 After following the suggestions in this document, export or save the updated images as non-vector or
 flattened image file formats such as PNG or WEBP. This prevents those parts of the images from
 being inadvertently included in a public document.
 

 
## Edit or remove unwanted text before moving to a public file format

 
 Before you generate the public document, remove any text that you don't want displayed in the
 final version of the file. Move to a public format that does not keep your previous change
 history. Here are more specific tips:
 

 
 
- Use proper document redacting tools if a file needs to have information redacted. For
 example, avoid placing black rectangles over text as a redaction method, as this can result
 in the text still being included in the public document.
 
 
- 
 Double-check the document metadata in the public file.
 
 
- 
 Follow the [document redaction best practices](https://www.google.com/search?q=document+redaction+best+practices)
 for the format that you are using (PDF, image, etc).
 
 
- 
 Consider information in the URL or file name itself. Even if a part of a website is
 [blocked by robots.txt](https://developers.google.com/search/docs/crawling-indexing/robots/intro), the
 URLs may be indexed in search (without their content). Use hashes in URL parameters instead
 of email addresses or names.
 
 
- 
 Consider using authentication to limit access to the redacted content. Serve the resulting
 login page with a
 [`noindex` robots `meta` tag](https://developers.google.com/search/docs/crawling-indexing/block-indexing)
 to block indexing.
 
 
- 
 When publishing, make sure that the website is
 [verified in Google Search Console](https://support.google.com/webmasters/answer/9008080).
 This allows quick removal action, if needed.
 
 

 
## What to do if unredacted or improperly redacted documents are indexed in Search

 
 
- 
 Remove the live document from the website or location where you published it.
 
 
- 
 Use the [Removals tool](https://support.google.com/webmasters/answer/9689846)
 for the verified site to remove the documents in question from Search. Use a URL prefix if
 you need to remove many documents. For verified sites, a URL removal generally takes less
 than a day. This prevents the document in question from appearing for any searches for
 redacted content.
 
 
- 
 Host the properly redacted document under a different URL. This makes sure that any newly
 indexed version is of the new document, and not an older version of the document (since
 recrawling of URLs and updating them in a search index can take a bit of time). Update any
 links to those documents.
 
 
- 
 Contact any other site that may also be hosting the improperly redacted documents and ask
 them to take them down as well. Ask them to use the Removals tool in their Search Console
 account, or you can use the
 [Outdated Content tool](https://support.google.com/webmasters/answer/7041154)
 to ask Google's systems to update the search results.
 
 
- 
 Allow the URL removal requests to expire (this happens after the URLs were either updated in
 the Google Search index, or after about 6 months).
 
 

 
 
 
 

 
 
 

 
 
 
 
 
 
 
 
 

 
 
 
 Send feedback
---
source: https://developers.google.com/search/docs/appearance/structured-data/image-license-metadata
title: "Google Images SEO: Image Metadata"
fetched: 2026-07-08
---

# Image metadata in Google Images

 

 When you specify image metadata, Google Images can show more details about the image,
 such as who the creator is, how people can use an image, and credit information. For example, providing licensing
 information can make the image eligible for the Licensable badge, which provides a link to the
 license and more detail on how someone can use the image.

## Feature availability

 This feature is available on mobile and desktop, and in all regions and languages that Google
 Search is available.

## Prepare your web pages and images

 To make sure Google can discover and index your images:

 
- Make sure people can access and view your pages that contain images without needing an account
 or logging in.
 
- Make sure Googlebot can access your pages that contain images (meaning, your pages aren't
 disallowed by a robots.txt file or robots `meta` tag).
 You can see all pages blocked on your site in the
 [Page Indexing report](https://support.google.com/webmasters/answer/7440203),
 or test a specific page using the [URL Inspection tool](https://support.google.com/webmasters/answer/9012289).
 
 
- Follow the [Search Essentials](https://developers.google.com/search/docs/essentials)
 to make sure Google can discover your content.
 
- Follow the [image SEO best practices](https://developers.google.com/search/docs/appearance/google-images).
 
- To keep Google informed of changes, we recommend that you
 [submit a sitemap](https://developers.google.com/search/docs/crawling-indexing/sitemaps/build-sitemap).
 You can automate this with the
 [Search Console Sitemap API](https://developers.google.com/webmaster-tools/search-console-api-original/v3/sitemaps).

## Add structured data or IPTC photo metadata

 To tell Google about your image metadata, add structured data or IPTC photo metadata to each
 image on your site. If you have the same image on multiple pages, add structured data
 or IPTC photo metadata to each image on each page that it appears.

 There are two ways that you can add photo metadata to your image. You only need to provide
 Google with one form of information to be eligible for enhancements like the Licensable badge, and any of the
 following methods is sufficient:

 
- [Structured data](https://developers.google.com#structured-data): Structured data is an association between
 the image and the page where it appears with the mark up. You need to add structured data for
 every instance an image is used, even if it's the same image.
 
- [IPTC photo metadata](https://developers.google.com#iptc-photo-metadata): IPTC photo metadata is embedded
 into the image itself, and the image and metadata can move from page to page while still
 staying intact. You only need to embed IPTC photo metadata once per image.

If you choose to use both IPTC photo metadata and structured
 data, and if any information conflicts between the two, Google will use the structured data
 information.

 The following diagram shows how license information may show up in Google Images:

 
 
- A URL to a page that describes the license governing an image's use. Specify this
 information with the Schema.org `license` property or the IPTC Web Statement of
 Rights field.
 
- A URL to a page that describes where the user can find information on how to license that
 image. Specify this information with the Schema.org `acquireLicensePage` property
 or the IPTC Licensor URL (of a [Licensor](https://www.iptc.org/std/photometadata/specification/IPTC-PhotoMetadata#licensor)) field.

### Structured data

 One way to tell Google about your image metadata is to add structured data fields. Structured
 data is a standardized format for providing information about a page and classifying the page
 content. If you're new to structured data, you can learn more about
 [how structured data works](https://developers.google.com/search/docs/appearance/structured-data/intro-structured-data).

 Here's an overview of how to build, test, and release structured data.

 
- Add the [required properties](https://developers.google.com#structured-data-type-definitions). Based on the
 format you're using, learn where to [insert
 structured data on the page](https://developers.google.com/search/docs/appearance/structured-data/intro-structured-data#format-placement).
 
 Using a CMS? It may be easier to use a plugin that's integrated into your CMS.
 

 Using JavaScript? Learn how to
 [generate structured
 data with JavaScript](https://developers.google.com/search/docs/appearance/structured-data/generate-structured-data-with-javascript).
 
 
- Follow the [General structured data guidelines](https://developers.google.com/search/docs/appearance/structured-data/sd-policies).
 
- Validate your code using the
 [Rich Results Test](https://search.google.com/test/rich-results).
 
- Deploy a few pages that include your structured data and use the [URL Inspection tool](https://support.google.com/webmasters/answer/9012289) to test how Google sees the page. Be sure that your page is
 accessible to Google and not blocked by a robots.txt file, the `noindex` tag, or
 login requirements. If the page looks okay, you can
 [ask Google to recrawl your URLs](https://developers.google.com/search/docs/crawling-indexing/ask-google-to-recrawl).
 Allow time for re-crawling and re-indexing. Remember that it
 may take several days after publishing a page for Google to find and crawl it.
 
 
- To keep Google informed of future changes, we recommend that you
 [submit a sitemap](https://developers.google.com/search/docs/crawling-indexing/sitemaps/build-sitemap).
 You can automate this with the
 [Search Console Sitemap API](https://developers.google.com/webmaster-tools/search-console-api-original/v3/sitemaps).

#### Examples

##### Single image

 Here's an example of a page with a single image.

 
 
### JSON-LD

 <html>
 <head>
 <title>Black labrador puppy</title>
 <script type="application/ld+json">
 {
 "@context": "https://schema.org/",
 "@type": "ImageObject",
 "contentUrl": "https://example.com/photos/1x1/black-labrador-puppy.jpg",
 "license": "https://example.com/license",
 "acquireLicensePage": "https://example.com/how-to-use-my-images",
 "creditText": "Labrador PhotoLab",
 "creator": {
 "@type": "Person",
 "name": "Brixton Brownstone"
 },
 "copyrightNotice": "Clara Kent"
 }
 </script>
 </head>
 <body>
 <img alt="Black labrador puppy" src="https://example.com/photos/1x1/black-labrador-puppy.jpg">
 <p><a href="https://example.com/license">License</a></p>
 <p><a href="https://example.com/how-to-use-my-images">How to use my images</a></p>
 <p><b>Photographer</b>: Brixton Brownstone</p>
 <p><b>Copyright</b>: Clara Kent</p>
 <p><b>Credit</b>: Labrador PhotoLab</p>
 </body>
</html>
 

 

```
<html>
  <head>
    <title>Black labrador puppy</title>
    <script type="application/ld+json">
    {
      "@context": "https://schema.org/",
      "@type": "ImageObject",
      "contentUrl": "https://example.com/photos/1x1/black-labrador-puppy.jpg",
      "license": "https://example.com/license",
      "acquireLicensePage": "https://example.com/how-to-use-my-images",
      "creditText": "Labrador PhotoLab",
      "creator": {
        "@type": "Person",
        "name": "Brixton Brownstone"
       },
      "copyrightNotice": "Clara Kent"
    }
    </script>
  </head>
  <body>
    <img alt="Black labrador puppy" src="https://example.com/photos/1x1/black-labrador-puppy.jpg">
    <p><a href="https://example.com/license">License</a></p>
    <p><a href="https://example.com/how-to-use-my-images">How to use my images</a></p>
    <p><b>Photographer</b>: Brixton Brownstone</p>
    <p><b>Copyright</b>: Clara Kent</p>
    <p><b>Credit</b>: Labrador PhotoLab</p>
  </body>
</html>
```

 

 
 
### RDFa

 <html>
 <head>
 <title>Black labrador puppy</title>
 </head>
 <body>
 <div vocab="https://schema.org/" typeof="ImageObject">
 <img alt="Black labrador puppy" property="contentUrl" src="https://example.com/photos/1x1/black-labrador-puppy.jpg" /><br>
 <span property="license"> https://example.com/license</span><br>
 <span property="acquireLicensePage">https://example.com/how-to-use-my-images</span>
 <span rel="schema:creator">
 <span typeof="schema:Person">
 <span property="schema:name" content="Brixton Brownstone"></span>
 </span>
 </span>
 <span property="copyrightNotice">Clara Kent</span><br>
 <span property="creditText">Labrador PhotoLab</span><br>
 </div>
 </body>
</html>
 

 

```
<html>
  <head>
    <title>Black labrador puppy</title>
  </head>
  <body>
  <div vocab="https://schema.org/" typeof="ImageObject">
    <img alt="Black labrador puppy" property="contentUrl" src="https://example.com/photos/1x1/black-labrador-puppy.jpg" /><br>
    <span property="license"> https://example.com/license</span><br>
    <span property="acquireLicensePage">https://example.com/how-to-use-my-images</span>
    <span rel="schema:creator">
      <span typeof="schema:Person">
        <span property="schema:name" content="Brixton Brownstone"></span>
      </span>
    </span>
    <span property="copyrightNotice">Clara Kent</span><br>
    <span property="creditText">Labrador PhotoLab</span><br>
  </div>
  </body>
</html>
```

 

 
 
### Microdata

 <html>
 <head>
 <title>Black labrador puppy</title>
 </head>
 <body>
 <div itemscope itemtype="https://schema.org/ImageObject">
 <img alt="Black labrador puppy" itemprop="contentUrl" src="https://example.com/photos/1x1/black-labrador-puppy.jpg" />
 <span itemprop="license"> https://example.com/license</span><br>
 <span itemprop="acquireLicensePage">https://example.com/how-to-use-my-images</span>
 <span itemprop="creator" itemtype="https://schema.org/Person" itemscope>
 <meta itemprop="name" content="Brixton Brownstone" />
 </span>
 <span itemprop="copyrightNotice">Clara Kent</span>
 <span itemprop="creditText">Labrador PhotoLab</span>
 </div>
 </body>
</html>
 

 

```
<html>
  <head>
    <title>Black labrador puppy</title>
  </head>
  <body>
    <div itemscope itemtype="https://schema.org/ImageObject">
      <img alt="Black labrador puppy" itemprop="contentUrl" src="https://example.com/photos/1x1/black-labrador-puppy.jpg" />
      <span itemprop="license"> https://example.com/license</span><br>
      <span itemprop="acquireLicensePage">https://example.com/how-to-use-my-images</span>
      <span itemprop="creator" itemtype="https://schema.org/Person" itemscope>
        <meta itemprop="name" content="Brixton Brownstone" />
      </span>
      <span itemprop="copyrightNotice">Clara Kent</span>
      <span itemprop="creditText">Labrador PhotoLab</span>
    </div>
  </body>
</html>
```

 

##### Single image in a `srcset` tag

 Here's an example of a page with a single image in a `srcset` tag.

 
 
### JSON-LD

 <html>
 <head>
 <title>Black labrador puppy</title>
 <script type="application/ld+json">
 {
 "@context": "https://schema.org/",
 "@type": "ImageObject",
 "contentUrl": "https://example.com/photos/320/black-labrador-puppy-800w.jpg",
 "license": "https://example.com/license",
 "acquireLicensePage": "https://example.com/how-to-use-my-images",
 "creditText": "Labrador PhotoLab",
 "creator": {
 "@type": "Person",
 "name": "Brixton Brownstone"
 },
 "copyrightNotice": "Clara Kent"
 }
 </script>
 </head>
 <body>
 <img srcset="https://example.com/photos/320/black-labrador-puppy-320w.jpg 320w,
 https://example.com/photos/480/black-labrador-puppy-480w.jpg 480w,
 https://example.com/photos/800/black-labrador-puppy-800w.jpg 800w"
 sizes="(max-width: 320px) 280px,
 (max-width: 480px) 440px,
 800px"
 src="https://example.com/photos/320/black-labrador-puppy-800w.jpg"
 alt="Black labrador puppy"><br>
 <p><a href="https://example.com/license">License</a></p>
 <p><a href="https://example.com/how-to-use-my-images">How to use my images</a></p>
 <p><b>Photographer</b>: Brixton Brownstone</p>
 <p><b>Copyright</b>: Clara Kent</p>
 <p><b>Credit</b>: Labrador PhotoLab</p>
 </body>
</html>
 

 

```
<html>
  <head>
    <title>Black labrador puppy</title>
    <script type="application/ld+json">
    {
      "@context": "https://schema.org/",
      "@type": "ImageObject",
      "contentUrl": "https://example.com/photos/320/black-labrador-puppy-800w.jpg",
      "license": "https://example.com/license",
      "acquireLicensePage": "https://example.com/how-to-use-my-images",
      "creditText": "Labrador PhotoLab",
      "creator": {
        "@type": "Person",
        "name": "Brixton Brownstone"
       },
      "copyrightNotice": "Clara Kent"
    }
    </script>
  </head>
  <body>
    <img srcset="https://example.com/photos/320/black-labrador-puppy-320w.jpg 320w,
                   https://example.com/photos/480/black-labrador-puppy-480w.jpg 480w,
                   https://example.com/photos/800/black-labrador-puppy-800w.jpg 800w"
           sizes="(max-width: 320px) 280px,
                  (max-width: 480px) 440px,
                  800px"
           src="https://example.com/photos/320/black-labrador-puppy-800w.jpg"
           alt="Black labrador puppy"><br>
    <p><a href="https://example.com/license">License</a></p>
    <p><a href="https://example.com/how-to-use-my-images">How to use my images</a></p>
    <p><b>Photographer</b>: Brixton Brownstone</p>
    <p><b>Copyright</b>: Clara Kent</p>
    <p><b>Credit</b>: Labrador PhotoLab</p>
  </body>
</html>
```

 

 
 
### RDFa

 <html>
 <head>
 <title>Black labrador puppy</title>
 </head>
 <body>
 <div vocab="https://schema.org/" typeof="ImageObject">
 <img property="contentUrl"
 srcset="https://example.com/photos/320/black-labrador-puppy-320w.jpg 320w,
 https://example.com/photos/480/black-labrador-puppy-480w.jpg 480w,
 https://example.com/photos/800/black-labrador-puppy-800w.jpg 800w"
 sizes="(max-width: 320px) 280px,
 (max-width: 480px) 440px,
 800px"
 src="https://example.com/photos/320/black-labrador-puppy-800w.jpg"
 alt="Black labrador puppy">
 <span property="license">https://example.com/license</span>
 <span property="acquireLicensePage">https://example.com/how-to-use-my-images</span>
 <span rel="schema:creator">
 <span typeof="schema:Person">
 <span property="schema:name" content="Brixton Brownstone"></span>
 </span>
 </span>
 <span property="copyrightNotice">Clara Kent</span>
 <span property="creditText">Labrador PhotoLab</span>
 </div>
 </body>
</html>
 

 

```
<html>
  <head>
    <title>Black labrador puppy</title>
  </head>
  <body>
    <div vocab="https://schema.org/" typeof="ImageObject">
      <img property="contentUrl"
           srcset="https://example.com/photos/320/black-labrador-puppy-320w.jpg 320w,
                   https://example.com/photos/480/black-labrador-puppy-480w.jpg 480w,
                   https://example.com/photos/800/black-labrador-puppy-800w.jpg 800w"
           sizes="(max-width: 320px) 280px,
                  (max-width: 480px) 440px,
                  800px"
           src="https://example.com/photos/320/black-labrador-puppy-800w.jpg"
           alt="Black labrador puppy">
      <span property="license">https://example.com/license</span>
      <span property="acquireLicensePage">https://example.com/how-to-use-my-images</span>
      <span rel="schema:creator">
        <span typeof="schema:Person">
          <span property="schema:name" content="Brixton Brownstone"></span>
        </span>
      </span>
      <span property="copyrightNotice">Clara Kent</span>
      <span property="creditText">Labrador PhotoLab</span>
   </div>
  </body>
</html>
```

 

 
 
### Microdata

 <html>
 <head>
 <title>Black labrador puppy</title>
 </head>
 <body>
 <div itemscope itemtype="https://schema.org/ImageObject">
 <img itemprop="contentUrl"
 srcset="https://example.com/photos/320/black-labrador-puppy-320w.jpg 320w,
 https://example.com/photos/480/black-labrador-puppy-480w.jpg 480w,
 https://example.com/photos/800/black-labrador-puppy-800w.jpg 800w"
 sizes="(max-width: 320px) 280px,
 (max-width: 480px) 440px,
 800px"
 src="https://example.com/photos/320/black-labrador-puppy-800w.jpg"
 alt="Black labrador puppy">
 <span itemprop="license">https://example.com/license</span>
 <span itemprop="acquireLicensePage">https://example.com/how-to-use-my-images</span>
 <span itemprop="creator" itemtype="https://schema.org/Person" itemscope>
 <meta itemprop="name" content="Brixton Brownstone" />
 </span>
 <span itemprop="copyrightNotice">Clara Kent</span>
 <span itemprop="creditText">Labrador PhotoLab</span>
 </div>
 </body>
</html>
 

 

```
<html>
  <head>
    <title>Black labrador puppy</title>
  </head>
  <body>
    <div itemscope itemtype="https://schema.org/ImageObject">
      <img itemprop="contentUrl"
           srcset="https://example.com/photos/320/black-labrador-puppy-320w.jpg 320w,
                   https://example.com/photos/480/black-labrador-puppy-480w.jpg 480w,
                   https://example.com/photos/800/black-labrador-puppy-800w.jpg 800w"
           sizes="(max-width: 320px) 280px,
                  (max-width: 480px) 440px,
                  800px"
           src="https://example.com/photos/320/black-labrador-puppy-800w.jpg"
           alt="Black labrador puppy">
      <span itemprop="license">https://example.com/license</span>
      <span itemprop="acquireLicensePage">https://example.com/how-to-use-my-images</span>
      <span itemprop="creator" itemtype="https://schema.org/Person" itemscope>
        <meta itemprop="name" content="Brixton Brownstone" />
      </span>
      <span itemprop="copyrightNotice">Clara Kent</span>
      <span itemprop="creditText">Labrador PhotoLab</span>
   </div>
  </body>
</html>
```

 

##### Multiple image on a page

 Here's an example of a page with multiple images.

 
 
### JSON-LD

 <html>
 <head>
 <title>Photos of black labradors</title>
 <script type="application/ld+json">
 [{
 "@context": "https://schema.org/",
 "@type": "ImageObject",
 "contentUrl": "https://example.com/photos/1x1/black-labrador-puppy.jpg",
 "license": "https://example.com/license",
 "acquireLicensePage": "https://example.com/how-to-use-my-images",
 "creditText": "Labrador PhotoLab",
 "creator": {
 "@type": "Person",
 "name": "Brixton Brownstone"
 },
 "copyrightNotice": "Clara Kent"
 },
 {
 "@context": "https://schema.org/",
 "@type": "ImageObject",
 "contentUrl": "https://example.com/photos/1x1/adult-black-labrador.jpg",
 "license": "https://example.com/license",
 "acquireLicensePage": "https://example.com/how-to-use-my-images",
 "creditText": "Labrador PhotoLab",
 "creator": {
 "@type": "Person",
 "name": "Brixton Brownstone"
 },
 "copyrightNotice": "Clara Kent"
 }]
 </script>
 </head>
 <body>
 <h2>Black labrador puppy</h2>
 <img alt="Black labrador puppy" src="https://example.com/photos/1x1/black-labrador-puppy.jpg">
 <p><a href="https://example.com/license">License</a></p>
 <p><a href="https://example.com/how-to-use-my-images">How to use my images</a></p>
 <p><b>Photographer</b>: Brixton Brownstone</p>
 <p><b>Copyright</b>: Clara Kent</p>
 <p><b>Credit</b>: Labrador PhotoLab</p>
 <h2>Adult black labrador</h2>
 <img alt="Adult black labrador" src="https://example.com/photos/1x1/adult-black-labrador.jpg">
 <p><a href="https://example.com/license">License</a></p>
 <p><a href="https://example.com/how-to-use-my-images">How to use my images</a></p>
 <p><b>Photographer</b>: Brixton Brownstone</p>
 <p><b>Copyright</b>: Clara Kent</p>
 <p><b>Credit</b>: Labrador PhotoLab</p>
 </body>
</html>
 

 

```
<html>
  <head>
    <title>Photos of black labradors</title>
    <script type="application/ld+json">
    [{
      "@context": "https://schema.org/",
      "@type": "ImageObject",
      "contentUrl": "https://example.com/photos/1x1/black-labrador-puppy.jpg",
      "license": "https://example.com/license",
      "acquireLicensePage": "https://example.com/how-to-use-my-images",
      "creditText": "Labrador PhotoLab",
      "creator": {
        "@type": "Person",
        "name": "Brixton Brownstone"
       },
      "copyrightNotice": "Clara Kent"
    },
   {
      "@context": "https://schema.org/",
      "@type": "ImageObject",
      "contentUrl": "https://example.com/photos/1x1/adult-black-labrador.jpg",
      "license": "https://example.com/license",
      "acquireLicensePage": "https://example.com/how-to-use-my-images",
      "creditText": "Labrador PhotoLab",
      "creator": {
        "@type": "Person",
        "name": "Brixton Brownstone"
       },
      "copyrightNotice": "Clara Kent"
    }]
    </script>
  </head>
  <body>
    <h2>Black labrador puppy</h2>
    <img alt="Black labrador puppy" src="https://example.com/photos/1x1/black-labrador-puppy.jpg">
    <p><a href="https://example.com/license">License</a></p>
    <p><a href="https://example.com/how-to-use-my-images">How to use my images</a></p>
    <p><b>Photographer</b>: Brixton Brownstone</p>
    <p><b>Copyright</b>: Clara Kent</p>
    <p><b>Credit</b>: Labrador PhotoLab</p>
    <h2>Adult black labrador</h2>
    <img alt="Adult black labrador" src="https://example.com/photos/1x1/adult-black-labrador.jpg">
    <p><a href="https://example.com/license">License</a></p>
    <p><a href="https://example.com/how-to-use-my-images">How to use my images</a></p>
    <p><b>Photographer</b>: Brixton Brownstone</p>
    <p><b>Copyright</b>: Clara Kent</p>
    <p><b>Credit</b>: Labrador PhotoLab</p>
  </body>
</html>
```

 

 
 
### RDFa

 <html>
 <head>
 <title>Photos of black labradors</title>
 </head>
 <body>
 <div vocab="https://schema.org/" typeof="ImageObject">
 <h2 property="name">Black labrador puppy</h2>
 <img alt="Black labrador puppy" property="contentUrl" src="https://example.com/photos/1x1/black-labrador-puppy.jpg" /><br>
 <span property="license"> https://example.com/license</span>
 <span property="acquireLicensePage">https://example.com/how-to-use-my-images</span>
 <span rel="schema:creator">
 <span typeof="schema:Person">
 <span property="schema:name" content="Brixton Brownstone"></span>
 </span>
 </span>
 <span property="copyrightNotice">Clara Kent</span>
 <span property="creditText">Labrador PhotoLab</span>
 </div>
 <br>
 <div vocab="https://schema.org/" typeof="ImageObject">
 <h2 property="name">Adult black labrador</h2>
 <img alt="Adult black labrador" property="contentUrl" src="https://example.com/photos/1x1/adult-black-labrador.jpg" />
 <span property="license"> https://example.com/license</span>
 <span property="acquireLicensePage">https://example.com/how-to-use-my-images</span>
 <span rel="schema:creator">
 <span typeof="schema:Person">
 <span property="schema:name" content="Brixton Brownstone"></span>
 </span>
 </span>
 <span property="copyrightNotice">Clara Kent</span>
 <span property="creditText">Labrador PhotoLab</span>
 </div>
 </body>
</html>
 

 

```
<html>
  <head>
    <title>Photos of black labradors</title>
  </head>
  <body>
    <div vocab="https://schema.org/" typeof="ImageObject">
      <h2 property="name">Black labrador puppy</h2>
      <img alt="Black labrador puppy" property="contentUrl" src="https://example.com/photos/1x1/black-labrador-puppy.jpg" /><br>
      <span property="license"> https://example.com/license</span>
      <span property="acquireLicensePage">https://example.com/how-to-use-my-images</span>
      <span rel="schema:creator">
        <span typeof="schema:Person">
          <span property="schema:name" content="Brixton Brownstone"></span>
        </span>
      </span>
      <span property="copyrightNotice">Clara Kent</span>
      <span property="creditText">Labrador PhotoLab</span>
    </div>
    <br>
    <div vocab="https://schema.org/" typeof="ImageObject">
      <h2 property="name">Adult black labrador</h2>
      <img alt="Adult black labrador" property="contentUrl" src="https://example.com/photos/1x1/adult-black-labrador.jpg" />
      <span property="license"> https://example.com/license</span>
      <span property="acquireLicensePage">https://example.com/how-to-use-my-images</span>
      <span rel="schema:creator">
        <span typeof="schema:Person">
          <span property="schema:name" content="Brixton Brownstone"></span>
        </span>
      </span>
      <span property="copyrightNotice">Clara Kent</span>
      <span property="creditText">Labrador PhotoLab</span>
    </div>
  </body>
</html>
```

 

 
 
### Microdata

 <html>
 <head>
 <title>Photos of black labradors</title>
 </head>
 <body>
 <div itemscope itemtype="https://schema.org/ImageObject">
 <h2 itemprop="name">Black labrador puppy</h2>
 <img alt="Black labrador puppy" itemprop="contentUrl" src="https://example.com/photos/1x1/black-labrador-puppy.jpg" />
 <span itemprop="license"> https://example.com/license</span>
 <span itemprop="acquireLicensePage">https://example.com/how-to-use-my-images</span>
 <span itemprop="creator" itemtype="https://schema.org/Person" itemscope>
 <meta itemprop="name" content="Brixton Brownstone" />
 </span>
 <span itemprop="copyrightNotice">Clara Kent</span><br>
 <span itemprop="creditText">Labrador PhotoLab</span><br>
 </div>
 <br>
 <h2 itemprop="name">Adult black labrador</h2>
 <div itemscope itemtype="https://schema.org/ImageObject">
 <img alt="Adult black labrador" itemprop="contentUrl" src="https://example.com/photos/1x1/adult-black-labrador.jpg" />
 <span itemprop="license"> https://example.com/license</span>
 <span itemprop="acquireLicensePage">https://example.com/how-to-use-my-images</span>
 <span itemprop="creator" itemtype="https://schema.org/Person" itemscope>
 <meta itemprop="name" content="Brixton Brownstone" />
 </span>
 <span itemprop="copyrightNotice">Clara Kent</span>
 <span itemprop="creditText">Labrador PhotoLab</span>
 </div>
 </body>
</html>
 

 

```
<html>
  <head>
    <title>Photos of black labradors</title>
  </head>
  <body>
    <div itemscope itemtype="https://schema.org/ImageObject">
      <h2 itemprop="name">Black labrador puppy</h2>
      <img alt="Black labrador puppy" itemprop="contentUrl" src="https://example.com/photos/1x1/black-labrador-puppy.jpg" />
      <span itemprop="license"> https://example.com/license</span>
      <span itemprop="acquireLicensePage">https://example.com/how-to-use-my-images</span>
      <span itemprop="creator" itemtype="https://schema.org/Person" itemscope>
        <meta itemprop="name" content="Brixton Brownstone" />
      </span>
      <span itemprop="copyrightNotice">Clara Kent</span><br>
      <span itemprop="creditText">Labrador PhotoLab</span><br>
    </div>
    <br>
      <h2 itemprop="name">Adult black labrador</h2>
      <div itemscope itemtype="https://schema.org/ImageObject">
      <img alt="Adult black labrador" itemprop="contentUrl" src="https://example.com/photos/1x1/adult-black-labrador.jpg" />
      <span itemprop="license"> https://example.com/license</span>
      <span itemprop="acquireLicensePage">https://example.com/how-to-use-my-images</span>
      <span itemprop="creator" itemtype="https://schema.org/Person" itemscope>
        <meta itemprop="name" content="Brixton Brownstone" />
      </span>
      <span itemprop="copyrightNotice">Clara Kent</span>
      <span itemprop="creditText">Labrador PhotoLab</span>
    </div>
  </body>
</html>
```

 

#### Structured data type definitions

 The full definition of `ImageObject` is provided on
 [schema.org/ImageObject](https://schema.org/ImageObject).
 The Google-supported properties are the following:

 
 
 
| Required properties |
 
 
 
| `contentUrl` | ` URL ` A URL to the actual image content. Google uses `contentUrl` to determine which image the photo metadata applies to. Google also supports the `url` property to specify the image URL if you don't include `contentUrl`. While the `url` property is not as precise and we recommend you use `contentUrl` instead, existing markup may still use `url`. |
 
| Either `creator` or `creditText` or `copyrightNotice` or `license` | In addition to `contentUrl`, you must include one of the following properties: `creator` `creditText` `copyrightNotice` `license` Once you include one of these properties, the other three properties become recommended in the Rich Results Test. |
 

 
 
 
| Recommended properties |
 
 
 
| `acquireLicensePage` | ` URL ` A URL to a page where the user can find information on how to license that image. Here are some examples: A check-out page for that image where the user can select specific resolutions or usage rights A general page that explains how to contact you |
 
| `creator` | ` Organization ` or ` Person ` The creator of the image. This is usually the photographer, but it may be a company or organization (if appropriate). |
 
| `creator.name` | ` Text ` The name of the creator. |
 
| `creditText` | ` Text ` The name of the person and/or organization that is credited for the image when it's published. |
 
| `copyrightNotice` | ` Text ` The copyright notice for claiming the intellectual property for this photograph. This identifies the current owner of the copyright for the photograph. |
 
| `license` | ` URL ` A URL to a page that describes the license governing an image's use. For example, it could be the terms and conditions that you have on your website. Where applicable, it could also be a Creative Commons License (for example, BY-NC 4.0 ). If you're using structured data to specify an image, you must include the `license` property for your image to be eligible to be shown with the Licensable badge. We recommend that you also add the `acquireLicensePage` property if you have that information. |
 

### IPTC photo metadata

 Alternatively, you can embed
 [IPTC photo metadata](https://iptc.org/standards/photo-metadata/iptc-standard/)
 directly inside an image. We recommend using
 [metadata management software to manage your image metadata](https://iptc.org/standards/photo-metadata/software-support/).
 The following table contains the properties that Google extracts:

 
 
 
| Recommended properties |
 
 
 
| Copyright Notice | The copyright notice for claiming the intellectual property for this photograph. This identifies the current owner of the copyright for the photograph. |
 
| Creator | The creator of the image. This is usually the name of the photographer, but it may be the name of a company or organization (if appropriate). |
 
| Credit Line | The name of the person and/or organization that is credited for the image when it's published. |
 
| Digital Source Type | The type of digital source that was used to create the image. Google supports the following IPTC `NewsCodes`: `trainedAlgorithmicMedia` : The image was created algorithmically using a model derived from sampled content. `compositeSynthetic` : The image is a mix or composite that includes at least one synthetic element. `algorithmicMedia` : The image was created purely by an algorithm not based on any sampled training data (for example, an image created by software using a mathematical formula). `compositeWithTrainedAlgorithmicMedia` : The image is a composite of trained algorithmic media with some other media, such as with inpainting or outpainting operations. |
 
| Licensor URL | A URL to a page where the user can find information on how to license that image. The Licensor URL must be a property of a Licensor object , not a property of the image object. Here are some examples: A check-out page for that image where the user can select specific resolutions A general page that explains how to contact you |
 
| Web Statement of Rights | A URL to a page that describes the license governing an image's use, and optionally other rights information. For example, it could be the terms and conditions that you have on your website. Where applicable, it could also be a Creative Commons License (for example, BY-NC 4.0 ). You must include the Web Statement of Rights field for your image to be eligible to be shown with the licensable badge. We recommend that you also add the Licensor URL field if you have that information. |
 

### How C2PA metadata can appear in Google Search results

 If an image contains
 [C2PA](https://c2pa.org/specifications/)
 metadata, Google can extract those details and may show information in the
 "[About
 this image](https://support.google.com/websearch/answer/14177408)" feature, such as how the image was created or if it was edited with AI tools.
 This metadata comes from a
 [signer](https://c2pa.org/specifications/specifications/2.1/specs/C2PA_Specification.html#signer-definition),
 which is usually an app, device, or service (for example, photo editing software, the camera
 itself, or other services that modify or create images) that meets the following conditions:

 
- The app, device, or service has adopted C2PA version 2.1 or later.
 
- The image's manifest must be signed by a certificate from a Certification Authority on the
 [C2PA
 Trust List](https://c2pa.org/specifications/specifications/2.1/specs/C2PA_Specification.html#_c2pa_trust_list).
 

## Troubleshooting

Important: Google does not guarantee that structured data or IPTC
 photo metadata will show up in search results. For a list of common reasons why Google may not
 show structured data in search results, see the [General Structured Data Guidelines](https://developers.google.com/search/docs/appearance/structured-data/sd-policies).

 If you're having trouble implementing image metadata for Google Images, here are some resources
 that may help you.

If you're using a content management system (CMS) or someone else is taking care of your site,
 ask them to help you. Make sure to forward any Search Console message that details the issue to them.

 
- For questions about the feature, review the
 [FAQ for Image License in Google Images](https://support.google.com/webmasters/thread/31516792).
 
- You might have an error in your structured data. Check the
 [list of structured data errors](https://support.google.com/webmasters/answer/13300873).
 
- If you received a structured data manual action against your page, the structured data on
 the page will be ignored (although the page can still appear in Google Search results). To fix
 [structured data issues](https://support.google.com/webmasters/answer/9044175#zippy=%2Cstructured-data-issue),
 use the [Manual Actions report](https://support.google.com/webmasters/answer/9044175).
 
 
- Review the [guidelines](https://developers.google.com/search/docs/appearance/structured-data/sd-policies) again
 to identify if your content isn't compliant with the guidelines.
 The problem can be caused by either spammy content or spammy markup usage.
 However, the issue may not be a syntax issue, and so the Rich Results Test won't be able to
 identify these issues.
 
 
- [Troubleshoot missing rich results / drop in total rich results](https://support.google.com/webmasters/answer/13300208).
 
- For general questions about crawling and indexing, check the
 [Google Search crawling and indexing FAQ](https://developers.google.com/search/help/crawling-index-faq).
 Allow time for re-crawling and re-indexing. Remember that it
 may take several days after publishing a page for Google to find and crawl it.
 
 
- Ask a question in the [Google Search Central office hours](https://developers.google.com/search/help/office-hours).
 
- Post a question in the [Google Search Central forum](https://support.google.com/webmasters/community).
 For help with IPTC photo metadata, you can
 [post in their forum](https://groups.io/g/iptc-photometadata/).

## Is it okay to remove image metadata?

 Removing image metadata can reduce image file size, which helps web pages load faster. However,
 be careful, since removing metadata may be illegal in certain jurisdictions. Image
 metadata provide image copyright and licensing information online. Google recommends that, at
 the very least, you retain critical metadata related to image rights information and
 identification. For example, whenever possible try to keep the IPTC fields
 [creator](https://iptc.org/std/photometadata/specification/IPTC-PhotoMetadata#creator),
 [credit line](https://iptc.org/std/photometadata/specification/IPTC-PhotoMetadata#credit-line),
 and [copyright notice](https://iptc.org/std/photometadata/specification/IPTC-PhotoMetadata#copyright-notice)
 to provide proper attribution.

 
 
 
 

 
 
 

 
 
 
 
 
 
 
 
 

 
 
 
 Send feedback
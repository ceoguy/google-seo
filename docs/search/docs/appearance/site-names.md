---
source: https://developers.google.com/search/docs/appearance/site-names
title: "Site Names in Google Search"
fetched: 2026-07-08
---

# Provide a site name to Google Search

 

 When Google lists a page in search results, it shows the name of the site the page comes from.
 This is called the site name. Note that the site name is different from the per-page
 [title links](https://developers.google.com/search/docs/appearance/title-link) (title links are specific to each
 web page, whereas the site name is for the entire site).

## Feature availability

 Site names are available in all languages where Google Search is available, on both mobile and
 desktop. Site names can appear for domain-level and subdomain-level sites (learn more in the
 [technical guidelines](https://developers.google.com#technical-guidelines)).

## How site names in Google Search are created

 Google's generation of site names on the Google Search results page is completely automated and
 takes into account content from a site's home page and references to it that appear on the web.
 The goal of the site name in Google Search is to best represent and describe the source of each result.

 To indicate your site name preference, add [`WebSite` structured data](https://developers.google.com#website)
 to your home page. Our site name system will also consider content in `og:site_name`,
 `<title>`, heading elements, and other text on a home page. However, `WebSite`
 structured data is most important, if you want to specify a preference.

 While we can't manually change automatically selected site names, you can [indicate alternatives](https://developers.google.com#alternative)
 for our automated system to consider if your primary preference isn't selected.

## Choosing your site name

 
- Choose a unique name that accurately reflects the identity of your site and isn't
 misleading for users. The name you choose must follow [Search content policies](https://support.google.com/websearch/answer/10622781).
 
- Use a concise, commonly-recognized name for your site (for example, "Google" instead
 of "Google, Inc"). While there's no limit to how long a site name can be, long site names may
 be truncated on some devices. 
 
- Avoid using a generic name. A generic name like "Best Dentists In Iowa" is unlikely
 to be selected by our system as a site name, unless that's an extremely well-recognized brand name.
 
- Use your site name consistently across your home page. Make sure whatever you use
 as the site name in structured data is consistent with how you refer to your site in
 [other sources](https://developers.google.com#sources) on your home page that our system considers.
 
- Provide an alternative name. While our site name system tries to use your preferred
 site name, sometimes the name isn't available for use. For example, our system generally
 won't use the same site name for two different sites that are global in nature. In other
 cases, our system might determine that a site is more commonly recognized by an acronym than
 by a full name. Providing an alternative name using the `alternateName` property
 allows Google to consider other options if your preferred choice isn't selected.
 

## How to add a site name with structured data

 
 

 Structured data is a standardized format for providing information about a page and classifying
 the page content. If you're new to structured data, you can learn more about
 [how structured data works](https://developers.google.com/search/docs/appearance/structured-data/intro-structured-data).

 This section goes over the technical guidelines, required properties, and how to add and test site
 name structured data.

Using a CMS? It may be easier to use a plugin that's integrated into your CMS.
 

 Using JavaScript? Learn how to [generate structured data with JavaScript](https://developers.google.com/search/docs/appearance/structured-data/generate-structured-data-with-javascript).

### Follow the guidelines

 To help Google better understand your site name, make sure you follow the
 [Search Essentials](https://developers.google.com/search/docs/essentials), [General structured data guidelines](https://developers.google.com/search/docs/appearance/structured-data/sd-policies),
 guidelines for [choosing your site name](https://developers.google.com#choosing-site-name), and the following technical guidelines:

#### Technical guidelines

 
- Only one name per site: Currently, Google Search only supports one site name per site, where a site is defined
 by the domain or subdomain. Google Search does not support site names at the subdirectory level.
 Note that subdomain names starting with `www` or `m` are generally
 considered as being equivalent.
 

 Supported: `https://example.com` (this is a domain-level home page)
 

 Supported: `https://www.example.com` (this is also considered to be a domain-level home page)
 

 Supported: `https://m.example.com` (this is also considered to be a domain-level home page)
 

 Supported: `https://news.example.com` (this is a subdomain-level home page)
 

 Not supported: `https://example.com/news` (this is a subdirectory-level home page)
 

 
 
- Structured data must be on the home page of a site: The [`WebSite` structured data](https://developers.google.com#website) must be on the home page of
 the site. By home page, we mean the domain or subdomain level root URI. For example,
 `https://example.com` is the home page of the domain, while
 `https://example.com/de/index.html` isn't the home page.
 Note: If there's no structured data on the subdomain's home page,
 then the domain-level site name may be used for the subdomain as a fallback.
 
 
- The home page must be crawlable by Google: If we don't have access to the content on
 your home page because it is [blocked](https://developers.google.com/search/docs/crawling-indexing/control-what-you-share),
 we may not be able to generate a site name.
 
- For sites with duplicate home pages: If you have duplicate home pages for the same content (for example, HTTP and HTTPS versions
 of your home page, or www and non-www), make sure that you're using the same structured data
 on all page duplicates, not just on the canonical page.
 
- If you already have `WebSite` structured data on your site,
 make sure that you nest the site name properties in the same node. In other words, avoid
 creating an additional `WebSite` structured data block on your home page if you
 can help it.
 

### Add required site name properties

 Add the required properties to the home page of your website, in either JSON-LD, RDFa, or
 microdata format. You don't need to include this markup on every page of your site; you only
 need to add this markup to the home page of your site.

 
| Required properties |

 
| `name` | ` Text ` The name of the website. Make sure the name meets the guidelines for choosing your site name . |
 
| `url` | ` URL ` The URL of the home page of the site. Set this to the canonical home page of your site's domain or subdomain. For example, `https://example.com/` or `https://news.example.com/`. |

Here's an example of `WebSite` structured data that includes the required fields:

 
 
#### JSON-LD

 

```
<html>
  <head>
    <title>Example: A Site about Examples</title>
    <script type="application/ld+json">
    {
      "@context" : "https://schema.org",
      "@type" : "WebSite",
      "name" : "Example",
      "url" : "https://example.com/"
    }
  </script>
  </head>
  <body>
  </body>
</html>
```

 

 
 
#### Microdata

 

```
<html>
  <head>
    <title>Example: A Site about Examples</title>
  </head>
  <body>
  <div itemscope itemtype="https://schema.org/WebSite">
    <link itemprop="url" href="https://example.com" />
    <meta itemprop="name" content="Example"/>
  </div>
  </body>
</html>
```

 

 

### Add an alternative site name

If you want to provide an alternate version of your site name (for example, an acronym
or shorter name), you can do this by adding the `alternateName` property. This is optional.

 
 
 
| Recommended properties |
 
 
 
| `alternateName` | ` Text ` The alternate name of the website (for example, if there's a commonly recognized acronym or shorter name for your site), if applicable. Make sure the name meets the guidelines for choosing your site name . You can list more than one alternative name. Specify them in order of your preference, with the most important one listed first. For example: 
```
<script type="application/ld+json">
  {
    "@context": "https://schema.org",
    "@type": "WebSite",
    "name": "Burnt Toast",
    "alternateName": ["BT", "B-T", "Burnt Toast Shop"],
    "url": "https://www.example.com/"
  }
</script>
```
 |

Here's an example of `WebSite` structured data that includes all required and recommended fields:

 
 
#### JSON-LD

 

```
<html>
  <head>
    <title>Example: A Site about Examples</title>
    <script type="application/ld+json">
    {
      "@context" : "https://schema.org",
      "@type" : "WebSite",
      "name" : "Example Company",
      "alternateName" : "EC",
      "url" : "https://example.com/"
    }
  </script>
  </head>
  <body>
  </body>
</html>
```


 
#### Microdata

 

```
<html>
  <head>
    <title>Example: A Site about Examples</title>
  </head>
  <body>
  <div itemscope itemtype="https://schema.org/WebSite">
  <link itemprop="url" href="https://example.com" />
    <meta itemprop="name" content="Example Company"/>
    <meta itemprop="alternateName" content="EC"/>
  </div>
  </body>
</html>
```


### Test structured data

 
- Validate your markup with a schema testing tool (for example, [Schema Markup Validator](https://validator.schema.org/)) to make sure
 there are no syntax errors. Site names aren't supported in the Rich Results Test.
 
- 
 Use the [URL Inspection tool](https://support.google.com/webmasters/answer/9012289)
 to test how Google sees the page. Be sure that your home page is accessible to Google and not
 blocked by a robots.txt file, `noindex`, or login requirements.
 
 
- If the page looks okay, you
 can [ask Google to recrawl your URL](https://developers.google.com/search/docs/crawling-indexing/ask-google-to-recrawl).
 
 Allow time for re-crawling and re-indexing. Remember that it can take
 anywhere from a few days to a few weeks after publishing a page for Google to find and crawl
 it.
 
 

## What to do if your preferred site name isn't selected

 Our system generally tries to use a preferred site name from `WebSite` structured
 data, when indicated. However, if our system is less confident in a name you provided,
 it may sometimes generate site names using [other sources](https://developers.google.com#sources) or show a domain
 or subdomain name.

If your preferred site name is not selected by our automated system, try these steps:

 
- Verify the following:
 
 
- The site name that's in the [`WebSite` structured data](https://developers.google.com#website)
 on your home page is the preferred name for your site.
 
- Your `WebSite` structured data doesn't have
 [structured data errors](https://support.google.com/webmasters/answer/13300873).
 Use a schema testing tool (for example, [Schema Markup Validator](https://validator.schema.org/))
 to make sure that there are no syntax errors (the Rich Results Test doesn't
 support site names).
 
- Your structured data [follows our guidelines](https://developers.google.com#guidelines).
 
- Confirm that [other sources](https://developers.google.com#sources) on your home page also use the
 preferred name for your site.
 
- Confirm that you're not trying to set up a site name for a subdirectory. Site names
 aren't supported for subdirectories (for example, `https://example.com/news`
 is a subdirectory-level home page and cannot have its own site name). See our
 [technical guidance](https://developers.google.com#technical-guidelines) for more information.
 
 

 
 
- Make sure your redirects are working as intended and that Googlebot can access the redirect
 target. Then [request a recrawl of that page](https://developers.google.com/search/docs/crawling-indexing/ask-google-to-recrawl).
 If your page redirects to a page that's visible to Googlebot, the site name will reflect the redirect target.
 
 
- If you have multiple versions of your site (for example, HTTP and HTTPS), make sure that
 you're using the same site name consistently.
 
 
- If you've updated your site name structured data, allow time for Google to recrawl and
 process the new information. Remember that crawling can take anywhere from several days to
 several weeks, depending on how often our systems determine content needs to be refreshed.
 You can request a recrawl of a page by using the [URL Inspection tool](https://support.google.com/webmasters/answer/9012289#request_indexing).
 Not seeing your preferred site name for internal pages? If your home
 page is already showing your preferred site name, remember to also allow time for Google to recrawl
 and process your internal pages.
 
 

If you've followed the guidance and your preferred site name still isn't selected, consider one of these options:

 
- First, try providing an alternative name using the `alternateName` property.
 If our site name system isn't confident enough to use your preferred name, it strongly
 considers this option.
 
 
- Provide your domain or subdomain name as a backup option. To provide your domain
 or subdomain as a backup option, add your domain or subdomain name as your [alternative name](https://developers.google.com#alternative).
 Your domain or subdomain needs to be in all lowercase (for example, `example.com`
 not `Example.com`) for our system to detect this as a site name preference. Our
 system will strongly consider using it if your preferred name isn't selected. In this example,
 Burnt Toast is the most preferred option, followed by BT,
 and ending with the domain example.com as the final name preference:
 

```
<script type="application/ld+json">
  {
    "@context": "https://schema.org",
    "@type": "WebSite",
    "name": "Burnt Toast",
    "alternateName": ["BT", "B-T", "Burnt Toast Shop", "example.com"],
    "url": "https://www.example.com/"
  }
</script>
```

 
 
- If that's still not working, then try providing your domain or subdomain name (in all
 lowercase) as your [preferred name](https://developers.google.com#preferred-name), as a last-resort workaround
 option. If you provide your domain or subdomain name as your preferred name, our system
 will generally select that (but we recommend only doing this as a last resort). In this
 example, the only preference is the domain example.com:
 

```
<script type="application/ld+json">
  {
    "@context": "https://schema.org",
    "@type": "WebSite",
    "name": "example.com",
    "url": "https://www.example.com/"
  }
</script>
```

 

If you tried the [troubleshooting steps](https://developers.google.com#troubleshooting) and still find issues, post in the
 [Google Search Central Help Community](https://support.google.com/webmasters/thread/227739087).
 This will help us look for potential improvements to make in our system.

 
 
 
 

 
 
 

 
 
 
 
 
 
 
 
 

 
 
 
 Send feedback
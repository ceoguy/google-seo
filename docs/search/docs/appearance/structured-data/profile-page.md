---
source: https://developers.google.com/search/docs/appearance/structured-data/profile-page
title: "Profile Page (ProfilePage) Schema Markup"
fetched: 2026-07-08
---

# Profile page (`ProfilePage`) structured data

 

`ProfilePage` markup is designed for any site where creators (either people or
 organizations) share first-hand perspectives. Adding this markup helps Google Search understand
 the creators that post in an online community, and show better content from that community in
 search results, including the [Discussions and Forums](https://blog.google/products/search/google-search-discussions-forums-news/) feature.

Other structured data features can link to pages with `ProfilePage` markup too. For example,
 [Article](https://developers.google.com/search/docs/appearance/structured-data/article)
 and [Recipe](https://developers.google.com/search/docs/appearance/structured-data/recipe) structured data have authors,
 and there are often several authors present in [discussion forum](https://developers.google.com/search/docs/appearance/structured-data/discussion-forum)
 and [Q&A page](https://developers.google.com/search/docs/appearance/structured-data/qapage) structured data.

 
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

Here's an example of a profile page with markup:

 
 JSON-LD
 <html>
 <head>
 <title>Angelo Huff on Cool Forum Platform</title>
 <script type="application/ld+json">
 {
 "@context": "https://schema.org",
 "@type": "ProfilePage",
 "dateCreated": "2024-12-23T12:34:00-05:00",
 "dateModified": "2024-12-26T14:53:00-05:00",
 "mainEntity": {
 "@type": "Person",
 "name": "Angelo Huff",
 "alternateName": "ahuff23",
 "identifier": "123475623",
 "interactionStatistic": [{
 "@type": "InteractionCounter",
 "interactionType": "https://schema.org/FollowAction",
 "userInteractionCount": 1
 },{
 "@type": "InteractionCounter",
 "interactionType": "https://schema.org/LikeAction",
 "userInteractionCount": 5
 }],
 "agentInteractionStatistic": {
 "@type": "InteractionCounter",
 "interactionType": "https://schema.org/WriteAction",
 "userInteractionCount": 2346
 },
 "description": "Defender of Truth",
 "image": "https://example.com/avatars/ahuff23.jpg",
 "sameAs": [
 "https://www.example.com/real-angelo",
 "https://example.com/profile/therealangelohuff"
 ]
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
    <title>Angelo Huff on Cool Forum Platform</title>
    <script type="application/ld+json">
    {
      "@context": "https://schema.org",
      "@type": "ProfilePage",
      "dateCreated": "2024-12-23T12:34:00-05:00",
      "dateModified": "2024-12-26T14:53:00-05:00",
      "mainEntity": {
        "@type": "Person",
        "name": "Angelo Huff",
        "alternateName": "ahuff23",
        "identifier": "123475623",
        "interactionStatistic": [{
          "@type": "InteractionCounter",
          "interactionType": "https://schema.org/FollowAction",
          "userInteractionCount": 1
        },{
          "@type": "InteractionCounter",
          "interactionType": "https://schema.org/LikeAction",
          "userInteractionCount": 5
        }],
        "agentInteractionStatistic": {
          "@type": "InteractionCounter",
          "interactionType": "https://schema.org/WriteAction",
          "userInteractionCount": 2346
        },
        "description": "Defender of Truth",
        "image": "https://example.com/avatars/ahuff23.jpg",
        "sameAs": [
          "https://www.example.com/real-angelo",
          "https://example.com/profile/therealangelohuff"
        ]
      }
    }
    </script>
  </head>
  <body>
  </body>
</html>
```

 
 
 Microdata
 <html>
 <head>
 <title>Angelo Huff on Cool Forum Platform</title>
 </head>
 <body itemtype="https://schema.org/ProfilePage" itemscope>
 <meta itemprop="dateCreated" content="2024-12-23T12:34:00-05:00" />
 <meta itemprop="dateModified" content="2024-12-26T14:53:00-05:00" />
 <div itemprop="mainEntity" itemtype="https://schema.org/Person" itemscope>
 <div><span itemprop="alternateName" id="handle">ahuff23</span> (<span itemprop="name" id="real-name">Angelo Huff</span>)</div>
 <meta itemprop="identifier" content="123475623" />
 <div itemprop="description">Defender of Truth</div>
 <img itemprop="image" src="https://example.com/avatars/ahuff23.jpg" />
 <div>Links: <a itemprop="sameAs" href="https://www.therealangelohuff.com">Home Page</a><br>
 <a itemprop="sameAs" href="https://example.com/profile/therealangelohuff">Other Social Media Site</a></div>
 <div><span itemprop="interactionStatistic" itemtype="https://schema.org/InteractionCounter" itemscope>
 <span itemprop="userInteractionCount">5</span>
 <span itemprop="interactionType" content="https://schema.org/LikeAction">likes</span>
 </span>,
 <span itemprop="interactionStatistic" itemtype="https://schema.org/InteractionCounter" itemscope>
 <span itemprop="userInteractionCount">1</span>
 <span itemprop="interactionType" content="https://schema.org/FollowAction">follower</span>
 </span>, and
 <span itemprop="agentInteractionStatistic" itemtype="https://schema.org/InteractionCounter" itemscope>
 <span itemprop="userInteractionCount">2346</span>
 <span itemprop="interactionType" content="https://schema.org/WriteAction">posts</span>
 </span>
 </div>
 </div>
 </body>
</html>
 

 

```
<html>
  <head>
    <title>Angelo Huff on Cool Forum Platform</title>
  </head>
  <body itemtype="https://schema.org/ProfilePage" itemscope>
    <meta itemprop="dateCreated" content="2024-12-23T12:34:00-05:00" />
  	<meta itemprop="dateModified" content="2024-12-26T14:53:00-05:00" />
    <div itemprop="mainEntity" itemtype="https://schema.org/Person" itemscope>
      <div><span itemprop="alternateName" id="handle">ahuff23</span> (<span itemprop="name" id="real-name">Angelo Huff</span>)</div>
      <meta itemprop="identifier" content="123475623" />
      <div itemprop="description">Defender of Truth</div>
      <img itemprop="image" src="https://example.com/avatars/ahuff23.jpg" />
      <div>Links: <a itemprop="sameAs" href="https://www.therealangelohuff.com">Home Page</a><br>
                  <a itemprop="sameAs" href="https://example.com/profile/therealangelohuff">Other Social Media Site</a></div>
      <div><span itemprop="interactionStatistic" itemtype="https://schema.org/InteractionCounter" itemscope>
              <span itemprop="userInteractionCount">5</span>
              <span itemprop="interactionType" content="https://schema.org/LikeAction">likes</span>
           </span>,
           <span itemprop="interactionStatistic" itemtype="https://schema.org/InteractionCounter" itemscope>
              <span itemprop="userInteractionCount">1</span>
              <span itemprop="interactionType" content="https://schema.org/FollowAction">follower</span>
           </span>, and
           <span itemprop="agentInteractionStatistic" itemtype="https://schema.org/InteractionCounter" itemscope>
              <span itemprop="userInteractionCount">2346</span>
              <span itemprop="interactionType" content="https://schema.org/WriteAction">posts</span>
           </span>
       </div>
    </div>
  </body>
</html>
```

 

## Guidelines

For your profile page structured data to be eligible for usage in Google Search, you must follow these
 guidelines:

 
- [General structured data guidelines](https://developers.google.com/search/docs/appearance/structured-data/sd-policies) 
 
- [Search Essentials](https://developers.google.com/search/docs/essentials) 
 
- [Content Guidelines](https://developers.google.com#content-guidelines) 
 
- [Technical Guidelines](https://developers.google.com#technical-guidelines) 

### Content guidelines

 
- The primary focus of the page must be a single person or organization that is
 affiliated with the overall website. Here are some examples of profile pages:
 

 Valid use cases:

 
 
- A user profile page on a forum or social media site
 
- An author page on a news site
 
- An "About Me" page on a blog site
 
- An employee page on a company website
 

 Invalid use cases:

 
 
- The main home page of a store (usually contains lots of non-profile info)
 
- An organization review site (the organization isn't associated with the website)
 

 

### Technical guidelines

 If the profile page also includes the creator's recent activity, you can include markup
 using URLs on those objects to reference the page with the full content and markup. For
 example, this is one possible markup structure:


```
{
  "@context": "https://schema.org",
  "@type": "ProfilePage",
  "mainEntity": {
    "@id": "#main-author",
    "@type": "Person",
    "name": "Marlo Smith"
  },
  "hasPart": [{
    "@type": "Article",
    "headline": "Things to see in NJ",
    "url": "https://example.com/things-to-see-nj",
    "datePublished": "2014-02-23T18:34:00Z",
    "author": { "@id": "#main-author" }
  }]
}
```


## Structured data type definitions

You must include the required properties for your structured data to be eligible for display in search
 results. You can also include the recommended properties to add more information about your profile pages,
 which could provide a better user experience.

### `ProfilePage`

The full definition of `ProfilePage` is available at
 [schema.org/ProfilePage](https://schema.org/ProfilePage).

 
 
| Required properties |
 
 
 
| `mainEntity` | ` Person ` or ` Organization ` The person or organization that this profile page is about. This indicates that the primary focus of this page is information about this entity. Try to use the correct type if that information is available (meaning, if you know whether the page represents an individual or an organization); otherwise, default to `Person` (for example, if it's an unknown type of account). |
 

 
 
 
| Recommended properties |
 
 
 
| `dateCreated` | ` DateTime ` The date and time that the profile was created, if applicable, in ISO 8601 date format. |
 
| `dateModified` | ` DateTime ` The date and time that information in the profile was modified, if applicable, in ISO 8601 date format. Ideally, this only represents human-edited metadata changes to the profile (for example, adding extra outlinks to places this profile is referenced wouldn't be a modification). |
 
 

### `Person` or `Organization`

Both [schema.org/Person](https://schema.org/Person)
 and [schema.org/Organization](https://schema.org/Organization)
 share common properties that are used by Google.

 
 
| Required properties |
 
 
| `name` | ` Text ` The primary way the person or organization is identified. We recommend using this field for real names (and `alternateName` for social media handles). However, you can use this field to specify a social media handle if that's the only way the person is identified on your site. If the `name` property isn't available, you can provide the `alternateName` property to fulfill this requirement. |
 

 
 
 
| Recommended properties |
 
 
 
| `agentInteractionStatistic` | ` InteractionCounter ` User statistics about the profile page entity's own behavior, if applicable. Google recognizes the following `interactionTypes`: https://schema.org/FollowAction : The number of other accounts being followed. https://schema.org/LikeAction : The number of likes (generally of other entity's posts). https://schema.org/WriteAction : The number of posts. https://schema.org/ShareAction : The number of reshares of posts. |
 
| `alternateName` | ` Text ` An alternate public identifier, if applicable. For example, a social media handle if a person's real name is used in the `name` field. |
 
| `description` | ` Text ` The user's byline or applicable credential, if applicable. |
 
| `identifier` | ` Text ` Any unique identifier that's used within your site, if applicable. This could be an internal database ID that your site uses to identify a user even if their social media handle changes. |
 
| `image` | ` URL ` or ` ImageObject ` The URL or `ImageObject` of a profile image of the creator, if applicable. If there are no images, don't include a default image, icon, or placeholder image in this field. Additional image guidelines: Image URLs must be crawlable and indexable. To check if Google can access your URLs, use the URL Inspection tool . Images must represent the marked up content. Images must be in a file format that's supported by Google Images . For best results, we recommend providing multiple high-resolution images (minimum of 50K pixels when multiplying width and height) with the following aspect ratios: 16x9, 4x3, and 1x1. For example: 
```
"image": [
  "https://example.com/photos/1x1/photo.jpg",
  "https://example.com/photos/4x3/photo.jpg",
  "https://example.com/photos/16x9/photo.jpg"
]
```
 |
 
| `interactionStatistic` | ` InteractionCounter ` User statistics applied to the profile page entity, if applicable. Only include stats about the platform that the profile page is hosted on (don't reference that the creator also has 100,000 followers on their home page). Google recognizes the following `interactionTypes`: https://schema.org/FollowAction : The number of followers. https://schema.org/LikeAction : The number of likes of this entity. https://schema.org/BefriendAction : A bi-directional relationship. |
 
| `sameAs` | ` URL ` The URL to other external profiles or home pages for the profile, if applicable. |
 

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
---
source: https://developers.google.com/search/docs/specialty/explicit/troubleshooting
title: "My Site is Incorrectly Flagged as Explicit in Google Search"
fetched: 2026-07-08
---

# What to do if your site is incorrectly flagged as explicit in Google Search results

 

 Many users prefer not to have explicit content (such as sexually explicit and graphic violent
 content) shown in their search results, and Google's [SafeSearch settings](https://support.google.com/websearch/answer/510)
 provide users with the ability to filter explicit content. However, sometimes our systems
 may flag other content as explicit (for example, content that's more nuanced or subtly suggestive
 in nature, such as: lingerie websites, sex education sites, massage sites, racy content), which
 means this content may be incorrectly filtered by SafeSearch. This guide explains how to figure
 out if your site is being incorrectly flagged as explicit in Google Search results, and how to
 resolve common mistakes.

## Determine if SafeSearch is filtering your website

 First, check whether SafeSearch is filtering a few pages or your entire website, so you can better
 understand how the issue is manifesting and how to resolve it moving forward:

 
- Check a particular page. To determine if a specific page on your site is being identified as
 explicit:
 
 
- [Confirm that SafeSearch is set to Off](https://support.google.com/websearch/answer/510).
 
- Search for a term where you can find that page in search results.
 
- [Set SafeSearch to Filter](https://support.google.com/websearch/answer/510).
 If you don't see your page in the results anymore, it is likely being affected by SafeSearch
 filtering on this query.
 
 

 
 
- Check your site as a whole: To determine if your entire site is being identified as
 explicit, use the [`site:` search operator](https://developers.google.com/search/docs/monitor-debug/search-operators/all-search-site)
 to find your site in search results, then set SafeSearch to Filter. If you don't see your site
 anymore, then Google is filtering your site when SafeSearch is enabled.
 
 
- Make changes on your site, as applicable: Once you have a better idea of how the issue
 is manifesting, check the list of [common mistakes](https://developers.google.com#common-mistakes)
 and resolve the applicable issues.
 
 
- Request a review: If you applied fixes, wait at least 2-3 months before
 [requesting a review](https://support.google.com/webmasters/contact/safesearch_review),
 as it can take up to 2-3 months for our classifiers to re-process your content. If your site has
 always [followed the guidance for optimizing your site](https://developers.google.com/search/docs/specialty/explicit/guidelines), you may
 request a review immediately.
 SafeSearch relies on automated systems, and we only overturn automatic
 decisions for cases where your site has clearly been incorrectly categorized by SafeSearch.
 

## Resolve common mistakes

 Here are the most common mistakes that can cause sites to be incorrectly flagged as explicit:

 
 
 
 Common mistakes
 | 
 

 
 
 
### Adding the adult rating `meta` tag to content that's
 not sexually explicit

 | 
 
 
 Sometimes site owners apply the adult rating `meta` tag to pages that aren't sexually
 explicit. SafeSearch filters out all pages that use the adult rating `meta` tag, regardless of
 their content.
 

 
 To fix, remove the [adult rating `meta` tag](https://developers.google.com/search/docs/crawling-indexing/special-tags#rating)
 from pages that are not sexually explicit (the [adult rating `meta` tag](https://developers.google.com/search/docs/crawling-indexing/special-tags#meta-tags)
 should only be used on pages that are sexually explicit).
 

 | 
 

 
 
### Labeling videos that aren't explicit as not `family_friendly` in your video sitemap

 | 
 
 
 Sometimes site owners apply the [`<video:family_friendly>` tag](https://developers.google.com/search/docs/crawling-indexing/sitemaps/video-sitemaps#family-friendly)
 too broadly, and SafeSearch filters out all pages that are not `family_friendly`,
 regardless of their content.
 

 
 To fix, only apply the family friendly tag with a value of `no` if your content is
 sexually explicit or contains graphic violence.
 

 | 
 

 
 
### Allowing all UGC comments without content moderation

 | 
 
 
 Be aware that your site might be deemed explicit if you allow users to write or upload
 explicit content with insufficient content moderation.
 

 
 To fix, we recommend implementing measures to [prevent spammy UGC comments](https://developers.google.com/search/docs/monitor-debug/prevent-abuse)
 and other content moderation best practices.
 

 | 
 

 
 
### Restricting Googlebot with an age gate
 | 
 
 If you have an age gate and don't allow Googlebot to crawl without triggering that age
 gate, our systems might determine that your entire site seems explicit in nature and
 filter the entire site from search results, even if some pages might not be explicit.
 

 
 To fix, be sure to [allow Googlebot to crawl without an age gate](https://developers.google.com/search/docs/specialty/explicit/guidelines#allow-googlebot-to-crawl)
 restriction, follow [our guidelines for mandatory interstitials](https://developers.google.com/search/docs/appearance/avoid-intrusive-interstitials#mandatory-interstitials),
 and confirm that Googlebot is able to crawl without triggering any age gate by using the
 [Live URL test](https://support.google.com/webmasters/answer/9012289#test_live_page)
 in Search Console.
 

 | 
 

 
 
### Not separating explicit pages from non-explicit pages

 | 
 
 
 If you have a large amount of sexually explicit content and don't group those pages on a
 separate domain or subdomain, our systems might determine that your entire site seems explicit.
 

 
 To fix, we recommend [grouping explicit pages in a separate domain or subdomain](https://developers.google.com/search/docs/specialty/explicit/guidelines#group-explicit-pages).
 

 | 
 

 

## Troubleshooting

 If you've made changes and still find that your website is being incorrectly flagged as explicit,
 consider the following:

 
- If you recently made the changes, our classifiers may need more time to process them. It can
 take up to 2-3 months.
 
- Understand that if your website contains a significant amount of nudity or sexually explicit
 content (including computer generated), as well as graphic violence, the whole site may be
 classified as explicit and therefore won't display under the SafeSearch filter.
 
- If you're blurring explicit images on a page, the page may still be deemed explicit if the
 images can be unblurred or if it leads to an unblurred image.
 
- Note that explicit pages aren't eligible for some search features, such as rich results,
 featured snippets, or video previews, regardless of whether the SafeSearch filter is used. Learn
 more about [Search feature policies](https://support.google.com/websearch/answer/10622781#features_policies).
 

 
 
 
 

 
 
 

 
 
 
 
 
 
 
 
 

 
 
 
 Send feedback
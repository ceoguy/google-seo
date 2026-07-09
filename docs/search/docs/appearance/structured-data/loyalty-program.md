---
source: https://developers.google.com/search/docs/appearance/structured-data/loyalty-program
title: "Loyalty Program Structured Data (MemberProgram)"
fetched: 2026-07-08
---

# Loyalty program (`MemberProgram`) structured data

 

 Many merchants have loyalty programs that offer members special benefits, such as special prices and
 loyalty points. When you add `MemberProgram` structured data to your site, Google Search can
 use this information to display loyalty benefits with your products and knowledge panels in Search results.

 The loyalty programs that you offer for your business can be specified using
 the `MemberProgram` structured data type nested under the `Organization`
 structured data type.
 To specify the loyalty benefits (such as loyalty prices and points earned) for your individual products, separately
 add `UnitPriceSpecification` markup under your `Offer` structured data markup as described under
 [merchant listings](https://developers.google.com/search/docs/appearance/structured-data/merchant-listing#unit-price-specification-properties).

## Feature availability

 Loyalty program information is available in Google Search results in Australia, Brazil, Canada,
 France, Germany, Mexico, the UK, and the US, on both desktop and mobile.

 
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

 Here's an example of a `MemberProgram` structured data markup for a loyalty program with two membership tiers.

<html>
 <head>
 <title>About Us</title>
 <script type="application/ld+json">
 {
 "@context": "https://schema.org",
 "@type": "OnlineStore",
 "hasMemberProgram": {
 "@type": "MemberProgram",
 "name": "Membership Plus",
 "description": "For frequent shoppers this is our top-rated loyalty program",
 "url": "https://www.example.com/membership-plus",
 "hasTiers": [
 {
 "@type": "MemberProgramTier",
 "@id": "#plus-tier-silver",
 "name": "silver",
 "url": "https://www.example.com/membership-plus-silver",
 "hasTierBenefit": [
 "https://schema.org/TierBenefitLoyaltyPoints"
 ],
 "membershipPointsEarned": 5
 },
 {
 "@type": "MemberProgramTier",
 "@id": "#plus-tier-gold",
 "name": "gold",
 "url": "https://www.example.com/membership-plus-gold",
 "hasTierRequirement":
 {
 "@type": "CreditCard",
 "name": "Example platinum card plus"
 },
 "hasTierBenefit": [
 "https://schema.org/TierBenefitLoyaltyPrice",
 "https://schema.org/TierBenefitLoyaltyPoints"
 ],
 "membershipPointsEarned": 10
 }
 ]
 }
 // Other Organization-level properties
 // ...
 }
 </script>
 </head>
 <body>
 </body>
</html>

```
<html>
 <head>
 <title>About Us</title>
 <script type="application/ld+json">
 {
 "@context": "https://schema.org",
 "@type": "OnlineStore",
 "hasMemberProgram": {
 "@type": "MemberProgram",
 "name": "Membership Plus",
 "description": "For frequent shoppers this is our top-rated loyalty program",
 "url": "https://www.example.com/membership-plus",
 "hasTiers": [
 {
 "@type": "MemberProgramTier",
 "@id": "#plus-tier-silver",
 "name": "silver",
 "url": "https://www.example.com/membership-plus-silver",
 "hasTierBenefit": [
 "https://schema.org/TierBenefitLoyaltyPoints"
 ],
 "membershipPointsEarned": 5
 },
 {
 "@type": "MemberProgramTier",
 "@id": "#plus-tier-gold",
 "name": "gold",
 "url": "https://www.example.com/membership-plus-gold",
 "hasTierRequirement":
 {
 "@type": "CreditCard",
 "name": "Example platinum card plus"
 },
 "hasTierBenefit": [
 "https://schema.org/TierBenefitLoyaltyPrice",
 "https://schema.org/TierBenefitLoyaltyPoints"
 ],
 "membershipPointsEarned": 10
 }
 ]
 }
 // Other Organization-level properties
 // ...
 }
 </script>
 </head>
 <body>
 </body>
</html>
```

## Guidelines

For your loyalty program markup to be eligible for usage in Google Search, you must follow
 these guidelines:

 
- [General structured data guidelines](https://developers.google.com/search/docs/appearance/structured-data/sd-policies)
 
- [Search Essentials](https://developers.google.com/search/docs/essentials)
 
- [Technical guidelines](https://developers.google.com#technical-guidelines)

### Technical guidelines

- 
 Nest the `MemberProgram` markup under the `Organization` type on the page where you
 specify the administrative details and policies of your business.
 Refer to the [Organization markup](https://developers.google.com/search/docs/appearance/structured-data/organization) documentation for more information.

- 
 To specify the loyalty benefits (such as loyalty prices and points earned) for your individual products,
 add the `UnitPriceSpecification` markup defined for
 [merchant listings](https://developers.google.com/search/docs/appearance/structured-data/merchant-listing#unit-price-specification-properties).
 The `MemberProgram` markup you define for your business works together with
 `validForMemberTier` and `MembershipPointsEarned` structured data to define
 the loyalty benefits for your customers when buying your products.

## Structured data type definitions

You must include the required properties for your structured data to be eligible for usage in
 Google Search. You can also include the recommended properties to add more information about your
 loyalty programs, which could provide a better user experience.

 
### `MemberProgram`

 Use the following properties to describe one or more loyalty programs and one or more
 tiers per loyalty program for your business.The full definition of `MemberProgram` is
 available at [schema.org/MemberProgram](https://schema.org/MemberProgram).
 

 
 
 Required properties | 

 
 
 `description` | 
 
 `[Text](https://schema.org/Text)`

 The description of the loyalty program, describing the primary benefits for members.

 | 
 

 
 `hasTiers` | 
 
 Repeated `[MemberProgramTier](https://schema.org/MemberProgramTier)`

 Defines a tier under a loyalty program. A loyalty program must have at least one tier.
 See the list of [`MemberProgramTier` properties](https://developers.google.com#memberprogram-tier-properties)
 supported by Google.

 | 
 

 
 `name` | 
 
 `[Text](https://schema.org/Text)`

 The name of the loyalty program.

 | 
 

 
 

 
 
 Recommended properties | 

 
 
 `url` | 
 
 `[URL](https://schema.org/URL)`

 A URL of the web page where a shopper can sign up for this loyalty program.
 Don't provide multiple URLs. If not provided, the URL of the page
 containing the `MemberProgram` structured data will be assumed.

 | 
 

 
 

 
#### `MemberProgramTier`

 
 `MemberProgramTier` is used to define a tier under a `MemberProgram`.
 A loyalty program can have multiple tiers. For example, bronze, silver, and gold.
 

 
 The full definition of `MemberProgramTier` is available at
 [schema.org/MemberProgramTier](https://schema.org/MemberProgramTier).
 

 
 
 Required properties | 

 
 
 `hasTierBenefit` | 
 
 Repeated `[TierBenefitEnumeration](https://schema.org/TierBenefitEnumeration)`

 Benefit for members of this member tier. A member tier can have multiple benefits. The short names without the URL prefix
 are also supported (for example `TierBenefitLoyaltyPoints`).

 
 
- `https://schema.org/TierBenefitLoyaltyPoints`: The benefit is earning loyalty points. Also specify `membershipPointsEarned`.
 
- `https://schema.org/TierBenefitLoyaltyPrice`: The benefit is a member's only price.
 

 | 
 

 
 `name` | 
 
 `[Text](https://schema.org/Text)`

 The name of the membership tier.

 | 
 

 
 

 
 
 Recommended properties | 

 
 `hasTierRequirement` | 
 
 
 `[CreditCard](https://schema.org/CreditCard)`, or
 `[MonetaryAmount](https://schema.org/MonetaryAmount)`, or
 `[UnitPriceSpecification](https://schema.org/UnitPriceSpecification)`, or
 `[Text](https://schema.org/Text)`
 

 The requirement to join a member tier. If not specified, anyone can join the tier for free. For a non-free tier, specify
 a value of the type representing the requirement to join the tier.
 

 
 
- `https://schema.org/CreditCard`: Specify the credit card that the user needs to sign up for to join the tier.
 For example:

```
 "hasTierRequirement": {
 "@type": "CreditCard",
 "name": "Capital Two cashback rewards platinum card"
 }
```

 
 
- `https://schema.org/MonetaryAmount`: Specify the minimum amount of spending required to join the tier.
 For example, for a $250 minimum spending, specify:

```
 "hasTierRequirement": {
 "@type": "MonetaryAmount",
 "value": 250,
 "currency": "USD"
 }
```

 
 
- `https://schema.org/UnitPriceSpecification`: Specify the periodic fee a consumer needs to pay for membership in the tier.
 For example, for a 12 month membership, billed once a month at 9.99€, specify:

```
 "hasTierRequirement": {
 "@type": "UnitPriceSpecification",
 "price": 9.99,
 "priceCurrency": "EUR",
 "billingDuration": 12,
 "billingIncrement": 1,
 "unitCode": "MON"
 }
```

 
 
- `https://schema.org/Text`: Describe any other requirement to join the tier. For example:

```
"hasTierRequirement": "Purchase a share in our coop and volunteer a minimum of 1 day a month to keep operating costs low."
```

 
 

 | 
 

 
 `membershipPointsEarned` | 
 
 `[QuantitativeValue](https://schema.org/membershipPointsEarned)`

 The number of loyalty points earned by the consumer per currency unit spent when `hasTierBenefit` is equal to `https://schema.org/TierBenefitLoyaltyPoints`.
 

 | 
 

 
 `url` | 
 
 `[URL](https://schema.org/URL)`

 A URL of the web page where a shopper can sign up for this specific member tier.
 Don't provide multiple URLs.

 | 
 

 

 
## Using Merchant Center to configure loyalty programs with Google

 
 Loyalty programs can be difficult to configure and keep up-to-date with markup. If you have a
 Google Merchant Center account, you can alternatively consider configuring your loyalty
 program directly in Google Merchant Center instead of using markup. Refer to the
 [Merchant help center article about loyalty program](https://support.google.com/merchants/answer/12827255)
 for more information.
 

 
 If you provide both markup and Merchant Center loyalty programs, Google will use the Merchant
 Center settings.
 

 
 
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
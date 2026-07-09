---
source: https://developers.google.com/search/docs/appearance/structured-data/return-policy
title: "Merchant Return Policy Structured Data (MerchantReturnPolicy)"
fetched: 2026-07-08
---

# Merchant return policy (`MerchantReturnPolicy`) structured data

 

 Many merchants have return policies that outline the process of returning purchased products for customers.
 When you add `MerchantReturnPolicy` structured data to your site, Google Search can use this information to
 display return policies alongside your products and in knowledge panels in Search results.
 `MerchantReturnPolicy` lets you specify a link to your return policy page, or details such as the
 conditions under which customers can return the product, return methods, return fees, refund options, and more.

 A standard return policy for your business that applies to most or all products you sell can be specified using
 the `MerchantReturnPolicy` structured data type nested under the `Organization`
 structured data type using the `hasMerchantReturnPolicy` property.

 If you need to override your standard return policy for a specific product, specify
 one or more instances of `MerchantReturnPolicy` under the `Offer` type. For
 more information on return policies for individual products, refer to the
 [Merchant listing](https://developers.google.com/search/docs/appearance/structured-data/merchant-listing#merchant-return-policy-properties) documentation.
 Return policies for individual products specified under `Offer` support
 a more limited set of properties than those described here.

 
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

Here's an example of a complete `OnlineStore` markup with a return policy for products sold to
 customers in Germany, Austria, and Switzerland, and which need to be returned by mail to Ireland.
 There is a 60-day return window, with free returns, and full refunds. Only new products can be returned.


```
{
    "@context": "https://schema.org",
    "@type": "OnlineStore",
    "name": "Example Online Store",
    "url": "https://www.example.com",
    "sameAs": ["https://example.net/profile/example12", "https://example.org/@example34"],
    "logo": "https://www.example.com/assets/images/logo.png",
    "contactPoint": {
      "contactType": "Customer Service",
      "email": "support@example.com",
      "telephone": "+47-99-999-9900"
    },
    "vatID": "FR12345678901",
    "iso6523Code": "0199:724500PMK2A2M1SQQ228",
    
    "hasMerchantReturnPolicy": {
      "@type": "MerchantReturnPolicy",
      "applicableCountry": [ "DE", "AT", "CH"],
      "returnPolicyCountry": "IE",
      "returnPolicyCategory": "https://schema.org/MerchantReturnFiniteReturnWindow",
      "merchantReturnDays": 60,
      "itemCondition": "https://schema.org/NewCondition",
      "returnMethod": "https://schema.org/ReturnByMail",
      "returnFees": "https://schema.org/FreeReturn",
      "refundType": "https://schema.org/FullRefund",
      "returnLabelSource": "https://schema.org/ReturnLabelCustomerResponsibility"
    }
    
  }
```


Here's an example of a complete `MerchantReturnPolicy` structured data markup including
 return options for customer remorse or defect items as well as a seasonal override limiting the
 return window to 30 days.

<html>
 <head>
 <title>Our return policy</title>
 <script type="application/ld+json">
 {
 "@context": "https://schema.org",
 "@type": "OnlineStore",
 "hasMerchantReturnPolicy": {
 "@type": "MerchantReturnPolicy",
 "applicableCountry": [ "DE", "AT", "CH"],
 "returnPolicyCountry": "IE",
 "returnPolicyCategory": "https://schema.org/MerchantReturnFiniteReturnWindow",
 "merchantReturnDays": 60,
 "itemCondition": [ "https://schema.org/NewCondition", "https://schema.org/DamagedCondition" ],
 "returnMethod": "https://schema.org/ReturnByMail",
 "returnFees": "https://schema.org/ReturnShippingFees",
 "refundType": "https://schema.org/FullRefund",
 "returnShippingFeesAmount": {
 "@type": "MonetaryAmount",
 "value": 2.99,
 "currency": "EUR"
 },
 "returnLabelSource": "https://schema.org/ReturnLabelInBox",
 "customerRemorseReturnFees": "https://schema.org/ReturnShippingFees",
 "customerRemorseReturnShippingFeesAmount": {
 "@type": "MonetaryAmount",
 "value": 5.99,
 "currency": "EUR"
 },
 "customerRemorseReturnLabelSource": "https://schema.org/ReturnLabelDownloadAndPrint",
 "itemDefectReturnFees": "https://schema.org/FreeReturn",
 "itemDefectReturnLabelSource": "https://schema.org/ReturnLabelInBox",
 "returnPolicySeasonalOverride": {
 "@type": "MerchantReturnPolicySeasonalOverride",
 "returnPolicyCategory": "https://schema.org/MerchantReturnFiniteReturnWindow",
 "startDate": "2025-12-01",
 "endDate": "2025-01-05",
 "merchantReturnDays": 30
 }
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
    <title>Our return policy</title>
    <script type="application/ld+json">
      {
        "@context": "https://schema.org",
        "@type": "OnlineStore",
        "hasMerchantReturnPolicy": {
          "@type": "MerchantReturnPolicy",
          "applicableCountry": [ "DE", "AT", "CH"],
          "returnPolicyCountry": "IE",
          "returnPolicyCategory": "https://schema.org/MerchantReturnFiniteReturnWindow",
          "merchantReturnDays": 60,
          "itemCondition": [ "https://schema.org/NewCondition", "https://schema.org/DamagedCondition" ],
          "returnMethod": "https://schema.org/ReturnByMail",
          "returnFees": "https://schema.org/ReturnShippingFees",
          "refundType": "https://schema.org/FullRefund",
          "returnShippingFeesAmount": {
            "@type": "MonetaryAmount",
            "value": 2.99,
            "currency": "EUR"
          },
          "returnLabelSource": "https://schema.org/ReturnLabelInBox",
          "customerRemorseReturnFees": "https://schema.org/ReturnShippingFees",
          "customerRemorseReturnShippingFeesAmount": {
            "@type": "MonetaryAmount",
            "value": 5.99,
            "currency": "EUR"
          },
          "customerRemorseReturnLabelSource": "https://schema.org/ReturnLabelDownloadAndPrint",
          "itemDefectReturnFees": "https://schema.org/FreeReturn",
          "itemDefectReturnLabelSource": "https://schema.org/ReturnLabelInBox",
          "returnPolicySeasonalOverride": {
            "@type": "MerchantReturnPolicySeasonalOverride",
            "returnPolicyCategory": "https://schema.org/MerchantReturnFiniteReturnWindow",
            "startDate": "2025-12-01",
            "endDate": "2025-01-05",
            "merchantReturnDays": 30
          }
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

For your return policy markup to be eligible for usage in Google Search, you must follow
 these guidelines:

 
- [General structured data guidelines](https://developers.google.com/search/docs/appearance/structured-data/sd-policies)
 
- [Search Essentials](https://developers.google.com/search/docs/essentials)
 
- [Technical guidelines](https://developers.google.com#technical-guidelines)

### Technical guidelines

- 
 We recommend placing return information on a single page on your site that describes the
 return policy of your business. You don't need to include it on every page of your site. Include the `MerchantReturnPolicy` structured data type
 under the `Organization` structured data type. Refer also to the [Organization markup](https://developers.google.com/search/docs/appearance/structured-data/organization) for more information.

- 
 If you have a non-standard return policy for a specific product, specify the `MerchantReturnPolicy` structured data type under
 the `Offer` structured data type. Note that the properties supported for offer-level
 return policies are a subset of the properties supported for organization-level return policies.
 See [merchant listing markup](https://developers.google.com/search/docs/appearance/structured-data/merchant-listing) for the subset of properties that are supported for product-level return policies.

## Structured data type definitions

You must include the required properties for your structured data to be eligible for usage in
 Google Search. You can also include the recommended properties to add more information about your
 return policies, which could provide a better user experience.

 
### `MerchantReturnPolicy` (nested under `Organization`
 using the `hasMerchantReturnPolicy` property)

 Use the following properties to describe the standard return policies for your business.
 
 
 
| Required properties (choose the option that best suits your use case) |
 
 
| Option A |
 
| `applicableCountry` | ` Text ` The country code that the return policy applies to (where the product is sold and will be returned from). Use the two-letter ISO 3166-1 alpha-2 country code formatting. You can specify up to 50 countries. |
 
| `returnPolicyCategory` | ` MerchantReturnEnumeration ` The type of return policy. Use one of the following values: `https://schema.org/MerchantReturnFiniteReturnWindow`: There's a set number of days to return a product. `https://schema.org/MerchantReturnNotPermitted`: Returns aren't permitted. `https://schema.org/MerchantReturnUnlimitedWindow`: There's an unlimited amount of time to return a product. If you use `MerchantReturnFiniteReturnWindow`, then the `merchantReturnDays` property is required. |
 
| Option B |
 
| `merchantReturnLink` | ` URL ` Specify the URL of a web page that describes the return policy to your customers. This can be your own return policy, or a third-party policy from a service that handles your returns. |
 
 

 
#### Finite or unlimited return windows

 The following properties are recommended when [`returnPolicyCategory`](https://developers.google.com#return-policy-category) is
 set to `MerchantReturnFiniteReturnWindow` or `MerchantReturnUnlimitedWindow`.

 
 
 
| Recommended properties |
 
 
| `merchantReturnDays` | ` Integer ` The number of days from the delivery date that a product can be returned. This property is only required if `returnPolicyCategory` equals `MerchantReturnFiniteReturnWindow`. |
 
| `returnFees` | ` ReturnFeesEnumeration ` The default type of return fee. Use one of the following supported values: `https://schema.org/FreeReturn`: There's no charge to the consumer to return the product. If used, don't include the `returnShippingFeesAmount` property. `https://schema.org/ReturnFeesCustomerResponsibility`: The consumer needs to handle and pay for the return shipping themselves. If used, don't include the `returnShippingFeesAmount` property. `https://schema.org/ReturnShippingFees`: There's a shipping fee charged by the merchant to the consumer to return the product. Specify the (non-zero) shipping fee using the `returnShippingFeesAmount` property. |
 
| `returnMethod` | ` ReturnMethodEnumeration ` The type of return method offered. Use one or more of the following values: `https://schema.org/ReturnAtKiosk`: The item can be returned at a kiosk. `https://schema.org/ReturnByMail`: The item can be returned by mail. `https://schema.org/ReturnInStore`: The item can be returned in store. |
 
| `returnShippingFeesAmount` | ` MonetaryAmount ` The cost of shipping for returning a product. This property must be specified only when `returnFees` equals `https://schema.org/ReturnShippingFees`. |
 
 

 
#### Finite or unlimited return windows

 The following properties are additionally recommended if
 [`returnPolicyCategory`](https://developers.google.com#return-policy-category) is
 set to `MerchantReturnFiniteReturnWindow` or `MerchantReturnUnlimitedWindow`.

 
 
 
| Recommended properties |
 
 
| `customerRemorseReturnFees` | ` ReturnFeesEnumeration ` A specific type of return fee if the product is returned due to customer remorse. See `returnFees` for possible values. |
 
| `customerRemorseReturnLabelSource` | ` ReturnLabelSourceEnumeration ` The method by which the consumer obtains a return shipping label for a product. See `returnLabelSource` for possible values. |
 
| `customerRemorseReturnShippingFeesAmount` | ` MonetaryAmount ` The cost of shipping for returning a product due to customer remorse. This property is only required if there's a non-zero shipping fee to be paid by the consumer to return a product. See `returnShippingFeesAmount` for details. |
 
| `itemCondition` | ` OfferItemCondition ` The acceptable conditions of an item which can be returned. You can provide multiple conditions which are accepted. Use the following values: `https://schema.org/DamagedCondition`: Damaged items are accepted. `https://schema.org/NewCondition`: New items are accepted. `https://schema.org/RefurbishedCondition`: Refurbished items are accepted. `https://schema.org/UsedCondition`: Used items are accepted. |
 
| `itemDefectReturnFees` | ` ReturnFeesEnumeration ` A specific type of return fee for defect products. See `returnFees` for possible values. |
 
| `itemDefectReturnLabelSource` | ` ReturnLabelSourceEnumeration ` The method by which the consumer can obtain a return shipping label for a product. See `returnLabelSource` for possible values. |
 
| `itemDefectReturnShippingFeesAmount` | ` MonetaryAmount ` The cost of shipping for returning a product due to defect products. This property is only required if there's a non-zero shipping fee to be paid by the consumer to return a product. See `returnShippingFeesAmount` for details. |
 
| `refundType` | ` RefundType ` The type of refund(s) available for the consumer when returning a product. `https://schema.org/ExchangeRefund`: The item can be exchanged for the same product. `https://schema.org/FullRefund`: The item can be refunded for the full monetary amount. `https://schema.org/StoreCreditRefund`: The item can can be refunded for store credit. |
 
| `restockingFee` | ` MonetaryAmount ` or ` Number ` The restocking fee charged to the consumer when returning a product. Specify a value of type `Number` to charge a percentage of the price paid by the consumer or use `MonetaryAmount` to charge a fixed amount. |
 
| `returnLabelSource` | ` ReturnLabelSourceEnumeration ` The method by which the consumer can obtain a return shipping label for a product. Use one of the following values: `https://schema.org/ReturnLabelCustomerResponsibility`: It's the responsibility of the consumer to create a return label. `https://schema.org/ReturnLabelDownloadAndPrint`: The return label must be downloaded and printed by the customer. `https://schema.org/ReturnLabelInBox`: The return label was included when the product was originally shipped. |
 
| `returnPolicyCountry` | ` Text ` The country where the product has to be sent to for returns. This country can be different from the country where the product was originally shipped or sent to. ISO 3166-1 alpha-2 country code formatting. You can specify up to 50 countries. |
 
 

 
#### Seasonal override properties

 The following properties are required when you need to define seasonal overrides for your organization-level return policies.

 
 
 
| Required properties |
 
 
| `returnPolicySeasonalOverride` | ` MerchantReturnPolicySeasonalOverride ` A seasonal override of a return policy to specify return policies for special events, such as holidays. For example, your usual return policy category is set to `MerchantReturnPolicyUnlimitedWindow` but the return window should be limited during holiday sales: 
```
"returnPolicySeasonalOverride": {
    "@type": "MerchantReturnPolicySeasonalOverride",
    "startDate": "2024-11-29",
    "endDate": "2024-12-06",
    "merchantReturnDays": 10,
    "returnPolicyCategory": "https://schema.org/MerchantReturnFiniteReturnWindow"
  }
```
 Here's how to specify multiple seasonal overrides. In this example, the usual return policy is unlimited, but is limited during the following two date ranges: 
```
"returnPolicySeasonalOverride": [{
    "@type": "MerchantReturnPolicySeasonalOverride",
    "startDate": "2024-11-29",
    "endDate": "2024-12-06",
    "merchantReturnDays": 10,
    "returnPolicyCategory": "https://schema.org/MerchantReturnFiniteReturnWindow"
  },
  {
    "@type": "MerchantReturnPolicySeasonalOverride",
    "startDate": "2024-12-26",
    "endDate": "2025-01-06",
    "merchantReturnDays": 10,
    "returnPolicyCategory": "https://schema.org/MerchantReturnFiniteReturnWindow"
  }]
```
 |
 
| `returnPolicySeasonalOverride.returnPolicyCategory` | ` MerchantReturnEnumeration ` The type of return policy. Use one of the following values: `https://schema.org/MerchantReturnFiniteReturnWindow`: There's a set number of days to return a product. `https://schema.org/MerchantReturnNotPermitted`: Returns aren't permitted. `https://schema.org/MerchantReturnUnlimitedWindow`: There's an unlimited amount of time to return a product. If you use `MerchantReturnFiniteReturnWindow`, then the `merchantReturnDays` property is required. |
 
 

 The following properties are recommended when you need to define seasonal overrides for your organization-level return policies.

 
 
 
| Recommended properties |
 
 
| `returnPolicySeasonalOverride.endDate` | ` Date ` or ` DateTime ` The end date of the seasonal override. |
 
| `returnPolicySeasonalOverride.merchantReturnDays` | ` Integer ` or ` Date ` or ` DateTime ` The number of days from the delivery date that a product can be returned. This property is only required if you set the `returnPolicyCategory` to `MerchantReturnFiniteReturnWindow`. |
 
| `returnPolicySeasonalOverride.startDate` | ` Date ` or ` DateTime ` The start date of the seasonal override. |

 
 

 
## Alternative approach to configuring return settings with Google

 
 Retailer return policies can get complicated and may change frequently. If you're having
 trouble indicating and keeping your return details up-to-date with markup
 and have a Google Merchant Center account, consider configuring your
 [return policies](https://support.google.com/merchants/answer/10220642)
 in Google Merchant Center. You can alternatively configure account-level
 [return policies in Search Console](https://support.google.com/webmasters/answer/14907594),
 which get automatically added to Merchant Center.
 

 
### Combining multiple return configurations

 
 If you're combining various return configurations, keep in mind how
 you can override your policy information based on the order of precedence. For example, if you provide both
 [return policy markup](https://developers.google.com/search/docs/appearance/structured-data/organization#merchant-return-policy-properties) on your site
 and return policy settings in Search Console, Google will only use the information provided in
 Search Console.
 

 
 Google uses the following order of precedence (from strongest to weakest):
 

 
 
- Content API for Shopping ([return settings](https://developers.google.com/shopping-content/guides/free-listings-return-settings))
 
- Settings in [Merchant Center](https://support.google.com/merchants/answer/14011730) or [Search Console](https://support.google.com/webmasters/answer/14907594)
 
- [Product-level merchant listing markup](https://developers.google.com/search/docs/appearance/structured-data/merchant-listing)
 
- [Organization-level markup](https://developers.google.com#merchant-return-policy-properties)
 

 
 
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
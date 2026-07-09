---
source: https://developers.google.com/search/docs/appearance/structured-data/generate-structured-data-with-javascript
title: "Generate Structured Data with JavaScript"
fetched: 2026-07-08
---

# Generate structured data with JavaScript

 

Modern websites use JavaScript to display lots of dynamic content. There are a
 few things you need to look out for when using JavaScript to generate structured data on your
 websites, and this guide covers best practices and implementation strategies. If you're new to
 structured data, you can learn more about
 [how structured data works](https://developers.google.com/search/docs/appearance/structured-data/intro-structured-data).

There are different ways to generate structured data with JavaScript, but the most common are:

 
- [Google Tag Manager](https://developers.google.com#use-google-tag-manager)
 
- [Custom JavaScript](https://developers.google.com#custom-javascript)

Using `Product` markup? Be aware that dynamically-generated
 markup can make Shopping crawls less frequent and less reliable, which can be an issue for
 fast-changing content like product availability and price. If you're a merchant optimizing for
 all types of shopping results, make sure your server has enough computing resources to handle
 increased traffic from Google.

## Use Google Tag Manager to generate JSON-LD dynamically

[Google Tag Manager](https://tagmanager.google.com/) is a
 platform that lets you manage tags on your website without editing the code. To generate structured
 data with Google Tag Manager, follow these steps:

 
- [Set up and install Google Tag Manager](https://support.google.com/tagmanager/answer/6103696) on your site.
 
- Add a new Custom HTML tag to the container.
 
- Paste a [supported structured data](https://developers.google.com/search/docs/guides/search-gallery) block into the tag content.
 
- Install the container as shown in the Install Google Tag Manager section of your container's admin menu.
 
- To add the tag to your website, publish your container in the Google Tag Manager interface.
 
- [Test your implementation](https://developers.google.com#testing).

### Using variables in Google Tag Manager

Google Tag Manager (GTM) supports [variables](https://support.google.com/tagmanager/topic/7683268?ref_topic=3441647)
 to use information on the page as part of your structured data. Use variables to extract
 the structured data from the page instead of duplicating the information in GTM. Duplicating the information in GTM increases
 the risk of having a mismatch between page content and the structured data inserted using GTM.

For example, you can dynamically create
 a [Recipe](https://developers.google.com/search/docs/appearance/structured-data/recipe) JSON-LD block
 that uses the page title as the recipe name by creating the following custom variable named
 `recipe_name`:


```
function() { return document.title; }
```

You can then use `&#123;&#123;recipe_name&#125;&#125;` in your custom tag HTML.

We recommend to create variables to collect all the necessary information from the page using variables.

Here is an example for the custom HTML tag content:


```
<script type="application/ld+json">
  {
    "@context": "https://schema.org/",
    "@type": "Recipe",
    "name": "&#123;&#123;recipe_name&#125;&#125;",
    "image": [ "&#123;&#123;recipe_image&#125;&#125;" ],
    "author": {
      "@type": "Person",
      "name": "&#123;&#123;recipe_author&#125;&#125;"
    }
  }
</script>
```

Note: The previous sample assumes that you defined the variables `recipe_name`, `recipe_image` and `recipe_author` in GTM.

## Generate structured data with custom JavaScript

Another way you can generate structured data is by using JavaScript to either generate all of
 your structured data or add more information to the server-side rendered structured data. Either way,
 Google Search can understand and process structured data that's available in the DOM when it
 renders the page. To learn more about how Google Search processes JavaScript, check out the
 [JavaScript basics guide](https://developers.google.com/search/docs/crawling-indexing/javascript/javascript-seo-basics).

Here is an example of JavaScript-generated structured data:

 
- [Find the type of
 structured data](https://developers.google.com/search/docs/appearance/structured-data/search-gallery) you are interested in.
 
- Edit your website's HTML to include a JavaScript snippet like the following example (refer to
 the documentation from your CMS or hosting provider, or ask your developers).

 

```
fetch('https://api.example.com/recipes/123')
.then(response => response.text())
.then(structuredDataText => {
  const script = document.createElement('script');
  script.setAttribute('type', 'application/ld+json');
  script.textContent = structuredDataText;
  document.head.appendChild(script);
});
```

 
- [Test your implementation with the Rich Results Test](https://developers.google.com#testing).

## Using server-side rendering

If you are using [server-side rendering](https://developers.google.com/web/updates/2019/02/rendering-on-the-web#server-rendering),
 you can also include the structured data in the rendered output. Check the documentation
 of your framework to find out how to generate the JSON-LD for [the type of structured data](https://developers.google.com/search/docs/appearance/structured-data/search-gallery)
 you're interested in.

## Test your implementation

To make sure Google Search can crawl and index your structured data, test your implementation:

 
- Open the [Rich Results Test](https://goo.gle/richresults).
 
- Enter the URL that you want to test.
 We recommend that you use the URL input instead
 of the code input because there are JavaScript limitations when using the code input
 (for example, CORS restrictions).
 
 
 
- Click Test URL.
 Success: If you did everything correctly and your [structured data type is supported in the tool](https://support.google.com/webmasters/answer/7445569),
 you will see the message "Page is eligible for rich results".

 If you are testing a structured data type that is not supported by the Rich Results test, check the rendered HTML.
 If the rendered HTML contains the structured data, Google Search will be able to process it.
 

 Try again: If you see errors or warnings, it is most likely a syntax error or a missing property.
 Read the [documentation
 for your type of structured data](https://developers.google.com/search/docs/appearance/structured-data/search-gallery) and make sure you've added all the properties. If your problem
 persists, make sure to also check the guide on [fixing search-related JavaScript problems](https://developers.google.com/search/docs/crawling-indexing/javascript/fix-search-javascript).
 

 

 
 
 
 

 
 
 

 
 
 
 
 
 
 
 
 

 
 
 
 Send feedback
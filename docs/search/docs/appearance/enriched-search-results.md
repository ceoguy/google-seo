---
source: https://developers.google.com/search/docs/appearance/enriched-search-results
title: "Enriched and Interactive Search Results"
fetched: 2026-07-08
---

# Enriched search results

 
In addition to standard rich results, Google Search supports a more interactive and enhanced class of rich result called enriched search results. Enriched search results often include an immersive experience or other advanced interaction feature. For example, here is a Jobs enriched result that might appear if a user searched for "jobs in United States":

Enriched search enables the user to search across the various properties of a structured data item; for example, a user might search for chicken soup recipes under 200 calories, or recipes that take less than 1 hour of preparation time.

## Implementing enriched search

Enriched search is a subset of rich results, and is implemented using [structured data](https://developers.google.com/search/docs/appearance/structured-data/intro-structured-data). Some rich result types are only available as enriched search types (for example, recipes, jobs, and events); other rich result types can be extended to be an enriched search type with the addition of a few properties. The documentation for a rich result type explains whether and how it can be extended from a basic rich result to an enriched result.

[Technical information and a gallery of results is available here.](https://developers.google.com/search/docs/appearance/structured-data/search-gallery)

Enriched search is driven by the Google Search ranking algorithm; in addition to adding the correct structured data on your pages, you must follow the following quality guidelines so that Google can properly index and rank your pages.

- The [Structured data quality guidelines](https://developers.google.com/search/docs/appearance/structured-data/sd-policies#quality-guidelines)

- The [Search Essentials](https://developers.google.com/search/docs/essentials)

- The [enriched search quality guidelines](https://developers.google.com#guidelines)

A note about duplicate structured data content: Structured data is typically duplicated across many pages within a site, and for good reason. For example, you might post several Job listings for the same opening in multiple locations. These listings would have identical description values but different location values. The enriched search algorithm takes this into account, and these objects are not considered to be duplicates.

## Enriched search types

The following search types support an enriched search experience:

- [Job Posting](https://developers.google.com/search/docs/appearance/structured-data/job-posting)

- [Recipe](https://developers.google.com/search/docs/appearance/structured-data/recipe)

- [Event](https://developers.google.com/search/docs/appearance/structured-data/event)

## Enriched search quality guidelines

You must follow these spam policies to be eligible for enriched search. If the enriched search ranking algorithm decides that a large part of a site is not meeting the quality bar, it can exclude the entire site from enriched search results.

- Required properties: Each enriched search type defines a required set of properties. Items missing the required properties are ineligible.

- Completeness: The more additional (recommended) properties you provide, the higher
 quality the item is to our users. For a job posting, users prefer jobs with explicitly stated
 salaries than those without, and enriched search ranking also takes this into consideration. If
 your recipes have actual user reviews and genuine star ratings, that is also valuable to users
 of your site and enriched search. Completeness is one of the most important ranking signals for
 enriched search.

- Relevance: Your marked up data must be relevant to the enriched search you are participating in. Here are some examples of irrelevant data:
 

- A sports live streaming site labeling broadcasts as local events.

- A woodworking site labeling instructions as recipes.

- Leaf content: Enriched search is only available for leaf pages, not for listing pages. A leaf page is a page that describes the detailed properties of an item. A listing page, on the other hand, is a category page that links to multiple leaf pages. The following are examples of listing pages:
 

- A page that describes "10 best ideas for cooking turkey" with links out to each recipe.

- A page listing all the jobs at Mountain View, CA, with links to individual jobs.

- Content policies: Individual enriched search has additional content-type-specific policies for each data type, as described in its documentation. Documents or sites that violate these content policies may receive less favorable ranking or ineligible for the feature.

 

 
 
 
 

 
 
 

 
 
 
 
 
 
 
 
 

 
 
 
 Send feedback
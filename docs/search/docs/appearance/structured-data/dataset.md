---
source: https://developers.google.com/search/docs/appearance/structured-data/dataset
title: "Dataset Structured Data"
fetched: 2026-07-08
---

# Dataset (`Dataset`, `DataCatalog`, `DataDownload`) structured data

 
 Datasets are easier to find in the [Dataset Search](https://toolbox.google.com/datasetsearch/)
 tool when you provide supporting information such as their name, description, creator and distribution formats
 as structured data. Google's [approach to dataset discovery](https://www.blog.google/products/search/making-it-easier-discover-datasets/)
 makes use of schema.org and other metadata standards that can be added to pages that describe datasets. The purpose of this markup is to
 improve discovery of datasets from fields such as life sciences, social sciences, machine
 learning, civic and government data, and more.
 

 
 
 
 Note: The actual appearance in search results might be different. You can
 preview most features with the
 [Rich Results Test](https://support.google.com/webmasters/answer/7445569).
 
 
 Here are some examples of what can qualify as a dataset:

 
 
- A table or a CSV file with some data
 
- An organized collection of tables
 
- A file in a proprietary format that contains data
 
- A collection of files that together constitute some meaningful dataset
 
- A structured object with data in some other format that you might want to load into a
 special tool for processing
 
- Images capturing data
 
- Files relating to machine learning, such as trained parameters or neural network structure definitions
 

 
 
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
 

 

 
## Deleting a dataset from Dataset Search results

 
 If you don't want a dataset to show up in Dataset Search results, [use the robots `meta` tag](https://developers.google.com/search/docs/crawling-indexing/robots-meta-tag#structureddata) to control how your dataset is indexed. Keep in mind that it might take some time (days or weeks, depending on the crawl schedule) for the changes to be reflected on Dataset Search.
 

 
## Our approach to dataset discovery

 
 We can understand structured data in web pages about datasets, using either [schema.org `Dataset` markup](https://schema.org/Dataset), or equivalent
 structures represented in [W3C](https://www.w3.org/)'s [Data Catalog Vocabulary (DCAT) format](https://www.w3.org/TR/vocab-dcat/). We also are exploring
 experimental support for structured data based on [W3C CSVW](https://www.w3.org/TR/tabular-data-primer/), and expect to evolve and adapt our approach as best practices for dataset description emerge. For more information about our
 approach to dataset discovery, see
 [Making it easier to discover datasets](https://www.blog.google/products/search/making-it-easier-discover-datasets/).
 

 
## Examples

 Here's an example for datasets using JSON-LD and schema.org syntax (preferred) in the
 Rich Results Test. The same schema.org vocabulary can also be used in RDFa 1.1 or Microdata syntaxes.
 You can also use the W3C DCAT vocabulary to describe the metadata. The following example is based on a
 [real-world
 dataset description](https://catalog.data.gov/dataset/ncdc-storm-events-database-336e4).

 
 
 JSON-LD
 Here's an example of a dataset in JSON-LD:

 <html>
 <head>
 <title>NCDC Storm Events Database</title>
 <script type="application/ld+json">
 {
 "@context":"https://schema.org/",
 "@type":"Dataset",
 "name":"NCDC Storm Events Database",
 "description":"Storm Data is provided by the National Weather Service (NWS) and contain statistics on...",
 "url":"https://catalog.data.gov/dataset/ncdc-storm-events-database",
 "sameAs":"https://gis.ncdc.noaa.gov/geoportal/catalog/search/resource/details.page?id=gov.noaa.ncdc:C00510",
 "identifier": ["https://doi.org/10.1000/182",
 "https://identifiers.org/ark:/12345/fk1234"],
 "keywords":[
 "ATMOSPHERE > ATMOSPHERIC PHENOMENA > CYCLONES",
 "ATMOSPHERE > ATMOSPHERIC PHENOMENA > DROUGHT",
 "ATMOSPHERE > ATMOSPHERIC PHENOMENA > FOG",
 "ATMOSPHERE > ATMOSPHERIC PHENOMENA > FREEZE"
 ],
 "license" : "https://creativecommons.org/publicdomain/zero/1.0/",
 "isAccessibleForFree" : true,
 "hasPart" : [
 {
 "@type": "Dataset",
 "name": "Sub dataset 01",
 "description": "Informative description of the first subdataset...",
 "license" : "https://creativecommons.org/publicdomain/zero/1.0/",
 "creator":{
 "@type":"Organization",
 "name": "Sub dataset 01 creator"
 }
 },
 {
 "@type": "Dataset",
 "name": "Sub dataset 02",
 "description": "Informative description of the second subdataset...",
 "license" : "https://creativecommons.org/publicdomain/zero/1.0/",
 "creator":{
 "@type":"Organization",
 "name": "Sub dataset 02 creator"
 }
 }
 ],
 "creator":{
 "@type":"Organization",
 "url": "https://www.ncei.noaa.gov/",
 "name":"OC/NOAA/NESDIS/NCEI > National Centers for Environmental Information, NESDIS, NOAA, U.S. Department of Commerce",
 "contactPoint":{
 "@type":"ContactPoint",
 "contactType": "customer service",
 "telephone":"+1-828-271-4800",
 "email":"ncei.orders@noaa.gov"
 }
 },
 "funder":{
 "@type": "Organization",
 "sameAs": "https://ror.org/00tgqzw13",
 "name": "National Weather Service"
 },
 "includedInDataCatalog":{
 "@type":"DataCatalog",
 "name":"data.gov"
 },
 "distribution":[
 {
 "@type":"DataDownload",
 "encodingFormat":"CSV",
 "contentUrl":"https://www.ncdc.noaa.gov/stormevents/ftp.jsp"
 },
 {
 "@type":"DataDownload",
 "encodingFormat":"XML",
 "contentUrl":"https://gis.ncdc.noaa.gov/all-records/catalog/search/resource/details.page?id=gov.noaa.ncdc:C00510"
 }
 ],
 "temporalCoverage":"1950-01-01/2013-12-18",
 "spatialCoverage":{
 "@type":"Place",
 "geo":{
 "@type":"GeoShape",
 "box":"18.0 -65.0 72.0 172.0"
 }
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
 <title>NCDC Storm Events Database</title>
 <script type="application/ld+json">
 {
 "@context":"https://schema.org/",
 "@type":"Dataset",
 "name":"NCDC Storm Events Database",
 "description":"Storm Data is provided by the National Weather Service (NWS) and contain statistics on...",
 "url":"https://catalog.data.gov/dataset/ncdc-storm-events-database",
 "sameAs":"https://gis.ncdc.noaa.gov/geoportal/catalog/search/resource/details.page?id=gov.noaa.ncdc:C00510",
 "identifier": ["https://doi.org/10.1000/182",
 "https://identifiers.org/ark:/12345/fk1234"],
 "keywords":[
 "ATMOSPHERE > ATMOSPHERIC PHENOMENA > CYCLONES",
 "ATMOSPHERE > ATMOSPHERIC PHENOMENA > DROUGHT",
 "ATMOSPHERE > ATMOSPHERIC PHENOMENA > FOG",
 "ATMOSPHERE > ATMOSPHERIC PHENOMENA > FREEZE"
 ],
 "license" : "https://creativecommons.org/publicdomain/zero/1.0/",
 "isAccessibleForFree" : true,
 "hasPart" : [
 {
 "@type": "Dataset",
 "name": "Sub dataset 01",
 "description": "Informative description of the first subdataset...",
 "license" : "https://creativecommons.org/publicdomain/zero/1.0/",
 "creator":{
 "@type":"Organization",
 "name": "Sub dataset 01 creator"
 }
 },
 {
 "@type": "Dataset",
 "name": "Sub dataset 02",
 "description": "Informative description of the second subdataset...",
 "license" : "https://creativecommons.org/publicdomain/zero/1.0/",
 "creator":{
 "@type":"Organization",
 "name": "Sub dataset 02 creator"
 }
 }
 ],
 "creator":{
 "@type":"Organization",
 "url": "https://www.ncei.noaa.gov/",
 "name":"OC/NOAA/NESDIS/NCEI > National Centers for Environmental Information, NESDIS, NOAA, U.S. Department of Commerce",
 "contactPoint":{
 "@type":"ContactPoint",
 "contactType": "customer service",
 "telephone":"+1-828-271-4800",
 "email":"ncei.orders@noaa.gov"
 }
 },
 "funder":{
 "@type": "Organization",
 "sameAs": "https://ror.org/00tgqzw13",
 "name": "National Weather Service"
 },
 "includedInDataCatalog":{
 "@type":"DataCatalog",
 "name":"data.gov"
 },
 "distribution":[
 {
 "@type":"DataDownload",
 "encodingFormat":"CSV",
 "contentUrl":"https://www.ncdc.noaa.gov/stormevents/ftp.jsp"
 },
 {
 "@type":"DataDownload",
 "encodingFormat":"XML",
 "contentUrl":"https://gis.ncdc.noaa.gov/all-records/catalog/search/resource/details.page?id=gov.noaa.ncdc:C00510"
 }
 ],
 "temporalCoverage":"1950-01-01/2013-12-18",
 "spatialCoverage":{
 "@type":"Place",
 "geo":{
 "@type":"GeoShape",
 "box":"18.0 -65.0 72.0 172.0"
 }
 }
 }
 </script>
 </head>
 <body>
 </body>
</html>
```
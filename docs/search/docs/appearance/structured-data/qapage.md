---
source: https://developers.google.com/search/docs/appearance/structured-data/qapage
title: "Schema for Q&amp;A Pages (QAPage)"
fetched: 2026-07-08
---

# Q&A (`QAPage`) structured data

 

Q&A pages are web pages that contain data in a question and answer format, which is one question
 followed by its answers. For content that represents a question and its
 answers, you can mark up your data with the [schema.org](https://schema.org/) `QAPage`, `Question`, and `Answer` types.

Properly marked up pages are eligible to have a rich result displayed on the search results
 page. This rich treatment helps your site reach the right users on Search.
 For example, you might see a rich result for the user query "How do I remove a cable that is
 stuck in a USB port?" if the page has been marked up with answers to that question.

 In addition to enabling your content for the rich result treatment, marking up
 your Q&A page helps Google generate a better
 [snippet](https://developers.google.com/search/docs/appearance/snippet) for your page.
 The content from the answers may appear in the basic result if the rich
 result is not shown.

 
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

The following markup example includes the `QAPage`, `Question`,
 and `Answer` type definitions in JSON-LD: 

 
 
 JSON-LD
 <html>
 <head>
 <title>How many ounces are there in a pound?</title>
 <script type="application/ld+json">
 {
 "@context": "https://schema.org",
 "@type": "QAPage",
 "mainEntity": {
 "@type": "Question",
 "name": "How many ounces are there in a pound?",
 "text": "I have taken up a new interest in baking and keep running across directions in ounces and pounds. I have to translate between them and was wondering how many ounces are in a pound?",
 "answerCount": 3,
 "upvoteCount": 26,
 "datePublished": "2024-02-14T15:34-05:00",
 "author": {
 "@type": "Person",
 "name": "Mary Stone",
 "url": "https://example.com/profiles/mary-stone"
 },
 "acceptedAnswer": {
 "@type": "Answer",
 "text": "1 pound (lb) is equal to 16 ounces (oz).",
 "image": "https://example.com/images/conversion-chart.jpg",
 "upvoteCount": 1337,
 "url": "https://example.com/question1#acceptedAnswer",
 "datePublished": "2024-02-14T16:34-05:00",
 "author": {
 "@type": "Person",
 "name": "Julius Fernandez",
 "url": "https://example.com/profiles/julius-fernandez"
 }
 },
 "suggestedAnswer": [
 {
 "@type": "Answer",
 "text": "Are you looking for ounces or fluid ounces? If you are looking for fluid ounces there are 15.34 fluid ounces in a pound of water.",
 "upvoteCount": 42,
 "url": "https://example.com/question1#suggestedAnswer1",
 "datePublished": "2024-02-14T15:39-05:00",
 "author": {
 "@type": "Person",
 "name": "Kara Weber",
 "url": "https://example.com/profiles/kara-weber"
 },
 "comment": {
 "@type": "Comment",
 "text": "I'm looking for ounces, not fluid ounces.",
 "datePublished": "2024-02-14T15:40-05:00",
 "author": {
 "@type": "Person",
 "name": "Mary Stone",
 "url": "https://example.com/profiles/mary-stone"
 }
 }
 }, {
 "@type": "Answer",
 "text": " I can't remember exactly, but I think 18 ounces in a lb. You might want to double check that.",
 "upvoteCount": 0,
 "url": "https://example.com/question1#suggestedAnswer2",
 "datePublished": "2024-02-14T16:02-05:00",
 "author": {
 "@type": "Person",
 "name": "Joe Cobb",
 "url": "https://example.com/profiles/joe-cobb"
 }
 }
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
    <title>How many ounces are there in a pound?</title>
    <script type="application/ld+json">
    {
      "@context": "https://schema.org",
      "@type": "QAPage",
      "mainEntity": {
        "@type": "Question",
        "name": "How many ounces are there in a pound?",
        "text": "I have taken up a new interest in baking and keep running across directions in ounces and pounds. I have to translate between them and was wondering how many ounces are in a pound?",
        "answerCount": 3,
        "upvoteCount": 26,
        "datePublished": "2024-02-14T15:34-05:00",
        "author": {
          "@type": "Person",
          "name": "Mary Stone",
          "url": "https://example.com/profiles/mary-stone"
        },
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "1 pound (lb) is equal to 16 ounces (oz).",
          "image": "https://example.com/images/conversion-chart.jpg",
          "upvoteCount": 1337,
          "url": "https://example.com/question1#acceptedAnswer",
          "datePublished": "2024-02-14T16:34-05:00",
          "author": {
            "@type": "Person",
            "name": "Julius Fernandez",
            "url": "https://example.com/profiles/julius-fernandez"
          }
        },
        "suggestedAnswer": [
          {
            "@type": "Answer",
            "text": "Are you looking for ounces or fluid ounces? If you are looking for fluid ounces there are 15.34 fluid ounces in a pound of water.",
            "upvoteCount": 42,
            "url": "https://example.com/question1#suggestedAnswer1",
            "datePublished": "2024-02-14T15:39-05:00",
            "author": {
              "@type": "Person",
              "name": "Kara Weber",
              "url": "https://example.com/profiles/kara-weber"
            },
            "comment": {
              "@type": "Comment",
              "text": "I'm looking for ounces, not fluid ounces.",
              "datePublished": "2024-02-14T15:40-05:00",
              "author": {
                "@type": "Person",
                "name": "Mary Stone",
                "url": "https://example.com/profiles/mary-stone"
              }
            }
          }, {
            "@type": "Answer",
            "text": " I can't remember exactly, but I think 18 ounces in a lb. You might want to double check that.",
            "upvoteCount": 0,
            "url": "https://example.com/question1#suggestedAnswer2",
            "datePublished": "2024-02-14T16:02-05:00",
            "author": {
              "@type": "Person",
              "name": "Joe Cobb",
              "url": "https://example.com/profiles/joe-cobb"
            }
          }
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
<body itemscope itemtype="https://schema.org/QAPage">
<div itemprop="mainEntity" itemscope itemtype="https://schema.org/Question">
 <h2 itemprop="name">How many ounces are there in a pound?</h2>
 <div itemprop="upvoteCount">52</div>
 <div itemprop="text">I have taken up a new interest in baking and keep running across directions in ounces and pounds. I have to translate between them and was wondering how many ounces are in a pound?</div>
 <meta itemprop="datePublished" content="2024-02-14T15:34-05:00"/>
 <div itemprop="author" itemscope itemtype="https://schema.org/Person">
 <span itemprop="name">Mary Stone</span>
 </div>
<div>
 <div><span itemprop="answerCount">3</span> answers</div>
 <div><span itemprop="upvoteCount">26</span> votes</div>
 <div id="acceptedAnswer" itemprop="acceptedAnswer" itemscope itemtype="https://schema.org/Answer">
 <div itemprop="upvoteCount">1337</div>
 <div itemprop="text">
 1 pound (lb) is equal to 16 ounces (oz).
 </div>
 <a itemprop="url" href="https://example.com/question1#acceptedAnswer">Answer Link</a>
 <meta itemprop="datePublished" content="2024-02-14T16:34-05:00"/>
 <div itemprop="author" itemscope itemtype="https://schema.org/Person">
 <span itemprop="name">Julius Fernandez</span>
 </div>
 </div>
 <div id="suggestedAnswer1" itemprop="suggestedAnswer" itemscope itemtype="https://schema.org/Answer">
 <div itemprop="upvoteCount">42</div>
 <div itemprop="text">
 Are you looking for ounces or fluid ounces? If you are looking for fluid ounces there are 15.34 fluid ounces in a pound of water.
 </div>
 <a itemprop="url" href="https://example.com/question1#suggestedAnswer1">Answer Link</a>
 <meta itemprop="datePublished" content="2024-02-14T15:39-05:00"/>
 <div itemprop="author" itemscope itemtype="https://schema.org/Person">
 <span itemprop="name">Kara Weber</span>
 </div>
 <div itemprop="comment" itemscope itemtype="https://schema.org/Comment">
 <div itemprop="text">I'm looking for ounces, not fluid ounces.</div>
 <div itemprop="author" itemscope itemtype="https://schema.org/Person">
 <span itemprop="name">Mary Stone</span>
 </div>
 <meta itemprop="datePublished" content="2024-02-14T15:40-05:00"/>
 </div>
 </div>
 <div id="suggestedAnswer2" itemprop="suggestedAnswer" itemscope itemtype="https://schema.org/Answer">
 <div itemprop="upvoteCount">0</div>
 <div itemprop="text">
 I can't remember exactly, but I think 18 ounces in a lb. You might want to double check that.
 </div>
 <a itemprop="url" href="https://example.com/question1#suggestedAnswer2">Answer Link</a>
 <meta itemprop="datePublished" content="2024-02-14T16:02-05:00"/>
 <div itemprop="author" itemscope itemtype="https://schema.org/Person">
 <span itemprop="name">Joe Cobb</span>
 </div>
 </div>
</div>
</div>
</body>
</html>
 

 

```
<html>
<body itemscope itemtype="https://schema.org/QAPage">
<div itemprop="mainEntity" itemscope itemtype="https://schema.org/Question">
   <h2 itemprop="name">How many ounces are there in a pound?</h2>
   <div itemprop="upvoteCount">52</div>
   <div itemprop="text">I have taken up a new interest in baking and keep running across directions in ounces and pounds. I have to translate between them and was wondering how many ounces are in a pound?</div>
   <meta itemprop="datePublished" content="2024-02-14T15:34-05:00"/>
   <div itemprop="author" itemscope itemtype="https://schema.org/Person">
     <span itemprop="name">Mary Stone</span>
   </div>
<div>
    <div><span itemprop="answerCount">3</span> answers</div>
    <div><span itemprop="upvoteCount">26</span> votes</div>
    <div id="acceptedAnswer" itemprop="acceptedAnswer" itemscope itemtype="https://schema.org/Answer">
       <div itemprop="upvoteCount">1337</div>
       <div itemprop="text">
       1 pound (lb) is equal to 16 ounces (oz).
       </div>
      <a itemprop="url" href="https://example.com/question1#acceptedAnswer">Answer Link</a>
      <meta itemprop="datePublished" content="2024-02-14T16:34-05:00"/>
      <div itemprop="author" itemscope itemtype="https://schema.org/Person">
        <span itemprop="name">Julius Fernandez</span>
      </div>
      </div>
    <div id="suggestedAnswer1" itemprop="suggestedAnswer" itemscope itemtype="https://schema.org/Answer">
       <div itemprop="upvoteCount">42</div>
       <div itemprop="text">
       Are you looking for ounces or fluid ounces? If you are looking for fluid ounces there are 15.34 fluid ounces in a pound of water.
       </div>
       <a itemprop="url" href="https://example.com/question1#suggestedAnswer1">Answer Link</a>
       <meta itemprop="datePublished" content="2024-02-14T15:39-05:00"/>
       <div itemprop="author" itemscope itemtype="https://schema.org/Person">
         <span itemprop="name">Kara Weber</span>
       </div>
       <div itemprop="comment" itemscope itemtype="https://schema.org/Comment">
         <div itemprop="text">I'm looking for ounces, not fluid ounces.</div>
         <div itemprop="author" itemscope itemtype="https://schema.org/Person">
           <span itemprop="name">Mary Stone</span>
         </div>
         <meta itemprop="datePublished" content="2024-02-14T15:40-05:00"/>
       </div>
     </div>
     <div id="suggestedAnswer2" itemprop="suggestedAnswer" itemscope itemtype="https://schema.org/Answer">
       <div itemprop="upvoteCount">0</div>
       <div itemprop="text">
       I can't remember exactly, but I think 18 ounces in a lb. You might want to double check that.
       </div>
       <a itemprop="url" href="https://example.com/question1#suggestedAnswer2">Answer Link</a>
       <meta itemprop="datePublished" content="2024-02-14T16:02-05:00"/>
       <div itemprop="author" itemscope itemtype="https://schema.org/Person">
         <span itemprop="name">Joe Cobb</span>
       </div>
    </div>
</div>
</div>
</body>
</html>
```

 

## Guidelines

For your Q&A page to be eligible for this rich treatment, you must follow
 these guidelines:

 
- [General structured data guidelines](https://developers.google.com/search/docs/appearance/structured-data/sd-policies) 
 
- [Search Essentials](https://developers.google.com/search/docs/essentials) 
 
- [Content Guidelines](https://developers.google.com#content-guidelines) 

### Content guidelines

 
- Only use the `QAPage` markup if your page has information in a question and answer format, which is
 one question followed by its answers. 
 
- Users must be able to submit answers to the question. Don't use `QAPage` markup for
 content that has only one answer for a given question with no way for users to add alternative
 answers. Here are some examples:
 Valid use cases:

 
 
- A forum page where users can submit answers to a single question
 
- A product support page where users can submit answers to a single question
 

 Invalid use cases:

 
 
- An FAQ page written by the site itself with no way for users to submit alternative answers
 
- A product page where users can submit multiple questions and answers on a single page
 
- A how-to guide that answers a question
 
- A blog post that answers a question
 
- An essay that answers a question
 

 
 
- Don't apply `QAPage` markup to all pages on a site or forum if not all the content is eligible.
 For example, a forum may have lots of questions posted, which are individually eligible for the markup. However,
 if the forum also has pages that are not questions, those pages are not eligible.
 
- Don't use `QAPage` markup for FAQ pages or pages where there are multiple questions
 per page. `QAPage` markup is for pages where the focus of the page is a single question
 and its answers.
 
- Don't use `QAPage` markup for advertising purposes. 
 
- Make sure each `Question` includes the entire text of the question and
 make sure each `Answer` includes the entire text of the answer. 
 
- `Answer` markup is for answers to the question, not for comments on the question or
 comments on other answers. Instead, use the `comment` property and
 `Comment` type for this type of content.
 
- Question and answer content may not be displayed as a rich result if it contains any of the
 following types of content: obscene, profane, sexually explicit, graphically violent,
 promotion of dangerous or illegal activities, or hateful or harassing language.
 
- [Education-related Q&A pages](https://developers.google.com/search/docs/appearance/structured-data/education-qa),
 where the primary focus is to provide a correct answer
 to a user-submitted homework question, may be eligible for a Q&A carousel experience.
 These pages may only have a single answer that's provided or selected by in-house experts
 (instead of users).

 Example: An education page where a user submitted a single question, and a top answer is
 selected by experts.
 

## Structured data type definitions

This section describes the structured data types related to `QAPage`.

You must include the required properties for your content to be eligible for display as a rich result. You can also
include the recommended properties to add more information to your structured data, which could
provide a better user experience.

You can use Google's [Rich Results Test](https://search.google.com/test/rich-results)
 to validate and preview your structured data.

### `QAPage`

 The `QAPage` type indicates that the
 page is focused on a specific question and its answer(s). We will only use `Question`
 structured data from pages with `QAPage` markup. There must only be one
 `QAPage` type definition per page.

The full definition of `QAPage` is available at
 [https://schema.org/QAPage](https://schema.org/QAPage).

The following table describes the properties of the `QAPage` type that are used by Google Search.

 
 
 
| Required properties |
 
 
 
| `mainEntity` | ` Question ` The `Question` for this page must be nested under the `mainEntity` property of the `QAPage` item. |
 

### `Question`

The `Question` type defines the question that this page answers, and includes
the answers, if any, to that question. Exactly one `Question` type is expected on the
page, nested under the `mainEntity` property of the `schema.org/QAPage`. There
must only be one `Question` type definition per page.

 If your site doesn't support a recommended property, omit that property from your
structured data.

The full definition of `Question` is available at [https://schema.org/Question](https://schema.org/Question). The Google-supported properties are the
 following:

 
 
 
| Required properties |
 
 
 
| `answerCount` | ` Integer ` The total number of answers to the question. For example, if there are 15 answers, but only the first 10 are marked up due to pagination, this value would be 15. This may also be 0 for questions with no answers. `answerCount` + `commentCount` should equal the total number of replies of any type. |
 
 Either `acceptedAnswer` or `suggestedAnswer` | 
 `[Answer](https://schema.org/Answer)`
 To be eligible for the rich result, a question must have at least one answer – either an
 `acceptedAnswer` or a `suggestedAnswer`. However, questions may not
 have answers when they are first posted. For questions without answers, set
 the `answerCount` property to 0. Questions without answers aren't eligible for
 the rich result.
 

 
 
| `acceptedAnswer` | ` Answer ` A top answer to the question. There can be zero or more of these per question. This must represent answers that are accepted in some way on your site. For example, accepted as a top answer by question asker, a moderator, or a voting system. Other forms of sorting answers, such as most-recent, must not be used to identify top answers. |
 
| `suggestedAnswer` | ` Answer ` One possible answer, but not accepted as a top answer (`acceptedAnswer`). There can be zero or more of these per Question. |
 

 | 
 

 
| `name` | ` Text ` The full text of the short form of the question. For example, "How many teaspoons in a cup?". |
 

 
 
 
| Recommended properties |
 
 
 
| `author` | ` Person ` or ` Organization ` Information about the author of the question. To help Google best understand authors across various features, we recommend following the author markup best practices . Include as many properties that make sense for the author, using the supported properties from article and profile page structured data as a guide. |
 
| `author.url` | ` URL ` A link to a web page that uniquely identifies the author of the question, most likely a profile page of the Q&A website. We recommend marking up that page using profile page structured data . |
 
| `comment` | ` Comment ` A comment pertaining to the question, if present. Ideally, this content isn't an answer: it's usually a clarification or discussion about the question. |
 
| `commentCount` | ` Integer ` The number of comments about this question, if applicable. `answerCount` + `commentCount` should equal the total number of replies of any type. |
 
| `dateModified` | ` DateTime ` The date and time the answer was edited, if applicable, in ISO 8601 format . |
 
| `datePublished` | ` DateTime ` The date and time the question was posted in ISO 8601 format . |
 
| `digitalSourceType` | ` IPTCDigitalSourceEnumeration ` The `digitalSourceType` property indicates the type of digital source associated with the content, if applicable. This property is particularly relevant for distinguishing between human and AI or other machine-generated content. Google supports the following values: `TrainedAlgorithmicMediaDigitalSource`: Indicates content created by a trained model, such as an LLM. `AlgorithmicMediaDigitalSource`: Indicates content created by a simpler algorithmic process, such as an automatic reply bot. If this property is not specified, Google will assume the content is human-generated. |
 
| `image` | ` ImageObject ` or ` URL ` Any inline images within the question, if applicable. If there aren't any images, don't include default, icon, placeholder, or author images in this field. |
 
| `text` | ` Text ` The full text of the long form of the question. For example, "I'm cooking, and I need to know how many teaspoons are in a cup. How many teaspoons are in 1 cup?" |
 
| `upvoteCount` | ` Integer ` The total number of votes that this question has received. If the page supports upvotes and downvotes, then set the `upvoteCount` value to a single aggregate value that represents both upvotes and downvotes. For example, if there are 5 upvotes and 2 downvotes, the aggregate value used for `upvoteCount` is 3. If there are 5 upvotes and downvotes are not supported, then the value for `upvoteCount` is 5. |
 
| `video` | ` VideoObject ` Any inline videos within the question, if applicable. |
 

### `Answer`

The `Answer` type defines the suggested and accepted answers to the
`Question` on this page. Define `Answers` inside the `Question`,
as values for the `suggestedAnswer` and `acceptedAnswer` properties.

The following table describes the properties of the `Answer` type that is used within a
`Question`. 

The full definition of `Answer` is available at
[https://schema.org/Answer](https://schema.org/Answer).

If your site doesn't support a recommended property, omit that property from
your structured data.

 
 
 
| Required properties |
 
 
 
| `text` | ` Text ` The full text of the answer. If only a portion is marked up, your content may not be shown and Google cannot determine the best text to display. |
 

 
 
 
| Recommended properties |
 
 
 
| `author` | ` Person ` or ` Organization ` Information about the author of the answer. To help Google best understand authors across various features, we recommend following the author markup best practices . Include as many properties that makes sense for the author, using the supported properties from article and profile page structured data as a guide. |
 
| `author.url` | ` URL ` A link to a web page that uniquely identifies the author of the answer, most likely a profile page of the Q&A website. We recommend marking up that page using profile page structured data . |
 
| `comment` | ` Comment ` A comment pertaining to the answer, usually a clarification or discussion about the answer, if applicable. |
 
| `commentCount` | ` Integer ` The number of comments about this answer, if applicable. This is particularly useful if they are not all present in the comment markup. |
 
| `dateModified` | ` DateTime ` The date and time the answer was edited in ISO 8601 format , if applicable. |
 
| `datePublished` | ` DateTime ` The date and time the question was answered in ISO 8601 format . |
 
| `digitalSourceType` | ` IPTCDigitalSourceEnumeration ` The `digitalSourceType` property indicates the type of digital source associated with the content, if applicable. This property is particularly relevant for distinguishing between human and AI or other machine-generated content. Google supports the following values: `TrainedAlgorithmicMediaDigitalSource`: Indicates content created by a trained model, such as an LLM. `AlgorithmicMediaDigitalSource`: Indicates content created by a simpler algorithmic process, such as an automatic reply bot. If this property is not specified, Google will assume the content is human-generated. |
 
| `image` | ` ImageObject ` or ` URL ` Any inline images within the answer, if applicable. If there aren't any images, don't include default, icon, placeholder, or author images in this field. |
 
| `upvoteCount` | ` Integer ` The total number of votes that this answer has received, if applicable. If the page supports upvotes and downvotes, then set the `upvoteCount` value to a single aggregate value that represents both upvotes and downvotes. For example, if there are 5 upvotes and 2 downvotes, the aggregate value used for `upvoteCount` is 3. If there are 5 upvotes and downvotes are not supported, then the value for `upvoteCount` is 5. |
 
| `url` | ` URL ` A URL that links directly to this answer. For example: `https://www.examplesite.com/question#answer1` It is strongly recommended to provide a URL for each answer because it improves the user experience when the user clicks through to your site. |
 
| `video` | ` VideoObject ` or ` URL ` Any inline videos within the answer, if applicable. |
 

### `Comment`

The `Comment` type can optionally be used to describe clarifications or discussions
about the question or answer which are neither question nor answer. Define `Comments`
inside the `Question` or `Answer`, as values for the `comment` property.

The full definition of `Comment` is available at
[https://schema.org/Comment](https://schema.org/Comment).

 
 
 
| Required properties |
 
 
 
| `text` | ` Text ` The full text of the comment. If only a portion is marked up, Google might not be able to determine the best text to display. |
 

 
 
 
| Recommended properties |
 
 
 
| `author` | ` Person ` or ` Organization ` Information about the author of the comment. To help Google best understand authors across various features, we recommend following the author markup best practices . Include as many properties that make sense for the author, using the supported properties from article and profile page structured data as a guide. |
 
| `author.url` | ` URL ` A link to a web page that uniquely identifies the author of the comment, most likely a profile page of the Q&A website. We recommend marking up that page using profile page structured data . |
 
| `comment` | ` Comment ` A nested, threaded comment replying to the comment, if applicable. |
 
| `commentCount` | ` Integer ` The number of comments about this comment, if applicable. This is particularly useful if they are not all present in the comment markup. |
 
| `dateModified` | ` DateTime ` The date and time the comment was edited in ISO 8601 format , if applicable. |
 
| `datePublished` | ` DateTime ` The date and time the comment was written in ISO 8601 format . |
 
| `digitalSourceType` | ` IPTCDigitalSourceEnumeration ` The `digitalSourceType` property indicates the type of digital source associated with the content, if applicable. This property is particularly relevant for distinguishing between human and AI or other machine-generated content. Google supports the following values: `TrainedAlgorithmicMediaDigitalSource`: Indicates content created by a trained model, such as an LLM. `AlgorithmicMediaDigitalSource`: Indicates content created by a simpler algorithmic process, such as an automatic reply bot. If this property is not specified, Google will assume the content is human-generated. |
 
| `image` | ` ImageObject ` or ` URL ` Any inline images within the comment, if applicable. If there aren't any images, don't include default, icon, placeholder, or author images in this field. |
 
| `video` | ` VideoObject ` or ` URL ` Any inline videos within the comment, if applicable. |
 

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
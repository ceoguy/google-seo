---
source: https://developers.google.com/search/docs/appearance/structured-data/education-qa
title: "Education Q&amp;A Structured Data"
fetched: 2026-07-08
---

# Education Q&A (`Quiz`, `Question`, and `Answer`) structured data

 
 
 If you have flashcard pages, you can help students better find answers to educational
 questions by adding `Quiz` structured data to your flashcard pages. Adding structured data makes
 your content eligible to appear in the Q&A carousel in Google Search results,
 Google Assistant, and Google Lens results.
 

 
 
 The following page types are eligible for the education Q&A carousel:
 

 
 
- Flashcard page: A page that contains flashcards that typically have a question on
 one side and an answer on the other side. To mark up flashcard pages, continue reading
 this guide to learn [how to add education Q&A schema](https://developers.google.com#add-structured-data).
 
- Single Q&A page: A page that only contains one question and is followed by
 user-submitted answers. To mark up single Q&A pages, add
 [`QAPage` markup](https://developers.google.com/search/docs/appearance/structured-data/qapage) instead.
 

 
## Feature availability

 
 The education Q&A carousel is only available when searching for education-related topics on desktop
 and mobile. For example, try searching for queries like "the measure of
 three angles of a quadrilateral are 80 90 and 103 degrees" or "the
 ratio of surface energy to surface area is".
 

 
 The education Q&A carousel is available in the following languages and regions:
 

 
 
 Language | 
 Available regions | 
 

 
 
 English
 | 
 
 All regions where Google Search is available
 | 
 

 
 Portuguese | 
 
 All regions where Google Search is available
 | 
 

 
 
 Spanish
 | 
 
 Mexico
 | 
 

 
 
 Vietnamese
 | 
 
 All regions where Google Search is available
 | 
 

 

 
 
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

 
 Here's an example of a flashcard page with education Q&A structured data.
 

 
 
 <html>
 <head>
 <title>Cell Transport</title>
 <script type="application/ld+json">
 {
 "@context": "https://schema.org/",
 "@type": "Quiz",
 "about": {
 "@type": "Thing",
 "name": "Cell Transport"
 },
 "educationalAlignment": [
 {
 "@type": "AlignmentObject",
 "alignmentType": "educationalSubject",
 "targetName": "Biology"
 }
 ],
 "hasPart": [
 {
 "@context": "https://schema.org/",
 "@type": "Question",
 "eduQuestionType": "Flashcard",
 "text": "This is some fact about receptor molecules.",
 "acceptedAnswer": {
 "@type": "Answer",
 "text": "receptor molecules"
 }
 },
 {
 "@context": "https://schema.org/",
 "@type": "Question",
 "eduQuestionType": "Flashcard",
 "text": "This is some fact about the cell membrane.",
 "acceptedAnswer": {
 "@type": "Answer",
 "text": "cell membrane"
 }
 }
 ]
 }
 </script>
 </head>
</html>
 
 

 

```
<html>
 <head>
 <title>Cell Transport</title>
 <script type="application/ld+json">
 {
 "@context": "https://schema.org/",
 "@type": "Quiz",
 "about": {
 "@type": "Thing",
 "name": "Cell Transport"
 },
 "educationalAlignment": [
 {
 "@type": "AlignmentObject",
 "alignmentType": "educationalSubject",
 "targetName": "Biology"
 }
 ],
 "hasPart": [
 {
 "@context": "https://schema.org/",
 "@type": "Question",
 "eduQuestionType": "Flashcard",
 "text": "This is some fact about receptor molecules.",
 "acceptedAnswer": {
 "@type": "Answer",
 "text": "receptor molecules"
 }
 },
 {
 "@context": "https://schema.org/",
 "@type": "Question",
 "eduQuestionType": "Flashcard",
 "text": "This is some fact about the cell membrane.",
 "acceptedAnswer": {
 "@type": "Answer",
 "text": "cell membrane"
 }
 }
 ]
 }
 </script>
 </head>
</html>
```

 
## Guidelines

 For your page to be eligible for the education Q&A rich result, you must follow these guidelines:

 
 
- [General structured data guidelines](https://developers.google.com/search/docs/appearance/structured-data/sd-policies)
 
- [Search Essentials](https://developers.google.com/search/docs/essentials)
 
- [Technical guidelines](https://developers.google.com#technical-guidelines)
 
- [Content guidelines](https://developers.google.com#content-guidelines)
 

 
### Technical guidelines

 
 
- Put structured data on the most detailed leaf page possible. Don't add structured data to pages without questions.
 
- All questions must use the `Flashcard` value for the `eduQuestionType` property.
 Pages that contain other question types are not eligible for the education Q&A carousel.

 
- 
 Ensure that Googlebot can
 [crawl your site efficiently](https://developers.google.com/search/docs/crawling-indexing/troubleshoot-crawling-errors#improve_crawl_efficiency).
 
 
- The questions on your site should be immediately visible to users on the page, meaning that the questions aren't held only
 in a data file or PDF.
 
- If your page has only one question followed by several user-submitted answers, use
 [`QAPage` markup](https://developers.google.com/search/docs/appearance/structured-data/qapage) instead.
 

 
### Content guidelines

 
 We created these education Q&A content guidelines to ensure that our users are connected with
 learning resources that are relevant. If we find content that violates these guidelines, we'll
 respond appropriately, which may include taking [manual action](https://support.google.com/webmasters/answer/9044175)
 and not displaying your content in the education Q&A rich result on Google.
 

 
 
- Education Q&A pages must follow the [same content guidelines for Q&A pages](https://developers.google.com/search/docs/appearance/structured-data/qapage#content-guidelines).
 
- Your page must contain education related questions and answers. There must be at least one
 question and answer pairing on your page, and the answer must be related to and answer the
 user's question.
 
- You are responsible for the accuracy and quality of your education Q&A pages through this
 feature. If a certain amount of your content is found to be inaccurate based on quality
 and pedagogical review processes, then all or a subset of your Q&A pages may not be
 eligible for this feature until you resolve the issues.
 

 
## Mark up educational standards

 
 Learning standards are the learning goals for what students should know and be able to do at
 each grade level. Learning standards have multiple uses, such as linking to content or making
 up a part of a learning progression. Marking up the standards (found under the
 [`educationalAlignment`](https://developers.google.com#educational-alignment) field) associated with online learning
 material helps Google organize and surface the information in the most useful way to people
 who may Search for learning content based on these standards. Here's a high-level overview of the schema:
 

 
 Here are a few examples of standards:
 

 
 
- Common Core State Standards
 
- Texas Essential Knowledge and Skills (TEKS)
 
- Virginia Standards of Learning (SOL)
 
- BC Performance Standards
 
- Alberta Programs of Studies
 
- The Australian Curriculum (ACARA)
 
- The Victorian Curriculum (F-10)
 
- UK National Curriculum
 

 
## Structured data type definitions

 
 You must include the required properties for your content to be eligible for display as a rich
 result. You can also include the recommended properties to add more information about your
 content, which could provide a better user experience.
 

 
### Quiz

 
 A `Quiz` is a set of flashcards (one or more), which are typically about the same concept or subject.
 

 
 The full definition of [Quiz](https://schema.org/Quiz) is provided on schema.org.
 The Google-supported properties are the following:
 

 
 
 
 Required properties | 

 
 
 
 `hasPart` | 
 `[Question](https://schema.org/Question)`

 Nested information about the specific flashcard question for the quiz. Use one `hasPart`
 property to represent a single flashcard.

 
 To include multiple flashcards, repeat this property.
 

 

```
{
 "@type": "Quiz",
 "hasPart": {
 "@type": "Question"
 }
}
```

 | 
 

 
 

 
 
 
 Recommended properties | 

 
 
 
 `about` | 
 `[Thing](https://schema.org/Thing)`

 Nested information about the underlying concept behind the `Quiz`. 

 

```
{
 "@type": "Quiz",
 "about": {
 "@type": "Thing"
 }
}
```

 | 
 

 
 `about.name` | 
 `[Text](https://schema.org/Text)`

 Nested information about the underlying concept behind the `Quiz`. Multiple entries of this property are allowed.

 

```
{
 "@type": "Quiz",
 "about": {
 "@type": "Thing",
 "name": "Cell transport"
 }
}
```

 | 
 

 
 `educationalAlignment` | 
 `[AlignmentObject](https://schema.org/AlignmentObject)`

 The quiz's alignment to an established educational framework. This property can be repeated
 to align the quiz with a field of study or domain, and the target grade or
 [educational standard](https://developers.google.com#mark-up-educational-standards).

 

```
{
 "@type": "Quiz",
 "educationalAlignment": []
}
```

 | 
 

 
 `educationalAlignment.alignmentType` | 
 `[Text](https://schema.org/Text)`

 A category of alignment between the learning resource and the framework node for the quiz.
 Google Search uses the [LRMI standard](https://www.dublincore.org/specifications/lrmi/lrmi_1/).

 
 Repeat the `alignmentType` property to specify both the field of study and the target grade or educational standard.
 

 
 
- To specify the field of study or domain of the quiz, set the `alignmentType` property to the `educationalSubject` value.
 
- To specify the target grade or educational standard of the quiz, set the `alignmentType` property to the `educationalLevel` value.
 

 
 Here's how to specify both the `educationalSubject` and `educationalLevel` properties.
 

 

```
{
 "@type": "Quiz",
 "educationalAlignment": [
 {
 "@type": "AlignmentObject",
 "alignmentType": "educationalSubject",
 "targetName": "Biology"
 },
 {
 "@type": "AlignmentObject",
 "alignmentType": "educationalLevel",
 "targetName": "Fifth grade"
 }

 ]
}
```

 | 
 

 
 `educationalAlignment.targetName` | 
 `[Text](https://schema.org/Text)`

 The name of a node of an established educational framework. For example: "Grade 7: Cell Structure". 

 

```
{
 "@type": "Quiz",
 "educationalAlignment": [
 {
 "@type": "AlignmentObject",
 "targetName": "Grade 7: Cell Structure"
 }
 ]
}
```

 | 
 

 
 

 
### Question

 
 Each question corresponds to one flashcard, nested under the `hasPart` property of
 [`Quiz`](https://schema.org/Quiz). Note that these `Question` requirements are different from the
 [Question requirements for `QAPage`](https://developers.google.com/search/docs/appearance/structured-data/qapage#question).
 
 The full definition of [Question](https://schema.org/Question)
 is provided on schema.org. The Google-supported properties are the following:
 

 
 
 
 Required properties | 

 
 
 
 `acceptedAnswer` | 
 `[Answer](https://schema.org/Answer)`

 The full text of the answer to a flashcard. There must only be one `acceptedAnswer`
 property per `Question` type.

 

```
{
 "@type": "Question",
 "acceptedAnswer": {
 "@type": "Answer",
 "text": "cell membranes"
 }
}
```

 | 
 

 
 `eduQuestionType` | 
 `[Text](https://schema.org/Text)`

 The type of question. You must use this fixed value: `Flashcard`.

 

```
{
 "@type": "Question",
 "eduQuestionType": "Flashcard”
}
```

 | 
 

 
 `text` | 
 `[Text](https://schema.org/Text)`

 The full text of the flashcard question.

 

```
{
 "@type": "Question",
 "text": "A protein on the surface of HIV can attach to proteins on the surface of healthy human cells. What are the attachment sites on the surface of the cells known as?"
}
```

 | 
 

 
 

 

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
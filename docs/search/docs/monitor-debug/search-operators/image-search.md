---
source: https://developers.google.com/search/docs/monitor-debug/search-operators/image-search
title: "Google Images Search Operators"
fetched: 2026-07-08
---

# Google Images search operators

 

 Similarly to web search, Google Images supports dedicated search operators, namely
 `src:` and `imagesize:`. These operators only work on Google Images;
 they have no effect on other Google properties.

## `src:` search operator

 The `src:` search operator returns pages that reference the image URL in the `src` attribute
 that's provided in the operator. For example:

```
src:https://example.com/media/carrot.jpg
```

 The operator returns pages from any domain, not just the domain of the URL specified in the
 operator. This may be helpful to learn which images you're hosting on your site are
 [hotlinked](https://en.wikipedia.org/wiki/Hotlink) by other sites.

## `imagesize:` search operator

 The `imagesize:` search operator returns images of the dimension specified in the
 operator. You must specify the dimension in width `x` height format. For example:

```
imagesize:1500x1000
```

 This operator can be helpful in conjunction with the `src:` and `site:`
 operator. For example, you can find an image of a certain size that was indexed on your site:

```
src:https://example.com/media/carrot.jpg imagesize:500x1200
```

 Using `imagesize:` with the `site:` operator, you can find images of the
 exact size:

```
site:https://example.com/ imagesize:500x1200
```

## Limitations

 Because image search operators are bound by indexing and retrieval limits, you might not see
 all of the results that may appear for a standard search query.

 
 
 
 

 
 
 

 
 
 
 
 
 
 
 
 

 
 
 
 Send feedback
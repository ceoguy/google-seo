---
source: https://developers.google.com/search/docs/crawling-indexing/indexable-file-types
title: "File Types Indexable by Google"
fetched: 2026-07-08
---

# File types indexable by Google

 

 Google can index the content of most text-based files and certain encoded document formats. The
 file type is determined by the `Content-Type` HTTP header returned when Google
 crawls the file, though in some cases Google may use the file extension or re-parse the file using
 a different parser if the `Content-Type` header is missing or incorrect.

## Supported flat file types

 The following flat file types are supported. These are files where the content is stored in plain,
 unencoded text (though they may use markup tags).

 
- Comma-Separated Values (.csv)
 
- Google Earth (.kml, .kmz)
 
- GPS eXchange Format (.gpx)
 
- HTML (.htm, .html, other file extensions)
 
- Scalable Vector Graphics (.svg)
 
- TeX/LaTeX (.tex)
 
- 
 Text (.txt, .text, other file extensions), including source code in common programming
 languages, such as:
 
 
- Basic source code (.bas)
 
- C/C++ source code (.c, .cc, .cpp, .cxx, .h, .hpp)
 
- C# source code (.cs)
 
- Java source code (.java)
 
- Perl source code (.pl)
 
- Python source code (.py)
 

 
 
- Wireless Markup Language (.wml, .wap)
 
- XML (.xml)

## Supported encoded file types

 The following encoded file types are supported. These are binary files or complex containers that
 require a specific parser to extract the human-readable text.

 
- Adobe Portable Document Format (.pdf)
 
- Adobe PostScript (.ps)
 
- Electronic Publication (.epub)
 
- Hancom Hanword (.hwp)
 
- Microsoft Excel (.xls, .xlsx)
 
- Microsoft PowerPoint (.ppt, .pptx)
 
- Microsoft Word (.doc, .docx)
 
- OpenOffice presentation (.odp)
 
- OpenOffice spreadsheet (.ods)
 
- OpenOffice text (.odt)
 
- Rich Text Format (.rtf)

## Supported media formats

 Google can also index the following media formats:

 
- 
 Image formats: BMP, GIF, JPEG, PNG, WebP, SVG, and AVIF
 
 
- 
 Video formats: 3GP, 3G2, ASF, AVI, DivX, M2V, M3U, M3U8, M4V, MKV, MOV, MP4, MPEG, OGV, QVT, RAM, RM, VOB, WebM, WMV, and XAP
 

## Search by file type

 You can use the `filetype:` operator in Google Search to limit results to a
 specific file type or file extension. For example,
 `[filetype:rtf galway](https://www.google.com/search?q=filetype:rtf+galway)`
 will search for RTF files and URLs ending in `.rtf` whose content contains the term
 "galway".

 
 
 
 

 
 
 

 
 
 
 
 
 
 
 
 

 
 
 
 Send feedback
---
title: Front matter reference
slug: front-matter
date: 2026-03-28T23:52:00+08:00
excerpt: A compact reference for page-level options supported by Hugo Linen.
categories: Reference
tags: [front-matter, reference]
series: Theme Guide
appendRawMarkdown: true
tocType: flat
customComments:
  - text: "inline note"
    comment: "This text uses the customComments front matter option."
---

## Common fields

```yaml {title="Post front matter"}
title: Front matter reference
date: 2026-03-28T23:52:00+08:00
excerpt: A short summary for cards, feeds, and metadata.
categories: Reference
tags: [front-matter, reference]
series: Theme Guide
cover: /linen-theme/img/pattern-randomized.jpg
appendRawMarkdown: true
tocType: flat
```

`excerpt` controls card summaries. `cover` and `thumbnail` provide visual context. `series` connects posts into a series taxonomy.

## Visibility controls

```yaml {title="Hide from lists"}
hide:
  recent: true
  archive: true
```

These options hide a post from the homepage latest list or archive counts while keeping the page available at its permalink.

## Inline comments

This sentence contains an inline note that appears on hover.

```yaml {title="customComments"}
customComments:
  - text: "inline note"
    comment: "This text uses the customComments front matter option."
```

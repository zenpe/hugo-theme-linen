---
title: Highlighted posts
slug: highlighted-posts
date: 2026-03-28T23:57:00+08:00
excerpt: Use the homepage highlight area to keep important posts visible.
categories: Features
tags: [homepage, configuration]
thumbnail: /linen-theme/img/pattern-randomized.jpg
series: Theme Guide
appendRawMarkdown: true
---

The homepage can show one large feature card and three smaller cards before the latest-post list. This is useful for onboarding articles, changelogs, or evergreen writing.

Configure the list with page references:

```toml {title="hugo.toml"}
[params]
  topArticles = [
    "posts/getting-started",
    "posts/configuration-guide",
    "posts/write-with-markdown",
    "posts/image-grid"
  ]
```

If an entry cannot be resolved, the theme ignores it and continues with the remaining posts. Keep the list short and intentional; the layout is optimized for four valid items.

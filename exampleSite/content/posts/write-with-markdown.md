---
title: Write with Markdown
slug: write-with-markdown
date: 2026-03-28T23:56:00+08:00
excerpt: Markdown examples for headings, lists, blockquotes, tables, code, and footnotes.
categories: Writing
tags: [markdown, typography]
thumbnail: /linen-theme/img/pattern-randomized.jpg
series: Theme Guide
appendRawMarkdown: true
tocType: flat
---

Markdown remains the fastest way to author posts in Hugo. This page demonstrates common patterns in Hugo Linen.

## Lists

1. Start with a direct point.
2. Keep each item focused.
3. Use paragraphs after lists when the point needs more context.

- Tags support discovery.
- Categories support broad grouping.
- Series support ordered reading.

## Code

```go {title="hello.go"}
package main

import "fmt"

func main() {
    fmt.Println("Hello, Hugo Linen")
}
```

```toml {title="hugo.toml folded"}
[params]
  photoswipe = true
  lazyload = true
```

## Table

| Feature | Purpose |
| --- | --- |
| Archives | Browse by year, category, tag, and series |
| Raw Markdown | Compare rendered content with the source |
| PhotoSwipe | Open content images in a lightbox |

## Footnote

Hugo renders footnotes through Goldmark.[^goldmark]

[^goldmark]: Goldmark is Hugo's default Markdown renderer.

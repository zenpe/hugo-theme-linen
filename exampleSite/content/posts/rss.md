---
title: RSS feed
slug: rss
date: 2026-03-28T23:54:00+08:00
excerpt: Configure the feed path, item limit, and feed icon.
categories: Features
tags: [rss, configuration]
series: Theme Guide
appendRawMarkdown: true
---

Hugo Linen uses Hugo's RSS output and adds a themed XSL stylesheet for a more readable browser view.

Enable RSS output in the site configuration:

```toml {title="hugo.toml"}
[outputs]
  home = ["HTML", "RSS"]
  section = ["HTML", "RSS"]
  taxonomy = ["HTML", "RSS"]
  term = ["HTML", "RSS"]
```

Then configure the feed metadata:

```toml {title="hugo.toml"}
[params.feed]
  path = "/index.xml"
  limit = 10
  icon = "/linen-theme/favicon.svg"
```

The feed link in the header uses `params.feed.path`, so it can point to Hugo's default `/index.xml` or to a custom output filename.

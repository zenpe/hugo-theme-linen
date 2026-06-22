---
title: Configuration guide
slug: configuration-guide
date: 2026-03-28T23:58:00+08:00
excerpt: Configure navigation, the site card, highlighted posts, lazy images, and RSS.
categories: Setup
tags: [setup, configuration]
thumbnail: /linen-theme/img/related-post.jpg
series: Theme Guide
appendRawMarkdown: true
tocType: flat
---

## Site identity

Most visible site information lives under `params`. The example below configures the logo, author card, navigation, and feed path.

```toml {title="hugo.toml"}
[params]
  description = "A quiet site for notes and essays."
  photoswipe = true
  lazyload = true

  [[params.navItems]]
    name = "Archives"
    path = "/archives/"

  [params.logo]
    src = "/linen-theme/img/logo.svg"
    width = 225
    height = 42

  [params.info]
    name = "Hugo Linen"
    avatar = "/linen-theme/img/vue-color-avatar.png"
    site_desc = "Readable posts, calm spacing, and useful archives."

  [params.feed]
    path = "/index.xml"
    limit = 10
```

## Minimal site configuration

This is a compact starting point for a new site using Hugo Linen.

```toml {title="hugo.toml"}
baseURL = "https://example.org/"
languageCode = "en"
title = "My Linen Site"
theme = "hugo-theme-linen"
summaryLength = 36
hasCJKLanguage = true

[pagination]
  pagerSize = 6

[taxonomies]
  tag = "tags"
  category = "categories"
  series = "series"

[markup]
  [markup.goldmark]
    [markup.goldmark.renderer]
      unsafe = true
  [markup.highlight]
    codeFences = true
    noClasses = false

[params]
  description = "Notes, essays, and photo-friendly posts."
  photoswipe = true
  lazyload = true

  [params.logo]
    text = "My Linen Site"
    width = 225
    height = 42

  [params.info]
    name = "My Linen Site"
    avatar = "/linen-theme/img/vue-color-avatar.png"
    site_desc = "Readable posts with calm spacing."
```

## Highlighted articles

`params.topArticles` controls the four highlighted cards at the top of the homepage. Entries can be page references or post slugs.

```toml {title="hugo.toml"}
[params]
  topArticles = [
    "posts/getting-started",
    "posts/configuration-guide",
    "posts/write-with-markdown",
    "posts/image-grid"
  ]
```

The homepage skips these highlighted posts in the latest list so readers see a broader mix of content.

## Lazy loading and PhotoSwipe

Images are rendered through Hugo's image render hook. When `params.lazyload` is enabled, images use the theme's placeholder and loading states. When `params.photoswipe` is enabled, content images can open in the PhotoSwipe lightbox.

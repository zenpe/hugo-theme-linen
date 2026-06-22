---
title: Getting started
slug: getting-started
date: 2026-03-28T23:59:00+08:00
excerpt: Install Hugo Linen, enable the theme, and start a small writing site.
categories: Setup
tags: [setup, hugo]
thumbnail: /linen-theme/img/pattern-randomized.jpg
series: Theme Guide
appendRawMarkdown: true
tocType: flat
---

## Create a Hugo site

Hugo Linen is designed for a regular Hugo site with Hugo Extended enabled. Start with a new site or add the theme to an existing project.

```powershell {title="Create a site"}
hugo new site my-linen-site
cd my-linen-site
```

Install the theme as a Git submodule:

```powershell {title="Install the theme"}
git submodule add https://github.com/zenpe/hugo-theme-linen themes/hugo-theme-linen
```

Set the theme name in your site configuration:

```toml {title="hugo.toml"}
theme = "hugo-theme-linen"
```

## Enable the essentials

The theme uses Hugo taxonomies for tags, categories, and series. A compact starting configuration looks like this:

```toml {title="hugo.toml"}
[taxonomies]
  tag = "tags"
  category = "categories"
  series = "series"

[params]
  photoswipe = true
  lazyload = true
```

## Add your first post

Create a post with a title, date, excerpt, and optional cover image.

```markdown {title="content/posts/hello.md"}
---
title: "Hello Linen"
date: 2026-03-28T12:00:00+08:00
excerpt: "A short introduction to the site."
tags: [journal]
---

Write a concise opening paragraph, then let the typography do the rest.
```

Continue with [Configuration guide](/configuration-guide/) to tune the homepage, site card, feed, and navigation.

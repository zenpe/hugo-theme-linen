---
title: Comments
slug: comments
date: 2026-03-28T23:53:00+08:00
excerpt: Wire Gitalk into the theme when your site needs comments.
categories: Features
tags: [comments, gitalk]
series: Theme Guide
appendRawMarkdown: true
---

The theme includes Gitalk integration hooks, but the example site keeps comments disabled. A real site should provide its own GitHub OAuth application and repository settings.

```toml {title="hugo.toml"}
[params.comment]
  enable = false
  client_id = ""
  client_secret = ""
  repo = ""
  owner = ""
  admin = ""
  pager_direction = "last"
```

When comments are disabled, the theme simply skips the comment container. This keeps the example site buildable without external credentials.

---
title: Images and lightbox
slug: image-grid
date: 2026-03-28T23:55:00+08:00
excerpt: Use Markdown images, lightbox previews, and the image-grid shortcode.
categories: Features
tags: [images, shortcode]
thumbnail: /linen-theme/img/pattern-randomized.jpg
series: Theme Guide
appendRawMarkdown: true
tocType: flat
---

Hugo Linen renders Markdown images with lazy loading and PhotoSwipe support. Single images work as normal article media, while the `image-grid` shortcode groups related images into compact visual sequences.

## Markdown image

![Single landscape image](/img/image-grid/landscape-1.svg)

## Landscape grid

{{< image-grid "landscape" >}}
![Wide panel](/img/image-grid/landscape-1.svg)
![Wide blocks](/img/image-grid/landscape-2.svg)
{{< /image-grid >}}

## Portrait grid

{{< image-grid "portrait" >}}
![Tall card](/img/image-grid/portrait-1.svg)
![Tall hills](/img/image-grid/portrait-2.svg)
![Tall leaf](/img/image-grid/portrait-3.svg)
{{< /image-grid >}}

## Mixed ratios

The shortcode supports `r73`, `r37`, `r64`, and `r46` for two-image mixed layouts.

{{< image-grid "r73" >}}
![Wide sample](/img/image-grid/landscape-1.svg)
![Tall sample](/img/image-grid/portrait-2.svg)
{{< /image-grid >}}

{{< image-grid "r37" >}}
![Tall sample](/img/image-grid/portrait-1.svg)
![Wide sample](/img/image-grid/landscape-2.svg)
{{< /image-grid >}}

## Unknown-size images

External or migrated image URLs may not have dimensions available during the Hugo build. The theme measures those images in the browser before PhotoSwipe opens them.

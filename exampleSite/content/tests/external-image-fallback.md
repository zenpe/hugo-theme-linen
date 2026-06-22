---
title: External image fallback test
slug: external-image-fallback
date: 2026-03-29T00:01:00+08:00
excerpt: Maintainer test for PhotoSwipe fallback dimensions on unknown-size images.
appendRawMarkdown: false
tocType: flat
---

This page is a maintenance check for migrated or external images whose dimensions are not available during the Hugo build. It is intentionally kept out of the homepage, archives, and Theme Guide.

The examples below use local static assets rendered as unknown-size images, so the test is network-independent while still exercising the same front-end fallback used by remote URLs.

## Landscape fallback

{{< demo-remote-image src="/img/image-grid/landscape-1.svg" alt="Unknown-size landscape image" ratio="1600/900" >}}

## Portrait fallback

{{< demo-remote-image src="/img/image-grid/portrait-1.svg" alt="Unknown-size portrait image" ratio="900/1200" fitHeight="56svh" >}}

Click each image to verify that the browser measures the asset and updates PhotoSwipe before opening.

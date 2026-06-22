# Third-Party Notices

This theme ports and adapts the original Linen theme for Hugo. The main project
is distributed under the MIT License; bundled third-party code and assets remain
under their respective upstream licenses.

| Component | Files | Upstream | License | Notes |
| --- | --- | --- | --- | --- |
| hexo-theme-linen | theme layouts, styles, scripts, icons, and demo assets adapted from Linen | https://github.com/LynanBreeze/hexo-theme-linen | MIT | Original Hexo theme by LynanBreeze. Hugo Linen keeps attribution in `README.md`, `theme.toml`, and `LICENSE`. |
| PhotoSwipe 5.4.4 | `static/linen-theme/js/photoswipe/photoswipe.esm.min.js`, `static/linen-theme/js/photoswipe/photoswipe-lightbox.esm.min.js`, `static/linen-theme/css/photoswipe.css` | https://github.com/dimsemenov/photoswipe | MIT | Bundled for gallery/lightbox support. |
| PhotoSwipe Dynamic Caption Plugin | `static/linen-theme/js/photoswipe/photoswipe-dynamic-caption-plugin.esm.js`, `static/linen-theme/css/photoswipe-dynamic-caption-plugin.css` | https://github.com/dimsemenov/photoswipe-dynamic-caption-plugin | MIT | Bundled for PhotoSwipe captions. |
| Gitalk 1.7.2 | `static/linen-theme/js/gitalk/gitalk.min.js`, `static/linen-theme/js/gitalk/gitalk.css` | https://github.com/gitalk/gitalk | MIT | Bundled comment component. The distributed bundle includes its own compiled dependencies. |
| fast-blurhash 1.1.2 | `static/linen-theme/js/lazyload.js` | https://github.com/mad-gooze/fast-blurhash | ISC | The local file header identifies jsDelivr's minified `/npm/fast-blurhash@1.1.2/index.js`. |
| BlurHash algorithm | `static/linen-theme/js/lazyload.js` | https://blurha.sh/ | MIT | Used through the fast-blurhash decoder implementation for image placeholders. |
| Source Han Serif | `static/linen-theme/fonts/SourceHanSerifSC-Regular.woff2` | https://github.com/adobe-fonts/source-han-serif | SIL Open Font License 1.1 | Bundled web font. Keep the font license notice when redistributing. |
| Source Serif | `static/linen-theme/fonts/SourceSerif4-Regular.ttf.woff2` | https://github.com/adobe-fonts/source-serif | SIL Open Font License 1.1 | Bundled web font. Keep the font license notice when redistributing. |
| Tailwind CSS | `static/linen-theme/css/rss-en.xsl`, `static/linen-theme/css/rss-zh.xsl` | https://github.com/tailwindlabs/tailwindcss | MIT | RSS XSL styles contain a generated Tailwind CSS header. |

The same files may also exist under `assets/linen-theme/` so Hugo Pipes can
process them. Treat those copies as the same bundled third-party materials.

Before a release, re-check this list if any bundled JavaScript, CSS, fonts, or
image assets are replaced or updated.

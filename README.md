# Hugo Linen

Hugo Linen is a Hugo port/adaptation of [hexo-theme-linen](https://github.com/LynanBreeze/hexo-theme-linen), originally created by LynanBreeze. It keeps the Linen reading experience while using Hugo layouts, taxonomies, shortcodes, RSS output, and example-site conventions.

## Requirements

- Hugo Extended `0.163.2` or newer

## Try the Example Site

```powershell
hugo --source exampleSite --themesDir ../..
hugo server --source exampleSite --themesDir ../.. --bind 127.0.0.1 --port 1313
```

Open `http://127.0.0.1:1313/`.

## Install

```powershell
git submodule add https://github.com/zenpe/hugo-theme-linen themes/hugo-theme-linen
```

Set the theme name in your site configuration:

```toml
theme = "hugo-theme-linen"
```

## Supported Options

The theme reads the equivalent settings from `params` in `hugo.toml`:

- `params.logo`
- `params.info`
- `params.navItems`
- `params.topArticles`
- `params.feed`
- `params.siteOriginLocaleMap`
- `params.rawMarkdownSourceDir`
- `params.comment`
- `params.photoswipe`
- `params.lazyload`
- `params.moments.paginate`

Supported page front matter includes `cover`, `coverInfo`, `thumbnail`, `excerpt`, `series`, `tags`, `categories`, `appendRawMarkdown`, `tocType`, `customComments`, `translations`, `hide.recent`, `hide.archive`, `donates`, `sponsors`, `ageWarning`, and `copyright`.

## Notes

`series` is implemented as a Hugo taxonomy. `image-grid` is implemented as a shortcode:

```markdown
{{</* image-grid "landscape" */>}}
![](/img/example-a.jpg)
![](/img/example-b.jpg)
{{</* /image-grid */>}}
```

When `appendRawMarkdown` is enabled, the theme shows `.RawContent` by default. Set `params.rawMarkdownSourceDir` only when you need to display preserved source Markdown files instead of the converted Hugo content.

## Moments

`Moments` is an optional short-form content stream separate from posts and archives. The recommended content structure is year/month based:

```text
content/moments/_index.md
content/moments/2026/_index.md
content/moments/2026/06/_index.md
content/moments/2026/06/my-note.md
```

The main `/moments/` page shows recent moments with `Older moments` / `Newer moments` pagination. Month pages such as `/moments/2026/06/` show all moments in that month. Year pages such as `/moments/2026/` are supported and show all moments from that year.

Configure the main stream page size with:

```toml
[params.moments]
  paginate = 20
```

Moments render normal Markdown, including links, images, and `image-grid`. On list pages, PhotoSwipe groups images per moment item rather than across the whole page.

## Attribution

Original theme: [hexo-theme-linen](https://github.com/LynanBreeze/hexo-theme-linen) by LynanBreeze.

Hugo port and responsive adjustments: [zenpe/hugo-theme-linen](https://github.com/zenpe/hugo-theme-linen).

Bundled third-party assets and libraries are listed in [THIRD_PARTY_NOTICES.md](THIRD_PARTY_NOTICES.md).

# Runtime Components

本番で利用している UI コンポーネントの一覧です。

## Pages / Layouts

- `src/pages/index.astro`
- `src/pages/page/[p].astro`
- `src/pages/post/[slug].astro`
- `src/pages/tags/index.astro`
- `src/pages/tags/[tag].astro`
- `src/pages/404.astro`
- `src/layouts/Post.astro`

## Islands

- `src/islands/ButtonLinkIsland.astro`
- `src/islands/PaginationNavIsland.astro`
- `src/islands/PostItemIsland.astro`
- `src/islands/PostNavCardIsland.astro`
- `src/islands/TableOfContentsIsland.astro`
- `src/islands/TagListIsland.astro`

## Design System

### Primitives

- `Button`
- `ButtonLink`
- `Link`

### Patterns

- `PostItem`
- `TableOfContents`
- `PaginationNav`
- `PostNavCard`
- `TagList`

## Notes

- 非対話 UI は SSR のみで描画します。
- 対話 UI は `TableOfContents`（`client:idle`）のみです。

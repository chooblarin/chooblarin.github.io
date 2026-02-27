# Design System

## 方針
- 対話UIは React Island + Base UI で実装します。
- トークンは CSS 変数（`--ds-*`）を source of truth とします。
- Reactコンポーネントのクラス合成は `clsx`（`cn` ヘルパー）で統一します。
- バリアント管理は `class-variance-authority`（`cva`）で統一します。
- フォーカスリングは `:focus-visible` のときだけ表示します。
- フォーカスリングはアクセント紫・`1px`・`2px`オフセットを標準とします。

## 主要トークン
- `--ds-color-primary`
- `--ds-color-primary-inverted`
- `--ds-color-text`
- `--ds-color-text-muted`
- `--ds-color-background`
- `--ds-color-surface`
- `--ds-color-surface-muted`
- `--ds-color-border`
- `--ds-color-danger`
- `--ds-color-focus-ring`
- `--ds-focus-ring-width`
- `--ds-focus-ring-offset`
- `--ds-shadow-1`
- `--ds-shadow-2`
- `--ds-leading-body-ja`
- `--ds-leading-body-en`
- `--ds-leading-heading`
- `--ds-tracking-heading`

## コンポーネント
### Primitives
- `Button`
- `ButtonLink`
- `Link`

### Composites
- `PostItem`
- `TableOfContents`
- `PaginationNav`
- `PostNavCard`
- `TagList`

実装ディレクトリ:
- `src/design-system/react/components/`
- `src/design-system/react/components/*.module.css`
- `src/design-system/react/components/*.styles.ts`
- `src/design-system/react/composites/`
- `src/design-system/react/composites/*.module.css`
- `src/design-system/react/composites/*.styles.ts`
- `src/design-system/react/lib/cn.ts`

Astro ラッパー:
- `src/components/islands/ButtonIsland.astro`
- `src/components/islands/ButtonLinkIsland.astro`
- `src/components/islands/LinkIsland.astro`
- `src/components/islands/PostItemIsland.astro`
- `src/components/islands/TableOfContentsIsland.astro`
- `src/components/islands/PaginationNavIsland.astro`
- `src/components/islands/PostNavCardIsland.astro`
- `src/components/islands/TagListIsland.astro`

## Semantic API
- `ButtonProps`
  - `intent`: `brand | neutral | danger`
  - `appearance`: `solid | outline | ghost`
  - `size`: `sm | md`
  - `disabled`, `type`, `onClick`, `className`
- `ButtonLinkProps`
  - `href`, `external`
  - `intent`: `brand | neutral | danger`
  - `appearance`: `solid | outline | ghost`
  - `size`: `sm | md`
  - `className`
- `LinkProps`
  - `href`, `external`, `target`, `rel`
  - `intent`: `brand | muted | danger`
  - `decoration`: `always | hover | none`
  - `className`

## Composites API
- `PostItemProps`
  - `href`, `title`, `date`
  - `emphasis`: `default | subtle`
  - `className`
- `TableOfContentsProps`
  - `headings: Array<{ id; text; depth: 2 | 3 }>`
  - `activeTracking?: boolean`（default: `true`）
  - `maxDepth?: 2 | 3`（default: `3`）
  - `stickyTop?: number`（default: `128`）
  - `className`
- `PaginationNavProps`
  - `prevHref?`, `nextHref?`
  - `prevLabel?`, `nextLabel?`
  - `className`
- `PostNavCardProps`
  - `href`, `label?`, `title`, `date`
  - `className`
- `TagListProps`
  - `items: Array<{ label; href }>`
  - `variant`: `chip | plain`
  - `className`

## cva運用ルール
- 各コンポーネントに `*.styles.ts` を持ち、`VariantProps` をexportします。
- JSX側は `className={cn(componentVariants({...}), className)}` で統一します。
- CSS Modulesはコンポーネント内で完結させ、共通CSSプリミティブは作りません。

## Storybook
- 起動: `npm run storybook`
- ビルド: `npm run build-storybook`

Story ファイル:
- `src/design-system/react/components/*.stories.tsx`
- `src/design-system/react/composites/*.stories.tsx`

## Composites本番接続状況
- 本番接続済み:
  - `PostItem`（Home/List/Tag）
  - `TableOfContents`（Post）
  - `PostNavCard`（Post）
- Storybook管理のみ（現時点）:
  - `PaginationNav`
  - `TagList`

## Hydration方針
- 非対話Composites（`PostItem` / `PostNavCard`）はSSRのみで描画します。
- 対話・追従系（`TableOfContents`）のみ `client:idle` でhydrateします。

## 旧トーン回帰メモ
- 対象は `PostItem` / `TableOfContents` / `PostNavCard` の3コンポーネントのみ。
- 旧Astroの色・余白・ボーダー密度を優先して見た目を合わせます。
- ただし `:focus-visible` と `TableOfContents` のactive追従は維持します。

## 実運用ルール
- ページ遷移導線: `Link` または `ButtonLink`
- フォーム送信・明示アクション: `Button`
- CTA導線の段階導入では、`ButtonLinkIsland` を優先して適用します。

## 警告運用方針
- `npm run build-storybook` の警告は抑制せず、原因を修正して減らします。
- `Some chunks are larger than 500 kB` が出た場合は、分割・依存見直しを検討します。

## 次フェーズ候補
- `TagIndexList`
- `SiteHeaderBar`
- `PostListSection`
- `ArticleMetaHeader`

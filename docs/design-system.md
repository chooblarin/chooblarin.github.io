# Design System

## 方針

- UI の実装責務は `pages/layouts` → `islands` → `design-system` の3層に分離します。
- トークンは `--ds-*` を正規とし、`--color-*` は後方互換の非推奨 alias とします。
- React の class 合成は `cn`（`clsx`）で統一します。
- バリアント管理は `cva` で統一します。
- フォーカスリングは `:focus-visible` のみ表示します。

## ディレクトリ

- `src/design-system/react/primitives/`
- `src/design-system/react/patterns/`
- `src/design-system/react/lib/`
- `src/islands/`

## Primitives

- `Button`
- `ButtonLink`
- `Link`

`Button` / `ButtonLink` は `ActionControl.module.css` と `actionControlVariants.ts` を共有し、見た目とバリアント定義を共通化しています。

## Patterns

- `PostItem`
- `TableOfContents`
- `PaginationNav`
- `PostNavCard`
- `TagList`

## Runtime 接続

- `PostItem`: Home / page pagination / tag detail
- `TableOfContents`: post detail（`client:idle`）
- `PostNavCard`: post detail
- `PaginationNav`: page pagination
- `TagList`: tag index / post detail tag chips

## Hydration ポリシー

- 非対話コンポーネントは SSR のみ（`client:*` を付けない）。
- 対話コンポーネントのみ `client:*` を許可する。
- 現在 `client:*` を使うのは `TableOfContents`（active 追従）のみです。

## Storybook

- 起動: `npm run storybook`
- ビルド: `npm run build-storybook`
- stories: `src/design-system/react/**/*.stories.tsx`

## 運用ルール

- Primitive 追加時は `*.styles.ts` + `*.module.css` + `*.stories.tsx` をセットで追加します。
- Pattern 追加時は runtime 接続先（どのページ/レイアウトで使うか）を明記します。
- トークン追加時は `src/styles/tokens.css` を source of truth とします。

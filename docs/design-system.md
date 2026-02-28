# Design System

## 方針

- UI の実装責務は `pages/layouts` → `islands` → `design-system` の3層に分離します。
- 色トークンは `--ds-*` のみを正規とします（`--color-*` alias は廃止済みです）。
- 色値は `oklch(...)` で定義し、利用側は `var(--ds-color-*)` を直接参照します。
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
- `tokens.css` の配色更新は `--ds-color-*-light` / `--ds-color-*-dark` source token を編集し、公開トークン（`--ds-color-*`）は `light-dark(...)` を介して参照します。
- テーマ切り替えは `:root[data-theme="light" | "dark"]` を契約とし、未指定時はシステム設定（`color-scheme: light dark`）をデフォルトとして使用します。
- テーマ設定の永続化キーは `localStorage["theme-preference"]` を使用します（保存値は `"light" | "dark"`）。
- テーマランタイム（`data-theme` 反映、`localStorage` 永続化、`theme-color` メタ更新、`storage` 同期）は `BaseHead` が単独で担当します。
- `ThemeSwitcher` は UI 入力専用とし、`theme:select` 発火と `theme:changed` 反映のみを担当します。
- `--color-*` alias は廃止済みです。利用は禁止です。

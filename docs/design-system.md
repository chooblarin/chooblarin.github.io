# Design System

## 方針
- 対話UIは React Island + Base UI で実装します。
- トークンは CSS 変数（`--ds-*`）を source of truth とします。
- Reactコンポーネントのクラス合成は `clsx`（`cn` ヘルパー）で統一します。
- バリアント管理は `class-variance-authority`（`cva`）で統一します。
- フォーカスリングは `:focus-visible` のときだけ表示します。
- `Menu` / `Dialog` は現時点では Storybook 管理のみで、本番ページには導入しません。

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
- `--ds-shadow-1`
- `--ds-shadow-2`
- `--ds-leading-body-ja`
- `--ds-leading-body-en`
- `--ds-leading-heading`
- `--ds-tracking-heading`

## コンポーネント
- `Button`
- `ButtonLink`
- `Link`
- `Menu`
- `Dialog`

実装ディレクトリ:
- `src/design-system/react/components/`
- `src/design-system/react/components/*.module.css`
- `src/design-system/react/components/*.styles.ts`
- `src/design-system/react/lib/cn.ts`

Astro ラッパー:
- `src/components/islands/ButtonIsland.astro`
- `src/components/islands/LinkIsland.astro`
- `src/components/islands/MenuIsland.astro`
- `src/components/islands/DialogIsland.astro`

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
- `MenuProps` / `DialogProps`
  - 外部APIは互換維持（内部スタイルだけ `cva` 化）

## cva運用ルール
- 各コンポーネントに `*.styles.ts` を持ち、`VariantProps` をexportします。
- JSX側は `className={cn(componentVariants({...}), className)}` で統一します。
- CSS Modulesはコンポーネント内で完結させ、共通CSSプリミティブは作りません。

## Storybook
- 起動: `npm run storybook`
- ビルド: `npm run build-storybook`

Story ファイル:
- `src/design-system/react/components/*.stories.tsx`

## 実運用ルール
- ページ遷移導線: `Link` または `ButtonLink`
- フォーム送信・明示アクション: `Button`
- 既存ページへの段階導入では、まず `LinkIsland` でリンク見た目を統一します。

## 警告運用方針
- `npm run build-storybook` の警告は抑制せず、原因を修正して減らします。
- `Some chunks are larger than 500 kB` が出た場合は、分割・依存見直しを検討します。

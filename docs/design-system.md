# Design System

## 方針
- 対話UIは React Island + Base UI で実装します。
- トークンは CSS 変数（`--ds-*`）を source of truth とします。
- フォーカスリングは `:focus-visible` のときだけ表示します。

## 主要トークン
- `--ds-color-primary`
- `--ds-color-text`
- `--ds-color-background`
- `--ds-color-focus-ring`
- `--ds-leading-body-ja`
- `--ds-leading-body-en`
- `--ds-leading-heading`
- `--ds-tracking-heading`

## コンポーネント
- `Button`
- `Link`
- `Menu`
- `Dialog`

実装ディレクトリ:
- `src/design-system/react/components/`
- `src/design-system/react/styles.css`

Astro ラッパー:
- `src/components/islands/ButtonIsland.astro`
- `src/components/islands/LinkIsland.astro`
- `src/components/islands/MenuIsland.astro`
- `src/components/islands/DialogIsland.astro`

## Storybook
- 起動: `npm run storybook`
- ビルド: `npm run build-storybook`

Story ファイル:
- `src/design-system/react/components/*.stories.tsx`

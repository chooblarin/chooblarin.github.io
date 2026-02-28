# プロジェクト構成監査レポート（更新: 2026-02-28）

## 概要

- 構成は `Astro + Content Collections + React Design System + Storybook` です。
- 品質ゲートは `biome` / `textlint` / `content-lint` / `check:unused` / `build` を CI で実行します。
- URL 互換を最優先にしたまま、ディレクトリ再編と UI 責務の整理を実施済みです。

## 現在のアーキテクチャ

### UI の責務分離（3層）

1. `src/pages` / `src/layouts`  
   画面構成とデータ取得
2. `src/islands`  
   Astro と React の境界
3. `src/design-system/react`  
   再利用 UI
   - `primitives`
   - `patterns`

### ドメイン構成

- `src/domain/posts/query.ts`: 公開記事取得
- `src/domain/posts/tag.ts`: タグ正規化/集約
- `src/domain/posts/tag-taxonomy.json`: タグ辞書の単一ソース

## 変更サマリー

### 実装

- `src/components/islands` を `src/islands` へ移動。
- `src/design-system/react/components` を `primitives` へ移動。
- `src/design-system/react/composites` を `patterns` へ移動。
- `src/lib` を `src/domain/posts` へ分割移行。
- 未使用の旧 Astro 実装を削除。
  - `src/components/PostItem.astro`
  - `src/components/TableOfContents.astro`
- 非対話コンポーネントの不要 hydration を除去（SSR 化）。
- `PaginationNav` / `TagList` を本番接続。

### スタイル

- `src/styles/layout.css` を追加し、ページ共通レイアウトスタイルを集約。
- `src/styles/layouts/post.css` を追加し、`Post.astro` の巨大インラインCSSを分離。
- `src/styles/pages/404.css` を追加し、404 専用スタイルを分離。
- `--ds-*` を正規トークンとして運用し、`--color-*` は非推奨 alias 扱いへ整理。

### 運用・ガードレール

- `scripts/content-lint.mjs` を運用ルール専用に再編。
  - スキーマ検証は `content.config.ts` 側へ委譲
  - タグ辞書は `tag-taxonomy.json` から共有
- `scripts/check-unused-entries.mjs` を追加。
- CI に `npm run check:unused` を追加。

## 残課題（次フェーズ）

- `description` のスキーマ必須化は段階導入のまま（運用上必須）。
- `image` の実データ整備は非 archive 記事追加時に継続。
- 既存 `archive` 記事のタグ/埋め込み情報の段階移行。

## 受け入れ条件

- `npm run biome:check`
- `npm run textlint`
- `npm run content:lint:strict`
- `npm run check:unused`
- `npm run build`

上記がすべて成功し、既存 URL（post/tag/redirect）が維持されていること。

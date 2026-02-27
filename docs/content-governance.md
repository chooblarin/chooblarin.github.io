# コンテンツ運用ルール

## 対象範囲
この文書は `src/content/post` 配下の記事（`archive` 含む）と、関連する CI チェックの品質ルールを定義します。

## 記事配置ポリシー
- 既存記事は `src/content/post/archive/` で管理します。
- 新規記事は `src/content/post/` 直下に追加します。
- archive 記事も公開対象です。URL と slug は変更しません。

## Frontmatter ポリシー

### 必須（現時点）
- `title`
- `date`
- `tags`
- `slug`

### 運用上必須（7.2）、スキーマ必須化は後続
- `description`

### 推奨（7.2）
- `image`
- `embeds`（`twitter` / `codepen` のみ）
- `updatedAt`（更新日が公開日と異なる場合）
- 対象は新規記事（`src/content/post/` 直下など）です。
- `archive` 記事は移行コスト抑制のため、`image` 未設定警告の対象外とします。

### embeds の運用ルール
- 対象: Twitter埋め込み、CodePen埋め込みを含む記事です。
- frontmatter 指定形式:
  - `embeds: ["twitter"]`
  - `embeds: ["codepen"]`
  - `embeds: ["twitter", "codepen"]`
- 目的:
  - 記事に必要な外部スクリプトのみを読み込み、不要な通信と実行を減らします。
- 適用方針:
  - 新規記事では必ず明示します。
  - `archive` 記事は段階的に移行します。

### image の運用ルール
- 主用途: 記事詳細ページのサムネイル表示 + OG/Twitter 画像
- 配置先: `public/images/posts/`
- frontmatter 指定形式: `/images/posts/<file-name>.<ext>`
- 許可拡張子: `png` / `jpg` / `jpeg` / `webp` / `avif`
- 未設定時:
  - 記事詳細ページ: 画像ブロックを表示しない
  - OG/Twitter: `/og-default.png` を使用
- 命名例:
  - `20250104-thumb.webp`
  - `post-dark-mode-cover.png`

### 次フェーズ
- 7.4 で `description` を「運用上必須」から「スキーマ必須」へ移行します。

## slug ポリシー
- パターン: `^[a-z0-9]+(?:-[a-z0-9]+)*$`
- 許可例:
  - `dark-mode-support-for-nextjs`
  - `to-be-an-android-developer`
- 禁止例:
  - `forkJoin-in-rxjs-is-promiss-all`（camelCase）
  - `observable_is_my_friend`（underscore）
  - `job‐change`（Unicode ハイフン）

## slug 変更時のリダイレクト方針
- 既存 slug を変更する場合は、`astro.config.mjs` の `redirects` に必ず旧URL→新URLを追加します。
- ブックマークや検索流入を壊さないため、旧URLを到達可能な状態で維持します。
- `redirects` のキーは重複不可です。

## タグポリシー

### 正規タグ辞書（新規記事で使用）
- `algorithm`
- `Android`
- `Blog`
- `CSS`
- `D3.js`
- `Elixir`
- `GLSL`
- `Java`
- `JavaScript`
- `Machine Learning`
- `p5.js`
- `Rive`
- `RxJava`
- `RxJS`
- `RxSwift`
- `SVG`
- `Swift`
- `TensorFlow`

### 非推奨（lintで検出）
- `blog` → `Blog`
- `d3.js` → `D3.js`
- `svg` → `SVG`
- `Machine Leaning` → `Machine Learning`

### 適用範囲
- 正規タグ辞書チェックは新規記事（`src/content/post/` 直下）に適用します。
- `archive` 記事は履歴保全を優先し、段階移行対象とします。

## CI の段階導入ポリシー

### 現在（7.3）
- CI で `npm run content:lint:strict` を実行します。
- 判定:
  - `ERROR` または `WARN` で fail
- 補足:
  - `image` 未設定は非archive記事で `WARN`
  - `archive` 記事の `image` 未設定は警告対象外
  - `image` の形式不正（パス/拡張子）は `ERROR`
- CI で `npm run textlint` を実行します（blocking）。
- textlint の対象:
  - `docs/**/*.md`
  - `src/content/post/**/*.{md,mdx}`
- textlint は `.textlintignore` で `src/content/post/archive/` を除外します。
- textlint ルールは `preset-ja-technical-writing` を基準に運用します。
- 文体ポリシー:
  - 本文・箇条書きとも `ですます` 基準
- 例外ポリシー:
  - ルール無効化コメント（`textlint-disable` / `textlint-enable`）は原則使用しません。
  - 指摘は本文修正で解消し、やむを得ない例外はルール設定側で最小化して管理します。

### strict運用
- CI は `npm run content:lint:strict` を維持します。
- 判定:
  - `ERROR` または `WARN` で fail
- ただし `image` 未設定警告の対象範囲は非archive記事のみです。
- textlint は blocking を維持します。

## ローカル実行手順
1. `npm run textlint`
2. 必要に応じて `npm run textlint:fix`
3. `npm run content:fix:description`
4. `npm run content:lint`
5. `npm run build`

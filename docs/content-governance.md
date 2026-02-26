# コンテンツ運用ルール

## 対象範囲
この文書は `src/content/post` 配下の記事と、関連する CI チェックの品質ルールを定義します。

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

### image の運用ルール
- 主用途: 記事詳細ページのサムネイル表示 + OG/Twitter 画像
- 配置先: `public/images/posts/`
- frontmatter 指定形式: `/images/posts/<file-name>.<ext>`
- 許可拡張子: `png`, `jpg`, `jpeg`, `webp`, `avif`
- 未設定時:
  - 記事詳細ページ: 画像ブロックを表示しない
  - OG/Twitter: `/og-default.png` を使用
- 命名例:
  - `20250104-thumb.webp`
  - `post-dark-mode-cover.png`

### 次フェーズ
- 7.3 で `description` を「運用上必須」から「スキーマ必須」へ移行します。

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

## CI の段階導入ポリシー

### Stage 1（7.2）
- CI で `npm run content:lint` を実行します。
- 判定:
  - `ERROR` は fail
  - `WARN` は pass（ログに表示）
- 補足:
  - `image` 未設定は `WARN`
  - `image` の形式不正（パス/拡張子）は `ERROR`

### Stage 2（予定）
- CI を `npm run content:lint:strict` に切り替えます。
- 判定:
  - `ERROR` または `WARN` で fail

### strict 移行条件
- warning 件数が 0 になり、1リリースサイクル以上安定した時点で strict に移行します。

## ローカル実行手順
1. `npm run content:fix:description`
2. `npm run content:lint`
3. `npm run build`

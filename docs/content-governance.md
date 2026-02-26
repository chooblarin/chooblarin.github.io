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

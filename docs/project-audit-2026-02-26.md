# プロジェクト構成監査レポート（2026-02-26）

## 1. 対象範囲と前提
- 調査日: 2026-02-26
- 対象: リポジトリルート（`.`）のローカル現状
- 対象外:
  - 外部 SaaS 設定（Google Analytics 管理画面、Search Console 設定など）
  - 本番 CDN/Edge の配信設定
- 目的: 現状の構成を詳細に文書化し、課題・改善点・懸念点を優先度付きで整理する
- 本レポートではコード修正は行わず、監査結果の固定化に限定する

## 2. リポジトリ全体像

### 2.1 技術スタック
- フレームワーク: Astro 5 (`astro@^5.16.11`)
- UI 統合: Svelte 5 (`@astrojs/svelte`, `svelte`)
- コンテンツ: Astro Content Collections (`src/content/post`)
- 数式/Markdown 拡張: `remark-math`, `rehype-katex`, `@astrojs/mdx`
- 配信: GitHub Pages（Actions 経由）

### 2.2 主要ディレクトリ構成
- `src/pages`: 6ファイル（ルーティング定義）
- `src/layouts`: 1ファイル（投稿レイアウト）
- `src/components`: 9ファイル（共通UI）
- `src/content/post`: 32記事（`.md` 31件、`.mdx` 1件）
- `public`: 画像/動画/アイコン/KaTeX静的資産
- `.github/workflows`: デプロイワークフロー

### 2.3 規模感（実測）
- Git 管理ファイル数: 159
- `src/content/post` 記事数: 32
- 年別記事数:
  - 2015: 3
  - 2016: 3
  - 2017: 3
  - 2018: 9
  - 2019: 5
  - 2020: 2
  - 2021: 1
  - 2022: 1
  - 2023: 2
  - 2025: 1

## 3. アプリ構成（ルーティング/レイアウト/コンポーネント/コンテンツ）

### 3.1 ルーティング
- `/`: 最新5件表示（`src/pages/index.astro`）
- `/page/[p]`: 記事一覧ページネーション（10件/ページ）
- `/post/[slug]`: 記事詳細
- `/tags`: タグ一覧
- `/tags/[tag]`: タグ別記事一覧
- `/404`: カスタム404

### 3.2 レンダリングフロー
1. `getCollection("post")` で記事群を取得
2. 日付降順で並べ替え
3. 一覧ページ・タグページ・投稿ページを静的生成
4. 投稿ページは `src/layouts/Post.astro` に集約

### 3.3 レイアウト・コンポーネント設計
- 共通Head: `src/components/BaseHead.astro`
- 共通ヘッダー: `src/components/HomeHeader.astro`
- 共通フッター: `src/components/Footer.astro`
- 投稿一覧項目: `src/components/PostItem.astro`
- 目次: `src/components/TableOfContents.astro`
- MDX 内 Svelte 利用: `src/components/RiveAnim.svelte`

### 3.4 Content Collection スキーマ
- 定義ファイル: `src/content/config.ts`
- `post` スキーマ:
  - 必須: `title`, `date`, `tags`
  - 任意: `description`, `image`, `draft`
- 現状の運用実態:
  - `description`: 0件
  - `image`: 0件
  - `draft: true`: 0件

## 4. ビルド/デプロイ運用（ローカル・CI）

### 4.1 ローカル運用
- Node.js: `v24.7.0`（`.node-version`）
- スクリプト:
  - `npm run dev`
  - `npm run build` (`astro check && astro build`)
  - `npm run preview`

### 4.2 CI/CD（GitHub Actions）
- 定義: `.github/workflows/deploy.yml`
- トリガー:
  - `main` への push
  - `workflow_dispatch`
- 流れ:
  1. checkout
  2. setup-node（`.node-version`）
  3. `npm ci && npm run build`
  4. `dist` を Pages artifact として upload
  5. Pages deploy

### 4.3 ビルド実測（2026-02-26）
- `npm run build`: 成功
- `astro check`: error 0 / warning 0 / hint 2
- 生成ページ数: 58
- 確認されたヒント:
  - `src/layouts/Post.astro` の `prev`, `next` 未使用

## 5. コンテンツモデル監査（frontmatter・タグ・slug・資産）

### 5.1 Frontmatter 整合性
- 32記事すべてで `title/date/tags` は存在
- `description/image` は全記事未設定
- `draft` は全件 `false`

### 5.2 タグ運用の実態
- 主なタグ件数:
  - `JavaScript`: 11
  - `Blog`: 6
  - `blog`: 5
  - `Elixir`: 3
  - `Rive`: 2
- 大文字・小文字の揺れ:
  - `blog` と `Blog` が同時存在
- 影響:
  - `/tags/index.html` に `/tags/blog` へのリンクが重複出力
  - `/tags/blog` の内容が片系統（`Blog`側）に偏る

### 5.3 slug 運用の実態
- 非一貫例:
  - Unicode ハイフン: `job‐change`
  - snake_case: `observable_is_my_friend`, `to_be_an_android_developer`
  - camelCase 混在: `forkJoin-in-rxjs-is-promiss-all`
- リスク:
  - URL 正規化・検索・将来の移行時に事故を起こしやすい

### 5.4 静的資産の状況
- ディレクトリサイズ:
  - `public`: 約 8.6MB
  - `dist`: 約 12MB
- 大きい資産（上位）:
  - `public/video/20231202/rainy-window-effect.mp4` 約 2.09MB
  - `public/images/20211201/jleague-bar-chart-seekbar-demo.gif` 約 1.27MB
  - 動画ファイルが複数 0.88MB〜1.05MB

## 6. 問題一覧（Severity別）

| Severity | 問題 | 根拠 | 影響 | 推奨対応 | 想定工数 |
|---|---|---|---|---|---|
| Critical | タグ衝突と重複ルート生成 | `src/pages/tags/[tag].astro:12`, `src/pages/tags/index.astro:51`, `dist/tags/index.html:28` | 一部記事がタグ一覧から実質欠落し、情報探索性が落ちる | タグの正規化キーを導入し、表示名とURLスラグを分離して一意化 | 0.5〜1日 |
| High | `BaseHead` のアイコン参照が相対パス | `src/components/BaseHead.astro:17` | 下層URLでアイコン404の可能性（ブラウザ実装依存） | ルート相対 (`/mask-icon.svg`, `/apple-touch-icon.png`) に統一 | 0.5日未満 |
| High | 投稿単位 `description/image` 未整備 | `src/content/config.ts:7`, `src/layouts/Post.astro:36` | SEO/OGが記事固有情報を持てず、SNS展開品質が低下 | frontmatter 段階導入（推奨→必須化）と fallback 方針整備 | 1〜2日 |
| Medium | slug 規約の非一貫 | `src/content/post/20180524.md:5`, `src/content/post/20181010.md:5` | 将来のURL運用・リダイレクト対応の複雑化 | slug命名規約を定義し、既存差分は互換リダイレクトで収束 | 1〜2日 |
| Medium | 未使用コードと未完了TODO | `src/components/SocialAccountLinks.astro`, `src/components/HomeHeader.astro:6` | 実装意図が不透明で保守コスト増 | 未使用コードの削除/再利用方針の決定、TODOをIssue化 | 0.5〜1日 |
| Medium | `prev/next` 算出済みだが未使用 | `src/pages/post/[slug].astro:17`, `src/layouts/Post.astro:22` | 仕様未確定のまま型と処理だけ残り、負債化 | UIで使うか、生成と型から除去するかを明確化 | 0.5日 |
| Low | 外部スクリプト常時読込（性能/プライバシー） | `src/layouts/Post.astro:182` | 初期読込増加、同意管理観点の監査ポイント増 | 埋め込みがある記事のみ遅延読込する方針に変更 | 1日 |

## 7. 改善提案（短期/中期/長期）

### 7.1 短期（1〜2日）
1. タグ正規化ロジックを導入し、`Blog/blog` 問題を解消
2. `BaseHead` 内のアイコン・関連静的パスをルート相対に統一
3. 未使用 `prev/next` と `SocialAccountLinks` の扱いを決定（削除または活用）

### 7.2 中期（1〜2週）
1. frontmatter 契約を段階的に強化（`description` 推奨→必須化）
2. slug 規約（ASCII lowercase kebab-case）をドキュメント化し、既存URL互換の移行計画を作成
3. コンテンツ品質チェック（frontmatter lint）をCIに追加

7.2 実施ステータス（2026-02-26）は以下の通りです。
- `description` を全32記事に投入（暫定）
- slug 規約違反4件を修正し、`astro.config.mjs` に互換 redirect を追加
- `content:lint` を CI（Deploy workflow）に段階導入
- 運用規約を `docs/content-governance.md` に作成

### 7.3 長期（1〜2か月）
1. 投稿単位メタデータ運用を定着（OG画像運用含む）
2. テスト基盤（最低限の静的検証・リンク検証）を導入
3. 外部スクリプトの読み込み条件化とパフォーマンス監視

### 7.4 重要な公開インターフェース変更（文書化方針）
1. URL仕様: `/tags/{slug}` は小文字で正規化済みのタグを唯一正とする
2. 互換性: 既存URL変更時はリダイレクト方針を必ず定義する
3. frontmatter契約: `description` 必須化案、`image` 推奨化案を段階導入で示す
4. 投稿ナビゲーション: `prev/next` は「表示する」か「除去する」かを二択で確定する

## 8. 受け入れ基準（DoD）
1. `npm run build` が成功し、重大警告が増加していない
2. `/tags/index.html` に同一 `href` の重複タグリンクが存在しない
3. `/tags/blog` が期待どおり統合されたタグ集合を表示する
4. 深いパス（`/post/...`）で `mask-icon` / `apple-touch-icon` が404にならない
5. 32件の記事が frontmatter スキーマ要件を満たす
6. 本監査ドキュメントに課題・改善点・懸念点が Severity 別で網羅されている

## 9. 証跡（ファイル・行・コマンド）

### 9.1 主要参照ファイル
- `src/pages/tags/[tag].astro`
- `src/pages/tags/index.astro`
- `src/components/BaseHead.astro`
- `src/layouts/Post.astro`
- `src/content/config.ts`
- `dist/tags/index.html`

### 9.2 実行コマンド（抜粋）
```bash
rg --files | wc -l
find . -maxdepth 3 -type d | sort
cat package.json
cat astro.config.mjs
cat .github/workflows/deploy.yml
npm run build
rg -n "TODO|FIXME|HACK|XXX" src .github
rg -n "^slug:|^tags:|^date:|^draft:" src/content/post
du -sh public src dist .astro
```

### 9.3 観測した重要出力（要約）
- `npm run build`: 成功（58ページ生成）
- `astro check`: errors 0 / warnings 0 / hints 2
- `/tags/index.html`: `/tags/blog` リンク重複（`blog` と `Blog`）
- `src/content/post`: 32記事、`description`/`image` 設定は0件

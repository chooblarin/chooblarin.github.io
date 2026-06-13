# Design System

このブログの UI を支えるデザインシステムのトークンとコンポーネント規約。

## 構成

```
src/styles/            グローバルトークン (CSS custom properties)
  color.css            色 — 3 層トークン (palette → source → public)
  spacing.css          余白・角丸・フォーカス幾何
  typography.css       書体・行間・本文組版
src/design-system/react/
  primitives/          最小単位 (Link, Button, ButtonLink)
  patterns/            primitives を組み合わせた部品 (TagList, PostItem,
                       PostNavCard, PaginationNav, TableOfContents)
  lib/cn.ts            clsx ラッパー
src/islands/           Astro と React の境界。pattern を Astro から使う薄い層
```

## トークンの命名規約

**`--ds-` のようなプレフィックスは付けない。** 採用しているのはフラットな
セマンティック名前空間:

| 接頭辞                                            | 役割                        | 定義場所       |
| ------------------------------------------------- | --------------------------- | -------------- |
| `--palette-*`                                     | ブランド原色 (oklch 原始値) | color.css      |
| `--color-*`                                       | 用途別の公開色トークン      | color.css      |
| `--space-*`                                       | 余白スケール                | spacing.css    |
| `--radius-*`                                      | 角丸スケール                | spacing.css    |
| `--focus-ring-*`                                  | フォーカスリングの寸法      | spacing.css    |
| `--font-weight-* / --line-height-* / --measure-*` | 書体・組版                  | typography.css |

理由: これは単一アプリ向けの内部 DS であり、外部 CSS と衝突する余地がない。
プレフィックスは可読性を下げるだけなので、グローバルな custom property を
そのまま用途名で公開する。Astro コンポーネントの scoped CSS と React の
CSS Modules の双方が、同じ `--color-*` / `--space-*` を直接参照する。

## 色 (color.css)

3 層構造:

1. **palette** — `--palette-navy / purple / teal / yellow`。oklch 原始値。
2. **source** — 役割ごとに `*-light` / `*-dark` を定義。
3. **public** — `--color-*`。既定は light、`@supports (light-dark())` で
   現在のスキームに解決。`:root[data-theme]` がスキームを固定する。

役割の割り当て: `primary = purple` / `deep = navy` / `accent = teal` /
`highlight = yellow`。ニュートラル (text / background / surface / border) は
navy 寄り (hue ~265) の低彩度グレーで、パレットと馴染ませる。

### アクセントの使いどころ

teal / yellow は彩度が高く、使いすぎると散らかる。役割を固定する:

| トークン                       | L (light) | 使う場面                                                    |
| ------------------------------ | --------- | ----------------------------------------------------------- |
| `--color-accent` (teal)        | 0.707     | 大きな装飾。淡くてよい面 — タイトルのグラデーション終端など |
| `--color-accent-strong` (teal) | 0.5       | 視認性が要る小要素 — blockquote の左ボーダー等の境界線      |
| `--color-highlight` (yellow)   | 0.947     | `<mark>` のテキストハイライト背景のみ                       |

- **primary (purple)** がリンク・hover・現在位置など「操作/状態」の主役。
  accent をインタラクションに使わない (ブランドの一貫性を保つ)。
- **highlight (yellow)** は light/dark どちらでも明るい黄なので、`<mark>` の
  文字色は常に `--palette-navy` (固定の暗色) にする。両モードで可読。

## 角丸 (spacing.css)

| トークン         | 値      | 用途                                     |
| ---------------- | ------- | ---------------------------------------- |
| `--radius-sm`    | 0.25rem | インラインコード、小要素                 |
| `--radius-md`    | 0.5rem  | ボタン・ページネーション等のコントロール |
| `--radius-lg`    | 0.75rem | コンテンツカード (PostNavCard など)      |
| `--radius-full`  | 999px   | ピル (タグチップ、TOC マーカー)          |
| `--radius-focus` | 0.35rem | インライン要素のフォーカスリングの角丸   |

## フォーカス

フォーカスリングは BaseHead のグローバル `:focus-visible` 一箇所で定義し、
`a, button, input, textarea, select, summary, [tabindex]` を対象にする。
個々のコンポーネントはフォーカススタイルを持たない。寸法は
`--focus-ring-width` / `--focus-ring-offset` / `--radius-focus`、色は
`--color-focus-ring`。

## 立体表現: 影ではなく境界線

このデザインは意図的にフラット。**elevation は box-shadow ではなく
`border` + `surface` 色で表現する**。そのため shadow トークンは定義しない。
カード・パネルは `1px solid var(--color-border)` と
`var(--color-surface)` の組み合わせで面を区切り、hover では
`border-color` を `--color-primary` 等へ変える。将来オーバーレイ
(ドロップダウン / トースト) を導入して影が必要になった時点で、
`--shadow-*` スケールをここに追加する。

## コンポーネント規約

- **variants は cva**。CSS Modules のクラスを `cva()` のバリアントに割り当て、
  `cn()` (clsx) で結合する。
- **island は原則 SSR のみ** (`client:*` なし = JS ゼロ)。スクロール追従が
  必要な `TableOfContents` だけ `client:idle` でハイドレートする。
- **ページからの参照は island 経由**。React の pattern を直接 `.astro` から
  import せず、`src/islands/*Island.astro` を挟む。
- 記事リンクは `href={`/post/${post.id}`}` (Content Layer の id)。

# chooblarin.github.io

Personal blog built with Astro.

- Site: [https://chooblarin.github.io](https://chooblarin.github.io)
- Canonical: [https://chooblarin.com](https://chooblarin.com)

## Quick Start

1. Install dependencies: `npm ci`
2. Start dev server: `npm run dev`
3. Open preview build: `npm run build && npm run preview`

## Quality Checks

- Formatting/Lint: `npm run biome:check`
- Text lint: `npm run textlint`
- Content governance lint: `npm run content:lint:strict`
- Unused entry check: `npm run check:unused`

## Architecture

UI is split into three layers:

1. `src/pages` / `src/layouts`  
   Page composition and route-level data loading.
2. `src/islands`  
   Astro boundary layer that connects pages/layouts to React UI.
3. `src/design-system/react`  
   Reusable React UI modules.
   - `primitives`: low-level UI building blocks (`Button`, `Link`, ...)
   - `patterns`: post-specific composed UIs (`PostItem`, `TableOfContents`, ...)

Domain logic is under `src/domain`:

- `src/domain/posts/query.ts`: post collection query helpers
- `src/domain/posts/tag.ts`: tag normalization/grouping helpers
- `src/domain/posts/tag-taxonomy.json`: canonical tag/alias source of truth

## Content

- Posts are managed under `src/content/post/`.
- Historical posts live under `src/content/post/archive/`.
- Frontmatter schema is defined in `src/content.config.ts`.
- Governance checks are implemented in `scripts/content-lint.mjs`.

## Storybook

- Start: `npm run storybook`
- Build: `npm run build-storybook`

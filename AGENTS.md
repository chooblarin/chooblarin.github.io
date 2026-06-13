# AGENTS.md

This file provides guidance to Codex (Codex.ai/code) when working with code in this repository.

## Development Commands

This project uses **pnpm** (pinned via `packageManager` in `package.json`).
Enable it with `corepack enable` if `pnpm` is not on your PATH.

- **Install**: `pnpm install`
- **Development server**: `pnpm dev` or `pnpm start`
- **Build**: `pnpm build` (includes type checking with `astro check`)
- **Preview build**: `pnpm preview`
- **Type checking only**: `pnpm astro check`

## Architecture

This is an Astro-based personal blog with the following structure:

- **Content system**: Uses Astro's content collections for blog posts
  - Posts are stored in `src/content/post/` as Markdown/MDX files
  - Content schema defined in `src/content/config.ts` with required fields: title, date, tags, and optional description, image, draft
  - Posts are sorted by date (newest first) on the homepage

- **Components**: Mix of Astro components (`.astro`) and Svelte components (`.svelte`)
  - Key components: BaseHead, HomeHeader, Footer, PostItem, TableOfContents
  - Layouts in `src/layouts/` (Post.astro for blog post pages)
  - RiveAnim.svelte uses @rive-app/canvas for animations

- **Routing**: File-based routing in `src/pages/`
  - Dynamic routes for posts (`[slug].astro`), pagination (`[p].astro`), and tags (`[tag].astro`)
  - Site redirects defined in astro.config.mjs

- **Styling**: Scoped CSS in Astro components, uses JetBrains Mono font
- **Math support**: Configured with remark-math and rehype-katex plugins
- **Site config**: Site URL is https://chooblarin.com, title and description in `src/consts.ts`

## Path Aliases

Uses `@/*` alias pointing to `src/*` (configured in tsconfig.json).

## Integrations

- MDX support for enhanced markdown
- Sitemap generation
- Svelte integration for interactive components
- Prettier for code formatting with Astro plugin
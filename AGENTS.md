# AGENTS.md

This file provides guidance to Codex (Codex.ai/code) when working with code in this repository.

## Development Commands

This project uses **Vite+** (pinned in the `pnpm-workspace.yaml` catalog) and **pnpm** (pinned via `packageManager` in `package.json`).
Install or update the global `vp` CLI using https://viteplus.dev/guide/.

- **Install**: `vp install --frozen-lockfile`
- **Development server**: `vp run dev`
- **Build**: `vp run build` (includes type checking with `astro check`)
- **Preview build**: `vp run preview`
- **Type checking only**: `vp exec astro check`
- **Lint and check formatting**: `vp check`
- **Format**: `vp fmt`
- **Test**: `vp run test` (uses the Node.js test runner)
- **Storybook**: `vp run storybook` / `vp run build-storybook`

Use `vp run` for the Astro and Storybook scripts. Keep `astro check` for type checking `.astro` files; Vite+ type-aware linting and type checking are disabled in `vite.config.ts`.

## Architecture

This is an Astro-based personal blog with the following structure:

- **Content system**: Uses Astro's content collections for blog posts
  - Posts are stored in `src/content/post/` as Markdown/MDX files
  - Content schema defined in `src/content/config.ts` with required fields: title, date, tags, and optional description, image, draft
  - Posts are sorted by date (newest first) on the homepage

- **Components**: Mix of Astro components (`.astro`) and React components (`.tsx`)
  - Key components: BaseHead, HomeHeader, Footer, PostItem, TableOfContents
  - Layouts in `src/layouts/` (Post.astro for blog post pages)
  - RiveAnim.tsx uses @rive-app/canvas for animations

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
- React integration for interactive components
- Vite+ provides Oxlint and Oxfmt; their configuration is in `vite.config.ts`, with Astro formatting enabled (article content is excluded)

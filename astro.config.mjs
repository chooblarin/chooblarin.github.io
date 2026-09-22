import { unified } from "@astrojs/markdown-remark";
import mdx from "@astrojs/mdx";
import react from "@astrojs/react";
import sitemap from "@astrojs/sitemap";
import { defineConfig } from "astro/config";
import rehypeKatex from "rehype-katex";
import remarkMath from "remark-math";

// https://astro.build/config
export default defineConfig({
  // Preserve HTML whitespace handling from Astro 6.
  compressHTML: true,
  redirects: {
    "/page": "/page/1",
  },
  site: "https://chooblarin.com",
  markdown: {
    // Keep the unified pipeline for remark-math and rehype-katex.
    shikiConfig: {
      theme: "houston",
    },
    processor: unified({
      remarkPlugins: [remarkMath],
      rehypePlugins: [rehypeKatex],
    }),
  },
  integrations: [mdx(), sitemap(), react()],
});

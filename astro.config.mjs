import { unified } from "@astrojs/markdown-remark";
import mdx from "@astrojs/mdx";
import react from "@astrojs/react";
import sitemap from "@astrojs/sitemap";
import svelte from "@astrojs/svelte";
import { defineConfig } from "astro/config";
import rehypeKatex from "rehype-katex";
import remarkMath from "remark-math";

// https://astro.build/config
export default defineConfig({
  redirects: {
    "/page": "/page/1",
  },
  site: "https://chooblarin.com",
  markdown: {
    // Astro 6: remark/rehype plugins live on a `unified()` processor.
    // shikiConfig stays at the markdown level (not deprecated).
    shikiConfig: {
      theme: "houston",
    },
    processor: unified({
      remarkPlugins: [remarkMath],
      rehypePlugins: [rehypeKatex],
    }),
  },
  integrations: [mdx(), sitemap(), svelte(), react()],
});

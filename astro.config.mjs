import mdx from "@astrojs/mdx";
import sitemap from "@astrojs/sitemap";
import { defineConfig } from "astro/config";
import rehypeKatex from "rehype-katex";
import remarkMath from "remark-math";

import svelte from "@astrojs/svelte";

// https://astro.build/config
export default defineConfig({
  redirects: {
    "/page": "/page/1",
  },
  site: "https://chooblarin.com",
  markdown: {
    remarkPlugins: [remarkMath],
    rehypePlugins: [rehypeKatex],
    shikiConfig: {
      theme: "houston",
    },
  },
  integrations: [mdx(), sitemap(), svelte()],
});

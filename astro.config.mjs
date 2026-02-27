import mdx from "@astrojs/mdx";
import react from "@astrojs/react";
import sitemap from "@astrojs/sitemap";
import { defineConfig } from "astro/config";
import rehypeKatex from "rehype-katex";
import remarkMath from "remark-math";

import svelte from "@astrojs/svelte";

// https://astro.build/config
export default defineConfig({
  redirects: {
    "/page": "/page/1",
    "/tags/machine-leaning": "/tags/machine-learning",
    // slug 正規化前の旧URLを維持するための互換リダイレクト
    "/post/job‐change": "/post/job-change",
    "/post/forkJoin-in-rxjs-is-promiss-all":
      "/post/fork-join-in-rxjs-is-promiss-all",
    "/post/observable_is_my_friend": "/post/observable-is-my-friend",
    "/post/to_be_an_android_developer": "/post/to-be-an-android-developer",
  },
  site: "https://chooblarin.com",
  markdown: {
    remarkPlugins: [remarkMath],
    rehypePlugins: [rehypeKatex],
    shikiConfig: {
      theme: "houston",
    },
  },
  integrations: [mdx(), sitemap(), react(), svelte()],
});

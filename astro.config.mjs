import sitemap from "@astrojs/sitemap";
import { defineConfig } from "astro/config";

import partytown from "@astrojs/partytown";

// https://astro.build/config
export default defineConfig({
  redirects: {
    "/page": "/page/1"
  },
  site: "https://chooblarin.com",
  integrations: [sitemap(), partytown()],
  markdown: {
    shikiConfig: {
      theme: "night-owl"
    }
  }
});
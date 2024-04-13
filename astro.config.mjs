import sitemap from "@astrojs/sitemap";
import { defineConfig } from "astro/config";

// https://astro.build/config
export default defineConfig({
  redirects: {
    "/page": "/page/1",
  },
  site: "https://chooblarin.com",
  integrations: [sitemap()],
});

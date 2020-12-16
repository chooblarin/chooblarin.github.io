const sitemap = require("nextjs-sitemap-generator");

sitemap({
  baseUrl: "https://chooblarin.github.io",
  pagesDirectory: __dirname + "/.next/server/pages",
  targetDirectory: "public/",
  ignoreIndexFiles: true,
  ignoredExtensions: ["js", "map"],
  ignoredPaths: ["404", "[fallback]"],
});

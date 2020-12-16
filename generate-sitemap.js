const sitemap = require("nextjs-sitemap-generator");
const fs = require("fs");

const BUILD_ID = fs.readFileSync(".next/BUILD_ID").toString();

sitemap({
  baseUrl: "https://chooblarin.github.io",
  pagesDirectory: __dirname + "/.next/server/pages",
  targetDirectory: "public/",
  ignoreIndexFiles: true,
  ignoredExtensions: ["js", "map"],
  ignoredPaths: ["404", "[fallback]"],
});

import fs from "node:fs";
import path from "node:path";
import matter from "gray-matter";

const strict = process.argv.includes("--strict");
const postDir = path.join(process.cwd(), "src", "content", "post");
const astroConfigPath = path.join(process.cwd(), "astro.config.mjs");
const tagTaxonomyPath = path.join(
  process.cwd(),
  "src",
  "domain",
  "posts",
  "tag-taxonomy.json",
);

const imageRule = /^\/images\/posts\/.+\.(png|jpg|jpeg|webp|avif)$/;
const allowedEmbeds = new Set(["twitter", "codepen"]);

const warnings = [];
const errors = [];

const taxonomy = JSON.parse(fs.readFileSync(tagTaxonomyPath, "utf8"));
const canonicalTags = new Set(taxonomy.canonicalTags ?? []);
const tagAliases = new Map(Object.entries(taxonomy.tagAliases ?? {}));

const isArchiveFile = (file) => file.startsWith("archive/");

const readPostFiles = (dir = postDir, prefix = "") =>
  fs
    .readdirSync(dir, { withFileTypes: true })
    .sort((a, b) => a.name.localeCompare(b.name))
    .flatMap((entry) => {
      const rel = prefix ? `${prefix}/${entry.name}` : entry.name;
      const fullPath = path.join(dir, entry.name);
      if (entry.isDirectory()) return readPostFiles(fullPath, rel);
      if (/\.(md|mdx)$/u.test(entry.name)) return [rel];
      return [];
    });

const checkRedirectKeyDuplicates = () => {
  if (!fs.existsSync(astroConfigPath)) return;
  const src = fs.readFileSync(astroConfigPath, "utf8");
  const redirectBlock = src.match(/redirects:\s*\{([\s\S]*?)\n\s*\},/u);
  if (!redirectBlock) return;
  const keys = [...redirectBlock[1].matchAll(/"([^"]+)"\s*:/gu)].map(
    (item) => item[1],
  );
  const seen = new Set();

  for (const key of keys) {
    if (seen.has(key)) {
      errors.push(`astro.config.mjs: duplicate redirect key "${key}"`);
      continue;
    }
    seen.add(key);
  }
};

const detectEmbedsInBody = (content) => ({
  twitter:
    /class=["']twitter-tweet["']/u.test(content) ||
    /platform\.twitter\.com\/widgets\.js/u.test(content),
  codepen:
    /class=["']codepen["']/u.test(content) ||
    /codepen\.io/u.test(content) ||
    /cpwebassets\.codepen\.io/u.test(content) ||
    /static\.codepen\.io/u.test(content),
});

const files = readPostFiles();

for (const file of files) {
  const fullPath = path.join(postDir, file);
  const src = fs.readFileSync(fullPath, "utf8");

  let parsed;
  try {
    parsed = matter(src);
  } catch (error) {
    const message = error instanceof Error ? error.message : "unknown error";
    errors.push(`${file}: invalid frontmatter (${message})`);
    continue;
  }

  const data =
    parsed.data &&
    typeof parsed.data === "object" &&
    !Array.isArray(parsed.data)
      ? parsed.data
      : {};

  const isArchive = isArchiveFile(file);
  const description =
    typeof data.description === "string" ? data.description.trim() : "";

  if (!description) {
    warnings.push(`${file}: missing recommended field "description"`);
  }

  if (data.image === undefined || data.image === null || data.image === "") {
    if (!isArchive) {
      warnings.push(`${file}: missing recommended field "image"`);
    }
  } else if (typeof data.image !== "string") {
    errors.push(`${file}: image must be a string`);
  } else if (!imageRule.test(data.image)) {
    errors.push(
      `${file}: image "${data.image}" must match ${imageRule.toString()}`,
    );
  }

  const embeds = Array.isArray(data.embeds)
    ? data.embeds.filter((item) => typeof item === "string")
    : [];

  for (const embedType of embeds) {
    if (!allowedEmbeds.has(embedType)) {
      errors.push(
        `${file}: embeds contains unsupported type "${embedType}" (allowed: twitter, codepen)`,
      );
    }
  }

  if (!isArchive && Array.isArray(data.tags)) {
    for (const tag of data.tags) {
      if (typeof tag !== "string" || tag.trim().length === 0) continue;
      const suggestedTag = tagAliases.get(tag);
      if (suggestedTag) {
        errors.push(`${file}: tag "${tag}" should be "${suggestedTag}"`);
        continue;
      }
      if (!canonicalTags.has(tag)) {
        errors.push(
          `${file}: tag "${tag}" is not in the approved tag list (${[
            ...canonicalTags,
          ].join(", ")})`,
        );
      }
    }
  }

  if (!isArchive) {
    const detectedEmbeds = detectEmbedsInBody(parsed.content);
    const embedSet = new Set(embeds);
    if (detectedEmbeds.twitter && !embedSet.has("twitter")) {
      warnings.push(
        `${file}: twitter embed detected in body; add embeds: ["twitter"]`,
      );
    }
    if (detectedEmbeds.codepen && !embedSet.has("codepen")) {
      warnings.push(
        `${file}: codepen embed detected in body; add embeds: ["codepen"]`,
      );
    }
  }
}

checkRedirectKeyDuplicates();

for (const warning of warnings) console.log(`WARN  ${warning}`);
for (const error of errors) console.log(`ERROR ${error}`);

console.log(
  `\nSummary: files=${files.length} warnings=${warnings.length} errors=${errors.length} strict=${strict}`,
);

if (errors.length > 0 || (strict && warnings.length > 0)) {
  process.exit(1);
}

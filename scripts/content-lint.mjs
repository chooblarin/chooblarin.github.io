import fs from "node:fs";
import path from "node:path";
import matter from "gray-matter";

const strict = process.argv.includes("--strict");
const postDir = path.join(process.cwd(), "src", "content", "post");
const astroConfigPath = path.join(process.cwd(), "astro.config.mjs");

const slugRule = /^[a-z0-9]+(?:-[a-z0-9]+)*$/;
const imageRule = /^\/images\/posts\/.+\.(png|jpg|jpeg|webp|avif)$/;
const requiredFields = ["title", "date", "tags", "slug"];
const allowedEmbeds = new Set(["twitter", "codepen"]);
const canonicalTags = new Set([
  "algorithm",
  "Android",
  "Blog",
  "CSS",
  "D3.js",
  "Elixir",
  "GLSL",
  "Java",
  "JavaScript",
  "Machine Learning",
  "p5.js",
  "Rive",
  "RxJava",
  "RxJS",
  "RxSwift",
  "SVG",
  "Swift",
  "TensorFlow",
]);
const tagAliases = new Map([
  ["blog", "Blog"],
  ["d3.js", "D3.js"],
  ["svg", "SVG"],
  ["Machine Leaning", "Machine Learning"],
]);

const warnings = [];
const errors = [];
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
    (item) => item[1]
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

const isValidDateValue = (value) => {
  const parsed = new Date(value);
  return Number.isNaN(parsed.getTime()) ? null : parsed;
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
const slugToFile = new Map();

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
    parsed.data && typeof parsed.data === "object" && !Array.isArray(parsed.data)
      ? parsed.data
      : {};

  for (const field of requiredFields) {
    if (!(field in data)) {
      errors.push(`${file}: missing required field "${field}"`);
    }
  }

  if (typeof data.title !== "string" || data.title.trim().length === 0) {
    errors.push(`${file}: title must be a non-empty string`);
  }

  const dateValue = isValidDateValue(data.date);
  if (!dateValue) {
    errors.push(`${file}: date must be a valid date`);
  }

  if (
    "updatedAt" in data &&
    data.updatedAt !== undefined &&
    data.updatedAt !== null
  ) {
    const updatedAtValue = isValidDateValue(data.updatedAt);
    if (!updatedAtValue) {
      errors.push(`${file}: updatedAt must be a valid date`);
    } else if (dateValue && updatedAtValue < dateValue) {
      warnings.push(`${file}: updatedAt is earlier than date`);
    }
  }

  const description =
    typeof data.description === "string" ? data.description.trim() : "";
  if (!description) {
    warnings.push(`${file}: missing recommended field "description"`);
  }

  if (data.image === undefined || data.image === null || data.image === "") {
    if (!isArchiveFile(file)) {
      warnings.push(`${file}: missing recommended field "image"`);
    }
  } else if (typeof data.image !== "string") {
    errors.push(`${file}: image must be a string`);
  } else if (!imageRule.test(data.image)) {
    errors.push(`${file}: image "${data.image}" must match ${imageRule.toString()}`);
  }

  if (typeof data.slug !== "string" || data.slug.trim().length === 0) {
    errors.push(`${file}: slug must be a non-empty string`);
  } else {
    if (!slugRule.test(data.slug)) {
      errors.push(`${file}: slug "${data.slug}" must match ${slugRule.toString()}`);
    }
    if (slugToFile.has(data.slug)) {
      errors.push(
        `${file}: duplicate slug "${data.slug}" (already used in ${slugToFile.get(
          data.slug
        )})`
      );
    } else {
      slugToFile.set(data.slug, file);
    }
  }

  if (!Array.isArray(data.tags) || data.tags.length === 0) {
    errors.push(`${file}: tags must be a non-empty array`);
  } else {
    for (const tag of data.tags) {
      if (typeof tag !== "string" || tag.trim().length === 0) {
        errors.push(`${file}: tags contains non-string or empty value`);
        continue;
      }
      if (!isArchiveFile(file)) {
        const suggestedTag = tagAliases.get(tag);
        if (suggestedTag) {
          errors.push(`${file}: tag "${tag}" should be "${suggestedTag}"`);
        } else if (!canonicalTags.has(tag)) {
          errors.push(
            `${file}: tag "${tag}" is not in the approved tag list (${[
              ...canonicalTags,
            ].join(", ")})`
          );
        }
      }
    }
  }

  if (
    "embeds" in data &&
    data.embeds !== undefined &&
    data.embeds !== null &&
    !Array.isArray(data.embeds)
  ) {
    errors.push(`${file}: embeds must be an array`);
  } else if (Array.isArray(data.embeds)) {
    for (const embedType of data.embeds) {
      if (typeof embedType !== "string" || !allowedEmbeds.has(embedType)) {
        errors.push(
          `${file}: embeds contains unsupported type "${embedType}" (allowed: twitter, codepen)`
        );
      }
    }
  }

  if (!isArchiveFile(file)) {
    const detectedEmbeds = detectEmbedsInBody(parsed.content);
    const embeds = Array.isArray(data.embeds) ? new Set(data.embeds) : new Set();
    if (detectedEmbeds.twitter && !embeds.has("twitter")) {
      warnings.push(
        `${file}: twitter embed detected in body; add embeds: ["twitter"]`
      );
    }
    if (detectedEmbeds.codepen && !embeds.has("codepen")) {
      warnings.push(
        `${file}: codepen embed detected in body; add embeds: ["codepen"]`
      );
    }
  }
}

checkRedirectKeyDuplicates();

for (const warning of warnings) console.log(`WARN  ${warning}`);
for (const error of errors) console.log(`ERROR ${error}`);

console.log(
  `\nSummary: files=${files.length} warnings=${warnings.length} errors=${errors.length} strict=${strict}`
);

if (errors.length > 0 || (strict && warnings.length > 0)) {
  process.exit(1);
}

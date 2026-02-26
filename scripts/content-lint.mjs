import fs from "node:fs";
import path from "node:path";

const strict = process.argv.includes("--strict");
const postDir = path.join(process.cwd(), "src", "content", "post");
const astroConfigPath = path.join(process.cwd(), "astro.config.mjs");

const slugRule = /^[a-z0-9]+(?:-[a-z0-9]+)*$/;
const imageRule = /^\/images\/posts\/.+\.(png|jpg|jpeg|webp|avif)$/;
const requiredFields = ["title", "date", "tags", "slug"];

const warnings = [];
const errors = [];

const readPostFiles = () =>
  fs
    .readdirSync(postDir)
    .filter((name) => /\.(md|mdx)$/.test(name))
    .sort();

const parseFrontmatter = (content) => {
  const matched = content.match(/^---\n([\s\S]*?)\n---\n?/);
  if (!matched) return null;
  return {
    frontmatter: matched[1],
    body: content.slice(matched[0].length),
  };
};

const hasField = (frontmatter, name) =>
  new RegExp(`^${name}:\\s*.+$`, "m").test(frontmatter);

const readQuotedValue = (frontmatter, name) =>
  (frontmatter.match(new RegExp(`^${name}:\\s*\"([^\"]+)\"$`, "m")) || [])[1] ??
  "";

const readTags = (frontmatter) => {
  const raw = (frontmatter.match(/^tags:\s*(.+)$/m) || [])[1];
  if (!raw) return null;
  if (!raw.trim().startsWith("[") || !raw.trim().endsWith("]")) return null;
  return raw
    .slice(raw.indexOf("[") + 1, raw.lastIndexOf("]"))
    .split(",")
    .map((item) => item.trim().replace(/^["']|["']$/g, ""))
    .filter((item) => item.length > 0);
};

const checkRedirectKeyDuplicates = () => {
  if (!fs.existsSync(astroConfigPath)) return;
  const src = fs.readFileSync(astroConfigPath, "utf8");
  const redirectBlock = src.match(/redirects:\s*\{([\s\S]*?)\n\s*\},/);
  if (!redirectBlock) return;
  const keys = [...redirectBlock[1].matchAll(/"([^"]+)"\s*:/g)].map(
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

const files = readPostFiles();
const slugToFile = new Map();

for (const file of files) {
  const fullPath = path.join(postDir, file);
  const src = fs.readFileSync(fullPath, "utf8");
  const parsed = parseFrontmatter(src);

  if (!parsed) {
    errors.push(`${file}: missing frontmatter`);
    continue;
  }

  const { frontmatter } = parsed;

  for (const field of requiredFields) {
    if (!hasField(frontmatter, field)) {
      errors.push(`${file}: missing required field "${field}"`);
    }
  }

  if (!hasField(frontmatter, "description")) {
    warnings.push(`${file}: missing recommended field "description"`);
  }

  if (!hasField(frontmatter, "image")) {
    warnings.push(`${file}: missing recommended field "image"`);
  } else {
    const image = readQuotedValue(frontmatter, "image");
    if (!imageRule.test(image)) {
      errors.push(
        `${file}: image "${image}" must match ${imageRule.toString()}`
      );
    }
  }

  const slug = readQuotedValue(frontmatter, "slug");
  if (slug) {
    if (!slugRule.test(slug)) {
      errors.push(
        `${file}: slug "${slug}" must match ${slugRule.toString()}`
      );
    }
    if (slugToFile.has(slug)) {
      errors.push(
        `${file}: duplicate slug "${slug}" (already used in ${slugToFile.get(
          slug
        )})`
      );
    } else {
      slugToFile.set(slug, file);
    }
  }

  const tags = readTags(frontmatter);
  if (!tags) {
    errors.push(
      `${file}: tags must be a non-empty inline array (e.g. ["TagA", "TagB"])`
    );
  } else if (tags.length === 0 || tags.some((tag) => tag.trim().length === 0)) {
    errors.push(`${file}: tags contains empty value`);
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

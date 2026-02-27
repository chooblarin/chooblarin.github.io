import fs from "node:fs";
import path from "node:path";

const postDir = path.join(process.cwd(), "src", "content", "post");
const maxLen = 120;

const readPostFiles = (dir = postDir, prefix = "") =>
  fs
    .readdirSync(dir, { withFileTypes: true })
    .sort((a, b) => a.name.localeCompare(b.name))
    .flatMap((entry) => {
      const rel = prefix ? `${prefix}/${entry.name}` : entry.name;
      const fullPath = path.join(dir, entry.name);
      if (entry.isDirectory()) return readPostFiles(fullPath, rel);
      if (/\.(md|mdx)$/.test(entry.name)) return [rel];
      return [];
    });

const files = readPostFiles();

const parseFrontmatter = (content) => {
  const matched = content.match(/^---\n([\s\S]*?)\n---\n?/);
  if (!matched) return null;
  return {
    head: matched[0],
    frontmatter: matched[1],
    body: content.slice(matched[0].length),
  };
};

const sanitizeText = (value) => {
  const stripped = value
    .replace(/!\[[^\]]*\]\([^)]+\)/g, "")
    .replace(/\[([^\]]+)\]\([^)]+\)/g, "$1")
    .replace(/`([^`]+)`/g, "$1")
    .replace(/[*_~]+/g, "")
    .replace(/<[^>]+>/g, "")
    .replace(/\s+/g, " ")
    .trim();

  if (stripped.length <= maxLen) return stripped;
  return `${stripped.slice(0, maxLen - 1).trimEnd()}…`;
};

const extractFirstParagraph = (body) => {
  const lines = body.split(/\r?\n/);
  let inCodeBlock = false;
  let paragraph = [];

  const flush = () => sanitizeText(paragraph.join(" "));

  for (const line of lines) {
    const trimmed = line.trim();

    if (/^```/.test(trimmed)) {
      inCodeBlock = !inCodeBlock;
      continue;
    }
    if (inCodeBlock) continue;

    if (!trimmed) {
      if (paragraph.length > 0) {
        const text = flush();
        if (text) return text;
        paragraph = [];
      }
      continue;
    }

    if (/^import\s.+from\s.+$/.test(trimmed)) continue;
    if (/^#/.test(trimmed)) continue;
    if (/^<[^>]+>$/.test(trimmed)) continue;

    paragraph.push(trimmed);
  }

  if (paragraph.length > 0) {
    const text = flush();
    if (text) return text;
  }
  return "";
};

let changed = 0;
let skipped = 0;

for (const file of files) {
  const fullPath = path.join(postDir, file);
  const src = fs.readFileSync(fullPath, "utf8");
  const parsed = parseFrontmatter(src);
  if (!parsed) {
    skipped += 1;
    continue;
  }

  if (/^description:\s*.+$/m.test(parsed.frontmatter)) {
    skipped += 1;
    continue;
  }

  const title =
    (parsed.frontmatter.match(/^title:\s*"([^"]+)"$/m) || [])[1] ?? "Untitled";
  const generated = extractFirstParagraph(parsed.body) || title;
  const escaped = generated.replace(/"/g, '\\"');

  const nextFrontmatter = parsed.frontmatter.replace(
    /^title:\s*"([^"]+)"$/m,
    (line) => `${line}\ndescription: "${escaped}"`,
  );

  const nextContent = src.replace(parsed.frontmatter, nextFrontmatter);
  fs.writeFileSync(fullPath, nextContent, "utf8");
  changed += 1;
}

console.log(`Backfill completed: changed=${changed} skipped=${skipped}`);

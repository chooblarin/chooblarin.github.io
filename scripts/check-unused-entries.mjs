import fs from "node:fs";
import path from "node:path";

const root = process.cwd();
const srcDir = path.join(root, "src");

const readFiles = (dir, matcher) =>
  fs
    .readdirSync(dir, { withFileTypes: true })
    .flatMap((entry) => {
      const fullPath = path.join(dir, entry.name);
      if (entry.isDirectory()) return readFiles(fullPath, matcher);
      return matcher(fullPath) ? [fullPath] : [];
    })
    .sort();

const sourceFiles = readFiles(
  srcDir,
  (file) =>
    /\.(astro|ts|tsx|svelte|mdx)$/u.test(file) && !file.endsWith(".d.ts"),
);

const sourceTexts = sourceFiles.map((file) => ({
  file,
  text: fs.readFileSync(file, "utf8"),
}));

const astroCandidates = [
  ...readFiles(path.join(srcDir, "components"), (file) =>
    file.endsWith(".astro"),
  ),
  ...readFiles(path.join(srcDir, "islands"), (file) => file.endsWith(".astro")),
];

const componentCandidates = [
  ...readFiles(
    path.join(srcDir, "design-system", "react", "primitives"),
    (file) =>
      file.endsWith(".tsx") &&
      !file.endsWith(".stories.tsx") &&
      !file.endsWith("storybook.tsx"),
  ),
  ...readFiles(
    path.join(srcDir, "design-system", "react", "patterns"),
    (file) =>
      file.endsWith(".tsx") &&
      !file.endsWith(".stories.tsx") &&
      !file.endsWith("storybook.tsx"),
  ),
];

const escapeRegExp = (value) => value.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");

const isUsedByOtherFile = (targetFile, matcher) =>
  sourceTexts.some(({ file, text }) => file !== targetFile && matcher(text));

const unused = [];

for (const targetFile of astroCandidates) {
  const fileName = path.basename(targetFile);
  const used = isUsedByOtherFile(targetFile, (text) => text.includes(fileName));
  if (!used) unused.push(path.relative(root, targetFile));
}

for (const targetFile of componentCandidates) {
  const baseName = path.basename(targetFile, ".tsx");
  const pattern = new RegExp(
    `["'\`][^"'\`\\n]*\\/${escapeRegExp(baseName)}["'\`]`,
    "u",
  );
  const used = isUsedByOtherFile(targetFile, (text) => pattern.test(text));
  if (!used) unused.push(path.relative(root, targetFile));
}

if (unused.length > 0) {
  console.error("Unused entries detected:");
  for (const file of unused) {
    console.error(`- ${file}`);
  }
  process.exit(1);
}

console.log(
  `Unused entry check passed: ${astroCandidates.length + componentCandidates.length} entries scanned.`,
);

import { readdir, readFile } from "node:fs/promises";
import { extname, join, relative } from "node:path";
import { fileURLToPath } from "node:url";

const rootDir = fileURLToPath(new URL("../src", import.meta.url));
// Only the canonical alias definitions in tokens.css are allowed.
const allowlist = new Set(["styles/tokens.css"]);
// Scope is intentionally limited to implementation files.
const implementationExtensions = new Set([
  ".astro",
  ".css",
  ".js",
  ".jsx",
  ".mjs",
  ".ts",
  ".tsx",
]);

const violations = [];

const walk = async (dir) => {
  const entries = await readdir(dir, { withFileTypes: true });
  for (const entry of entries) {
    const fullPath = join(dir, entry.name);
    if (entry.isDirectory()) {
      await walk(fullPath);
      continue;
    }

    if (!entry.isFile()) {
      continue;
    }

    const extension = extname(entry.name);
    if (!implementationExtensions.has(extension)) {
      continue;
    }

    const relativePath = relative(rootDir, fullPath).replaceAll("\\", "/");
    if (allowlist.has(relativePath)) {
      continue;
    }

    const source = await readFile(fullPath, "utf8");
    if (!source.includes("--color-")) {
      continue;
    }

    const lines = source.split(/\r?\n/);
    lines.forEach((line, index) => {
      if (line.includes("--color-")) {
        violations.push({
          path: `src/${relativePath}`,
          line: index + 1,
          text: line.trim(),
        });
      }
    });
  }
};

await walk(rootDir);

if (violations.length > 0) {
  console.error(
    "Deprecated --color-* aliases found in implementation files outside src/styles/tokens.css:",
  );
  for (const violation of violations) {
    console.error(`${violation.path}:${violation.line} ${violation.text}`);
  }
  process.exit(1);
}

console.log(
  "No deprecated --color-* alias usage found in implementation files outside src/styles/tokens.css.",
);

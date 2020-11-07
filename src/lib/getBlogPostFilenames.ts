import fs from "fs";

const pattern = /\.(md|mdx)$/.compile();

export function getBlogPostFilenames(): string[] {
  const files = fs.readdirSync(`${process.cwd()}/posts`, "utf-8");
  return files.filter((file) => pattern.test(file));
}

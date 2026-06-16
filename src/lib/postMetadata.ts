import type { Post } from "./posts";

const DESCRIPTION_MAX_LENGTH = 160;

const collapseWhitespace = (value: string) => value.replace(/\s+/g, " ").trim();

const stripInlineMarkdown = (value: string) =>
  collapseWhitespace(
    value
      .replace(/!\[[^\]]*]\([^)]*\)/g, "")
      .replace(/\[([^\]]+)]\([^)]*\)/g, "$1")
      .replace(/<[^>]+>/g, "")
      .replace(/[`*_~]/g, ""),
  );

const truncateDescription = (value: string) => {
  if (value.length <= DESCRIPTION_MAX_LENGTH) return value;
  return `${value.slice(0, DESCRIPTION_MAX_LENGTH - 1).trimEnd()}…`;
};

const removeBlocks = (value: string) =>
  value
    .replace(/^---[\s\S]*?---\s*/m, "")
    .replace(/```[\s\S]*?```/g, "")
    .replace(/\$\$[\s\S]*?\$\$/g, "");

const isDescriptionCandidate = (line: string) => {
  if (line.length === 0) return false;
  if (/^#{1,6}\s/.test(line)) return false;
  if (/^import\s/.test(line) || /^export\s/.test(line)) return false;
  if (/^!\[/.test(line)) return false;
  if (/^<\/?[A-Z][\w.:-]*/.test(line)) return false;
  if (/^\|.*\|$/.test(line)) return false;
  if (/^[-*_]{3,}$/.test(line)) return false;
  return true;
};

export const getPostDescription = (post: Post): string | undefined => {
  const description = collapseWhitespace(post.data.description ?? "");
  return description.length > 0 ? description : undefined;
};

export const generatePostDescription = (body: string): string | undefined => {
  const cleanedBody = removeBlocks(body);

  for (const rawLine of cleanedBody.split(/\r?\n/)) {
    const line = rawLine
      .trim()
      .replace(/^>\s?/, "")
      .replace(/^[-*+]\s+/, "")
      .replace(/^\d+\.\s+/, "");

    if (!isDescriptionCandidate(line)) continue;

    const candidate = stripInlineMarkdown(line);
    if (candidate.length > 0) return truncateDescription(candidate);
  }

  return undefined;
};

export const getPostSummary = (post: Post, fallback: string) =>
  getPostDescription(post) ??
  generatePostDescription(post.body ?? "") ??
  fallback;

export const getPostImage = (post: Post): string | undefined => {
  const image = collapseWhitespace(post.data.image ?? "");
  return image.length > 0 ? image : undefined;
};

export const getGeneratedOgImagePath = (post: Post) => `/og/${post.id}.png`;

export const getPostOgImage = (post: Post) =>
  getPostImage(post) ?? getGeneratedOgImagePath(post);

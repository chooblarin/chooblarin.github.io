import fs from "fs";
import matter from "gray-matter";
import path from "path";
import remark from "remark";
import html from "remark-html";
import { BlogPost, BlogPostContent } from "./BlogPost";

const pattern = /\.(md|mdx)$/.compile();

const postFilePath = (filename?: string) => {
  const dir = process.cwd();
  if (filename) {
    return path.join(dir, "posts", filename);
  } else {
    return path.join(dir, "posts");
  }
};

export async function getAllBlogPosts(): Promise<
  { filename: string; post: BlogPost }[]
> {
  const posts: { filename: string; post: BlogPost }[] = [];

  const filenames = getBlogPostFilenames();

  for (const filename of filenames) {
    const post = await getBlogPost(filename);
    posts.push({ filename, post });
  }

  posts.sort((a, b) => -a.post.date.localeCompare(b.post.date));

  return posts;
}

export function getBlogPostFilenames(): string[] {
  const path = postFilePath();
  const files = fs.readdirSync(path, "utf-8");
  return files.filter((file) => pattern.test(file));
}

export async function getBlogPost(filename: string): Promise<BlogPost> {
  const path = postFilePath(filename);
  const source = fs.readFileSync(path, "utf-8");
  const { data } = matter(source);
  return getFrontMatter(data);
}

export async function getBlogPostContent(
  filename: string
): Promise<BlogPostContent> {
  const path = postFilePath(filename);
  const source = fs.readFileSync(path, "utf-8");
  const { content, data } = matter(source);

  const markdown = await remark()
    .use(html)
    .process(content || "");

  const post = getFrontMatter(data);

  return {
    ...post,
    content: markdown.toString(),
  };
}

function getFrontMatter(data: unknown): BlogPost {
  const title = data["title"] as string;
  const date = data["date"] as string;
  const slug = data["slug"] as string;
  const tags = data["tags"] as string[] | undefined;
  const draft = data["draft"] as boolean | undefined;
  return {
    title,
    date,
    slug,
    tags,
    draft,
  };
}

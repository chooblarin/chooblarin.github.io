import fs from "fs";
import matter from "gray-matter";
import remark from "remark";
import html from "remark-html";

const pattern = /\.(md|mdx)$/.compile();

export type BlogPost = {
  title: string;
  date: string;
  slug: string;
  tags?: string[];
  draft?: boolean;
  filename: string;
};

export type BlogPostContent = BlogPost & { content: string };

export async function getAllBlogPosts(): Promise<BlogPost[]> {
  const posts: BlogPost[] = [];

  const filenames = getBlogPostFilenames();

  for (const filename of filenames) {
    const post = await getBlogPost(filename);
    posts.push(post);
  }

  posts.sort((a, b) => -a.date.localeCompare(b.date));

  return posts;
}

export function getBlogPostFilenames(): string[] {
  const files = fs.readdirSync(`${process.cwd()}/posts`, "utf-8");
  return files.filter((file) => pattern.test(file));
}

export async function getBlogPost(filename: string): Promise<BlogPost> {
  const source = fs.readFileSync(`${process.cwd()}/posts/${filename}`, "utf-8");
  const { data } = matter(source);

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
    filename,
  };
}

export async function getBlogPostContent(
  filename: string
): Promise<BlogPostContent> {
  const source = fs.readFileSync(`${process.cwd()}/posts/${filename}`, "utf-8");
  const { content, data } = matter(source);

  const markdown = await remark()
    .use(html)
    .process(content || "");

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
    filename,
    content: markdown.toString(),
  };
}

import fs from "fs";
import matter from "gray-matter";
import "highlight.js";
import path from "path";
import rehypeHighlight from "rehype-highlight";
import rehypeStringify from "rehype-stringify";
import remarkParse from "remark-parse";
import remarkRehype from "remark-rehype";
import { unified } from "unified";
import { BlogPost, BlogPostContent } from "./BlogPost";

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

export async function getBlogPostContent(
  filename: string
): Promise<BlogPostContent> {
  const path = postFilePath(filename);
  const source = fs.readFileSync(path, "utf-8");
  const { content, data } = matter(source);

  const post = getFrontMatter(data);

  const markdown = await unified()
    .use(remarkParse as any) // FIXME
    .use(remarkRehype, { allowDangerousHtml: true })
    .use(rehypeHighlight)
    .use(rehypeStringify as any, { allowDangerousHtml: true }) // FIXME
    .process(content || "");

  const markdownString = markdown.toString();

  return {
    ...post,
    content: markdownString,
  };
}

const postFilePath = (filename?: string) => {
  const dir = process.cwd();
  if (filename) {
    return path.join(dir, "posts", filename);
  } else {
    return path.join(dir, "posts");
  }
};

function getBlogPostFilenames(): string[] {
  const pattern = /\.(md|mdx)$/;
  const path = postFilePath();
  const files = fs.readdirSync(path, "utf-8");
  return files.filter((file) => pattern.test(file));
}

async function getBlogPost(filename: string): Promise<BlogPost> {
  const path = postFilePath(filename);
  const source = fs.readFileSync(path, "utf-8");
  const { data } = matter(source);
  return getFrontMatter(data);
}

function getFrontMatter(data: any): BlogPost {
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

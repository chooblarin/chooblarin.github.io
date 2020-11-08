import fs from "fs";
import matter from "gray-matter";
import renderToString from "next-mdx-remote/render-to-string";

const pattern = /\.(md|mdx)$/.compile();

type BlogPost = {
  title: string;
  date: string;
  slug: string;
  tags?: string[];
  draft?: boolean;
};

export function getBlogPostFilenames(): string[] {
  const files = fs.readdirSync(`${process.cwd()}/posts`, "utf-8");
  return files.filter((file) => pattern.test(file));
}

export async function getBlogPostContent(filename: string): Promise<BlogPost> {
  const source = fs.readFileSync(`${process.cwd()}/posts/${filename}`, "utf-8");
  const { content, data } = matter(source);
  const mdxSource = await renderToString(content);
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

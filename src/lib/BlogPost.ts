export type BlogPost = {
  title: string;
  date: string;
  slug: string;
  tags?: string[];
  draft?: boolean;
};

export type BlogPostContent = BlogPost & { content: string };

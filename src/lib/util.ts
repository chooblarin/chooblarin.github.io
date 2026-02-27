export const slugify = (tagName: string) =>
  tagName
    .toLowerCase()
    .replace(/\s+/g, "-") // Replace spaces with -
    .replace(/[^\w-]+/g, "") // Remove all non-word chars
    .replace(/--+/g, "-") // Replace multiple - with single -
    .replace(/^-+/, "") // Trim - from start of text
    .replace(/-+$/, ""); // Trim - from end of text

type PostWithTags = {
  data: {
    tags: string[];
  };
};

export type NormalizedTagGroup = {
  slug: string;
  label: string;
  count: number;
  variants: string[];
};

const pickRepresentativeLabel = (labelCounts: Map<string, number>) =>
  [...labelCounts.entries()].sort(
    (a, b) => b[1] - a[1] || a[0].localeCompare(b[0]),
  )[0]?.[0] ?? "";

export const buildNormalizedTagGroups = (
  posts: PostWithTags[],
): NormalizedTagGroup[] => {
  const grouped = new Map<
    string,
    { labelCounts: Map<string, number>; variants: Set<string>; count: number }
  >();

  for (const post of posts) {
    for (const tag of post.data.tags) {
      const slug = slugify(tag);
      if (!slug) continue;

      const current = grouped.get(slug) ?? {
        labelCounts: new Map<string, number>(),
        variants: new Set<string>(),
        count: 0,
      };
      current.labelCounts.set(tag, (current.labelCounts.get(tag) ?? 0) + 1);
      current.variants.add(tag);
      current.count += 1;
      grouped.set(slug, current);
    }
  }

  return [...grouped.entries()]
    .map(([slug, value]) => ({
      slug,
      label: pickRepresentativeLabel(value.labelCounts),
      count: value.count,
      variants: [...value.variants].sort((a, b) => a.localeCompare(b)),
    }))
    .sort((a, b) => a.label.localeCompare(b.label));
};

export const hasNormalizedTag = (tags: string[], slug: string) =>
  tags.some((tag) => slugify(tag) === slug);

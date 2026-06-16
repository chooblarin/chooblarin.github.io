import assert from "node:assert/strict";
import { describe, it } from "node:test";
import {
  generatePostDescription,
  getPostDescription,
  getPostImage,
  getPostOgImage,
  getPostSummary,
} from "./postMetadata.ts";

type TestPost = Parameters<typeof getPostSummary>[0];

const createPost = ({
  id = "example-post",
  body = "",
  description,
  image,
}: {
  id?: string;
  body?: string;
  description?: string;
  image?: string;
} = {}): TestPost =>
  ({
    id,
    body,
    data: {
      title: "Example post",
      date: new Date("2026-01-01T00:00:00.000Z"),
      tags: ["test"],
      description,
      image,
    },
  }) as TestPost;

describe("post metadata", () => {
  it("uses a trimmed frontmatter description when present", () => {
    const post = createPost({
      description: "  Frontmatter description  ",
      body: "Generated description candidate",
    });

    assert.equal(getPostDescription(post), "Frontmatter description");
    assert.equal(getPostSummary(post, "Fallback"), "Frontmatter description");
  });

  it("generates a description from the first prose line", () => {
    const body = `---
title: Ignored frontmatter
---

import Demo from "./Demo.astro";

# Ignored heading

![Ignored image](/image.png)

<Demo />

| Ignored | Table |
| ------- | ----- |

\`\`\`ts
const ignored = true;
\`\`\`

$$
ignored = true
$$

> [Readable **summary**](https://example.com) with \`code\` and <span>tag</span>.
`;

    assert.equal(
      generatePostDescription(body),
      "Readable summary with code and tag.",
    );
  });

  it("falls back when no description can be generated", () => {
    const post = createPost({
      body: `# Heading only

![Image only](/image.png)
`,
    });

    assert.equal(getPostSummary(post, "Site fallback"), "Site fallback");
  });

  it("truncates generated descriptions to 160 characters", () => {
    const generated = generatePostDescription("a".repeat(200));

    assert.equal(generated?.length, 160);
    assert.equal(generated?.endsWith("…"), true);
  });

  it("uses a post image when present and otherwise generates an OG image path", () => {
    const postWithImage = createPost({
      id: "post-with-image",
      image: "  /images/post.png  ",
    });
    const postWithoutImage = createPost({ id: "post-without-image" });

    assert.equal(getPostImage(postWithImage), "/images/post.png");
    assert.equal(getPostOgImage(postWithImage), "/images/post.png");
    assert.equal(getPostOgImage(postWithoutImage), "/og/post-without-image.png");
  });
});

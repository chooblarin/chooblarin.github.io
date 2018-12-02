const path = require("path");
const slugify = require("../src/helper/slugify");

module.exports = (createPage, nodes) => {
  const posts = {};
  for (const { node } of nodes) {
    const {
      frontmatter: { tags }
    } = node;
    for (const tag of tags) {
      const tagSlug = slugify(tag);
      if (!posts[tagSlug]) {
        posts[tagSlug] = { tag, items: [] };
      }
      posts[tagSlug].items.push(node);
    }
  }

  // tags page
  const tagListTemplate = path.resolve("src/templates/tag-list.js");

  createPage({
    path: `/tags`,
    component: tagListTemplate,
    context: {
      posts
    }
  });

  // pages for each tag
  const postListByTagTemplate = path.resolve(
    "src/templates/post-list-by-tag.js"
  );

  Object.keys(posts).forEach(tagSlug => {
    const { tag, items } = posts[tagSlug];
    createPage({
      path: `/tags/${tagSlug}`,
      component: postListByTagTemplate,
      context: {
        tag,
        items
      }
    });
  });
};

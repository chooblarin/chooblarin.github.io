const path = require("path");
const slugify = require("../src/helper/slugify");

module.exports = (createPage, nodes) => {
  const templatePath = path.resolve("src/templates/tags.js");
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
  createPage({
    path: `/tags`,
    component: templatePath,
    context: {
      posts
    }
  });

  // pages for each tag
  Object.keys(posts).forEach(tagSlug => {
    const { tag, items } = posts[tagSlug];
    createPage({
      path: `/tags/${tagSlug}`,
      component: templatePath,
      context: {
        tag,
        items
      }
    });
  });
};

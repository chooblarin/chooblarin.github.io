const path = require("path");

module.exports = (createPage, nodes) => {
  const blogTemplate = path.resolve(`src/templates/blog-post.js`);
  nodes.forEach(({ node }) => {
    createPage({
      path: node.frontmatter.slug,
      tags: node.frontmatter.tags || [],
      component: blogTemplate,
      context: {
        slug: node.frontmatter.slug
      }
    });
  });
};

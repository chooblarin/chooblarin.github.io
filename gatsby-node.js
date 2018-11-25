const path = require("path");

exports.createPages = ({ actions: { createPage }, graphql }) => {
  const blogTemplate = path.resolve(`src/templates/blog-post.js`);
  return graphql(`
    {
      allMarkdownRemark(limit: 1000) {
        edges {
          node {
            frontmatter {
              slug
              tags
            }
          }
        }
      }
    }
  `).then(result => {
    if (result.errors) {
      result.errors.forEach(e => console.error(e.toString()));
      return Promise.reject(result.errors);
    }

    result.data.allMarkdownRemark.edges.forEach(({ node }) => {
      createPage({
        path: node.frontmatter.slug,
        tags: node.frontmatter.tags || [],
        component: blogTemplate,
        context: {
          slug: node.frontmatter.slug
        }
      });
    });
  });
};

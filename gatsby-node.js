const path = require("path");

exports.createPages = ({ actions: { createPage }, graphql }) => {
  const blogTemplate = path.resolve(`src/templates/blog-post.js`);
  return graphql(`
    {
      allMarkdownRemark(limit: 1000) {
        edges {
          id
          fields {
            slug
          }
          node {
            frontmatter {
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
      console.log(node);
      createPage({
        path: node.fields.slug,
        tags: edge.node.frontmatter.tags,
        component: blogTemplate,
        context: {
          id
        }
      });
    });
  });
};

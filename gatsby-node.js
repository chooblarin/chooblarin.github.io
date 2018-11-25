const createPostsPage = require("./gatsby-actions/create-posts-page");

exports.createPages = ({ actions: { createPage }, graphql }) => {
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
    const posts = result.data.allMarkdownRemark.edges;

    createPostsPage(createPage, posts);
  });
};

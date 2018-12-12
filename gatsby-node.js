const createPosts = require("./gatsby-actions/create-posts");
const createPaginatedPosts = require("./gatsby-actions/create-pagenated-posts");
const createTagsPages = require("./gatsby-actions/create-tags-pages");

exports.createPages = ({ actions: { createPage }, graphql }) => {
  return graphql(`
    {
      allMarkdownRemark(
        sort: { fields: [frontmatter___date], order: DESC }
        limit: 1000
      ) {
        edges {
          node {
            id
            frontmatter {
              title
              date(formatString: "MMMM DD, YYYY")
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
    createPosts(createPage, posts);
    createPaginatedPosts(createPage, posts);
    createTagsPages(createPage, posts);
  });
};

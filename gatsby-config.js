const path = require(`path`);

module.exports = {
  siteMetadata: {
    title: `chooblarin's blog`
  },
  plugins: [
    `gatsby-plugin-react-helmet`,
    {
      resolve: `gatsby-source-filesystem`,
      options: {
        path: path.join(__dirname, `blog`),
        name: "markdown-pages"
      }
    },
    {
      resolve: `gatsby-transformer-remark`,
      options: {
        plugins: [`gatsby-remark-embed-gist`]
      }
    },
    `gatsby-plugin-twitter`,
    `gatsby-plugin-purgecss`
  ]
};

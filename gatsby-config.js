const path = require(`path`);

module.exports = {
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
        plugins: [`gatsby-remark-katex`, `gatsby-remark-embed-gist`]
      }
    },
    `gatsby-plugin-twitter`,
    `gatsby-plugin-purgecss`
  ]
};

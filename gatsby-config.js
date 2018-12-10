const path = require(`path`);

module.exports = {
  siteMetadata: {
    title: `chooblarin's blog`
  },
  plugins: [
    `gatsby-plugin-emotion`,
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
        plugins: [
          `gatsby-remark-embed-gist`,
          {
            resolve: `gatsby-remark-prismjs`,
            options: {
              noInlineHighlight: true
            }
          }
        ]
      }
    },
    `gatsby-plugin-twitter`,
    `gatsby-plugin-purgecss`
  ]
};

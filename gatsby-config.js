const path = require(`path`);

module.exports = {
  siteMetadata: {
    title: `chooblarin's blog`,
    slogan: `Sympathy Driven Development`,
    pageURL: `https://chooblarin.github.io`
  },
  plugins: [
    {
      resolve: `gatsby-plugin-manifest`,
      options: {
        name: `chooblarin's blog`,
        short_name: `chooblarin`,
        start_url: `/`,
        background_color: `#ffffff`,
        theme_color: `#ad1edc`,
        display: `standalone`,
        icon: `static/images/icon-512x512.png`,
        legacy: true
      }
    },
    `gatsby-plugin-offline`,
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
    {
      resolve: `gatsby-plugin-google-analytics`,
      options: {
        trackingId: "UA-62520326-2",
        anonymize: true
      }
    },
    `gatsby-plugin-twitter`,
    {
      resolve: `gatsby-plugin-purgecss`,
      options: {
        ignore: [`prismjs/themes/prism-twilight.css`]
      }
    }
  ]
};

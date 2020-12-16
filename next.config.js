const withPlugins = require("next-compose-plugins");
const optimizedImages = require("next-optimized-images");

module.exports = withPlugins(
  [
    [
      optimizedImages,
      {
        handleImages: ["svg"],
        svgo: {
          removeViewBox: false,
          convertStyleToAttrs: false,
        },
      },
    ],
  ],
  {
    webpack: (config, { isServer }) => {
      if (isServer) {
        require("./generate-sitemap");
      }
      return config;
    },
    reactStrictMode: true,
  }
);

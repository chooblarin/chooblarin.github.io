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
    reactStrictMode: true,
  }
);

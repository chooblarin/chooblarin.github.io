/**
 * @type {import('next').NextConfig}
 */
const nextConfig = {
  webpack(config) {
    config.module.rules.push({
      test: /\.svg$/,
      use: "@svgr/webpack",
    });
    return config;
  },
  compiler: {
    emotion: true,
  },
  output: "export",
  reactStrictMode: true,
};

module.exports = nextConfig;

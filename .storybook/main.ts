import type { StorybookConfig } from "@storybook/react-vite";
import { mergeConfig } from "vite";

const config: StorybookConfig = {
  framework: {
    name: "@storybook/react-vite",
    options: {},
  },
  stories: ["../src/**/*.stories.@(ts|tsx)"],
  addons: [],
  docs: {
    autodocs: "tag",
  },
  viteFinal: async (baseConfig) =>
    mergeConfig(baseConfig, {
      // Force automatic JSX runtime for Storybook transforms.
      esbuild: {
        jsx: "automatic",
        jsxImportSource: "react",
      },
      optimizeDeps: {
        esbuildOptions: {
          jsx: "automatic",
          jsxImportSource: "react",
        },
      },
    }),
};

export default config;

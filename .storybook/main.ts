import type { StorybookConfig } from "@storybook/react-vite";
import { mergeConfig } from "vite";

const config: StorybookConfig = {
  framework: { name: "@storybook/react-vite", options: {} },
  stories: ["../src/**/*.stories.@(ts|tsx)"],
  addons: [],
  // The project's tsconfig targets Astro's JSX; force React's automatic
  // runtime for Storybook so stories don't need `import React`.
  viteFinal: (baseConfig) =>
    mergeConfig(baseConfig, {
      esbuild: { jsx: "automatic", jsxImportSource: "react" },
      build: {
        chunkSizeWarningLimit: 1200,
      },
    }),
};

export default config;

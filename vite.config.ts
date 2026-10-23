// vp migrate: merged .oxlintrc.json (dcc4643b80969ade9b561d85029312b2).
import { defineConfig } from "vite-plus";

export default defineConfig({
  fmt: {
    printWidth: 80,
    sortPackageJson: false,
    astro: {},
    ignorePatterns: ["src/content", "public/styles/katex"],
  },
  lint: {
    plugins: ["oxc", "typescript", "unicorn", "react", "jsx-a11y"],
    ignorePatterns: ["src/env.d.ts"],
    options: {
      denyWarnings: true,
      // Keep type checking in astro check so .astro files are checked too.
      typeAware: false,
      typeCheck: false,
    },
    jsPlugins: [
      {
        name: "vite-plus",
        specifier: "vite-plus/oxlint-plugin",
      },
    ],
    rules: {
      "vite-plus/prefer-vite-plus-imports": "error",
    },
  },
});

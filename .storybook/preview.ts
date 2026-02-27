import type { Preview } from "@storybook/react-vite";

import "../src/styles/tokens.css";
import "../src/styles/base.css";
import "../src/styles/typography.css";

const preview: Preview = {
  parameters: {
    controls: {
      matchers: {
        color: /(background|color)$/i,
        date: /Date$/i,
      },
    },
    layout: "centered",
  },
};

export default preview;

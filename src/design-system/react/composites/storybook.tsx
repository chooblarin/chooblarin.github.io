import type { Decorator } from "@storybook/react-vite";

export const withPageFrame = (maxWidth: string): Decorator => {
  const decorator: Decorator = (Story) => (
    <div
      style={{
        padding: "0 16px 96px",
        maxWidth,
        margin: "0 auto",
      }}
    >
      <Story />
    </div>
  );

  return decorator;
};

export const compositeStoryParameters = {
  layout: "fullscreen" as const,
};

export const withNarrowPageFrame = withPageFrame("740px");
export const withWidePageFrame = withPageFrame("1100px");

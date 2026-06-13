import type { Meta, StoryObj } from "@storybook/react-vite";

import PostItem from "./PostItem";

const meta: Meta<typeof PostItem> = {
  title: "Patterns/PostItem",
  component: PostItem,
  tags: ["autodocs"],
  args: {
    href: "/post/p5js-webcam-and-shader",
    title: "p5.jsとShaderの画像エフェクト",
    date: "2023-12-02",
  },
};
export default meta;

type Story = StoryObj<typeof PostItem>;
export const Default: Story = {};

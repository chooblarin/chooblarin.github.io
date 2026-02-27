import type { Meta, StoryObj } from "@storybook/react-vite";

import PostItem from "./PostItem";
import { compositeStoryParameters, withNarrowPageFrame } from "./storybook";

const meta: Meta<typeof PostItem> = {
  title: "Design System/Composites/PostItem",
  component: PostItem,
  tags: ["autodocs"],
  parameters: compositeStoryParameters,
  decorators: [withNarrowPageFrame],
  args: {
    href: "/post/sample-entry",
    title: "Design tokensを見直して可読性を改善した話",
    date: "2026-02-27",
    emphasis: "default",
  },
};

export default meta;

type Story = StoryObj<typeof PostItem>;

export const Default: Story = {};

export const LongTitle: Story = {
  args: {
    title:
      "Composites設計を段階導入しながら、Storybook中心で破壊的変更を安全に進めるための運用ガイド",
  },
};

export const Subtle: Story = {
  args: {
    emphasis: "subtle",
  },
};

export const BeforeLike: Story = {
  args: {
    emphasis: "default",
  },
};

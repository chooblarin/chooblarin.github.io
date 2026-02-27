import type { Meta, StoryObj } from "@storybook/react-vite";

import PostNavCard from "./PostNavCard";
import {
  compositeStoryParameters,
  withNarrowPageFrame,
} from "./storybook";

const meta: Meta<typeof PostNavCard> = {
  title: "Design System/Composites/PostNavCard",
  component: PostNavCard,
  tags: ["autodocs"],
  parameters: compositeStoryParameters,
  decorators: [withNarrowPageFrame],
  args: {
    href: "/post/sample-entry",
    title: "記事詳細ページのコンポーネント責務を整理した",
    date: "2026-02-27",
    label: "前の記事",
  },
};

export default meta;

type Story = StoryObj<typeof PostNavCard>;

export const Default: Story = {};

export const LongTitle: Story = {
  args: {
    title:
      "TableOfContentsのactive追従をIntersection Observerで実装し、スクロール時の視認性とナビゲーション体験を改善した",
  },
};

export const CustomLabel: Story = {
  args: {
    label: "次の記事",
  },
};

export const BeforeLike: Story = {
  args: {
    label: "前の記事",
  },
};

export const DenseContainer: Story = {
  decorators: [
    (Story) => (
      <div style={{ maxWidth: "26rem" }}>
        <Story />
      </div>
    ),
  ],
};

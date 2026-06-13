import type { Meta, StoryObj } from "@storybook/react-vite";

import PostNavCard from "./PostNavCard";

const meta: Meta<typeof PostNavCard> = {
  title: "Patterns/PostNavCard",
  component: PostNavCard,
  tags: ["autodocs"],
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
      "TableOfContents の active 追従を Intersection Observer で実装し、スクロール時の視認性を改善した",
  },
};
export const NextLabel: Story = { args: { label: "次の記事" } };

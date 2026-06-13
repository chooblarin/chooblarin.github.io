import type { Meta, StoryObj } from "@storybook/react-vite";

import ButtonLink from "./ButtonLink";

const meta: Meta<typeof ButtonLink> = {
  title: "Primitives/ButtonLink",
  component: ButtonLink,
  tags: ["autodocs"],
  args: {
    href: "/",
    children: "Read Article",
    intent: "brand",
    appearance: "solid",
    size: "md",
    external: false,
  },
};
export default meta;

type Story = StoryObj<typeof ButtonLink>;

export const BrandSolid: Story = {};
export const BrandOutline: Story = {
  args: { appearance: "outline", children: "Outline Link" },
};
export const NeutralGhost: Story = {
  args: { intent: "neutral", appearance: "ghost", children: "Secondary Link" },
};
export const DangerOutline: Story = {
  args: { intent: "danger", appearance: "outline", children: "Remove Link" },
};
export const External: Story = {
  args: {
    href: "https://example.com",
    external: true,
    children: "External Button Link",
  },
};

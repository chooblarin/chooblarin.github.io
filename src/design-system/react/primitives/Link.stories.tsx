import type { Meta, StoryObj } from "@storybook/react-vite";

import Link from "./Link";

const meta: Meta<typeof Link> = {
  title: "Primitives/Link",
  component: Link,
  tags: ["autodocs"],
  args: { href: "/", children: "Read more", intent: "brand", decoration: "always" },
};
export default meta;

type Story = StoryObj<typeof Link>;

export const Brand: Story = {};
export const MutedHover: Story = {
  args: { intent: "muted", decoration: "hover", children: "Muted hover link" },
};
export const Danger: Story = { args: { intent: "danger", children: "Danger link" } };
export const NoDecoration: Story = {
  args: { decoration: "none", children: "No decoration" },
};
export const External: Story = {
  args: { href: "https://example.com", external: true, children: "External link" },
};

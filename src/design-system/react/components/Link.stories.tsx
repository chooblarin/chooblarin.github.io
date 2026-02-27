import type { Meta, StoryObj } from "@storybook/react-vite";

import Link from "./Link";

const meta: Meta<typeof Link> = {
  title: "Design System/Link",
  component: Link,
  tags: ["autodocs"],
  args: {
    href: "/",
    children: "Read more",
    tone: "default",
    underline: true,
  },
};

export default meta;

type Story = StoryObj<typeof Link>;

export const Default: Story = {};

export const Muted: Story = {
  args: {
    tone: "muted",
    children: "Muted link",
  },
};

export const NoUnderline: Story = {
  args: {
    underline: false,
    children: "No underline",
  },
};

export const External: Story = {
  args: {
    href: "https://example.com",
    external: true,
    children: "External link",
  },
};

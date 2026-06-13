import type { Meta, StoryObj } from "@storybook/react-vite";

import Button from "./Button";

const meta: Meta<typeof Button> = {
  title: "Primitives/Button",
  component: Button,
  tags: ["autodocs"],
  args: {
    children: "Publish",
    intent: "brand",
    appearance: "solid",
    size: "md",
    disabled: false,
  },
};
export default meta;

type Story = StoryObj<typeof Button>;

export const BrandSolid: Story = {};
export const BrandOutline: Story = {
  args: { appearance: "outline", children: "Preview" },
};
export const NeutralGhost: Story = {
  args: { intent: "neutral", appearance: "ghost", children: "More" },
};
export const DangerSolid: Story = {
  args: { intent: "danger", appearance: "solid", children: "Delete" },
};
export const Disabled: Story = {
  args: { disabled: true, children: "Disabled" },
};

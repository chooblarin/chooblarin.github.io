import type { Meta, StoryObj } from "@storybook/react-vite";

import Button from "./Button";

const meta: Meta<typeof Button> = {
  title: "Design System/Button",
  component: Button,
  tags: ["autodocs"],
  args: {
    children: "Button",
    variant: "solid",
    size: "md",
    disabled: false,
  },
};

export default meta;

type Story = StoryObj<typeof Button>;

export const Solid: Story = {};

export const Outline: Story = {
  args: {
    variant: "outline",
    children: "Outline",
  },
};

export const Ghost: Story = {
  args: {
    variant: "ghost",
    children: "Ghost",
  },
};

export const Disabled: Story = {
  args: {
    disabled: true,
    children: "Disabled",
  },
};

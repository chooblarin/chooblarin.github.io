import type { Meta, StoryObj } from "@storybook/react-vite";

import Menu from "./Menu";

const meta: Meta<typeof Menu> = {
  title: "Design System/Menu",
  component: Menu,
  tags: ["autodocs"],
  args: {
    triggerLabel: "Actions",
    items: [
      { key: "edit", label: "Edit" },
      { key: "duplicate", label: "Duplicate" },
      { key: "archive", label: "Archive" },
    ],
  },
};

export default meta;

type Story = StoryObj<typeof Menu>;

export const Default: Story = {};

export const DisabledItem: Story = {
  args: {
    disabledKeys: ["archive"],
  },
};

import type { Meta, StoryObj } from "@storybook/react-vite";

import Dialog from "./Dialog";

const meta: Meta<typeof Dialog> = {
  title: "Design System/Dialog",
  component: Dialog,
  tags: ["autodocs"],
  args: {
    title: "Delete post",
    description: "This action cannot be undone.",
    triggerLabel: "Open dialog",
    closeLabel: "Cancel",
    children: "Dialog body content",
  },
};

export default meta;

type Story = StoryObj<typeof Dialog>;

export const Default: Story = {};

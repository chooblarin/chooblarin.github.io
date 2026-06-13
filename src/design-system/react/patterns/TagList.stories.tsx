import type { Meta, StoryObj } from "@storybook/react-vite";

import TagList from "./TagList";

const items = [
  { label: "p5.js", href: "/tags/p5js" },
  { label: "JavaScript", href: "/tags/javascript" },
  { label: "GLSL", href: "/tags/glsl" },
];

const meta: Meta<typeof TagList> = {
  title: "Patterns/TagList",
  component: TagList,
  tags: ["autodocs"],
  args: { items, variant: "chip" },
};
export default meta;

type Story = StoryObj<typeof TagList>;
export const Chip: Story = {};
export const Plain: Story = { args: { variant: "plain" } };

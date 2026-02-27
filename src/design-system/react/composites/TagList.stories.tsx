import type { Meta, StoryObj } from "@storybook/react-vite";

import TagList from "./TagList";
import {
  compositeStoryParameters,
  withNarrowPageFrame,
} from "./storybook";

const sampleItems = [
  { label: "#Astro", href: "/tags/astro" },
  { label: "#React", href: "/tags/react" },
  { label: "#DesignSystem", href: "/tags/design-system" },
  { label: "#Typography", href: "/tags/typography" },
];

const meta: Meta<typeof TagList> = {
  title: "Design System/Composites/TagList",
  component: TagList,
  tags: ["autodocs"],
  parameters: compositeStoryParameters,
  decorators: [withNarrowPageFrame],
  args: {
    items: sampleItems,
    variant: "chip",
  },
};

export default meta;

type Story = StoryObj<typeof TagList>;

export const Chip: Story = {};

export const Plain: Story = {
  args: {
    variant: "plain",
  },
};

export const ManyItems: Story = {
  args: {
    items: Array.from({ length: 14 }, (_, index) => ({
      label: `#Tag-${index + 1}`,
      href: `/tags/tag-${index + 1}`,
    })),
  },
};

export const LongTag: Story = {
  args: {
    items: [
      {
        label: "#CompositesArchitectureAndProgressiveEnhancement",
        href: "/tags/composites-architecture-and-progressive-enhancement",
      },
      ...sampleItems.slice(0, 2),
    ],
  },
};

import type { Meta, StoryObj } from "@storybook/react-vite";

import PaginationNav from "./PaginationNav";
import { compositeStoryParameters, withNarrowPageFrame } from "./storybook";

const meta: Meta<typeof PaginationNav> = {
  title: "Design System/Patterns/PaginationNav",
  component: PaginationNav,
  tags: ["autodocs"],
  parameters: compositeStoryParameters,
  decorators: [withNarrowPageFrame],
  args: {
    prevHref: "/page/1",
    nextHref: "/page/3",
    prevLabel: "前へ",
    nextLabel: "次へ",
  },
};

export default meta;

type Story = StoryObj<typeof PaginationNav>;

export const Both: Story = {};

export const PrevOnly: Story = {
  args: {
    prevHref: "/page/1",
    nextHref: undefined,
  },
};

export const NextOnly: Story = {
  args: {
    prevHref: undefined,
    nextHref: "/page/3",
  },
};

export const None: Story = {
  args: {
    prevHref: undefined,
    nextHref: undefined,
  },
};

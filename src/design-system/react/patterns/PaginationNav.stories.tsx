import type { Meta, StoryObj } from "@storybook/react-vite";

import PaginationNav from "./PaginationNav";

const meta: Meta<typeof PaginationNav> = {
  title: "Patterns/PaginationNav",
  component: PaginationNav,
  tags: ["autodocs"],
  args: {
    prevHref: "/page/1",
    nextHref: "/page/3",
    prevLabel: "前のページへ",
    nextLabel: "次のページへ",
  },
};
export default meta;

type Story = StoryObj<typeof PaginationNav>;

export const Both: Story = {};
export const PrevOnly: Story = { args: { nextHref: undefined } };
export const NextOnly: Story = { args: { prevHref: undefined } };
export const None: Story = {
  args: { prevHref: undefined, nextHref: undefined },
};

import type { Meta, StoryObj } from "@storybook/react-vite";

import TableOfContents, {
  type TableOfContentsHeading,
  type TableOfContentsProps,
} from "./TableOfContents";

const basicHeadings: TableOfContentsHeading[] = [
  { id: "intro", text: "はじめに", depth: 2 },
  { id: "constraints", text: "設計上の制約", depth: 2 },
  { id: "rollout", text: "段階的な導入", depth: 2 },
  { id: "notes", text: "補足", depth: 3 },
];

const DemoArticle = ({ headings, ...rest }: TableOfContentsProps) => (
  <div
    style={{
      display: "grid",
      gridTemplateColumns: "minmax(0, 1fr) 18.5rem",
      gap: "2rem",
      alignItems: "start",
    }}
  >
    <article style={{ maxWidth: "680px" }}>
      {headings.map((heading) => {
        const Tag = heading.depth === 2 ? "h2" : "h3";
        return (
          <section key={heading.id} style={{ marginBottom: "5rem" }}>
            <Tag id={heading.id}>{heading.text}</Tag>
            <p>
              目次の active
              追従を確認するためのダミーテキストです。スクロール時の
              挙動と現在位置マーカーを見ます。
            </p>
          </section>
        );
      })}
    </article>
    <TableOfContents headings={headings} {...rest} />
  </div>
);

const meta: Meta<typeof TableOfContents> = {
  title: "Patterns/TableOfContents",
  component: TableOfContents,
  tags: ["autodocs"],
  args: {
    headings: basicHeadings,
    activeTracking: true,
    maxDepth: 3,
  },
};
export default meta;

type Story = StoryObj<typeof TableOfContents>;

export const Basic: Story = { render: (args) => <DemoArticle {...args} /> };
export const Empty: Story = { args: { headings: [] } };
export const ActiveTrackingOff: Story = {
  args: { activeTracking: false },
  render: (args) => <DemoArticle {...args} />,
};

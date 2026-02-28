import type { Meta, StoryObj } from "@storybook/react-vite";
import { compositeStoryParameters, withWidePageFrame } from "./storybook";
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

const manyHeadings: TableOfContentsHeading[] = [
  { id: "h1", text: "概要", depth: 2 },
  { id: "h2", text: "前提", depth: 2 },
  { id: "h3", text: "設計", depth: 2 },
  { id: "h4", text: "設計詳細", depth: 3 },
  { id: "h5", text: "実装方針", depth: 2 },
  { id: "h6", text: "検証", depth: 2 },
  { id: "h7", text: "運用", depth: 2 },
  { id: "h8", text: "FAQ", depth: 3 },
  { id: "h9", text: "まとめ", depth: 2 },
];

const DemoArticle = ({
  headings,
  ...tableOfContentsProps
}: TableOfContentsProps) => (
  <div
    style={{
      width: "100%",
      display: "grid",
      gridTemplateColumns: "280px minmax(0, 1fr)",
      gap: "2rem",
      alignItems: "start",
    }}
  >
    <TableOfContents headings={headings} {...tableOfContentsProps} />
    <article style={{ maxWidth: "680px" }}>
      {headings.map((heading) => {
        const Tag = heading.depth === 2 ? "h2" : "h3";
        return (
          <section key={heading.id} style={{ marginBottom: "5rem" }}>
            <Tag id={heading.id}>{heading.text}</Tag>
            <p>
              Storybook上で目次のactive追従を確認するためのダミーテキストです。
              ある程度の縦幅を確保してスクロール時の挙動を見ます。
            </p>
            <p>
              段落を追加し、見出しの切り替わり位置がわかるようにしています。
              キーボードフォーカス時はfocus-visibleリングのみ表示されます。
            </p>
          </section>
        );
      })}
    </article>
  </div>
);

const meta: Meta<typeof TableOfContents> = {
  title: "Design System/Patterns/TableOfContents",
  component: TableOfContents,
  tags: ["autodocs"],
  parameters: compositeStoryParameters,
  decorators: [withWidePageFrame],
  args: {
    headings: basicHeadings,
    activeTracking: true,
    maxDepth: 3,
    stickyTop: 128,
  },
};

export default meta;

type Story = StoryObj<typeof TableOfContents>;

export const Basic: Story = {
  render: (args) => <DemoArticle {...args} />,
};

export const ManyHeadings: Story = {
  args: {
    headings: manyHeadings,
  },
  render: (args) => <DemoArticle {...args} />,
};

export const Empty: Story = {
  args: {
    headings: [],
  },
};

export const ActiveTrackingOff: Story = {
  args: {
    activeTracking: false,
  },
  render: (args) => <DemoArticle {...args} />,
};

export const BeforeLike: Story = {
  args: {
    activeTracking: true,
    stickyTop: 128,
  },
  render: (args) => <DemoArticle {...args} />,
};

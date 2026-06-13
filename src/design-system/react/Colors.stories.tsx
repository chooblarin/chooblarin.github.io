import type { Meta, StoryObj } from "@storybook/react-vite";

const SEMANTIC = [
  "primary",
  "primary-hover",
  "deep",
  "accent",
  "accent-strong",
  "highlight",
  "text",
  "text-muted",
  "background",
  "surface",
  "border",
  "border-strong",
] as const;

const PALETTE = ["navy", "purple", "teal", "yellow"] as const;

function Swatch({ name, varName }: { name: string; varName: string }) {
  return (
    <div style={{ display: "grid", gap: 6, width: 132 }}>
      <div
        style={{
          height: 56,
          borderRadius: 10,
          background: `var(${varName})`,
          border: "1px solid var(--color-border)",
        }}
      />
      <code style={{ fontSize: 12, color: "var(--color-text-muted)" }}>
        {name}
      </code>
    </div>
  );
}

function Palette() {
  return (
    <div
      style={{
        display: "grid",
        gap: 24,
        padding: 24,
        background: "var(--color-background)",
        color: "var(--color-text)",
      }}
    >
      <section>
        <h3>Palette (raw)</h3>
        <div style={{ display: "flex", flexWrap: "wrap", gap: 16 }}>
          {PALETTE.map((p) => (
            <Swatch key={p} name={`--palette-${p}`} varName={`--palette-${p}`} />
          ))}
        </div>
      </section>
      <section>
        <h3>Semantic tokens</h3>
        <div style={{ display: "flex", flexWrap: "wrap", gap: 16 }}>
          {SEMANTIC.map((s) => (
            <Swatch key={s} name={`--color-${s}`} varName={`--color-${s}`} />
          ))}
        </div>
      </section>
    </div>
  );
}

const meta: Meta<typeof Palette> = {
  title: "Foundations/Colors",
  component: Palette,
  parameters: { layout: "fullscreen" },
};
export default meta;

export const LightAndDark: StoryObj<typeof Palette> = {};

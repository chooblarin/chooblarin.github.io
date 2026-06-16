import { Resvg } from "@resvg/resvg-js";
import { createElement } from "react";
import satori, { type Font } from "satori";
import { createRequire } from "node:module";
import { readdir, readFile } from "node:fs/promises";
import path from "node:path";
import { layoutOgTitle } from "./ogTitleLayout";

const OG_IMAGE_WIDTH = 1200;
const OG_IMAGE_HEIGHT = 630;
const TITLE_MAX_WIDTH = 980;
const FONT_FAMILY_PREFIX = "Noto Sans JP";
const AUTHOR_LINE = "By sotahatakeyama (@chooblarin)";

const require = createRequire(import.meta.url);
const notoSansJpPackagePath =
  require.resolve("@fontsource/noto-sans-jp/package.json");
const notoSansJpFilesDir = path.join(
  path.dirname(notoSansJpPackagePath),
  "files",
);

let fontPromise: Promise<Font[]> | undefined;

const loadFonts = async () => {
  const fontFiles = (await readdir(notoSansJpFilesDir))
    .filter((file) => file.endsWith("-700-normal.woff"))
    .sort();

  return Promise.all(
    fontFiles.map(async (file, index) => ({
      name: `${FONT_FAMILY_PREFIX} ${index}`,
      data: await readFile(path.join(notoSansJpFilesDir, file)),
      weight: 700,
      style: "normal",
    })),
  ) satisfies Promise<Font[]>;
};

const getFonts = () => {
  fontPromise ??= loadFonts();
  return fontPromise;
};

const getFontFamily = (fonts: Font[]) =>
  fonts.map((font) => `"${font.name}"`).join(", ");

export const renderGeneratedOgImage = async (title: string) => {
  const fonts = await getFonts();
  const fontFamily = getFontFamily(fonts);
  const titleLayout = layoutOgTitle(title);

  const svg = await satori(
    createElement(
      "div",
      {
        lang: "ja-JP",
        style: {
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          backgroundColor: "#fafcff",
          color: "#492e87",
          padding: "72px 84px",
          fontFamily,
          fontWeight: 700,
        },
      },
      createElement("div", {
        style: {
          width: "100%",
          height: "8px",
          display: "flex",
          background:
            "linear-gradient(90deg, #0a1d56 0%, #492e87 58%, #37b5b6 100%)",
          borderRadius: "999px",
        },
      }),
      createElement(
        "div",
        {
          style: {
            display: "flex",
            flexDirection: "column",
            gap: "40px",
          },
        },
        createElement(
          "div",
          {
            style: {
              display: "flex",
              flexDirection: "column",
              color: "#0a1d56",
              fontSize: titleLayout.fontSize,
              lineHeight: 1.08,
              letterSpacing: "0",
              width: `${TITLE_MAX_WIDTH}px`,
            },
          },
          titleLayout.lines.map((line, index) =>
            createElement(
              "div",
              {
                key: `${line}-${index}`,
                style: {
                  display: "flex",
                  whiteSpace: "nowrap",
                },
              },
              line,
            ),
          ),
        ),
        createElement(
          "div",
          {
            style: {
              display: "flex",
              color: "#6e7380",
              fontSize: 34,
              lineHeight: 1.2,
              letterSpacing: "0",
            },
          },
          AUTHOR_LINE,
        ),
      ),
      createElement("div", {
        style: {
          width: "28%",
          height: "8px",
          display: "flex",
          backgroundColor: "#37b5b6",
          borderRadius: "999px",
        },
      }),
    ),
    {
      width: OG_IMAGE_WIDTH,
      height: OG_IMAGE_HEIGHT,
      fonts,
    },
  );

  return new Resvg(svg, {
    fitTo: { mode: "original" },
    textRendering: 1,
  })
    .render()
    .asPng();
};

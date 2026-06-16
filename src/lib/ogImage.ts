import { Resvg } from "@resvg/resvg-js";
import { createElement } from "react";
import satori, { type Font } from "satori";
import { createRequire } from "node:module";
import { readdir, readFile } from "node:fs/promises";
import path from "node:path";
import { layoutOgTitle } from "./ogTitleLayout";

const OG_IMAGE_WIDTH = 1200;
const OG_IMAGE_HEIGHT = 630;
const OG_IMAGE_SCALE = 2;
const TITLE_MAX_WIDTH = 850;
const LOGO_IMAGE_SIZE = 80;
const CONTENT_GAP = 36;
const FONT_FAMILY_PREFIX = "Noto Sans JP";
const AUTHOR_LINE = "By sotahatakeyama (@chooblarin)";

const require = createRequire(import.meta.url);
const notoSansJpPackagePath =
  require.resolve("@fontsource/noto-sans-jp/package.json");
const notoSansJpFilesDir = path.join(
  path.dirname(notoSansJpPackagePath),
  "files",
);
const logoImagePath = path.join(process.cwd(), "public/favicon.svg");

let fontPromise: Promise<Font[]> | undefined;
let logoImagePromise: Promise<string> | undefined;

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

const loadLogoImage = async () =>
  `data:image/svg+xml;base64,${(await readFile(logoImagePath)).toString(
    "base64",
  )}`;

const getLogoImage = () => {
  logoImagePromise ??= loadLogoImage();
  return logoImagePromise;
};

const getFontFamily = (fonts: Font[]) =>
  fonts.map((font) => `"${font.name}"`).join(", ");

export const renderGeneratedOgImage = async (title: string) => {
  const fonts = await getFonts();
  const logoImage = await getLogoImage();
  const fontFamily = getFontFamily(fonts);
  const titleLayout = layoutOgTitle(title, { maxWidth: TITLE_MAX_WIDTH });

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
          justifyContent: "center",
          backgroundColor: "#fafcff",
          color: "#0a1d56",
          padding: "72px 84px",
          fontFamily,
          fontWeight: 700,
        },
      },
      createElement(
        "div",
        {
          style: {
            display: "flex",
            flexDirection: "row",
            gap: `${CONTENT_GAP}px`,
            alignItems: "flex-start",
            width: "100%",
          },
        },
        createElement("img", {
          alt: "",
          src: logoImage,
          width: LOGO_IMAGE_SIZE,
          height: LOGO_IMAGE_SIZE,
          style: {
            display: "flex",
            width: `${LOGO_IMAGE_SIZE}px`,
            height: `${LOGO_IMAGE_SIZE}px`,
            objectFit: "contain",
          },
        }),
        createElement(
          "div",
          {
            style: {
              display: "flex",
              flexDirection: "column",
              gap: "28px",
              width: `${TITLE_MAX_WIDTH}px`,
            },
          },
          createElement(
            "div",
            {
              style: {
                display: "flex",
                flexDirection: "column",
                fontSize: titleLayout.fontSize,
                lineHeight: 1.14,
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
                fontSize: 28,
                lineHeight: 1.2,
                letterSpacing: "0",
              },
            },
            AUTHOR_LINE,
          ),
        ),
      ),
    ),
    {
      width: OG_IMAGE_WIDTH,
      height: OG_IMAGE_HEIGHT,
      fonts,
    },
  );

  return new Resvg(svg, {
    fitTo: { mode: "width", value: OG_IMAGE_WIDTH * OG_IMAGE_SCALE },
    textRendering: 1,
  })
    .render()
    .asPng();
};

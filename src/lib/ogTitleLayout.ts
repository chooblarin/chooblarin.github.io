const TITLE_MAX_WIDTH = 980;
const TITLE_MAX_LINES = 3;
const TITLE_MAX_FONT_SIZE = 64;
const TITLE_MIN_FONT_SIZE = 52;
const TITLE_FONT_SIZE_STEP = 4;
const INVISIBLE_FORMAT_CHARACTERS = /[\u200b\u200e\u200f\u2060\ufeff]/g;
const LINE_START_PROHIBITED = new Set(
  Array.from(
    "、。，．・：；？！゛゜ヽヾゝゞ々ー）］｝〕〉》」』】〙〗〟’”｠»ぁぃぅぇぉっゃゅょゎァィゥェォッャュョヮヵヶ",
  ),
);
const LINE_END_PROHIBITED = new Set(
  Array.from("（［｛〔〈《「『【〘〖〝‘“｟«"),
);
const LINE_START_AVOIDED_TOKENS = new Set([
  "を",
  "が",
  "に",
  "へ",
  "と",
  "で",
  "の",
  "は",
  "も",
  "や",
  "から",
  "まで",
  "より",
  "する",
  "した",
]);

export type OgTitleLayout = {
  lines: string[];
  fontSize: number;
};

type OgTitleLayoutOptions = {
  maxWidth?: number;
};

type LayoutCandidate = {
  lines: string[];
  score: number;
};

const sanitizeOgText = (value: string) =>
  value.replace(INVISIBLE_FORMAT_CHARACTERS, "").trim();

const splitGraphemes = (value: string) => {
  if ("Segmenter" in Intl) {
    const segmenter = new Intl.Segmenter("ja-JP", {
      granularity: "grapheme",
    });
    return Array.from(segmenter.segment(value), ({ segment }) => segment);
  }

  return Array.from(value);
};

const isAsciiWordPart = (value: string) => /^[\w.+#@:/-]$/.test(value);

const tokenizeByGrapheme = (title: string) => {
  const tokens: string[] = [];
  let asciiRun = "";

  for (const grapheme of splitGraphemes(title)) {
    if (isAsciiWordPart(grapheme)) {
      asciiRun += grapheme;
      continue;
    }

    if (asciiRun) {
      tokens.push(asciiRun);
      asciiRun = "";
    }
    tokens.push(grapheme);
  }

  if (asciiRun) tokens.push(asciiRun);
  return tokens;
};

const tokenizeByStrictGrapheme = (title: string) => splitGraphemes(title);

const tokenizeByWord = (title: string) => {
  if ("Segmenter" in Intl) {
    const segmenter = new Intl.Segmenter("ja-JP", {
      granularity: "word",
    });
    return Array.from(segmenter.segment(title), ({ segment }) => segment);
  }

  return undefined;
};

const getFirstGrapheme = (value: string) => splitGraphemes(value)[0] ?? "";
const getLastGrapheme = (value: string) => splitGraphemes(value).at(-1) ?? "";

const canBreakBetween = (before: string, after: string) =>
  !LINE_END_PROHIBITED.has(getLastGrapheme(before)) &&
  !LINE_START_PROHIBITED.has(getFirstGrapheme(after)) &&
  !LINE_START_AVOIDED_TOKENS.has(after.trim());

const estimateTokenWidth = (token: string) =>
  splitGraphemes(token).reduce((width, grapheme) => {
    if (/^\s$/.test(grapheme)) return width + 0.35;
    if (/^[\x20-\x7e]$/.test(grapheme)) return width + 0.52;
    return width + 1;
  }, 0);

const getRangeWidth = (widths: number[], start: number, end: number) =>
  widths.slice(start, end).reduce((total, width) => total + width, 0);

const createLine = (tokens: string[], start: number, end: number) =>
  tokens.slice(start, end).join("").trim();

const appendEllipsis = (line: string, maxWidth: number) => {
  const ellipsis = "…";
  let nextLine = line.trimEnd();

  while (
    nextLine.length > 0 &&
    (estimateTokenWidth(`${nextLine}${ellipsis}`) > maxWidth ||
      LINE_END_PROHIBITED.has(getLastGrapheme(nextLine)))
  ) {
    nextLine = splitGraphemes(nextLine).slice(0, -1).join("").trimEnd();
  }

  return `${nextLine}${ellipsis}`;
};

const getLineScore = (
  width: number,
  targetWidth: number,
  isLastLine: boolean,
  hasMultipleLines: boolean,
) => {
  let score = (width - targetWidth) ** 2;

  if (isLastLine && hasMultipleLines && width < targetWidth * 0.65) {
    score += (targetWidth * 0.65 - width) ** 2 * 8;
  }

  return score;
};

const layoutBalancedLines = (
  tokens: string[],
  widths: number[],
  maxWidth: number,
  lineCount: number,
) => {
  type State = {
    score: number;
    previousIndex: number;
    lineWidth: number;
  };

  const dp = Array.from(
    { length: lineCount + 1 },
    () => new Map<number, State>(),
  );
  const totalWidth = getRangeWidth(widths, 0, widths.length);
  const targetWidth = Math.min(maxWidth, totalWidth / lineCount);

  dp[0].set(0, { score: 0, previousIndex: -1, lineWidth: 0 });

  for (let lineNumber = 1; lineNumber <= lineCount; lineNumber += 1) {
    const isLastLine = lineNumber === lineCount;
    const remainingLines = lineCount - lineNumber;

    for (const [startIndex, previousState] of dp[lineNumber - 1]) {
      for (
        let endIndex = startIndex + 1;
        endIndex <= tokens.length - remainingLines;
        endIndex += 1
      ) {
        const lineWidth = getRangeWidth(widths, startIndex, endIndex);

        if (lineWidth > maxWidth) break;
        if (
          endIndex < tokens.length &&
          !canBreakBetween(tokens[endIndex - 1], tokens[endIndex])
        ) {
          continue;
        }

        const score =
          previousState.score +
          getLineScore(lineWidth, targetWidth, isLastLine, lineCount > 1);
        const currentState = dp[lineNumber].get(endIndex);

        if (!currentState || score < currentState.score) {
          dp[lineNumber].set(endIndex, {
            score,
            previousIndex: startIndex,
            lineWidth,
          });
        }
      }
    }
  }

  const finalState = dp[lineCount].get(tokens.length);
  if (!finalState) return undefined;

  const ranges: Array<{ start: number; end: number; width: number }> = [];
  let endIndex = tokens.length;

  for (let lineNumber = lineCount; lineNumber > 0; lineNumber -= 1) {
    const state = dp[lineNumber].get(endIndex);
    if (!state) return undefined;

    ranges.unshift({
      start: state.previousIndex,
      end: endIndex,
      width: state.lineWidth,
    });
    endIndex = state.previousIndex;
  }

  const lineWidths = ranges.map(({ width }) => width);
  const maxLineWidth = Math.max(...lineWidths);
  const minLineWidth = Math.min(...lineWidths);
  const balancePenalty = (maxLineWidth - minLineWidth) ** 2 * 0.8;
  const lineCountPenalty = lineCount * 0.5;

  return {
    lines: ranges.map(({ start, end }) => createLine(tokens, start, end)),
    score: finalState.score + balancePenalty + lineCountPenalty,
  };
};

const layoutTokenizedTitle = (
  tokens: string[],
  maxWidth: number,
): LayoutCandidate | undefined => {
  const widths = tokens.map(estimateTokenWidth);
  const totalWidth = getRangeWidth(widths, 0, widths.length);
  const minLineCount = Math.max(1, Math.ceil(totalWidth / maxWidth));
  const firstLineCount = Math.min(minLineCount, TITLE_MAX_LINES);
  const candidates: LayoutCandidate[] = [];

  for (
    let lineCount = firstLineCount;
    lineCount <= TITLE_MAX_LINES;
    lineCount += 1
  ) {
    const candidate = layoutBalancedLines(tokens, widths, maxWidth, lineCount);
    if (!candidate) continue;

    candidates.push({
      ...candidate,
      score: candidate.score + (lineCount - firstLineCount) * 32,
    });
  }

  return candidates.sort((a, b) => a.score - b.score)[0];
};

const getFontSizeCandidates = () => {
  const candidates = [];

  for (
    let fontSize = TITLE_MAX_FONT_SIZE;
    fontSize >= TITLE_MIN_FONT_SIZE;
    fontSize -= TITLE_FONT_SIZE_STEP
  ) {
    candidates.push(fontSize);
  }

  return candidates;
};

const layoutWithFontSize = (
  title: string,
  fontSize: number,
  titleMaxWidth: number,
) => {
  const maxWidth = titleMaxWidth / fontSize;
  const wordCandidate = tokenizeByWord(title);
  const tokenSets = wordCandidate
    ? [
        wordCandidate,
        tokenizeByGrapheme(title),
        tokenizeByStrictGrapheme(title),
      ]
    : [tokenizeByGrapheme(title), tokenizeByStrictGrapheme(title)];

  for (const tokens of tokenSets) {
    const candidate = layoutTokenizedTitle(tokens, maxWidth);
    if (candidate) return candidate;
  }

  return undefined;
};

export const layoutOgTitle = (
  title: string,
  options: OgTitleLayoutOptions = {},
): OgTitleLayout => {
  const titleMaxWidth = options.maxWidth ?? TITLE_MAX_WIDTH;
  const sanitizedTitle = sanitizeOgText(title);
  if (sanitizedTitle.length === 0) {
    return { lines: [""], fontSize: TITLE_MAX_FONT_SIZE };
  }

  for (const fontSize of getFontSizeCandidates()) {
    const candidate = layoutWithFontSize(
      sanitizedTitle,
      fontSize,
      titleMaxWidth,
    );
    if (candidate && candidate.lines.length <= TITLE_MAX_LINES) {
      return { lines: candidate.lines, fontSize };
    }
  }

  const fontSize = TITLE_MIN_FONT_SIZE;
  const maxWidth = titleMaxWidth / fontSize;
  return {
    lines: [appendEllipsis(sanitizedTitle, maxWidth)],
    fontSize,
  };
};

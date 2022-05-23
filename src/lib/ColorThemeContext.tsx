import React from "react";
import { themeColors } from "src/constants";

type ColorMode = "light" | "dark";

type ColorTheme = {
  colorMode: ColorMode;
  changeColorMode: (cm: "light" | "dark") => void;
};

export const ColorThemeContext = React.createContext<ColorTheme | null>(null);

export const ColorThemeProvider = ({
  children,
}: {
  children: React.ReactNode;
}) => {
  const [colorMode, setColorMode] = React.useState<ColorMode | undefined>(
    undefined
  );
  React.useEffect(() => {
    const root = window.document.documentElement;
    const initialColorValue = root.style.getPropertyValue(
      "--initial-color-mode"
    );
    setColorMode(initialColorValue as ColorMode);
  }, []);

  const changeColorMode = (mode: ColorMode) => {
    setColorMode(mode);

    window.localStorage.setItem("color-mode", mode);

    const root = window.document.documentElement;
    root.style.setProperty("--initial-color-mode", mode);
    root.style.setProperty(
      "--color-text",
      mode === "light"
        ? themeColors.light.textColor
        : themeColors.dark.textColor
    );
    root.style.setProperty(
      "--color-sub-text",
      mode === "light"
        ? themeColors.light.subTextColor
        : themeColors.dark.subTextColor
    );
    root.style.setProperty(
      "--color-background",
      mode === "light"
        ? themeColors.light.backgroundColor
        : themeColors.dark.backgroundColor
    );
    root.style.setProperty(
      "--color-primary",
      mode === "light"
        ? themeColors.light.primaryColor
        : themeColors.dark.primaryColor
    );
  };
  return (
    <ColorThemeContext.Provider
      value={colorMode ? { colorMode, changeColorMode } : null}
    >
      {children}
    </ColorThemeContext.Provider>
  );
};

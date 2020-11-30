import React from "react";
import { themeColors } from "src/constants";

type ColorTheme = {
  colorMode: "light" | "dark";
  changeColorMode: (cm: "light" | "dark") => void;
};

export const ColorThemeContext = React.createContext<ColorTheme>(null);

export const ColorThemeProvider: React.FC = ({ children }) => {
  const [colorMode, setColorMode] = React.useState(undefined);
  React.useEffect(() => {
    const root = window.document.documentElement;
    const initialColorValue = root.style.getPropertyValue(
      "--initial-color-mode"
    );
    setColorMode(initialColorValue);
  }, []);

  const changeColorMode = (mode: string) => {
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
    <ColorThemeContext.Provider value={{ colorMode, changeColorMode }}>
      {children}
    </ColorThemeContext.Provider>
  );
};

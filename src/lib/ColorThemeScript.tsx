import React from "react";
import { themeColors } from "src/constants";

export const ColorThemeScript: React.FC = () => (
  <script
    dangerouslySetInnerHTML={{
      __html: `
      (function() {
        var preferDarkQuery = '(prefers-color-scheme: dark)';
        var mql = window.matchMedia(preferDarkQuery);
        var supportsColorSchemeQuery = mql.media === preferDarkQuery;

        function getInitialColorMode() {
          if (supportsColorSchemeQuery) {
            return mql.matches ? 'dark' : 'light';
          }
          return 'light';
        }

        function setThemeColors(mode) {
          var root = document.documentElement;
          root.style.setProperty(
            '--color-text',
            mode === 'light'
              ? '${themeColors.light.textColor}'
              : '${themeColors.dark.textColor}'
          );
          root.style.setProperty(
            '--color-sub-text',
            mode === 'light'
              ? '${themeColors.light.subTextColor}'
              : '${themeColors.dark.subTextColor}'
          );
          root.style.setProperty(
            '--color-background',
            mode === 'light'
              ? '${themeColors.light.backgroundColor}'
              : '${themeColors.dark.backgroundColor}'
          );
          root.style.setProperty(
            '--color-primary',
            mode === 'light'
              ? '${themeColors.light.primaryColor}'
              : '${themeColors.dark.primaryColor}'
          );
        }

        var colorMode = getInitialColorMode();
        setThemeColors(colorMode);

        if (supportsColorSchemeQuery) {
          mql.addListener(function (ev) {
            setThemeColors(ev.matches ? 'dark' : 'light');
          });
        }
      })();
    `,
    }}
  />
);

import { ColorThemeContext } from "@/lib/ColorThemeContext";
import { css } from "@emotion/react";
import React, { ChangeEvent, useContext } from "react";

export const ColorThemeSwitch: React.FC = () => {
  const colorTheme = useContext(ColorThemeContext);
  const handleChange = (ev: ChangeEvent<HTMLInputElement>) => {
    const mode = ev.target.checked ? "dark" : "light";
    colorTheme.changeColorMode(mode);
  };

  if (!colorTheme?.colorMode) {
    return <></>;
  }

  const isChecked = colorTheme.colorMode === "dark";

  return (
    <label
      css={css`
        display: inline-block;
        vertical-align: middle;
      `}
    >
      <input
        type="checkbox"
        checked={isChecked}
        onChange={handleChange}
        css={css`
          border: 0px;
          clip: rect(0px, 0px, 0px, 0px);
          height: 1px;
          width: 1px;
          margin: -1px;
          padding: 0px;
          overflow: hidden;
          white-space: nowrap;
          position: absolute;
        `}
      />
      <span
        aria-hidden="true"
        className="track"
        css={css`
          display: inline-flex;
          flex-shrink: 0;
          -webkit-box-pack: start;
          justify-content: flex-start;
          box-sizing: content-box;
          cursor: pointer;
          position: relative;
          width: 48px;
          height: 24px;
          border: 2px solid ${isChecked ? "#767676" : "#ffffff"};
          border-radius: 16px;
          background: ${isChecked ? "#03256c" : "#80b2ed"};
          transition: all 0.2 ease;
          padding: 2px;

          &::after {
            content: "${isChecked ? "🌙" : "☀️"}";
            display: flex;
            justify-content: center;
            align-items: center;
            position: absolute;
            width: 24px;
            height: 24px;
            border-radius: 12px;
            background: ${isChecked ? "#121212" : "#4881C9"};
            transform: translateX(${isChecked ? "24px" : "0px"});
            transition: transform 250ms ease 0s;
          }
        `}
      />
    </label>
  );
};

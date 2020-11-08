import { Meta } from "@storybook/react/types-6-0";
import React from "react";
import { TitleLogo } from "./TitleLogo";

export default {
  title: "TitleLogo",
  component: TitleLogo,
} as Meta;

export const Primary = () => <TitleLogo />;

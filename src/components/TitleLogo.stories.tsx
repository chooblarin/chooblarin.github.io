import type { Meta } from "@storybook/react";
import { TitleLogo } from "./TitleLogo";

export default {
  title: "TitleLogo",
  component: TitleLogo,
} as Meta;

export const Primary = () => <TitleLogo />;

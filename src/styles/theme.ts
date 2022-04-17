import { DefaultTheme } from "styled-components";

declare module "styled-components" {
  export interface DefaultTheme {
    primary: string;
    secondary: string;
    dark: string;
  }
}

export const theme: DefaultTheme = {
  primary: "#E2D21C",
  secondary: "#FFCF70",
  dark: "#080601",
};

export default theme;

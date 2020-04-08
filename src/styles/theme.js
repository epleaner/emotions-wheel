import { toTheme } from "@theme-ui/typography";
import TypographyFairyGates from "typography-theme-fairy-gates";
import merge from "deepmerge";

export default merge(toTheme(TypographyFairyGates), {
  useColorSchemeMediaQuery: true,
  useCustomProperties: true,
  colors: {
    text: "#000",
    background: "#fff",
    primary: "#07c",
    secondary: "#609",
    colorToggle: {
      primary: "yellow",
      secondary: "yellow",
    },
    modes: {
      dark: {
        text: "#fff",
        background: "#222",
        primary: "#0cf",
        secondary: "#90c",
        colorToggle: {
          primary: "blue",
          secondary: "blue",
        },
      },
      purple: {
        text: "#fff",
        background: "darkorchid",
        primary: "#0cf",
        secondary: "#90c",
      },
      pink: {
        text: "#fff",
        background: "hotpink",
        primary: "#0cf",
        secondary: "#90c",
      },
    },
  },
  text: {
    small: {
      fontSize: ".8rem",
    },
  },
  links: {
    nav: {
      cursor: "pointer",
      fontSize: 1,
      transition: "color .15s linear",
    },
  },
});

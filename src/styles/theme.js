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
    muted: "grey",
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
    heading: {
      mb: 2,
    },
  },
  links: {
    nav: {
      cursor: "pointer",
      fontSize: 1,
      transition: "color .15s linear",
    },
  },
  forms: {
    label: {
      mb: [2],
    },
    input: {
      mb: [2],
    },
  },
  buttons: {
    primary: {
      paddingX: 3,
      paddingY: 1,
      transition: "all .25s ease",
      marginX: 1,
      "text-transform": "uppercase",
      fontSize: 1,
      ":hover": {
        cursor: "pointer",
        boxShadow: "0px 0px 10px grey",
      },
      ":disabled": {
        bg: "muted",
        cursor: "not-allowed",
      },
    },
  },
  styles: {
    a: {
      color: "primary",
      ":hover": {
        cursor: "pointer",
      },
    },
  },
});

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
    warning: "#ff4242",
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
      my: 2,
      fontSize: "2.5rem",
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
      mb: 3,
      border: "none",
      pt: 0,
      pb: 1,
      fontSize: 1,
      paddingX: 0,
      borderRadius: 0,
      borderBottom: "1px solid",
      borderColor: "text",
    },
  },
  buttons: {
    primary: {
      paddingX: 3,
      paddingY: 1,
      transition: "all .25s ease",
      marginY: 1,
      textTransform: "uppercase",
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
    warning: {
      paddingX: 3,
      paddingY: 1,
      transition: "all .25s ease",
      marginY: 1,
      textTransform: "uppercase",
      fontSize: 1,
      bg: "warning",
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

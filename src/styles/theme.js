import { toTheme } from '@theme-ui/typography';
import TypographyFairyGates from 'typography-theme-fairy-gates';
import { theme as ChakraUIDefaultTheme } from '@chakra-ui/core';
import merge from 'deepmerge';

const customTheme = {
  useColorSchemeMediaQuery: true,
  useCustomProperties: true,
  colors: {
    text: '#000',
    background: '#fff',
    primary: '#07c',
    secondary: '#609',
    muted: '#c1c1c1',
    warning: '#ff4242',
    modes: {
      dark: {
        text: '#fff',
        background: '#222',
        primary: '#0cf',
        secondary: '#90c',
        colorToggle: {
          primary: 'blue',
          secondary: 'blue',
        },
      },
    },
  },
  text: {
    small: {
      fontSize: '.8rem',
    },
    heading: {
      fontSize: '2.5rem',
    },
  },
  links: {
    nav: {
      cursor: 'pointer',
      transition: 'color .15s linear',
    },
  },
  forms: {
    input: {
      mb: [3],
      border: 'none',
      pt: 0,
      pb: 1,
      paddingX: 0,
      borderRadius: 0,
      borderBottom: '1px solid',
      borderColor: 'text',
    },
  },
  buttons: {
    primary: {
      paddingX: 3,
      paddingY: 1,
      transition: 'all .25s ease',
      marginY: 1,
      textTransform: 'uppercase',
      ':hover': {
        cursor: 'pointer',
        boxShadow: '0px 0px 10px grey',
      },
      ':disabled': {
        bg: 'muted',
        cursor: 'not-allowed',
      },
    },
    warning: {
      paddingX: 3,
      paddingY: 1,
      transition: 'all .25s ease',
      marginY: 1,
      textTransform: 'uppercase',
      bg: 'warning',
      ':hover': {
        cursor: 'pointer',
        boxShadow: '0px 0px 10px grey',
      },
      ':disabled': {
        bg: 'muted',
        cursor: 'not-allowed',
      },
    },
  },
  styles: {
    a: {
      color: 'primary',
      ':hover': {
        cursor: 'pointer',
      },
    },
  },
};

export default merge.all([
  ChakraUIDefaultTheme,
  // toTheme(TypographyFairyGates),
  customTheme,
]);

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
    primary: {
      50: '#daf0ff',
      100: '#add5ff',
      200: '#7cbdff',
      300: '#4aa9ff',
      400: '#1a97ff',
      500: '#0086e6',
      600: '#005cb4',
      700: '#003982',
      800: '#001d51',
      900: '#000721',
    },
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
  borders: {
    text: '1px solid',
  },
  links: {
    nav: {
      cursor: 'pointer',
      transition: 'color .2s linear',
      ':hover': {
        textDecoration: 'none',
      },
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

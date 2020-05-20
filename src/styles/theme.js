import { toTheme } from '@theme-ui/typography';
import TypographyFairyGates from 'typography-theme-fairy-gates';
import { theme as ChakraUIDefaultTheme } from '@chakra-ui/core';
import merge from 'deepmerge';

const customTheme = {
  useColorSchemeMediaQuery: true,
  useCustomProperties: true,
  colors: {
    grayscale: {
      50: '#f2f2f2',
      100: '#d9d9d9',
      200: '#bfbfbf',
      300: '#a6a6a6',
      400: '#8c8c8c',
      500: '#737373',
      600: '#595959',
      700: '#404040',
      800: '#262626',
      900: '#0d0d0d',
    },
    primary: {
      50: '#e7e6ff',
      100: '#bab8fb',
      200: '#8c89f5',
      300: '#5f5af0',
      400: '#332ceb',
      500: '#1b13d2',
      600: '#140fa4',
      700: '#0d0a76',
      800: '#060649',
      900: '#02011d',
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

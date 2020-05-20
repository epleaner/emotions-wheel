import { toTheme } from '@theme-ui/typography';
import TypographyFairyGates from 'typography-theme-fairy-gates';
import { theme as ChakraUIDefaultTheme } from '@chakra-ui/core';
import merge from 'deepmerge';

const customTheme = {
  useColorSchemeMediaQuery: true,
  useCustomProperties: true,
  colors: {
    grayscale: 
    {
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
    }
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

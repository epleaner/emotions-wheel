import React from 'react';
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
      50: '#EFDAFE',
      100: '#CFBDFB',
      200: '#BFAFF9',
      300: '#AFA1F8',
      400: '#9F93F6',
      500: '#8F85F5',
      600: '#7F76F3',
      700: '#6F68F2',
      800: '#5F5AF0',
      900: '#5651e3',
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
  icons: {
    spiral: {
      viewBox: '0 0 90 85',
      path: (
        <g
          fill='none'
          transform='translate(2, 2)'
          stroke='currentColor'
          strokeWidth='3'>
          <path d='M17.675,32.466 C23.275,19.36 38.439,13.275 51.545,18.874 C65.485,24.831 71.958,40.96 66.001,54.9 C59.666,69.728 42.512,76.613 27.683,70.277 C11.912,63.539 4.589,45.291 11.328,29.518 C18.495,12.744 37.904,4.955 54.68,12.122 C72.523,19.746 80.807,40.392 73.184,58.236 C65.076,77.213 43.116,86.025 24.138,77.916 C3.951,69.291 -5.422,45.936 3.203,25.747 C12.377,4.275 37.22,-5.694 58.692,3.48 C81.53,13.238 92.133,39.663 82.375,62.502'></path>
        </g>
      ),
    },
  },
};

export default merge.all([
  ChakraUIDefaultTheme,
  // toTheme(TypographyFairyGates),
  customTheme,
]);

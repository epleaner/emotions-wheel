import React from 'react';
import { Global, css } from '@emotion/core';

const GlobalStyles = () => (
  <Global
    styles={css`
      html,
      body,
      #__next {
        height: 100%;
      }
      html {
        transition: background-color 0.2s linear;
      }
      p,
      span {
        transition: color 0.2s linear;
      }
    `}
  />
);

export default GlobalStyles;

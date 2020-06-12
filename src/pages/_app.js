import 'mobx-react-lite/batchingForReactDom';

import React from 'react';
import PropTypes from 'prop-types';

import { ThemeProvider, CSSReset, ColorModeProvider } from '@chakra-ui/core';

import theme from '@styles/theme';
import GlobalStyles from '@styles/globalStyles';

import Layout from '@components/layout';
import SEO from '@components/shared/seo';

const MyApp = ({ Component, pageProps }) => (
  <ThemeProvider theme={theme}>
    <ColorModeProvider>
      <GlobalStyles />
      <CSSReset />
      <SEO title='feeels' />
      <Layout>
        <Component {...pageProps} />
      </Layout>
    </ColorModeProvider>
  </ThemeProvider>
);

MyApp.propTypes = {
  Component: PropTypes.func.isRequired,
  pageProps: PropTypes.object,
};

export default MyApp;

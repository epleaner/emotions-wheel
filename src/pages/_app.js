import 'mobx-react/batchingForReactDom';

import React from 'react';
import App from 'next/app';
import { ThemeProvider, CSSReset, ColorModeProvider } from '@chakra-ui/core';
import theme from '@styles/theme';
import GlobalStyles from '@styles/globalStyles';
import Layout from '@components/layout';
import SEO from '@components/shared/seo';
class MyApp extends App {
  render() {
    const { Component, pageProps } = this.props;

    return (
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
  }
}

export default MyApp;

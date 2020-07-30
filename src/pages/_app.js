import 'mobx-react-lite/batchingForReactDom';

import React from 'react';
import PropTypes from 'prop-types';

import { ChakraProvider, CSSReset } from '@chakra-ui/core';

// import theme from '@styles/theme';
import theme from '../../chakra';
import GlobalStyles from '@styles/globalStyles';

import Layout from '@components/layout';
import SEO from '@components/shared/seo';

const MyApp = ({ Component, pageProps }) => (
  <ChakraProvider theme={theme}>
    <GlobalStyles />
    <CSSReset />
    <SEO title='feeels' />
    <Layout>
      <Component {...pageProps} />
    </Layout>
  </ChakraProvider>
);

MyApp.propTypes = {
  Component: PropTypes.oneOfType([PropTypes.object, PropTypes.func]).isRequired,
  pageProps: PropTypes.object,
};

export default MyApp;

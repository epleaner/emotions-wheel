import App from 'next/app';
import Layout from '@components/shared/layout';
import Head from '@components/shared/head';
import theme from '@styles/theme';
import { ThemeProvider, CSSReset, ColorModeProvider } from '@chakra-ui/core';

class MyApp extends App {
  render() {
    const { Component, pageProps } = this.props;

    return (
      <>
        <ThemeProvider theme={theme}>
          <ColorModeProvider>
            <CSSReset />
            <Head title="feeels" />
            <Layout>
              <Component {...pageProps} />
            </Layout>
          </ColorModeProvider>
        </ThemeProvider>
      </>
    );
  }
}

export default MyApp;

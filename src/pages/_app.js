import App from "next/app";
import Layout from "@components/shared/layout";
import Head from "@components/shared/head";
import theme from "@styles/theme";
import CssNormalize from "@styles/normalize";
import { ThemeProvider } from "theme-ui";

class MyApp extends App {
  render() {
    const { Component, pageProps } = this.props;
    return (
      <>
        <CssNormalize />
        <ThemeProvider theme={theme}>
          <Head title="feeels" />
          <Layout>
            <Component {...pageProps} />
          </Layout>
        </ThemeProvider>
      </>
    );
  }
}

export default MyApp;

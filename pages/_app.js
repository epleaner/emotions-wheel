import Layout from "Components/shared/layout";
import Head from "Components/shared/head";
import theme from "Styles/theme";
import CssNormalize from "Styles/normalize";
import { ThemeProvider } from "theme-ui";

function MyApp({ Component, pageProps }) {
  return (
    <>
      <CssNormalize />
      <ThemeProvider theme={theme}>
        <Head title="Emotions wheel" />
        <Layout>
          <Component {...pageProps} />
        </Layout>
      </ThemeProvider>
    </>
  );
}

export default MyApp;

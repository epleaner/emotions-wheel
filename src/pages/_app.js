import App from "next/app";
import Layout from "Components/shared/layout";
import Head from "Components/shared/head";
import theme from "Styles/theme";
import CssNormalize from "Styles/normalize";
import { ThemeProvider } from "theme-ui";
import UserContext from "Contexts/user";

class MyApp extends App {
  static async getInitialProps({ Component, ctx }) {
    let pageProps = {};

    if (Component.getInitialProps) {
      pageProps = await Component.getInitialProps(ctx);
    }

    if (ctx.req && ctx.req.session.passport) {
      pageProps.user = ctx.req.session.passport.user;
    }

    return { pageProps };
  }

  constructor(props) {
    super(props);
    this.state = {
      user: props.pageProps.user,
    };
  }

  render() {
    const { Component, pageProps } = this.props;

    return (
      <>
        <CssNormalize />
        <ThemeProvider theme={theme}>
          <Head title="feeels" />
          <UserContext.Provider value={this.state.user}>
            <Layout>
              <Component {...pageProps} />
            </Layout>
          </UserContext.Provider>
        </ThemeProvider>
      </>
    );
  }
}

export default MyApp;

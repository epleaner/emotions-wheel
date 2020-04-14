import Head from "next/head";
import { useThemeUI } from "theme-ui";

export default ({ title }) => {
  const { theme } = useThemeUI();
  return (
    <Head>
      <title>{title}</title>
      <link rel="icon" href="/favicon.ico" />
      <meta name="theme-color" content={theme.colors.primary} />
    </Head>
  );
};

import Head from 'next/head';
import { useTheme } from '@chakra-ui/core';

export default ({ title }) => {
  const theme = useTheme();

  return (
    <Head>
      <title>{title}</title>
      <link rel="icon" href="/favicon.ico" />
      <meta name="theme-color" content={theme.colors.primary} />
    </Head>
  );
};

import React from 'react';
import PropTypes from 'prop-types';
import Head from 'next/head';
import { useTheme } from '@chakra-ui/core';

const SEO = ({ title }) => {
  const theme = useTheme();

  return (
    <Head>
      <title>{title}</title>
      <link rel='icon' href='/favicon.ico' />
      <meta name='theme-color' content={theme.colors.primary} />
    </Head>
  );
};

SEO.propTypes = {
  title: PropTypes.string.isRequired,
};

export default SEO;

import React from 'react';
import PropTypes from 'prop-types';

import { Box } from '@chakra-ui/core';

const Section = ({ contained = false, ...otherProps }) => {
  return (
    <Box
      as='section'
      width={contained ? ['100%', 500] : '100%'}
      {...otherProps}
    />
  );
};

Section.propTypes = {
  contained: PropTypes.bool,
};

export default Section;

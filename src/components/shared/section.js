import React from 'react';

import { Box } from '@chakra-ui/core';

const Section = (props) => {
  return <Box as="section" width={['100%', 500]} mx={[4, 0]} {...props} />;
};

export default Section;

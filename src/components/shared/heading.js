import React from 'react';

import { Heading as ChakraHeading } from '@chakra-ui/core';

const Heading = (props) => {
  return <ChakraHeading mb={8} {...props} />;
};

export default Heading;

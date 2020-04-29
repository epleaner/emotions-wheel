import React from 'react';

import { Flex } from '@chakra-ui/core';

const CenteredContainer = (props) => {
  return (
    <Flex
      justifyContent="center"
      alignItems="center"
      height="100%"
      {...props}
    />
  );
};

export default CenteredContainer;

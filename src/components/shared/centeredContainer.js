import React from 'react';

import { Flex } from '@chakra-ui/core';

const CenteredContainer = (props) => {
  return (
    <Flex
      justifyContent='center'
      alignItems='center'
      height='100%'
      pb={10}
      mx={[4, 0]}
      {...props}
    />
  );
};

export default CenteredContainer;

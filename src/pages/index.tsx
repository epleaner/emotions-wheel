import React from 'react';
import { Box } from '@chakra-ui/core';

import SunburstSelector from '@components/emotionSelector/sunburstSelector';

const Index = () => {
  return (
    <>
      <Box mx={10} mt={2}>
        Hey, how are you doing?
      </Box>
      <SunburstSelector />
    </>
  );
};

export default Index;

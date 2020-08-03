import React from 'react';

import { Flex, Box } from '@chakra-ui/core';
import EmotionSelector from '@components/emotionSelector';
import About from '@components/about';

const Index = () => {
  return (
    <Flex flexWrap='wrap'>
      <Box height='100vh' mb='24'>
        <EmotionSelector />
      </Box>
      <Box height='100vh' width='100%'>
        <About />
      </Box>
    </Flex>
  );
};

export default Index;

import React from 'react';

import { Flex, Box } from '@chakra-ui/core';
import EmotionSelector from '@components/emotionSelector';
import About from '@components/about';

const Index = () => {
  return (
    <Flex flexWrap='wrap'>
      <Box minHeight='100vh' mb='40'>
        <EmotionSelector />
      </Box>
      <Box minHeight='100vh' width='100%'>
        <About />
      </Box>
    </Flex>
  );
};

export default Index;

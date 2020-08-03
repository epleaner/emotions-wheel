import React from 'react';

import { Flex, Box, Stack, Text } from '@chakra-ui/core';
import Section from '@components/shared/section';
import Clouds from '@components/about/scenery/clouds';
import Mountains from '@components/about/scenery/mountains';
import MainHeading from '@components/about/headings/main';
import SecondHeading from '@components/about/headings/second';

const About = () => (
  <Flex>
    <Section>
      <Flex minHeight='85vh' alignItems='center'>
        <Box mx={[3, 5, 20, 32]}>
          <Clouds />
          <MainHeading />
        </Box>
      </Flex>
      <Flex minHeight='85vh' alignItems='center'>
        <Box>
          <Mountains />
          <Box mx={[3, 5, 20, 32]}>
            <SecondHeading />
          </Box>
        </Box>
      </Flex>
    </Section>
  </Flex>
);

export default About;

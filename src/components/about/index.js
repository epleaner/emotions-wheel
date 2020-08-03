import React from 'react';

import { Flex, Box, Stack, Text } from '@chakra-ui/core';
import Section from '@components/shared/section';
import Clouds from '@components/about/scenery/clouds';
import Mountains from '@components/about/scenery/mountains';
import MainHeading from '@components/about/headings/main';
import SecondHeading from '@components/about/headings/second';

const BlurbSection = ({ children }) => (
  <Flex minHeight={['70vh', '85vh']} alignItems='center'>
    <Box>{children}</Box>
  </Flex>
);

const About = () => (
  <Section>
    <BlurbSection>
      <Box mx={[3, 5, 20, 32]}>
        <Clouds />
        <MainHeading />
      </Box>
    </BlurbSection>
    <BlurbSection>
      <Mountains />
      <Box mx={[3, 5, 20, 32]}>
        <SecondHeading />
      </Box>
    </BlurbSection>
  </Section>
);

export default About;

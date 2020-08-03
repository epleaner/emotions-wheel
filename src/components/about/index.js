import React from 'react';

import { Flex, Box, Stack, Text } from '@chakra-ui/core';
import Section from '@components/shared/section';
import Clouds from '@components/about/scenery/clouds';
import Mountains from '@components/about/scenery/mountains';
import Waves from '@components/about/scenery/waves';
import MainHeading from '@components/about/headings/main';
import SecondaryHeading from '@components/about/headings/secondary';

const BlurbSection = ({ children }) => (
  <Flex minHeight={['70vh', '85vh']} alignItems='center'>
    <Box>{children}</Box>
  </Flex>
);

const About = () => (
  <Section>
    <BlurbSection>
      <Box background='linear-gradient(180deg, rgba(255,255,255,1) 0%, rgba(255,181,134,0.67) 67%, rgba(255,175,200,0.67) 100%)'>
        <Box mx={[3, 5, 20, 32]}>
          <Clouds />
          <MainHeading />
        </Box>
        <Box mt={['16', '10']}>
          <Mountains />
        </Box>
      </Box>
      <Box background='linear-gradient(180deg, rgba(185,189,227,1) 0%, rgba(38,25,252,0.25) 33%, rgba(255,255,255,1) 100%)'>
        <Box mx={[3, 5, 20, 32]} py={['20', '24']}>
          <SecondaryHeading body='Aimed to help foster a deepening of connection with our inner landscape...' />
        </Box>
        <Waves />
        <Box background='linear-gradient(180deg, rgba(159,201,255,1) 0%, rgba(27,120,247,1) 100%)'>
          <Box mx={[3, 5, 20, 32]} py={['20', '24']}>
            <SecondaryHeading body='...and to develop greater emotional intelligence, intimacy with our human experience, and capacity for self-love and healing.' />
          </Box>
        </Box>
      </Box>
    </BlurbSection>
  </Section>
);

export default About;

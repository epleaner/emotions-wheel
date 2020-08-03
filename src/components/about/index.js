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
      <Box mx={[3, 5, 20, 32]}>
        <Clouds />
        <MainHeading />
      </Box>
    </BlurbSection>
    <BlurbSection>
      <Mountains />
      <Box mx={[3, 5, 20, 32]}>
        <SecondaryHeading body='Aimed to help foster a deepening of connection with our inner landscape...' />
      </Box>
    </BlurbSection>
    <BlurbSection>
      <Box>
        <Waves />
        <Box background='linear-gradient(180deg, rgb(185, 228, 255) 0%, rgba(0,106,255,0.36876748990611874) 100%)'>
          <Box mx={[3, 5, 20, 32]} py={['10', '16']}>
            <SecondaryHeading body='...and to develop greater emotional intelligence, intimacy with our human experience, and capacity for self-love and healing' />
          </Box>
        </Box>
      </Box>
    </BlurbSection>
  </Section>
);

export default About;

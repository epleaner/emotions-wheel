import React from 'react';

import AwarenessSVG from '@static/icons/awareness.svg';
import Cloud1 from '@static/icons/cloud_1.svg';
import Cloud2 from '@static/icons/cloud_2.svg';
import CloudSun from '@static/icons/cloud_sun.svg';

import { Flex, Box, Link, Text } from '@chakra-ui/core';
import Heading from '@components/shared/heading';
import CenteredContainer from '@components/shared/centeredContainer';
import Section from '@components/shared/section';

const Clouds = () => (
  <Section>
    <Flex justify='space-between' flexWrap='wrap'>
      <Box width={['100px', '100px', '125px', '150px']}>
        <Cloud1 />
      </Box>
      <Box
        mt='-50px'
        ml={['60px', '60px', '60px', '200px']}
        width={['100px', '100px', '125px', '150px']}>
        <Cloud2 />
      </Box>
      <Box mt='20px' width={['100px', '100px', '125px', '150px']}>
        <CloudSun />
      </Box>
    </Flex>
  </Section>
);

export default Clouds;

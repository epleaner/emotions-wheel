import React, { useMemo } from 'react';

import { useColorMode } from '@chakra-ui/core';

import Cloud1 from '@static/icons/cloud_1.svg';
import Cloud2 from '@static/icons/cloud_2.svg';
import CloudSun from '@static/icons/cloud_sun.svg';
import CloudMoon from '@static/icons/cloud_moon.svg';

import { Flex, Box } from '@chakra-ui/core';
import Section from '@components/shared/section';

const Clouds = () => {
  const { colorMode } = useColorMode();

  const CloudContainer = useMemo(
    () => ({ children, ...otherProps }) => (
      <Box
        width={['100px', '100px', '125px', '150px']}
        style={{
          opacity: '0.25',
          fill: colorMode === 'dark' ? '#f1eded' : 'black',
        }}
        {...otherProps}>
        {children}
      </Box>
    ),
    [colorMode]
  );

  return (
    <Section>
      <Flex justify='space-between' flexWrap='wrap'>
        <CloudContainer>
          <Cloud1 />
        </CloudContainer>
        <CloudContainer mt='-50px' ml={['60px', '60px', '60px', '200px']}>
          <Cloud2 />
        </CloudContainer>
        <CloudContainer mt='20px'>
          {colorMode === 'dark' ? <CloudMoon /> : <CloudSun />}
        </CloudContainer>
      </Flex>
    </Section>
  );
};

export default Clouds;

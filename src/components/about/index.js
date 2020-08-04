import React, { useMemo, useCallback } from 'react';
import PropTypes from 'prop-types';
import Link from 'next/link';
import { Flex, Button, Box, useColorMode } from '@chakra-ui/core';
import Section from '@components/shared/section';
import Clouds from '@components/about/scenery/clouds';
import Mountains from '@components/about/scenery/mountains';
import Waves from '@components/about/scenery/waves';
import MainHeading from '@components/about/headings/main';
import SecondaryHeading from '@components/about/headings/secondary';

const gradients = {
  cloudMountains: {
    dark: [
      'rgba(26,32,44,1) 0%',
      'rgba(125,42,18,1) 67%',
      'rgba(119,16,119,1) 100%',
    ],
    light: [
      'rgba(255,255,255,1) 0%',
      'rgba(255,181,134,0.67) 67%',
      'rgba(255,175,200,0.67) 100%',
    ],
  },
  mountainWaves: {
    dark: [
      'rgba(86,55,154,1) 0%',
      'rgba(4,8,87,1) 67%',
      'rgba(106,106,106,1) 100%',
    ],
    light: [
      'rgba(185,189,227,1) 0%',
      'rgba(38,25,252,0.25) 33%',
      'rgba(255,255,255,1) 100%',
    ],
  },
  wavesFooter: {
    dark: ['rgba(11,54,140,1) 0%', 'rgba(26,32,44,1) 100%'],
    light: ['rgba(153,194,255,1) 0%', 'rgba(9,79,176,1) 100%'],
  },
};

const About = () => {
  const { colorMode } = useColorMode();

  const makeGradientString = useCallback(
    (gradients) => `linear-gradient(180deg, ${gradients.join(', ')})`,
    []
  );

  const cloudMountainsGradient = useMemo(
    () => makeGradientString(gradients.cloudMountains[colorMode]),
    [makeGradientString, colorMode]
  );

  const mountainWavesGradient = useMemo(
    () => makeGradientString(gradients.mountainWaves[colorMode]),
    [makeGradientString, colorMode]
  );

  const wavesFooterGradient = useMemo(
    () => makeGradientString(gradients.wavesFooter[colorMode]),
    [makeGradientString, colorMode]
  );

  return (
    <Section>
      <Box background={cloudMountainsGradient}>
        <Box mx={[3, 5, 20, 32]}>
          <Clouds />
          <MainHeading />
        </Box>
        <Box mt={['16', '10']}>
          <Mountains />
        </Box>
      </Box>
      <Box background={mountainWavesGradient}>
        <Box mx={[3, 5, 20, 32]} py={['24', '32']}>
          <SecondaryHeading body='Aimed to help foster a deepening of connection with our inner landscape...' />
        </Box>
        <Waves />
        <Box background={wavesFooterGradient}>
          <Box mx={[3, 5, 20, 32]} py={['24', '32']}>
            <SecondaryHeading body='...and to develop greater emotional intelligence, intimacy with our human experience, and capacity for self-love and healing.' />
            <Flex justify='center' alignItems='center' py={['24']}>
              <Link href='/login'>
                <Button mx={2} size='lg' variant='outline'>
                  log in
                </Button>
              </Link>
              <Link href='/sign-up'>
                <Button mx={2} size='lg' variant='outline'>
                  sign up
                </Button>
              </Link>
            </Flex>
          </Box>
        </Box>
      </Box>
    </Section>
  );
};

export default About;

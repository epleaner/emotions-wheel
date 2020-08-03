import React from 'react';

import { Link, Text } from '@chakra-ui/core';
import Heading from '@components/shared/heading';
import Section from '@components/shared/section';

const MainHeading = () => (
  <Section mt='10'>
    <Heading as='h1' fontSize={['4xl', '5xl', '6xl']}>
      Feels is tool for checking in with yourself.
    </Heading>
    <Text as='h3' fontSize='xl'>
      Inspired by{' '}
      <Link
        target='_blank'
        rel='nofollow noreferrer'
        href='https://www.atlasofemotions.org/'>
        The Atlas of Emotions
      </Link>{' '}
      and{' '}
      <Link
        target='_blank'
        rel='nofollow noreferrer'
        href='https://www.thejuntoinstitute.com'>
        The Junto Institute's
      </Link>{' '}
      <Link
        target='_blank'
        rel='nofollow noreferrer'
        href='https://www.thejuntoinstitute.com/blog/the-junto-emotion-wheel-why-and-how-we-use-it'>
        emotion wheel.
      </Link>
    </Text>
  </Section>
);

export default MainHeading;

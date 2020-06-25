import React from 'react';
import { NextPage } from 'next';
import { Link, Text } from '@chakra-ui/core';
import Heading from '@components/shared/heading';
import CenteredContainer from '@components/shared/centeredContainer';
import Section from '@components/shared/section';

const About: NextPage = () => (
  <CenteredContainer>
    <Section contained>
      <Heading as='h1' fontSize='6xl'>
        Feels is tool for checking in with yourself.
      </Heading>
      <Text as='h2' fontSize='xl'>
        Inspired by{' '}
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
  </CenteredContainer>
);

export default About;

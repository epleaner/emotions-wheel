import React from 'react';
import Link from 'next/link';
import { Flex, Text, Link as UILink } from '@chakra-ui/core';

const Footer = () => (
  <Flex p={2} as='footer' flexShrink={1}>
    <Link href='/about'>
      <UILink pr={3} mr={3} borderRight='text'>
        <Text fontSize='xs'>about</Text>
      </UILink>
    </Link>
    <Text fontSize='xs'>made with 💛 by eli</Text>
  </Flex>
);

export default Footer;

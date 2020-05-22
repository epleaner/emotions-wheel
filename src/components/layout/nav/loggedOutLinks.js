import React from 'react';
import Link from 'next/link';
import { Button, Flex } from '@chakra-ui/core';

const LoggedOutLinks = () => (
  <Flex mr={2}>
    <Link href='/login'>
      <Button mx={2} variantColor='grayscale' size='xs' variant='ghost'>
        log in
      </Button>
    </Link>
    <Link href='/sign-up'>
      <Button variantColor='primary' size='xs' variant='outline'>
        sign up
      </Button>
    </Link>
  </Flex>
);

export default LoggedOutLinks;

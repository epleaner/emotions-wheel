import React from 'react';
import Link from 'next/link';
import { Button, Flex, Text } from '@chakra-ui/core';

const LoggedOutLinks = () => (
  <Flex mr={2}>
    <Link href='/login'>
      <Button mx={2} variantColor='blue' size='xs' variant='ghost'>
        <Text textTransform='uppercase' fontSize='xs'>
          Log in
        </Text>
      </Button>
    </Link>
    <Link href='/sign-up'>
      <Button variantColor='green' size='xs' variant='outline'>
        <Text textTransform='uppercase' fontSize='xs'>
          Sign up
        </Text>
      </Button>
    </Link>
  </Flex>
);

export default LoggedOutLinks;

import React from 'react';
import Link from 'next/link';
import { useColorMode, Flex, Button, Text, Divider } from '@chakra-ui/core';

const Footer = () => {
  const { colorMode } = useColorMode();

  return (
    <Flex px={4} py={2} as='footer' flexShrink={1}>
      <Link href='/about'>
        <Button
          variantColor='black'
          size='xs'
          variant='link'
          _hover={{
            textDecoration: 'none',
            color: `gray.${colorMode === 'light' ? 500 : 300}`,
          }}
        >
          <Text textTransform='uppercase' fontSize='xs'>
            about
          </Text>
        </Button>
      </Link>
      <Divider
        borderColor={colorMode === 'light' ? 'gray.500' : 'white'}
        orientation='vertical'
      />
      <Text fontSize='xs'>made with 💛 by eli</Text>
    </Flex>
  );
};

export default Footer;

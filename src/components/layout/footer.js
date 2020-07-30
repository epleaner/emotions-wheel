import React from 'react';
import Link from 'next/link';
import { useColorMode, Flex, Button, Text, Divider } from '@chakra-ui/core';

const Footer = () => {
  const { colorMode } = useColorMode();

  return (
    <Flex px={4} py={2} as='footer' flexShrink={1}>
      <Link href='/about'>
        <Button
          colorScheme='grayscale'
          size='xs'
          variant='link'
          _hover={{
            textDecoration: 'none',
            color: `gray.${colorMode === 'light' ? 500 : 300}`,
          }}>
          <Text fontSize='xs'>about</Text>
        </Button>
      </Link>
      <Divider borderColor='grayscale' orientation='vertical' />
      <Text color='grayscale.300' fontSize='xs'>
        made with 💛 by eli
      </Text>
    </Flex>
  );
};

export default Footer;

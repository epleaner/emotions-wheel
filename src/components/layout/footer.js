import React from 'react';
import Link from 'next/link';
import {
  useColorMode,
  Flex,
  Box,
  Link as ChakraLink,
  Text,
  Divider,
} from '@chakra-ui/core';

const Footer = () => {
  const { colorMode } = useColorMode();

  return (
    <Box background='rgba(9,79,176,1)'>
      <Flex px={4} py={2} as='footer' flexShrink={1} justify='center'>
        <Text color='grayscale.100' fontSize='xs'>
          <ChakraLink isExternal href='mailto:feeels.dev@gmail.com'>
            contact
          </ChakraLink>
        </Text>
        <Divider color='grayscale.100' orientation='vertical' mx={[8]} />
        <Text color='grayscale.100' fontSize='xs'>
          made with 💛 by{' '}
          <ChakraLink isExternal href='https://elipleaner.com'>
            eli pleaner
          </ChakraLink>
        </Text>
        <Divider color='grayscale.100' orientation='vertical' mx={[8]} />
        <Text color='grayscale.100' fontSize='xs'>
          <ChakraLink
            isExternal
            href='https://www.github.com/epleaner/emotions-wheel'>
            source code
          </ChakraLink>
        </Text>
      </Flex>
    </Box>
  );
};

export default Footer;

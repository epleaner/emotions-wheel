import React from 'react';
import { useRouter } from 'next/router';

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
  const router = useRouter();

  return (
    <Flex
      px={4}
      py={2}
      as='footer'
      flexShrink={1}
      justify='center'
      style={{
        background:
          colorMode === 'light' &&
          router.pathname === '/' &&
          'rgba(9,79,176,1)',
      }}>
      <Flex align='center' justify='center'>
        <Text color='grayscale.300' fontSize='xs' textAlign='center'>
          <ChakraLink isExternal href='mailto:feeels.dev@gmail.com'>
            contact
          </ChakraLink>
        </Text>
      </Flex>
      <Divider color='grayscale.300' orientation='vertical' mx={[6, 8]} />
      <Flex align='center' justify='center'>
        <Text color='grayscale.300' fontSize='xs' textAlign='center'>
          made with 💛 by{' '}
          <ChakraLink isExternal href='https://elipleaner.com'>
            eli pleaner
          </ChakraLink>
        </Text>
      </Flex>
      <Divider color='grayscale.300' orientation='vertical' mx={[6, 8]} />
      <Flex align='center' justify='center'>
        <Text color='grayscale.300' fontSize='xs' textAlign='center'>
          <ChakraLink
            isExternal
            href='https://www.github.com/epleaner/emotions-wheel'>
            source code
          </ChakraLink>
        </Text>
      </Flex>
    </Flex>
  );
};

export default Footer;

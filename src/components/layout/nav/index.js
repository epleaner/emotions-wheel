import React from 'react';
import Link from 'next/link';
import {
  useColorMode,
  Flex,
  Button,
  Box,
  Text,
  Skeleton,
} from '@chakra-ui/core';

import ColorToggle from '@components/layout/nav/colorToggle';
import LoggedInLinks from '@components/layout/nav/loggedInLinks';
import LoggedOutLinks from '@components/layout/nav/loggedOutLinks';

import useUser from '@hooks/useUser';

const Nav = () => {
  const [user, , isFetching] = useUser();

  const { colorMode, toggleColorMode } = useColorMode();

  return (
    <Flex as='header' mx={4} mt={2} alignItems='center'>
      <Link href='/'>
        <Button
          variantColor='primary'
          _hover={{
            color: `primary.${colorMode === 'light' ? 100 : 300}`,
            textDecoration: 'none',
          }}
          variant='link'>
          <Text textTransform='uppercase' fontSize='sm'>
            feeels
          </Text>
        </Button>
      </Link>
      <Box mx={'auto'} />
      <Box mr={2}>
        <Skeleton
          isLoaded={!isFetching}
          colorStart='#e7e6ff'
          colorEnd='#bab8fb'>
          {user ? <LoggedInLinks /> : <LoggedOutLinks />}
        </Skeleton>
      </Box>
      <ColorToggle mode={colorMode} onClick={toggleColorMode} />
    </Flex>
  );
};

export default Nav;

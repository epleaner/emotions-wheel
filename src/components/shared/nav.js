import React from 'react';
import Link from 'next/link';
import { useColorMode, Flex, Button, Box, Text } from '@chakra-ui/core';
import ColorToggle from '@components/shared/colorToggle';
import LoggedInLinks from '@components/nav/loggedInLinks';
import LoggedOutLinks from '@components/nav/loggedOutLinks';
import useUser from '@hooks/useUser';

const Nav = () => {
  const [user, , isFetching] = useUser();

  const { colorMode, toggleColorMode } = useColorMode();

  return (
    <Flex as='header' mx={4} mt={2} alignItems='center'>
      <Link href='/'>
        <Button
          variantColor='black'
          _hover={{
            color: `green.${colorMode === 'light' ? 500 : 300}`,
            textDecoration: 'none',
          }}
          variant='link'
        >
          <Text textTransform='uppercase' fontSize='sm'>
            feels
          </Text>
        </Button>
      </Link>
      <Box mx={'auto'} />
      {!isFetching && (
        <Box mr={2}>{user ? <LoggedInLinks /> : <LoggedOutLinks />}</Box>
      )}
      <ColorToggle mode={colorMode} onClick={toggleColorMode} />
    </Flex>
  );
};

export default Nav;

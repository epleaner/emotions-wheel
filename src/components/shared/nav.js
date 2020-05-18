import React from 'react';
import Link from 'next/link';
import { useRouter } from 'next/router';
import { useColorMode, Flex, Box, Link as UILink } from '@chakra-ui/core';
import ColorToggle from '@components/shared/colorToggle';
import LoggedInLinks from '@components/nav/loggedInLinks';
import LoggedOutLinks from '@components/nav/loggedOutLinks';
import useUser from '@hooks/useUser';

const Nav = () => {
  const [user, , isFetching] = useUser();

  const { colorMode, toggleColorMode } = useColorMode();

  return (
    <Flex as='header' mx={2} mt={2} alignItems='center'>
      <Link href='/'>
        <UILink>feeels</UILink>
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

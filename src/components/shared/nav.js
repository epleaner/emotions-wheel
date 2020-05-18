import React from 'react';
import Link from 'next/link';
import { useRouter } from 'next/router';
import { useColorMode, Flex, Box, Link as UILink } from '@chakra-ui/core';
import ColorToggle from '@components/shared/colorToggle';
import useUser from '@hooks/useUser';

const Nav = () => {
  const router = useRouter();
  const [user, { mutate }, isFetching] = useUser();

  const handleLogout = async () => {
    await fetch('/api/auth', {
      method: 'DELETE',
    });
    router.push('/');
    // set the user state to null
    mutate(null);
  };

  const { colorMode, toggleColorMode } = useColorMode();

  return (
    <Flex as='header' m={2} alignItems='center'>
      <Link href='/'>
        <UILink>feeels</UILink>
      </Link>
      <Box mx={'auto'} />
      {!isFetching && (
        <Box mr={2}>
          {user ? (
            <>
              <Link href='/profile'>
                <UILink mr={1} pr={2} borderRight='text'>
                  {user.name}
                </UILink>
              </Link>
              <UILink mx={1} onClick={handleLogout}>
                log out
              </UILink>
            </>
          ) : (
            <>
              <Link href='/login'>
                <UILink mx={1}>log in</UILink>
              </Link>
              <Link href='/sign-up'>
                <UILink mx={1}>sign up</UILink>
              </Link>
            </>
          )}
        </Box>
      )}
      <ColorToggle mode={colorMode} onClick={toggleColorMode} />
    </Flex>
  );
};

export default Nav;

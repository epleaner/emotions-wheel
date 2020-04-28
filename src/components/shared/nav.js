import Link from 'next/link';
import { Flex, Box, NavLink } from 'theme-ui';
import { useColorMode } from '@chakra-ui/core';
import ColorToggle from '@components/shared/colorToggle';
import useUser from '@hooks/useUser';
import { useRouter } from 'next/router';

export default () => {
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
    <Flex as="header" m={2} sx={{ alignItems: 'center' }}>
      <Link href="/">
        <NavLink>feeels</NavLink>
      </Link>
      <Box mx={'auto'} />
      {!isFetching && (
        <Box mr={2}>
          {user ? (
            <>
              <Link href="/profile">
                <NavLink
                  sx={{
                    borderRight: (theme) => `1px solid ${theme.colors.text}`,
                    px: 1,
                  }}
                >
                  {user.name}
                </NavLink>
              </Link>
              <NavLink mx={1} onClick={handleLogout}>
                log out
              </NavLink>
            </>
          ) : (
            <>
              <Link href="/login">
                <NavLink mx={1}>log in</NavLink>
              </Link>
              <Link href="/sign-up">
                <NavLink mx={1}>sign up</NavLink>
              </Link>
            </>
          )}
        </Box>
      )}
      <ColorToggle mode={colorMode} onClick={toggleColorMode} />
    </Flex>
  );
};

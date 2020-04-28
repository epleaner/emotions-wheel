import Link from 'next/link';
import { useColorMode, Flex, Box, Link as ChakraLink } from '@chakra-ui/core';
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
        <ChakraLink>feeels</ChakraLink>
      </Link>
      <Box mx={'auto'} />
      {!isFetching && (
        <Box mr={2}>
          {user ? (
            <>
              <Link href="/profile">
                <ChakraLink
                  sx={{
                    borderRight: (theme) => `1px solid ${theme.colors.text}`,
                    px: 1,
                  }}
                >
                  {user.name}
                </ChakraLink>
              </Link>
              <ChakraLink mx={1} onClick={handleLogout}>
                log out
              </ChakraLink>
            </>
          ) : (
            <>
              <Link href="/login">
                <ChakraLink mx={1}>log in</ChakraLink>
              </Link>
              <Link href="/sign-up">
                <ChakraLink mx={1}>sign up</ChakraLink>
              </Link>
            </>
          )}
        </Box>
      )}
      <ColorToggle mode={colorMode} onClick={toggleColorMode} />
    </Flex>
  );
};

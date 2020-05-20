import React, { useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/router';
import { Button, Flex, Text, Divider } from '@chakra-ui/core';
import useUser from '@hooks/useUser';

const LoggedInLinks = () => {
  const router = useRouter();
  const [user, { mutate }] = useUser();
  const [isLoggingOut, setIsLoggingOut] = useState(false);

  const handleLogout = async () => {
    setIsLoggingOut(true);
    await fetch('/api/auth', {
      method: 'DELETE',
    });

    // set the user state to null
    mutate(null);
    setIsLoggingOut(false);
    router.push('/');
  };

  return user ? (
    <Flex mr={2} alignItems='center'>
      <Link href='/profile'>
        <Button size='xs' variant='outline'>
          <Text textTransform='uppercase' fontSize='sm'>
            {user.name}
          </Text>
        </Button>
      </Link>
      <Divider orientation='vertical' />
      <Button
        size='xs'
        variant='ghost'
        onClick={handleLogout}
        isLoading={isLoggingOut}
        loadingText='logging out'>
        log out
      </Button>
    </Flex>
  ) : null;
};

export default LoggedInLinks;

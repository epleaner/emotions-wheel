import React from 'react';
import Link from 'next/link';
import { useRouter } from 'next/router';
import { observer } from 'mobx-react-lite';
import { Button, Flex, Text, Divider, useToast } from '@chakra-ui/core';

import useCurrentUser from '@hooks/useCurrentUser';

const LoggedInLinks = () => {
  const router = useRouter();

  const userStore = useCurrentUser();

  const errorToast = useToast();

  const handleLogout = async () => {
    try {
      await userStore.logOut();
      router.push('/');
    } catch (e) {
      errorToast({
        description: 'Whoops, something went wrong trying to log you out.',
        duration: '3000',
        status: 'error',
      });
    }
  };

  return userStore.isLoggedIn ? (
    <Flex mr={2} alignItems='center'>
      {!userStore.isLoggingOut && (
        <>
          <Link href='/profile'>
            <Button size='xs' variant='outline'>
              <Text textTransform='uppercase' fontSize='sm'>
                {userStore.currentUser.name}
              </Text>
            </Button>
          </Link>
          <Divider orientation='vertical' />
        </>
      )}
      <Button
        size='xs'
        variant='ghost'
        onClick={handleLogout}
        isLoading={userStore.isLoggingOut}
        loadingText='logging out'>
        log out
      </Button>
    </Flex>
  ) : null;
};

export default observer(LoggedInLinks);

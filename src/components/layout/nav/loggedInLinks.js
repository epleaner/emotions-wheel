import React from 'react';
import Link from 'next/link';
import { useRouter } from 'next/router';
import { observer } from 'mobx-react-lite';
import { Button, Flex, Text, Divider } from '@chakra-ui/core';
import useCurrentUser from '@hooks/useCurrentUser';

const LoggedInLinks = () => {
  const router = useRouter();

  const userStore = useCurrentUser();

  const handleLogout = async () => {
    try {
      await userStore.logOut();
      router.push('/');
    } catch (e) {
      console.log('couldnt log out', e);
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

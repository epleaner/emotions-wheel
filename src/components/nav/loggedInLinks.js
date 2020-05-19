import React from 'react';
import Link from 'next/link';
import { useRouter } from 'next/router';
import { Button, Flex, Text, Divider } from '@chakra-ui/core';
import useUser from '@hooks/useUser';

const LoggedInLinks = () => {
  const router = useRouter();
  const [user, { mutate }] = useUser();

  const handleLogout = async () => {
    await fetch('/api/auth', {
      method: 'DELETE',
    });

    // set the user state to null
    mutate(null);
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
      <Button size='xs' variant='ghost' onClick={handleLogout}>
        <Text textTransform='uppercase' fontSize='xs'>
          Log out
        </Text>
      </Button>
    </Flex>
  ) : null;
};

export default LoggedInLinks;

import React from 'react';
import Link from 'next/link';
import { useRouter } from 'next/router';
import { Link as UILink } from '@chakra-ui/core';
import useUser from '@hooks/useUser';

const LoggedInLinks = () => {
  const router = useRouter();
  const [user, { mutate }] = useUser();

  const handleLogout = async () => {
    await fetch('/api/auth', {
      method: 'DELETE',
    });
    router.push('/');

    // set the user state to null
    mutate(null);
  };

  return (
    <>
      <Link href='/profile'>
        <UILink mr={1} pr={2} borderRight='text'>
          {user.name}
        </UILink>
      </Link>
      <UILink mx={1} onClick={handleLogout}>
        Log out
      </UILink>
    </>
  );
};

export default LoggedInLinks;

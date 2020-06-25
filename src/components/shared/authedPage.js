import React from 'react';
import { observer } from 'mobx-react-lite';

import Link from 'next/link';
import { Link as UILink, Spinner, Text } from '@chakra-ui/core';

import useCurrentUser from '@hooks/useCurrentUser';
import CenteredContainer from '@components/shared/centeredContainer';

const AuthedPage = ({ render }) => {
  const userStore = useCurrentUser();

  if (userStore.isLoading)
    return (
      <CenteredContainer>
        <Spinner />
      </CenteredContainer>
    );

  if (!userStore.isLoggedIn)
    return (
      <CenteredContainer>
        <Text fontSize='6xl'>Welcome!</Text>
        <Text fontSize='5xl'>
          Please{' '}
          <Link href='/login'>
            <UILink color='blue.200'>log in</UILink>
          </Link>{' '}
          or{' '}
          <Link href='/signup'>
            <UILink color='green.200'>sign up</UILink>
          </Link>{' '}
          first.
        </Text>
      </CenteredContainer>
    );

  return render();
};

export default observer(AuthedPage);

import React, { useState, useEffect, useCallback } from 'react';
import { observer } from 'mobx-react-lite';
import { useRouter } from 'next/router';
import Link from 'next/link';

import {
  Text,
  Button,
  Spinner,
  Divider,
  Link as UILink,
} from '@chakra-ui/core';

import useCurrentUser from '@hooks/useCurrentUser';

import CenteredContainer from '@components/shared/centeredContainer';
import Container from '@components/shared/container';
import Section from '@components/shared/section';
import Heading from '@components/shared/heading';
import ProfileForm from '@components/forms/profileForm';
import DeleteAccountButtons from '@components/forms/profileForm/deleteAccountButtons';

const EditProfile = observer(() => {
  const router = useRouter();
  const userStore = useCurrentUser();

  const [isDeleting, setIsDeleting] = useState(false);
  const [justDeleted, setJustDeleted] = useState(false);
  const [deletingError, setDeletingError] = useState(null);

  useEffect(() => {
    if (!userStore.isLoading && !justDeleted && !userStore.currentUser)
      router.replace('/');
  }, [router, userStore, justDeleted]);

  const onSubmitSuccess = useCallback(
    async (resJson) => {
      userStore.updateCurrentUserData(await resJson.user);
    },
    [userStore]
  );

  const handleDelete = useCallback(
    async (e) => {
      e.preventDefault();

      setIsDeleting(true);
      setDeletingError(null);

      const res = await fetch('/api/user', {
        method: 'DELETE',
      });

      if (res.status === 200) {
        userStore.logOut();
        setJustDeleted(true);
      } else {
        setDeletingError('Something went wrong, please try again');
      }

      setIsDeleting(false);
    },
    [userStore]
  );

  return (
    <CenteredContainer>
      {userStore.isLoading ? (
        <Spinner />
      ) : justDeleted ? (
        <Text fontSize='5xl'>
          Your account has been deleted. Sorry to see you go!
        </Text>
      ) : !userStore.currentUser ? (
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
      ) : (
        <Section contained>
          <Link href='/profile'>
            <Button size='xs' leftIcon='arrow-back' variant='ghost'>
              Back
            </Button>
          </Link>
          <Heading size='md' mt={8}>
            Edit Profile
          </Heading>

          <ProfileForm
            onSubmitSuccess={onSubmitSuccess}
            user={userStore.currentUser}
          />
          <Divider my={4} />
          <DeleteAccountButtons
            confirmationName={userStore.currentUser.name}
            isDisabled={userStore.isLoading}
            isLoading={isDeleting}
            handleDelete={handleDelete}
          />
          {deletingError && (
            <Text fontSize='xs' color='red'>
              {deletingError}
            </Text>
          )}
        </Section>
      )}
    </CenteredContainer>
  );
});

export default EditProfile;

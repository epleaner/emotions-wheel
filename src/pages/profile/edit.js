import React, { useState, useEffect, useCallback } from 'react';
import { useRouter } from 'next/router';
import { Text, Spinner, Divider } from '@chakra-ui/core';
import useUser from '@hooks/useUser';

import CenteredContainer from '@components/shared/centeredContainer';
import Section from '@components/shared/section';
import Heading from '@components/shared/heading';
import ProfileForm from '@components/forms/profileForm';
import DeleteAccountButtons from '@components/deleteAccountButtons';

const EditProfile = () => {
  const router = useRouter();
  const [user, { mutate }, isFetching] = useUser();

  const [isDeleting, setIsDeleting] = useState(false);
  const [justDeleted, setJustDeleted] = useState(false);

  useEffect(() => {
    if(!isFetching && !justDeleted && !user) router.replace('/');
  }, [router, isFetching, justDeleted, user]);

  const onSubmitSuccess = useCallback(async (resJson) => {
    mutate({
      user: {
        ...user,
        ...(await resJson.user),
      },
    });
  }, [user, mutate]);

  const handleDelete = useCallback(async (e) => {
    e.preventDefault();

    setIsDeleting(true);

    const res = await fetch('/api/user', {
      method: 'DELETE',
    });

    const resJson = await res.json();
    
    if (resJson.ok) {
      mutate(null);
      setJustDeleted(true);
    } else {
      console.log({ message: resJson.message, isError: true });
    }

    setIsDeleting(false);
  }, [mutate]);

  return (
    <CenteredContainer>
      {isFetching ? (
        <Spinner />
      ) : justDeleted ? (
        <Text>Your account has been deleted. Sorry to see you go!</Text>
      ) : !user ? (
        <Text>Please log in.</Text>
      ) : (
        <Section>
          <Heading mb={4}>Edit Profile</Heading>
          <ProfileForm onSubmitSuccess={onSubmitSuccess} user={user} />
          <Divider my={4} />
          <DeleteAccountButtons
            confirmationName={user.name}
            isDisabled={isFetching}
            isLoading={isDeleting}
            handleDelete={handleDelete}
          />
        </Section>
      )}
    </CenteredContainer>
  );
};

export default EditProfile;

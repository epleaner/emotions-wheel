import React, { useState } from 'react';
import { Text, Spinner, Divider } from '@chakra-ui/core';
import useUser from '@hooks/useUser';

import CenteredContainer from '@components/shared/centeredContainer';
import Section from '@components/shared/section';
import Heading from '@components/shared/heading';
import ProfileForm from '@components/forms/profileForm';
import DeleteAccountButtons from '@components/deleteAccountButtons';

const EditProfile = () => {
  const [user, { mutate }, isFetching] = useUser();

  const [isDeleting, setIsDeleting] = useState(false);
  const [justDeleted, setJustDeleted] = useState(false);

  const onSubmitSuccess = async (resJson) => {
    mutate({
      user: {
        ...user,
        ...(await resJson.user),
      },
    });
  };

  const handleDelete = async (e) => {
    e.preventDefault();

    setIsDeleting(true);

    const res = await fetch('/api/user', {
      method: 'DELETE',
    });

    const resJson = await res.json();

    if (resJson.ok) {
      setJustDeleted(true);
    } else {
      setMsg({ message: resJson.message, isError: true });
    }

    setIsDeleting(false);
  };

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

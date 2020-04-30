import React, { useEffect, useState } from 'react';
import { Box, Button, Text, Spinner } from '@chakra-ui/core';
import useUser from '@hooks/useUser';

import CenteredContainer from '@components/shared/centeredContainer';
import Section from '@components/shared/section';
import Heading from '@components/shared/heading';
import ProfileForm from '@components/forms/profileForm';

const EditProfile = () => {
  const [user, { mutate }, isFetching] = useUser();

  const [isUpdating, setIsUpdating] = useState(false);
  const [isValid, setIsValid] = useState(false);

  const [msg, setMsg] = useState({ message: '', isError: false });
  const [name, setName] = useState(user ? user.name : '');
  const [email, setEmail] = useState(user ? user.email : '');
  const [oldPassword, setOldPassword] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [showDeleteConfirmation, setShowDeleteConfirmation] = useState(false);
  const [justDeleted, setJustDeleted] = useState(false);

  useEffect(() => {
    if (!isFetching && user) {
      setName(user.name);
      setEmail(user.email);
    }
  }, [user]);

  useEffect(() => {
    let profileFieldsChanged = false;
    let passwordsValid = false;

    if (user) {
      if (name !== user.name || email !== user.email)
        profileFieldsChanged = true;

      if (
        (oldPassword && newPassword) ||
        (!(oldPassword && newPassword) && profileFieldsChanged)
      )
        passwordsValid = true;
    }

    setIsValid(profileFieldsChanged || passwordsValid);
  }, [user, name, email, oldPassword, newPassword]);

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (isUpdating) return;
    setIsUpdating(true);
    setMsg({ message: '', isError: false });

    const body = { name, email, oldPassword, newPassword };

    const response = await fetch('/api/user', {
      method: 'PATCH',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(body),
    });

    const responseJson = await response.json();

    if (responseJson.ok) {
      mutate({
        user: {
          ...user,
          ...responseJson.user,
        },
      });

      setMsg({ message: 'Profile updated' });
      setOldPassword('');
      setNewPassword('');
    } else {
      setMsg({ message: responseJson.message, isError: true });
    }

    setIsUpdating(false);
  };

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

    if (isUpdating) return;
    setIsUpdating(true);

    const response = await fetch('/api/user', {
      method: 'DELETE',
    });

    const responseJson = await response.json();

    if (responseJson.ok) {
      setJustDeleted(true);
    } else {
      setMsg({ message: responseJson.message, isError: true });
    }

    setIsUpdating(false);
  };

  return (
    <CenteredContainer>
      {isFetching ? (
        <Spinner />
      ) : justDeleted ? (
        <Text>Your account has been deleted. Sorry to see you go!</Text>
      ) : !user ? (
        <Text>Please sign in</Text>
      ) : (
        <Section>
          <Heading mb={4}>Edit Profile</Heading>
          <ProfileForm onSubmitSuccess={onSubmitSuccess} user={user} />
          <Box>
            {showDeleteConfirmation ? (
              <>
                <Button
                  variant="warning"
                  disabled={isFetching}
                  type="button"
                  onClick={handleDelete}
                  mt={2}
                >
                  Yes, really delete
                </Button>
                <Button
                  variant="primary"
                  disabled={isFetching}
                  type="button"
                  onClick={() => setShowDeleteConfirmation(false)}
                  mt={2}
                >
                  Never mind
                </Button>
              </>
            ) : (
              <Button
                variant="warning"
                disabled={isFetching}
                type="button"
                onClick={() => setShowDeleteConfirmation(true)}
                mt={2}
              >
                Delete account
              </Button>
            )}
          </Box>
        </Section>
      )}
    </CenteredContainer>
  );
};

export default EditProfile;

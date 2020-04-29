import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/router';
import { Flex, Box } from '@chakra-ui/core';

import LoginForm from '@components/shared/forms/loginForm';
import CenteredContainer from '@components/shared/centeredContainer';

import useUser from '@hooks/useUser';

const LoginPage = () => {
  const [] = useState('');

  const router = useRouter();
  const [user, { mutate }] = useUser();

  useEffect(() => {
    // redirect to home if user is authenticated
    if (user) router.replace('/');
  }, [user]);

  const onSubmitSuccess = async (res) => {
    const userObj = await res.json();
    mutate(userObj);
    router.replace('/');
  };

  return (
    <CenteredContainer>
      <Box width={['100%', 500]} mx={[2, 0]}>
        <LoginForm onSubmitSuccess={onSubmitSuccess} />
      </Box>
    </CenteredContainer>
  );
};

export default LoginPage;

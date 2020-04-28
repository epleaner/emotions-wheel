import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/router';
import { Flex, Box } from '@chakra-ui/core';

import LoginForm from '@components/shared/forms/loginForm';
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
  };

  return (
    <Flex justifyContent={'center'} alignItems={'center'} height="100%">
      <Box width={['100%', 500]} mx={[2, 0]}>
        <LoginForm onSubmitSuccess={onSubmitSuccess} />
      </Box>
    </Flex>
  );
};

export default LoginPage;

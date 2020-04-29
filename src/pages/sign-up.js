import React, { useEffect } from 'react';
import { useRouter } from 'next/router';
import { Box } from '@chakra-ui/core';

import useUser from '@hooks/useUser';
import SignUpForm from '@components/shared/forms/signupForm';
import CenteredContainer from '@components/shared/centeredContainer';

const SignupPage = () => {
  const router = useRouter();
  const [user, { mutate }] = useUser();

  useEffect(() => {
    if (user) router.replace('/');
  }, [user]);

  const onSubmitSuccess = async (res) => {
    const userObj = await res.json();
    mutate(userObj);
  };

  return (
    <CenteredContainer>
      <Box width={['100%', 500]} mx={[2, 0]}>
        <SignUpForm onSubmitSuccess={onSubmitSuccess} />
      </Box>
    </CenteredContainer>
  );
};

export default SignupPage;

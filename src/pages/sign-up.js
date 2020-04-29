import React, { useEffect } from 'react';
import { useRouter } from 'next/router';
import { Box } from '@chakra-ui/core';

import useUser from '@hooks/useUser';
import SignUpForm from '@components/shared/forms/signupForm';
import CenteredContainer from '@components/shared/centeredContainer';
import Section from '@components/shared/section';

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
      <Section>
        <SignUpForm onSubmitSuccess={onSubmitSuccess} />
      </Box>
    </Section>
  );
};

export default SignupPage;

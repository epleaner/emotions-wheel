import React, { useEffect } from 'react';
import { useRouter } from 'next/router';

import LoginForm from '@components/forms/loginForm';
import CenteredContainer from '@components/shared/centeredContainer';
import Section from '@components/shared/section';

import useUser from '@hooks/useUser';

const LoginPage = () => {
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
      <Section>
        <LoginForm onSubmitSuccess={onSubmitSuccess} />
      </Section>
    </CenteredContainer>
  );
};

export default LoginPage;

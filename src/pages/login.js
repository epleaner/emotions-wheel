import React, { useEffect } from 'react';
import { useRouter } from 'next/router';

import LoginForm from '@components/forms/loginForm';
import CenteredContainer from '@components/shared/centeredContainer';
import Section from '@components/shared/section';

import useUser from '@hooks/useUser';

const LoginPage = () => {
  const router = useRouter();
  const [user] = useUser();

  useEffect(() => {
    // redirect to home if user is authenticated
    if (user) router.replace('/');
  }, [user, router]);

  return (
    <CenteredContainer>
      <Section>
        <LoginForm redirectTo='/' />
      </Section>
    </CenteredContainer>
  );
};

export default LoginPage;

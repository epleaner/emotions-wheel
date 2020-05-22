import React, { useEffect } from 'react';
import { useRouter } from 'next/router';

import useUser from '@hooks/useUser';
import SignUpForm from '@components/forms/signUpForm';
import CenteredContainer from '@components/shared/centeredContainer';
import Section from '@components/shared/section';

const SignupPage = () => {
  const router = useRouter();
  const [user] = useUser();

  useEffect(() => {
    if (user) router.replace('/');
  }, [user, router]);

  return (
    <CenteredContainer>
      <Section>
        <SignUpForm onSubmitSuccess={() => {}} />
      </Section>
    </CenteredContainer>
  );
};

export default SignupPage;

import React, { useEffect } from 'react';
import { useRouter } from 'next/router';

import useUser from '@hooks/useUser';
import SignupForm from '@components/forms/signupForm';
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
        <SignupForm onSubmitSuccess={() => {}} />
      </Section>
    </CenteredContainer>
  );
};

export default SignupPage;

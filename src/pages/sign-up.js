import React, { useEffect } from 'react';
import { useRouter } from 'next/router';
import { observer } from 'mobx-react-lite';

import { Spinner } from '@chakra-ui/core';

import SignupForm from '@components/forms/signupForm';
import CenteredContainer from '@components/shared/centeredContainer';
import Section from '@components/shared/section';

import useCurrentUser from '@hooks/useCurrentUser';

const SignupPage = () => {
  const router = useRouter();
  const currentUserStore = useCurrentUser();

  useEffect(() => {
    if (currentUserStore.isLoggedIn) router.replace('/');
  }, [currentUserStore.isLoggedIn, router]);

  return (
    <CenteredContainer>
      {currentUserStore.isLoading ? (
        <Spinner />
      ) : (
        <>
          {!currentUserStore.isLoggedIn && (
            <Section contained>
              <SignupForm onSubmitSuccess={() => {}} />
            </Section>
          )}
        </>
      )}
    </CenteredContainer>
  );
};

export default observer(SignupPage);

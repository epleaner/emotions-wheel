import React, { useState } from 'react';

import CenteredContainer from '@components/shared/centeredContainer';
import Heading from '@components/shared/heading';
import Section from '@components/shared/section';
import ForgotPasswordForm from '@components/forms/forgotPasswordForm';

const ForgotPassword = () => {
  const [submitted, setSubmitted] = useState(false);
  return (
    <CenteredContainer>
      <Section contained>
        {submitted ? (
          <Heading>Help should be on its way!</Heading>
        ) : (
          <>
            <Heading>Forgot your password?</Heading>
            <ForgotPasswordForm onSubmitSuccess={() => setSubmitted(true)} />
          </>
        )}
      </Section>
    </CenteredContainer>
  );
};

export default ForgotPassword;

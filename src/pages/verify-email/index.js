import React, { useState, useCallback } from 'react';
import Link from 'next/link';

import { useRouter } from 'next/router';

import { Box, Collapse, Text, Button, Link as UILink } from '@chakra-ui/core';

import CenteredContainer from '@components/shared/centeredContainer';
import Section from '@components/shared/section';
import Heading from '@components/shared/heading';

import VerifyEmailForm from '@components/forms/verifyEmailForm';

const VerifyEmail = () => {
  const {
    query: { email },
  } = useRouter();

  const [showWhy, setShowWhy] = React.useState(false);
  const [submitted, setSubmitted] = useState(false);

  const handleToggle = useCallback(() => setShowWhy(!showWhy), [showWhy]);

  return (
    <CenteredContainer>
      <Section>
        {submitted ? (
          <>
            <Heading>
              An email has been sent to your inbox containing a link to verify
              your account!
            </Heading>
            <Text fontSize='md'>
              Didn't show up?{' '}
              <UILink color='blue.200' onClick={() => setSubmitted(false)}>
                Resend
              </UILink>
            </Text>
          </>
        ) : (
          <>
            <Box mb={4}>
              <Heading mb={1}>Let's get your email verified.</Heading>
              <Button variant='link' size='xs' onClick={handleToggle}>
                Why do I need to do this?
              </Button>
              <Collapse mt={4} isOpen={showWhy}>
                <Text fontSize='xs'>
                  This is to prevent others from creating an account under your
                  email without your permission, and guarantees we'll be able to
                  reach you in case you need to reset your password.
                </Text>
              </Collapse>
            </Box>
            <VerifyEmailForm
              mt={4}
              onSubmitSuccess={() => setSubmitted(true)}
              email={email}
            />
          </>
        )}
      </Section>
    </CenteredContainer>
  );
};

export default VerifyEmail;

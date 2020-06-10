import React, { useState, useCallback } from 'react';
import PropTypes from 'prop-types';
import { Button, Text } from '@chakra-ui/core';

const ResendVerificationEmailText = ({ email }) => {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [sentSuccess, setSentSuccess] = useState(false);
  const [sentError, setSentError] = useState(false);

  const sendVerificationEmail = useCallback(async () => {
    setIsSubmitting(true);
    const res = await fetch('/api/user/email/verify', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ email }),
    });

    setIsSubmitting(false);
    switch (res.status) {
      case 200:
        setSentSuccess(true);
        break;
      case 400:
        setSentError((await res.json()).message);
        break;
      default:
        setSentError('Something went wrong, please try again.');
        break;
    }
  }, [email]);

  return sentSuccess ? (
    'Resent!'
  ) : (
    <Button
      size='sm'
      variant='link'
      isLoading={isSubmitting}
      loadingText='Resending...'
      onClick={sendVerificationEmail}>
      <Text as='aside' color='blue.500' fontSize='sm'>
        {sentError
          ? 'Something went wrong. Try again?'
          : 'Resend verification email?'}
      </Text>
    </Button>
  );
};

ResendVerificationEmailText.propTypes = {
  email: PropTypes.string,
};

export default ResendVerificationEmailText;

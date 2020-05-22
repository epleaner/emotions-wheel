import React, { useState, useCallback } from 'react';
import { Collapse, Text, Input, Button } from '@chakra-ui/core';

import CenteredContainer from '@components/shared/centeredContainer';
import Section from '@components/shared/section';
import Heading from '@components/shared/heading';

const ForgotPassword = () => {
  const [showWhy, setShowWhy] = React.useState(false);
  const [email, setEmail] = useState('');
  const [formStatus, setFormStatus] = useState({ ok: true, message: '' });
  const [submitting, setSubmitting] = useState(false);

  const handleToggle = useCallback(() => setShowWhy(!showWhy), [showWhy]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setFormStatus({ ok: true, message: '' });

    setSubmitting(true);

    const body = { email };

    const res = await fetch('/api/user/email/verify', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(body),
    });

    const responseJson = await res.json();

    setEmail('');
    setFormStatus(responseJson);
    setSubmitting(false);
  };

  return (
    <CenteredContainer>
      <Section>
        <Heading mb={1}>Let's get your email verified.</Heading>
        <Button variant='link' size='xs' onClick={handleToggle}>
          Why do I need to do this?
        </Button>
        <Collapse mt={4} isOpen={showWhy}>
          <Text fontSize='xs'>
            This is to prevent others from creating an account under your email
            without your permission, and guarantees we'll be able to reach you
            in case you need to reset your password.
          </Text>
        </Collapse>
        {formStatus.message}
        <form onSubmit={handleSubmit}>
          <Input
            id='email'
            type='email'
            placeholder='Your email'
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
          <Button type='submit' disabled={submitting}>
            Submit
          </Button>
        </form>
      </Section>
    </CenteredContainer>
  );
};

export default ForgotPassword;

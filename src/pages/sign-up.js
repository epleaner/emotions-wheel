import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/router';
import { Flex, Box } from '@chakra-ui/core';

import useUser from '@hooks/useUser';
import FormikSignUpForm from '@components/shared/forms/FormikSignUpForm';
import EmailInput from '@components/shared/forms/emailInput';

const SignupPage = () => {
  const router = useRouter();
  const [user, { mutate }] = useUser();
  const [errorMsg, setErrorMsg] = useState('');
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [emailValid, setEmailValid] = useState(true);

  useEffect(() => {
    if (user) router.replace('/');
  }, [user]);

  const handleSubmit = async () => {
    e.preventDefault();

    const body = {
      email,
      name,
      password,
    };

    const res = await fetch('/api/user', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(body),
    });

    if (res.status === 201) {
      const userObj = await res.json();
      mutate(userObj);
    } else {
      setErrorMsg(await res.text());
    }
  };

  const onSubmitSuccess = async (res) => {
    const userObj = await res.json();
    mutate(userObj);
  };

  const onSubmitError = async (res) => void setErrorMsg(await res.text());

  return (
    <Flex justifyContent={'center'} alignItems={'center'} height="100%">
      <Box width={['100%', 500]} mx={[2, 0]}>
        <FormikSignUpForm
          onSubmitSuccess={onSubmitSuccess}
          onSubmitError={onSubmitError}
        />
      </Box>
    </Flex>
  );
};

export default SignupPage;

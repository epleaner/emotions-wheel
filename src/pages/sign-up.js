import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/router';
import { Flex, Box } from '@chakra-ui/core';

import useUser from '@hooks/useUser';
import FormikSignUpForm from '@components/shared/forms/FormikSignUpForm';

const SignupPage = () => {
  const router = useRouter();
  const [user, { mutate }] = useUser();
  const [errorMsg, setErrorMsg] = useState('');

  useEffect(() => {
    if (user) router.replace('/');
  }, [user]);

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

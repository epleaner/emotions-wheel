import React from 'react';
import PropTypes from 'prop-types';

import { FormErrorMessage, Icon, Text, Flex, Box } from '@chakra-ui/core';

import ResendVerificationEmailText from '@components/forms/loginForm/loginFormErrorMessage/resendVerificationEmailText';

const LoginFormErrorMessage = ({ body: { message, email }, signUp }) => {
  switch (message) {
    case 'Email not verified':
      return (
        <Text as='aside' color='blue.500' fontSize='sm'>
          <Flex alignItems='center'>
            <Icon name='info' mr={2} />
            <Flex alignItems='center' flexWrap='wrap'>
              <Box mr={1}>
                {signUp
                  ? 'An account with this email already exists, but it'
                  : 'This email'}{' '}
                still needs to be verified.{' '}
              </Box>
              <ResendVerificationEmailText email={email} />
            </Flex>
          </Flex>
        </Text>
      );
    default:
      return <FormErrorMessage>{message}</FormErrorMessage>;
  }
};
LoginFormErrorMessage.propTypes = {
  signUp: PropTypes.bool,
  body: PropTypes.shape({
    message: PropTypes.string.isRequired,
    email: PropTypes.string,
  }),
};
export default LoginFormErrorMessage;

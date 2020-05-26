import React from 'react';
import PropTypes from 'prop-types';
import Link from 'next/link';

import {
  FormErrorMessage,
  Icon,
  Text,
  Flex,
  Link as UILink,
} from '@chakra-ui/core';

const LoginFormErrorMessage = ({ message }) => {
  switch (message) {
    case 'Email not verified':
      return (
        <Text as='aside' color='blue.500' fontSize='sm'>
          <Flex alignItems='center'>
            <Icon name='info' mr={2} />
            <Text>
              This email still needs to be verified.{' '}
              <Link href='/verify-email'>
                <UILink fontWeight='600'>Resend verification email?</UILink>
              </Link>
            </Text>
          </Flex>
        </Text>
      );
    default:
      return <FormErrorMessage>{message}</FormErrorMessage>;
  }
};
LoginFormErrorMessage.propTypes = {
  message: PropTypes.string,
};
export default LoginFormErrorMessage;

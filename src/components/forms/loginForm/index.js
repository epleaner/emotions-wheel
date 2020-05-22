import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { Formik, Form, Field } from 'formik';
import Link from 'next/link';
import useUser from '@hooks/useUser';

import {
  FormControl,
  FormErrorMessage,
  FormHelperText,
  Button,
  Input,
  Link as ChakraLink,
  Flex,
} from '@chakra-ui/core';

import LoginSchema from '@schemas/formValidations/loginFormValidations';
import LoginFormErrorMessage from '@components/forms/loginForm/loginFormErrorMessage';

const LoginForm = ({ onSubmitSuccess, cancellable, onCancel }) => {
  const [, { mutate }] = useUser();

  const [formErrorMessage, setFormErrorMessage] = useState('');
  return (
    <Formik
      initialValues={{ email: '', password: '' }}
      validate={() => setFormErrorMessage(null)}
      validationSchema={LoginSchema}
      onSubmit={async (values, { setSubmitting }) => {
        const res = await fetch('/api/auth', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(values),
        });

        switch (res.status) {
          case 200:
            // set user state to user response
            mutate(await res.json());
            await onSubmitSuccess(res);

            break;
          case 401:
            setFormErrorMessage((await res.json()).message);
            setSubmitting(false);

            break;
          default:
            setFormErrorMessage('Something went wrong, please try again');
            setSubmitting(false);

            break;
        }
      }}>
      {({ isSubmitting, isValidating, errors, dirty }) => (
        <Form>
          <Field name='email'>
            {({ field, form }) => (
              <FormControl
                mb={8}
                isRequired
                isInvalid={form.errors.email && form.touched.email}>
                <Input
                  _invalid={{ boxShadow: 'none' }}
                  aria-label='Email'
                  variant='flushed'
                  {...field}
                  id='email'
                  type='email'
                  placeholder='Email'
                />
                <FormErrorMessage>{form.errors.email}</FormErrorMessage>
              </FormControl>
            )}
          </Field>
          <Field name='password'>
            {({ field, form }) => (
              <FormControl
                mb={8}
                isRequired
                isInvalid={form.errors.password && form.touched.password}>
                <Input
                  _invalid={{ boxShadow: 'none' }}
                  aria-label='Password'
                  variant='flushed'
                  {...field}
                  id='password'
                  type='password'
                  placeholder='Password'
                />
                <FormErrorMessage>{form.errors.password}</FormErrorMessage>
                <FormHelperText>
                  <Link href='/forgot-password'>
                    <ChakraLink>Forgot your password?</ChakraLink>
                  </Link>
                </FormHelperText>
              </FormControl>
            )}
          </Field>
          <FormControl isInvalid={formErrorMessage}>
            <LoginFormErrorMessage message={formErrorMessage} />
            <Flex justifyContent='space-between'>
              <Button
                mt={4}
                variantColor='green'
                isDisabled={
                  !dirty ||
                  Object.entries(errors).length ||
                  isSubmitting ||
                  isValidating
                }
                isLoading={isSubmitting}
                loadingText='Logging in'
                type='submit'>
                Log in
              </Button>
              {cancellable && (
                <Button
                  mt={4}
                  variant='ghost'
                  isDisabled={isSubmitting || isValidating}
                  type='button'
                  onClick={onCancel}>
                  Cancel
                </Button>
              )}
            </Flex>
          </FormControl>
        </Form>
      )}
    </Formik>
  );
};

LoginForm.propTypes = {
  onSubmitSuccess: PropTypes.func.isRequired,
  cancellable: PropTypes.bool,
  onCancel: PropTypes.func,
};

export default LoginForm;

import React, { useState } from 'react';
import { useRouter } from 'next/router';

import PropTypes from 'prop-types';
import { Formik, Form, Field } from 'formik';
import Link from 'next/link';
import useCurrentUser from '@hooks/useCurrentUser';

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

const LoginForm = ({ onSubmitSuccess, cancellable, onCancel, redirectTo }) => {
  const router = useRouter();
  const userStore = useCurrentUser();

  const [formErrorBody, setFormErrorBody] = useState(null);
  return (
    <Formik
      initialValues={{ email: '', password: '' }}
      validate={() => setFormErrorBody(null)}
      validateOnBlur={false}
      validationSchema={LoginSchema}
      onSubmit={async (values, { setSubmitting }) => {
        try {
          const res = await userStore.logIn(values);

          if (typeof onSubmitSuccess === 'function') await onSubmitSuccess(res);

          if (redirectTo) router.replace(redirectTo);
        } catch (e) {
          console.log(e);
          switch (e.status) {
            case 401:
              setFormErrorBody({
                message: e.json.message,
                email: values.email,
              });
              setSubmitting(false);
              break;
            default:
              setFormErrorBody({
                message: 'Something went wrong, please try again',
              });
              setSubmitting(false);
              break;
          }
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
          <FormControl isInvalid={formErrorBody}>
            {formErrorBody && <LoginFormErrorMessage body={formErrorBody} />}
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
  onSubmitSuccess: PropTypes.func,
  cancellable: PropTypes.bool,
  onCancel: PropTypes.func,
  redirectTo: PropTypes.string,
};

export default LoginForm;

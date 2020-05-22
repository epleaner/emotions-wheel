import React, { useState } from 'react';
import PropTypes from 'prop-types';

import { Formik, Form, Field } from 'formik';
import {
  FormControl,
  FormErrorMessage,
  FormHelperText,
  Button,
  Input,
  Flex,
  Text,
} from '@chakra-ui/core';

import SignUpSchema from '@schemas/formValidations/signupFormValidations';
import Heading from '@components/shared/heading';
const SignupForm = ({ onSubmitSuccess, cancellable, onCancel }) => {
  const [formErrorMessage, setFormErrorMessage] = useState('');
  const [submitSuccess, setSubmitSuccess] = useState(false);

  return (
    <>
      {submitSuccess ? (
        <>
          <Heading fontSize='4xl'>Thanks for signing up!</Heading>
          <Text fontSize='2xl'>
            Check your inbox for a verification email, then you'll be good to
            go.
          </Text>
        </>
      ) : (
        <Formik
          initialValues={{ name: '', email: '', password: '' }}
          validate={() => setFormErrorMessage(null)}
          validationSchema={SignUpSchema}
          onSubmit={async (values, { setSubmitting }) => {
            const res = await fetch('/api/user', {
              method: 'POST',
              headers: { 'Content-Type': 'application/json' },
              body: JSON.stringify(values),
            });

            if (res.status === 201) {
              await onSubmitSuccess(res);
              setSubmitting(false);
              setSubmitSuccess(true);
            } else setFormErrorMessage(await res.text());
          }}>
          {({ isSubmitting, isValidating, errors, dirty }) => (
            <Form>
              <Field name='name'>
                {({ field, form }) => (
                  <FormControl
                    mb={8}
                    isRequired
                    isInvalid={form.errors.name && form.touched.name}>
                    <Input
                      _invalid={{ boxShadow: 'none' }}
                      aria-label='Name'
                      variant='flushed'
                      {...field}
                      id='name'
                      type='text'
                      placeholder='Username'
                    />
                    <FormErrorMessage>{form.errors.name}</FormErrorMessage>
                  </FormControl>
                )}
              </Field>
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
                    <FormHelperText fontSize='xs' id='email-helper-text'>
                      We won't share your email with anyone or send annoying
                      updates – this will only be used to help reset your
                      password if you've forgotten it.
                    </FormHelperText>
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
                  </FormControl>
                )}
              </Field>
              <FormControl isInvalid={formErrorMessage}>
                <FormErrorMessage>{formErrorMessage}</FormErrorMessage>
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
                    loadingText='Signing up'
                    type='submit'>
                    Sign up
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
      )}
    </>
  );
};

SignupForm.propTypes = {
  onSubmitSuccess: PropTypes.func.isRequired,
  cancellable: PropTypes.bool,
  onCancel: PropTypes.func,
};

export default SignupForm;

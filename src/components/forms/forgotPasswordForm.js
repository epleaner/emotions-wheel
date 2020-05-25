import React, { useState } from 'react';
import PropTypes from 'prop-types';

import { Formik, Form, Field } from 'formik';
import {
  FormControl,
  FormLabel,
  FormErrorMessage,
  Button,
  Input,
} from '@chakra-ui/core';

import ForgotPasswordSchema from '@schemas/formValidations/forgotPasswordFormValidations';

const ForgotPasswordForm = ({ onSubmitSuccess }) => {
  const [formErrorMessage, setFormErrorMessage] = useState('');
  return (
    <Formik
      initialValues={{ email: '' }}
      validate={() => setFormErrorMessage(null)}
      validationSchema={ForgotPasswordSchema}
      onSubmit={async (values, { setSubmitting }) => {
        const res = await fetch('/api/user/password/reset', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(values),
        });

        if (res.status === 200) {
          setSubmitting(false);
          await onSubmitSuccess(res);
        } else setFormErrorMessage('Something went wrong, please try again.');
      }}>
      {({ isSubmitting, isValidating, errors, dirty }) => (
        <Form>
          <Field name='email'>
            {({ field, form }) => (
              <FormControl
                mb={8}
                isRequired
                isInvalid={form.errors.email && form.touched.email}>
                <FormLabel htmlFor='email'>Email</FormLabel>
                <Input
                  aria-label='Email'
                  variant='flushed'
                  {...field}
                  id='email'
                  type='email'
                  placeholder=''
                />
                <FormErrorMessage>{form.errors.email}</FormErrorMessage>
              </FormControl>
            )}
          </Field>
          <FormControl isInvalid={formErrorMessage}>
            <FormErrorMessage>{formErrorMessage}</FormErrorMessage>
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
              loadingText='Sending'
              type='submit'>
              Get a reset link
            </Button>
          </FormControl>
        </Form>
      )}
    </Formik>
  );
};

ForgotPasswordForm.propTypes = {
  onSubmitSuccess: PropTypes.func.isRequired,
};

export default ForgotPasswordForm;

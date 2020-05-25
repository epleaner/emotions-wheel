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

import VerifyEmailSchema from '@schemas/formValidations/verifyEmailFormValidations';

const VerifyEmailForm = ({ onSubmitSuccess }) => {
  const [formErrorMessage, setFormErrorMessage] = useState('');
  return (
    <Formik
      initialValues={{ email: '' }}
      validate={() => setFormErrorMessage(null)}
      validationSchema={VerifyEmailSchema}
      onSubmit={async (values, { setSubmitting }) => {
        const res = await fetch('/api/user/email/verify', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(values),
        });

        setSubmitting(false);

        switch (res.status) {
          case 200:
            await onSubmitSuccess(res);
            break;
          case 400:
            setFormErrorMessage((await res.json()).message);
            break;
          default:
            setFormErrorMessage('Something went wrong, please try again.');
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
              loadingText='Submitting'
              type='submit'>
              Submit
            </Button>
          </FormControl>
        </Form>
      )}
    </Formik>
  );
};

VerifyEmailForm.propTypes = {
  onSubmitSuccess: PropTypes.func.isRequired,
};

export default VerifyEmailForm;

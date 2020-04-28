import React, { useState } from 'react';
import { Formik, Form, Field } from 'formik';
import {
  FormControl,
  FormLabel,
  FormErrorMessage,
  FormHelperText,
  Button,
  Input,
} from '@chakra-ui/core';

import SignUpSchema from '@schemas/formValidations/signupFormValidations';

const Basic = ({ onSubmitSuccess }) => {
  const [formErrorMessage, setFormErrorMessage] = useState('');
  return (
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
        } else setFormErrorMessage(await res.text());
      }}
    >
      {({ isSubmitting, isValidating, errors, dirty }) => (
        <Form>
          <Field name="name">
            {({ field, form }) => (
              <FormControl
                mb={8}
                isRequired
                isInvalid={form.errors.name && form.touched.name}
              >
                <FormLabel htmlFor="name">Name</FormLabel>
                <Input
                  aria-label="Name"
                  variant="flushed"
                  {...field}
                  id="name"
                  type="text"
                  placeholder=""
                />
                <FormErrorMessage>{form.errors.name}</FormErrorMessage>
              </FormControl>
            )}
          </Field>
          <Field name="email">
            {({ field, form }) => (
              <FormControl
                mb={8}
                isRequired
                isInvalid={form.errors.email && form.touched.email}
              >
                <FormLabel htmlFor="email">Email</FormLabel>
                <Input
                  aria-label="Email"
                  variant="flushed"
                  {...field}
                  id="email"
                  type="email"
                  placeholder=""
                />
                <FormErrorMessage>{form.errors.email}</FormErrorMessage>
                <FormHelperText id="email-helper-text">
                  We won't share your email with anyone – this is only used to
                  help reset your password if you've forgotten it.
                </FormHelperText>
              </FormControl>
            )}
          </Field>
          <Field name="password">
            {({ field, form }) => (
              <FormControl
                mb={8}
                isRequired
                isInvalid={form.errors.password && form.touched.password}
              >
                <FormLabel htmlFor="password">Password</FormLabel>
                <Input
                  aria-label="Password"
                  variant="flushed"
                  {...field}
                  id="password"
                  type="password"
                  placeholder=""
                />
                <FormErrorMessage>{form.errors.password}</FormErrorMessage>
              </FormControl>
            )}
          </Field>
          <FormControl isInvalid={formErrorMessage}>
            <FormErrorMessage>{formErrorMessage}</FormErrorMessage>
            <Button
              mt={4}
              variantColor="primary"
              isDisabled={
                !dirty ||
                Object.entries(errors).length ||
                isSubmitting ||
                isValidating
              }
              isLoading={isSubmitting}
              loadingText="Signing up"
              type="submit"
            >
              Sign up
            </Button>
          </FormControl>
        </Form>
      )}
    </Formik>
  );
};

export default Basic;

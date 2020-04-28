import React from 'react';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import {
  FormControl,
  FormLabel,
  FormErrorMessage,
  FormHelperText,
  Button,
  Input,
} from '@chakra-ui/core';

const Basic = ({ onSubmitSuccess, onSubmitError }) => {
  return (
    <Formik
      initialValues={{ name: '', email: '', password: '' }}
      validate={(values) => {
        const errors = {};
        if (!values.name) errors.name = 'Required';

        if (!values.email) errors.email = 'Required';
        else if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i.test(values.email))
          errors.email = 'Invalid email address';

        if (!values.password) errors.password = 'Required';

        return errors;
      }}
      onSubmit={async (values, { setSubmitting }) => {
        debugger;
        const res = await fetch('/api/user', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(values),
        });

        if (res.status === 201) {
          onSubmitSuccess(res);
          setSubmitting(false);
        } else onSubmitError(res);
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
                  placeholder=""
                />
                <FormErrorMessage>{form.errors.password}</FormErrorMessage>
              </FormControl>
            )}
          </Field>
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
            loadingText="Submitting"
            type="submit"
          >
            Sign up
          </Button>
        </Form>
      )}
    </Formik>
  );
};

export default Basic;

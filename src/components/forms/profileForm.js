import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { Formik, Form, Field } from 'formik';
import Link from 'next/link';

import {
  FormControl,
  FormLabel,
  FormErrorMessage,
  Button,
  Input,
} from '@chakra-ui/core';

import ProfileSchema from '@schemas/formValidations/profileFormValidations';

import Heading from '@components/shared/heading';

const ProfileForm = ({ onSubmitSuccess, user }) => {
  const [formErrorMessage, setFormErrorMessage] = useState('');

  return (
    <Formik
      initialValues={{
        name: user.name,
        email: user.email,
        passwords: {
          oldPassword: '',
          newPassword: '',
        },
      }}
      validate={() => setFormErrorMessage(null)}
      validationSchema={ProfileSchema}
      onSubmit={async (values, { setSubmitting }) => {
        const res = await fetch('/api/user', {
          method: 'PATCH',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(values),
        });

        const resJson = await res.json();

        if (resJson.ok) {
          await onSubmitSuccess(res);
          setSubmitting(false);
        } else {
          setFormErrorMessage(resJson.message);
        }
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
                  aria-label="name"
                  variant="flushed"
                  {...field}
                  id="name"
                  type="test"
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
              </FormControl>
            )}
          </Field>
          <Heading as="h2" size="md">
            Change Password
          </Heading>
          <Field name="passwords.oldPassword">
            {({ field, form }) => (
              <FormControl
                mb={8}
                isInvalid={
                  form.errors.passwords && !!form.errors.passwords.oldPassword
                }
              >
                <FormLabel htmlFor="oldPassword">Current Password</FormLabel>
                <Input
                  aria-label="Old Password"
                  variant="flushed"
                  {...field}
                  id="oldPassword"
                  type="password"
                  placeholder=""
                />
                <FormErrorMessage>
                  {form.errors.passwords && form.errors.passwords.oldPassword}
                </FormErrorMessage>
              </FormControl>
            )}
          </Field>
          <Field name="passwords.newPassword">
            {({ field, form }) => (
              <FormControl
                mb={8}
                isInvalid={
                  form.errors.passwords && !!form.errors.passwords.newPassword
                }
              >
                <FormLabel htmlFor="newPassword">New Password</FormLabel>
                <Input
                  aria-label="New Password"
                  variant="flushed"
                  {...field}
                  id="newPassword"
                  type="password"
                  placeholder=""
                />
                <FormErrorMessage>
                  {form.errors.passwords && form.errors.passwords.newPassword}
                </FormErrorMessage>
              </FormControl>
            )}
          </Field>
          <FormControl isInvalid={formErrorMessage}>
            <FormErrorMessage>{formErrorMessage}</FormErrorMessage>
            <Button
              mt={4}
              variantColor="green"
              isDisabled={
                !dirty ||
                Object.entries(errors).length ||
                isSubmitting ||
                isValidating
              }
              isLoading={isSubmitting}
              loadingText="Saving"
              type="submit"
            >
              Save changes
            </Button>
          </FormControl>
        </Form>
      )}
    </Formik>
  );
};

ProfileForm.propTypes = {
  onSubmitSuccess: PropTypes.func,
  user: PropTypes.object.isRequired,
};

export default ProfileForm;

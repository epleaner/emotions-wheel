import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { Formik, Form, Field } from 'formik';

import {
  FormControl,
  FormLabel,
  FormErrorMessage,
  Button,
  Input,
  FormHelperText,
  Icon,
  Stack,
} from '@chakra-ui/core';

import ProfileSchema from '@schemas/formValidations/profileFormValidations';

import Heading from '@components/shared/heading';

const ProfileForm = ({ onSubmitSuccess, user }) => {
  const [formErrorMessage, setFormErrorMessage] = useState(null);
  const [formSuccessMessage, setFormSuccessMessage] = useState(null);

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
      validate={() => {
        setFormSuccessMessage(null);
        setFormErrorMessage(null);
      }}
      validationSchema={ProfileSchema}
      onSubmit={async (values, { setFieldValue, setSubmitting }) => {
        const res = await fetch('/api/user', {
          method: 'PATCH',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(values),
        });

        const resJson = await res.json();

        switch (res.status) {
          case 201:
            await onSubmitSuccess(resJson);

            setFieldValue(
              'passwords',
              {
                oldPassword: '',
                newPassword: '',
              },
              false
            );

            setFormSuccessMessage(resJson.message);
            break;
          default:
            setFormSuccessMessage(null);
            setFormErrorMessage(resJson.message);
            break;
        }

        setSubmitting(false);
      }}>
      {({ isSubmitting, isValidating, errors, dirty }) => (
        <Form>
          <Field name='name'>
            {({ field, form }) => (
              <FormControl
                mb={8}
                isRequired
                isInvalid={form.errors.name && form.touched.name}>
                <Stack direction='row' align='baseline'>
                  <FormLabel fontSize='sm' htmlFor='name'>
                    Name
                  </FormLabel>
                  <Input
                    size='sm'
                    size='sm'
                    _invalid={{ boxShadow: 'none' }}
                    aria-label='name'
                    variant='flushed'
                    {...field}
                    id='name'
                    type='test'
                    placeholder=''
                  />
                </Stack>
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
                <Stack direction='row' align='baseline'>
                  <FormLabel fontSize='sm' htmlFor='email'>
                    Email
                  </FormLabel>
                  <Input
                    size='sm'
                    _invalid={{ boxShadow: 'none' }}
                    aria-label='Email'
                    variant='flushed'
                    {...field}
                    id='email'
                    type='email'
                    placeholder=''
                  />
                </Stack>
                <FormErrorMessage>{form.errors.email}</FormErrorMessage>
              </FormControl>
            )}
          </Field>
          <Heading as='h2' size='sm'>
            Change Password
          </Heading>
          <Field name='passwords.oldPassword'>
            {({ field, form }) => (
              <FormControl
                mb={8}
                isInvalid={
                  form.errors.passwords && !!form.errors.passwords.oldPassword
                }>
                <Stack direction='row' align='baseline'>
                  <Input
                    size='sm'
                    _invalid={{ boxShadow: 'none' }}
                    aria-label='Old Password'
                    variant='flushed'
                    {...field}
                    id='oldPassword'
                    type='password'
                    placeholder='Old password'
                  />
                </Stack>
                <FormErrorMessage>
                  {form.errors.passwords && form.errors.passwords.oldPassword}
                </FormErrorMessage>
              </FormControl>
            )}
          </Field>
          <Field name='passwords.newPassword'>
            {({ field, form }) => (
              <FormControl
                mb={8}
                isInvalid={
                  form.errors.passwords && !!form.errors.passwords.newPassword
                }>
                <Stack direction='row' align='baseline'>
                  <Input
                    size='sm'
                    _invalid={{ boxShadow: 'none' }}
                    aria-label='New Password'
                    variant='flushed'
                    {...field}
                    id='newPassword'
                    type='password'
                    placeholder='New password'
                  />
                </Stack>
                <FormErrorMessage>
                  {form.errors.passwords && form.errors.passwords.newPassword}
                </FormErrorMessage>
              </FormControl>
            )}
          </Field>
          <FormControl isInvalid={formErrorMessage}>
            {formSuccessMessage && (
              <FormHelperText color='green.500'>
                <Icon name='check' mr={2} />
                {formSuccessMessage}
              </FormHelperText>
            )}
            <FormErrorMessage>{formErrorMessage}</FormErrorMessage>
            <Button
              mt={4}
              colorScheme='green'
              isDisabled={
                !dirty ||
                Object.entries(errors).length ||
                isSubmitting ||
                isValidating
              }
              isLoading={isSubmitting}
              loadingText='Saving'
              type='submit'>
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

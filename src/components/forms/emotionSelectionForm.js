import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { Formik, Form, Field } from 'formik';
import useUser from '@hooks/useUser';

import {
  Flex,
  FormControl,
  FormErrorMessage,
  Button,
  Input,
  useColorMode,
} from '@chakra-ui/core';

const EmotionSelectionForm = ({ onSubmitSuccess, selected }) => {
  const [user, , isFetching] = useUser();

  const { colorMode } = useColorMode();

  const [formErrorMessage, setFormErrorMessage] = useState('');
  return (
    <Formik
      initialValues={{ note: '' }}
      validate={() => setFormErrorMessage(null)}
      onSubmit={async (values, { setSubmitting }) => {
        if (!user) console.log('no user');
        else {
          const res = await fetch('/api/emotions', {
            method: 'PUT',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ ...values, emotion: selected.data.name }),
          });

          switch (res.status) {
            case 200:
              await onSubmitSuccess(res);
              setSubmitting(false);
              break;
            default:
              setFormErrorMessage('There was an error, please try again.');
              break;
          }
        }
      }}
    >
      {({ isSubmitting, errors }) => (
        <Form>
          <Field name='note'>
            {({ field }) => (
              <FormControl>
                <Flex w='100%' alignItems='baseline'>
                  <Input
                    aria-label='Note'
                    id='name'
                    type='text'
                    variant='flushed'
                    width={[400, 600]}
                    borderColor={
                      selected
                        ? selected.color
                        : colorMode === 'light'
                        ? 'gray.100'
                        : 'gray.500'
                    }
                    focusBorderColor={selected ? selected.color : 'gray.100'}
                    mr={2}
                    size='xs'
                    {...field}
                    placeholder='Want to talk about it?'
                  />
                  <Button
                    variant='outline'
                    borderColor={selected ? selected.color : 'gray.400'}
                    _hover={{ bg: selected ? selected.color : 'gray.100' }}
                    size='xs'
                    isDisabled={
                      !selected ||
                      Object.entries(errors).length ||
                      isSubmitting ||
                      isFetching
                    }
                    isLoading={isSubmitting}
                    loadingText='Saving'
                    type='submit'
                  >
                    Save
                  </Button>
                </Flex>
              </FormControl>
            )}
          </Field>
          <FormControl isInvalid={formErrorMessage}>
            <FormErrorMessage>{formErrorMessage}</FormErrorMessage>
          </FormControl>
        </Form>
      )}
    </Formik>
  );
};

EmotionSelectionForm.propTypes = {
  onSubmitSuccess: PropTypes.func,
  selected: PropTypes.object,
};

export default EmotionSelectionForm;

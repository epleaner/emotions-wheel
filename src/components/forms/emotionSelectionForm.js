import React, { useState, useCallback } from 'react';
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
  useDisclosure,
} from '@chakra-ui/core';

import LogInSignUpModal from '@components/modals/logInsignUpModal';

const EmotionSelectionForm = ({ onSubmitSuccess, selected }) => {
  const [user, , isFetching] = useUser();

  const { colorMode } = useColorMode();

  const { isOpen, onOpen, onClose } = useDisclosure();

  const [formErrorMessage, setFormErrorMessage] = useState('');
  const [formValues, setFormValues] = useState();

  const handleSubmit = useCallback(async () => {
    const res = await fetch('/api/emotions', {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ ...formValues, emotion: selected.data.name }),
    });

    switch (res.status) {
      case 200:
        onClose();
        await onSubmitSuccess(res);
        break;
      default:
        setFormErrorMessage('There was an error, please try again.');
        break;
    }
  }, [formValues, onClose, onSubmitSuccess, selected]);

  return (
    <>
      <LogInSignUpModal
        {...{ isOpen, onClose, onSubmitSuccess: handleSubmit }}
      />
      <Formik
        initialValues={{ note: '' }}
        validate={() => setFormErrorMessage(null)}
        onSubmit={async (values, { setSubmitting }) => {
          setFormValues(values);

          if (!user) onOpen();
          else {
            await handleSubmit();
            setSubmitting(false);
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
                      width={['100%', 600]}
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
                      size='sm'
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
    </>
  );
};

EmotionSelectionForm.propTypes = {
  onSubmitSuccess: PropTypes.func.isRequired,
  selected: PropTypes.object,
};

export default EmotionSelectionForm;

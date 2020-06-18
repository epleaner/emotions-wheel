import React, { useState, useCallback, useEffect } from 'react';
import PropTypes from 'prop-types';
import { observer } from 'mobx-react-lite';
import { Formik, Form, Field } from 'formik';
import useCurrentUser from '@hooks/useCurrentUser';

import {
  Flex,
  FormControl,
  FormErrorMessage,
  Button,
  Input,
  useColorMode,
  useDisclosure,
} from '@chakra-ui/core';

import LoginSignupModal from '@components/modals/loginSignupModal';
import Fade from '@components/shared/transitions/fade';

const EmotionSelectionForm = observer(({ selected, onSubmitSuccess }) => {
  const userStore = useCurrentUser();

  const { colorMode } = useColorMode();

  const { isOpen, onOpen, onClose } = useDisclosure();

  const [formErrorMessage, setFormErrorMessage] = useState('');
  const [formValues, setFormValues] = useState();
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => setIsMounted(true), []);

  const handleSubmit = useCallback(
    async (dbRes) => {
      let user_id = null;

      const dbJson = await dbRes.json();
      if (dbRes) user_id = dbJson.user_id;

      const res = await fetch('/api/emotions', {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          ...formValues,
          emotion: selected,
          user_id,
        }),
      });

      switch (res.status) {
        case 201: {
          if (userStore.isLoggedIn) {
            const resJson = await res.json();
            userStore.addEmotion(resJson);
          }
          break;
        }
        default:
          setFormErrorMessage('Something went wrong, please try again');
          break;
      }
    },
    [formValues, userStore, selected]
  );

  return (
    <>
      <LoginSignupModal
        {...{ isOpen, onClose, onSubmitSuccess: handleSubmit }}
      />
      <Formik
        initialValues={{ note: '' }}
        validate={(values) => {
          setFormValues(values);
          setFormErrorMessage(null);
        }}
        onSubmit={async (values, { setSubmitting, resetForm }) => {
          setFormValues(values);

          if (!userStore.isLoggedIn) onOpen();
          else {
            await handleSubmit();
            await onSubmitSuccess();
            resetForm();
            setSubmitting(false);
          }
        }}>
        {({ isSubmitting, errors }) => (
          <Form>
            <Field name='note'>
              {({ field }) => (
                <FormControl>
                  <Fade in={isMounted}>
                    <Flex w='100%' alignItems='baseline'>
                      <Input
                        aria-label='Note'
                        id='name'
                        type='text'
                        variant='flushed'
                        width={['100%', '100%', 600]}
                        borderColor={
                          selected
                            ? selected.color
                            : colorMode === 'light'
                            ? 'gray.100'
                            : 'gray.500'
                        }
                        focusBorderColor={
                          selected ? selected.color : 'gray.100'
                        }
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
                          userStore.isLoading
                        }
                        isLoading={isSubmitting}
                        loadingText='Saving'
                        type='submit'>
                        Save
                      </Button>
                    </Flex>
                  </Fade>
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
});

EmotionSelectionForm.propTypes = {
  selected: PropTypes.object,
  onSubmitSuccess: PropTypes.func.isRequired,
};

export default EmotionSelectionForm;

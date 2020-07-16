import React, { useMemo, useState, useCallback, useEffect } from 'react';
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

const EmotionSelectionForm = observer(
  ({ selected, selectedList = [], onSubmitSuccess }) => {
    const userStore = useCurrentUser();

    const { colorMode } = useColorMode();

    const { isOpen, onOpen, onClose } = useDisclosure();

    const [formErrorMessage, setFormErrorMessage] = useState('');
    const [formValues, setFormValues] = useState();
    const [isMounted, setIsMounted] = useState(false);

    useEffect(() => setIsMounted(true), []);

    const handleSubmit = useCallback(async () => {
      try {
        const res = await fetch('/api/emotions', {
          method: 'PUT',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            ...formValues,
            emotion: selected,
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
      } catch (e) {
        setFormErrorMessage('Something went wrong, please try again');
      }
    }, [formValues, userStore, selected]);

    const selectedColor = useMemo(() => {
      if (selected) return selected.color;
      else if (selectedList.length > 0)
        return selectedList[selectedList.length - 1].color;

      return colorMode === 'light' ? 'gray.100' : 'gray.500';
    }, [selected, selectedList, colorMode]);

    return (
      <>
        <LoginSignupModal
          {...{
            isOpen,
            onClose,
            onSubmitSuccess: handleSubmit,
            emotionFormValues: { ...formValues, emotion: selected },
          }}
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
                          borderColor={selectedColor}
                          focusBorderColor={selectedColor}
                          mr={2}
                          size='xs'
                          {...field}
                          placeholder='Want to talk about it?'
                          data-testid='emotion-selection-input'
                        />
                        <Button
                          variant='outline'
                          borderColor={selectedColor}
                          _hover={{
                            bg: selectedColor,
                          }}
                          size='sm'
                          isDisabled={
                            (selectedList.length === 0 && !selected) ||
                            Object.entries(errors).length ||
                            isSubmitting ||
                            userStore.isLoading
                          }
                          isLoading={isSubmitting}
                          loadingText='Saving'
                          type='submit'
                          data-testid='emotion-selection-submit'>
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
  }
);

EmotionSelectionForm.propTypes = {
  selected: PropTypes.object,
  selectedList: PropTypes.array,
  onSubmitSuccess: PropTypes.func.isRequired,
};

export default EmotionSelectionForm;

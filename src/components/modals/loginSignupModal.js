import React, { useState, useCallback } from 'react';
import PropTypes from 'prop-types';

import {
  Modal,
  ModalBody,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalCloseButton,
  Tabs,
  TabList,
  Tab,
  TabPanels,
  TabPanel,
} from '@chakra-ui/core';

import SignupForm from '@components/forms/signupForm';
import LoginForm from '@components/forms/loginForm';
import Heading from '@components/shared/heading';

const LoginSignupModal = ({ isOpen, onClose, onSubmitSuccess }) => {
  const initialRef = React.useRef();
  const [signUpSuccess, setSignUpSuccess] = useState(false);

  const onLoginFormSuccess = useCallback(async () => {
    await onSubmitSuccess();
    onClose();
  }, [onClose, onSubmitSuccess]);

  const onSignupFormSuccess = useCallback(
    async (res) => {
      await onSubmitSuccess(res);
      setSignUpSuccess(true);
    },
    [onSubmitSuccess]
  );

  return (
    <Modal
      initialFocusRef={initialRef}
      isOpen={isOpen}
      onClose={onClose}
      isCentered>
      <ModalOverlay />
      <ModalContent>
        <Tabs align='center' variant='soft-rounded' size='sm'>
          <ModalHeader>
            {!signUpSuccess && (
              <>
                <Heading size='sm' mt={5} mx={5}>
                  Hey, you'll just need to log in or sign up first
                </Heading>
                <TabList>
                  <Tab
                    color='blue.400'
                    _selected={{ color: 'white', bg: 'blue.300' }}>
                    Log In
                  </Tab>
                  <Tab
                    color='primary.400'
                    _selected={{ color: 'white', bg: 'primary.300' }}>
                    Sign Up
                  </Tab>
                </TabList>
              </>
            )}
          </ModalHeader>
          <ModalCloseButton />
          <ModalBody pb={6}>
            <TabPanels>
              <TabPanel>
                <LoginForm
                  cancellable
                  onCancel={onClose}
                  onSubmitSuccess={onLoginFormSuccess}
                  redirectTo='/profile'
                />
              </TabPanel>
              <TabPanel>
                <SignupForm
                  cancellable
                  onCancel={onClose}
                  onSubmitSuccess={onSignupFormSuccess}
                  modal
                />
              </TabPanel>
            </TabPanels>
          </ModalBody>
        </Tabs>
      </ModalContent>
    </Modal>
  );
};

LoginSignupModal.propTypes = {
  onSubmitSuccess: PropTypes.func.isRequired,
  isOpen: PropTypes.bool.isRequired,
  onClose: PropTypes.func.isRequired,
};

export default LoginSignupModal;

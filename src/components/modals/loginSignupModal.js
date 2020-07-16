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

const LoginSignupModal = ({
  isOpen,
  onClose,
  onSubmitSuccess,
  emotionFormValues,
}) => {
  const initialRef = React.useRef();
  const [signUpSuccess, setSignUpSuccess] = useState(false);

  const onLoginFormSuccess = useCallback(async () => {
    await onSubmitSuccess();
    onClose();
  }, [onClose, onSubmitSuccess]);

  const onSignupFormSuccess = useCallback(() => {
    setSignUpSuccess(true);
  }, []);

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
                    log in
                  </Tab>
                  <Tab
                    color='primary.400'
                    _selected={{ color: 'white', bg: 'primary.300' }}>
                    sign up
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
                  postData={emotionFormValues}
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
  emotionFormValues: PropTypes.shape({
    note: PropTypes.string,
    emotions: PropTypes.array.isRequired,
  }).isRequired,
};

export default LoginSignupModal;

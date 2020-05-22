import React from 'react';
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

import SignUpForm from '@components/forms/signUpForm';
import LoginForm from '@components/forms/loginForm';

const LoginSignUpModal = ({ isOpen, onClose, onSubmitSuccess }) => {
  const initialRef = React.useRef();

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
          </ModalHeader>
          <ModalCloseButton />
          <ModalBody pb={6}>
            <TabPanels>
              <TabPanel>
                <LoginForm
                  cancellable
                  onCancel={onClose}
                  onSubmitSuccess={onSubmitSuccess}
                  redirectTo='/profile'
                />
              </TabPanel>
              <TabPanel>
                <SignUpForm
                  cancellable
                  onCancel={onClose}
                  onSubmitSuccess={onSubmitSuccess}
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

LoginSignUpModal.propTypes = {
  onSubmitSuccess: PropTypes.func.isRequired,
  isOpen: PropTypes.bool.isRequired,
  onClose: PropTypes.func.isRequired,
};

export default LoginSignUpModal;

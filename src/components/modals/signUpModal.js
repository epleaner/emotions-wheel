import React, { Profiler } from 'react';
import PropTypes from 'prop-types';

import {
  Modal,
  ModalBody,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalCloseButton,
} from '@chakra-ui/core';

import SignUpForm from '@components/forms/signupForm';

const SignUpModal = ({ isOpen, onClose, onSubmitSuccess }) => {
  const initialRef = React.useRef();

  return (
    <Modal
      initialFocusRef={initialRef}
      isOpen={isOpen}
      onClose={onClose}
      isCentered
    >
      <ModalOverlay />
      <ModalContent>
        <ModalHeader>Create an account</ModalHeader>
        <ModalCloseButton />
        <ModalBody pb={6}>
          <SignUpForm
            cancellable
            onCancel={onClose}
            onSubmitSuccess={onSubmitSuccess}
          />
        </ModalBody>
      </ModalContent>
    </Modal>
  );
};

SignUpModal.propTypes = {
  onSubmitSuccess: PropTypes.func.isRequired,
  isOpen: PropTypes.bool.isRequired,
  onClose: PropTypes.func.isRequired,
};

export default SignUpModal;

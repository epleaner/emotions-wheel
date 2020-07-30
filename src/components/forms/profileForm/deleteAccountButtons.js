import React, { useState, useEffect } from 'react';
import {
  Box,
  Button,
  FormControl,
  FormHelperText,
  Input,
} from '@chakra-ui/core';

const DeleteAccountButtons = ({
  isDisabled,
  isLoading,
  handleDelete,
  confirmationName,
}) => {
  const [showDeleteConfirmation, setShowDeleteConfirmation] = useState(false);
  const [nameConfirmed, setNameConfirmed] = useState(false);
  const [name, setName] = useState('');

  useEffect(() => setNameConfirmed(name === confirmationName), [name]);

  const handleNameChange = (e) => {
    e.preventDefault();
    setName(e.target.value);
  };

  return (
    <Box>
      {showDeleteConfirmation ? (
        <>
          <FormControl>
            <FormHelperText id='name-helper-text'>
              Please enter your name ({confirmationName}) to confirm you want to
              delete your account.
            </FormHelperText>
            <Input
              type='text'
              size='sm'
              my={2}
              value={name}
              placeholder=''
              aria-describedby='name-helper-text'
              onChange={handleNameChange}
            />
          </FormControl>
          <Button
            size='xs'
            mr={2}
            isDisabled={isDisabled}
            onClick={() => setShowDeleteConfirmation(false)}>
            Never mind
          </Button>
          <Button
            size='xs'
            colorScheme='red'
            onClick={handleDelete}
            isDisabled={isDisabled || !nameConfirmed}
            isLoading={isLoading}
            loadingText='Deleting'>
            Yes, really delete
          </Button>
        </>
      ) : (
        <Button
          size='xs'
          isDisabled={isDisabled}
          onClick={() => setShowDeleteConfirmation(true)}>
          Delete account
        </Button>
      )}
    </Box>
  );
};

export default DeleteAccountButtons;

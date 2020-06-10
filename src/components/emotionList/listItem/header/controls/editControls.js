import React, { useState, useCallback } from 'react';
import PropTypes from 'prop-types';
import { action } from 'mobx';
import { observer } from 'mobx-react';

import { IconButton, Tooltip, Text, Button } from '@chakra-ui/core';

const EditControls = observer(({ store }) => {
  const [errorMessage, setErrorMessage] = useState(null);
  const [isSaving, setIsSaving] = useState(false);
  const [showConfirmation, setShowConfirmation] = useState(false);

  const toggleEditing = action(() => void (store.isEditing = !store.isEditing));

  const handleToggleButtonClick = useCallback(() => {
    toggleEditing();

    setShowConfirmation((prev) => !prev);
  }, [toggleEditing]);

  const handleConfirmButtonClick = useCallback(() => {
    setIsSaving(true);
  }, []);

  if (errorMessage) {
    return (
      <Text fontSize='xs' color='red'>
        {errorMessage}
      </Text>
    );
  }

  if (isSaving) {
    return <Button isLoading loadingText='Saving' variant='ghost' size='sm' />;
  }

  if (showConfirmation) {
    return (
      <>
        <Tooltip
          showDelay={200}
          placement='top'
          label='Save Edit'
          aria-label='Save edit'>
          <IconButton
            aria-label='Save edit'
            icon='check'
            variantColor='green'
            variant='ghost'
            size='sm'
            isRound
            onClick={handleConfirmButtonClick}
          />
        </Tooltip>

        <Tooltip
          showDelay={200}
          placement='top'
          label='Cancel Edit'
          aria-label='Cancel Edit'>
          <IconButton
            aria-label='Cancel Edit'
            icon='close'
            variant='ghost'
            isRound
            size='sm'
            onClick={handleToggleButtonClick}
          />
        </Tooltip>
      </>
    );
  }

  return (
    <Tooltip
      showDelay={200}
      placement='top'
      label='Edit this entry'
      aria-label='Edit this entry'>
      <IconButton
        aria-label='Edit this entry'
        variant='ghost'
        icon='edit'
        size='sm'
        isRound
        onClick={handleToggleButtonClick}
      />
    </Tooltip>
  );
});

EditControls.propTypes = {
  store: PropTypes.object.isRequired,
};

export default EditControls;

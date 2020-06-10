import React, { useState, useCallback } from 'react';
import PropTypes from 'prop-types';
import { action } from 'mobx';
import { observer } from 'mobx-react';

import { IconButton, Tooltip, Text, Button } from '@chakra-ui/core';

const EditControls = observer(({ store }) => {
  const [isSaving, setIsSaving] = useState(false);
  const [errorMessage, setErrorMessage] = useState(null);
  const [showConfirmation, setShowConfirmation] = useState(false);

  const startEditing = action(() => void (store.editing = true));
  const stopEditing = action(() => void (store.editing = false));

  const handleStartButtonClick = useCallback(() => {
    startEditing();

    setShowConfirmation(true);
  }, [startEditing]);

  const handleCancelButtonClick = useCallback(() => {
    stopEditing();

    setShowConfirmation(false);
  }, [stopEditing]);

  const handleConfirmButtonClick = useCallback(async () => {
    setIsSaving(true);
    const res = await fetch('/api/emotions', {
      method: 'PATCH',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        date: store.emotion.date,
        data: store.emotion.data,
        newNote: store.editBody,
      }),
    });

    if (res.status >= 400)
      setErrorMessage('Something went wrong, please try again');
    else {
      setIsSaving(false);
      setShowConfirmation(false);
      stopEditing();
    }
  }, [stopEditing, store.emotion, store.editBody]);

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
            onClick={handleCancelButtonClick}
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
        onClick={handleStartButtonClick}
      />
    </Tooltip>
  );
});

EditControls.propTypes = {
  store: PropTypes.object.isRequired,
};

export default EditControls;

import React, { useCallback, useState } from 'react';
import PropTypes from 'prop-types';

import { Text, IconButton, Button, Tooltip } from '@chakra-ui/core';

const DeleteControls = ({ data, date, onDeleteSuccess }) => {
  const [deleteErrorMessage, setDeleteErrorMessage] = useState(null);
  const [isDeleting, setIsDeleting] = useState(false);
  const [showDeleteConfirmation, setShowDeleteConfirmation] = useState(false);

  const handleDeleteButtonClick = useCallback(async () => {
    setIsDeleting(true);

    const res = await fetch('/api/emotions', {
      method: 'DELETE',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        data,
        date,
      }),
    });

    if (res.status >= 400)
      setDeleteErrorMessage('Something went wrong, please try again');
    else {
      setIsDeleting(false);
      onDeleteSuccess();
    }
  }, [data, date, onDeleteSuccess]);

  if (deleteErrorMessage) {
    return (
      <Text fontSize='xs' color='red'>
        {deleteErrorMessage}
      </Text>
    );
  }

  if (isDeleting) {
    return (
      <Button
        isLoading
        loadingText='Deleting'
        variantColor='red'
        variant='ghost'
        size='sm'
      />
    );
  }

  if (showDeleteConfirmation) {
    return (
      <>
        <Tooltip
          showDelay={200}
          placement='top'
          label='Really Delete'
          aria-label='Really Delete'>
          <IconButton
            aria-label='Really Delete'
            icon='check'
            variantColor='red'
            variant='ghost'
            size='sm'
            isRound
            onClick={handleDeleteButtonClick}
          />
        </Tooltip>

        <Tooltip
          showDelay={200}
          placement='top'
          label='Cancel Deleting'
          aria-label='Cancel Deleting'>
          <IconButton
            aria-label='Cancel Deleting'
            icon='close'
            variant='ghost'
            isRound
            size='sm'
            onClick={() => setShowDeleteConfirmation(false)}
          />
        </Tooltip>
      </>
    );
  }

  return (
    <Tooltip
      showDelay={200}
      placement='top'
      label='Delete this entry'
      aria-label='Delete this entry'>
      <IconButton
        aria-label='Delete this entry'
        variant='ghost'
        icon='delete'
        size='sm'
        isRound
        onClick={() => setShowDeleteConfirmation(true)}
      />
    </Tooltip>
  );
};

DeleteControls.propTypes = {
  date: PropTypes.string.isRequired,
  data: PropTypes.array.isRequired,
  onDeleteSuccess: PropTypes.func.isRequired,
};

export default DeleteControls;

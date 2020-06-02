import React, { useCallback, useState } from 'react';
import PropTypes from 'prop-types';
import { Text, IconButton, Stack, Box, Button, Tooltip } from '@chakra-ui/core';
import EmotionBreadcrumb from '@components/emotionSelector/selectedBreadcrumb';

const Header = ({ emotion, onDeleteSuccess }) => {
  const { date, data } = emotion;
  const [showDeleteConfirmation, setShowDeleteConfirmation] = useState(false);
  const [isDeleting, setIsDeleting] = useState(false);
  const [deleteErrorMessage, setDeleteErrorMessage] = useState(null);

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
  }, [setIsDeleting, setDeleteErrorMessage, onDeleteSuccess, data, date]);

  return (
    <Stack isInline justify='space-between' align='center'>
      <Box>
        <Text fontSize='xs' color='grey'>
          {new Date(date).toLocaleDateString('en-US', {
            weekday: 'long',
            month: 'numeric',
            year: 'numeric',
            day: 'numeric',
          })}
        </Text>

        <EmotionBreadcrumb selected={emotion} />
      </Box>

      <Box>
        {deleteErrorMessage ? (
          <Text fontSize='xs' color='red'>
            {deleteErrorMessage}
          </Text>
        ) : isDeleting ? (
          <Button
            isLoading
            loadingText='Deleting'
            variantColor='red'
            variant='ghost'
            size='sm'
          />
        ) : showDeleteConfirmation ? (
          <>
            <Tooltip
              placement='top'
              label='Really delete'
              aria-label='Really delete'>
              <IconButton
                aria-label='Really delete'
                icon='check'
                variantColor='red'
                variant='ghost'
                size='sm'
                isRound
                onClick={handleDeleteButtonClick}
              />
            </Tooltip>

            <Tooltip placement='top' label='Cancel' aria-label='Cancel'>
              <IconButton
                aria-label='Cancel'
                icon='close'
                variant='ghost'
                isRound
                size='sm'
                onClick={() => setShowDeleteConfirmation(false)}
              />
            </Tooltip>
          </>
        ) : (
          <>
            <Tooltip
              placement='top'
              label='Edit this entry'
              aria-label='Edit this entry'>
              <IconButton
                aria-label='Edit this entry'
                variant='ghost'
                icon='edit'
                size='sm'
                isRound
              />
            </Tooltip>
            <Tooltip
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
          </>
        )}
      </Box>
    </Stack>
  );
};

Header.propTypes = {
  emotion: PropTypes.shape({
    date: PropTypes.string.isRequired,
    data: PropTypes.object.isRequired,
  }).isRequired,
  onDeleteSuccess: PropTypes.func.isRequired,
};

export default Header;

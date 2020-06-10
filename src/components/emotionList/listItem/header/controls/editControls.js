import React from 'react';
import PropTypes from 'prop-types';
import { action } from 'mobx';
import { observer } from 'mobx-react';

import { IconButton, Tooltip } from '@chakra-ui/core';

const EditControls = observer(({ store }) => {
  const handleEditButtonClick = action(
    () => void (store.isEditing = !store.isEditing)
  );

  return (
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
        onClick={handleEditButtonClick}
      />
    </Tooltip>
  );
});

EditControls.propTypes = {
  store: PropTypes.object.isRequired,
};

export default EditControls;

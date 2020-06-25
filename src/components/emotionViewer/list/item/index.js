import React, { useMemo } from 'react';
import PropTypes from 'prop-types';
import { observable } from 'mobx';
import { observer } from 'mobx-react-lite';

import { Box, Stack } from '@chakra-ui/core';
import Header from '@components/emotionViewer/list/item/header';
import Body from '@components/emotionViewer/list/item/body';

const EmotionListItem = ({
  emotion,
  onDeleteSuccess,
  onEditSuccess,
  ...otherProps
}) => {
  const store = useMemo(
    () =>
      observable({
        _id: emotion._id,
        note: emotion.note,
        editing: false,
        editBody: emotion.note,
      }),
    [emotion._id, emotion.note]
  );

  return (
    <Box pt={4} pb={0} my={4} overflow='hidden'>
      <Stack as='li' {...otherProps}>
        <Header {...{ store, emotion, onDeleteSuccess, onEditSuccess }} />
        <Body {...{ store, emotion }} />
      </Stack>
    </Box>
  );
};

EmotionListItem.propTypes = {
  emotion: PropTypes.shape({
    _id: PropTypes.string.isRequired,
    note: PropTypes.string,
    color: PropTypes.string.isRequired,
    date: PropTypes.string.isRequired,
    data: PropTypes.array.isRequired,
  }).isRequired,
  onDeleteSuccess: PropTypes.func.isRequired,
  onEditSuccess: PropTypes.func.isRequired,
};

export default observer(EmotionListItem);

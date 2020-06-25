import React, { useMemo, useCallback } from 'react';
import PropTypes from 'prop-types';
import { observable } from 'mobx';
import { observer } from 'mobx-react-lite';

import useCurrentUser from '@hooks/useCurrentUser';

import { Box, Stack } from '@chakra-ui/core';
import Header from '@components/emotionViewer/list/item/header';
import Body from '@components/emotionViewer/list/item/body';

const EmotionListItem = ({ emotion, ...otherProps }) => {
  const userStore = useCurrentUser();

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

  const onDeleteSuccess = useCallback(
    () => userStore.deleteEmotion(emotion._id),
    [userStore, emotion._id]
  );

  const onEditSuccess = useCallback(
    (editedNote) => userStore.updateEmotionNote(emotion._id, editedNote),
    [userStore, emotion._id]
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
};

export default observer(EmotionListItem);

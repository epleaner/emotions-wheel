import React, { useMemo, useCallback } from 'react';
import PropTypes from 'prop-types';
import { observable } from 'mobx';
import { observer } from 'mobx-react-lite';

import useCurrentUser from '@hooks/useCurrentUser';

import { Box, Stack } from '@chakra-ui/core';

import Header from '@components/entryViewer/list/item/header';
import Body from '@components/entryViewer/list/item/body';

const EntryListItem = ({ entry, ...otherProps }) => {
  const userStore = useCurrentUser();

  const store = useMemo(
    () =>
      observable({
        _id: entry._id,
        note: entry.note,
        editing: false,
        editBody: entry.note,
      }),
    [entry._id, entry.note]
  );

  const onDeleteSuccess = useCallback(() => userStore.deleteEntry(entry._id), [
    userStore,
    entry._id,
  ]);

  const onEditSuccess = useCallback(
    (editedNote) => userStore.updateEntryNote(entry._id, editedNote),
    [userStore, entry._id]
  );

  return (
    <Box overflow='hidden' {...otherProps}>
      <Stack as='li'>
        <Header {...{ store, entry, onDeleteSuccess, onEditSuccess }} />
        <Body {...{ store, entry }} />
      </Stack>
    </Box>
  );
};

EntryListItem.propTypes = {
  entry: PropTypes.shape({
    _id: PropTypes.string.isRequired,
    note: PropTypes.string,
    color: PropTypes.string.isRequired,
    date: PropTypes.oneOfType([PropTypes.string, PropTypes.object]).isRequired,
    data: PropTypes.array.isRequired,
  }).isRequired,
};

export default observer(EntryListItem);

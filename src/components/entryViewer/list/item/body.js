import React, { useCallback, useEffect } from 'react';
import PropTypes from 'prop-types';

import { action } from 'mobx';
import { observer } from 'mobx-react-lite';

import { Text, Divider, Textarea, Box } from '@chakra-ui/core';

const Body = ({ entry: { note, emotions }, store }) => {
  const setEditBody = useCallback(
    (edit) => action(() => void (store.editBody = edit))(),
    [store]
  );

  useEffect(() => {
    if (!store.editing) {
      setEditBody(note);
    }
  }, [note, setEditBody, store.editing]);

  return (
    <>
      <Box mt={3}>
        {store.editing ? (
          <Textarea
            value={store.editBody}
            onChange={(e) => setEditBody(e.target.value)}
          />
        ) : (
          <Text>{store.note}</Text>
        )}
      </Box>
    </>
  );
};

Body.propTypes = {
  store: PropTypes.object.isRequired,
  entry: PropTypes.shape({
    note: PropTypes.string,
    emotions: PropTypes.array.isRequired,
  }).isRequired,
};

export default observer(Body);

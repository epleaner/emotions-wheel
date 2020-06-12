import React, { useCallback, useEffect } from 'react';
import PropTypes from 'prop-types';
import { Text, Divider, Textarea, Box } from '@chakra-ui/core';
import { action } from 'mobx';
import { observer } from 'mobx-react-lite';

const Body = observer(({ emotion: { note, color }, store }) => {
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
      {note && <Divider borderColor={color} />}
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
});

Body.propTypes = {
  store: PropTypes.object.isRequired,
  emotion: PropTypes.shape({
    note: PropTypes.string,
    color: PropTypes.string,
  }).isRequired,
};

export default Body;

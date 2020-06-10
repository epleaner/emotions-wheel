import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { Text, Divider, Textarea, Box } from '@chakra-ui/core';
import { observer } from 'mobx-react';

const Body = observer(({ emotion: { note, color }, store: { isEditing } }) => {
  const [noteEdits, setNoteEdits] = useState(note);
  return (
    <>
      {note && <Divider borderColor={color} />}
      <Box mt={3}>
        {isEditing ? (
          <Textarea
            value={noteEdits}
            onChange={(e) => setNoteEdits(e.target.value)}
          />
        ) : (
          <Text>{noteEdits}</Text>
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

import React from 'react';
import PropTypes from 'prop-types';
import { Box } from '@chakra-ui/core';

import Details from '@components/entryViewer/list/item';

const EmotionBeeswarmDetails = ({ entry }) => {
  return (
    <Box mt={10} height={[150, 50]}>
      {entry && <Details entry={entry} />}
    </Box>
  );
};

EmotionBeeswarmDetails.propTypes = {
  entry: PropTypes.shape({
    note: PropTypes.string,
  }),
};

export default EmotionBeeswarmDetails;

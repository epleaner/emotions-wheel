import React from 'react';
import PropTypes from 'prop-types';
import { Box } from '@chakra-ui/core';

import Details from '@components/entryViewer/list/item';

const EmotionBeeswarmDetails = ({ emotion }) => {
  return (
    <Box mt={10} height={50}>
      {emotion && <Details emotion={emotion} />}
    </Box>
  );
};

EmotionBeeswarmDetails.propTypes = {
  emotion: PropTypes.shape({
    note: PropTypes.string,
  }),
};

export default EmotionBeeswarmDetails;

import React from 'react';
import PropTypes from 'prop-types';
import { Box } from '@chakra-ui/core';

const EmotionBeeswarmDetails = ({ emotion }) => {
  return <Box height={50}>{emotion && emotion.note}</Box>;
};

EmotionBeeswarmDetails.propTypes = {
  emotions: PropTypes.object,
};

export default EmotionBeeswarmDetails;

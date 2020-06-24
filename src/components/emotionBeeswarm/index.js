import React from 'react';
import PropTypes from 'prop-types';
import Beeswarm from '@components/charts/beeswarm';

const EmotionBeeswarm = ({ emotions }) => {
  return <Beeswarm data={emotions} />;
};

EmotionBeeswarm.propTypes = {
  emotions: PropTypes.array,
};

export default EmotionBeeswarm;

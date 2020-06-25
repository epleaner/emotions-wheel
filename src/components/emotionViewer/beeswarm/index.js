import React, { useState, useCallback } from 'react';
import PropTypes from 'prop-types';
import Beeswarm from '@components/charts/beeswarm';
import Details from '@components/emotionViewer/beeswarm/details';

const EmotionBeeswarm = ({ emotions }) => {
  const [hoveredNode, setHoveredNode] = useState();

  const showDetails = useCallback((d) => setHoveredNode(d), []);

  return (
    <>
      <Details emotion={hoveredNode} />
      <Beeswarm data={emotions} showDetails={showDetails} />
    </>
  );
};

EmotionBeeswarm.propTypes = {
  emotions: PropTypes.array,
};

export default EmotionBeeswarm;

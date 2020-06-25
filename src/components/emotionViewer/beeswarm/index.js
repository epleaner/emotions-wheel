import React, { useState } from 'react';
import PropTypes from 'prop-types';
import Beeswarm from '@components/charts/beeswarm';
import Details from '@components/emotionViewer/beeswarm/details';

const EmotionBeeswarm = ({ emotions }) => {
  const [hoveredNode, setHoveredNode] = useState();

  return (
    <>
      <Details emotion={hoveredNode} />
      <Beeswarm data={emotions} onHover={setHoveredNode} />
    </>
  );
};

EmotionBeeswarm.propTypes = {
  emotions: PropTypes.array,
};

export default EmotionBeeswarm;

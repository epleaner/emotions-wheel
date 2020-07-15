import React, { useState, useCallback, useEffect } from 'react';
import PropTypes from 'prop-types';
import Beeswarm from '@components/charts/beeswarm';
import Details from '@components/emotionViewer/beeswarm/details';

const EmotionBeeswarm = ({ emotions }) => {
  const [hoveredNode, setHoveredNode] = useState();
  const [detailsNode, setDetailsNode] = useState();

  const showDetails = useCallback((d) => setHoveredNode(d), []);

  useEffect(() => {
    setDetailsNode(
      hoveredNode
        ? emotions.filter(({ _id }) => _id === hoveredNode._id)[0]
        : null
    );
  }, [hoveredNode, emotions]);

  return (
    <>
      <Details emotion={detailsNode} />
      <Beeswarm data={emotions} showDetails={showDetails} />
    </>
  );
};

EmotionBeeswarm.propTypes = {
  emotions: PropTypes.array,
};

export default EmotionBeeswarm;

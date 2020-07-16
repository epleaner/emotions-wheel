import React, { useState, useCallback, useEffect } from 'react';
import PropTypes from 'prop-types';
import Beeswarm from '@components/charts/beeswarm';
import Details from '@components/entryViewer/beeswarm/details';

const EmotionBeeswarm = ({ entries }) => {
  const [hoveredNode, setHoveredNode] = useState();
  const [detailsNode, setDetailsNode] = useState();

  const showDetails = useCallback((d) => setHoveredNode(d), []);

  useEffect(() => {
    setDetailsNode(
      hoveredNode
        ? entries.filter(({ _id }) => _id === hoveredNode._id)[0]
        : null
    );
  }, [hoveredNode, entries]);

  return (
    <>
      <Details entry={detailsNode} />
      <Beeswarm data={entries} showDetails={showDetails} />
    </>
  );
};

EmotionBeeswarm.propTypes = {
  entries: PropTypes.array.isRequired,
};

export default EmotionBeeswarm;

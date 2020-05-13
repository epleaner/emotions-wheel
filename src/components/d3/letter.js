import React, { useState, useRef, useEffect } from 'react';
import PropTypes from 'prop-types';
import { Transition } from 'react-transition-group';

import { select } from 'd3-selection';
import { transition } from 'd3-transition';
import { easeCubicInOut } from 'd3-ease';

const Letter = ({ letter, index, in: transitionIn }) => {
  const nodeRef = useRef(null);
  const [isExited, setIsExited] = useState(true);
  const [currentIndex, setCurrentIndex] = useState(index);
  const [x, setX] = useState(index * 16);
  const [y, setY] = useState(-60);
  const [fillOpacity, setFillOpacity] = useState(1e-6);

  useEffect(() => {
    const newX = index * 16;

    if (isExited && transitionIn) {
      //entering for the first time, place it and keep track of where it is
      setX(newX);
      setCurrentIndex(index);
      setIsExited(false);
    } else if (currentIndex !== index) {
      // otherwise, it is moving to new location
      const d3Node = select(nodeRef.current);
      d3Node
        .transition(transition().duration(1000).ease(easeCubicInOut))
        .attr('x', newX)
        .on('end', () => {
          setX(newX);
          setCurrentIndex(index);
        });
    }
  }, [letter, index, currentIndex, transitionIn, isExited]);

  const onEnter = () => {
    const d3Node = select(nodeRef.current);

    d3Node
      .transition(transition().duration(1000).ease(easeCubicInOut))
      .attr('y', 0)
      .style('fill-opacity', 1)
      .on('end', () => {
        setY(0);
        setFillOpacity(1);
      });
  };

  const onExit = () => {
    const d3Node = select(nodeRef.current);

    d3Node
      .transition(transition().duration(1000).ease(easeCubicInOut))
      .attr('y', 60)
      .style('fill-opacity', 1e-6)
      .on('end', () => {
        setX(index * 16);
        setY(-60);
        setFillOpacity(1e-6);
        setIsExited(true);
      });
  };

  return (
    <Transition
      timeout={1000}
      in={transitionIn}
      unmountOnExit={true}
      onEnter={onEnter}
      onExit={onExit}
      nodeRef={nodeRef}
      component={null}
    >
      <text ref={nodeRef} x={x} y={y} style={{ fillOpacity: fillOpacity }}>
        {letter}
      </text>
    </Transition>
  );
};

Letter.propTypes = {
  letter: PropTypes.string.isRequired,
  index: PropTypes.number.isRequired,
  in: PropTypes.bool.isRequired,
};

export default Letter;

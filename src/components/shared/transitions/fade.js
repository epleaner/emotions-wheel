import React from 'react';
import PropTypes from 'prop-types';
import { Transition } from 'react-transition-group';

const transitionStyles = {
  entering: { opacity: 1 },
  entered: { opacity: 1 },
  exiting: { opacity: 0 },
  exited: { opacity: 0 },
};

const Fade = ({ in: inProp, duration = 500, children }) => {
  const defaultStyle = {
    transition: `opacity ${duration}ms ease-in-out`,
    opacity: 0,
  };

  return (
    <Transition in={inProp} timeout={duration}>
      {(state) => (
        <div
          style={{
            ...defaultStyle,
            ...transitionStyles[state],
          }}>
          {children}
        </div>
      )}
    </Transition>
  );
};

Fade.propTypes = {
  in: PropTypes.bool.isRequired,
  duration: PropTypes.number,
  children: PropTypes.node.isRequired,
};
export default Fade;

import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import { TransitionGroup } from 'react-transition-group';

import { interval } from 'd3-timer';
import { shuffle } from 'd3-array';

import Letter from '@components/d3/letter';

const Alphabet = ({ x, y }) => {
  const sentences = [
    "i'm just happy to be here",
    'how beautiful it is to be anything at all',
    'one breath at a time',
    'gentle, gentle, gentle...',
  ].map((sentence) => {
    const letterIndex = {};

    return sentence.split('').map((l) => {
      letterIndex[l] === undefined ? (letterIndex[l] = 0) : letterIndex[l]++;
      return { letter: l, index: letterIndex[l] };
    });
  });

  const [alphabet, setAlphabet] = useState([]);

  useEffect(() => {
    const intervalId = interval(() => setAlphabet(shuffle(sentences)[0]), 3000);

    return () => intervalId.stop();
  }, [sentences]);

  return (
    <svg width='100%'>
      <g transform={`translate(${x}, ${y})`}>
        <TransitionGroup component='g' enter={true} exit={true}>
          {alphabet.map(({ letter, index }, i) => (
            <Letter key={`${letter}-${index}`} letter={letter} index={i} />
          ))}
        </TransitionGroup>
      </g>
    </svg>
  );
};

Alphabet.propTypes = {
  x: PropTypes.number.isRequired,
  y: PropTypes.number.isRequired,
};

export default Alphabet;

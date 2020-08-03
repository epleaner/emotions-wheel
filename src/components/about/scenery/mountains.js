import React from 'react';

import MountainSVGs from '@static/icons/mountains';

import { Box } from '@chakra-ui/core';
import Section from '@components/shared/section';

const Mountains = () => (
  <Section display='grid'>
    {MountainSVGs.map((SVG, ndx) => (
      <Box key={ndx} gridArea='1 / 1 / 2 / 2'>
        <SVG />
      </Box>
    ))}
  </Section>
);
export default Mountains;

import React from 'react';

import WaveSVGs from '@static/icons/waves';

import { Box } from '@chakra-ui/core';
import Section from '@components/shared/section';

const Mountains = () => (
  <Section display='grid'>
    {WaveSVGs.map((SVG, ndx) => (
      <Box key={ndx} gridArea='1 / 1 / 2 / 2'>
        <SVG />
      </Box>
    ))}
  </Section>
);
export default Mountains;

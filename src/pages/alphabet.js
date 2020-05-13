import React from 'react';
import { Grid } from '@chakra-ui/core';

import Alphabet from '@components/d3/alphabet';

const AlphabetPage = () => (
  <Grid>
    <Alphabet x={50} y={50} />
  </Grid>
);

export default AlphabetPage;

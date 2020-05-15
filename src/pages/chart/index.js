import React from 'react';
import { Grid, Box } from '@chakra-ui/core';

import Sunburst from '@components/charts/sunburst';

const Chart = () => (
  <Grid templateColumns='repeat(5, 1fr)' gap={6}>
    <Box w='100%'>
      <Sunburst />
    </Box>
  </Grid>
);

export default Chart;

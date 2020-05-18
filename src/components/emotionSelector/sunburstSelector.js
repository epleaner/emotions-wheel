import React from 'react';
import { Grid, Box } from '@chakra-ui/core';

import Sunburst from '@components/charts/sunburst';

const SunburtSelector = () => {
  return (
    <Grid>
      <Box w='100%'>
        <Sunburst width={600} />
      </Box>
    </Grid>
  );
};

export default SunburtSelector;

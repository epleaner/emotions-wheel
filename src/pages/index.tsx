import React from 'react';
import { Grid, Box } from '@chakra-ui/core';

import Sunburst from '@components/charts/sunburst';

const Index = () => {
  return (
    <>
      <Box mx={10} mt={2}>
        Hey, how are you doing?
      </Box>
      <Grid templateColumns='repeat(5, 1fr)' gap={6}>
        <Box w='100%'>
          <Sunburst width={600} />
        </Box>
      </Grid>
    </>
  );
};

export default Index;

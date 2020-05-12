import React, { useState } from 'react';
import * as d3 from 'd3';
import { Grid, Box } from '@chakra-ui/core';

import Pie from '@components/charts/pie';
import Donut from '@components/charts/donut';
import Sunburst from '@components/charts/sunburst';

const Chart = () => {
  const generateData = (value, length = 5) =>
    d3.range(length).map((item) => ({
      value: Math.random() * 100,
      label: `label: #${item}`,
    }));

  const [data, setData] = useState(generateData());

  const changeData = () => void setData(generateData());

  return (
    <>
      <Grid templateColumns='repeat(5, 1fr)' gap={6}>
        <Box w='100%'>
          <Sunburst width={800} height={800} />
        </Box>
        {false && (
          <Box w='100%'>
            <Box w='100%'>
              <button onClick={changeData}>New Data</button>
            </Box>
            <Box w='50%'>
              {
                <Pie
                  data={data}
                  width={200}
                  height={200}
                  innerRadius={60}
                  outerRadius={100}
                />
              }
            </Box>
            <Box w='50%'>
              <Donut />
            </Box>
          </Box>
        )}
      </Grid>
    </>
  );
};

export default Chart;

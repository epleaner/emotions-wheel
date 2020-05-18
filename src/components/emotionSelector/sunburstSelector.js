import React, { useState } from 'react';
import { Flex, Box } from '@chakra-ui/core';

import Sunburst from '@components/charts/sunburst';
import SelectedBreadcrumb from '@components/emotionSelector/selectedBreadcrumb';
import SelectionForm from '@components/emotionSelector/selectionForm';

const SunburtSelector = () => {
  const [selected, setSelected] = useState();

  return (
    <>
      <Box w='100%'>
        <Sunburst width={600} onSelect={setSelected} />
      </Box>
      <Flex w='100%' h={30} justifyContent='center' alignItems='baseline'>
        {selected && <SelectedBreadcrumb {...{ selected }} />}
      </Flex>
      <SelectionForm {...{ selected }} />
    </>
  );
};

export default SunburtSelector;

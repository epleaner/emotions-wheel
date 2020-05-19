import React, { useState } from 'react';
import { Flex, Box } from '@chakra-ui/core';
import { useRouter } from 'next/router';

import Sunburst from '@components/charts/sunburst';
import SelectedBreadcrumb from '@components/emotionSelector/selectedBreadcrumb';
import EmotionSelectionForm from '@components/forms/emotionSelectionForm';

const SunburtSelector = () => {
  const [selected, setSelected] = useState();
  const router = useRouter();

  return (
    <>
      <Box w='100%'>
        <Sunburst width={600} onSelect={setSelected} />
      </Box>
      <Flex w='100%' h={30} justifyContent='center' alignItems='baseline'>
        {selected && <SelectedBreadcrumb {...{ selected }} />}
      </Flex>
      <Flex w='100%' mt={4} justifyContent='center'>
        <EmotionSelectionForm
          {...{ selected }}
          onSubmitSuccess={() => router.replace('/profile')}
        />
      </Flex>
    </>
  );
};

export default SunburtSelector;

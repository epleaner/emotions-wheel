import React, { useState, useCallback } from 'react';
import { Flex, Box, useToast } from '@chakra-ui/core';

import Sunburst from '@components/charts/sunburst';
import SelectedBreadcrumb from '@components/emotionSelector/selectedBreadcrumb';
import EmotionSelectionForm from '@components/forms/emotionSelectionForm';

const EmotionSelector = () => {
  const successToast = useToast();

  const [selected, setSelected] = useState();
  const [shouldResetSunburst, setShouldResetSunburst] = useState(false);

  const onSubmitSuccess = useCallback(() => {
    setShouldResetSunburst(true);
    setSelected(null);
    successToast({
      description: 'Entry saved',
      duration: '1500',
      status: 'success',
      isClosable: true,
    });
  }, [successToast]);

  const onResetSunburst = useCallback(() => setShouldResetSunburst(false), []);

  return (
    <>
      <Box w='100%'>
        <Sunburst
          width={600}
          shouldReset={shouldResetSunburst}
          onReset={onResetSunburst}
          onSelect={setSelected}
        />
      </Box>
      <Flex w='100%' h={30} justifyContent='center' alignItems='baseline'>
        {selected && <SelectedBreadcrumb {...{ selected }} />}
      </Flex>
      <Flex w='100%' mt={4} justifyContent='center'>
        <EmotionSelectionForm {...{ selected, onSubmitSuccess }} />
      </Flex>
    </>
  );
};

export default EmotionSelector;

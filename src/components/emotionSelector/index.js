import React, { useMemo, useState, useCallback } from 'react';
import { Flex, Box, useToast, IconButton, Stack } from '@chakra-ui/core';

import Sunburst from '@components/charts/sunburst';
import SelectedBreadcrumb from '@components/emotionSelector/selectedBreadcrumb';
import EmotionSelectionForm from '@components/forms/emotionSelectionForm';

const EmotionSelector = () => {
  const successToast = useToast();

  const [selected, setSelected] = useState();
  const [allSelected, setAllSelected] = useState([]);

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

  const alreadySelected = useMemo(
    () =>
      selected &&
      allSelected.some(
        (s) =>
          s.data[s.data.length - 1] === selected.data[selected.data.length - 1]
      ),
    [selected, allSelected]
  );

  const onClickAddSelected = useCallback(() => {
    if (alreadySelected) console.log('already selected');
    else {
      setAllSelected([...allSelected, selected]);
      setSelected(null);
      setShouldResetSunburst(true);
    }
  }, [allSelected, selected, alreadySelected]);

  const removeSelected = useCallback(
    (selected) => {
      setAllSelected(
        allSelected.filter(
          (s) =>
            s.data[s.data.length - 1] !==
            selected.data[selected.data.length - 1]
        )
      );
    },
    [allSelected]
  );

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
      <Flex w='100%' minH={30} justifyContent='center' alignItems='baseline'>
        <Stack justify='center' align='center'>
          {allSelected.map((selected) => (
            <Stack key={selected.data} isInline justify='center'>
              <IconButton
                aria-label='Remove this emotion'
                icon='small-close'
                isRound
                size='xs'
                variant='ghost'
                variantColor='grayscale'
                onClick={() => {
                  removeSelected(selected);
                }}
              />
              <SelectedBreadcrumb {...{ selected }} />
            </Stack>
          ))}
          {selected && (
            <>
              <SelectedBreadcrumb {...{ selected }} />
              <IconButton
                aria-label='Select another emotion'
                icon='small-add'
                mt={3}
                isRound
                size='sm'
                variant='outline'
                disabled={alreadySelected}
                onClick={() => onClickAddSelected()}
              />
            </>
          )}
        </Stack>
      </Flex>
      <Flex w='100%' mt={4} justifyContent='center'>
        <EmotionSelectionForm {...{ selected, allSelected, onSubmitSuccess }} />
      </Flex>
    </>
  );
};

export default EmotionSelector;

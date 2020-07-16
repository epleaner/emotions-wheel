import React, { useMemo, useState, useCallback } from 'react';
import { Flex, Box, useToast, IconButton, Stack } from '@chakra-ui/core';

import Sunburst from '@components/charts/sunburst';
import SelectedBreadcrumb from '@components/emotionSelector/selectedBreadcrumb';
import EmotionSelectionForm from '@components/forms/emotionSelectionForm';

const EmotionSelector = () => {
  const successToast = useToast();

  const [selected, setSelected] = useState();
  const [selectedList, setSelectedList] = useState([]);

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

  const entryIsEqualTo = (e1) => (e2) =>
    e1.data[e1.data.length - 1] === e2.data[e2.data.length - 1];

  const isAlreadySelected = useMemo(
    () => selected && selectedList.some(entryIsEqualTo(selected)),
    [selected, selectedList]
  );

  const emotionsToSave = useMemo(() => {
    const emotionsToSave = [...selectedList];

    if (selected && !isAlreadySelected) emotionsToSave.push(selected);

    return emotionsToSave;
  }, [selected, selectedList, isAlreadySelected]);

  const removeSelected = useCallback(
    (selected) => {
      setSelectedList(selectedList.filter((s) => !entryIsEqualTo(selected)(s)));
    },
    [selectedList]
  );

  const onClickAddSelected = useCallback(() => {
    if (!isAlreadySelected) {
      setSelectedList([...selectedList, selected]);
      setSelected(null);
      setShouldResetSunburst(true);
    }
  }, [selectedList, selected, isAlreadySelected]);

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
          {selectedList.map((selected) => (
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
                disabled={isAlreadySelected}
                onClick={() => onClickAddSelected()}
              />
            </>
          )}
        </Stack>
      </Flex>
      <Flex w='100%' mt={4} justifyContent='center'>
        <EmotionSelectionForm
          {...{ selected, emotionsToSave, onSubmitSuccess }}
        />
      </Flex>
    </>
  );
};

export default EmotionSelector;

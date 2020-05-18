import React, { useState } from 'react';
import { Flex, Box, Input, Button } from '@chakra-ui/core';

import Sunburst from '@components/charts/sunburst';
import SelectedBreadcrumb from '@components/emotionSelector/selectedBreadcrumb';

const SunburtSelector = () => {
  const [selected, setSelected] = useState();
  const [note, setNote] = useState('');

  console.log(selected);

  return (
    <>
      <Box w='100%'>
        <Sunburst width={600} onSelect={setSelected} />
      </Box>

      <Flex w='100%' justifyContent='center' alignItems='baseline'>
        {selected && <SelectedBreadcrumb {...{ selected }} />}
      </Flex>
      <Flex w='100%' justifyContent='center' alignItems='baseline'>
        <Input
          width={[400, 600]}
          borderColor={selected ? selected.color : 'gray.100'}
          focusBorderColor={selected ? selected.color : 'gray.100'}
          variant='flushed'
          value={note}
          onChange={(e) => setNote(e.target.value)}
          placeholder='Want to talk about it?'
          size='xs'
          mr={2}
        />
        <Button
          variant='outline'
          borderColor={selected ? selected.color : 'gray.400'}
          _hover={{ bg: selected ? selected.color : 'gray.100' }}
          size='xs'
          disabled={!selected}
        >
          Save
        </Button>
      </Flex>
    </>
  );
};

export default SunburtSelector;

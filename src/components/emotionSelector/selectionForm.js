import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { Flex, Input, Button } from '@chakra-ui/core';

const SunburtSelector = ({ selected }) => {
  const [note, setNote] = useState('');

  return (
    <>
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

SunburtSelector.propTypes = {
  selected: PropTypes.object,
};

export default SunburtSelector;

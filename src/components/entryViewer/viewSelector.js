import React from 'react';
import PropTypes from 'prop-types';

import { Stack, Button, Text } from '@chakra-ui/core';

const ViewSelector = ({ view, setView }) => {
  return (
    <Stack isInline align='center'>
      <Text fontSize='xs'>view my entries as: </Text>
      <Button
        type='button'
        size='xs'
        variant='outline'
        variantColor={view === 'chart' ? 'primary' : 'gray'}
        onClick={() => setView('chart')}>
        chart
      </Button>
      <Button
        type='button'
        size='xs'
        variant='outline'
        variantColor={view === 'list' ? 'primary' : 'gray'}
        onClick={() => setView('list')}>
        list
      </Button>
      <Button
        type='button'
        size='xs'
        variant='outline'
        variantColor={view === 'list-by-day' ? 'primary' : 'gray'}
        onClick={() => setView('list-by-day')}>
        list by day
      </Button>
    </Stack>
  );
};

ViewSelector.propTypes = {
  view: PropTypes.string.isRequired,
  setView: PropTypes.func.isRequired,
};

export default ViewSelector;

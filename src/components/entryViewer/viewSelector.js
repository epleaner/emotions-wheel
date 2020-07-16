import React from 'react';
import PropTypes from 'prop-types';

import { Stack, Button } from '@chakra-ui/core';

const ViewSelector = ({ view, setView }) => {
  return (
    <Stack isInline align='center'>
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
    </Stack>
  );
};

ViewSelector.propTypes = {
  view: PropTypes.string.isRequired,
  setView: PropTypes.func.isRequired,
};

export default ViewSelector;

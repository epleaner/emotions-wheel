import React from 'react';

import { Stack, Button } from '@chakra-ui/core';

const EmotionViewer = ({ view, setView }) => {
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

export default EmotionViewer;

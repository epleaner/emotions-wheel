import React, { useState } from 'react';

import { Stack, Button } from '@chakra-ui/core';

import useCurrentUser from '@hooks/useCurrentUser';
import { observer } from 'mobx-react-lite';

import EmotionList from '@components/emotionViewer/emotionList';
import EmotionBeeswarm from '@components/emotionViewer/emotionBeeswarm';

const EmotionViewer = () => {
  const userStore = useCurrentUser();

  const [view, setView] = useState('chart');

  const onDeleteSuccess = ({ _id }) => () => userStore.deleteEmotion(_id);

  const onEditSuccess = ({ _id }) => (editedNote) =>
    userStore.updateEmotionNote(_id, editedNote);

  return (
    <>
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
      {view === 'list' && (
        <EmotionList
          {...{
            emotions: userStore.currentUser.emotions,
            onDeleteSuccess,
            onEditSuccess,
          }}
        />
      )}
      {view === 'chart' && (
        <EmotionBeeswarm {...{ emotions: userStore.currentUser.emotions }} />
      )}
    </>
  );
};

export default observer(EmotionViewer);

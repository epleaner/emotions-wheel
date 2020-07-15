import React, { useState } from 'react';
import { observer } from 'mobx-react-lite';

import useCurrentUser from '@hooks/useCurrentUser';

import Link from 'next/link';

import { Text, Link as UILink } from '@chakra-ui/core';

import EmotionList from '@components/emotionViewer/list';
import ViewSelector from '@components/emotionViewer/viewSelector';
import EmotionBeeswarm from '@components/emotionViewer/beeswarm';

const EmotionViewer = () => {
  const userStore = useCurrentUser();

  const [view, setView] = useState('chart');

  return (
    <>
      {userStore.currentUser.emotions ? (
        <>
          <ViewSelector {...{ view, setView }} />
          {view === 'list' && (
            <EmotionList emotions={userStore.currentUser.emotions} />
          )}
          {view === 'chart' && (
            <EmotionBeeswarm emotions={userStore.currentUser.emotions} />
          )}{' '}
        </>
      ) : (
        <Text fontSize='lg' mt='50px' textAlign='center'>
          Your entries will show up here, go ahead and{' '}
          <Link href='/'>
            <UILink color='primary.500'>add some!</UILink>
          </Link>
        </Text>
      )}
    </>
  );
};

export default observer(EmotionViewer);

import React, { useState } from 'react';
import { observer } from 'mobx-react-lite';

import useCurrentUser from '@hooks/useCurrentUser';

import Link from 'next/link';

import { Text, Link as UILink } from '@chakra-ui/core';

import { EntryListByDay } from '@components/entryViewer/list-by-day';
import EntryList from '@components/entryViewer/list';
import ViewSelector from '@components/entryViewer/viewSelector';
import Beeswarm from '@components/entryViewer/beeswarm';

const EntryViewer = () => {
  const userStore = useCurrentUser();

  const [view, setView] = useState('list-by-day');

  return (
    <>
      {userStore.currentUser.entries && userStore.currentUser.entries.length ? (
        <>
          <ViewSelector {...{ view, setView }} />
          {view === 'list-by-day' && (
            <EntryListByDay entries={userStore.currentUser.entries} />
          )}
          {view === 'list' && (
            <EntryList entries={userStore.currentUser.entries} />
          )}
          {view === 'chart' && (
            <Beeswarm entries={userStore.currentUser.entries} />
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

export default observer(EntryViewer);

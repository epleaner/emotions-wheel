import React, { useState, useEffect } from 'react';
import Link from 'next/link';

import {
  Link as UILink,
  Spinner,
  Stack,
  Button,
  Text,
  Heading,
  Divider,
} from '@chakra-ui/core';

import useCurrentUser from '@hooks/useCurrentUser';
import { observer } from 'mobx-react-lite';

import EmotionList from '@components/emotionList';
import EmotionBeeswarm from '@components/emotionBeeswarm';
import CenteredContainer from '@components/shared/centeredContainer';
import Container from '@components/shared/container';
import Section from '@components/shared/section';

const ProfilePage = observer(() => {
  const userStore = useCurrentUser();

  const [view, setView] = useState('chart');

  const onDeleteSuccess = ({ _id }) => () => userStore.deleteEmotion(_id);

  const onEditSuccess = ({ _id }) => (editedNote) =>
    userStore.updateEmotionNote(_id, editedNote);

  return (
    <>
      {userStore.isLoading ? (
        <CenteredContainer>
          <Spinner />
        </CenteredContainer>
      ) : !userStore.isLoggedIn ? (
        <CenteredContainer>
          <>
            <Text fontSize='6xl'>Welcome!</Text>
            <Text fontSize='5xl'>
              Please{' '}
              <Link href='/login'>
                <UILink color='blue.200'>log in</UILink>
              </Link>{' '}
              or{' '}
              <Link href='/signup'>
                <UILink color='green.200'>sign up</UILink>
              </Link>{' '}
              first.
            </Text>
          </>
        </CenteredContainer>
      ) : (
        <Container justifyContent='center' mt='4' mx={[4, 0]}>
          <Section>
            <Stack direction='row' justify='space-between' align='baseline'>
              <Heading mb={4} fontSize='6xl'>
                hey, {userStore.userData.name}
              </Heading>
              <Button leftIcon='edit' type='button' mt={4} size='xs'>
                <Link href='/profile/edit'>
                  <a>Edit profile</a>
                </Link>
              </Button>
            </Stack>
            <Divider />
            <Stack isInline align='center'>
              <Text fontSize='xs'>view as:</Text>
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
              <EmotionBeeswarm
                {...{ emotions: userStore.currentUser.emotions }}
              />
            )}
          </Section>
        </Container>
      )}
    </>
  );
});

export default ProfilePage;

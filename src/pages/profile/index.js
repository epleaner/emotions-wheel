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

import useUser from '@hooks/useUser';
import EmotionList from '@components/emotionList';
import CenteredContainer from '@components/shared/centeredContainer';
import Container from '@components/shared/container';
import Section from '@components/shared/section';

const ProfilePage = () => {
  const [user, { mutate }, isFetching] = useUser();
  const { name } = user || {};
  const [emotions, setEmotions] = useState(user ? user.emotions || [] : []);

  useEffect(() => void setEmotions(user ? user.emotions || [] : []), [user]);

  const onDeleteSuccess = (emotion) => () => {
    setEmotions(emotions.filter((e) => e !== emotion));
    updateUser();
  };

  const updateUser = () => {
    mutate({
      user: {
        ...user,
        emotions,
      },
    });
  };

  return (
    <>
      {isFetching ? (
        <CenteredContainer>
          <Spinner />
        </CenteredContainer>
      ) : !user ? (
        <CenteredContainer>
          <Text>
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
          </Text>
        </CenteredContainer>
      ) : (
        <Container justifyContent='center' mt='4' mx={[4, 0]}>
          <Section>
            <Stack direction='row' justify='space-between' align='baseline'>
              <Heading mb={4} fontSize='6xl'>
                hey, {name}
              </Heading>
              <Link href='/profile/edit'>
                <Button leftIcon='edit' type='button' mt={4} size='xs'>
                  Edit profile
                </Button>
              </Link>
            </Stack>
            <Divider />
            <EmotionList {...{ emotions, onDeleteSuccess }} />
          </Section>
        </Container>
      )}
    </>
  );
};

export default ProfilePage;

import React, { useState } from 'react';
import Link from 'next/link';

import { Stack, Button, Heading, Divider } from '@chakra-ui/core';

import useCurrentUser from '@hooks/useCurrentUser';
import { observer } from 'mobx-react-lite';

import EmotionViewer from '@components/emotionViewer';
import AuthedPage from '@components/shared/authedPage';
import Container from '@components/shared/container';
import Section from '@components/shared/section';

const ProfilePage = () => {
  const userStore = useCurrentUser();

  return (
    <AuthedPage
      render={() => (
        <Container>
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
            <Divider mb={4} />
            <EmotionViewer />
          </Section>
        </Container>
      )}
    />
  );
};

export default observer(ProfilePage);

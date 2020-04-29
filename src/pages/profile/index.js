import React, { useState } from 'react';
import Link from 'next/link';

import {
  Flex,
  Box,
  Icon,
  Tooltip,
  Button,
  Text,
  Heading,
  Divider,
} from '@chakra-ui/core';

import useUser from '@hooks/useUser';
import EmotionList from '@components/emotionList';
import CenteredContainer from '@components/shared/centeredContainer';
import Section from '@components/shared/section';

const ProfilePage = () => {
  const [user, , isFetching] = useUser();
  const { name, email, emailVerified, emotions } = user || {};
  const [sendingVerification, setSendingVerification] = useState(false);
  const [sentVerification, setSentVerification] = useState(false);

  const sendVerification = async () => {
    setSendingVerification(true);
    const res = await fetch('/api/user/email/verify', { method: 'POST' });

    const responseJson = await res.json();

    if (responseJson.ok) setSentVerification(true);
    setSendingVerification(false);
  };

  return (
    <CenteredContainer>
      {isFetching ? (
        <Text>Loading...</Text>
      ) : !user ? (
        <Text>Please sign in</Text>
      ) : (
        <Section>
          <Heading mb={4}>{name}</Heading>
          <Flex alignItems="center">
            <Text mr={3}>{email}</Text>
            {emailVerified ? (
              <Tooltip label="Verified" placement="right" bg="green.300">
                <Icon name="check-circle" color="green.300" />
              </Tooltip>
            ) : sentVerification ? (
              <Text fontSize="xs" variantColor="green">
                Verification email sent!
              </Text>
            ) : (
              <Button
                size="xs"
                type="button"
                variantColor="green"
                disabled={sendingVerification}
                onClick={sendVerification}
              >
                Verify
              </Button>
            )}
          </Flex>
          <Divider />
          {emotions && <EmotionList emotions={emotions} />}
          <Link href="/profile/edit">
            <Button type="button" mt={4}>
              Edit
            </Button>
          </Link>
        </Section>
      )}
    </CenteredContainer>
  );
};

export default ProfilePage;

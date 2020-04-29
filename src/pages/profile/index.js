import React, { useState } from 'react';
import Link from 'next/link';

import { Flex, Button, Text } from '@chakra-ui/core';

import useUser from '@hooks/useUser';
import EmotionList from '@components/emotionList';
import CenteredContainer from '@components/shared/centeredContainer';

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
        <>Loading...</>
      ) : user ? (
        <section>
          <h1>{name}</h1>
          <Text>{email}</Text>
          <Flex>
            {!emailVerified &&
              (sentVerification ? (
                <Text color="secondary">Verification email sent!</Text>
              ) : (
                <Button
                  type="button"
                  disabled={sendingVerification}
                  onClick={sendVerification}
                >
                  Verify
                </Button>
              ))}
          </Flex>
          {emotions && <EmotionList emotions={emotions} />}
          <Link href="/profile/edit">
            <Button type="button" mt={4}>
              Edit
            </Button>
          </Link>
        </section>
      ) : (
        <>Please sign in</>
      )}
    </CenteredContainer>
  );
};

export default ProfilePage;

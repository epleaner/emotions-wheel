import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import Link from 'next/link';

import { Spinner, Text, Link as UILink } from '@chakra-ui/core';

import CenteredContainer from '@components/shared/centeredContainer';
import Heading from '@components/shared/heading';
import Section from '@components/shared/section';

const VerifyEmailToken = ({ token }) => {
  const [validToken, setValidToken] = useState(false);
  const [fetchingValidity, setFetchingValidity] = useState(true);

  useEffect(() => {
    (async () => {
      const res = await fetch(`/api/user/email/verify/${token}`, {
        method: 'PATCH',
      });

      setValidToken(res.status === 200);
      setFetchingValidity(false);
    })();
  }, [token]);

  return (
    <CenteredContainer>
      {fetchingValidity ? (
        <Spinner />
      ) : (
        <Section>
          {validToken ? (
            <>
              <Heading fontSize='2xl'>
                Thanks for verifying, you're good to go!
              </Heading>
              <Text fontSize='6xl' color='primary.500'>
                <Link href='/login'>
                  <UILink>Log in.</UILink>
                </Link>
              </Text>
            </>
          ) : (
            <>
              <Heading fontSize='2xl'>This link may have expired...</Heading>
              <Text fontSize='6xl' color='primary.500'>
                <Link href='/verify-email'>
                  <UILink>Try again?</UILink>
                </Link>
              </Text>
            </>
          )}
        </Section>
      )}
    </CenteredContainer>
  );
};

VerifyEmailToken.getInitialProps = async (ctx) => {
  const { token } = ctx.query;

  return { token };
};

VerifyEmailToken.propTypes = {
  token: PropTypes.string.isRequired,
};

export default VerifyEmailToken;

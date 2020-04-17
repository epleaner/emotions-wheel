import React, { useState, useEffect } from "react";
import fetch from "isomorphic-unfetch";
import Link from "next/link";
import { Flex, Text, Heading, NavLink } from "theme-ui";

const VerifyEmailToken = ({ token }) => {
  const [valid, setValid] = useState(true);
  const [fetchingValidity, setFetchingValidity] = useState(false);

  // useEffect(() => {
  //   (async () => {
  //     const res = await fetch(`/api/user/email/verify/${token}`, {
  //       method: "PATCH",
  //     });

  //     const { ok } = await res.json();

  //     setValid(ok);
  //     setFetchingValidity(false);
  //   })();
  // }, []);

  return (
    <Flex sx={{ justifyContent: "center", flexWrap: "wrap", mx: [2, 0] }}>
      {fetchingValidity ? (
        <Text>Loading...</Text>
      ) : valid ? (
        <>
          <Heading sx={{ textAlign: "center" }}>
            Thanks for verifying, you're good to go!
          </Heading>
          <Flex sx={{ width: "100%", justifyContent: "center" }}>
            <Link href="/">
              <NavLink>Back to home.</NavLink>
            </Link>
          </Flex>
        </>
      ) : (
        <Text>
          This link may have expired.{" "}
          <Link href="/verify-email">
            <NavLink>Try again?</NavLink>
          </Link>
        </Text>
      )}
    </Flex>
  );
};

VerifyEmailToken.getInitialProps = async (ctx) => {
  const { token } = ctx.query;

  return { token };
};

export default VerifyEmailToken;

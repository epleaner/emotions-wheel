import React from "react";
import Link from "next/link";

import { Flex, Button, Text } from "theme-ui";

import useUser from "@hooks/useUser";
import EmotionList from "@components/emotionList";

const ProfilePage = () => {
  const [user, , isFetching] = useUser();
  const { name, email, emotions } = user || {};

  console.log(emotions);

  return (
    <Flex sx={{ justifyContent: "center" }}>
      {isFetching ? (
        <>Loading...</>
      ) : user ? (
        <section>
          <h1>{name}</h1>
          <Text>{email}</Text>
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
    </Flex>
  );
};

export default ProfilePage;

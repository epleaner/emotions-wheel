import React, { useState, useEffect } from "react";
import { useRouter } from "next/router";
import { Label, Input, Button, Flex, Box, Heading } from "theme-ui";

import useUser from "@hooks/useUser";

const SignupPage = () => {
  const router = useRouter();
  const [user, { mutate }] = useUser();
  const [errorMsg, setErrorMsg] = useState("");

  useEffect(() => {
    if (user) router.replace("/");
  }, [user]);

  const handleSubmit = async (e) => {
    e.preventDefault();

    const body = {
      email: e.currentTarget.email.value,
      name: e.currentTarget.name.value,
      password: e.currentTarget.password.value,
    };

    const res = await fetch("/api/user", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(body),
    });

    if (res.status === 201) {
      const userObj = await res.json();
      mutate(userObj);
    } else {
      setErrorMsg(await res.text());
    }
  };

  return (
    <Flex
      sx={{ justifyContent: "center", alignItems: "center", height: "90%" }}
    >
      <Box sx={{ width: ["100%", 500], mx: [1, 0] }}>
        <form onSubmit={handleSubmit}>
          {errorMsg ? <p style={{ color: "red" }}>{errorMsg}</p> : null}
          <Label htmlFor="name" mb={2}>
            <Input id="name" name="name" type="text" placeholder="name" />
          </Label>
          <Label htmlFor="email" mb={2}>
            <Input id="email" name="email" type="email" placeholder="email" />
          </Label>
          <Label htmlFor="password" mb={2}>
            <Input
              id="password"
              name="password"
              type="password"
              placeholder="password"
            />
          </Label>
          <Flex sx={{ justifyContent: "center" }}>
            <Button type="submit">Sign up</Button>
          </Flex>
        </form>
      </Box>
    </Flex>
  );
};

export default SignupPage;

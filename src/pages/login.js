import React, { useState, useEffect } from "react";
import Link from "next/link";
import { useRouter } from "next/router";
import {
  Label,
  Input,
  Button,
  Flex,
  Box,
  Link as ThemeUILink,
  Heading,
} from "theme-ui";
import useUser from "@hooks/useUser";

const LoginPage = () => {
  const [errorMsg, setErrorMsg] = useState("");

  const router = useRouter();
  const [user, { mutate }] = useUser();

  useEffect(() => {
    // redirect to home if user is authenticated
    if (user) router.replace("/");
  }, [user]);

  async function onSubmit(e) {
    setErrorMsg("");

    e.preventDefault();
    const body = {
      email: e.currentTarget.email.value,
      password: e.currentTarget.password.value,
    };

    const res = await fetch("/api/auth", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(body),
    });

    if (res.status === 200) {
      const userObj = await res.json();
      mutate(userObj);
    } else {
      setErrorMsg("Incorrect username or password.");
    }
  }

  return (
    <Flex
      sx={{ justifyContent: "center", alignItems: "center", height: "90%" }}
    >
      <Box sx={{ width: ["100%", 500], mx: [1, 0] }}>
        <Heading sx={{ textAlign: "center" }} as="h1">
          log in
        </Heading>
        <form onSubmit={onSubmit}>
          {errorMsg ? <p style={{ color: "red" }}>{errorMsg}</p> : null}
          <Label htmlFor="email">
            <Input id="email" type="email" name="email" placeholder="email" />
          </Label>
          <Label htmlFor="password">
            <Input
              id="password"
              type="password"
              name="password"
              placeholder="password"
            />
          </Label>
          <Flex sx={{ justifyContent: "space-between" }}>
            <Button type="submit">boop</Button>
            <Link href="/forgot-password">
              <ThemeUILink sx={{ alignSelf: "center" }}>
                forgot password?
              </ThemeUILink>
            </Link>
          </Flex>
        </form>
      </Box>
    </Flex>
  );
};

export default LoginPage;

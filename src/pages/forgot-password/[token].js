import React, { useState, useEffect } from "react";
import fetch from "isomorphic-unfetch";
import Link from "next/link";
import { Flex, Input, Button, Text, NavLink } from "theme-ui";

const ResetPasswordTokenPage = ({ token }) => {
  const [valid, setValid] = useState(false);
  const [fetchingValidity, setFetchingValidity] = useState(true);
  const [password, setPassword] = useState("");
  const [formStatus, setFormStatus] = useState({ ok: true, message: "" });
  const [submitting, setSubmitting] = useState(false);

  useEffect(() => {
    (async () => {
      const res = await fetch(`/api/user/password/${token}`, {
        method: "GET",
      });

      const { valid } = await res.json();

      setValid(valid);
      setFetchingValidity(false);
    })();
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setFormStatus({ ok: true, message: "" });
    setSubmitting(true);

    const body = { password };

    const res = await fetch(`/api/user/password/${token}`, {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(body),
    });

    const responseJson = await res.json();

    setPassword("");
    setSubmitting(false);
    setFormStatus(responseJson);
  };
  return (
    <Flex sx={{ justifyContent: "center" }}>
      {fetchingValidity ? (
        <Text>Loading...</Text>
      ) : valid ? (
        <section>
          <h1>Reset password</h1>
          {formStatus.message}
          <form onSubmit={handleSubmit}>
            <Input
              id="password"
              type="password"
              placeholder="New password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
            <Button type="submit" disabled={submitting}>
              Submit
            </Button>
          </form>
        </section>
      ) : (
        <Text>
          This link may have expired.{" "}
          <Link href="/forgot-password">
            <NavLink>Try again?</NavLink>
          </Link>
        </Text>
      )}
    </Flex>
  );
};

ResetPasswordTokenPage.getInitialProps = async (ctx) => {
  const { token } = ctx.query;

  return { token };
};

export default ResetPasswordTokenPage;

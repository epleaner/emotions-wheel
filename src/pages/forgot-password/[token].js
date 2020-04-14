import React, { useState } from "react";
import fetch from "isomorphic-unfetch";
import { Flex, Input, Button, Text } from "theme-ui";

const ResetPasswordTokenPage = ({ valid, token }) => {
  const [password, setPassword] = useState("");
  const [formStatus, setFormStatus] = useState({ ok: true, message: "" });
  const [submitting, setSubmitting] = useState(false);

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
      {valid ? (
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
        <Text>This link may have expired.</Text>
      )}
    </Flex>
  );
};

ResetPasswordTokenPage.getInitialProps = async (ctx) => {
  const { token } = ctx.query;

  const res = await fetch(
    `${process.env.WEB_URI}/api/user/password/reset/${token}`,
    { method: "GET" }
  );

  const { valid } = await res.json();

  return { valid, token };
};

export default ResetPasswordTokenPage;

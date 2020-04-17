import React, { useState } from "react";
import { Flex, Input, Button } from "theme-ui";

const ForgotPassword = () => {
  const [email, setEmail] = useState("");
  const [formStatus, setFormStatus] = useState({ ok: true, message: "" });
  const [submitting, setSubmitting] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setFormStatus({ ok: true, message: "" });

    setSubmitting(true);

    const body = { email };

    const res = await fetch("/api/user/password/reset", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(body),
    });

    const responseJson = await res.json();

    setEmail("");
    setFormStatus(responseJson);
    setSubmitting(false);
  };

  return (
    <Flex sx={{ justifyContent: "center" }}>
      <section>
        <h1>Forgot your password?</h1>
        <form onSubmit={handleSubmit}>
          <Input
            id="email"
            type="email"
            placeholder="Your email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
          <Button type="submit" disabled={submitting}>
            Submit
          </Button>
          <Flex mt={2}>{formStatus.message}</Flex>
        </form>
      </section>
    </Flex>
  );
};

export default ForgotPassword;

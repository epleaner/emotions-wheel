import Router from "next/router";
import { useState } from "react";

export default () => {
  const [message, setMessage] = useState("");

  const submit = async (event) => {
    event.preventDefault();

    await fetch("/api/thoughts", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        message,
      }),
    });

    Router.push("/");
  };

  return (
    <form onSubmit={submit}>
      <input
        type="text"
        placeholder="Say something"
        onChange={(e) => setMessage(e.target.value)}
        value={message}
      />
      <button type="submit">Share</button>
    </form>
  );
};

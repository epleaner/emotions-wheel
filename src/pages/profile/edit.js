import React, { useEffect, useState } from "react";
import useUser from "@hooks/useUser";
import { Flex, Button, Text, Input, Label } from "theme-ui";

const EditProfile = () => {
  const [user, { mutate }, isFetching] = useUser();

  const [isUpdating, setIsUpdating] = useState(false);
  const [msg, setMsg] = useState({ message: "", isError: false });
  const [name, setName] = useState(user ? user.name : "");

  useEffect(() => {
    if (!isFetching && user) setName(user.name);
  }, [user]);

  const handleSubmit = async (event) => {
    event.preventDefault();

    if (isUpdating) return;
    setIsUpdating(true);

    const body = { name: name };

    const res = await fetch("/api/user", {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(body),
    });

    if (res.status === 200) {
      const userData = await res.json();
      mutate({
        user: {
          ...user,
          ...userData.user,
        },
      });

      setMsg({ message: "Profile updated" });
    } else {
      setMsg({ message: await res.text(), isError: true });
    }
  };

  return (
    <Flex sx={{ justifyContent: "center" }}>
      {isFetching ? (
        <>Loading...</>
      ) : user ? (
        <section>
          <h1>Edit Profile</h1>
          <form onSubmit={handleSubmit}>
            <Label htmlFor="name">Name</Label>
            <Input
              required
              id="name"
              name="name"
              type="text"
              placeholder="Your name"
              value={name}
              onChange={(e) => setName(e.target.value)}
            />
            {msg.message && (
              <Text
                mt={2}
                sx={{
                  color: msg.isError ? "red" : "#0070f3",
                }}
              >
                {msg.message}
              </Text>
            )}
            <Button disabled={isUpdating} type="submit" mt={2}>
              Save
            </Button>
          </form>
        </section>
      ) : (
        <>Please sign in</>
      )}
    </Flex>
  );
};

export default EditProfile;

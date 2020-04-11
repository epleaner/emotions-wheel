import React, { useEffect, useState } from "react";
import useUser from "@hooks/useUser";
import { Flex, Button, Text, Input, Label } from "theme-ui";

const EditProfile = () => {
  const [user, { mutate }, isFetching] = useUser();

  const [isUpdating, setIsUpdating] = useState(false);
  const [isValid, setIsValid] = useState(false);

  const [msg, setMsg] = useState({ message: "", isError: false });
  const [name, setName] = useState(user ? user.name : "");
  const [oldPassword, setOldPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");

  useEffect(() => {
    if (!isFetching && user) setName(user.name);
  }, [user]);

  useEffect(() => {
    let nameChanged = false;
    let passwordsValid = false;

    if (user) {
      if (name !== user.name) nameChanged = true;

      if (
        (oldPassword && newPassword) ||
        (!(oldPassword && newPassword) && nameChanged)
      )
        passwordsValid = true;
    }

    setIsValid(nameChanged || passwordsValid);
  }, [user, name, oldPassword, newPassword]);

  console.log(isFetching, isUpdating, isValid);
  const handleSubmit = async (event) => {
    event.preventDefault();

    if (isUpdating) return;
    setIsUpdating(true);
    setMsg({ message: "", isError: false });

    const body = { name, oldPassword, newPassword };

    const res = await fetch("/api/user", {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(body),
    });

    const data = await res.json();
    if (data.ok) {
      mutate({
        user: {
          ...user,
          ...data.user,
        },
      });

      setMsg({ message: "Profile updated" });
      setOldPassword("");
      setNewPassword("");
    } else {
      setMsg({ message: data.message, isError: true });
    }

    setIsUpdating(false);
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
              id="name"
              name="name"
              type="text"
              placeholder="Your name"
              value={name}
              onChange={(e) => setName(e.target.value)}
            />
            <Label htmlFor="password">Change password</Label>
            <Input
              id="oldPassword"
              name="oldPassword"
              type="password"
              placeholder="Current password"
              value={oldPassword}
              onChange={(e) => setOldPassword(e.target.value)}
            />
            <Input
              id="newPassword"
              name="newPassword"
              type="password"
              placeholder="New password"
              value={newPassword}
              onChange={(e) => setNewPassword(e.target.value)}
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
            <Button
              variant="primary"
              disabled={isFetching || isUpdating || !isValid}
              type="submit"
              mt={2}
            >
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

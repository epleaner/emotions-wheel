import React, { useEffect, useState } from "react";
import useUser from "@hooks/useUser";
import { Flex, Box, Button, Text, Input, Label } from "theme-ui";

const EditProfile = () => {
  const [user, { mutate }, isFetching] = useUser();

  const [isUpdating, setIsUpdating] = useState(false);
  const [isValid, setIsValid] = useState(false);

  const [msg, setMsg] = useState({ message: "", isError: false });
  const [name, setName] = useState(user ? user.name : "");
  const [email, setEmail] = useState(user ? user.email : "");
  const [oldPassword, setOldPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [showDeleteConfirmation, setShowDeleteConfirmation] = useState(false);
  const [justDeleted, setJustDeleted] = useState(false);

  useEffect(() => {
    if (!isFetching && user) {
      setName(user.name);
      setEmail(user.email);
    }
  }, [user]);

  useEffect(() => {
    let profileFieldsChanged = false;
    let passwordsValid = false;

    if (user) {
      if (name !== user.name || email !== user.email)
        profileFieldsChanged = true;

      if (
        (oldPassword && newPassword) ||
        (!(oldPassword && newPassword) && profileFieldsChanged)
      )
        passwordsValid = true;
    }

    setIsValid(profileFieldsChanged || passwordsValid);
  }, [user, name, email, oldPassword, newPassword]);

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (isUpdating) return;
    setIsUpdating(true);
    setMsg({ message: "", isError: false });

    const body = { name, email, oldPassword, newPassword };

    const response = await fetch("/api/user", {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(body),
    });

    const responseJson = await response.json();

    if (responseJson.ok) {
      mutate({
        user: {
          ...user,
          ...responseJson.user,
        },
      });

      setMsg({ message: "Profile updated" });
      setOldPassword("");
      setNewPassword("");
    } else {
      setMsg({ message: responseJson.message, isError: true });
    }

    setIsUpdating(false);
  };

  const handleDelete = async (e) => {
    e.preventDefault();

    if (isUpdating) return;
    setIsUpdating(true);

    const response = await fetch("/api/user", {
      method: "DELETE",
    });

    const responseJson = await response.json();

    if (responseJson.ok) {
      setJustDeleted(true);
    } else {
      setMsg({ message: responseJson.message, isError: true });
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
            <Label htmlFor="email">Email</Label>
            <Input
              id="email"
              name="email"
              type="text"
              placeholder="Your email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
            <Box mt={4}>
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
            </Box>
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
            <Box>
              <Button
                variant="primary"
                disabled={isFetching || isUpdating || !isValid}
                type="submit"
                mt={2}
              >
                Save
              </Button>
            </Box>
            <Box>
              {showDeleteConfirmation ? (
                <>
                  <Button
                    variant="warning"
                    disabled={isFetching}
                    type="button"
                    onClick={handleDelete}
                    mt={2}
                  >
                    Yes, really delete
                  </Button>
                  <Button
                    variant="primary"
                    disabled={isFetching}
                    type="button"
                    onClick={() => setShowDeleteConfirmation(false)}
                    mt={2}
                  >
                    Never mind
                  </Button>
                </>
              ) : (
                <Button
                  variant="warning"
                  disabled={isFetching}
                  type="button"
                  onClick={() => setShowDeleteConfirmation(true)}
                  mt={2}
                >
                  Delete account
                </Button>
              )}
            </Box>
          </form>
        </section>
      ) : justDeleted ? (
        <>Your account has been deleted. Sorry to see you go!</>
      ) : (
        <>Please sign in</>
      )}
    </Flex>
  );
};

export default EditProfile;

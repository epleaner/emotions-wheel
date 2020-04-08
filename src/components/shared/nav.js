import { useContext } from "react";
import Link from "next/link";
import { useColorMode, Flex, Box, NavLink } from "theme-ui";
import ColorToggle from "Components/shared/colorToggle";
import UserContext from "Contexts/user";

const modes = ["light", "dark", "purple", "pink"];

export default () => {
  const user = useContext(UserContext);

  const [mode, setMode] = useColorMode();
  return (
    <Flex as="header" m={2} sx={{ alignItems: "center" }}>
      <Link href="/">
        <NavLink>feeels</NavLink>
      </Link>
      <Box mx={"auto"} />
      <Box mr={2}>
        {user ? (
          <>
            <Link href="/profile">
              <NavLink mx={1}>profile</NavLink>
            </Link>
            <Link href="/logout">
              <NavLink mx={1}>log out</NavLink>
            </Link>
          </>
        ) : (
          <Link href="/login">
            <NavLink mx={1}>log in</NavLink>
          </Link>
        )}
      </Box>
      <ColorToggle
        mode={mode}
        onClick={(e) => {
          const index = modes.indexOf(mode);
          const next = modes[(index + 1) % modes.length];
          setMode(next);
        }}
      />
    </Flex>
  );
};

import { useContext } from "react";
import Link from "next/link";
import { useColorMode } from "theme-ui";
import ColorToggle from "Components/shared/colorToggle";
import UserContext from "Contexts/user";

const modes = ["light", "dark", "purple", "pink"];

export default () => {
  const user = useContext(UserContext);

  const [mode, setMode] = useColorMode();
  return (
    <div>
      <ColorToggle
        mode={mode}
        onClick={(e) => {
          const index = modes.indexOf(mode);
          const next = modes[(index + 1) % modes.length];
          setMode(next);
        }}
      />
      {user ? (
        <>
          <Link href="/share">
            <a>New Thought</a>
          </Link>
          <Link href="/profile">
            <a>Profile</a>
          </Link>
          <Link href="/logout">
            <a>Log Out</a>
          </Link>
        </>
      ) : (
        <Link href="/login">
          <a>Log In</a>
        </Link>
      )}
    </div>
  );
};

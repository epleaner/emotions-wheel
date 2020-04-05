import styled from "@emotion/styled";
import Link from "next/link";
import { useColorMode } from "theme-ui";

const StyledAnchor = styled.a`
  margin-right: 15px;
`;

const Button = styled.button`
  color: ${(props) => props.theme.colors.primary};
`;

const modes = ["light", "dark", "purple", "pink"];

export default () => {
  const [mode, setMode] = useColorMode();
  return (
    <div>
      <Button
        onClick={(e) => {
          const index = modes.indexOf(mode);
          const next = modes[(index + 1) % modes.length];
          setMode(next);
        }}
      >
        Color mode -> {mode}
      </Button>
      <Link href="/">
        <StyledAnchor>Home</StyledAnchor>
      </Link>
      <Link href="/about">
        <StyledAnchor>About</StyledAnchor>
      </Link>
      <Link href="/poems">
        <StyledAnchor>Poems</StyledAnchor>
      </Link>
    </div>
  );
};

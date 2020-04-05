import styled from "@emotion/styled";
import Link from "next/link";

const StyledAnchor = styled.a`
  margin-right: 15px;
`;

const Button = styled.button`
  color: hotpink;
`;

export default () => {
  return (
    <div>
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

import Link from "next/link";
import { Flex, Text, NavLink } from "theme-ui";

export default () => (
  <Flex m={2} as="footer">
    <Link href="/about">
      <NavLink
        pr={1}
        sx={{ borderRight: (theme) => `1px solid ${theme.colors.text}` }}
      >
        <Text variant="small">about</Text>
      </NavLink>
    </Link>
    <Text ml={1} variant="small">
      made with 💛 by eli
    </Text>
  </Flex>
);

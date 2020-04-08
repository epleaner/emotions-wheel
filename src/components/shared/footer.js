import Link from "next/link";
import { Flex, Text, NavLink } from "theme-ui";
export default () => (
  <Flex m={2} as="footer">
    <Link href="/about">
      <NavLink>
        <Text variant="small">about</Text>
      </NavLink>
    </Link>
    <Text ml={2} variant="small">
      made with 💛 by eli
    </Text>
  </Flex>
);

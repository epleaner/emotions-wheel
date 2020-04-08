import { Flex } from "theme-ui";
import { FiSun, FiMoon, FiZap } from "react-icons/fi";

export default ({ mode, ...otherProps }) => {
  let icon;
  switch (mode) {
    case "light":
      icon = <FiSun />;
      break;
    case "default":
      icon = <FiSun />;
      break;
    case "dark":
      icon = <FiMoon />;
      break;
    default:
      icon = <FiZap />;
  }
  return (
    <Flex sx={{ alignItems: "center", cursor: "pointer" }} {...otherProps}>
      {icon}
    </Flex>
  );
};

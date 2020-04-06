import styled from "@emotion/styled";
import { FiSun, FiMoon, FiZap } from "react-icons/fi";

const ColorToggle = styled("div")`
  height: 15px;
  width: 15px;
  position: absolute;
  top: 10px;
  right: 10px;
`;

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
  return <ColorToggle {...otherProps}>{icon}</ColorToggle>;
};

import styled from "@emotion/styled";
import { FiSun, FiMoon } from "react-icons/fi";

const ColorToggle = styled("div")`
  height: 15px;
  width: 15px;
  position: absolute;
  top: 10px;
  right: 10px;
`;

export default ({ mode, ...otherProps }) => (
  <ColorToggle {...otherProps}>
    {mode === ("light" || "default") ? <FiSun /> : <FiMoon />}
  </ColorToggle>
);

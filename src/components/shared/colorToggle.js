import styled from "@emotion/styled";

const ColorToggle = styled("div")`
  height: 15px;
  width: 15px;
  padding: 15px;
  border-radius: 100%;
  position: absolute;
  top: 10px;
  right: 10px;
  background-color: ${(props) => props.theme.colors.colorToggle.primary};
  border: 1px solid ${(props) => props.theme.colors.colorToggle.secondary};

  &:hover {
  }
`;

export default ColorToggle;

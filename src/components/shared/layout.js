import Nav from "Components/shared/nav";
import styled from "@emotion/styled";

const Container = styled.div`
  display: flex;
  flex-direction: column;
  height: 100vh;
`;
const Body = styled.div`
  height: 100%;
`;

export default (props) => (
  <Container>
    <Nav />
    <Body>{props.children}</Body>
  </Container>
);

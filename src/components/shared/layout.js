import Nav from "Components/shared/nav";
import Footer from "Components/shared/footer";
import styled from "@emotion/styled";

const Container = styled.div`
  display: flex;
  flex-direction: column;
  height: 100vh;
`;
const Body = styled.div`
  height: 100%;
`;

export default ({ children }) => (
  <Container>
    <Nav />
    <Body>{children}</Body>
    <Footer />
  </Container>
);

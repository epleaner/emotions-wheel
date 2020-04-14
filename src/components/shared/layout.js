import Nav from "@components/shared/nav";
import Footer from "@components/shared/footer";
import styled from "@emotion/styled";

const Container = styled.div`
  display: flex;
  flex-direction: column;
  height: 100vh;
`;
const Body = styled.div`
  height: 100%;
  width: 100vw;
`;

export default ({ children }) => (
  <Container>
    <Nav />
    <Body>{children}</Body>
    <Footer />
  </Container>
);

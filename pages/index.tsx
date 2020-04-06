/** @jsx jsx */
import styled from "@emotion/styled";
import { keyframes } from "@emotion/core";
import { Flex, Box, jsx } from "theme-ui";

const fadeIn = keyframes`
from {
    transform: translate3d(0,-50px,0);
    opacity: 0;
  }
  to {
    transform: translate3d(0, 0px,0);
    opacity: 1;
  }
`;

const Container = styled(Flex)`
  align-items: center;
  justify-content: center;
  height: 100%;
  flex-wrap: wrap;
`;

const FadeInH1 = styled.h1`
  animation: 2s ${fadeIn} ease;
`;

export default () => {
  return (
    <Container>
      <Box>
        <Box sx={{ width: "100%" }}>
          <FadeInH1>hey.</FadeInH1>
        </Box>
        <Box sx={{ width: "100%" }}>
          {"how are you doing?".split(" ").map((text, index) => (
            <span
              sx={{
                animation: `2.5s ${fadeIn} ${(index + 5) * 0.2}s ease both`,
              }}
            >
              {text}{" "}
            </span>
          ))}
        </Box>
      </Box>
    </Container>
  );
};

/** @jsx jsx */
import styled from "@emotion/styled";
import { keyframes } from "@emotion/core";
import { Flex, Box, Button, jsx } from "theme-ui";

const fadeInTop = keyframes`
from {
    transform: translate3d(0,-50px,0);
    opacity: 0;
  }
  to {
    transform: translate3d(0, 0px,0);
    opacity: 1;
  }
`;

const fadeInRight = keyframes`
from {
    transform: translate3d(-200px,0,0);
    opacity: 0;
  }
  to {
    transform: translate3d(0, 0,0);
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
  animation: 2s ${fadeInTop} ease;
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
              key={text}
              sx={{
                animation: `2.5s ${fadeInTop} ${(index + 5) * 0.2}s ease both`,
              }}
            >
              {text}{" "}
            </span>
          ))}
        </Box>
        {/* <Box mt={10} sx={{ width: "100%" }}>
          {"good bad so-so meh".split(" ").map((text, index) => (
            <Button
              key={text}
              sx={{
                animation: `1.5s ${fadeInRight} ${
                  (37 + index * -3) * 0.1
                }s ease both`,
              }}
            >
              {text}{" "}
            </Button>
          ))}
        </Box> */}
      </Box>
    </Container>
  );
};

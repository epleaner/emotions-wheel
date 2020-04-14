/** @jsx jsx */
import styled from "@emotion/styled";
import { keyframes } from "@emotion/core";
import { Flex, Box, jsx } from "theme-ui";

import EmotionSelector from "@components/emotionSelector";

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

const fadeInBottom = keyframes`
from {
    transform: translate3d(0,25px,0);
    opacity: 0;
  }
  to {
    transform: translate3d(0, 0px,0);
    opacity: 1;
  }
`;

const FadeInH1 = styled.h1`
  animation: 2s ${fadeInTop} ease;
`;

const FadeInAfterText = styled(Box)`
  animation: 2s ${fadeInBottom} ease 3s both;
`;

export default () => {
  return (
    <>
      <Flex
        sx={{ alignItems: "center", justifyContent: "center", width: "100%" }}
      >
        <Box mb={4}>
          <FadeInH1>hey.</FadeInH1>
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
      </Flex>
      <Flex
        sx={{ alignItems: "center", justifyContent: "center", width: "100%" }}
      >
        <FadeInAfterText>
          <EmotionSelector />
        </FadeInAfterText>
      </Flex>
    </>
  );
};

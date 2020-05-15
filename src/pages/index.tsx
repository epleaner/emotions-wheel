/** @jsx jsx */
import styled from '@emotion/styled';
import { keyframes } from '@emotion/core';
import { jsx } from 'theme-ui';
import { Grid, Box, Flex } from '@chakra-ui/core';

import Sunburst from '@components/charts/sunburst';

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

const Index = () => {
  return (
    <>
      <Box mx={10} mt={2}>
        <FadeInH1>hey.</FadeInH1>
        {'how are you doing?'.split(' ').map((text, index) => (
          <span
            key={text}
            sx={{
              animation: `2.5s ${fadeInTop} ${(index + 5) * 0.2}s ease both`,
            }}
          >
            {text}{' '}
          </span>
        ))}
      </Box>
      <FadeInAfterText>
        <Grid templateColumns='repeat(5, 1fr)' gap={6}>
          <Box w='100%'>
            <Sunburst width={600} />
          </Box>
        </Grid>
      </FadeInAfterText>
    </>
  );
};

export default Index;

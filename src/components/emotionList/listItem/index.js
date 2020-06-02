import React from 'react';
import PropTypes from 'prop-types';
import { Box, Stack } from '@chakra-ui/core';
import Header from '@components/emotionList/listItem/header';
import Body from '@components/emotionList/listItem/body';

const EmotionListItem = ({ emotion, ...otherProps }) => {
  return (
    <Box pt={4} pb={0} my={4} overflow='hidden'>
      <Stack as='li' {...otherProps}>
        <Header {...emotion} />
        <Body {...emotion} />
      </Stack>
    </Box>
  );
};

EmotionListItem.propTypes = {
  emotion: PropTypes.shape({
    note: PropTypes.string,
    color: PropTypes.string.isRequired,
    date: PropTypes.string.isRequired,
    data: PropTypes.shape({
      name: PropTypes.string.isRequired,
      parent: PropTypes.object.isRequired,
    }),
  }).isRequired,
};

export default EmotionListItem;

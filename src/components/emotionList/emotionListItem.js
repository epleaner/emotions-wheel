import React from 'react';
import PropTypes from 'prop-types';
import { Stack, Text } from '@chakra-ui/core';
import EmotionBreadcrumb from '@components/emotionSelector/selectedBreadcrumb';

const EmotionListItem = ({ emotion, ...otherProps }) => {
  const { date, note } = emotion;
  return (
    <Stack as='li' {...otherProps}>
      <Text fontSize='xs'>
        <EmotionBreadcrumb selected={emotion} ml={-1} />

        {new Date(date).toLocaleDateString('en-US', {
          weekday: 'long',
          month: 'numeric',
          year: 'numeric',
          day: 'numeric',
        })}
      </Text>
      <Text>{note}</Text>
    </Stack>
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

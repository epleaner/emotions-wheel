import React from 'react';
import PropTypes from 'prop-types';
import { Box, Stack, Text, Divider } from '@chakra-ui/core';
import EmotionBreadcrumb from '@components/emotionSelector/selectedBreadcrumb';

const EmotionListItem = ({ emotion, ...otherProps }) => {
  const { date, note } = emotion;

  return (
    <Box pt={4} pb={0} my={4} overflow='hidden'>
      <Stack as='li' {...otherProps}>
        <Text fontSize='xs' color='grey'>
          {new Date(date).toLocaleDateString('en-US', {
            weekday: 'long',
            month: 'numeric',
            year: 'numeric',
            day: 'numeric',
          })}
        </Text>
        <EmotionBreadcrumb selected={emotion} ml={-1} mt={-3} />
        {note && (
          <>
            <Divider borderColor={emotion.color} />
            <Text mt={3}>{note}</Text>
          </>
        )}
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

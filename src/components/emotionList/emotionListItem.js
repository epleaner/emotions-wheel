import React from 'react';
import { Flex, Text, Box } from 'theme-ui';

const EmotionListItem = ({ emotionData }) => {
  const {
    date,
    emotion: { label },
    note,
  } = emotionData;

  return (
    <li>
      <Flex sx={{ flexWrap: 'wrap' }}>
        <Box sx={{ width: '100%' }}>
          <Text>{date && new Date(date).toLocaleString()}</Text>
        </Box>
        <Box sx={{ width: '100%' }}>
          <Text>{label}</Text>
        </Box>
        <Box sx={{ width: '100%' }}>
          <Text>{note}</Text>
        </Box>
      </Flex>
    </li>
  );
};

export default EmotionListItem;

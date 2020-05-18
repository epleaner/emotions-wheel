import React from 'react';
import PropTypes from 'prop-types';

import EmotionListItem from '@components/emotionList/emotionListItem';

const EmotionList = ({ emotions }) => (
  <ul>
    {emotions.map((emotion) => (
      <EmotionListItem key={emotion.date} emotionData={emotion} />
    ))}
  </ul>
);

EmotionList.propTypes = {
  emotions: PropTypes.array.isRequired,
};

export default EmotionList;

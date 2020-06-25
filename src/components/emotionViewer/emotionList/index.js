import React from 'react';
import PropTypes from 'prop-types';
import Link from 'next/link';

import { Text, Link as UILink } from '@chakra-ui/core';

import EmotionListItem from '@components/emotionViewer/emotionList/listItem';

const EmotionList = ({ emotions, onDeleteSuccess, onEditSuccess }) => {
  const sortByDate = (emotions) => {
    return emotions.slice().sort((a, b) => new Date(b.date) - new Date(a.date));
  };

  return (
    <>
      {emotions.length > 0 ? (
        <ul>
          {sortByDate(emotions).map((emotion) => (
            <EmotionListItem
              key={emotion._id}
              emotion={emotion}
              mb={8}
              onDeleteSuccess={onDeleteSuccess(emotion)}
              onEditSuccess={onEditSuccess(emotion)}
            />
          ))}
        </ul>
      ) : (
        <Text fontSize='lg' mt='50%' textAlign='center'>
          Your entries will show up here, go ahead and{' '}
          <Link href='/'>
            <UILink color='primary.500'>add some!</UILink>
          </Link>
        </Text>
      )}
    </>
  );
};

EmotionList.propTypes = {
  emotions: PropTypes.array,
  onDeleteSuccess: PropTypes.func.isRequired,
  onEditSuccess: PropTypes.func.isRequired,
};

export default EmotionList;

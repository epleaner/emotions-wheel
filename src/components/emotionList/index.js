import React from 'react';
import PropTypes from 'prop-types';
import Link from 'next/link';

import { Text, Link as UILink } from '@chakra-ui/core';

import EmotionListItem from '@components/emotionList/listItem';

const EmotionList = ({ emotions, onDeleteSuccess }) => {
  return (
    <>
      {emotions.length > 0 ? (
        <ul>
          {emotions.map((emotion, idx) => (
            <EmotionListItem
              key={`${emotion.date}-${emotion.data.name}`}
              emotion={emotion}
              mb={8}
              onDeleteSuccess={onDeleteSuccess(idx)}
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
};

export default EmotionList;

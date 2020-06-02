import React from 'react';
import PropTypes from 'prop-types';
import { Text } from '@chakra-ui/core';
import EmotionBreadcrumb from '@components/emotionSelector/selectedBreadcrumb';

const Header = (props) => {
  const { date } = props;

  return (
    <>
      <Text fontSize='xs' color='grey'>
        {new Date(date).toLocaleDateString('en-US', {
          weekday: 'long',
          month: 'numeric',
          year: 'numeric',
          day: 'numeric',
        })}
      </Text>

      <EmotionBreadcrumb selected={props} ml={-1} />
    </>
  );
};

Header.propTypes = {
  date: PropTypes.string.isRequired,
};

export default Header;

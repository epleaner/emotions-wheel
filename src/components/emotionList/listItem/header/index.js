import React from 'react';
import PropTypes from 'prop-types';

import { Text, Stack, Box } from '@chakra-ui/core';
import EmotionBreadcrumb from '@components/emotionSelector/selectedBreadcrumb';
import Controls from '@components/emotionList/listItem/header/controls';

const Header = ({ emotion, onDeleteSuccess, store }) => {
  const { date, data } = emotion;

  return (
    <Stack isInline justify='space-between' align='center'>
      <Box>
        <Text fontSize='xs' color='grey'>
          {new Date(date).toLocaleDateString('en-US', {
            weekday: 'long',
            month: 'numeric',
            year: 'numeric',
            day: 'numeric',
          })}
        </Text>

        <EmotionBreadcrumb selected={emotion} />
      </Box>

      <Controls {...{ date, data, onDeleteSuccess, store }} />
    </Stack>
  );
};

Header.propTypes = {
  store: PropTypes.object.isRequired,
  emotion: PropTypes.shape({
    date: PropTypes.string.isRequired,
    data: PropTypes.object.isRequired,
  }).isRequired,
  onDeleteSuccess: PropTypes.func.isRequired,
};

export default Header;

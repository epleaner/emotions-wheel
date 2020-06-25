import React from 'react';
import PropTypes from 'prop-types';
import { observer } from 'mobx-react-lite';

import { Text, Stack, Box } from '@chakra-ui/core';
import EmotionBreadcrumb from '@components/emotionSelector/selectedBreadcrumb';
import Controls from '@components/emotionViewer/list/item/header/controls';

const Header = ({ emotion, onDeleteSuccess, onEditSuccess, store }) => {
  const { date } = emotion;

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

      <Controls {...{ emotion, onDeleteSuccess, onEditSuccess, store }} />
    </Stack>
  );
};

Header.propTypes = {
  store: PropTypes.object.isRequired,
  emotion: PropTypes.shape({
    date: PropTypes.string.isRequired,
  }).isRequired,
  onDeleteSuccess: PropTypes.func.isRequired,
  onEditSuccess: PropTypes.func.isRequired,
};

export default observer(Header);

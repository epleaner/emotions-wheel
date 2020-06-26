import React from 'react';
import PropTypes from 'prop-types';
import { observer } from 'mobx-react-lite';
import moment from 'moment';

import { Text, Stack, Box } from '@chakra-ui/core';
import EmotionBreadcrumb from '@components/emotionSelector/selectedBreadcrumb';
import Controls from '@components/emotionViewer/list/item/header/controls';

const Header = ({ emotion, onDeleteSuccess, onEditSuccess, store }) => {
  const { date } = emotion;

  return (
    <Stack isInline justify='space-between' align='center'>
      <Box>
        <Text fontSize='xs' color='grey'>
          {moment(date).format('dddd, DD/MM/YYYY')}
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
    date: PropTypes.oneOfType([PropTypes.string, PropTypes.object]).isRequired,
  }).isRequired,
  onDeleteSuccess: PropTypes.func.isRequired,
  onEditSuccess: PropTypes.func.isRequired,
};

export default observer(Header);

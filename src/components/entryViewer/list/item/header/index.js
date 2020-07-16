import React from 'react';
import PropTypes from 'prop-types';
import { observer } from 'mobx-react-lite';
import moment from 'moment';

import { Text, Stack, Box } from '@chakra-ui/core';

import EmotionBreadcrumb from '@components/emotionSelector/selectedBreadcrumb';
import Controls from '@components/entryViewer/list/item/header/controls';

const Header = ({ entry, onDeleteSuccess, onEditSuccess, store }) => {
  const { date, emotions } = entry;

  return (
    <Stack isInline justify='space-between' align='center'>
      <Box>
        <Text fontSize='xs' color='grey'>
          {moment(date).format('dddd, DD/MM/YYYY')}
        </Text>

        {emotions.map((e) => (
          <EmotionBreadcrumb my={3} key={e._id} selected={e} />
        ))}
      </Box>

      <Controls {...{ entry, onDeleteSuccess, onEditSuccess, store }} />
    </Stack>
  );
};

Header.propTypes = {
  store: PropTypes.object.isRequired,
  entry: PropTypes.shape({
    date: PropTypes.oneOfType([PropTypes.string, PropTypes.object]).isRequired,
    emotions: PropTypes.array.isRequired,
  }).isRequired,
  onDeleteSuccess: PropTypes.func.isRequired,
  onEditSuccess: PropTypes.func.isRequired,
};

export default observer(Header);

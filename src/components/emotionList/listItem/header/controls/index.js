import React from 'react';
import PropTypes from 'prop-types';
import { observer } from 'mobx-react';

import { Flex, Divider } from '@chakra-ui/core';

import DeleteControls from '@components/emotionList/listItem/header/controls/deleteControls';
import EditControls from '@components/emotionList/listItem/header/controls/editControls';

const Controls = observer(({ data, date, onDeleteSuccess, store }) => {
  return (
    <Flex alignItems='center'>
      <EditControls {...{ store }} />
      <Divider orientation='vertical' />
      <DeleteControls {...{ data, date, onDeleteSuccess }} />
    </Flex>
  );
});

Controls.propTypes = {
  store: PropTypes.object.isRequired,
  date: PropTypes.string.isRequired,
  data: PropTypes.object.isRequired,
  onDeleteSuccess: PropTypes.func.isRequired,
};

export default Controls;

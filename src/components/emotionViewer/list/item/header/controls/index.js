import React from 'react';
import PropTypes from 'prop-types';
import { observer } from 'mobx-react-lite';

import { Flex, Divider } from '@chakra-ui/core';

import DeleteControls from '@components/emotionViewer/list/item/header/controls/deleteControls';
import EditControls from '@components/emotionViewer/list/item/header/controls/editControls';

const Controls = ({ emotion, onDeleteSuccess, onEditSuccess, store }) => {
  return (
    <Flex alignItems='center'>
      <EditControls {...{ onEditSuccess, store }} />
      <Divider orientation='vertical' />
      <DeleteControls {...{ ...emotion, onDeleteSuccess }} />
    </Flex>
  );
};

Controls.propTypes = {
  store: PropTypes.object.isRequired,
  emotion: PropTypes.shape({
    date: PropTypes.string.isRequired,
    data: PropTypes.array.isRequired,
  }).isRequired,
  onDeleteSuccess: PropTypes.func.isRequired,
  onEditSuccess: PropTypes.func.isRequired,
};

export default observer(Controls);

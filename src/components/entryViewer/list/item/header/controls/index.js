import React from 'react';
import PropTypes from 'prop-types';
import { observer } from 'mobx-react-lite';

import { Flex, Divider } from '@chakra-ui/core';

import DeleteControls from '@components/entryViewer/list/item/header/controls/deleteControls';
import EditControls from '@components/entryViewer/list/item/header/controls/editControls';

const Controls = ({ onDeleteSuccess, onEditSuccess, store }) => {
  return (
    <Flex alignItems='center'>
      <EditControls {...{ store, onEditSuccess }} />
      <Divider orientation='vertical' />
      <DeleteControls {...{ store, onDeleteSuccess }} />
    </Flex>
  );
};

Controls.propTypes = {
  store: PropTypes.object.isRequired,
  onDeleteSuccess: PropTypes.func.isRequired,
  onEditSuccess: PropTypes.func.isRequired,
};

export default observer(Controls);

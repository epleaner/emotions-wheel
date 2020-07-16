import React from 'react';
import PropTypes from 'prop-types';
import { observer } from 'mobx-react-lite';

import { Flex, Divider } from '@chakra-ui/core';

import DeleteControls from '@components/entryViewer/list/item/header/controls/deleteControls';
import EditControls from '@components/entryViewer/list/item/header/controls/editControls';

const Controls = ({ entry, onDeleteSuccess, onEditSuccess, store }) => {
  return (
    <Flex alignItems='center'>
      <EditControls {...{ onEditSuccess, store }} />
      <Divider orientation='vertical' />
      <DeleteControls {...{ ...entry, onDeleteSuccess }} />
    </Flex>
  );
};

Controls.propTypes = {
  store: PropTypes.object.isRequired,
  entry: PropTypes.shape({
    date: PropTypes.oneOfType([PropTypes.string, PropTypes.object]).isRequired,
    emotions: PropTypes.array.isRequired,
  }).isRequired,
  onDeleteSuccess: PropTypes.func.isRequired,
  onEditSuccess: PropTypes.func.isRequired,
};

export default observer(Controls);

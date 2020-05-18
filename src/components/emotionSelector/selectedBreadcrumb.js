import React from 'react';
import PropTypes from 'prop-types';
import { Box, Text, Icon } from '@chakra-ui/core';

const SelectedBreadcrumb = ({ selected }) => {
  const color = selected.color;
  const path = [];

  while (selected.parent) {
    path.push(selected);
    selected = selected.parent;
  }
  return path.reverse().map((p, i) => (
    <Box key={p.data.name}>
      <Text>
        {p.data.name}
        {i < path.length - 1 && <Icon color={color} name='chevron-right' />}
      </Text>
    </Box>
  ));
};

SelectedBreadcrumb.propTypes = {
  selected: PropTypes.shape({ parent: PropTypes.object }).isRequired,
};

export default SelectedBreadcrumb;

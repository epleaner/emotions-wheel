import React from 'react';
import PropTypes from 'prop-types';
import { Box, Icon, Badge } from '@chakra-ui/core';

const SelectedBreadcrumb = ({ selected }) => {
  let { data, color } = selected;
  const path = [];

  while (data.parent) {
    path.push(data);
    data = data.parent;
  }
  return path.reverse().map((p, i) => (
    <Box key={p.name}>
      <Badge
        boxShadow='none'
        bg={i < path.length - 1 ? 'none' : color}
        color={i < path.length - 1 ? color : 'white'}
        variant={i < path.length - 1 ? 'outline' : 'solid'}>
        {p.name}
      </Badge>
      {i < path.length - 1 && <Icon color={color} name='chevron-right' />}
    </Box>
  ));
};

SelectedBreadcrumb.propTypes = {
  selected: PropTypes.shape({
    color: PropTypes.string.isRequired,
    data: PropTypes.shape({
      name: PropTypes.string.isRequired,
      parent: PropTypes.object.isRequired,
    }),
  }).isRequired,
};

export default SelectedBreadcrumb;

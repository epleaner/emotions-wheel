import React from 'react';
import PropTypes from 'prop-types';
import { Flex, Box, Icon, Badge } from '@chakra-ui/core';

const SelectedBreadcrumb = ({ selected, ...otherProps }) => {
  let { data, color } = selected;

  return (
    <Flex {...otherProps}>
      {data.map((emotion, i) => (
        <Box key={emotion}>
          <Badge
            boxShadow='none'
            bg={i < data.length - 1 ? 'none' : color}
            color={i < data.length - 1 ? color : 'white'}
            variant={i < data.length - 1 ? 'outline' : 'solid'}>
            {emotion}
          </Badge>
          {i < data.length - 1 && <Icon color={color} name='chevron-right' />}
        </Box>
      ))}
    </Flex>
  );
};

SelectedBreadcrumb.propTypes = {
  selected: PropTypes.shape({
    color: PropTypes.string.isRequired,
    data: PropTypes.array.isRequired,
  }).isRequired,
};

export default SelectedBreadcrumb;

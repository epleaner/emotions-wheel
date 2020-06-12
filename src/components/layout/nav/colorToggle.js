import React from 'react';
import PropTypes from 'prop-types';
import { observer } from 'mobx-react-lite';

import { IconButton, Flex } from '@chakra-ui/core';

const ColorToggle = ({ mode, ...otherProps }) => {
  return (
    <Flex alignItems='center' cursor='pointer' {...otherProps}>
      <IconButton
        variant='ghost'
        aria-label='Color Mode'
        icon={mode === 'light' || mode === 'default' ? 'sun' : 'moon'}
      />
    </Flex>
  );
};

ColorToggle.propTypes = {
  mode: PropTypes.string.isRequired,
};

export default observer(ColorToggle);

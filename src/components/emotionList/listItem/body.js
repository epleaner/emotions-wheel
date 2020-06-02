import React from 'react';
import PropTypes from 'prop-types';
import { Text, Divider } from '@chakra-ui/core';

const Body = ({ note, color }) => {
  return (
    <>
      {note && (
        <>
          <Divider borderColor={color} />
          <Text mt={3}>{note}</Text>
        </>
      )}
    </>
  );
};

Body.propTypes = {
  note: PropTypes.string,
  color: PropTypes.string,
};

export default Body;

import React, { useMemo, useEffect } from 'react';
import PropTypes from 'prop-types';
import { Box, Stack } from '@chakra-ui/core';
import Header from '@components/emotionList/listItem/header';
import Body from '@components/emotionList/listItem/body';
import { observable } from 'mobx';
import { observer } from 'mobx-react';

const EmotionListItem = observer(
  ({ emotion, onDeleteSuccess, ...otherProps }) => {
    const store = useMemo(
      () =>
        observable({
          emotion,
          editing: false,
          editBody: emotion.note,
        }),
      [emotion]
    );

    return (
      <Box pt={4} pb={0} my={4} overflow='hidden'>
        <Stack as='li' {...otherProps}>
          <Header {...{ store, emotion, onDeleteSuccess }} />
          <Body {...{ store, emotion }} />
        </Stack>
      </Box>
    );
  }
);

EmotionListItem.propTypes = {
  emotion: PropTypes.shape({
    note: PropTypes.string,
    color: PropTypes.string.isRequired,
    date: PropTypes.string.isRequired,
    data: PropTypes.shape({
      name: PropTypes.string.isRequired,
      parent: PropTypes.object.isRequired,
    }),
  }).isRequired,
  onDeleteSuccess: PropTypes.func.isRequired,
};

export default EmotionListItem;

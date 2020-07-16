import React from 'react';
import PropTypes from 'prop-types';

import EntryListItem from '@components/entryViewer/list/item';

const EntryList = ({ entries }) => {
  const sortByDate = (entries) => {
    return entries.slice().sort((a, b) => new Date(b.date) - new Date(a.date));
  };

  return (
    <ul>
      {sortByDate(entries).map((entry) => (
        <EntryListItem key={entry._id} entry={entry} pt={4} my={[12, 24]} />
      ))}
    </ul>
  );
};

EntryList.propTypes = {
  entries: PropTypes.array,
};

export default EntryList;

import React, { useMemo } from 'react';
import PropTypes from 'prop-types';
import moment from 'moment';

import NoTitleHeader from '@components/entryViewer/list/item/header/no-title';
import EntryListItem from '@components/entryViewer/list/item';
import { Box, Text, SimpleGrid } from '@chakra-ui/core';
import { useMedia } from '../../../hooks/useMedia';

export const EntryListByDay = ({ entries = [] }) => {
  const sortByDate = (entries) => {
    return entries
      .slice()
      .sort((a, b) =>
        new Date(a.date) < new Date(b.date)
          ? -1
          : new Date(a.date) > new Date(b.date)
          ? 1
          : 0
      );
  };
  const sortedDates = useMemo(() => sortByDate(entries), [entries]);
  const getShortDate = (date = new Date()) => {
    const d = new Date(date);
    return `${d.getFullYear()}-${d.getMonth() + 1}-${d.getDate()}`;
  };
  const groupedPaginatedDates = sortedDates.reduce(
    (dict, item) => ({
      ...dict,
      [getShortDate(item.date)]: [
        ...(dict[getShortDate(item.date)] || []),
        item
      ]
    }),
    {}
  );
  const paginatedDates = Object.keys(groupedPaginatedDates)
    .sort()
    .map((key) => ({ day: key, entries: groupedPaginatedDates[key] }));
  const columnSpacing = useMedia(
    ['(min-width: 1366px)', '(min-width: 1024px)'],
    [3, 2],
    1
  );
  const titleAlign = useMedia(
    ['(min-width: 1200px)'],
    ["center"],
    "left"
  )

  return (
    <div>
      {paginatedDates.map((page) => (
        <Box key={page.day}>
          <Text fontSize="sm" color="grey" mt={10} textAlign={titleAlign}>
            {moment(page.day).format('dddd, DD/MM/YYYY')}
          </Text>
          <SimpleGrid columns={[columnSpacing]} spacing="20px">
            {page.entries.map((entry) => (
              <EntryListItem
                key={`${page.day}-${entry._id}`}
                entry={entry}
                pt={4}
                my={[12, 0]}
                Header={NoTitleHeader}
              />
            ))}
          </SimpleGrid>
        </Box>
      ))}
    </div>
  );
};

EntryListByDay.propTypes = {
  entries: PropTypes.array
};

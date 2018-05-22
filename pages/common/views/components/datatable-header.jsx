import React from 'react';
import { getTitle } from '../../../../lib/utils';

const TableHeader = ({
  id,
  column,
  ascending,
  setSortColumn,
  sortable,
  title
}) => {
  const isSortable = sortable !== false && column !== undefined && ascending !== undefined;
  return (
    <th
      aria-sort={ isSortable ? (column === id ? (ascending ? 'ascending' : 'descending') : 'none') : undefined }
    >
      {
        isSortable
          ? <a href="#" onClick={(e) => {
            e.preventDefault();
            setSortColumn(id);
          }}>{ getTitle(id, { title }) }</a>
          : getTitle(id, { title })
      }
    </th>
  );
};

export default TableHeader;

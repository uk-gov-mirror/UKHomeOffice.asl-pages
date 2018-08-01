import React from 'react';
import classnames from 'classnames';
import ApplyChanges from '../containers/apply-changes';
import Snippet from '../containers/snippet';

const getLabel = id => <Snippet>{`fields.${id}.label`}</Snippet>;

const TableHeader = ({
  id,
  column,
  ascending,
  onHeaderClick,
  sortable,
  disabled
}) => {
  const isSortable = sortable !== false && column !== undefined && ascending !== undefined;
  return (
    <th
      aria-sort={ isSortable ? (column === id ? (ascending ? 'ascending' : 'descending') : 'none') : undefined }
    >
      {
        isSortable
          ? <ApplyChanges
            query={{
              sort: {
                column: id,
                ascending: column === id ? !ascending : true
              }
            }}
            className={classnames({ disabled })}
            onApply={() => onHeaderClick(id)}
            label={getLabel(id)}
          />
          : getLabel(id)
      }
    </th>
  );
};

export default TableHeader;

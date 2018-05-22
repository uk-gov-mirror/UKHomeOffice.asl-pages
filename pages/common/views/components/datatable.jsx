import React from 'react';
import { map, get, isEmpty, isUndefined } from 'lodash';
import DatatableHeader from '../containers/datatable-header';

const Table = ({
  data,
  schema,
  formatters,
  sortable
} = {}) => {
  if (isUndefined(data)) {
    throw new Error('data must be provided');
  }
  const columns = !isEmpty(schema)
    ? schema
    : Object.keys(data[0]).reduce((obj, key) => ({ ...obj, [key]: {} }), {});
  return (
    <table className="govuk-react-datatable">
      <thead>
        <tr>
          {
            map(columns, (column, key) =>
              <DatatableHeader key={key} id={key} sortable={sortable} { ...column } />
            )
          }
        </tr>
        <tr id="filter-header"></tr>
      </thead>
      <tbody>
        {
          data.map(row => (
            <tr key={row.id}>
              {
                map(columns, ({ format, accessor }, key) => {
                  const datum = get(row, accessor || key);
                  return <td key={key}>{ format ? format(datum, row) : datum }</td>;
                })
              }
            </tr>
          ))
        }
      </tbody>
    </table>
  );
};

module.exports = Table;

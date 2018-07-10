import React from 'react';
import { map, isEqual } from 'lodash';
import Snippet from '../containers/snippet';

const getValue = (key, { format } = {}) => {
  const value = format ? format(key) : key;
  return value || '-';
};

const Diff = ({
  diff,
  formatters = {},
  comparator = (a, b) => !(isEqual(a, b)),
  currentLabel = 'Current',
  proposedLabel = 'Proposed'
}) => (
  <table>
    <thead>
      <tr>
        <th></th>
        <th>{currentLabel}</th>
        <th>{proposedLabel}</th>
      </tr>
    </thead>
    <tbody>
      {
        map(diff, ({ oldValue, newValue }, key) => {
          const className = comparator(formatters[key] || {}, oldValue, newValue) ? 'highlight' : '';
          return <tr key={key}>
            <td><Snippet>{`fields.${key}.label`}</Snippet></td>
            <td>{getValue(oldValue, formatters[key])}</td>
            <td>
              <span className={className}>{getValue(newValue, formatters[key])}</span>
            </td>
          </tr>;
        })
      }
    </tbody>
  </table>
);

export default Diff;

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
          oldValue = getValue(oldValue, formatters[key]);
          newValue = getValue(newValue, formatters[key]);
          const className = isEqual(oldValue, newValue) ? '' : 'highlight';
          return <tr key={key}>
            <td><Snippet>{`fields.${key}.label`}</Snippet></td>
            <td>{oldValue}</td>
            <td>
              <span className={className}>{newValue}</span>
            </td>
          </tr>;
        })
      }
    </tbody>
  </table>
);

export default Diff;

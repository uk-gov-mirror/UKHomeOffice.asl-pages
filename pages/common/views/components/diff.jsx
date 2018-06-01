import React from 'react';
import { map } from 'lodash';

const getLabel = (key, { label } = {}) => label || key;

const getValue = (key, { format } = {}) => format ? format(key) : key;

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
        map(diff, ({ oldValue, newValue }, key) =>
          <tr key={key}>
            <td>{getLabel(key, formatters[key])}</td>
            <td>{getValue(oldValue, formatters[key])}</td>
            <td>{getValue(newValue, formatters[key])}</td>
          </tr>
        )
      }
    </tbody>
  </table>
);

export default Diff;

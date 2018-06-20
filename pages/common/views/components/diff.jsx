import React from 'react';
import { map, isEqual } from 'lodash';

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
        map(diff, ({ oldValue, newValue }, key) => {
          const className = isEqual(oldValue, newValue) ? '' : 'highlight';
          return <tr key={key}>
            <td>{getLabel(key, formatters[key])}</td>
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

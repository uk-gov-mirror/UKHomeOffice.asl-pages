import React, { Fragment } from 'react';

import ApplyChanges from '../containers/apply-changes';

const LinkFilter = ({
  filters,
  selected,
  onChange
}) => {
  return <div className="link-filter">
    <label>Filter by:</label>
    <ul>
      <li>
        {
          selected
            ? <ApplyChanges onApply={() => onChange(null)} label="All" />
            : <Fragment>All</Fragment>
        }
      </li>
      {
        filters.map(f => {
          if (f === selected) {
            return <li key={ f }>{ f }</li>;
          }
          return <li key={ f }>
            <ApplyChanges onApply={() => onChange(f)} label={ f } />
          </li>;
        })
      }
    </ul>
  </div>;
};

export default LinkFilter;

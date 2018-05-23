import React, { Fragment } from 'react';

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
            ? <a href="" onClick={e => { e.preventDefault(); onChange(null); }}>All</a>
            : <Fragment>All</Fragment>
        }
      </li>
      {
        filters.map(f => {
          if (f === selected) {
            return <li key={ f }>{ f }</li>;
          }
          return <li key={ f }><a href="" onClick={e => { e.preventDefault(); onChange(f); }}>{ f }</a></li>;
        })
      }
    </ul>
  </div>;
};

export default LinkFilter;

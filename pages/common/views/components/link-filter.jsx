import React, { Fragment } from 'react';

import ApplyChanges from '../containers/apply-changes';

const LinkFilter = ({
  filters,
  selected,
  onChange,
  formatter,
  prop,
  label = 'Filter by:'
}) => {
  return (
    <div className="link-filter">
      <label>{ label }</label>
      <ul>
        <li>
          {
            selected
              ? <ApplyChanges
                onApply={() => onChange(null)}
                label="All"
                filters={{
                  [prop]: []
                }}
              />
              : <Fragment>All</Fragment>
          }
        </li>
        {
          filters.map(f => {
            const label = formatter ? formatter(f) : f;
            if (f === selected) {
              return <li key={ f }>{ label }</li>;
            }
            return (
              <li key={ f }>
                <ApplyChanges
                  onApply={() => onChange(f)}
                  label={ label }
                  filters={{
                    [prop]: [f]
                  }}
                />
              </li>
            );
          })
        }
      </ul>
    </div>
  );
};

export default LinkFilter;

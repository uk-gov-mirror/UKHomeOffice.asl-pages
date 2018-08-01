import React, { Fragment } from 'react';
import { stringify } from 'qs';
import { noop } from 'lodash';

const ApplyChanges = ({
  id,
  type,
  label,
  onApply,
  children,
  query,
  ...rest
}) => {
  return (
    <Fragment>
      {
        type === 'link' && (
          <a href={`?${stringify(query)}`} onClick={e => { e.preventDefault(); onApply(); }} {...rest}>{label}</a>
        )
      }
      {
        type === 'form' && (
          <form id={id} onSubmit={e => { e.preventDefault(); onApply(); }}>
            <input type="hidden" name="props" value={stringify(query)} {...rest}/>
            { children }
          </form>
        )
      }
    </Fragment>
  );
};

ApplyChanges.defaultProps = {
  type: 'link',
  label: 'Submit',
  onApply: noop,
  query: {}
};

export default ApplyChanges;

import React, { Fragment } from 'react';
import { stringify } from 'qs';
import { omit } from 'lodash';

const ApplyChanges = ({
  id,
  type,
  label,
  onApply,
  children,
  query,
  action,
  method = 'GET',
  ...rest
}) => {
  return (
    <Fragment>
      {
        type === 'link' && (
          <a href={`?${stringify(query)}`} onClick={e => { e.preventDefault(); onApply(e); }} {...omit(rest, 'dispatch')}>{label}</a>
        )
      }
      {
        type === 'form' && (
          <form id={id} action={action} method={method} onSubmit={e => { e.preventDefault(); onApply(e); }}>
            <input type="hidden" name="props" value={stringify(query)} {...omit(rest, 'dispatch')}/>
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
  onApply: e => e.target.submit(),
  query: {}
};

export default ApplyChanges;

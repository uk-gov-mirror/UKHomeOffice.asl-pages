import classnames from 'classnames';
import React, { Fragment } from 'react';
import { map, pick } from 'lodash';
import Snippet from '../containers/snippet';

const getValue = (value, format) => {
  if (!value) {
    return '-';
  }
  return format ? format(value) : value;
};

const ModelSummary = ({ model, schema, formatters = {}, className }) => {
  if (schema) {
    model = pick(model, Object.keys(schema));
  }
  return (
    <dl className={classnames('inline', className)}>
      {
        map(model, (item, key) =>
          <Fragment key={key}>
            <dt><Snippet>{`fields.${key}.label`}</Snippet></dt>
            <dd>{getValue(model[key], formatters[key] && formatters[key].format)}</dd>
          </Fragment>
        )
      }
    </dl>
  );
};

export default ModelSummary;

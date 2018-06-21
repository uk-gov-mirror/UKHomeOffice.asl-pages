import React, { Fragment } from 'react';
import { map } from 'lodash';
import Snippet from '../containers/snippet';

const ModelSummary = ({ model, formatters }) => (
  <dl className="inline">
    {
      map(model, (item, key) =>
        <Fragment>
          <dt><Snippet>{`fields.${key}.label`}</Snippet></dt>
          <dd>{formatters[key] ? formatters[key].format(model[key]) : model[key]}</dd>
        </Fragment>
      )
    }
  </dl>
);

export default ModelSummary;

import React, { Fragment } from 'react';
import { connect } from 'react-redux';
import Snippet from '../../../common/views/containers/snippet';
import { define } from '../../../common/formatters';

const formatters = {
  suitability: define,
  holding: define
};

const Place = ({
  fields,
  model,
  ...props
}) => (
  <Fragment>
    <div className="grid-row">
      <div className="column-two-thirds">
        <header>
          <h2>{model.name}</h2>
          <h1><Snippet>pages.places</Snippet></h1>
          <dl>
            {
              fields.map(key =>
                <Fragment key={key}>
                  <dt><Snippet>{`fieldLabels.${key}`}</Snippet></dt>
                  <dd>{formatters[key] ? formatters[key](model[key]) : (model[key] || '-')}</dd>
                </Fragment>
              )
            }
          </dl>
        </header>
      </div>

      <div className="column-one-third sidebar">
        <aside>

        </aside>
      </div>
    </div>

  </Fragment>
);

const mapStateToProps = ({ model, static: { fields } }) => ({ fields, model });

export default connect(mapStateToProps)(Place);

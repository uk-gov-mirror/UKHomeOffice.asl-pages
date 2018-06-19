import React, { Fragment } from 'react';
import { map, merge } from 'lodash';
import { connect } from 'react-redux';
import Snippet from '../../../common/views/containers/snippet';
import { define } from '../../../common/formatters';

const formatters = {
  suitability: { format: define },
  holding: { format: define }
};

const Place = ({
  schema,
  item,
  ...props
}) => (
  <Fragment>
    <div className="grid-row">
      <div className="column-two-thirds">
        <header>
          <h2>{item.name}</h2>
          <h1><Snippet>pages.places</Snippet></h1>
          <dl>
            {
              map(merge({}, schema, formatters), ({ format }, key) =>
                <Fragment key={key}>
                  <dt><Snippet>{`fieldLabels.${key}`}</Snippet></dt>
                  <dd>{format ? format(item[key]) : item[key]}</dd>
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

const mapStateToProps = ({ item, datatable: { schema } }) => ({ schema, item });

export default connect(mapStateToProps)(Place);

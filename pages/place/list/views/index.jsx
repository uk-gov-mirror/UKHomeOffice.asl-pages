import React, { Fragment } from 'react';
import get from 'lodash/get';
import { connect } from 'react-redux';
import classnames from 'classnames';
import ReactMarkdown from 'react-markdown';
import {
  FilterTable,
  Snippet,
  Controls,
  Link,
  Header
} from '@asl/components';
import formatters from '../../formatters';

const pageFormatters = {
  name: {
    format: (val, row) => {
      return (
        <Fragment>
          {
            val
          }
          {
            row.restrictions && <i className="icon icon-information" />
          }
        </Fragment>
      );
    }
  },
  nacwo: {
    format: val => val && <Link page="profile.view" profile={ get(val, 'profile.id') } label={ get(val, 'profile.name') } />
  }
};

const ExpandableRow = ({ row, schema }) => (
  <div className="govuk-grid-row">
    <div className={classnames({
      'govuk-grid-column-one-quarter': row.restrictions,
      'govuk-grid-column-full': !row.restrictions
    })}>
      <Controls item={row.id} />
    </div>
    {
      row.restrictions && (
        <div className="govuk-grid-column-two-thirds">
          <h3>{<Snippet>fields.changesToRestrictions.label</Snippet>}</h3>
          <ReactMarkdown>{row.restrictions}</ReactMarkdown>
        </div>
      )
    }
  </div>
);

const Places = ({
  establishment: { name },
  allowedActions,
  ...props
}) => (
  <Fragment>
    <Header
      title={<Snippet>pages.place.list</Snippet>}
      subtitle={name}
    />
    <FilterTable
      formatters={Object.assign({}, formatters, pageFormatters)}
      ExpandableRow={ExpandableRow}
      createPath={allowedActions.includes('place.create') && 'place.create.new'}
    />
  </Fragment>
);

const mapStateToProps = ({ static: { establishment, allowedActions } }) => ({ establishment, allowedActions });

export default connect(mapStateToProps)(Places);

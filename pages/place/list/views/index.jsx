import React, { Fragment } from 'react';
import { get } from 'lodash';
import { connect } from 'react-redux';
import classnames from 'classnames';
import ReactMarkdown from 'react-markdown';
import FilterTable from '../../../common/views/components/filter-table';
import Snippet from '../../../common/views/containers/snippet';
import Controls from '../../../common/views/containers/controls';
import formatters from '../../formatters';
import Link from '../../../common/views/containers/link';

const pageFormatters = {
  name: {
    format: (val, row) => {
      return (
        <Fragment>
          {
            val
          }
          {
            row.notes && <i className="icon icon-information" />
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
      'govuk-grid-column-one-quarter': row.notes,
      'govuk-grid-column-full': !row.notes
    })}>
      <Controls item={row.id} />
    </div>
    {
      row.notes && (
        <div className="govuk-grid-column-two-thirds">
          <h3>{<Snippet>fields.restrictions.label</Snippet>}</h3>
          <ReactMarkdown>{row.notes}</ReactMarkdown>
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
    <header>
      <h2>{name}</h2>
      <h1><Snippet>pages.place.list</Snippet></h1>
    </header>
    <FilterTable
      formatters={Object.assign({}, formatters, pageFormatters)}
      ExpandableRow={ExpandableRow}
      createPath={allowedActions.includes('place.create') && 'place.create'}
    />
  </Fragment>
);

const mapStateToProps = ({ static: { establishment, allowedActions } }) => ({ establishment, allowedActions });

export default connect(mapStateToProps)(Places);

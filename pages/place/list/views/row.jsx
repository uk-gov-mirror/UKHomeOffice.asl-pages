import React from 'react';
import { connect } from 'react-redux';
import classnames from 'classnames';
import ReactMarkdown from 'react-markdown';
import {
  Snippet,
  Controls
} from '@asl/components';

const ExpandableRow = ({ row, schema, allowedActions }) => {
  return <div className="govuk-grid-row">
    <div className={classnames({
      'govuk-grid-column-one-quarter': row.restrictions,
      'govuk-grid-column-full': !row.restrictions
    })}>
      {
        allowedActions.includes('place.update') && <Controls item={row.id} />
      }
    </div>
    {
      row.restrictions && (
        <div className="govuk-grid-column-two-thirds">
          <h3>{<Snippet>fields.restrictions.label</Snippet>}</h3>
          <ReactMarkdown>{row.restrictions}</ReactMarkdown>
        </div>
      )
    }
  </div>;
};

const mapStateToProps = ({ static: { allowedActions } }) => ({ allowedActions });

export default connect(mapStateToProps)(ExpandableRow);
